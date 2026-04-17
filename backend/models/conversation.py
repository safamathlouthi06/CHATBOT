from pydantic import BaseModel
from datetime import datetime

class Conversation(BaseModel):
    chatbot_id: str
    date_debut: datetime | None = None