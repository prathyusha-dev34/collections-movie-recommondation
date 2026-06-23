from sqlalchemy import Column, String, Integer, ForeignKey, JSON, text
from sqlalchemy.orm import relationship
from app.database import Base


class Collection(Base):
    __tablename__ = "collections"

    id = Column(Integer, primary_key=True, index=True)

    # public id (you are already using this in APIs)
    collection_id = Column(String, unique=True, index=True, nullable=False)

    # user relation
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    name = Column(String, nullable=False)
    description = Column(String, nullable=True)

    # IMPORTANT: safe JSON default
    movies = Column(JSON, server_default=text("'[]'"), nullable=False)

    # ORM relationship
    user = relationship("User", back_populates="collections")