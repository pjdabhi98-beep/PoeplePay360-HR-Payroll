import requests

from app.config import (
    ODOO_URL,
    ODOO_DB,
    ODOO_USERNAME,
    ODOO_PASSWORD,
)


class OdooService:

    def __init__(self):
        self.url = f"{ODOO_URL}/jsonrpc"
        self.db = ODOO_DB
        self.username = ODOO_USERNAME
        self.password = ODOO_PASSWORD

    def authenticate(self):
        response = requests.post(
            self.url,
            json={
                "jsonrpc": "2.0",
                "method": "call",
                "params": {
                    "service": "common",
                    "method": "authenticate",
                    "args": [
                        self.db,
                        self.username,
                        self.password,
                        {},
                    ],
                },
                "id": 1,
            },
            timeout=10,
        )

        response.raise_for_status()

        data = response.json()

        if "error" in data:
            raise Exception(data["error"])

        uid = data.get("result")

        if not uid:
            raise Exception("Odoo authentication failed")

        return uid

    def execute(
        self,
        model,
        method,
        args=None,
        kwargs=None,
    ):
        uid = self.authenticate()

        response = requests.post(
            self.url,
            json={
                "jsonrpc": "2.0",
                "method": "call",
                "params": {
                    "service": "object",
                    "method": "execute_kw",
                    "args": [
                        self.db,
                        uid,
                        self.password,
                        model,
                        method,
                        args or [],
                        kwargs or {},
                    ],
                },
                "id": 2,
            },
            timeout=10,
        )

        response.raise_for_status()

        data = response.json()

        if "error" in data:
            raise Exception(data["error"])

        return data.get("result")


odoo_service = OdooService()