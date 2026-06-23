from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from uuid import uuid4

from app.database import get_db
from app.models.collection import Collection
from app.schemas.collection import CollectionCreate, CollectionResponse, Movie
from app.auth import get_current_user

router = APIRouter(prefix="/api/collections", tags=["Collections"])


# ✅ CREATE COLLECTION
@router.post("/", response_model=CollectionResponse)
def create_collection(
    payload: CollectionCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    new_collection = Collection(
        collection_id=str(uuid4()),
        user_id=current_user.id,
        name=payload.name,
        description=payload.description,
        movies=[]
    )

    db.add(new_collection)
    db.commit()
    db.refresh(new_collection)

    return new_collection


# ✅ GET COLLECTIONS
@router.get("/", response_model=list[CollectionResponse])
def get_collections(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    collections = db.query(Collection).filter(
        Collection.user_id == current_user.id
    ).all()

    # IMPORTANT: ensure movies is always a list
    for c in collections:
        if c.movies is None:
            c.movies = []

    return collections


# ✅ ADD MOVIE
@router.post("/{collection_id}/movies")
def add_movie(
    collection_id: str,
    payload: Movie,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    collection = db.query(Collection).filter(
        Collection.collection_id == collection_id,
        Collection.user_id == current_user.id
    ).first()

    # 🔴 FIX: better debug message
    if not collection:
        raise HTTPException(
            status_code=404,
            detail=f"Collection not found for user_id={current_user.id}"
        )

    # ensure list exists
    if not isinstance(collection.movies, list):
        collection.movies = []

    # prevent duplicate crash
    movie_data = payload.dict()

    # optional: avoid duplicates
    if movie_data not in collection.movies:
        collection.movies.append(movie_data)

    db.commit()
    db.refresh(collection)

    return {
        "message": "Movie added successfully",
        "collection": collection
    }