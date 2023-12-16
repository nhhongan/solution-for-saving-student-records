
from passlib.context import CryptContext
from decouple import config

SECRET_KEY = config("SECRET_KEY")
ALGORITHM = config("algorithm", default="HS256")
# ACCESS_TOKEN_EXPIRE_MINUTES = config.get("ACCESS_TOKEN_EXPIRE_MINUTES", 30)

bcrypt_context = CryptContext(schemes=['bcrypt'], deprecated='auto')

