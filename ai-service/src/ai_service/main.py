import logging

from fastapi import FastAPI, HTTPException
from pydantic_ai.exceptions import ModelHTTPError, UsageLimitExceeded

from .ai.agent import agent, to_model_messages
from .shemas.chat import ChatRequest

logger = logging.getLogger(__name__)

app = FastAPI()

#class ChatRequest(BaseModel):
#    message: str


@app.get("/health")
async def health():
    return {"status": "ok", "service": "studyflow-ai"}


@app.post("/api/chat")
async def chat(request: ChatRequest):
    try:
        response = await agent.run(
            request.message,
            message_history=to_model_messages(request.history),
        )

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
