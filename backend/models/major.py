from sqlalchemy import Column, Integer, String, VARCHAR, ForeignKey, Float, DateTime, PrimaryKeyConstraint
from database.__init__ import Base
from sqlalchemy.orm import relationship

class Major(Base):
    __tablename__ = 'major'

    major_id = Column(String, primary_key=True, index=True)
    major_name = Column(String)
    students = relationship("Student", back_populates="major")
    