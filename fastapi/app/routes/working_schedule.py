from fastapi import APIRouter, HTTPException

from app.schemas.working_schedule import (
    WorkingScheduleCreate,
    WorkingScheduleUpdate,
)
from app.services.odoo_service import odoo_service


router = APIRouter(
    prefix="/working-schedules",
    tags=["Working Schedules"]
)


# GET ALL WORKING SCHEDULES
@router.get("/")
def get_working_schedules():

    try:
        schedules = odoo_service.execute(
            "peoplepay.working.schedule",
            "search_read",
            [[]],
            {
                "fields": [
                    "id",
                    "name",
                    "type",
                    "day",
                    "start_time",
                    "end_time",
                    "break_hours",
                    "total_hours",
                ]
            }
        )

        return {
            "success": True,
            "data": schedules
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


# GET WORKING SCHEDULE BY ID
@router.get("/{schedule_id}")
def get_working_schedule(schedule_id: int):

    try:
        schedules = odoo_service.execute(
            "peoplepay.working.schedule",
            "search_read",
            [[["id", "=", schedule_id]]],
            {
                "fields": [
                    "id",
                    "name",
                    "type",
                    "day",
                    "start_time",
                    "end_time",
                    "break_hours",
                    "total_hours",
                ]
            }
        )

        if not schedules:
            raise HTTPException(
                status_code=404,
                detail="Working schedule not found"
            )

        return {
            "success": True,
            "data": schedules[0]
        }

    except HTTPException:
        raise

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


# CREATE WORKING SCHEDULE
@router.post("/")
def create_working_schedule(schedule: WorkingScheduleCreate):

    try:
        schedule_id = odoo_service.execute(
            "peoplepay.working.schedule",
            "create",
            [[
                {
                    "name": schedule.name,
                    "type": schedule.type,
                    "day": schedule.day,
                    "start_time": schedule.start_time,
                    "end_time": schedule.end_time,
                    "break_hours": schedule.break_hours,
                }
            ]]
        )

        return {
            "success": True,
            "message": "Working schedule created successfully",
            "schedule_id": schedule_id
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


# UPDATE WORKING SCHEDULE
@router.put("/{schedule_id}")
def update_working_schedule(
    schedule_id: int,
    schedule: WorkingScheduleUpdate
):

    try:
        existing = odoo_service.execute(
            "peoplepay.working.schedule",
            "search",
            [[["id", "=", schedule_id]]]
        )

        if not existing:
            raise HTTPException(
                status_code=404,
                detail="Working schedule not found"
            )

        values = schedule.model_dump(exclude_unset=True)

        if not values:
            raise HTTPException(
                status_code=400,
                detail="No data provided for update"
            )

        odoo_service.execute(
            "peoplepay.working.schedule",
            "write",
            [[schedule_id], values]
        )

        return {
            "success": True,
            "message": "Working schedule updated successfully",
            "schedule_id": schedule_id
        }

    except HTTPException:
        raise

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


# DELETE WORKING SCHEDULE
@router.delete("/{schedule_id}")
def delete_working_schedule(schedule_id: int):

    try:
        existing = odoo_service.execute(
            "peoplepay.working.schedule",
            "search",
            [[["id", "=", schedule_id]]]
        )

        if not existing:
            raise HTTPException(
                status_code=404,
                detail="Working schedule not found"
            )

        odoo_service.execute(
            "peoplepay.working.schedule",
            "unlink",
            [[schedule_id]]
        )

        return {
            "success": True,
            "message": "Working schedule deleted successfully",
            "schedule_id": schedule_id
        }

    except HTTPException:
        raise

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )