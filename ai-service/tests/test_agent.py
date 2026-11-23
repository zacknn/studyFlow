import os
import unittest
from unittest.mock import patch

from ai_service.shemas.chat import ChatMessage
from pydantic_ai.messages import ModelRequest, ModelResponse, TextPart, UserPromptPart


class ModelHistoryTests(unittest.TestCase):
    def test_converts_user_and_assistant_history_to_supported_parts(self) -> None:
        with patch.dict(os.environ, {"GOOGLE_API_KEY": "test-key"}):
            from ai_service.ai.agent import to_model_messages

        messages = to_model_messages(
            [
                ChatMessage(role="user", content="What is 2 + 2?"),
                ChatMessage(role="assistant", content="It is 4."),
            ]
        )

        self.assertIsInstance(messages[0], ModelRequest)
        self.assertIsInstance(messages[0].parts[0], UserPromptPart)
        self.assertIsInstance(messages[1], ModelResponse)
        self.assertIsInstance(messages[1].parts[0], TextPart)


if __name__ == "__main__":
    unittest.main()
