from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class VillageBase(BaseModel):
    name: str
    population: Optional[int] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    description: Optional[str] = None

class VillageCreate(VillageBase):
    pass

class VillageUpdate(VillageBase):
    name: Optional[str] = None # All fields optional for update

class Village(VillageBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    # Basic stats can be included here directly or computed
    feedback_count: Optional[int] = None
    average_rating: Optional[float] = None

    model_config = {"from_attributes": True}

class VillageStats(BaseModel): # For the village profile endpoint
    id: int
    name: str
    population: Optional[int] = None
    description: Optional[str] = None
    # Add more complex stats as needed
    total_feedback: int
    recent_reports_summary: List[str] = [] # e.g., ["Water Quality: Good", "Health Issues: Low"]
    # progress: Optional[dict] = None # Could be more structured progress data
    model_config = {"from_attributes": True}