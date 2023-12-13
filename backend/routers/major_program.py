from typing import List
from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from sqlalchemy import and_
from database.session import get_db
from models.classes import Class
from models.enrollment import Enrollment
from models.course import Course
from models.student import Student
from pydantic import BaseModel


router = APIRouter(
    prefix="/major-program", 
    tags=["major-program"]
)

class MajorProgram(BaseModel):
    cid: str
    cname: str
    credit: int
    semester: str
    learnt: bool

    class Config:
        orm_mode = True


@router.get('/{sid}', response_model=List[MajorProgram])
async def get_course_of_major(sid: str, db: Session = Depends(get_db)):
    print("SID:", sid)
    try:
        query_result = (
            db.query(Course, Class, Enrollment, Student)
            .join(Class, Class.cid == Course.cid)
            .outerjoin(Enrollment, and_(Enrollment.sid == sid, Enrollment.class_id == Class.class_id))
            .join(Student, Student.major_id == Course.major_id)
            .filter(
                Student.sid == sid
            )
            .all()
        )
        print("Result", query_result)
        if not query_result:
            raise HTTPException(status_code=404, detail=f"No classes found for student {sid}")

        response_classes = []
        for course, class_, enrollment, student in query_result:
            major_program_entry = MajorProgram(
                cid=course.cid,
                cname=course.cname,
                credit=course.credit,
                semester=class_.semester,
                learnt=enrollment is not None
            )
            response_classes.append(major_program_entry)

        return response_classes
    except:
        raise HTTPException(status_code=505, detail="Internal Server Error")


