from fastapi import APIRouter, HTTPException

from app.services.odoo_service import odoo_service


router = APIRouter(
    prefix="/attendance",
    tags=["Attendance"]
)


@router.get("/")
def get_attendance():
    try:
        records = odoo_service.execute(
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
                ],
                "order": "check_in desc",
            }
        )

        return {
            "success": True,
            "data": records,
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


@router.get("/{attendance_id}")
def get_attendance_record(attendance_id: int):
    try:
        records = odoo_service.execute(
            "peoplepay.attendance",
            "search_read",
            [
                [
                    ["id", "=", attendance_id]
                ]
            ],
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

        if not records:
            raise HTTPException(
                status_code=404,
                detail="Attendance record not found"
            )

        return {
            "success": True,
            "data": records[0],
        }

    except HTTPException:
        raise

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )