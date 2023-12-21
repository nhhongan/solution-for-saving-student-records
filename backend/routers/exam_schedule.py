from typing import List
from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from sqlalchemy import and_
from database.session import get_db
from models.classes import Class
from models.enrollment import Enrollment
from models.course import Course
from models.student import Student
from models.exam_schedule import ExamScheduleModel
from pydantic import BaseModel

router = APIRouter(
    prefix="/exam-schedule", 
    tags=["exam-schedule"]
)

class ExamSchedule(BaseModel):
    cid: str
    cname: str
    day: str
    time: str
    room: str

    class Config:
        orm_mode = True

@router.get('/{sid}', response_model=List[ExamSchedule])
async def get_exam_schedule(sid: str, db: Session = Depends(get_db)):
    try:
        student = db.query(Student).filter(Student.sid == sid).first()

        if not student:
            raise HTTPException(status_code=404, detail="Student not found")

        classes_with_zero_gpa = (
            db.query(Class)
            .join(Enrollment, Enrollment.class_id == Class.class_id)
            .filter(Enrollment.sid == sid, Enrollment.gpa == 0)
            .all()
        )

        exam_schedules = []
        for class_info in classes_with_zero_gpa:
            exam_schedule_model = db.query(ExamScheduleModel).filter(
                ExamScheduleModel.class_id == class_info.class_id
            ).first()

            if exam_schedule_model:
                exam_schedule = ExamSchedule(
                    cid=class_info.cid,
                    cname=class_info.cname,
                    day=exam_schedule_model.day,
                    time=exam_schedule_model.time,
                    room=exam_schedule_model.room
                )
                exam_schedules.append(exam_schedule)

        return exam_schedules


    except Exception as e:
        print(str(e))
        raise HTTPException(status_code=500, detail="Internal Server Error")