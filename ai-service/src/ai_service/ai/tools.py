import ast
import math
import operator
from collections.abc import Callable

from ddgs import DDGS
from ddgs.exceptions import DDGSException

MAX_EXPRESSION_LENGTH = 256
MAX_AST_NODES = 64
MAX_INTEGER_BITS = 4096
MAX_POWER_EXPONENT = 1000

_BINARY_OPERATORS: dict[type[ast.operator], Callable[[int | float, int | float], int | float]] = {
    ast.Add: operator.add,
    ast.Sub: operator.sub,
    ast.Mult: operator.mul,
    ast.Div: operator.truediv,
    ast.FloorDiv: operator.floordiv,
    ast.Mod: operator.mod,
    ast.Pow: operator.pow,
}


def _validate_result(result:float) -> int | float:
    if isinstance(result, int) and result.bit_length() > MAX_INTEGER_BITS:
        raise ValueError("The result is too large.")
    if isinstance(result, float) and not math.isfinite(result):
        raise ValueError("The result is not finite.")
    return result


def _evaluate(node: ast.expr) -> int | float:
    if isinstance(node, ast.Constant):
        value = node.value
        if isinstance(value, bool) or not isinstance(value, (int, float)):
            raise ValueError("Only numeric values are supported.")  # noqa: TRY004
        return _validate_result(value)

    if isinstance(node, ast.UnaryOp) and isinstance(node.op, (ast.UAdd, ast.USub)):
        operand = _evaluate(node.operand)
        result = +operand if isinstance(node.op, ast.UAdd) else -operand
        return _validate_result(result)

    if isinstance(node, ast.BinOp):
        operation = _BINARY_OPERATORS.get(type(node.op))
        if operation is None:
            raise ValueError("This operator is not supported.")

        left = _evaluate(node.left)
        right = _evaluate(node.right)
        if isinstance(node.op, ast.Pow):
            if abs(right) > MAX_POWER_EXPONENT:
                raise ValueError("The exponent is too large.")
            if (
                isinstance(left, int)
                and isinstance(right, int)
                and abs(left) > 1
                and right > 0
                and left.bit_length() * right > MAX_INTEGER_BITS
            ):
                raise ValueError("The result is too large.")
        return _validate_result(operation(left, right))

    raise ValueError("Only basic arithmetic expressions are supported.")


def calculate(expression: str) -> str:
    """Safely calculate a basic arithmetic expression.

    Args:
        expression: An expression using numbers, parentheses, and basic arithmetic.
    """

    if not expression.strip():
        raise ValueError("Expression cannot be empty.")
    if len(expression) > MAX_EXPRESSION_LENGTH:
        raise ValueError("Expression is too long.")

    try:
        parsed = ast.parse(expression, mode="eval")
    except (SyntaxError, RecursionError) as exc:
        raise ValueError("Invalid mathematical expression.") from exc

    if sum(1 for _ in ast.walk(parsed)) > MAX_AST_NODES:
        raise ValueError("Expression is too complex.")

    return str(_evaluate(parsed.body))


def search_web(query: str) -> list[dict]:
    """Search the internet for information relevant to a query.

    Use this tool when the user asks about recent events,
    current information, or information that requires
    external sources.

    Args:
        query: A clear search query describing the information needed.
    """
    try:
        results = DDGS().text(
            query,
            max_results=3,
        )
    except DDGSException:
        return []

    return [
        {
            "title": result.get("title"),
            "url": result.get("href"),
            "snippet": result.get("body"),
        }
        for result in results
    ]