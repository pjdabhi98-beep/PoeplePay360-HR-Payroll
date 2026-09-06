from typing import Optional

from pydantic import BaseModel


class WorkingScheduleCreate(BaseModel):
    name: str
    type: str = "regular"
    day: str
    start_time: float
    end_time: float
    break_hours: float = 0.0


class WorkingScheduleUpdate(BaseModel):
    name: Optional[str] = None
    type: Optional[str] = None
    day: Optional[str] = None
    start_time: Optional[float] = None
    end_time: Optional[float] = None
    break_hours: Optional[float] = None