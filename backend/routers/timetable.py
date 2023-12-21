from typing import List
from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from sqlalchemy import and_
from database.session import get_db
from models.classes import Class
from models.enrollment import Enrollment
from pydantic import BaseModel


router = APIRouter(
    prefix="/timetable", 
    tags=["timetable"]
)

class Timetable(BaseModel):
    class_id: int
    cname: str
    credit: int
    day: str
    room: str
    start_period: int
    end_period: int
    start_date: str
    end_date: str
    pname: str
    semester: str

    class Config:
        orm_mode = True


@router.get('/{sid}', response_model=List[Timetable])
async def get_classes_of_student(sid: str, semester: str,db: Session = Depends(get_db)):
    try:

        query_result = (
            db.query(Class, Enrollment)
            .join(Enrollment, and_(Class.class_id == Enrollment.class_id, Enrollment.sid == sid))
            .filter(Class.semester == semester)
            .all()
        )

        if not query_result:
            raise HTTPException(status_code=404, detail=f"No classes found for semester {semester} for student {sid}")

        response_classes = []
        for class_, enrollment in query_result:
            credit = class_.course.credit if class_.course else "N/A"
            timetable_entry = Timetable(
                class_id=enrollment.class_id,
                cname=class_.cname,
                credit=credit,
                day=class_.day,
                room=class_.room,
                start_period=class_.start_period,
                end_period=class_.end_period,
                start_date=class_.start_date,
                end_date=class_.end_date,
                pname=class_.professor_name,
                semester=class_.semester,
            )
            response_classes.append(timetable_entry)

        return response_classes
    except Exception as e:
        print(str(e))
        raise HTTPException(status_code=505, detail="Internal Server Error")