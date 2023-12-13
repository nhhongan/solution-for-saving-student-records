from sqlalchemy import Column, Integer, String, VARCHAR, ForeignKey, Float, DateTime, PrimaryKeyConstraint
from database.__init__ import Base

class Professor(Base):
    __tablename__ = 'professor'

    pid = Column(VARCHAR, primary_key=True)
    pname = Column(String, nullable=False)
    department = Column(String, nullable=False)