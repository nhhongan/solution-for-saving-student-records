from typing import List
from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from database.session import get_db
from models.classes import Class
from models.course import Course
from models.enrollment import Enrollment
from pydantic import BaseModel


router = APIRouter(
    prefix="/timetable", 
    tags=["timetable"]
)

class Timetable(BaseModel):
    cid: str
    cname: str
    credits: int
    day: str
    start_period: int
    end_period: int
    start_date: str
    end_date: str
    pname: str

    class Config:
        orm_mode = True


@router.get('/{sid}', response_model=List[Timetable])
async def get_classes_of_student(sid: str, db: Session = Depends(get_db)):
    enrolled_class = db.query(Enrollment).filter(Enrollment.sid == sid).all()
    course = db.query(Course).filter(Course.cid == cid).first()
    classes = db.query(Class).filter(Class.cid == cid).all()

    if classes:
        response_classes = [
            CourseRegistration(
                cid=class_.cid,
                cname=course.cname,
                credit=course.credit,
                fee=course.fee,
                slot=class_.slot,
                pname=class_.professor_name,
                day=class_.day,
                room=class_.room,
                start_period=class_.start_period,
                end_period=class_.end_period,
                start_date=class_.start_date,
                end_date=class_.end_date,
            )
            for class_ in classes
        ]
        return response_classes

    raise HTTPException(status_code=404, detail=f"Classes with cid {cid} not found")
