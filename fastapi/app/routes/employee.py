from fastapi import APIRouter, HTTPException

from app.schemas.employee import EmployeeCreate, EmployeeUpdate
from app.services.odoo_service import odoo_service


router = APIRouter(
    prefix="/employees",
    tags=["Employees"]
)


# GET ALL EMPLOYEES
@router.get("/")
def get_employees():

    try:
        employees = odoo_service.execute(
            "peoplepay.employee",
            "search_read",
            [[]],
            {
                "fields": [
                    "id",
                    "name",
                    "employee_code",
                    "department",
                    "job_position",
                    "status",
                ]
            }
        )

        return {
            "success": True,
            "data": employees
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


# GET EMPLOYEE BY ID
@router.get("/{employee_id}")
def get_employee(employee_id: int):

    try:
        employees = odoo_service.execute(
            "peoplepay.employee",
            "search_read",
            [[["id", "=", employee_id]]],
            {
                "fields": [
                    "id",
                    "name",
                    "employee_code",
                    "department",
                    "job_position",
                    "status",
                ]
            }
        )

        if not employees:
            raise HTTPException(
                status_code=404,
                detail="Employee not found"
            )

        return {
            "success": True,
            "data": employees[0]
        }

    except HTTPException:
        raise

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


# CREATE EMPLOYEE
@router.post("/")
def create_employee(employee: EmployeeCreate):

    try:
        employee_id = odoo_service.execute(
            "peoplepay.employee",
            "create",
            [[
                {
                    "name": employee.name,
                    "employee_code": employee.employee_code,
                    "department": employee.department,
                    "job_position": employee.job_position,
                    "status": employee.status,
                }
            ]]
        )

        return {
            "success": True,
            "message": "Employee created successfully",
            "employee_id": employee_id
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


# UPDATE EMPLOYEE
@router.put("/{employee_id}")
def update_employee(
    employee_id: int,
    employee: EmployeeUpdate
):

    try:
        existing = odoo_service.execute(
            "peoplepay.employee",
            "search",
            [[["id", "=", employee_id]]]
        )

        if not existing:
            raise HTTPException(
                status_code=404,
                detail="Employee not found"
            )

        values = employee.model_dump(exclude_unset=True)

        if not values:
            raise HTTPException(
                status_code=400,
                detail="No data provided for update"
            )

        odoo_service.execute(
            "peoplepay.employee",
            "write",
            [[employee_id], values]
        )

        return {
            "success": True,
            "message": "Employee updated successfully",
            "employee_id": employee_id
        }

    except HTTPException:
        raise

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


# DELETE EMPLOYEE
@router.delete("/{employee_id}")
def delete_employee(employee_id: int):

    try:
        existing = odoo_service.execute(
            "peoplepay.employee",
            "search",
            [[["id", "=", employee_id]]]
        )

        if not existing:
            raise HTTPException(
                status_code=404,
                detail="Employee not found"
            )

        odoo_service.execute(
            "peoplepay.employee",
            "unlink",
            [[employee_id]]
        )

        return {
            "success": True,
            "message": "Employee deleted successfully",
            "employee_id": employee_id
        }

    except HTTPException:
        raise

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )