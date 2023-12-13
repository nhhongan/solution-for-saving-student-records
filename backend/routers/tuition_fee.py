from typing import List
from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from sqlalchemy import and_
from database.session import get_db
from models.classes import Class
from models.enrollment import Enrollment
from models.course import Course
from models.scholarship import Scholarship
from models.student import Student
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

    class Config:
        orm_mode = True

class TuitionFeeResponse(BaseModel):
    tuition_fees: List[TuitionFee]
    total_fee: int

@router.get('/{sid}', response_model=TuitionFeeResponse)
async def get_classes_of_student(sid: str, semester: str, db: Session = Depends(get_db)):
    query_result = (
        db.query(Class, Enrollment, Student, Scholarship)
        .join(Enrollment, and_(Enrollment.class_id == Class.class_id, Enrollment.sid == sid))
        .join(Student, Student.sid == sid)
        .outerjoin(Scholarship, Student.scholarship_id == Scholarship.scholarship_id)
        .filter(Class.semester == semester)
        .all()
    )

    if not query_result:
        raise HTTPException(status_code=404, detail=f"No classes found for semester {semester} for student {sid}")

    response_classes = []
    total_fee = 0

    for class_, enrollment, student, scholarship in query_result:
        credits = class_.course.credit if class_.course else "N/A"
        course_fee = class_.course.fee if class_.course else 0

        discount_percentage = scholarship.percentage_discount if scholarship else 0
        course_fee_after_discount = course_fee * (1 - discount_percentage / 100)
        total_fee += course_fee_after_discount


        tuition_fee_entry = TuitionFee(
            cid=class_.course.cid,
            class_id=enrollment.class_id,
            cname=class_.cname,
            credits=credits,
            semester=class_.semester,
            fee=course_fee,
        )

        response_classes.append(tuition_fee_entry)
    

    return TuitionFeeResponse(tuition_fees=response_classes, total_fee=total_fee)