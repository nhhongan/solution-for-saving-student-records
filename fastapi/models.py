from sqlalchemy import Column, Integer, String, VARCHAR, ForeignKey, Float, DateTime, PrimaryKeyConstraint
from database import Base

class User(Base):
    __tablename__ = 'user'

    user_id = Column(Integer, primary_key=True, index=True)
    username = Column(VARCHAR(20), nullable=False)
    password = Column(String)
    sid = Column(VARCHAR, ForeignKey('student.sid'))

class Student(Base):
    __tablename__ = 'student'

    sid = Column(VARCHAR, primary_key=True, index=True)
    sname = Column(String, nullable=False)
    scholarship_id = Column(Integer)
    major_name = Column(String, ForeignKey('major.major_name'))

class Course(Base):
    __tablename__ = 'course'

    cid = Column(VARCHAR, primary_key=True, index=True)
    major_id = Column(String, ForeignKey('major.major_id'))
    cname = Column(String, nullable=False)
    credit = Column(Integer)
    fee = Column(Float)


class Major(Base):
    __tablename__ = 'major'

    major_id = Column(String, primary_key=True, index=True)
    major_name = Column(String)

class Class(Base):
    __tablename__ = 'class'

    class_id = Column(Integer)
    cid = Column(VARCHAR, ForeignKey('course.cid'))
    day = Column(DateTime)
    room = Column(String)
    PrimaryKeyConstraint(class_id, day, room)


class Enrollment(Base):
    __tablename__ = 'enrollment'

    sid = Column(VARCHAR, ForeignKey('student.sid'))
    cid = Column(VARCHAR, ForeignKey('course.cid'))
    inclass = Column(Integer)
    midterm = Column(Integer)
    final = Column(Integer)
    gpa = Column(Integer)
    PrimaryKeyConstraint(sid, cid)


class Scholarship(Base):
    __tablename__ = 'scholarship'

    id = Column(Integer, primary_key=True)
    percentage_discount = Column(Float, nullable=False)
    description = Column(String)

    


