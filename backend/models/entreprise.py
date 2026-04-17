from pydantic import BaseModel



class Entreprise(BaseModel):
    nomentreprise: str
    secteurd_activite: str
    email: str
    password: str


class LoginData(BaseModel):
    email: str
    password: str


