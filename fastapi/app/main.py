from fastapi import FastAPI

from app.routes.employee import router as employee_router
from app.routes.contract import router as contract_router
from app.routes.working_schedule import router as working_schedule_router
from app.routes.attendance import router as attendance_router
from app.routes.dashboard import router as dashboard_router
from app.routes.Timeoff import router as time_off_router
from app.routes.payslip import router as payslip_router
from app.routes.payroll import router as payroll_router

app = FastAPI()

app.include_router(employee_router)
app.include_router(contract_router)
app.include_router(working_schedule_router)
app.include_router(attendance_router)
app.include_router(dashboard_router)
app.include_router(time_off_router)
app.include_router(payslip_router)
app.include_router(payroll_router)

@app.get("/")
def root():
	return {
		"message": "PeoplePay360 FastAPI is running"
	}