import requests

from app.config import (
    ODOO_URL,
    ODOO_DB,
    ODOO_USERNAME,
    ODOO_PASSWORD,
)


class OdooService:

    def authenticate(self):
        response = requests.post(
            f"{ODOO_URL}/jsonrpc",
            json={
                "jsonrpc": "2.0",
                "method": "call",
                "params": {
                    "service": "common",
                    "method": "authenticate",
                    "args": [
                        ODOO_DB,
                        ODOO_USERNAME,
                        ODOO_PASSWORD,
                        {},
                    ],
                },
                "id": 1,
            },
        )

        result = response.json()

        if not result.get("result"):
            raise Exception("Odoo authentication failed")

        return result["result"]

    def execute(self, model, method, args=None, kwargs=None):

        uid = self.authenticate()

        response = requests.post(
            f"{ODOO_URL}/jsonrpc",
            json={
                "jsonrpc": "2.0",
                "method": "call",
                "params": {
                    "service": "object",
                    "method": "execute_kw",
                    "args": [
                        ODOO_DB,
                        uid,
                        ODOO_PASSWORD,
                        model,
                        method,
                        args or [],
                        kwargs or {},
                    ],
                },
                "id": 2,
            },
        )

        result = response.json()

        if "error" in result:
            raise Exception(str(result["error"]))

        return result.get("result")


odoo_service = OdooService()