from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session

from app import crud, schemas
from app.db.database import get_db
# from app.api.v1.endpoints.auth import get_current_active_user # If feedback submission requires login

router = APIRouter()

@router.post("/", response_model=schemas.Feedback, status_code=status.HTTP_201_CREATED)
def submit_feedback(
    *,
    db: Session = Depends(get_db),
    feedback_in: schemas.FeedbackCreate,
    # current_user: schemas.User = Depends(get_current_active_user) # Uncomment if auth is needed
):
    """
    Submit new feedback.
    The frontend sends 'type' which maps to 'category' here.
    Example body: {"category": "health", "text_feedback": "Great initiative!", "rating": 5, "village_id": 1}
    """
    # Optional: Validate village_id if provided
    if feedback_in.village_id:
        village = crud.village.get(db, id=feedback_in.village_id)
        if not village:
            raise HTTPException(status_code=404, detail=f"Village with id {feedback_in.village_id} not found.")
    
    feedback = crud.feedback.create(db=db, obj_in=feedback_in)
    return feedback

@router.get("/", response_model=List[schemas.Feedback])
def read_feedback(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    village_id: Optional[int] = Query(None, description="Filter feedback by village ID"),
    # current_user: schemas.User = Depends(get_current_active_user) # Optional: for admin to view all
):
    """
    Retrieve feedback. Optionally filter by village_id.
    """
    if village_id:
        feedbacks = crud.feedback.get_by_village(db, village_id=village_id, skip=skip, limit=limit)
    else:
        feedbacks = crud.feedback.get_multi(db, skip=skip, limit=limit)
    return feedbacks