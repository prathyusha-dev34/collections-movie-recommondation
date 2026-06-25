from sqlalchemy.orm import Session
from app.models.notification import Notification


def create_notification(db: Session, user_id: int, type: str, message: str,
                        actor_user_id: int = None, data: dict = None):

    notification = Notification(
        user_id=user_id,
        actor_user_id=actor_user_id,
        type=type,
        message=message,
        data=data
    )

    db.add(notification)
    db.commit()
    db.refresh(notification)

    return notification