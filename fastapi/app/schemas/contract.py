from typing import Optional
from datetime import date

from pydantic import BaseModel


class ContractCreate(BaseModel):
    name: str
    employee_id: int
    start_date: date
    end_date: Optional[date] = None
    wage: float = 0.0
    salary_structure_id: Optional[int] = None
    state: str = "draft"


class ContractUpdate(BaseModel):
    name: Optional[str] = None
    employee_id: Optional[int] = None
    start_date: Optional[date] = None
    end_date: Optional[date] = None
    wage: Optional[float] = None
    salary_structure_id: Optional[int] = None
    state: Optional[str] = None