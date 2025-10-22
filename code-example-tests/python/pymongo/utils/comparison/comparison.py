"""
Main Comparison Engine for MongoDB Document and Text Validation

This module provides the central orchestration layer for MongoDB document comparison,
coordinating between different comparison strategies and providing unified result
reporting. It serves as the primary entry point for all comparison operations
in the MongoDB code example testing framework.

Architecture Overview:
    The comparison engine uses a hierarchical strategy selection approach:
    1. Text Analysis: Detect if content appears to be structured data
    2. Parser Integration: Convert text to normalized Python objects
    3. Strategy Selection: Choose appropriate comparison algorithm
    4. Result Aggregation: Provide unified success/failure reporting

Key Design Decisions:
    1. Automatic Strategy Selection: Text vs structured comparison based on content analysis
    2. Graceful Fallback: Structured comparison failures fall back to text comparison
    3. Unified Options: Single ComparisonOptions class controls all comparison behavior
    4. Performance Bounds: Timeout and size limits prevent runaway comparisons
    5. Comprehensive Results: Detailed error reporting for debugging failures

Comparison Flow:
    compare_documents() -> parse_expected_content() -> compare_values() -> compare_values_internal()

    Alternative flow for text:
    compare_text_outputs() -> structured content detection -> compare_values() OR text normalization

Performance Considerations:
    - Structured content detection uses fast pattern matching
    - Parser errors trigger immediate fallback to text comparison
    - Timeout monitoring prevents infinite loops on pathological data
    - Size thresholds limit expensive algorithms to manageable datasets

Integration Points:
    - parser.py: Content parsing
    - normalize.py: MongoDB type normalization
    - objects.py: Core comparison algorithms and recursion management
    - errors.py: Standardized error reporting

Maintainer Notes:
    When modifying comparison strategy selection:
    1. Preserve fallback behavior for maximum compatibility
    2. Update structured content patterns when adding new MongoDB types
    3. Consider performance impact of new analysis steps
    4. Maintain consistent result formats across all comparison paths
"""

from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any, Optional, List

try:
    from .errors import ComparisonError
    from .parser import parse_expected_content
    from .normalize import normalize_for_comparison
    from .objects import compare_values as compare_values_internal, _Ctx
except ImportError:
    # Fallback for standalone execution
    from errors import ComparisonError
    from parser import parse_expected_content
    from normalize import normalize_for_comparison
    from objects import compare_values as compare_values_internal, _Ctx

from time import monotonic


@dataclass
class TextComparisonOptions:
    """
    Configuration options for plain text comparison operations.

    These options control how text content is normalized before comparison,
    handling common variations in whitespace and line endings that shouldn't
    affect test results.

    Attributes:
        trim_trailing_whitespace (bool): Remove trailing whitespace from lines
        normalize_line_endings (bool): Convert all line endings to Unix format (\\n)

    Design Rationale:
        MongoDB output formatting can vary across platforms and MongoDB versions.
        These normalizations handle common variations that don't represent
        meaningful differences in test results:
        - Windows vs Unix line endings
        - Trailing whitespace from console output
        - Inconsistent formatting in human-readable output
    """

    trim_trailing_whitespace: bool = True
    normalize_line_endings: bool = True


@dataclass
class ComparisonOptions:
    """
    Configuration options for structured document comparison operations.

    This class provides fine-grained control over how MongoDB documents and
    data structures are compared, allowing tests to specify exactly what
    variations should be tolerated during comparison.

    Attributes:
        comparison_type (Optional[str]): Array comparison strategy preference
            - "ordered": Elements must match in exact sequence
            - "unordered": Elements can appear in any order
            - None: Auto-select based on content and performance characteristics

        ignore_field_values (Optional[set[str]]): Field names to skip during comparison
            - Useful for timestamps, auto-generated IDs, and environment-specific data
            - Fields are ignored at all nesting levels

        timeout_seconds (int): Maximum time allowed for comparison operations
            - Prevents runaway comparisons on pathological data
            - Default 30 seconds balances thoroughness with responsiveness

        array_size_threshold (int): Maximum array size for expensive algorithms
            - Arrays larger than this use ordered comparison for performance
            - Prevents exponential algorithms from running on large datasets

    Design Philosophy:
        The options balance flexibility with sensible defaults. Most comparisons
        work well with default settings, but complex scenarios can fine-tune
        behavior without requiring code changes in the comparison engine.

    Usage Examples:
        # Basic usage with defaults
        options = ComparisonOptions()

        # Ignore volatile fields
        options = ComparisonOptions(ignore_field_values={"_id", "timestamp", "session_id"})

        # Force ordered array comparison for performance
        options = ComparisonOptions(comparison_type="ordered")

        # Increase limits for large datasets
        options = ComparisonOptions(timeout_seconds=60, array_size_threshold=100)
    """

    comparison_type: Optional[str] = (
        None  # "ordered", "unordered", or None (auto-select)
    )
    ignore_field_values: Optional[set[str]] = None
    timeout_seconds: int = 30
    array_size_threshold: int = 50  # Max size for unordered backtracking


@dataclass
class ComparisonResult:
    """
    Standardized result container for all comparison operations.

    This class provides a consistent interface for reporting comparison results
    across all comparison strategies (text, document, array, etc.). It includes
    both success/failure status and detailed error information for debugging.

    Attributes:
        is_match (bool): True if comparison succeeded, False if values don't match
        error (Optional[str]): Primary error message describing the mismatch
        errors (List[ComparisonError]): Detailed error list for complex failures

    Design Decision: Separate Single Error vs Error List
        - error: Simple string for most common case (single mismatch)
        - errors: Detailed list for complex scenarios (multiple mismatches)

        This dual approach handles both simple failures ("values don't match")
        and complex scenarios (multiple array elements with different issues).

    Usage Patterns:
        # Simple success check
        if result.is_match:
            # Test passed
            pass
        else:
            # Test failed, result.error contains description
            print(f"Comparison failed: {result.error}")

        # Detailed error analysis
        if not result.is_match and result.errors:
            for error in result.errors:
                print(f"Error at {error.path}: {error.message}")
    """

    is_match: bool
    error: Optional[str] = None
    errors: List[ComparisonError] = field(default_factory=list)


def _normalize_text(s: str, options: TextComparisonOptions) -> str:
    """
    Apply text normalization transformations for consistent comparison.

    Args:
        s (str): Text content to normalize
        options (TextComparisonOptions): Normalization configuration

    Returns:
        str: Normalized text content

    Normalization Steps:
        1. Line ending normalization: Convert \\r\\n and \\r to \\n
        2. Trailing whitespace removal: Strip whitespace from end of each line

    Design Decision: Separate normalization function allows reuse and testing
    of normalization logic independent of comparison operations.
    """
    if options.normalize_line_endings:
        s = s.replace("\r\n", "\n").replace("\r", "\n")
    if options.trim_trailing_whitespace:
        s = "\n".join(line.rstrip() for line in s.split("\n"))
    return s


def compare_text_outputs(
    expected_text: str, actual_text: str, options: TextComparisonOptions | None = None
) -> tuple[bool, str | None]:
    """
    Compare two text strings with intelligent structured content detection.

    This function implements a hybrid comparison strategy that automatically detects
    when text content appears to contain structured data (MongoDB objects, operations,
    etc.) and switches to semantic comparison instead of literal text comparison.

    Args:
        expected_text (str): Expected output text
        actual_text (str): Actual output text to compare
        options (TextComparisonOptions | None): Text normalization configuration

    Returns:
        tuple[bool, str | None]: (is_match, error_message)

    Comparison Strategy:
        1. Structured Content Detection: Check for MongoDB-specific patterns
        2. Semantic Comparison: If structured patterns found, use document comparison
        3. Text Fallback: If semantic comparison fails, fall back to text comparison
        4. Normalized Text Comparison: Apply whitespace/line ending normalization

    Structured Content Patterns:
        The function looks for specific patterns that indicate MongoDB data:
        - datetime.datetime(: Python datetime constructors
        - ObjectId(: MongoDB ObjectId constructors
        - InsertOne(, UpdateOne(: PyMongo operation objects
        - $oid, $date: Extended JSON format
        - "...", '...': Ellipsis patterns for partial matching

    Design Rationale: Enhanced Structured Detection
        This was a key enhancement to ensure ellipsis patterns work correctly
        even when no explicit ComparisonOptions are provided. The function now
        uses the full comparison engine for any content that might contain
        structured data, ensuring consistent ellipsis behavior.

    Performance Characteristics:
        - Pattern detection: O(n) single pass through both strings
        - Structured comparison: O(n * m) worst case with ellipsis support
        - Text comparison: O(n) with line-by-line diff generation

    Error Reporting:
        For text comparison, provides line-by-line diff showing first mismatch.
        For structured comparison, provides detailed path-based error messages.
    """
    options = options or TextComparisonOptions()

    # Check if either text contains patterns that suggest structured content
    # This pattern list is deliberately comprehensive to catch all MongoDB-related syntax
    structured_patterns = [
        "datetime.datetime(",  # Python datetime objects
        "ObjectId(",  # MongoDB ObjectId constructors
        "InsertOne(",  # PyMongo bulk operation objects
        "UpdateOne(",  # PyMongo bulk operation objects
        "$oid",  # Extended JSON ObjectId format
        "$date",  # Extended JSON date format
        '"..."',  # Ellipsis patterns in JSON
        "'...'",  # Ellipsis patterns in Python literals
    ]

    has_structured_content = any(
        pattern in expected_text or pattern in actual_text
        for pattern in structured_patterns
    )

    if has_structured_content:
        # Use semantic parsing and comparison for structured content
        try:
            from .parser import parse_expected_content
            from .normalize import normalize_for_comparison

            # Parse and normalize both sides using full MongoDB-aware parsing
            expected_parsed, has_global_ellipsis = parse_expected_content(expected_text)

            # For actual text, try to parse it as well, but if it fails, treat it as raw data
            try:
                actual_parsed, _ = parse_expected_content(actual_text)
            except:
                # If parsing fails, treat the actual text as the raw value
                # This handles cases where expected is structured but actual is plain text
                actual_parsed = actual_text

            # Use the full comparison engine with ellipsis support
            # Create a default ComparisonOptions to ensure consistent behavior
            default_options = ComparisonOptions()
            result = compare_values(
                expected_parsed, actual_parsed, default_options, has_global_ellipsis
            )

            if result.is_match:
                return True, None
            else:
                return False, result.error

        except Exception as e:
            # If semantic parsing fails, fall back to text comparison
            # This preserves backward compatibility when structured parsing encounters errors
            pass

    # Fall back to basic text normalization and comparison
    # This handles plain text output that doesn't contain structured data
    expected_normalized = _normalize_text(expected_text, options)
    actual_normalized = _normalize_text(actual_text, options)

    if expected_normalized == actual_normalized:
        return True, None

    # Produce a helpful diff-like message showing the first mismatching line
    # This helps writers quickly identify where text differences occur
    expected_lines = expected_normalized.split("\n")
    actual_lines = actual_normalized.split("\n")
    max_lines = max(len(expected_lines), len(actual_lines))

    for i in range(max_lines):
        expected_line = expected_lines[i] if i < len(expected_lines) else "<no line>"
        actual_line = actual_lines[i] if i < len(actual_lines) else "<no line>"
        if expected_line != actual_line:
            return (
                False,
                f"Mismatch at line {i+1}: expected={expected_line!r} actual={actual_line!r}",
            )

    # Fallback message if line-by-line comparison doesn't find differences
    # This shouldn't normally happen but provides a safety net
    return False, "Outputs differ"


def compare_values(
    expected_value: Any,
    actual_value: Any,
    options: Optional[ComparisonOptions] = None,
    has_global_ellipsis: bool = False,
) -> ComparisonResult:
    """
    Core function for comparing two values using MongoDB-aware comparison strategies.

    This function serves as the main entry point for structured value comparison,
    coordinating between the comparison options, timeout management, and the
    internal comparison engine that handles recursion and type-specific logic.

    Args:
        expected_value (Any): Expected value (any Python type, including MongoDB types)
        actual_value (Any): Actual value to compare against expected
        options (Optional[ComparisonOptions]): Configuration for comparison behavior
        has_global_ellipsis (bool): Whether global "..." wildcard pattern was detected

    Returns:
        ComparisonResult: Standardized result with success status and error details

    Coordination Responsibilities:
        1. Options Management: Apply defaults and validate configuration
        2. Context Initialization: Set up timeout, recursion limits, and caching
        3. Comparison Delegation: Route to appropriate internal comparison logic
        4. Result Standardization: Convert internal errors to standardized format

    Context Configuration:
        The function creates a comparison context (_Ctx) that tracks:
        - Field ignore patterns and omitted field handling
        - Timeout monitoring with monotonic clock
        - Recursion depth limiting for stack safety
        - Array comparison strategy selection
        - Performance thresholds for algorithm selection

    Global Ellipsis Handling:
        When has_global_ellipsis is True, the comparison treats the entire
        expected value as a wildcard pattern, potentially bypassing detailed
        comparison logic. This supports test cases where exact output format
        isn't important, only operation success.

    Error Transformation:
        Internal comparison errors (ComparisonError, ValueError, etc.) are
        caught and transformed into standardized ComparisonResult objects
        with helpful error messages for test debugging.

    Performance Monitoring:
        The function starts timeout monitoring using monotonic time to ensure
        comparisons complete within configured limits, preventing test hangs
        on pathological data structures.
    """
    options = options or ComparisonOptions()

    # Initialize comparison context with configuration and performance limits
    ctx = _Ctx(options.ignore_field_values or set(), has_global_ellipsis)
    ctx.start_time = monotonic()
    ctx.timeout_seconds = options.timeout_seconds
    ctx.max_depth = 100  # Stack safety limit for deep recursion
    ctx.current_depth = 0
    ctx.comparison_type = options.comparison_type
    ctx.array_size_threshold = options.array_size_threshold

    try:
        # Delegate to internal comparison engine with full context
        compare_values_internal(expected_value, actual_value, "$", ctx)
        return ComparisonResult(True, None)
    except Exception as ex:
        # Transform any internal error into standardized result format
        return ComparisonResult(False, str(ex))


def compare_documents(
    expected_content: str,
    actual_value: Any,
    options: Optional[ComparisonOptions] = None,
) -> ComparisonResult:
    """
    Compare parsed document content against an actual value using MongoDB-aware comparison.

    This function handles the complete document comparison workflow: parsing the
    expected content string, normalizing the actual value, and performing semantic
    comparison with support for MongoDB types and ellipsis patterns.

    Args:
        expected_content (str): Expected content as text (JSON, Python literals, etc.)
        actual_value (Any): Actual value to compare (any Python type)
        options (Optional[ComparisonOptions]): Configuration for comparison behavior

    Returns:
        ComparisonResult: Standardized result with success status and error details

    Processing Pipeline:
        1. Content Parsing: Convert text to normalized Python objects
        2. Global Ellipsis Detection: Identify top-level wildcard patterns
        3. Value Normalization: Apply MongoDB type normalization to actual value
        4. Comparison Execution: Perform structured comparison with full feature support

    Parser Integration:
        Uses parse_expected_content() to handle complex MongoDB syntax including:
        - MongoDB shell constructors (ObjectId, Date, Binary)
        - PyMongo result objects (InsertOneResult, UpdateResult)
        - Extended JSON format ($oid, $date, $binary)
        - Python datetime and other standard types
        - Comments and formatting variations

    Normalization Strategy:
        The actual value undergoes MongoDB-specific normalization to ensure
        consistent comparison with parsed expected content:
        - ObjectIds become string representations
        - Datetime objects use ISO format with millisecond precision
        - Numeric types gain flexible cross-type comparison
        - PyMongo result objects expose essential comparative data

    Global Ellipsis Support:
        When the expected content contains top-level "..." patterns, the entire
        comparison may be treated as a wildcard match, useful for tests that
        only care about operation success rather than exact output format.

    Design Decision: Separate Parsing and Comparison
        The function separates parsing concerns from comparison logic, allowing
        each component to be optimized independently and enabling reuse of
        parsing logic across different comparison contexts.
    """
    # Parse expected content with full MongoDB syntax support
    parsed_expected, has_global_ellipsis = parse_expected_content(expected_content)

    # Apply MongoDB-specific normalization to actual value
    # This ensures consistent representation for comparison
    actual_normalized = normalize_for_comparison(actual_value)

    # Perform structured comparison with full feature support
    return compare_values(
        parsed_expected, actual_normalized, options, has_global_ellipsis
    )
