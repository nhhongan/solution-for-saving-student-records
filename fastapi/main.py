from fastapi import FastAPI, status, HTTPException, Depends
from typing import Annotated, List
from sqlalchemy.orm import Session
from pydantic import BaseModel
from database import SessionLocal, engine
import models
import auth
from fastapi.middleware.cors import CORSMiddleware
from auth import get_current_user

app = FastAPI()
app.include_router(auth.router)

origins = [
    'http://localhost:3000'
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)

class StudentModel(BaseModel):
    sname: str
    scholarship_id: int
    major_id: int
    sid: str

    class Config:
        orm_mode = True


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

models.Base.metadata.create_all(bind=engine)

@app.post('/student/', response_model=StudentModel)
async def create_student(student: StudentModel, db: Session = Depends(get_db)):
    db_student = models.Student(**student.dict())
    db.add(db_student)
    db.commit()
    db.refresh(db_student)
    return db_student

@app.get("/student/", response_model=List[StudentModel])
async def read_student(db: Session = Depends(get_db), skip: int = 0, limit: int = 100):
    students = db.query(models.Student).offset(skip).limit(limit).all()
    return students

@app.get("/", status_code=status.HTTP_200_OK)
async def user(user: dict = Depends(get_current_user), db: Session = Depends(get_db)):
    if user is None:
        raise HTTPException(status_code=401, detail='Authentication Failed')
    return {"User": user}