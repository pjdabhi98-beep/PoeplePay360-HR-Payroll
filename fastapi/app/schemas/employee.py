from typing import Optional

from pydantic import BaseModel


class EmployeeCreate(BaseModel):
    name: str
    employee_code: str
    department: Optional[str] = None
    job_position: Optional[str] = None
    status: str = "active"


class EmployeeUpdate(BaseModel):
    name: Optional[str] = None
    employee_code: Optional[str] = None
    department: Optional[str] = None
    job_position: Optional[str] = None
    status: Optional[str] = None