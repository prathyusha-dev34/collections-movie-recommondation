from pydantic import BaseModel, EmailStr
from typing import Optional


# ✅ REGISTER
class UserRegister(BaseModel):
    name: str
    email: EmailStr
    password: str


# ✅ LOGIN
class UserLogin(BaseModel):
    email: EmailStr
    password: str


# ✅ USER RESPONSE (SAFE FOR FRONTEND)
class UserResponse(BaseModel):
    id: int
    name: str
    email: EmailStr

    class Config:
        from_attributes = True


# ✅ TOKEN RESPONSE
class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"