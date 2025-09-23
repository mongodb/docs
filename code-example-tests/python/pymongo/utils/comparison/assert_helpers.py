"""
Unittest Integration Helpers for MongoDB Document Comparison

This module provides unittest-friendly assertion methods that integrate the MongoDB
document comparison engine with Python's standard testing framework. The helpers
handle the complexity of choosing between document and text comparison strategies
while providing clear assertion failures when comparisons don't match.

Key Integration Challenges:
    1. Unittest Compatibility: Assertion methods must integrate cleanly with unittest
    2. Strategy Selection: Choose between document and text comparison automatically
    3. Error Reporting: Provide helpful failure messages for test debugging
    4. Fallback Handling: Gracefully handle parsing failures with alternative strategies
    5. ComparisonOptions Support: Allow fine-grained control over comparison behavior

Design Philosophy:
    The assert helpers prioritize ease of use over strict type validation:
    - Always try document comparison first for maximum functionality
    - Fall back to text comparison when document parsing fails
    - Provide clear error messages that help developers understand failures
    - Support both standalone functions and unittest TestCase integration

Fallback Strategy:
    The core design pattern is to attempt structured comparison first, then
    fall back to text comparison if that fails. This handles the common case
    where test files might contain either structured data (JSON, Python literals)
    or plain text output that should be compared as strings.

Error Handling Approach:
    - Parsing errors trigger fallback to text comparison
    - Type mismatches between structured and text data trigger fallback
    - True comparison failures are reported with helpful context
    - unittest integration preserves standard assertion behavior

Maintainer Notes:
    When modifying assertion behavior:
    1. Preserve the fallback strategy for maximum compatibility
    2. Ensure error messages include sufficient context for debugging
    3. Maintain unittest TestCase integration patterns
    4. Consider impact on existing test suites when changing defaults
"""

from __future__ import annotations

import unittest
from pathlib import Path
from typing import Any, Optional

from .comparison import (
    compare_text_outputs,
    compare_documents,
    compare_values,
    ComparisonOptions,
)
from .parser import resolve_expected_file_path, read_expected_file
from .errors import ComparisonError


def _read_text_file(path: str | Path) -> str:
    """
    Read text content from a file with UTF-8 encoding.

    Args:
        path (str | Path): File path to read

    Returns:
        str: File content as text

    Design Decision: Always use UTF-8 encoding to ensure consistent handling
    of MongoDB examples that may contain Unicode characters (ObjectIds, international
    text, special symbols, etc.).
    """
    p = Path(path)
    with p.open("r", encoding="utf-8") as f:
        return f.read()


def assert_outputs_match(
    testcase: unittest.TestCase, expected_text: str, actual_text: str
):
    """
    Assert that two text outputs match using unittest framework.

    This function provides unittest integration for text-based comparison,
    typically used as a fallback when structured comparison isn't applicable.

    Args:
        testcase (unittest.TestCase): The test case instance for assertion methods
        expected_text (str): Expected output text
        actual_text (str): Actual output text to compare

    Raises:
        ComparisonError: If texts don't match, with detailed error information

    Design Note: Uses ComparisonError instead of AssertionError to provide
    more specific error context about what type of comparison was attempted.
    """
    ok, message = compare_text_outputs(expected_text, actual_text)
    if not ok:
        raise ComparisonError(message)
    testcase.assertTrue(ok)


def assert_expected_file_matches_output(
    testcase: unittest.TestCase,
    expected_file_path: str | Path,
    actual_output: str,
    options: Optional[ComparisonOptions] = None,
):
    """
    Assert that actual output matches the content of an expected output file.

    This is the primary assertion method for MongoDB code example testing. It implements
    an intelligent fallback strategy: attempt structured document comparison first,
    then fall back to text comparison if structured comparison fails.

    Args:
        testcase (unittest.TestCase): Test case instance for unittest integration
        expected_file_path (str | Path): Path to file containing expected output
        actual_output (str): Actual output captured from code execution
        options (Optional[ComparisonOptions]): Configuration for comparison behavior

    Raises:
        ComparisonError: If comparison fails with detailed error information

    Comparison Strategy:
        1. Read expected content from file
        2. Attempt structured document comparison (supports ellipsis, MongoDB types)
        3. Fall back to text comparison if document parsing/comparison fails
        4. Report errors with helpful context for debugging

    Key Design Decision: Always Try Document Comparison First
        Even when no options are provided, document comparison is attempted first.
        This ensures that ellipsis patterns ("...") work correctly regardless of
        whether the caller explicitly provides ComparisonOptions. This was a key
        fix to ensure consistent ellipsis behavior across all usage patterns.

    Fallback Triggers:
        - ValueError/SyntaxError: Expected content isn't valid structured data
        - Type mismatch errors: Structure types don't align (array vs object)
        - Other parsing failures: Content format not recognized

    Error Context:
        The method provides detailed error messages that indicate:
        - Which comparison strategy was used (document vs text)
        - What specific mismatch was found
        - Suggestions for resolving common issues

    Usage Examples:
        # Basic comparison without options
        assert_expected_file_matches_output(self, "expected.json", actual_json)

        # With comparison options for fine control
        options = ComparisonOptions(ignore_fields={"_id"}, allow_omitted_fields=True)
        assert_expected_file_matches_output(self, "expected.json", actual_json, options)

        # Mixed content (tries document, falls back to text)
        assert_expected_file_matches_output(self, "expected.txt", actual_string)
    """
    expected_text = _read_text_file(expected_file_path)

    # Always try document comparison first, regardless of whether options are provided
    # This ensures ellipsis patterns work properly in all cases
    try:
        result = compare_documents(expected_text, actual_output, options)
        if not result.is_match:
            raise ComparisonError(result.error)
        testcase.assertTrue(result.is_match)
        return
    except (ValueError, SyntaxError) as e:
        # If document parsing fails, fall back to text comparison
        # This handles cases where the file contains plain text that isn't structured data
        pass
    except ComparisonError as e:
        # If comparison fails due to type mismatch (e.g., empty array vs empty string),
        # also fall back to text comparison for better compatibility
        if "Type mismatch" in str(e) or "one is array and the other is not" in str(e):
            pass
        else:
            # Re-raise other comparison errors (these are true comparison failures)
            raise

    # Fall back to text comparison only if document comparison failed
    # This requires both inputs to be strings
    if isinstance(actual_output, str):
        assert_outputs_match(testcase, expected_text, actual_output)
    else:
        # If actual_output is not a string and document comparison failed,
        # we have a fundamental type mismatch that can't be resolved
        raise ComparisonError(
            f"Cannot compare structured expected content with non-string actual output: {type(actual_output)}"
        )


def assert_matches_expected_file(
    expected_file: str, actual_value: Any, options: Optional[ComparisonOptions] = None
):
    """
    Standalone assertion function for comparing values against expected file content.

    This function provides a unittest-independent way to perform document comparison
    against file content. It's useful for testing frameworks other than unittest
    or for programmatic validation outside of test contexts.

    Args:
        expected_file (str): Relative path to expected content file
        actual_value (Any): Actual value to compare (any Python type)
        options (Optional[ComparisonOptions]): Comparison configuration

    Raises:
        AssertionError: If values don't match, with descriptive error message

    Design Decision: Uses AssertionError instead of ComparisonError to match
    standard Python assertion behavior for standalone functions.

    File Resolution: Uses the same path resolution logic as other components
    to find expected files in standard locations relative to the test package.
    """
    resolved_path = resolve_expected_file_path(expected_file)
    content = read_expected_file(resolved_path)
    result = compare_documents(content, actual_value, options)
    if not result.is_match:
        raise AssertionError(
            f"Values do not match expected file {expected_file}: {result.error}"
        )


def assert_matches_expected_content(
    expected_content: str,
    actual_value: Any,
    options: Optional[ComparisonOptions] = None,
):
    """
    Standalone assertion function for comparing values against expected content string.

    This function provides direct comparison against string content without file I/O.
    It's useful for inline test data or when expected content is generated dynamically.

    Args:
        expected_content (str): Expected content as string (JSON, Python literals, etc.)
        actual_value (Any): Actual value to compare (any Python type)
        options (Optional[ComparisonOptions]): Comparison configuration

    Raises:
        AssertionError: If values don't match, with descriptive error message

    Usage Examples:
        # Compare against inline JSON
        assert_matches_expected_content('{"count": 42}', result_dict)

        # Compare with ellipsis patterns
        assert_matches_expected_content('{"_id": "...", "name": "test"}', document)

        # Compare with options
        options = ComparisonOptions(ignore_fields={"timestamp"})
        assert_matches_expected_content('{"data": [...]}', result, options)
    """
    result = compare_documents(expected_content, actual_value, options)
    if not result.is_match:
        raise AssertionError(f"Values do not match expected content: {result.error}")


class ComparisonTestCase(unittest.TestCase):
    """
    Enhanced unittest.TestCase with MongoDB document comparison assertion methods.

    This mixin class extends the standard unittest.TestCase with specialized assertion
    methods for MongoDB document comparison. It provides a convenient way to add
    MongoDB-aware testing capabilities to existing test classes.

    Design Pattern: Mixin Class Approach
        Rather than requiring inheritance from a specific base class, this uses
        Python's multiple inheritance to add capabilities to existing TestCase
        subclasses. This preserves compatibility with existing test hierarchies.

    Integration Examples:
        class TestMongoQueries(ComparisonTestCase):
            def test_find_query(self):
                result = collection.find_one({"name": "test"})
                self.assertMatchesExpectedContent('{"name": "test", "_id": "..."}', result)

        class TestAggregation(unittest.TestCase, ComparisonTestCase):
            def test_pipeline(self):
                results = list(collection.aggregate([...]))
                self.assertMatchesExpectedFile("aggregation_result.json", results)

    Method Naming: Uses standard unittest conventions (assertXxx) to maintain
    consistency with built-in assertion methods and IDE support.

    Error Handling: Converts AssertionErrors from standalone functions into
    unittest failures with proper test framework integration.
    """

    def assertMatchesExpectedFile(
        self,
        expected_file: str,
        actual_value: Any,
        options: Optional[ComparisonOptions] = None,
    ):
        """
        Assert that actual_value matches the content of expected_file.

        Args:
            expected_file (str): Relative path to expected content file
            actual_value (Any): Actual value to compare
            options (Optional[ComparisonOptions]): Comparison configuration

        Raises:
            AssertionError: Via self.fail() if comparison doesn't match

        Design Note: Wraps the standalone function and converts AssertionError
        to unittest failure using self.fail() for proper test framework integration.
        """
        try:
            assert_matches_expected_file(expected_file, actual_value, options)
        except AssertionError as e:
            self.fail(str(e))

    def assertMatchesExpectedContent(
        self,
        expected_content: str,
        actual_value: Any,
        options: Optional[ComparisonOptions] = None,
    ):
        """
        Assert that actual_value matches the expected_content string.

        Args:
            expected_content (str): Expected content as string
            actual_value (Any): Actual value to compare
            options (Optional[ComparisonOptions]): Comparison configuration

        Raises:
            AssertionError: Via self.fail() if comparison doesn't match

        Usage Examples:
            # Basic document comparison
            self.assertMatchesExpectedContent('{"status": "ok"}', response)

            # With ellipsis patterns
            self.assertMatchesExpectedContent('{"_id": "...", "data": [...]}', doc)

            # With comparison options
            options = ComparisonOptions(ignore_fields={"created_at"})
            self.assertMatchesExpectedContent('{"name": "test"}', result, options)
        """
        try:
            assert_matches_expected_content(expected_content, actual_value, options)
        except AssertionError as e:
            self.fail(str(e))
