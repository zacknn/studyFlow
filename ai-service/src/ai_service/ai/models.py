from pydantic_ai.models.google import GoogleModel
from pydantic_ai.models.openai import OpenAIChatModel
from pydantic_ai.providers.google import GoogleProvider
from pydantic_ai.providers.openai import OpenAIProvider

from ..config import settings

# Google
google_model = GoogleModel(
    "gemini-2.5-flash",
    provider=GoogleProvider(
        api_key=settings.google_api_key
    ),
)


# Groq
groq_model = None

if settings.groq_api_key:
    groq_model = OpenAIChatModel(
        "openai/gpt-oss-120b",
        provider=OpenAIProvider(
            base_url="https://api.groq.com/openai/v1",
            api_key=settings.groq_api_key,
        ),
    )