import os

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from pydantic_ai import Agent
from pydantic_ai.models.google import GoogleModel
from pydantic_ai.providers.google import GoogleProvider

app = FastAPI()
load_dotenv()

google_api = os.getenv("GOOGLE_GENERATIVE_AI_API_KEY")


model = GoogleModel('gemini-2.5-flash' , )
provider = GoogleProvider(api_key=google_api)
agent = Agent(model=model, provider=provider)


@app.get("/health")
async def health():
    return {
        "status": "ok",
        "service": "studyflow-ai"
    }
    
    
class ChatRequest:
    message:str
    stream:bool
    
@app.post("/api/chat")
async def chat(chatRequest : ChatRequest):
    pass