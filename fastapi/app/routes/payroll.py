from fastapi import APIRouter, HTTPException

from app.services.odoo_service import odoo_service


router = APIRouter(prefix="/payroll", tags=["Payroll"])


@router.get("/")
def get_payruns():
    try:
        payruns = odoo_service.execute(
            "peoplepay.payrun",
            "search_read",
            [[]],
            {
                "fields": [
                    "id",
                    "name",
                    "date_start",
                    "date_end",
                    "state",
                    "payslip_count",
                ],
                "order": "date_start desc",
            },
        )

        return {
            "success": True,
            "data": payruns,
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e),
        )


@router.get("/{payrun_id}")
def get_payrun(payrun_id: int):
    try:
        payruns = odoo_service.execute(
            "peoplepay.payrun",
            "search_read",
            [[["id", "=", payrun_id]]],
            {
                "fields": [
                    "id",
                    "name",
                    "date_start",
                    "date_end",
                    "state",
                    "payslip_count",
                ],
            },
        )

        if not payruns:
            raise HTTPException(
                status_code=404,
                detail="Payrun not found",
            )

        return {
            "success": True,
            "data": payruns[0],
        }

    except HTTPException:
        raise

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e),
        )