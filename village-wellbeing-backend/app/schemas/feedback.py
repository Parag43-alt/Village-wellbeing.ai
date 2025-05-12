from pydantic import BaseModel, field_validator
from typing import Optional
from datetime import datetime

class FeedbackBase(BaseModel):
    user_name: Optional[str] = None
    rating: Optional[int] = None
    text_feedback: str
    category: str # This corresponds to 'type' from frontend: e.g. 'health', 'water'
    village_id: Optional[int] = None # Optional if feedback is general

    @field_validator('rating')
    def rating_must_be_in_range(cls, v):
        if v is not None and (v < 1 or v > 5):
            raise ValueError('Rating must be between 1 and 5')
        return v

class FeedbackCreate(FeedbackBase):
    pass

class Feedback(FeedbackBase):
    id: int
    timestamp: datetime
    model_config = {"from_attributes": True}
