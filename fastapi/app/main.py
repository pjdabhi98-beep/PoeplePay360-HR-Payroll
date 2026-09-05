from fastapi import FastAPI

from app.routes.employee import router as employee_router
from app.routes.contract import router as contract_router
from app.routes.working_schedule import router as working_schedule_router
from app.routes.attendance import router as attendance_router

from app.services.odoo_service import odoo_service


app = FastAPI(
    title="PeoplePay360 API",
    description="PeoplePay360 Payroll Management API",
    version="1.0.0"
)


app.include_router(employee_router)
app.include_router(contract_router)
app.include_router(working_schedule_router)
app.include_router(attendance_router)


@app.get("/")
def root():
    return {
        "success": True,
        "message": "PeoplePay360 API is running"
    }


@app.get("/odoo-test")
def odoo_test():

    try:
        uid = odoo_service.authenticate()

        return {
            "success": True,
            "message": "FastAPI connected to Odoo successfully",
            "odoo_user_id": uid
        }

    except Exception as e:
        return {
            "success": False,
            "message": str(e)
        }