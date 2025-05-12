from typing import List, Optional
from sqlalchemy.orm import Session
from app.crud.base import CRUDBase
from app.db.models.report import Report
from app.schemas.report import ReportCreate

class CRUDReport(CRUDBase[Report, ReportCreate, ReportCreate]): # Update schema can be different
    def get_by_village_and_type(
        self, db: Session, *, village_id: int, report_type: str, skip: int = 0, limit: int = 10
    ) -> List[Report]:
        return (
            db.query(self.model)
            .filter(Report.village_id == village_id, Report.report_type == report_type)
            .order_by(Report.reported_at.desc())
            .offset(skip)
            .limit(limit)
            .all()
        )

report = CRUDReport(Report)