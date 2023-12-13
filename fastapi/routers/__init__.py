from .student import router as student_router
from .course_registration import router as course_registration_router
from .timetable import router as timetable_router
from .major_program import router as major_program_router
from .tuition_fee import router as tuition_fee_router
from fastapi import APIRouter


api_router = APIRouter(prefix="/api/v1")
api_router.include_router(student_router)
api_router.include_router(course_registration_router)
api_router.include_router(timetable_router)
api_router.include_router(major_program_router)
api_router.include_router(tuition_fee_router)