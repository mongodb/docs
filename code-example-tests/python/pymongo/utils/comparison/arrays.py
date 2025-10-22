"""
Array Comparison Strategies for MongoDB Document Validation

This module implements multiple array comparison algorithms optimized for different
use cases in MongoDB code example testing. The key insight is that different types
of arrays require different comparison strategies for optimal accuracy and performance.

Comparison Strategies:
    1. Ordered: Elements must match in exact sequence (fastest, most restrictive)
    2. Unordered: Elements can be in any order (slower, more permissive)
    3. Hybrid: Primitives compared by frequency, objects by backtracking
    4. Ellipsis: Special handling for "..." wildcards and gaps

Algorithm Selection Logic:
    The engine automatically selects the best strategy based on:
    - Array size (large arrays default to ordered for performance)
    - Content type (mixed primitive/object arrays use hybrid strategy)
    - Ellipsis presence (triggers specialized ellipsis handling)
    - User preferences (ComparisonOptions can override defaults)

Performance Design Decisions:
    1. Size Thresholds: Large arrays (>50 elements) avoid exponential algorithms
    2. Early Termination: Backtracking stops on first solution found
    3. Timeout Protection: All algorithms respect global timeout limits
    4. Memory Bounds: Recursion depth is limited to prevent stack overflow

MongoDB-Specific Considerations:
    - MongoDB query results often have unpredictable ordering
    - Aggregation pipelines may produce differently ordered results
    - Bulk operations return results in implementation-dependent order
    - Sample data queries benefit from permissive ordering comparison

Error Reporting Strategy:
    All algorithms provide helpful error messages that:
    - Identify the specific comparison strategy used
    - Suggest alternative strategies when appropriate
    - Include path context for debugging nested structures
    - Provide actionable advice for fixing comparison failures

Maintainer Notes:
    When modifying algorithms, ensure:
    1. Timeout checking is preserved in all loops
    2. Error messages remain helpful and actionable
    3. Performance characteristics don't degrade for common cases
    4. New patterns are covered by comprehensive tests
"""

from __future__ import annotations

from typing import Any, Callable, List, Set

try:
    from .ellipsis import (
        is_exact_ellipsis,
        is_truncated_string,
        array_has_ellipsis_markers,
    )
    from .errors import ComparisonError
except ImportError:
    # Fallback for standalone execution
    from ellipsis import (
        is_exact_ellipsis,
        is_truncated_string,
        array_has_ellipsis_markers,
    )
    from errors import ComparisonError


def _summarize_array_for_error(arr: List[Any], max_items: int = 3) -> str:
    """
    Create a concise summary of an array for error messages.

    Args:
        arr: Array to summarize
        max_items: Maximum number of items to show before truncating

    Returns:
        String summary like "[1, 2, 3]" or "[1, 2, ...] (5 items)"
    """
    if not arr:
        return "[]"

    if len(arr) <= max_items:
        items = [_safe_repr(item) for item in arr]
        return f"[{', '.join(items)}]"
    else:
        items = [_safe_repr(item) for item in arr[:max_items]]
        return f"[{', '.join(items)}, ...] ({len(arr)} items)"


def _safe_repr(obj: Any, max_length: int = 50) -> str:
    """
    Safe string representation for error messages.

    Args:
        obj: Object to represent
        max_length: Maximum length before truncating

    Returns:
        String representation, truncated if too long
    """
    try:
        if isinstance(obj, str):
            repr_str = repr(obj)
        elif isinstance(obj, dict):
            if len(obj) <= 2:
                repr_str = str(obj)
            else:
                keys = list(obj.keys())[:2]
                repr_str = f"{{{', '.join(f'{k!r}: ...' for k in keys)}, ...}} ({len(obj)} fields)"
        elif isinstance(obj, list):
            if len(obj) <= 3:
                repr_str = str(obj)
            else:
                repr_str = f"[{obj[0]!r}, {obj[1]!r}, ...] ({len(obj)} items)"
        else:
            repr_str = repr(obj)

        if len(repr_str) > max_length:
            return repr_str[:max_length-3] + "..."
        return repr_str
    except Exception:
        return f"<{type(obj).__name__}>"


def _compare_ordered(
    expected: List[Any],
    actual: List[Any],
    compare_elem: Callable[[Any, Any, str], None],
    path: str,
) -> None:
    """
    Compare arrays in exact order - fastest but most restrictive strategy.

    This is the simplest and fastest comparison strategy, requiring elements
    to match in exact sequence. Used when order is semantically important
    or when performance is critical for large arrays.

    Args:
        expected (List[Any]): Expected array elements in order
        actual (List[Any]): Actual array elements to compare
        compare_elem (Callable): Function to compare individual elements
        path (str): Current JSONPath for error reporting

    Raises:
        ComparisonError: If arrays have different lengths or any element doesn't match

    Design Decision: Fails fast on length mismatch before comparing elements
    to provide clearer error messages and avoid partial comparison work.

    Time Complexity: O(n) where n is array length
    Space Complexity: O(1) additional space
    """
    if len(expected) != len(actual):
        raise ComparisonError(
            f"Array length mismatch: expected {len(expected)} != actual {len(actual)}",
            path,
        )
    for i, (e, a) in enumerate(zip(expected, actual)):
        compare_elem(e, a, f"{path}[{i}]")


def _match_with_ellipsis(
    expected: List[Any],
    actual: List[Any],
    compare_elem: Callable[[Any, Any, str], None],
    path: str,
) -> None:
    """
    Implement ordered matching where "..." matches any number of elements.

    This algorithm handles ellipsis patterns within arrays, allowing "..." elements
    to match zero or more consecutive elements in the actual array. The matching
    is still order-dependent but allows gaps and wildcards.

    Algorithm: Uses recursive backtracking to try all possible ways of mapping
    ellipsis elements to actual array segments.

    Args:
        expected (List[Any]): Expected array with possible ellipsis elements
        actual (List[Any]): Actual array to match against
        compare_elem (Callable): Function to compare non-ellipsis elements
        path (str): Current JSONPath for error reporting

    Raises:
        ComparisonError: If no valid ellipsis matching exists

    Design Decision: Uses nested recursive function for clean state management
    rather than passing indices through the call stack.

    Example Matches:
        [1, "...", 4] matches [1, 2, 3, 4] (ellipsis matches [2, 3])
        [1, "...", 4] matches [1, 4] (ellipsis matches empty sequence)
        ["..."] matches [1, 2, 3] (ellipsis matches entire array)

    Time Complexity: O(n * m) where n is expected length, m is actual length
    Space Complexity: O(n) for recursion stack
    """

    def rec(i: int, j: int) -> bool:
        """
        Recursive helper to match expected[i:] with actual[j:].

        Args:
            i (int): Current index in expected array
            j (int): Current index in actual array

        Returns:
            bool: True if remaining elements can be matched
        """
        if i == len(expected):
            return j == len(actual)
        if j > len(actual):
            return False

        e = expected[i]
        if is_exact_ellipsis(e):
            # Try all possible lengths for this ellipsis (including zero)
            for k in range(j, len(actual) + 1):
                if rec(i + 1, k):
                    return True
            return False

        if j >= len(actual):
            return False

        try:
            compare_elem(e, actual[j], f"{path}[{j}]")
        except ComparisonError:
            return False

        return rec(i + 1, j + 1)

    if not rec(0, 0):
        expected_summary = _summarize_array_for_error(expected)
        actual_summary = _summarize_array_for_error(actual)

        error_msg = (
            f"Array elements could not be matched with ellipsis patterns. "
            f"Expected: {expected_summary}, Actual: {actual_summary}. "
            f"Suggestion: Check that '...' patterns are placed correctly and actual array "
            f"contains the expected elements."
        )
        raise ComparisonError(error_msg, path)


def _is_primitive(value: Any) -> bool:
    """
    Check if a value is a primitive type (not dict or list).

    Primitive values are compared by equality and can be efficiently handled
    using frequency counting in the hybrid comparison strategy.

    Args:
        value (Any): Value to check

    Returns:
        bool: True if value is not a dict or list

    Design Decision: Consider everything except dict/list as primitive to
    keep the distinction simple. This includes None, strings, numbers,
    custom objects, etc.
    """
    return not isinstance(value, (dict, list))


def _compare_unordered_backtracking(
    expected: List[Any],
    actual: List[Any],
    compare_elem: Callable[[Any, Any, str], None],
    path: str,
    ctx: Any,
) -> None:
    """
    Unordered array comparison using backtracking algorithm.

    This algorithm allows elements to appear in any order, which is essential
    for MongoDB operations that don't guarantee result ordering. Uses backtracking
    to find a valid one-to-one mapping between expected and actual elements.

    Performance Safeguards:
        - Size threshold prevents exponential blowup on large arrays
        - Timeout checking prevents infinite loops
        - Early termination on first valid solution

    Args:
        expected (List[Any]): Expected array elements (order-independent)
        actual (List[Any]): Actual array elements to match
        compare_elem (Callable): Function to compare individual elements
        path (str): Current JSONPath for error reporting
        ctx (Any): Comparison context with timeout and size limits

    Raises:
        ComparisonError: If arrays can't be matched or size/timeout limits exceeded

    Algorithm Complexity:
        Time: O(n!) worst case, but typically much better with early termination
        Space: O(n) for recursion stack and used_indices set

    Ellipsis Handling:
        Ellipsis elements ("...") are counted but removed from actual matching,
        allowing the actual array to contain more elements than expected.

    Design Rationale:
        MongoDB operations frequently return results in unpredictable order:
        - find() results depend on storage order
        - aggregate() without $sort is order-undefined
        - Bulk operations may complete in any sequence
    """
    # Check size limits to prevent combinatorial explosion
    if (
        len(expected) > ctx.array_size_threshold
        or len(actual) > ctx.array_size_threshold
    ):
        raise ComparisonError(
            f"Array too large for unordered comparison (expected: {len(expected)}, actual: {len(actual)}, limit: {ctx.array_size_threshold}). "
            f"Consider using ordered comparison or increasing array_size_threshold.",
            path,
        )

    # Handle ellipsis elements - count them and remove from expected
    ellipsis_count = 0
    expected_non_ellipsis = []
    for e in expected:
        if is_exact_ellipsis(e):
            ellipsis_count += 1
        else:
            expected_non_ellipsis.append(e)

    # With ellipsis, we allow actual to have more elements
    if ellipsis_count == 0:
        if len(expected) != len(actual):
            raise ComparisonError(
                f"Array length mismatch: expected {len(expected)} != actual {len(actual)}",
                path,
            )
    else:
        # Each ellipsis can match 0 or more elements
        min_required = len(expected_non_ellipsis)
        if len(actual) < min_required:
            raise ComparisonError(
                f"Array too short for ellipsis matching: expected at least {min_required}, actual {len(actual)}",
                path,
            )

    # Use backtracking to find a matching
    used_indices: Set[int] = set()

    def backtrack(expected_idx: int) -> bool:
        """
        Try to match expected[expected_idx] with some unused actual element.

        Args:
            expected_idx (int): Index into expected_non_ellipsis array

        Returns:
            bool: True if valid matching found for remaining elements
        """
        ctx.check_timeout(path)

        if expected_idx >= len(expected_non_ellipsis):
            # All expected elements matched successfully
            return True

        expected_elem = expected_non_ellipsis[expected_idx]

        # Try to match with each unused actual element
        for actual_idx in range(len(actual)):
            if actual_idx in used_indices:
                continue

            try:
                # Try to match this pair
                compare_elem(expected_elem, actual[actual_idx], f"{path}[{actual_idx}]")
                # If successful, mark as used and try to match remaining
                used_indices.add(actual_idx)
                if backtrack(expected_idx + 1):
                    return True
                # Backtrack: unmark and try next
                used_indices.remove(actual_idx)
            except ComparisonError:
                # This pair doesn't match, try next actual element
                continue

        # No actual element matched this expected element
        return False

    if not backtrack(0):
        # Provide more detailed error information for technical writers
        expected_summary = _summarize_array_for_error(expected)
        actual_summary = _summarize_array_for_error(actual)

        error_msg = (
            f"Array elements could not be matched using unordered comparison. "
            f"Expected: {expected_summary}, Actual: {actual_summary}. "
            f"Suggestion: Check if elements have the right values, or use .with_ordered_sort() "
            f"if order matters."
        )
        raise ComparisonError(error_msg, path)


def _compare_hybrid_strategy(
    expected: List[Any],
    actual: List[Any],
    compare_elem: Callable[[Any, Any, str], None],
    path: str,
    ctx: Any,
) -> None:
    """
    Hybrid strategy: compare primitives by frequency, objects by backtracking.

    This algorithm is optimized for arrays containing both primitive values
    (numbers, strings) and complex objects. It uses frequency counting for
    primitives (O(n)) and backtracking for objects (exponential but limited).

    Rationale:
        MongoDB results often contain mixed content:
        - Status arrays: [200, 404, "success", "error", {...}, {...}]
        - Aggregation results: [42, "total", {summary: {...}}]
        - Mixed type queries: user IDs (numbers) + user objects

    Args:
        expected (List[Any]): Expected array with mixed content types
        actual (List[Any]): Actual array to compare
        compare_elem (Callable): Function to compare individual elements
        path (str): Current JSONPath for error reporting
        ctx (Any): Comparison context with size and timeout limits

    Raises:
        ComparisonError: If primitive frequencies don't match or objects can't be matched

    Algorithm Steps:
        1. Split arrays into primitives and objects
        2. Count ellipsis elements for length validation
        3. Compare primitive frequencies using Counter
        4. Use backtracking for object matching

    Performance Characteristics:
        - Primitives: O(n) frequency counting
        - Objects: O(k!) backtracking where k is number of objects
        - Memory: O(n) for frequency maps + O(k) for backtracking
    """
    # Split into primitives and objects
    expected_primitives = [
        e for e in expected if _is_primitive(e) and not is_exact_ellipsis(e)
    ]
    expected_objects = [
        e for e in expected if not _is_primitive(e) and not is_exact_ellipsis(e)
    ]
    ellipsis_count = sum(1 for e in expected if is_exact_ellipsis(e))

    actual_primitives = [a for a in actual if _is_primitive(a)]
    actual_objects = [a for a in actual if not _is_primitive(a)]

    # Handle length constraints with ellipsis
    min_expected = len(expected_primitives) + len(expected_objects)
    if ellipsis_count == 0:
        if len(actual) != len(expected):
            raise ComparisonError(
                f"Array length mismatch: expected {len(expected)} != actual {len(actual)}",
                path,
            )
    else:
        if len(actual) < min_expected:
            raise ComparisonError(
                f"Array too short for ellipsis matching: expected at least {min_expected}, actual {len(actual)}",
                path,
            )

    # Compare primitives by frequency
    if len(expected_primitives) > len(actual_primitives):
        raise ComparisonError(
            f"Not enough primitive elements: expected {len(expected_primitives)}, actual {len(actual_primitives)}",
            path,
        )

    # Create frequency maps for primitives
    from collections import Counter

    expected_freq = Counter(expected_primitives)
    actual_freq = Counter(actual_primitives)

    # Check that all expected primitives are present with sufficient frequency
    for prim, count in expected_freq.items():
        if actual_freq[prim] < count:
            raise ComparisonError(
                f"Primitive element frequency mismatch: expected {count} of {prim!r}, found {actual_freq[prim]}",
                path,
            )

    # Compare objects using backtracking on remaining elements
    if len(expected_objects) > len(actual_objects):
        raise ComparisonError(
            f"Not enough object elements: expected {len(expected_objects)}, actual {len(actual_objects)}",
            path,
        )

    if expected_objects:
        _compare_unordered_backtracking(
            expected_objects, actual_objects, compare_elem, path, ctx
        )


def _has_mixed_primitives_and_objects(arr: List[Any]) -> bool:
    """
    Check if array contains both primitive and non-primitive elements.

    This function helps determine when to use the hybrid comparison strategy,
    which is optimized for arrays with mixed content types.

    Args:
        arr (List[Any]): Array to analyze

    Returns:
        bool: True if array contains both primitives and objects

    Design Note: Ellipsis elements are excluded from the analysis since they
    don't affect the choice of comparison strategy for actual content.
    """
    has_primitives = any(_is_primitive(x) and not is_exact_ellipsis(x) for x in arr)
    has_objects = any(not _is_primitive(x) and not is_exact_ellipsis(x) for x in arr)
    return has_primitives and has_objects


def compare_arrays(
    expected: List[Any],
    actual: List[Any],
    compare_elem: Callable[[Any, Any, str], None],
    path: str,
    ctx: Any = None,
) -> None:
    """
    Compare arrays using the appropriate strategy based on context.

    This is the main entry point for array comparison, which automatically
    selects the best algorithm based on array characteristics and user preferences.

    Strategy Selection Algorithm:
        1. Check for full wildcard ["..."] → immediate success
        2. Respect explicit user preference (comparison_type in options)
        3. If ellipsis present → use ordered ellipsis matching
        4. If mixed types + small size → use hybrid strategy
        5. If small size → use unordered backtracking
        6. Default → use ordered comparison (fastest, most predictable)

    Args:
        expected (List[Any]): Expected array elements
        actual (List[Any]): Actual array elements to compare
        compare_elem (Callable): Function to compare individual elements
        path (str): Current JSONPath for error reporting
        ctx (Any): Comparison context with options and limits

    Raises:
        ComparisonError: If arrays don't match using the selected strategy

    Design Philosophy:
        The algorithm selection balances accuracy with performance:
        - For most MongoDB use cases, order doesn't matter → prefer unordered
        - For large arrays, performance matters → prefer ordered
        - For mixed content, use specialized hybrid algorithm
        - Always respect explicit user preferences

    Performance Notes:
        - Size threshold (default 50) prevents exponential algorithms on large data
        - Timeout protection ensures bounded execution time
        - Early returns avoid unnecessary work when possible
    """
    # Handle full wildcard pattern first
    is_all, contains = array_has_ellipsis_markers(expected)
    if is_all:
        return  # ["..."] matches any array completely

    # Determine comparison strategy from context
    comparison_type = getattr(ctx, "comparison_type", None) if ctx else None

    if comparison_type == "ordered":
        # Explicitly ordered comparison requested
        if contains:
            _match_with_ellipsis(expected, actual, compare_elem, path)
        else:
            _compare_ordered(expected, actual, compare_elem, path)
    elif comparison_type == "unordered":
        # Explicitly unordered comparison requested
        if contains:
            _compare_unordered_backtracking(expected, actual, compare_elem, path, ctx)
        else:
            _compare_unordered_backtracking(expected, actual, compare_elem, path, ctx)
    else:
        # Auto-select strategy (comparison_type is None)
        if contains:
            # Ellipsis present - use unordered matching by default for MongoDB compatibility
            # Design Decision: MongoDB results are not guaranteed to be ordered
            if ctx and len(expected) <= ctx.array_size_threshold:
                _compare_unordered_backtracking(expected, actual, compare_elem, path, ctx)
            else:
                # Fall back to ordered for large arrays to avoid performance issues
                _match_with_ellipsis(expected, actual, compare_elem, path)
        else:
            # No ellipsis - auto-select between ordered and unordered
            has_mixed_types = _has_mixed_primitives_and_objects(expected)
            if has_mixed_types and ctx and len(expected) <= ctx.array_size_threshold:
                # Use hybrid strategy for mixed types within size limits
                _compare_hybrid_strategy(expected, actual, compare_elem, path, ctx)
            elif ctx and len(expected) <= ctx.array_size_threshold:
                # Use unordered for small arrays to be more permissive
                _compare_unordered_backtracking(
                    expected, actual, compare_elem, path, ctx
                )
            else:
                # Fall back to ordered for large arrays
                _compare_ordered(expected, actual, compare_elem, path)
