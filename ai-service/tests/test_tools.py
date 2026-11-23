import unittest

from ai_service.ai.tools import calculate


class CalculateTests(unittest.TestCase):
    def test_calculates_arithmetic_with_precedence_and_parentheses(self) -> None:
        self.assertEqual(calculate("(2 + 3) * 4 - 6 / 2"), "17.0")

    def test_supports_unary_and_power_operators(self) -> None:
        self.assertEqual(calculate("-2**3 + 10 % 4"), "-6")

    def test_rejects_code_and_unsupported_syntax(self) -> None:
        for expression in ("__import__('os').system('echo unsafe')", "2 ** 1001", "True + 1"):
            with self.subTest(expression=expression):  # noqa: SIM117
                with self.assertRaises(ValueError):
                    calculate(expression)

    def test_rejects_division_by_zero(self) -> None:
        with self.assertRaises(ZeroDivisionError):
            calculate("1 / 0")


if __name__ == "__main__":
    unittest.main()
