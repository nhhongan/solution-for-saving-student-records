from sqlalchemy import Column, Integer, String, VARCHAR, ForeignKey, Float, DateTime, PrimaryKeyConstraint
from database.__init__ import Base

class Teach(Base):
    __tablename__ = 'teach'

    class_id = Column(Integer)
    day = Column(DateTime)
    room = Column(String)
    pid = Column(Integer)
    pname = Column(String)
    PrimaryKeyConstraint(pid, class_id)