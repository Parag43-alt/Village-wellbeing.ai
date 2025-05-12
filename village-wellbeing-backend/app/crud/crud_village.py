from sqlalchemy.orm import Session
from app.crud.base import CRUDBase
from app.db.models.village import Village
from app.db.models.feedback import Feedback
from app.db.models.report import Report
from app.schemas.village import VillageCreate, VillageUpdate
from sqlalchemy import func, desc

class CRUDVillage(CRUDBase[Village, VillageCreate, VillageUpdate]):
    def get_with_stats(self, db: Session, village_id: int) -> dict:
        village = db.query(Village).filter(Village.id == village_id).first()
        if not village:
            return None

        feedback_count = db.query(func.count(Feedback.id)).filter(Feedback.village_id == village_id).scalar()
        
        recent_health_reports = db.query(Report.data, Report.reported_at) \
            .filter(Report.village_id == village_id, Report.report_type == 'health') \
            .order_by(desc(Report.reported_at)) \
            .limit(1).all()
        
        recent_water_reports = db.query(Report.data, Report.reported_at) \
            .filter(Report.village_id == village_id, Report.report_type == 'water_quality') \
            .order_by(desc(Report.reported_at)) \
            .limit(1).all()

        reports_summary = []
        if recent_health_reports:
            reports_summary.append(f"Health (as of {recent_health_reports[0].reported_at.strftime('%Y-%m-%d')}): {recent_health_reports[0].data.get('summary', 'Details in report')}")
        if recent_water_reports:
            reports_summary.append(f"Water Quality (as of {recent_water_reports[0].reported_at.strftime('%Y-%m-%d')}): {recent_water_reports[0].data.get('summary', 'Details in report')}")


        return {
            "id": village.id,
            "name": village.name,
            "population": village.population,
            "description": village.description,
            "total_feedback": feedback_count or 0,
            "recent_reports_summary": reports_summary
        }


village = CRUDVillage(Village)