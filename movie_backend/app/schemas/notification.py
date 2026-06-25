from pydantic import BaseModel
from typing import Optional, Dict, Any
from datetime import datetime


class NotificationCreate(BaseModel):
    user_id: int
    actor_user_id: Optional[int] = None
    type: str
    message: str
    data: Optional[Dict[str, Any]] = None


class NotificationResponse(BaseModel):
    id: int
    user_id: int
    actor_user_id: Optional[int]
    type: str
    message: str
    data: Optional[Dict[str, Any]]
    is_read: bool
    created_at: datetime

    class Config:
        from_attributes = True