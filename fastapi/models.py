from sqlalchemy import Column, Boolean, Integer, String, VARCHAR, ForeignKey
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
    major_id = Column(Integer, nullable = False)

    #   Major INT NOT NULL,
    #   username INT NOT NULL,
    #   password INT NOT NULL,
    #   Student_ID INT NOT NULL,
    #   Course_program_ID INT NOT NULL,
    #   Scholarship_ID INT NOT NULL,
    #   PRIMARY KEY (Student_ID),
    #   UNIQUE (username),
    #   UNIQUE (Scholarship_ID)

# class Major(Base):
#     pass

