from pydantic import BaseModel

class ChatbotCreate(BaseModel):
    nom: str
    domaine: str | None = None
    statut: str = "actif"
    entreprise_id: str


class ChatbotUpdate(BaseModel):
    nom: str | None = None
    domaine: str | None = None
    statut: str | None = None