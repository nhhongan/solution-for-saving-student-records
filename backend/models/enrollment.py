from sqlalchemy import Column, Integer, String, VARCHAR, ForeignKey, Float, DateTime, PrimaryKeyConstraint
from database.__init__ import Base
from sqlalchemy.orm import relationship

class Enrollment(Base):
    __tablename__ = 'enrollment'

    sid = Column(VARCHAR, ForeignKey('student.sid'))
    class_id = Column(Integer, ForeignKey('class.class_id'))
    inclass = Column(Integer)
    midterm = Column(Integer)
    final = Column(Integer)
    gpa = Column(Integer)
    PrimaryKeyConstraint(sid, class_id)
    