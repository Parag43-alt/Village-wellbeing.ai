from typing import List, Any
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app import crud, schemas
from app.db.database import get_db
from app.api.v1.endpoints.auth import get_current_active_superuser # For create/update/delete

router = APIRouter()

@router.post("/", response_model=schemas.Village, status_code=status.HTTP_201_CREATED)
def create_village(
    *,
    db: Session = Depends(get_db),
    village_in: schemas.VillageCreate,
    current_user: schemas.User = Depends(get_current_active_superuser) # Require superuser
):
    """
    Create a new village. (Admin only)
    """
    village = crud.village.create(db=db, obj_in=village_in)
    return village

@router.get("/", response_model=List[schemas.Village])
def read_villages(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
):
    """
    Retrieve all villages.
    """
    villages = crud.village.get_multi(db, skip=skip, limit=limit)
    return villages

@router.get("/{village_id}", response_model=schemas.VillageStats) # Using VillageStats for profile
def read_village_profile(
    *,
    db: Session = Depends(get_db),
    village_id: int,
):
    """
    Fetch a specific village profile with stats and progress reports.
    """
    village_profile_data = crud.village.get_with_stats(db, village_id=village_id)
    if not village_profile_data:
        raise HTTPException(status_code=404, detail="Village not found")
    return schemas.VillageStats(**village_profile_data)


@router.put("/{village_id}", response_model=schemas.Village)
def update_village(
    *,
    db: Session = Depends(get_db),
    village_id: int,
    village_in: schemas.VillageUpdate,
    current_user: schemas.User = Depends(get_current_active_superuser) # Require superuser
):
    """
    Update a village. (Admin only)
    """
    village = crud.village.get(db, id=village_id)
    if not village:
        raise HTTPException(status_code=404, detail="Village not found")
    village = crud.village.update(db=db, db_obj=village, obj_in=village_in)
    return village

@router.delete("/{village_id}", response_model=schemas.Village)
def delete_village(
    *,
    db: Session = Depends(get_db),
    village_id: int,
    current_user: schemas.User = Depends(get_current_active_superuser) # Require superuser
):
    """
    Delete a village. (Admin only)
    """
    village = crud.village.get(db, id=village_id)
    if not village:
        raise HTTPException(status_code=404, detail="Village not found")
    # Add logic here to handle related feedback/reports if necessary (e.g., cascade delete or disassociate)
    # For now, simple delete
    village = crud.village.remove(db=db, id=village_id)
    return village