from fastapi import FastAPI, status, HTTPException, Depends
from typing import Annotated, List
from sqlalchemy.orm import Session
from pydantic import BaseModel
from database import SessionLocal, engine
import models
import auth
from fastapi.middleware.cors import CORSMiddleware
from auth import get_current_user
from fastapi import HTTPException

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

# @app.post("/signup", status_code=status.HTTP_201_CREATED)
# async def signup(username: str, password: str, db: Session = Depends(get_db)):
#     user = auth.authenticate_user(username, password, db)
#     if user:
#         raise HTTPException(status_code=400, detail='Username already exists')
#     hashed_password = auth.get_password_hash(password)
#     new_user = models.User(username=username, password=hashed_password)
#     db.add(new_user)
#     db.commit()
#     db.refresh(new_user)
#     return {"message": "User registered successfully"}


# @app.get("/login", status_code=status.HTTP_200_OK)
# async def login(username: str, password: str, db: Session = Depends(get_db)):
#     user = db.query(models.User).filter(models.User.username == username).first()
#     if user is None or not auth.verify_password(password, user.password):
#         raise HTTPException(status_code=401, detail='Invalid username or password')
#     return {"message": "Login successful"}


@app.get("/", status_code=status.HTTP_200_OK)
async def user(user: dict = Depends(get_current_user), db: Session = Depends(get_db)):
    if user is None:
        raise HTTPException(status_code=401, detail='Authentication Failed')
    return {"User": user}