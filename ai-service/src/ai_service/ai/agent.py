from collections.abc import Sequence

from pydantic_ai import Agent
from pydantic_ai.messages import (
    ModelMessage,
    ModelRequest,
    ModelResponse,
    TextPart,
    UserPromptPart,
)
from pydantic_ai.run import AgentRunResult

from ..ai.models import google_model, groq_model
from ..ai.prompt import TUTOR_SYSTEM_PROMPT
from ..shemas.chat import ChatMessage
from .tools import calculate, search_web

MAX_HISTORY = 20

if groq_model is None:
    raise RuntimeError("GROQ_API_KEY is required for chat and summary generation.")

search_router = Agent(
    model=groq_model,
    output_type=bool,
    instructions=(
        "Decide whether the latest user request needs web search. Return true only "
        "for requests that require current, recent, or externally sourced information, "
        "or when the user explicitly asks you to search the web. Return false for "
        "ordinary questions and summaries of supplied material. Use conversation "
        "history only as context for the latest request."
    ),
)

groq_agent = Agent(model=groq_model, instructions=TUTOR_SYSTEM_PROMPT)
groq_agent.tool_plain(calculate)

google_agent = Agent(model=google_model, instructions=TUTOR_SYSTEM_PROMPT)
google_agent.tool_plain(calculate)
google_agent.tool_plain(search_web)


class RoutedAgent:
    async def run(
        self,
        user_prompt: str,
        *,
        message_history: Sequence[ModelMessage] | None = None,
    ) -> AgentRunResult[str]:
        route = await search_router.run(
            user_prompt,
            message_history=message_history,
        )
        selected_agent = google_agent if route.output else groq_agent
        return await selected_agent.run(
            user_prompt,
            message_history=message_history,
        )


agent = RoutedAgent()

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
