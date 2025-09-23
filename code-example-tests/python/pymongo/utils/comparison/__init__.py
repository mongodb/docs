"""
MongoDB Document Comparison Engine for PyMongo Code Example Testing

This package provides a sophisticated comparison engine specifically designed for validating
MongoDB code example outputs. It handles MongoDB-specific data types, ellipsis patterns,
and provides detailed error reporting for technical writers.

Core Design Principles:
    1. Semantic over Syntactic: Compares meaning rather than exact text formatting
    2. MongoDB-Aware: Understands ObjectId, datetime, Decimal128, and other BSON types
    3. Flexible Matching: Supports ellipsis patterns for dynamic content (IDs, timestamps)
    4. Helpful Errors: Provides actionable error messages with paths to mismatched content
    5. Performance-Optimized: Uses caching and intelligent algorithm selection

Key Components:
    - assert_helpers.py: High-level assertion functions for unittest integration
    - comparison.py: Core comparison engine with algorithm selection
    - parser.py: MongoDB document syntax parser with constructor support
    - ellipsis.py: Ellipsis pattern detection and matching logic
    - arrays.py: Array comparison strategies (ordered, unordered, hybrid)
    - objects.py: Object comparison with field ignoring and path tracking
    - normalize.py: MongoDB type normalization for cross-format compatibility
    - errors.py: Specialized exception classes with path context

Ellipsis Pattern Support (see comparison-spec.md for full specification):
    - Property-level: {"_id": "..."} matches any value
    - Array-level: ["..."] matches any array, [1, "...", 3] allows gaps
    - Object-level: {"...": "..."} matches any object structure
    - Global: Standalone "..." lines allow extra fields everywhere
    - Truncated strings: "Error: Connection failed..." matches prefixes

Algorithm Selection Strategy:
    The engine automatically selects the best comparison algorithm based on:
    - Array size (switches to ordered for large arrays to avoid timeout)
    - Content type (primitives vs objects)
    - Ellipsis presence (affects matching strategy)
    - User preferences (ComparisonOptions can override defaults)

Example Usage:
    # Basic assertion
    assert_expected_file_matches_output(self, "expected.txt", actual_result)

    # With options for ignored fields
    options = ComparisonOptions(ignore_field_values={"_id", "timestamp"})
    assert_expected_file_matches_output(self, "expected.txt", actual_result, options)

    # Standalone comparison
    result = compare_documents(expected_content, actual_data)
    assert result.is_match, result.error

Threading and Performance:
    - All functions are thread-safe
    - Parsing results are not cached (content varies too much)
    - Timeout protection prevents infinite loops in complex comparisons
    - Memory usage is bounded by recursion depth limits
"""

from .assert_helpers import (
    assert_expected_file_matches_output,
    assert_outputs_match,
    assert_matches_expected_file,
    assert_matches_expected_content,
    ComparisonTestCase,
)
from .comparison import (
    compare_text_outputs,
    compare_documents,
    compare_values,
    ComparisonOptions,
    ComparisonResult,
)
from .errors import ComparisonError

__all__ = [
    "assert_expected_file_matches_output",
    "assert_outputs_match",
    "assert_matches_expected_file",
    "assert_matches_expected_content",
    "ComparisonTestCase",
    "compare_text_outputs",
    "compare_documents",
    "compare_values",
    "ComparisonOptions",
    "ComparisonResult",
    "ComparisonError",
]
