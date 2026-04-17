from pydantic import BaseModel

class ChatbotCreate(BaseModel):
    nom: str
    domaine: str | None = None
    statut: str = "actif"
    


class ChatbotUpdate(BaseModel):
    nom: str | None = None
    domaine: str | None = None
    statut: str | None = None