from sqlalchemy import Column, Integer, String, VARCHAR, ForeignKey
from database.__init__ import Base

class Student(Base):
    __tablename__ = 'student'

    sid = Column(VARCHAR, primary_key=True, index=True)
    sname = Column(String, nullable=False)
    scholarship_id = Column(Integer)
    major_name = Column(String, ForeignKey('major.major_name'))

