from sqlalchemy import Column, Integer, String, VARCHAR, ForeignKey, Float, DateTime, PrimaryKeyConstraint
from database.__init__ import Base
from sqlalchemy.orm import relationship

class Course(Base):
    __tablename__ = 'course'

    cid = Column(VARCHAR, primary_key=True, index=True)
    major_id = Column(String, ForeignKey('major.major_id'))
    cname = Column(String, nullable=False)
    credit = Column(Integer)
    fee = Column(Float)
    classes = relationship("Class", back_populates="course")