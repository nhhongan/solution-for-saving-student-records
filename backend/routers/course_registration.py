from typing import List
from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from database.session import get_db
from pydantic import BaseModel
from datetime import datetime
from models.classes import Class
from models.course import Course


router = APIRouter(
    prefix="/course-registration", 
    tags=["course-registration"]
)

class CourseRegistration(BaseModel):
    cid: str
    cname: str
    credit: int
    fee: int
    slot: int
    pname: str
    day: str
    room: str
    start_period: int
    end_period: int
    start_date: str
    end_date: str

    class Config:
        orm_mode = True


@router.get('/{cid}', response_model=List[CourseRegistration])
async def get_course(cid: str, db: Session = Depends(get_db)):
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
    

# @router.patch('/', response_model=CourseRegistration)
# async def insert_class(cid: str, db: Session = Depends(get_db)):
#     course = db.query(Course).filter(Course.cid == cid).first()
#     classes = db.query(Class).filter(Class.cid == cid).all()

#     if classes:
#         response_classes = [
#             CourseRegistration(
#                 cid=class_.cid,
#                 cname=course.cname,
#                 credit=course.credit,
#                 fee=course.fee,
#                 slot=class_.slot,
#                 pname=class_.professor_name,
#                 day=class_.day,
#                 room=class_.room,
#                 start_period=class_.start_period,
#                 end_period=class_.end_period,
#                 start_date=class_.start_date,
#                 end_date=class_.end_date,
#             )
#             for class_ in classes
#         ]
#         return response_classes

#     raise HTTPException(status_code=404, detail=f"Classes with cid {cid} not found")