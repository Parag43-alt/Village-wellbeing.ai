from sqlalchemy import Column, String, Integer, Text, DateTime, ForeignKey, func
from sqlalchemy.orm import relationship
from app.db.base_class import Base

class Feedback(Base):
    village_id = Column(Integer, ForeignKey("villages.id"), nullable=True) # Allow feedback not tied to a specific village initially
    user_name = Column(String, nullable=True) # Optional, if user provides name
    rating = Column(Integer, nullable=True) # e.g., 1-5 stars
    text_feedback = Column(Text, nullable=False)
    category = Column(String, index=True, nullable=False) # e.g., health, water, education, general
    timestamp = Column(DateTime(timezone=True), server_default=func.now())

    village = relationship("Village")