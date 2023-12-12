from sqlalchemy import Column, Integer, String, VARCHAR, ForeignKey, Float, DateTime, PrimaryKeyConstraint
from database.__init__ import Base

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
    day = Column(String)
    slot = Column(Integer)
    start_period = Column(Integer)
    end_period = Column(Integer)
    start_date = Column(DateTime)
    end_date = Column(DateTime)
    room = Column(String)
    PrimaryKeyConstraint(class_id, day, room)


class Enrollment(Base):
    __tablename__ = 'enrollment'

    sid = Column(VARCHAR, ForeignKey('student.sid'))
    class_id = Column(VARCHAR, ForeignKey('class.class_id'))
    inclass = Column(Integer)
    midterm = Column(Integer)
    final = Column(Integer)
    gpa = Column(Integer)
    PrimaryKeyConstraint(sid, class_id)


class Scholarship(Base):
    __tablename__ = 'scholarship'

    id = Column(Integer, primary_key=True)
    percentage_discount = Column(Float, nullable=False)
    description = Column(String)

    
class Professor(Base):
    __tablename__ = 'professor'

    pid = Column(VARCHAR, primary_key=True)
    pname = Column(String, nullable=False)
    department = Column(String, nullable=False)


class Teach(Base):
    __tablename__ = 'teach'

    class_id = Column(Integer)
    day = Column(DateTime)
    room = Column(String)
    pid = Column(Integer)
    pname = Column(String)
    PrimaryKeyConstraint(pid, class_id)

