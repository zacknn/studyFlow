import unittest
from unittest.mock import patch

from ddgs.exceptions import DDGSException

from ai_service.ai.tools import search_web


class SearchWebTests(unittest.TestCase):
    def test_searches_web_and_formats_results(self) -> None:
        with patch("ai_service.ai.tools.DDGS") as ddgs:
            ddgs.return_value.text.return_value = [
                {
                    "title": "Example result",
                    "href": "https://example.com",
                    "body": "Example snippet",
                }
            ]

            results = search_web("example query")

        ddgs.return_value.text.assert_called_once_with("example query", max_results=3)
        self.assertEqual(
            results,
            [
                {
                    "title": "Example result",
                    "url": "https://example.com",
                    "snippet": "Example snippet",
                }
            ],
        )

    def test_returns_empty_list_when_search_has_no_results(self) -> None:
        with patch("ai_service.ai.tools.DDGS") as ddgs:
            ddgs.return_value.text.return_value = []

            results = search_web("no results")

        self.assertEqual(results, [])

    def test_returns_empty_list_when_search_raises_ddgs_exception(self) -> None:
        with patch("ai_service.ai.tools.DDGS") as ddgs:
            ddgs.return_value.text.side_effect = DDGSException("No results found.")

            results = search_web("no results")

        self.assertEqual(results, [])


if __name__ == "__main__":
    unittest.main()
