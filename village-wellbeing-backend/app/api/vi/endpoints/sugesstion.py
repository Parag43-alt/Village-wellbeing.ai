from typing import List, Optional
from fastapi import APIRouter, Query, HTTPException

from app.schemas.village import Village # Using this just for structure, can be a simpler schema
from app.services import ai_suggestions

router = APIRouter()

class Suggestion(BaseModel): # Define a schema for suggestions
    id: int
    suggestion: str
    priority: str

@router.get("/", response_model=List[Suggestion])
def get_village_suggestions(
    category: str = Query(..., description="Category for suggestions (e.g., health, water_quality)"),
    village_id: Optional[int] = Query(None, description="ID of the village to get suggestions for (currently illustrative)"),
):
    """
    Fetch AI-based suggestions for village improvement.
    Example: /api/v1/suggestions/?category=health&village_id=1
    """
    if not category:
        raise HTTPException(status_code=400, detail="Category query parameter is required.")
    
    suggestions_list = ai_suggestions.get_ai_suggestions(category=category, village_id=village_id)
    if not suggestions_list:
        # Return empty list if no suggestions for category, or you can 404
        return []
        # raise HTTPException(status_code=404, detail=f"No suggestions found for category '{category}'.")
    return suggestions_list