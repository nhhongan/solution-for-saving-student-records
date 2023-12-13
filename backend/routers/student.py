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
    scholarship_id: int
    major_name: str
    sid: str

    class Config:
        orm_mode = True

def student_to_dict(student: Student) -> dict:
    return {
        "sname": student.sname,
        "sid": student.sid,
        "major_name": student.major_name,
        "scholarship_id": student.scholarship_id,
    }

@router.get("/", response_model=List[StudentModel])
async def get_student(db: Session = Depends(get_db), skip: int = 0, limit: int = 100):
    students = db.query(Student).offset(skip).limit(limit).all()
    if not students:
        raise HTTPException(status_code=404, detail="Student not found")
    return students


@router.get("/{sid}", response_model=StudentModel)
async def get_student_by_id(sid: str, db: Session = Depends(get_db)):
    student = db.query(Student).filter(Student.sid == sid).first()
    try:
        if not student:
            raise HTTPException(status_code=404, detail="Student not found")
        return student_to_dict(student)
    except:
        raise HTTPException(status_code=505, detail="Internal Server Error")


# @router.post('/', response_model=Product, response_description="Update a Product")
# async def create_product(product: Product = Body(...)):
#     product = jsonable_encoder(product)
#     result = await db["products"].insert_one(product)
#     created = await db["products"].find_one({"_id": result.inserted_id})
#     return created


# @router.put('/{id}')
# async def update_product(id: str, product: Product = Body(...)):
#     product = {k: v for k, v in product.dict().items() if v is not None}
#     if len(product) > 1:
#         update_result = await db["products"].update_one({"_id": ObjectId(id)}, {"$set": product})
#         if update_result.modified.count() > 0:
#             if (updated_product := await db["products"].find_one({"_id": ObjectId(id)})) is not None:
#                 return updated_product

#     if (existing_product := await db["students"].find_one({"_id": id})) is not None:
#         return existing_product

#     raise HTTPException(status_code=404, detail=f"Product {id} not found")


# @router.delete('{id}')
# async def delete_product(id: str):
#     delete_result = await db["products"].delete({"_id", ObjectId(id)})
#     if delete_result.delete_count == 1:
#         return Response(status_code=status.HTTP_204_NO_CONTENT)
#     raise HTTPException(status_code=404, detail=f"Product {id} not found")