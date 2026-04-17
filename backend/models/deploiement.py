from pydantic import BaseModel
from datetime import datetime

class Deploiement(BaseModel):
    chatbot_id: str
    plateforme: str
    statut: str
    date_deploiement: datetime | None = None