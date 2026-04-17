from pydantic import BaseModel
from datetime import datetime

class Message(BaseModel):
    contenu: str
    type: str  # user / bot
    conversation_id: str
    date_envoi: datetime | None = None