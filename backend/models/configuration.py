from pydantic import BaseModel

class Configuration(BaseModel):
    ton: str
    langue: str
    message_accueil: str
    niveau_detail: str
    chatbot_id: str