
import logging

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from pydantic_ai import Agent
from pydantic_ai.exceptions import ModelHTTPError, UsageLimitExceeded
from pydantic_ai.models.google import GoogleModel
from pydantic_ai.providers.google import GoogleProvider

from .config import settings

logger = logging.getLogger(__name__)

app = FastAPI()

model = GoogleModel(
    "gemini-2.5-flash",
    provider=GoogleProvider(api_key=settings.google_api_key),
)

agent = Agent(model=model)


class ChatRequest(BaseModel):
    message: str


@app.get("/health")
async def health():
    return {"status": "ok", "service": "studyflow-ai"}


@app.post("/api/chat")
async def chat(request: ChatRequest):
    try:
        response = await agent.run(request.message)

        return {"response": response.output}

    except UsageLimitExceeded as e:
        logger.warning("Agent usage limit exceeded: %s", e)
        raise HTTPException(
            status_code=429,
            detail="AI usage limit exceeded",
        ) from e

    except ModelHTTPError as e:
        logger.exception("AI provider returned an HTTP error")

        status = e.status_code if e.status_code in (429, 502, 503, 504) else 502

        raise HTTPException(
            status_code=status,
            detail="The AI provider could not process your request",
        ) from e

    except Exception as e:
        logger.exception("Unexpected error during AI generation")

        raise HTTPException(
            status_code=500,
            detail="An unexpected error occurred",
        ) from e
