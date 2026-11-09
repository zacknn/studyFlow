
import os

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from pydantic_ai import Agent
from pydantic_ai.models.google import GoogleModel
from pydantic_ai.providers.google import GoogleProvider

load_dotenv()

app = FastAPI()

google_api = os.getenv("GOOGLE_GENERATIVE_AI_API_KEY")

if not google_api:
    raise RuntimeError("GOOGLE_GENERATIVE_AI_API_KEY is missing")

model = GoogleModel(
    "gemini-2.5-flash",
    provider=GoogleProvider(api_key=google_api),
)

agent = Agent(model=model)


@app.get("/health")
async def health():
    return {
        "status": "ok",
        "service": "studyflow-ai",
    }


class ChatRequest(BaseModel):
    message: str


@app.post("/api/chat")
async def chat(request: ChatRequest):
    try:
        response = await agent.run(request.message)

        return {
            "response": response.output,
        }

    except Exception:  # noqa: BLE001
        raise HTTPException(
            status_code=500,
            detail="An error occurred while generating the response.",
        )
