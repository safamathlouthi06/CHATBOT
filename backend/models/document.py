from pydantic import BaseModel

class Document(BaseModel):
    titre: str
    contenu: str
    base_connaissance_id: str