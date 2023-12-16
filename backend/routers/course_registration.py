from typing import List
from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from database.session import get_db
from pydantic import BaseModel
from datetime import datetime
from models.classes import Class
from models.course import Course
from models.student import Student
from models.enrollment import Enrollment


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

@router.patch('/{sid}/enroll_course_{cid}', response_model=CourseRegistration)
async def insert_class(sid: str, course_id: str, db: Session = Depends(get_db)):
    student = db.query(Student).filter(Student.sid == sid).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")

    course = db.query(Course).filter(Course.cid == course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")

    existing_enrollment = db.query(Enrollment).filter(
        Enrollment.sid == sid, Enrollment.class_id.in_([cls.class_id for cls in course.classes])
    ).first()
    if existing_enrollment:
        raise HTTPException(
            status_code=400, detail="Student is already enrolled in this course"
        )
    enrolled_class = course.classes[0] if course.classes else None

    if enrolled_class:
        new_enrollment = Enrollment(
            sid=sid,
            class_id=enrolled_class.class_id,
            inclass=0,
            midterm=0,
            final=0,
            gpa=0,
            register_time=datetime.now().strftime('%Y-%m-%d'),
        )
        db.add(new_enrollment)
        db.commit()

        return CourseRegistration(
            cid=enrolled_class.cid,
            cname=course.cname,
            credit=course.credit,
            fee=course.fee,
            slot=enrolled_class.slot,
            pname=enrolled_class.professor_name,
            day=enrolled_class.day,
            room=enrolled_class.room,
            start_period=enrolled_class.start_period,
            end_period=enrolled_class.end_period,
            start_date=enrolled_class.start_date,
            end_date=enrolled_class.end_date,
        )
    else:
        raise HTTPException(status_code=404, detail="No classes available for enrollment")



@router.delete('/{sid}/unenroll_course_{cid}')
async def delete_class(sid: str, course_id: str, db: Session = Depends(get_db)):
    student = db.query(Student).filter(Student.sid == sid).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    course = db.query(Course).filter(Course.cid == course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    enrolled_class = course.classes[0] if course.classes else None
    if enrolled_class:
        enrollment_to_delete = db.query(Enrollment).filter(
            Enrollment.sid == sid, Enrollment.class_id == enrolled_class.class_id
        ).first()
        if enrollment_to_delete:
            register_date = datetime.strptime(enrollment_to_delete.register_time, '%Y-%m-%d').date()
            current_date = datetime.now().date()
            if register_date == current_date:
                db.delete(enrollment_to_delete)
                db.commit()
                return {"status": "Unenrollment successful", "unenrolled_course": course_id}
            else:
                raise HTTPException(status_code=400, detail="Cannot unenroll from a class registered on a different day")
        else:
            raise HTTPException(status_code=404, detail="Enrollment record not found")
    else:
        raise HTTPException(status_code=404, detail="No classes available for unenrollment")