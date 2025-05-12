from pydantic import BaseModel, EmailStr
from typing import Optional

class UserBase(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None
    is_active: Optional[bool] = True
    is_superuser: Optional[bool] = False

class UserCreate(UserBase):
    password: str

class UserUpdate(UserBase):
    password: Optional[str] = None

class UserInDBBase(UserBase):
    id: int
    model_config = {"from_attributes": True} # Pydantic V2 uses from_attributes

class User(UserInDBBase):
    pass

class UserInDB(UserInDBBase):
    hashed_password: str