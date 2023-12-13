from .student import router as student_router
from .course_registration import router as course_registration_router
from fastapi import APIRouter


api_router = APIRouter(prefix="/api/v1")
api_router.include_router(student_router)
api_router.include_router(course_registration_router)