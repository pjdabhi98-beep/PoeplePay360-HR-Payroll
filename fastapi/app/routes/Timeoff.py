from fastapi import APIRouter, HTTPException

from app.services.odoo_service import odoo_service


router = APIRouter(
    prefix="/time-off",
    tags=["Time Off"]
)


@router.get("/")
def get_time_off_requests():

    try:
        requests = odoo_service.execute(
            "peoplepay.time.off.request",
            "search_read",
            [[]],
            {
                "fields": [
                    "id",
                    "employee_id",
                    "time_off_type_id",
                    "start_date",
                    "end_date",
                    "days",
                    "reason",
                    "state",
                ]
            }
        )

        data = []

        for request in requests:

            employee = request.get("employee_id")
            leave_type = request.get("time_off_type_id")

            employee_id = None
            employee_name = "—"

            if isinstance(employee, list):
                if len(employee) > 0:
                    employee_id = employee[0]

                if len(employee) > 1:
                    employee_name = employee[1]

            leave_type_id = None
            leave_type_name = "—"

            if isinstance(leave_type, list):
                if len(leave_type) > 0:
                    leave_type_id = leave_type[0]

                if len(leave_type) > 1:
                    leave_type_name = leave_type[1]

            data.append({
                "id": request.get("id"),

                "employee_id": employee_id,

                "employee": employee_name,

                "time_off_type_id": leave_type_id,

                "leaveType": leave_type_name,

                "start_date": request.get("start_date"),

                "end_date": request.get("end_date"),

                "days": float(
                    request.get("days") or 0
                ),

                "reason": request.get("reason") or "",

                "state": request.get("state") or "draft",
            })

        return {
            "success": True,
            "data": data,
        }

    except Exception as e:

        print(
            "Time Off Odoo error:",
            str(e)
        )

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )