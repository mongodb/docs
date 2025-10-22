"""
Object and Value Comparison for MongoDB Document Validation

This module implements the core comparison engine for MongoDB documents and nested
data structures. It's designed specifically for validating code example outputs
against expected results, handling the complexities of MongoDB's flexible schema
and varied data representation.

Key Features:
    1. Deep Structural Comparison: Recursively compares nested objects and arrays
    2. MongoDB Type Normalization: Handles ObjectId, ISODate, and numeric variations
    3. Flexible Field Handling: Supports ignored fields and optional fields
    4. Ellipsis Pattern Support: Wildcard matching for partial validation
    5. Performance Safeguards: Timeout and recursion depth protection

Comparison Philosophy:
    The engine balances strict validation with practical flexibility:
    - Structural similarity is more important than exact representation
    - MongoDB type variations (int32 vs int64) are normalized
    - Field order in objects doesn't matter (unlike arrays)
    - Missing fields can be allowed or forbidden based on use case

Performance Characteristics:
    - Time Complexity: O(n * m) where n is expected structure size, m is actual
    - Space Complexity: O(d) where d is maximum nesting depth
    - Bounded Execution: Timeout and recursion limits prevent runaway comparisons
    - Early Termination: Fails fast on first structural mismatch

MongoDB-Specific Design Decisions:
    1. ObjectIds are compared as strings for reproducibility
    2. Dates/timestamps use ISO string comparison for consistency
    3. Numeric types are compared by value, not by specific type
    4. Binary data is base64-normalized for reliable comparison
    5. Decimal128 values are compared with appropriate precision

Error Reporting Strategy:
    - JSONPath-style location reporting (e.g., "$.users[0].address.city")
    - Specific error types for different mismatch categories
    - Helpful suggestions for common comparison failures
    - Context about what comparison strategy was attempted

Maintainer Notes:
    The comparison context (_Ctx) is the heart of the configuration system:
    - Tracks recursion depth and timeout to prevent infinite loops
    - Maintains ignore_fields set for flexible validation
    - Controls array comparison strategy selection
    - Provides early termination hooks for performance
"""

from __future__ import annotations

from typing import Any, Set

try:
    from .ellipsis import is_exact_ellipsis, is_truncated_string, is_object_ellipsis
    from .errors import ComparisonError
    from .normalize import normalize_for_comparison, numbers_equal
    from .arrays import compare_arrays
except ImportError:
    # Fallback for standalone execution
    from ellipsis import is_exact_ellipsis, is_truncated_string, is_object_ellipsis
    from errors import ComparisonError
    from normalize import normalize_for_comparison, numbers_equal
    from arrays import compare_arrays


class _Ctx:
    """
    Comparison context that tracks state and configuration during recursive comparison.

    This class serves as the central configuration and state management system
    for the comparison engine. It's designed to be passed down through recursive
    calls to maintain consistent behavior and prevent infinite loops.

    Design Rationale:
        Rather than passing individual parameters through every recursive call,
        the context object encapsulates all configuration and state. This makes
        the API cleaner and allows adding new features without breaking existing
        function signatures.

    Attributes:
        ignore_fields (Set[str]): Field names to skip during object comparison
        allow_omitted_fields (bool): Whether missing fields in actual are acceptable
        start_time (float | None): Monotonic time when comparison started
        timeout_seconds (float): Maximum allowed comparison time
        max_depth (int): Maximum recursion depth to prevent stack overflow
        current_depth (int): Current recursion level (0 at top level)
        comparison_type (str | None): Array comparison strategy preference
        array_size_threshold (int): Size limit for expensive array algorithms

    Performance Notes:
        - start_time uses monotonic clock for reliable timeout measurement
        - timeout_seconds can be adjusted for complex documents or slow systems
        - max_depth prevents stack overflow on circular or deeply nested data
        - array_size_threshold balances accuracy vs performance for large arrays
    """

    def __init__(self, ignore_fields: Set[str] | None, allow_omitted_fields: bool):
        """
        Initialize comparison context with field handling configuration.

        Args:
            ignore_fields (Set[str] | None): Field names to skip during comparison
            allow_omitted_fields (bool): Whether to allow missing fields in actual data

        Design Decision: Constructor only takes the most essential parameters,
        while performance limits use sensible defaults that can be adjusted
        after initialization if needed.
        """
        self.ignore_fields = ignore_fields or set()
        self.allow_omitted_fields = allow_omitted_fields
        self.start_time = None
        self.timeout_seconds = 30
        self.max_depth = 100
        self.current_depth = 0
        self.comparison_type = None  # "ordered", "unordered", or None
        self.array_size_threshold = 50

    def should_ignore(self, key: str) -> bool:
        """
        Check if a field should be skipped during object comparison.

        Args:
            key (str): Object field name to check

        Returns:
            bool: True if field should be ignored

        Design Note: Simple set membership test for O(1) performance.
        Field names are compared exactly (case-sensitive).
        """
        return key in self.ignore_fields

    def check_timeout(self, path: str) -> None:
        """
        Verify that comparison hasn't exceeded the timeout limit.

        Args:
            path (str): Current JSONPath for error reporting

        Raises:
            ComparisonError: If timeout has been exceeded

        Performance Note: Uses monotonic time to avoid issues with system
        clock adjustments during long-running comparisons.

        Design Decision: Timeout checking is called at strategic points
        rather than continuously to balance responsiveness with performance.
        """
        if self.start_time is not None:
            from time import monotonic

            if monotonic() - self.start_time > self.timeout_seconds:
                raise ComparisonError(
                    f"Comparison timeout after {self.timeout_seconds} seconds. Consider increasing timeout or using ordered comparison for large arrays.",
                    path,
                )

    def enter_recursion(self, path: str) -> None:
        """
        Mark entry into a recursive comparison call.

        Args:
            path (str): Current JSONPath for error reporting

        Raises:
            ComparisonError: If maximum recursion depth exceeded or timeout reached

        Design Rationale: Combines recursion tracking with timeout checking
        for efficiency. Called at the start of each recursive comparison
        to catch problems early.

        Stack Safety: The max_depth limit prevents stack overflow on pathological
        inputs like circular references or extremely deep nesting.
        """
        self.current_depth += 1
        if self.current_depth > self.max_depth:
            raise ComparisonError(
                f"Maximum recursion depth ({self.max_depth}) exceeded", path
            )
        self.check_timeout(path)

    def exit_recursion(self) -> None:
        """
        Mark exit from a recursive comparison call.

        Design Note: Simple decrement operation with no error checking.
        The recursion tracking is primarily for preventing runaway calls,
        not for enforcing perfect balanced entry/exit.
        """
        self.current_depth -= 1


def compare_values(expected: Any, actual: Any, path: str, ctx: _Ctx) -> None:
    """
    Recursively compare two values of any type using MongoDB-aware semantics.

    This is the core comparison function that handles all data types and
    recursive structures. It's designed specifically for MongoDB document
    validation with support for flexible schemas and type variations.

    Comparison Order (optimized for common patterns):
        1. Recursion and timeout safety checks
        2. Ellipsis pattern matching (wildcards)
        3. Null/None value handling
        4. MongoDB type normalization
        5. Primitive value comparison with numeric flexibility
        6. Array comparison using strategy selection
        7. Object comparison with field handling
        8. Type mismatch detection and reporting

    Args:
        expected (Any): Expected value (can be any type)
        actual (Any): Actual value to compare against expected
        path (str): JSONPath location for error reporting (e.g., "$.users[0].name")
        ctx (_Ctx): Comparison context with configuration and state

    Raises:
        ComparisonError: If values don't match according to comparison rules

    Design Philosophy:
        The function prioritizes practical usability over strict type matching:
        - MongoDB's flexible types are normalized before comparison
        - Numeric types are compared by value, not by specific representation
        - String prefixes can be matched with ellipsis ("text...")
        - Objects support partial matching with ignored or optional fields

    MongoDB Type Handling:
        - ObjectId: Converted to string representation
        - ISODate: Normalized to ISO format string
        - NumberInt/NumberLong: Compared numerically
        - Binary: Base64-encoded for comparison
        - Decimal128: Handled with appropriate precision

    Performance Characteristics:
        - Early termination on first mismatch for fail-fast behavior
        - Ellipsis patterns avoid unnecessary deep comparison
        - Normalization is cached within single comparison operation
        - Recursion limits prevent exponential blowup on malformed data

    Error Context:
        Every error includes the JSONPath location where the mismatch occurred,
        making it easy to identify problematic data in large documents.
    """
    # Check timeout and recursion limits at entry to every comparison
    # Design Decision: Early checking prevents deep recursion from running
    # away before timeout/depth limits can be enforced
    ctx.enter_recursion(path)
    try:
        # Handle ellipsis patterns first for maximum efficiency
        # These are wildcard matches that bypass all other comparison logic
        if is_exact_ellipsis(expected):
            # "..." matches any value completely
            return
        if is_truncated_string(expected):
            # "prefix..." matches any string starting with "prefix"
            if not isinstance(actual, str):
                raise ComparisonError(
                    "Expected truncated string but actual is not a string", path
                )
            prefix = expected[:-3]  # Remove "..." suffix
            if not actual.startswith(prefix):
                raise ComparisonError(
                    f"String prefix mismatch: expected startswith {prefix!r}, actual={actual!r}",
                    path,
                )
            return

        # Handle null/None values with strict equality
        # Design Decision: None is only equal to None, not to empty strings,
        # zero values, or other "falsy" types for MongoDB consistency
        if expected is None or actual is None:
            if expected is actual:
                return
            if expected is None:
                error_msg = f"Expected null but got {actual!r}. Suggestion: Check if this field should be omitted."
            else:
                error_msg = f"Expected {expected!r} but got null. Suggestion: Check if this field is missing from the data source."
            raise ComparisonError(error_msg, path)

        # Apply MongoDB-specific type normalization before comparison
        # This handles ObjectIds, dates, numeric types, etc.
        e = normalize_for_comparison(expected)
        a = normalize_for_comparison(actual)

        # Compare primitive values (non-dict, non-list)
        # This handles strings, numbers, booleans after normalization
        if not isinstance(e, (list, dict)) and not isinstance(a, (list, dict)):
            # Check type compatibility first
            if type(e) != type(a):
                # Special case: allow numeric type flexibility (int/float)
                if numbers_equal(e, a):
                    return
                error_msg = (
                    f"Type mismatch: expected {type(e).__name__}, actual {type(a).__name__}. "
                    f"Expected: {e!r}, Actual: {a!r}. "
                    f"Suggestion: Check that the data types match your expectations."
                )
                raise ComparisonError(error_msg, path)

            # Check value equality
            if e != a:
                # Double-check with numeric comparison for edge cases
                if numbers_equal(e, a):
                    return
                error_msg = (
                    f"Value mismatch: expected {e!r}, actual {a!r}. "
                    f"Suggestion: Check if the values are correct. If values are dynamic, use 'with_ignored_fields' in the test or ellipsis patterns in the output to match any value."
                )
                raise ComparisonError(error_msg, path)
            return

        # Handle array comparison using strategy selection
        # Arrays use specialized algorithms based on size and content type
        if isinstance(e, list) and isinstance(a, list):
            return compare_arrays(
                e, a, lambda ex, ac, p: compare_values(ex, ac, p, ctx), path, ctx
            )

        # Detect array/non-array type mismatches
        # This catches cases where expected is array but actual is object or vice versa
        if isinstance(e, list) != isinstance(a, list):
            expected_type = "array" if isinstance(e, list) else type(e).__name__
            actual_type = "array" if isinstance(a, list) else type(a).__name__
            error_msg = (
                f"Type mismatch: expected {expected_type}, actual {actual_type}. "
                f"Suggestion: Check if you meant to compare an array with an object."
            )
            raise ComparisonError(error_msg, path)

        # Handle object (dictionary) comparison
        # This is the most complex case with field handling and ellipsis support
        if isinstance(e, dict) and isinstance(a, dict):
            # Check for full object wildcard pattern
            if is_object_ellipsis(e):
                # {"...": "..."} matches any object completely
                return

            # Compare each expected field
            for key in e.keys():
                # Skip ellipsis marker fields
                if key == "...":
                    continue

                # Handle ignored fields (skip comparison but check presence)
                if ctx.should_ignore(key):
                    if key not in a and not ctx.allow_omitted_fields:
                        error_msg = (
                            f"Missing key: {key}. This field is marked to be ignored but is missing from actual data. "
                            f"Suggestion: Check if the field name is correct or if it should be optional."
                        )
                        raise ComparisonError(error_msg, path)
                    continue

                # Check for missing fields in actual object
                if key not in a:
                    if not ctx.allow_omitted_fields:
                        error_msg = (
                            f"Missing key: {key}. Expected this field to be present in the actual data. "
                            f"Suggestion: Check if the field name is correct, if the data source includes this field, "
                            f"or if you should use global ellipsis (...) to allow missing fields."
                        )
                        raise ComparisonError(error_msg, f"{path}.{key}")
                    else:
                        # Field is missing but that's allowed - skip comparison
                        continue

                # Handle property-level ellipsis: {"field": "..."}
                if is_exact_ellipsis(e[key]):
                    # This field value is a wildcard - accept any value
                    continue

                # Recursively compare the field value
                compare_values(e[key], a[key], f"{path}.{key}", ctx)

            # Check for unexpected extra fields in actual object
            # Only enforced when omitted fields are not allowed
            if not ctx.allow_omitted_fields:
                exp_keys = set(k for k in e.keys() if k != "...")
                act_keys = set(a.keys())
                extras = act_keys - exp_keys
                if extras:
                    raise ComparisonError(
                        f"Unexpected keys present: {sorted(list(extras))}", path
                    )
            return

        # Fallback for any other type mismatch
        # This should rarely be reached due to normalization, but provides
        # a safety net for unexpected type combinations
        raise ComparisonError(
            f"Type mismatch: expected {type(e).__name__}, actual {type(a).__name__}",
            path,
        )
    finally:
        # Always clean up recursion tracking, even if comparison fails
        # This ensures the context remains in a consistent state for
        # subsequent comparisons or error handling
        ctx.exit_recursion()
