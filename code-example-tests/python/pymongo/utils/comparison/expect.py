"""
Fluent API for MongoDB Document Comparison

This module provides the main user-facing API for MongoDB document comparison
through the Expect class. It offers a fluent interface with method chaining
and automatic content detection.

Key Features:
    1. Fluent API with method chaining
    2. Automatic content type detection
    3. MongoDB-compatible defaults (unordered arrays, unordered ellipsis)
    4. Simplified API surface for technical writers
"""

from __future__ import annotations

from pathlib import Path
from typing import Any
from time import monotonic

# Import existing comparison infrastructure
from .comparison import (
    compare_documents,
    compare_values,
    compare_text_outputs,
    ComparisonOptions,
    ComparisonResult,
)
from .parser import resolve_expected_file_path, read_expected_file
from .content_analyzer import ContentAnalyzer


class Expect:
    """
    Fluent API for MongoDB document comparison with sensible defaults.

    By default, arrays and ellipsis patterns are compared in unordered mode
    (elements can be in any order) for MongoDB compatibility, since MongoDB
    results are not guaranteed to be ordered. All fields are included in
    comparison unless explicitly ignored. Content type detection automatically
    selects the best comparison strategy.

    Examples:
        # Basic comparison (arrays unordered by default, automatic content detection)
        Expect.that(actual).should_match(expected)

        # Ellipsis patterns work with unordered arrays (MongoDB compatible)
        Expect.that(mongodb_results).should_match([{"name": "Alice"}, "...", {"name": "Bob"}])

        # Ignore volatile fields
        Expect.that(actual).with_ignored_fields("_id", "timestamp").should_match(expected)

        # Explicitly allow any order (same as default behavior)
        Expect.that(actual).with_unordered_sort().should_match(expected)

        # Require exact array order (rare)
        Expect.that(actual).with_ordered_sort().should_match(expected)
    """

    def __init__(self, actual: Any):
        self._actual = actual
        self._options = ComparisonOptions()

    @classmethod
    def that(cls, actual: Any) -> 'Expect':
        """
        Create a new Expect instance for fluent API usage.

        Args:
            actual: The actual value to compare

        Returns:
            Expect: New instance for method chaining
        """
        return cls(actual)

    def with_ignored_fields(self, *fields: str) -> 'Expect':
        """
        Configure comparison to ignore specific field names.

        Args:
            *fields: Field names to ignore during comparison

        Returns:
            Expect: Self for method chaining
        """
        self._options.ignore_field_values = set(fields)
        return self

    def with_ordered_sort(self) -> 'Expect':
        """
        Configure comparison to require arrays in exact order.

        By default, arrays are compared in unordered mode (elements can be in any order).
        Use this method only when the exact order of elements matters.

        Returns:
            Expect: Self for method chaining
        """
        self._options.comparison_type = "ordered"
        return self

    def with_unordered_sort(self) -> 'Expect':
        """
        Configure comparison to allow arrays in any order (unordered mode).

        This method explicitly sets the comparison to unordered mode, which is also
        the default behavior. Use this method when you want to be explicit about
        allowing elements to appear in any order.

        Returns:
            Expect: Self for method chaining
        """
        self._options.comparison_type = "unordered"
        return self

    def should_match(self, expected: Any) -> None:
        """
        Perform the comparison and raise AssertionError if it fails.

        Args:
            expected: Expected value (any type)

        Raises:
            AssertionError: If the comparison fails, with detailed error information
        """
        result = _compare(expected, self._actual, self._options)

        if not result.is_match:
            # Enhance error message with comparison context
            error_msg = result.error or "Comparison failed"

            # Add comparison strategy context if relevant
            if self._options.comparison_type == "ordered":
                error_msg += " [using ordered array comparison]"
            elif hasattr(result, '_used_unordered') or "unordered" in error_msg.lower():
                error_msg += " [using unordered array comparison]"

            # Add helpful context for common patterns
            if "PyMongo" in str(expected) or any(op in str(expected) for op in ["InsertOne", "UpdateOne", "DeleteOne", "ReplaceOne"]):
                error_msg += " [PyMongo operation comparison]"

            raise AssertionError(error_msg)


def _compare(expected: Any, actual: Any, options: ComparisonOptions) -> ComparisonResult:
    """
    Internal comparison function with automatic content detection.

    This function implements the core logic of the Expect API, automatically
    detecting content types and selecting the appropriate comparison strategy.

    Args:
        expected: Expected value (any type)
        actual: Actual value (any type)
        options: Comparison options

    Returns:
        ComparisonResult: Result of the comparison
    """
    expected_type = ContentAnalyzer.detect_type(expected)
    actual_type = ContentAnalyzer.detect_type(actual)
    strategy = ContentAnalyzer.select_strategy(expected_type, actual_type, options)

    if strategy == "document":
        # Handle file inputs
        if expected_type == "file":
            if isinstance(expected, (str, Path)):
                try:
                    resolved_path = resolve_expected_file_path(str(expected))
                    # Read as plain text first
                    expected_content = Path(resolved_path).read_text(encoding="utf-8")

                    # Try document comparison first, fall back to text comparison on specific errors
                    try:
                        result = compare_documents(expected_content, actual, options)
                        # Check if comparison failed due to type mismatch
                        if not result.is_match and ("Type mismatch" in result.error or "one is array and the other is not" in result.error):
                            # Fall back to text comparison for type mismatches
                            pass
                        else:
                            return result
                    except (ValueError, SyntaxError):
                        # If document parsing fails, fall back to text comparison
                        pass

                    # Fall back to text comparison
                    if isinstance(actual, str):
                        success, error = compare_text_outputs(expected_content, actual)
                        return ComparisonResult(success, error)
                    else:
                        return ComparisonResult(False, f"Cannot compare structured expected content with non-string actual output: {type(actual)}")

                except Exception as e:
                    return ComparisonResult(False, f"Failed to read expected file {expected}: {e}")

        # Handle potential file paths that weren't detected as files
        if isinstance(expected, str) and not ("\n" in expected or "\r" in expected):
            # Try to treat as file path first
            try:
                resolved_path = resolve_expected_file_path(expected)
                if resolved_path and Path(resolved_path).is_file():
                    expected_content = read_expected_file(resolved_path)
                    return compare_documents(expected_content, actual, options)
            except:
                # If file handling fails, continue with string comparison
                pass

        # Handle string inputs - ALWAYS try document comparison first
        if isinstance(expected, str):
            # Special case: ISO datetime string vs datetime object
            if _is_iso_datetime_string(expected) and hasattr(actual, 'isoformat'):
                # Handle ISO datetime string comparison with datetime object
                return _compare_iso_datetime(expected, actual)

            # Special case: PyMongo operation string vs dictionary
            if isinstance(actual, dict):
                pymongo_result = _handle_pymongo_operation_comparison(expected, actual, options)
                if pymongo_result is not None:
                    return pymongo_result

            # Special case: Both values are structured strings (e.g., JSON)
            # Parse both and compare as structured data
            if isinstance(actual, str) and expected_type == "structured_string" and actual_type == "structured_string":
                try:
                    from .parser import parse_expected_content
                    expected_parsed, has_global_ellipsis = parse_expected_content(expected)
                    actual_parsed, _ = parse_expected_content(actual)
                    return compare_values(expected_parsed, actual_parsed, options, has_global_ellipsis)
                except (ValueError, SyntaxError):
                    # If parsing fails, fall back to text comparison
                    success, error = compare_text_outputs(expected, actual)
                    return ComparisonResult(success, error)

            try:
                result = compare_documents(expected, actual, options)
                if not result.is_match:
                    # Check if comparison failed due to type mismatch, fall back to text comparison
                    if "Type mismatch" in result.error or "one is array and the other is not" in result.error:
                        # Fall back to text comparison for type mismatches
                        # Convert actual to string for text comparison
                        actual_str = str(actual)
                        success, error = compare_text_outputs(expected, actual_str)
                        return ComparisonResult(success, error)
                    else:
                        # Return the document comparison error (true comparison failure)
                        return result
                else:
                    # Document comparison succeeded
                    return result
            except (ValueError, SyntaxError):
                # If document parsing fails, fall back to text comparison
                # Convert actual to string for text comparison
                actual_str = str(actual)
                success, error = compare_text_outputs(expected, actual_str)
                return ComparisonResult(success, error)

        # Handle direct object/array/primitive comparisons (non-string expected values)
        # Special case: Array of PyMongo operation strings vs array of dictionaries
        if isinstance(expected, list) and isinstance(actual, list):
            array_result = _handle_pymongo_operation_array_comparison(expected, actual, options)
            if array_result is not None:
                return array_result

        # Special case: Dictionary that may contain PyMongo operation strings in nested structures
        if isinstance(expected, dict) and isinstance(actual, dict):
            dict_result = _handle_nested_pymongo_operations(expected, actual, options)
            if dict_result is not None:
                return dict_result

        # This uses compare_values which handles datetime normalization and other object comparisons
        return compare_values(expected, actual, options)

    elif strategy == "text":
        # Convert both to strings for text comparison
        expected_str = str(expected)
        actual_str = str(actual)

        success, error = compare_text_outputs(expected_str, actual_str)
        return ComparisonResult(success, error)

    else:
        return ComparisonResult(False, f"Unknown comparison strategy: {strategy}")


def _is_iso_datetime_string(value: str) -> bool:
    """Check if a string looks like an ISO datetime format."""
    import re
    iso_datetime_pattern = r'^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z?$'
    return re.match(iso_datetime_pattern, value) is not None


def _compare_iso_datetime(expected_iso: str, actual_datetime) -> ComparisonResult:
    """Compare an ISO datetime string with a datetime object."""
    from datetime import datetime

    try:
        # Parse the ISO string to a datetime object
        # Handle both with and without 'Z' suffix
        iso_str = expected_iso.rstrip('Z')
        if '.' in iso_str:
            expected_dt = datetime.fromisoformat(iso_str)
        else:
            expected_dt = datetime.fromisoformat(iso_str)

        # Compare the datetime objects
        if expected_dt == actual_datetime:
            return ComparisonResult(True, None)
        else:
            return ComparisonResult(False, f"Datetime mismatch: expected={expected_dt} actual={actual_datetime}")

    except Exception as e:
        return ComparisonResult(False, f"Failed to parse ISO datetime '{expected_iso}': {e}")


def _handle_pymongo_operation_comparison(expected: str, actual: dict, options: ComparisonOptions) -> ComparisonResult | None:
    """
    Handle comparison between PyMongo operation strings and dictionaries.

    This function implements the special logic needed for PyMongo operations:
    - InsertOne({"name": "test"}) should match {"name": "test"} (the document)
    - UpdateOne(filter, update) should match {"filter": {...}, "update": {...}} (the structured form)

    Returns None if this is not a PyMongo operation comparison.
    """
    # Check if the expected string looks like a PyMongo operation
    pymongo_patterns = ["InsertOne(", "UpdateOne(", "UpdateMany(", "ReplaceOne(", "DeleteOne(", "DeleteMany("]
    if not any(pattern in expected for pattern in pymongo_patterns):
        return None

    try:
        # Parse the PyMongo operation string
        from .parser import parse_expected_content
        parsed_expected, has_global_ellipsis = parse_expected_content(expected)

        # If parsing didn't produce a dict with operation_type, this isn't a PyMongo operation
        if not isinstance(parsed_expected, dict) or "operation_type" not in parsed_expected:
            return None

        operation_type = parsed_expected["operation_type"]

        # Handle different operation types with different comparison logic
        if operation_type == "InsertOne":
            # For InsertOne, compare the document content directly
            if "document" in parsed_expected:
                expected_document = parsed_expected["document"]
                result = compare_values(expected_document, actual, options, has_global_ellipsis)
                return ComparisonResult(result.is_match, result.error)

        elif operation_type in ["UpdateOne", "UpdateMany"]:
            # For Update operations, expect actual to have filter and update fields
            expected_comparison = {}
            if "filter" in parsed_expected:
                expected_comparison["filter"] = parsed_expected["filter"]
            if "update" in parsed_expected:
                expected_comparison["update"] = parsed_expected["update"]

            result = compare_values(expected_comparison, actual, options, has_global_ellipsis)
            return ComparisonResult(result.is_match, result.error)

        elif operation_type == "ReplaceOne":
            # For ReplaceOne, expect actual to have filter and replacement fields
            expected_comparison = {}
            if "filter" in parsed_expected:
                expected_comparison["filter"] = parsed_expected["filter"]
            if "replacement" in parsed_expected:
                expected_comparison["replacement"] = parsed_expected["replacement"]

            result = compare_values(expected_comparison, actual, options, has_global_ellipsis)
            return ComparisonResult(result.is_match, result.error)

        elif operation_type in ["DeleteOne", "DeleteMany"]:
            # For Delete operations, compare the filter directly (like InsertOne with document)
            if "filter" in parsed_expected:
                expected_filter = parsed_expected["filter"]
                result = compare_values(expected_filter, actual, options, has_global_ellipsis)
                return ComparisonResult(result.is_match, result.error)

        # If we get here, we couldn't handle this operation type
        return None

    except Exception:
        # If parsing or comparison fails, this isn't a valid PyMongo operation comparison
        return None


def _handle_pymongo_operation_array_comparison(expected: list, actual: list, options: ComparisonOptions) -> ComparisonResult | None:
    """
    Handle comparison between arrays that may contain PyMongo operation strings.

    This function checks if the expected array contains PyMongo operation strings
    and if so, applies the special PyMongo operation comparison logic to each element.

    Returns None if this is not a PyMongo operation array comparison.
    """
    # Check if any element in expected looks like a PyMongo operation
    pymongo_patterns = ["InsertOne(", "UpdateOne(", "UpdateMany(", "ReplaceOne(", "DeleteOne(", "DeleteMany("]
    has_pymongo_operations = any(
        isinstance(item, str) and any(pattern in item for pattern in pymongo_patterns)
        for item in expected
    )

    if not has_pymongo_operations:
        return None

    # Process the expected array to convert PyMongo operations to their expected forms
    processed_expected = []
    for expected_item in expected:
        if isinstance(expected_item, str):
            # Check if this is a PyMongo operation
            pymongo_patterns = ["InsertOne(", "UpdateOne(", "UpdateMany(", "ReplaceOne(", "DeleteOne(", "DeleteMany("]
            if any(pattern in expected_item for pattern in pymongo_patterns):
                # This is a PyMongo operation - we need to find the matching actual item
                # and convert the operation to the expected form
                matching_actual = _find_matching_actual_for_operation(expected_item, actual, options)
                if matching_actual is not None:
                    processed_expected.append(matching_actual)
                else:
                    # Keep the original if no match found - let comparison fail naturally
                    processed_expected.append(expected_item)
            else:
                processed_expected.append(expected_item)
        else:
            processed_expected.append(expected_item)

    # Now do regular array comparison with the processed expected values
    result = compare_values(processed_expected, actual, options, False)
    return ComparisonResult(result.is_match, result.error)


def _contains_pymongo_operations(obj: Any) -> bool:
    """Check if an object contains PyMongo operation strings."""
    if isinstance(obj, str):
        return any(op in obj for op in ['InsertOne(', 'UpdateOne(', 'DeleteOne(', 'ReplaceOne('])
    elif isinstance(obj, list):
        return any(_contains_pymongo_operations(item) for item in obj)
    elif isinstance(obj, dict):
        return any(_contains_pymongo_operations(value) for value in obj.values())
    else:
        return False


def _process_pymongo_operations_in_structure(expected: Any, actual: Any) -> Any:
    """
    Recursively process a structure to convert PyMongo operation strings to their expected forms.

    This function transforms PyMongo operation strings based on the corresponding actual values:
    - InsertOne(doc) -> doc (if actual is a plain dict)
    - UpdateOne(filter, update) -> {"filter": ..., "update": ...} (if actual has filter/update structure)
    """
    if isinstance(expected, str) and isinstance(actual, dict):
        # Try to handle as PyMongo operation
        pymongo_result = _handle_pymongo_operation_comparison(expected, actual, None)
        if pymongo_result is not None and pymongo_result.is_match:
            # If it matches, return the actual value (since they should be equivalent)
            return actual
        else:
            # If it doesn't match or isn't a PyMongo operation, return as-is
            return expected

    elif isinstance(expected, list) and isinstance(actual, list):
        # Process arrays element by element
        if len(expected) != len(actual):
            return expected  # Let the comparison fail naturally

        processed_list = []
        for exp_item, act_item in zip(expected, actual):
            processed_item = _process_pymongo_operations_in_structure(exp_item, act_item)
            processed_list.append(processed_item)
        return processed_list

    elif isinstance(expected, dict) and isinstance(actual, dict):
        # Process dictionaries key by key
        processed_dict = {}
        for key in expected:
            if key in actual:
                processed_dict[key] = _process_pymongo_operations_in_structure(expected[key], actual[key])
            else:
                processed_dict[key] = expected[key]  # Keep original if key not in actual
        return processed_dict

    else:
        # For other types, return as-is
        return expected


def _find_matching_actual_for_operation(operation_str: str, actual_list: list, options) -> Any:
    """
    Find the actual item in the list that matches the given PyMongo operation string.

    This function tries to match the operation against each item in the actual list
    and returns the first matching item, or None if no match is found.
    """
    for actual_item in actual_list:
        if isinstance(actual_item, dict):
            # Try to match this operation against this actual item
            pymongo_result = _handle_pymongo_operation_comparison(operation_str, actual_item, options)
            if pymongo_result is not None and pymongo_result.is_match:
                return actual_item

    return None


def _handle_nested_pymongo_operations(expected: dict, actual: dict, options: ComparisonOptions) -> ComparisonResult | None:
    """
    Handle comparison between dictionaries that may contain PyMongo operation strings in nested structures.

    This function recursively processes dictionary values to find and handle PyMongo operations
    at any level of nesting.

    Returns None if no PyMongo operations are found in the expected dictionary.
    """
    # Check if any values in the expected dict contain PyMongo operations (recursively)
    if not _contains_pymongo_operations(expected):
        return None

    # Process the expected dictionary to convert PyMongo operation strings to their expected forms
    processed_expected = _process_pymongo_operations_in_structure(expected, actual)

    # Now compare the processed expected with the actual
    result = compare_values(processed_expected, actual, options, False)
    return ComparisonResult(result.is_match, result.error)
