import importlib
import os
import unittest
from types import SimpleNamespace
from unittest.mock import AsyncMock, patch

from ai_service.shemas.chat import ChatMessage
from pydantic_ai.messages import ModelRequest, ModelResponse, TextPart, UserPromptPart


class ModelHistoryTests(unittest.TestCase):
    def test_converts_user_and_assistant_history_to_supported_parts(self) -> None:
        with patch.dict(
            os.environ,
            {"GOOGLE_API_KEY": "test-key", "GROQ_API_KEY": "test-key"},
        ):
            agent_module = importlib.import_module("ai_service.ai.agent")

        messages = agent_module.to_model_messages(
            [
                ChatMessage(role="user", content="What is 2 + 2?"),
                ChatMessage(role="assistant", content="It is 4."),
            ]
        )

        self.assertIsInstance(messages[0], ModelRequest)
        self.assertIsInstance(messages[0].parts[0], UserPromptPart)
        self.assertIsInstance(messages[1], ModelResponse)
        self.assertIsInstance(messages[1].parts[0], TextPart)


class AgentRoutingTests(unittest.IsolatedAsyncioTestCase):
    def setUp(self) -> None:
        with patch.dict(
            os.environ,
            {"GOOGLE_API_KEY": "test-key", "GROQ_API_KEY": "test-key"},
        ):
            self.agent_module = importlib.import_module("ai_service.ai.agent")

    async def test_routes_normal_chat_to_groq(self) -> None:
        result = SimpleNamespace(output="A normal chat response")
        with (
            patch.object(
                self.agent_module.search_router,
                "run",
                new_callable=AsyncMock,
                return_value=SimpleNamespace(output=False),
            ) as route,
            patch.object(
                self.agent_module.groq_agent,
                "run",
                new_callable=AsyncMock,
                return_value=result,
            ) as groq_run,
            patch.object(
                self.agent_module.google_agent,
                "run",
                new_callable=AsyncMock,
            ) as google_run,
        ):
            response = await self.agent_module.agent.run("Explain photosynthesis")

        self.assertIs(response, result)
        route.assert_awaited_once_with(
            "Explain photosynthesis",
            message_history=None,
        )
        groq_run.assert_awaited_once_with(
            "Explain photosynthesis",
            message_history=None,
        )
        google_run.assert_not_awaited()

    async def test_routes_web_search_requests_to_google(self) -> None:
        result = SimpleNamespace(output="A sourced response")
        with (
            patch.object(
                self.agent_module.search_router,
                "run",
                new_callable=AsyncMock,
                return_value=SimpleNamespace(output=True),
            ),
            patch.object(
                self.agent_module.groq_agent,
                "run",
                new_callable=AsyncMock,
            ) as groq_run,
            patch.object(
                self.agent_module.google_agent,
                "run",
                new_callable=AsyncMock,
                return_value=result,
            ) as google_run,
        ):
            response = await self.agent_module.agent.run(
                "Find the latest news about space exploration"
            )

        self.assertIs(response, result)
        google_run.assert_awaited_once_with(
            "Find the latest news about space exploration",
            message_history=None,
        )
        groq_run.assert_not_awaited()


if __name__ == "__main__":
    unittest.main()
