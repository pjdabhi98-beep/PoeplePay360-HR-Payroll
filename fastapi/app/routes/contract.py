from fastapi import APIRouter, HTTPException

from app.schemas.contract import ContractCreate, ContractUpdate
from app.services.odoo_service import odoo_service


router = APIRouter(
    prefix="/contracts",
    tags=["Contracts"]
)


# -----------------------------------------
# GET ALL CONTRACTS
# -----------------------------------------
@router.get("/")
def get_contracts():
    try:
        contracts = odoo_service.execute(
            "peoplepay.contract",
            "search_read",
            [[]],
            {
                "fields": [
                    "id",
                    "name",
                    "employee_id",
                    "start_date",
                    "end_date",
                    "wage",
                    "salary_structure_id",
                    "state",
                ],
                "order": "start_date desc",
            }
        )

        return {
            "success": True,
            "data": contracts,
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


# -----------------------------------------
# GET SINGLE CONTRACT
# -----------------------------------------
@router.get("/{contract_id}")
def get_contract(contract_id: int):
    try:
        contracts = odoo_service.execute(
            "peoplepay.contract",
            "search_read",
            [[
                ["id", "=", contract_id]
            ]],
            {
                "fields": [
                    "id",
                    "name",
                    "employee_id",
                    "start_date",
                    "end_date",
                    "wage",
                    "salary_structure_id",
                    "state",
                ]
            }
        )

        if not contracts:
            raise HTTPException(
                status_code=404,
                detail="Contract not found"
            )

        return {
            "success": True,
            "data": contracts[0],
        }

    except HTTPException:
        raise

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


# -----------------------------------------
# CREATE CONTRACT
# -----------------------------------------
@router.post("/")
def create_contract(contract: ContractCreate):
    try:
        contract_id = odoo_service.execute(
            "peoplepay.contract",
            "create",
            [[
                {
                    "name": contract.name,
                    "employee_id": contract.employee_id,
                    "start_date": contract.start_date.isoformat(),
                    "end_date": (
                        contract.end_date.isoformat()
                        if contract.end_date
                        else False
                    ),
                    "wage": contract.wage,
                    "salary_structure_id": (
                        contract.salary_structure_id
                        if contract.salary_structure_id
                        else False
                    ),
                    "state": contract.state,
                }
            ]]
        )

        return {
            "success": True,
            "message": "Contract created successfully",
            "contract_id": contract_id,
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


# -----------------------------------------
# UPDATE CONTRACT
# -----------------------------------------
@router.put("/{contract_id}")
def update_contract(
    contract_id: int,
    contract: ContractUpdate
):
    try:
        existing = odoo_service.execute(
            "peoplepay.contract",
            "search",
            [[
                ["id", "=", contract_id]
            ]]
        )

        if not existing:
            raise HTTPException(
                status_code=404,
                detail="Contract not found"
            )

        values = contract.model_dump(
            exclude_unset=True,
            mode="json"
        )

        if not values:
            raise HTTPException(
                status_code=400,
                detail="No data provided for update"
            )

        odoo_service.execute(
            "peoplepay.contract",
            "write",
            [
                [contract_id],
                values
            ]
        )

        return {
            "success": True,
            "message": "Contract updated successfully",
            "contract_id": contract_id,
        }

    except HTTPException:
        raise

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


# -----------------------------------------
# DELETE CONTRACT
# -----------------------------------------
@router.delete("/{contract_id}")
def delete_contract(contract_id: int):
    try:
        existing = odoo_service.execute(
            "peoplepay.contract",
            "search",
            [[
                ["id", "=", contract_id]
            ]]
        )

        if not existing:
            raise HTTPException(
                status_code=404,
                detail="Contract not found"
            )

        odoo_service.execute(
            "peoplepay.contract",
            "unlink",
            [[contract_id]]
        )

        return {
            "success": True,
            "message": "Contract deleted successfully",
            "contract_id": contract_id,
        }

    except HTTPException:
        raise

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )