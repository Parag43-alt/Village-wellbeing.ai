from sqlalchemy import Column, String, Integer, Float, DateTime, Text, func
from app.db.base_class import Base

class Village(Base):
    name = Column(String, index=True, nullable=False)
    population = Column(Integer, nullable=True)
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    description = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())