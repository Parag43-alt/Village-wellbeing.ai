from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session

from app import crud, schemas
from app.db.database import get_db
from app.api.v1.endpoints.auth import get_current_active_superuser # For POST/DELETE operations

router = APIRouter()

@router.post("/", response_model=schemas.Report, status_code=status.HTTP_201_CREATED)
def create_report(
    *,
    db: Session = Depends(get_db),
    report_in: schemas.ReportCreate,
    current_user: schemas.User = Depends(get_current_active_superuser) # Only superusers can create reports
):
    """
    Create a new health or water quality report.
    Requires admin authentication.
    Example body: {"village_id": 1, "report_type": "water_quality", "data": {"ph": 7.1, "turbidity": "clear", "summary": "Good"}}
    """
    village = crud.village.get(db, id=report_in.village_id)
    if not village:
        raise HTTPException(status_code=404, detail=f"Village with id {report_in.village_id} not found.")
    
    report = crud.report.create(db=db, obj_in=report_in)
    return report

@router.get("/", response_model=List[schemas.Report])
def read_reports(
    db: Session = Depends(get_db),
    village_id: int = Query(..., description="ID of the village for which to fetch reports"),
    report_type: Optional[str] = Query(None, description="Type of report (e.g., 'health', 'water_quality')"),
    skip: int = 0,
    limit: int = 10,
):
    """
    Fetch health and water quality reports for a specific village.
    Example: /api/v1/reports/?village_id=1&report_type=water_quality
    """
    village = crud.village.get(db, id=village_id)
    if not village:
        raise HTTPException(status_code=404, detail=f"Village with id {village_id} not found.")

    if report_type:
        reports = crud.report.get_by_village_and_type(
            db, village_id=village_id, report_type=report_type, skip=skip, limit=limit
        )
    else:
        # Fetch all reports for the village if type is not specified (less common use case for frontend)
        reports = db.query(crud.report.model).filter(crud.report.model.village_id == village_id).offset(skip).limit(limit).all()
    
    if not reports:
        # It's okay to return an empty list if no reports match
        return []
    return reports


@router.get("/{report_id}", response_model=schemas.Report)
def read_report(
    *,
    db: Session = Depends(get_db),
    report_id: int,
):
    """
    Get a specific report by its ID.
    """
    report_obj = crud.report.get(db, id=report_id)
    if not report_obj:
        raise HTTPException(status_code=404, detail="Report not found")
    return report_obj