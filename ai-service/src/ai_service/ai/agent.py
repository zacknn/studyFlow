from pydantic_ai import Agent
from pydantic_ai.messages import ModelMessage, ModelRequest, ModelResponse, TextPart
from pydantic_ai.models.google import GoogleModel
from pydantic_ai.providers.google import GoogleProvider

from ..config import settings
from ..shemas.chat import ChatMessage

MAX_HISTORY = 20

model = GoogleModel(
    "gemini-2.5-flash",
    provider=GoogleProvider(api_key=settings.google_api_key),
)

agent = Agent(model=model)


def to_model_messages(history: list[ChatMessage]) -> list[ModelMessage]:
    """Convert API history into pydantic-ai message objects."""
    trimmed = history[-MAX_HISTORY:]
    while trimmed and trimmed[0].role != "user":
        trimmed = trimmed[1:]
    messages: list[ModelMessage] = []
    for msg in trimmed:
        if msg.role == "user":
            messages.append(ModelRequest(parts=[TextPart(msg.content)]))
        else:
            messages.append(ModelResponse(parts=[TextPart(msg.content)]))
    return messages
