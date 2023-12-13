from sqlalchemy import Column, Integer, String, VARCHAR, ForeignKey
from database.__init__ import Base
from sqlalchemy.orm import relationship
from models.major import Major
from models.scholarship import Scholarship

class Student(Base):
    __tablename__ = 'student'

    sid = Column(VARCHAR, primary_key=True, index=True)
    sname = Column(String, nullable=False)
    scholarship_id = Column(Integer, ForeignKey('scholarship.id'))
    major_id = Column(String, ForeignKey('major.major_id'))
    major = relationship("Major", back_populates="students")
    scholarship = relationship("Scholarship", back_populates="students")

