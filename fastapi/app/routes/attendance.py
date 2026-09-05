from fastapi import APIRouter, HTTPException

from app.schemas.attendance import AttendanceCreate, AttendanceUpdate
from app.services.odoo_service import odoo_service


router = APIRouter(
    prefix="/attendance",
    tags=["Attendance"]
)


# GET ATTENDANCE
@router.get("/")
def get_attendance():

    try:
        data = odoo_service.execute(
            "peoplepay.attendance",
            "search_read",
            [[]],
            {
                "fields": [
                    "id",
                    "employee_id",
                    "check_in",
                    "check_out",
                    "worked_hours",
                    "state",
                ]
            }
        )

        return {
            "success": True,
            "data": data
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# CHECK IN
@router.post("/")
def create_attendance(attendance: AttendanceCreate):

    try:
        attendance_id = odoo_service.execute(
            "peoplepay.attendance",
            "create",
            [[
                {
                    "employee_id": attendance.employee_id,
                    "check_in": attendance.check_in.isoformat(),
                    "check_out": (
                        attendance.check_out.isoformat()
                        if attendance.check_out
                        else False
                    ),
                }
            ]]
        )

        return {
            "success": True,
            "message": "Attendance created successfully",
            "attendance_id": attendance_id
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# CHECK OUT
@router.put("/{attendance_id}")
def update_attendance(
    attendance_id: int,
    attendance: AttendanceUpdate
):

    try:
        existing = odoo_service.execute(
            "peoplepay.attendance",
            "search",
            [[["id", "=", attendance_id]]]
        )

        if not existing:
            raise HTTPException(
                status_code=404,
                detail="Attendance not found"
            )

        if not attendance.check_out:
            raise HTTPException(
                status_code=400,
                detail="Check out time is required"
            )

        odoo_service.execute(
            "peoplepay.attendance",
            "write",
            [[attendance_id], {
                "check_out": attendance.check_out.isoformat()
            }]
        )

        return {
            "success": True,
            "message": "Attendance checked out successfully",
            "attendance_id": attendance_id
        }

    except HTTPException:
        raise

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))