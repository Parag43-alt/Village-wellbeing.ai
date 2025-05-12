from .crud_user import user
from .crud_village import village
from .crud_feedback import feedback
from .crud_report import report

# This file can also be used to initialize the first admin user if configured
from app.db.database import SessionLocal
from app.core.config import settings
from app.schemas.user import UserCreate

def init_db():
    db = SessionLocal()
    # Check if FIRST_ADMIN_EMAIL is set and if the user already exists
    if settings.FIRST_ADMIN_EMAIL and settings.FIRST_ADMIN_PASSWORD:
        existing_user = user.get_by_email(db, email=settings.FIRST_ADMIN_EMAIL)
        if not existing_user:
            user_in = UserCreate(
                email=settings.FIRST_ADMIN_EMAIL,
                password=settings.FIRST_ADMIN_PASSWORD,
                full_name="Admin User",
                is_superuser=True,
            )
            user.create(db, obj_in=user_in)
            print(f"First admin user {settings.FIRST_ADMIN_EMAIL} created.")
        else:
            print(f"Admin user {settings.FIRST_ADMIN_EMAIL} already exists.")
    db.close()