from typing import List
from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from database.session import get_db
from models.student import Student
from pydantic import BaseModel



router = APIRouter(
    prefix="/student", 
    tags=["student"]
)

class StudentModel(BaseModel):
    sname: str
    scholarship_discount: int
    major_name: str
    sid: str

    class Config:
        orm_mode = True

def student_to_dict(student: Student) -> dict:
    if student.scholarship:
        discount = int(student.scholarship.percentage_discount)
    else:
        discount = 0

    return {
        "sname": student.sname,
        "sid": student.sid,
        "major_name": student.major.major_name,
        "scholarship_discount": discount,
    }

@router.get("/", response_model=List[StudentModel])
async def get_student(db: Session = Depends(get_db), skip: int = 0, limit: int = 100):
    students = db.query(Student).offset(skip).limit(limit).all()
    if not students:
        raise HTTPException(status_code=404, detail="Student not found")
    return students


@router.get("/{sid}", response_model=StudentModel)
async def get_student_by_id(sid: str, db: Session = Depends(get_db)):
    try:
        student = db.query(Student).filter(Student.sid == sid).first()
        if not student:
            raise HTTPException(status_code=404, detail="Student not found")
        return student_to_dict(student)
    except Exception as e:
        raise HTTPException(status_code=505, detail="Internal Server Error " + str(e))