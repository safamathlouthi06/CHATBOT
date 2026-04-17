from pydantic import BaseModel

class Statistique(BaseModel):
    chatbot_id: str
    nombre_conversations: int = 0
    taux_satisfaction: float = 0.0
    nombre_messages: int = 0