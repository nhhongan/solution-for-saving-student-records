from datetime import timedelta, datetime
from fastapi import Depends, HTTPException
from starlette import status
from models.users import User
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from auth import SECRET_KEY, ALGORITHM, bcrypt_context

oauth2_bearer = OAuth2PasswordBearer(tokenUrl='auth/token')

def authenticate_user(username: str, password: str, db):
    user = db.query(User).filter(User.username == username).first()
    if not user:
        return False
    if not bcrypt_context.verify(password, user.password):
        return False
    return user

def create_access_token(username: str, sid: str, expires_delta: timedelta):
    encode = {'sub': username, 'id': sid}
    expires = datetime.utcnow() + expires_delta
    encode.update({'exp': expires})
    return jwt.encode(encode, SECRET_KEY, algorithm=ALGORITHM)

def get_current_user(token: str = Depends(oauth2_bearer)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get('sub')
        sid: int = payload.get('id')
        if username is None or sid is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                                detail='Could not validate user')
        return {'username': username, 'id': sid}
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail='Could not validate user')