from pydantic import BaseModel
from typing import List, Optional


class Movie(BaseModel):
    movie_id: str
    movie_title: str


class CollectionCreate(BaseModel):
    name: str
    description: Optional[str] = None


class CollectionResponse(BaseModel):
    collection_id: str
    user_id: int
    name: str
    description: Optional[str] = None
    movies: List[Movie] = []

    class Config:
        from_attributes = True