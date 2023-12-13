from sqlalchemy import Column, Integer, String, VARCHAR, ForeignKey, Float, DateTime, PrimaryKeyConstraint
from database.__init__ import Base

class Class(Base):
    __tablename__ = 'class'

    class_id = Column(Integer)
    cid = Column(VARCHAR, ForeignKey('course.cid'))
    day = Column(String)
    slot = Column(Integer)
    start_period = Column(Integer)
    end_period = Column(Integer)
    start_date = Column(String)
    end_date = Column(String)
    room = Column(String)
    professor_name = Column(String)
    semester = Column(String)
    PrimaryKeyConstraint(class_id, day, room)