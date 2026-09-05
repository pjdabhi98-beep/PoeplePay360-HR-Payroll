from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class AttendanceCreate(BaseModel):
    employee_id: int
    check_in: datetime
    check_out: Optional[datetime] = None


class AttendanceUpdate(BaseModel):
    check_out: Optional[datetime] = None