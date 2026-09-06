from fastapi import APIRouter, HTTPException

from app.services.odoo_service import odoo_service


router = APIRouter(
    prefix="/payslips",
    tags=["Payslips"]
)


@router.get("/")
def get_payslips():
    try:
        payslips = odoo_service.execute(
            "peoplepay.payslip",
            "search_read",
            [[]],
            {
                "fields": [
                    "id",
                    "name",
                    "employee_id",
                    "contract_id",
                    "payrun_id",
                    "date_from",
                    "date_to",
                    "gross_salary",
                    "total_deduction",
                    "net_salary",
                    "state",
                    "line_ids",
                ],
                "order": "date_from desc, id desc",
            },
        )

        formatted_payslips = []

        for payslip in payslips:

            employee_id = payslip.get("employee_id")
            contract_id = payslip.get("contract_id")
            payrun_id = payslip.get("payrun_id")

            # Odoo Many2one fields normally return:
            # [id, display_name]
            employee_name = (
                employee_id[1]
                if isinstance(employee_id, list) and len(employee_id) > 1
                else "—"
            )

            employee_id_value = (
                employee_id[0]
                if isinstance(employee_id, list) and len(employee_id) > 0
                else None
            )

            contract_name = (
                contract_id[1]
                if isinstance(contract_id, list) and len(contract_id) > 1
                else "—"
            )

            payrun_name = (
                payrun_id[1]
                if isinstance(payrun_id, list) and len(payrun_id) > 1
                else "—"
            )

            # Format state
            state = payslip.get("state") or "draft"

            state_map = {
                "draft": "Draft",
                "computed": "Computed",
                "paid": "Paid",
                "cancelled": "Cancelled",
            }

            formatted_state = state_map.get(
                state,
                state.capitalize()
            )

            # Format salary
            gross_salary = float(
                payslip.get("gross_salary") or 0
            )

            total_deduction = float(
                payslip.get("total_deduction") or 0
            )

            net_salary = float(
                payslip.get("net_salary") or 0
            )

            # Format salary lines
            lines = []

            line_ids = payslip.get("line_ids") or []

            if line_ids:
                try:
                    salary_lines = odoo_service.execute(
                        "peoplepay.payslip.line",
                        "search_read",
                        [[["id", "in", line_ids]]],
                        {
                            "fields": [
                                "id",
                                "name",
                                "code",
                                "type",
                                "amount",
                            ]
                        },
                    )

                    for line in salary_lines:
                        lines.append(
                            {
                                "name": line.get("name") or "—",
                                "code": line.get("code") or "—",
                                "type": line.get("type") or "—",
                                "amount": float(
                                    line.get("amount") or 0
                                ),
                            }
                        )

                except Exception:
                    # If salary line model is unavailable,
                    # don't fail the complete payslip request.
                    lines = []

            formatted_payslips.append(
                {
                    "id": payslip.get("id"),
                    "name": payslip.get("name") or "—",

                    "employee": employee_name,
                    "employee_id": employee_id_value,

                    "contract": contract_name,
                    "payrun": payrun_name,

                    "dateFrom": payslip.get("date_from") or "",
                    "dateTo": payslip.get("date_to") or "",

                    "grossSalary": gross_salary,
                    "totalDeduction": total_deduction,
                    "netSalary": net_salary,

                    "state": formatted_state,

                    "lines": lines,
                }
            )

        return {
            "success": True,
            "data": formatted_payslips,
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


@router.get("/{payslip_id}")
def get_payslip(payslip_id: int):
    try:
        payslips = odoo_service.execute(
            "peoplepay.payslip",
            "search_read",
            [[["id", "=", payslip_id]]],
            {
                "fields": [
                    "id",
                    "name",
                    "employee_id",
                    "contract_id",
                    "payrun_id",
                    "date_from",
                    "date_to",
                    "gross_salary",
                    "total_deduction",
                    "net_salary",
                    "state",
                    "line_ids",
                ]
            },
        )

        if not payslips:
            raise HTTPException(
                status_code=404,
                detail="Payslip not found"
            )

        payslip = payslips[0]

        employee_id = payslip.get("employee_id")
        contract_id = payslip.get("contract_id")
        payrun_id = payslip.get("payrun_id")

        employee_name = (
            employee_id[1]
            if isinstance(employee_id, list) and len(employee_id) > 1
            else "—"
        )

        contract_name = (
            contract_id[1]
            if isinstance(contract_id, list) and len(contract_id) > 1
            else "—"
        )

        payrun_name = (
            payrun_id[1]
            if isinstance(payrun_id, list) and len(payrun_id) > 1
            else "—"
        )

        state_map = {
            "draft": "Draft",
            "computed": "Computed",
            "paid": "Paid",
            "cancelled": "Cancelled",
        }

        state = payslip.get("state") or "draft"

        return {
            "success": True,
            "data": {
                "id": payslip.get("id"),
                "name": payslip.get("name") or "—",
                "employee": employee_name,
                "contract": contract_name,
                "payrun": payrun_name,
                "dateFrom": payslip.get("date_from") or "",
                "dateTo": payslip.get("date_to") or "",
                "grossSalary": float(
                    payslip.get("gross_salary") or 0
                ),
                "totalDeduction": float(
                    payslip.get("total_deduction") or 0
                ),
                "netSalary": float(
                    payslip.get("net_salary") or 0
                ),
                "state": state_map.get(
                    state,
                    state.capitalize()
                ),
                "lines": [],
            },
        }

    except HTTPException:
        raise

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )