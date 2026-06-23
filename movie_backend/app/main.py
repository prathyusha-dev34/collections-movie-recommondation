from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.collections import router as collections_router

from app.database import Base, engine

# ROUTES
from app.routes import (
    auth,
    favorites,
    history,
    dashboard,
    recommendations,
    movies,
    watchlist,
    reviews,
    profile
)

from app.routes.collections import router as collections_router
from app.routes.admin import router as admin_router

# =========================
# CREATE TABLES
# =========================
Base.metadata.create_all(bind=engine)

# =========================
# APP INIT
# =========================
app = FastAPI(title="Movie Backend API")

# =========================
# CORS
# =========================
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "https://collections-movie-recommondation-ol.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =========================
# ROUTES
# =========================
app.include_router(auth.router)
app.include_router(favorites.router)
app.include_router(history.router)
app.include_router(dashboard.router)
app.include_router(recommendations.router)
app.include_router(movies.router)
app.include_router(watchlist.router)
app.include_router(reviews.router)
app.include_router(profile.router)

# ✅ FIXED COLLECTION ROUTE (IMPORTANT)
app.include_router(
    collections_router,
    prefix="/api/collections",
    tags=["Collections"]
)

app.include_router(
    admin_router,
    prefix="/api/admin",
    tags=["Admin"]
)

app.include_router(collections_router)

# =========================
# ROOT
# =========================
@app.get("/")
def root():
    return {"message": "Movie Backend API is running 🚀"}