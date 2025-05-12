from sqlalchemy.ext.declarative import as_declarative, declared_attr
from sqlalchemy import Column, Integer
from typing import Any

@as_declarative()
class Base:
    """
    Base class for SQLAlchemy models.
    It provides a default __tablename__ and an id primary key column.
    """
    id: Any
    __name__: str

    # Generate __tablename__ automatically
    @declared_attr
    def __tablename__(cls) -> str:
        return cls.__name__.lower() + "s" # e.g. User -> users

    id = Column(Integer, primary_key=True, index=True)
