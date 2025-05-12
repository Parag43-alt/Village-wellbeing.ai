from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app import crud, schemas
from app.core import security
from app.core.config import settings
from app.db.database import get_db

router = APIRouter()

@router.post("/token", response_model=schemas.Token)
def login_for_access_token(
    db: Session = Depends(get_db), form_data: OAuth2PasswordRequestForm = Depends()
):
    """
    OAuth2 compatible token login, get an access token for future requests.
    Requires 'username' (which is email here) and 'password' in form data.
    """
    user = crud.user.get_by_email(db, email=form_data.username)
    if not user or not security.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    if not user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")
    
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = security.create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}


@router.get("/me", response_model=schemas.User)
def read_users_me(current_user: schemas.User = Depends(security.decode_access_token)):
    # This is a placeholder for a function that would get the current user from a token
    # For a real "get current user" dependency, you'd typically verify the token and fetch user from DB
    # This simplified version just decodes. A proper one would be:
    # user = crud.user.get_by_email(db, email=token_data.email) etc.
    # For now, this route is illustrative and would need a proper "get_current_active_user" dependency.
    if not current_user or not current_user.email: # current_user here is actually TokenData
         raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
    # This part needs a db call to get full user details, for simplicity, we are not doing it here for /me
    # but for actual protected routes, you would fetch the user from DB.
    # Example: user_db = crud.user.get_by_email(db, email=current_user.email)
    # if not user_db: raise HTTPException...
    # return user_db
    # Since current_user is TokenData, we can't directly return it as schemas.User
    # This endpoint is more for testing token validity.
    # A real /me would fetch the user from DB based on token_data.email
    return {"email": current_user.email, "id": -1} # Dummy response, real one would fetch user from db

# Dependency for protected routes
from fastapi import Security
from fastapi.security import OAuth2PasswordBearer
oauth2_scheme = OAuth2PasswordBearer(tokenUrl=f"{settings.API_V1_STR}/auth/token")

async def get_current_user_from_token(token: str = Security(oauth2_scheme), db: Session = Depends(get_db)) -> schemas.User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    token_data = security.decode_access_token(token)
    if token_data is None or token_data.email is None:
        raise credentials_exception
    user = crud.user.get_by_email(db, email=token_data.email)
    if user is None:
        raise credentials_exception
    return user

async def get_current_active_user(current_user: schemas.User = Depends(get_current_user_from_token)) -> schemas.User:
    if not current_user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user

async def get_current_active_superuser(current_user: schemas.User = Depends(get_current_active_user)) -> schemas.User:
    if not crud.user.is_superuser(current_user):
        raise HTTPException(
            status_code=403, detail="The user doesn't have enough privileges"
        )
    return current_user