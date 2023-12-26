from sqlalchemy import Column, Integer, String, VARCHAR, ForeignKey, Float, DateTime
from database.__init__ import Base

class User(Base):
    __tablename__ = 'user'

    username = Column(VARCHAR(20), nullable=False)
    password = Column(String)
    sid = Column(VARCHAR, ForeignKey('student.sid'), primary_key=True)