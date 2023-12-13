from sqlalchemy import Column, Integer, String, VARCHAR, ForeignKey, Float, DateTime, PrimaryKeyConstraint
from database.__init__ import Base

class Scholarship(Base):
    __tablename__ = 'scholarship'

    id = Column(Integer, primary_key=True)
    percentage_discount = Column(Float, nullable=False)
    description = Column(String)