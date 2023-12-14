from sqlalchemy import Column, Integer, String, ForeignKey, PrimaryKeyConstraint
from database.__init__ import Base
from sqlalchemy.orm import relationship

class ExamScheduleModel(Base):
    __tablename__ = 'exam_schedule'

    class_id = Column(Integer, ForeignKey("class.class_id"))
    day = Column(String)
    time = Column(String)
    room = Column(String)
    PrimaryKeyConstraint(day, time, room) 