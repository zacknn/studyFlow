from pydantic_ai import Agent
from pydantic_ai.messages import (
    ModelMessage,
    ModelRequest,
    ModelResponse,
    TextPart,
    UserPromptPart,
)
from pydantic_ai.models.google import GoogleModel
from pydantic_ai.providers.google import GoogleProvider

from ..ai.prompt import TUTOR_SYSTEM_PROMPT
from ..config import settings
from ..shemas.chat import ChatMessage
from .tools import calculate, search_web

MAX_HISTORY = 20

model = GoogleModel(
    "gemini-2.5-flash",
    provider=GoogleProvider(api_key=settings.google_api_key),
)

agent = Agent(model=model , instructions=TUTOR_SYSTEM_PROMPT)
agent.tool_plain(calculate)
agent.tool_plain(search_web)

def to_model_messages(history: list[ChatMessage]) -> list[ModelMessage]:
    """Convert API history into pydantic-ai message objects."""
    trimmed = history[-MAX_HISTORY:]
    while trimmed and trimmed[0].role != "user":
        trimmed = trimmed[1:]
    messages: list[ModelMessage] = []
    for msg in trimmed:
        if msg.role == "user":
            messages.append(ModelRequest(parts=[UserPromptPart(msg.content)]))
        else:
            messages.append(ModelResponse(parts=[TextPart(msg.content)]))
    return messages
