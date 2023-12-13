from pydantic import BaseModel

class CreateUserRequest(BaseModel):
    username: str
    password: str
    sid: str

class Token(BaseModel):
    username: str
    sid: str
    access_token: str
    token_type: str