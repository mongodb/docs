"""
Ellipsis Pattern Detection and Validation for MongoDB Document Comparison

This module provides utilities for detecting and validating ellipsis patterns used
in MongoDB code example testing. Ellipsis patterns allow flexible matching of
dynamic content like ObjectIds, timestamps, and optional fields.

Pattern Types Supported (per comparison-spec.md):
    1. Exact ellipsis: "..." matches any single value
    2. Truncated strings: "Error: Connection failed..." matches string prefixes
    3. Object ellipsis: {"...": "..."} matches any object structure
    4. Array ellipsis: ["..."] matches any array, [1, "...", 3] allows gaps

Design Philosophy:
    These functions are pure and stateless - they only detect patterns without
    performing the actual comparison logic. This separation allows the comparison
    engine to make informed decisions about which algorithms to use based on
    the presence and type of ellipsis patterns.

Performance Considerations:
    All functions are optimized for speed since they're called frequently during
    comparison. They use early returns and minimal object creation.

Maintainer Notes:
    When adding new ellipsis patterns, ensure they don't conflict with valid
    MongoDB data. For example, a field actually containing "..." as data should
    not trigger ellipsis behavior unless explicitly intended.
"""

from __future__ import annotations

from typing import Any, List, Tuple


def is_exact_ellipsis(value: Any) -> bool:
    """
    Check if a value is an exact ellipsis marker ("...").

    This is the most common ellipsis pattern, used to indicate that any value
    is acceptable at this location. Commonly used for dynamic fields like
    ObjectIds, timestamps, or auto-generated content.

    Args:
        value (Any): Value to check for exact ellipsis pattern

    Returns:
        bool: True if value is exactly the string "..."

    Design Decision: Only string type "..." is considered an ellipsis marker.
    This prevents accidental matching of numeric values or other types that
    might theoretically equal "..." in some contexts.

    Example:
        is_exact_ellipsis("...")      # True
        is_exact_ellipsis("foo...")   # False (use is_truncated_string)
        is_exact_ellipsis(None)       # False
        is_exact_ellipsis(123)        # False
    """
    return isinstance(value, str) and value == "..."


def is_truncated_string(value: Any) -> bool:
    """
    Check if a value is a truncated string ending with ellipsis.

    Truncated strings allow matching string prefixes, useful for error messages
    or dynamic content where the beginning is predictable but the end varies.

    Args:
        value (Any): Value to check for truncated string pattern

    Returns:
        bool: True if value is a string ending with "..." but not exactly "..."

    Design Decision: Excludes exact "..." to avoid overlap with is_exact_ellipsis().
    This ensures each pattern type has a distinct detection function.

    Example:
        is_truncated_string("Error: Connection failed...")  # True
        is_truncated_string("Processing...")                 # True
        is_truncated_string("...")                          # False (exact ellipsis)
        is_truncated_string("no ellipsis")                  # False
        is_truncated_string(123)                            # False
    """
    return isinstance(value, str) and value.endswith("...") and value != "..."


def is_object_ellipsis(obj: Any) -> bool:
    """
    Check if an object is an ellipsis marker for matching any object structure.

    Object ellipsis pattern {"...": "..."} indicates that any object is acceptable
    at this location, regardless of its properties or structure. This is useful
    for nested objects where only the fact that an object exists matters.

    Args:
        obj (Any): Object to check for ellipsis pattern

    Returns:
        bool: True if object has exactly one key "..." with value "..."

    Design Decision: Requires exactly one key to avoid ambiguity. An object with
    additional keys alongside "..." would be confusing and is not supported.

    Implementation Note: Uses set() for O(1) key comparison and .get() to avoid
    KeyError if the key doesn't exist.

    Example:
        is_object_ellipsis({"...": "..."})              # True
        is_object_ellipsis({"...": "...", "name": "x"}) # False (extra key)
        is_object_ellipsis({"...": "foo"})              # False (wrong value)
        is_object_ellipsis([])                          # False (not dict)
    """
    return (
        isinstance(obj, dict) and set(obj.keys()) == {"..."} and obj.get("...") == "..."
    )


def array_has_ellipsis_markers(arr: List[Any]) -> tuple[bool, bool]:
    """
    Analyze an array for ellipsis markers and return classification.

    This function determines how ellipsis patterns should be handled in array
    comparison by classifying the array into two categories:
    - Full wildcard: ["..."] matches any array completely
    - Partial ellipsis: Contains ellipsis elements that allow gaps or wildcards

    Args:
        arr (List[Any]): Array to analyze for ellipsis patterns

    Returns:
        tuple[bool, bool]: (is_all_wildcard, contains_ellipsis)
            - is_all_wildcard: True if array is exactly ["..."]
            - contains_ellipsis: True if array contains any ellipsis elements

    Design Decision: Returns a tuple rather than a class to maintain simplicity
    and avoid object allocation overhead in performance-critical comparison loops.

    Performance Note: Uses any() with generator expression for short-circuit
    evaluation - stops checking as soon as first ellipsis is found.

    Example:
        array_has_ellipsis_markers(["..."])           # (True, True)
        array_has_ellipsis_markers([1, "...", 3])     # (False, True)
        array_has_ellipsis_markers([1, 2, 3])         # (False, False)
        array_has_ellipsis_markers([])                # (False, False)
        array_has_ellipsis_markers("not_array")       # (False, False)
    """
    if not isinstance(arr, list):
        return False, False

    # Check for full wildcard pattern: exactly one element that is "..."
    is_all = len(arr) == 1 and is_exact_ellipsis(arr[0])

    # Check if any element is an ellipsis marker
    # Note: We re-check the single element case for consistency, but the
    # performance impact is negligible and it keeps the logic clear
    contains = any(is_exact_ellipsis(x) for x in arr)

    return is_all, contains
