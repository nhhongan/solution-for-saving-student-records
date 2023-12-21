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
    prefix="/student-mark", 
    tags=["student-mark"]
)

class StudentMark(BaseModel):
    cid: str
    cname: str
    credit: int
    semester: str
    inclass: int
    midterm: int
    final: int
    gpa: int
    status: str

    class Config:
        orm_mode = True

@router.get('/{sid}', response_model=List[StudentMark])
async def get_mark(sid: str, db: Session = Depends(get_db)):
    try:
        student = db.query(Student).filter(Student.sid == sid).first()

        if not student:
            raise HTTPException(status_code=404, detail="Student not found")

        query_result = (
            db.query(
                Course.cid,
                Course.cname,
                Course.credit,
                Class.semester,
                Enrollment.inclass,
                Enrollment.midterm,
                Enrollment.final,
                Enrollment.gpa,
            )
            .join(Class, Course.cid == Class.cid)
            .join(Enrollment, and_(Class.class_id == Enrollment.class_id, Enrollment.sid == sid))
            .filter(Enrollment.gpa != 0)
            .all()
        )

        student_marks = [
            StudentMark(
                cid=cid,
                cname=cname,
                credit=credit,
                semester=semester,
                inclass=inclass,
                midterm=midterm,
                final=final,
                gpa=gpa,
                status="Pass" if gpa >= 50 else "Fail",
            )
            for cid, cname, credit, semester, inclass, midterm, final, gpa in query_result
        ]

        return student_marks

    except Exception as e:
        print(str(e))
        raise HTTPException(status_code=500, detail="Internal Server Error")
