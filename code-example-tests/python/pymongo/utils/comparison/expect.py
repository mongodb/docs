"""
Expect — fluent comparison API for PyMongo code-example tests.

Every comparison is delegated to the language-agnostic comparison kernel (a
native Go binary under ``tools/comparison-kernel/bin/``). The bridge serialises
each expected value into raw text the kernel can parse and each actual value
into a JSON-compatible payload, so behaviour stays consistent across language
suites.
"""

from __future__ import annotations

import json
from pathlib import Path
from typing import Any, Dict, Optional, Set

from .kernel_bridge import _normalize_for_wire, kernel_compare


class ConfigurationError(ValueError):
    """Raised when the Expect API is configured incorrectly."""


def _looks_like_file_path(path_str: str) -> bool:
    """A heuristic check for whether *path_str* could plausibly be a file path:
    short, single-line, no obvious JSON-syntax characters at the start."""
    if not path_str or "\n" in path_str or "\r" in path_str:
        return False
    if len(path_str) > 1024:
        return False
    stripped = path_str.lstrip()
    if stripped.startswith("{") or stripped.startswith("["):
        return False
    return True


def _resolve_expected_file(path_str: str) -> Optional[Path]:
    """Locate an expected-output file by walking up to the package root and
    checking common locations (``examples/``, project root, raw path)."""
    if not _looks_like_file_path(path_str):
        return None
    p = Path(path_str)
    if p.is_absolute() and p.is_file():
        return p
    base = Path(__file__).resolve().parents[3]
    for candidate in (
        base / "examples" / path_str,
        base.parent / "examples" / path_str,
        base / path_str,
        Path(path_str),
    ):
        if candidate.is_file():
            return candidate
    return None


def _serialize_expected(expected: Any) -> str:
    """Turn an expected value into raw text the kernel can parse.

      * existing file path → file contents
      * string starting with ``{`` or ``[`` → as-is (MongoDB-syntax content)
      * everything else → BSON-normalised and JSON-serialised
    """
    if expected is None:
        return "null"
    if isinstance(expected, (str, Path)):
        str_val = str(expected)
        resolved = _resolve_expected_file(str_val)
        if resolved is not None:
            return resolved.read_text(encoding="utf-8")
        if isinstance(expected, str):
            stripped = str_val.lstrip()
            if stripped.startswith("{") or stripped.startswith("["):
                return str_val
        return json.dumps(str_val)
    return json.dumps(_normalize_for_wire(expected))


def _kernel_reports_parse_failure(response: Dict[str, Any]) -> bool:
    """Detect the kernel's "failed to parse expected content" condition so
    callers can fall back to plain text comparison for non-JSON files."""
    if response.get("error"):
        return True
    for err in response.get("errors") or []:
        if err.get("path") == "expected" and "failed to parse expected content" in (
            err.get("message") or ""
        ):
            return True
    return False


def _text_compare(expected_content: str, actual: Any) -> bool:
    """Plain-text equality fallback used when the kernel can't parse the
    expected content as JSON. Whitespace is normalised lightly so trailing
    newlines and CRLF differences don't trip simple text outputs."""
    if not isinstance(actual, str):
        return False
    norm = lambda s: s.replace("\r\n", "\n").rstrip()
    return norm(expected_content) == norm(actual)


def _build_error_message(response: Dict[str, Any]) -> str:
    """Format a kernel response's errors into a human-readable message."""
    if response.get("error"):
        return response["error"]
    errors = response.get("errors") or []
    if not errors:
        return "Comparison failed"
    parts = []
    for err in errors:
        path = err.get("path") or ""
        message = err.get("message") or ""
        parts.append(f"{path}: {message}" if path else message)
    return "\n".join(parts)


class Expect:
    """Fluent comparison API for PyMongo tests."""

    def __init__(self, actual: Any) -> None:
        self._actual = actual
        self._comparison_type: Optional[str] = None
        self._ignore_fields: Set[str] = set()
        self._has_sort_option = False
        self._using_should_match = False
        self._expected_for_resemble: Any = None

    @classmethod
    def that(cls, actual: Any) -> "Expect":
        return cls(actual)

    def with_ignored_fields(self, *fields: str) -> "Expect":
        if self._expected_for_resemble is not None:
            raise ConfigurationError(
                "with_ignored_fields() and should_resemble() are mutually exclusive. "
                "Use with_ignored_fields() with should_match() for exact comparisons, "
                "or use should_resemble() + with_schema() for schema-based validation."
            )
        self._ignore_fields = set(fields)
        return self

    def with_ordered_sort(self) -> "Expect":
        self._has_sort_option = True
        self._comparison_type = "ordered"
        return self

    def with_unordered_sort(self) -> "Expect":
        self._has_sort_option = True
        self._comparison_type = "unordered"
        return self

    def should_match(self, expected: Any) -> None:
        if self._expected_for_resemble is not None:
            raise ConfigurationError(
                "should_match() and should_resemble() are mutually exclusive. "
                "Use should_match() for exact comparisons or should_resemble() + with_schema() "
                "for schema-based validation, but not both."
            )
        self._using_should_match = True

        try:
            expected_content = _serialize_expected(expected)
        except Exception as exc:
            raise AssertionError(f"Failed to resolve expected value: {exc}")

        response = kernel_compare(
            expected_content,
            self._actual,
            comparison_type=self._comparison_type,
            ignore_field_values=sorted(self._ignore_fields) or None,
        )

        if response.get("isMatch"):
            return

        # Non-JSON expected content falls back to plain text comparison so
        # tests using raw multi-line text files keep working.
        if _kernel_reports_parse_failure(response) and _text_compare(
            expected_content, self._actual
        ):
            return

        raise AssertionError(_build_error_message(response))

    def should_resemble(self, expected: Any) -> "Expect":
        if self._using_should_match:
            raise ConfigurationError(
                "should_match() and should_resemble() are mutually exclusive. "
                "Use should_match() for exact comparisons or should_resemble() + with_schema() "
                "for schema-based validation, but not both."
            )
        if self._ignore_fields:
            raise ConfigurationError(
                "with_ignored_fields() and should_resemble() are mutually exclusive. "
                "Use with_ignored_fields() with should_match() for exact comparisons, "
                "or use should_resemble() + with_schema() for schema-based validation."
            )
        if self._has_sort_option:
            raise ConfigurationError(
                "with_ordered_sort()/with_unordered_sort() and should_resemble() are mutually exclusive. "
                "Sort options only apply to should_match() comparisons."
            )
        self._expected_for_resemble = expected
        return self

    def with_schema(self, schema: Dict[str, Any]) -> None:
        if self._expected_for_resemble is None:
            raise ConfigurationError(
                "with_schema() requires should_resemble() to be called first. "
                "Example: Expect.that(actual).should_resemble(expected).with_schema({...})"
            )
        if not isinstance(schema, dict) or not schema:
            raise ConfigurationError("with_schema() requires a schema dictionary")

        if "count" not in schema:
            raise ConfigurationError(
                "with_schema() requires a 'count' key specifying the expected number of documents"
            )
        count = schema["count"]
        if not isinstance(count, int) or isinstance(count, bool) or count < 0:
            raise ConfigurationError(
                "with_schema() requires 'count' to be a non-negative integer"
            )

        required_fields = schema.get("required_fields")
        if required_fields is not None and not isinstance(required_fields, list):
            raise ConfigurationError(
                "with_schema() 'required_fields' must be a list of field names"
            )

        field_values = schema.get("field_values")
        if field_values is not None and not isinstance(field_values, dict):
            raise ConfigurationError(
                "with_schema() 'field_values' must be a dictionary of key-value pairs"
            )

        if self._actual is None:
            raise AssertionError("Schema validation failed: actual output is None")
        if not isinstance(self._actual, (dict, list)):
            raise AssertionError(
                f"Schema validation failed: actual output must be a document or list of documents, "
                f"got {type(self._actual).__name__}"
            )

        try:
            expected_content = _serialize_expected(self._expected_for_resemble)
        except Exception as exc:
            raise AssertionError(f"Failed to resolve expected value: {exc}")

        kernel_schema = {
            "count": count,
            "requiredFields": required_fields or [],
            "fieldValues": _normalize_for_wire(field_values or {}),
        }

        response = kernel_compare(
            expected_content,
            self._actual,
            schema=kernel_schema,
        )

        if response.get("isMatch"):
            return

        raise AssertionError(
            f"Schema validation failed:\n{_build_error_message(response)}"
        )
