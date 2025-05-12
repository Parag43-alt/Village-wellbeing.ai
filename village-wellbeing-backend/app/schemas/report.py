from pydantic import BaseModel
from typing import Optional, Dict, Any
from datetime import datetime

class ReportBase(BaseModel):
    village_id: int
    report_type: str # e.g., 'health', 'water_quality'
    data: Dict[str, Any]
    source: Optional[str] = None

class ReportCreate(ReportBase):
    pass

class Report(ReportBase):
    id: int
    reported_at: datetime
    model_config = {"from_attributes": True}