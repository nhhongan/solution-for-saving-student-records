from sqlalchemy import Column, Integer, String
from database.__init__ import Base
from sqlalchemy.orm import relationship

class ExamSchedule(Base):
    __tablename__ = 'exam_schedule'

    class_id = Column(Integer, primary_key=True, index=True)
    day = Column(String)
    time = Column(String)
    room = Column(String)
    class_ = relationship("Class", back_populates="exam_schedule")