from pydantic import BaseModel

class FAQ(BaseModel):
    question: str
    reponse: str
    base_connaissance_id: str