from typing import List
from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from sqlalchemy import and_
from database.session import get_db
from models.classes import Class
from models.enrollment import Enrollment
from models.course import Course
from pydantic import BaseModel


router = APIRouter(
    prefix="/tuition-fee", 
    tags=["tuition-fee"]
)

class TuitionFee(BaseModel):
    cid: str
    class_id: int
    cname: str
    credits: int
    semester: str
    fee: int
    total_fee: int

    class Config:
        orm_mode = True



@router.get('/{sid}', response_model=List[TuitionFee])
async def get_classes_of_student(sid: str, semester: str, db: Session = Depends(get_db)):
    query_result = (
        db.query(Class, Enrollment)
        .join(Enrollment, and_(Enrollment.class_id == Class.class_id, Enrollment.sid == sid))
        .filter(Class.semester == semester)
        .all()
    )

    if not query_result:
        raise HTTPException(status_code=404, detail=f"No classes found for semester {semester} for student {sid}")

    response_classes = []
    total_fee = 0

    for class_, enrollment in query_result:
        credits = class_.course.credit if class_.course else "N/A"
        total_fee += class_.course.fee if class_.course else 0

        tuition_fee_entry = TuitionFee(
            cid=class_.course.cid,
            class_id=enrollment.class_id,
            cname=class_.cname,
            credits=credits,
            semester=class_.semester,
            fee=class_.course.fee if class_.course else 0,
            total_fee=total_fee,
        )

        response_classes.append(tuition_fee_entry)

    return response_classes