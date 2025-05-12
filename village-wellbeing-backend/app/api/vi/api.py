from fastapi import APIRouter

from app.api.v1.endpoints import auth, feedback, reports, suggestions, villages

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["Authentication"])
api_router.include_router(feedback.router, prefix="/feedback", tags=["Feedback"])
api_router.include_router(reports.router, prefix="/reports", tags=["Reports"])
api_router.include_router(suggestions.router, prefix="/suggestions", tags=["AI Suggestions"])
api_router.include_router(villages.router, prefix="/villages", tags=["Villages"])