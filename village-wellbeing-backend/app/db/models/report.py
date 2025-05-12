from sqlalchemy import Column, String, Integer, JSON, DateTime, ForeignKey, func
from sqlalchemy.orm import relationship
from app.db.base_class import Base

class Report(Base):
    village_id = Column(Integer, ForeignKey("villages.id"), nullable=False)
    report_type = Column(String, index=True, nullable=False) # e.g., 'health', 'water_quality'
    data = Column(JSON, nullable=False) # Flexible JSON field for report details
    # Example: {"ph": 7.2, "turbidity": "low", "contaminants": ["arsenic"]}
    # Example: {"cases_malaria": 10, "vaccination_rate_percent": 75}
    reported_at = Column(DateTime(timezone=True), server_default=func.now())
    source = Column(String, nullable=True) # e.g., 'manual_entry', 'sensor_data', 'survey'

    village = relationship("Village")