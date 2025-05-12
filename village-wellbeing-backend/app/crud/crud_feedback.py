from sqlalchemy.orm import Session
from app.crud.base import CRUDBase
from app.db.models.feedback import Feedback
from app.schemas.feedback import FeedbackCreate

class CRUDFeedback(CRUDBase[Feedback, FeedbackCreate, FeedbackCreate]): # Update schema can be different if needed
    def get_by_village(self, db: Session, *, village_id: int, skip: int = 0, limit: int = 100):
        return db.query(self.model).filter(Feedback.village_id == village_id).offset(skip).limit(limit).all()

feedback = CRUDFeedback(Feedback)