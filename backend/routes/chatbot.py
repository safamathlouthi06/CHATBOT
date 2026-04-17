from fastapi import APIRouter, HTTPException
from database import supabase
from schemas.chatbot import ChatbotCreate, ChatbotUpdate

router = APIRouter(prefix="/chatbot", tags=["chatbot"])


from fastapi import HTTPException
import traceback

@router.post("/")
def create_chatbot(data: ChatbotCreate):
    try:
        response = supabase.table("chatbot").insert({
            
            "nom": data.nom,
            "domaine": data.domaine,
            "statut": data.statut,
            "entreprise_id": data.entreprise_id
        }).execute()

        print("SUPABASE RESPONSE:", response)

        return {"message": "Chatbot créé", "data": response.data}

    except Exception as e:
        print("🔥 ERREUR SUPABASE:")
        print(traceback.format_exc())

        raise HTTPException(status_code=500, detail=str(e))

#GET ALL chatbot
@router.get("/")
def get_chatbot():
    response = supabase.table("chatbot").select("*").execute()
    return response.data


#GET CHATBOT BY ID
@router.get("/{chatbot_id}")
def get_chatbot(chatbot_id: str):
    response = supabase.table("chatbot") \
        .select("*") \
        .eq("id", chatbot_id) \
        .execute()

    if not response.data:
        raise HTTPException(status_code=404, detail="Chatbot introuvable")

    return response.data[0]


#UPDATE CHATBOT
@router.put("/{chatbot_id}")
def update_chatbot(chatbot_id: str, data: ChatbotUpdate):
    update_data = {k: v for k, v in data.dict().items() if v is not None}

    response = supabase.table("chatbot") \
        .update(update_data) \
        .eq("id", chatbot_id) \
        .execute()

    return {"message": "Chatbot mis à jour", "data": response.data}


#DELETE CHATBOT
@router.delete("/{chatbot_id}")
def delete_chatbot(chatbot_id: str):
    response = supabase.table("chatbot") \
        .delete() \
        .eq("id", chatbot_id) \
        .execute()

    return {"message": "Chatbot supprimé"}