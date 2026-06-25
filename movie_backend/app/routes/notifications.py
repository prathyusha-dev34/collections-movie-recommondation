from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
 
from app.database import get_db
from app.models.notification import Notification
from app.schemas.notification import (
    NotificationCreate,
    NotificationResponse
)
 
router = APIRouter(
    tags=["Notifications"]
)
 
 
@router.post("/notifications", response_model=NotificationResponse)
def create_notification(
    notification: NotificationCreate,
    db: Session = Depends(get_db)
):
    db_notification = Notification(
        user_id=notification.user_id,
        actor_user_id=notification.actor_user_id,
        type=notification.type,
        message=notification.message,
        data=notification.data
    )
 
    db.add(db_notification)
    db.commit()
    db.refresh(db_notification)
 
    return db_notification
 
 
@router.get("/notifications", response_model=List[NotificationResponse])
def get_notifications(
    user_id: int,
    db: Session = Depends(get_db)
):
    notifications = (
        db.query(Notification)
        .filter(Notification.user_id == user_id)
        .order_by(Notification.created_at.desc())
        .all()
    )
 
    return notifications
 
 
@router.get("/notifications/unread-count")
def unread_count(
    user_id: int,
    db: Session = Depends(get_db)
):
    count = (
        db.query(Notification)
        .filter(
            Notification.user_id == user_id,
            Notification.is_read == False
        )
        .count()
    )
 
    return {"unread_count": count}
 