"""
Data Normalization for MongoDB Type Comparison

This module handles the complex task of normalizing MongoDB data types and PyMongo
result objects into consistent Python representations suitable for comparison.
MongoDB's flexible type system and PyMongo's rich object model require careful
normalization to ensure reliable comparisons across different data sources.

Key Normalization Challenges:
    1. BSON Type Variations: ObjectId, Decimal128, Binary, UUID need string representation
    2. DateTime Handling: Multiple timezone and precision formats must be standardized
    3. PyMongo Results: InsertOneResult, UpdateResult, etc. contain internal state
    4. Numeric Flexibility: int32, int64, double, Decimal128 should compare by value
    5. Container Types: Lists, tuples, dicts need recursive normalization

Design Philosophy:
    The normalizer prioritizes semantic equivalence over exact type matching:
    - ObjectIds become strings for reproducible comparison
    - Timestamps use ISO format with millisecond precision
    - Numeric types are compared by mathematical value, not representation
    - Result objects expose only their essential comparative data
    - Container types are recursively normalized for deep comparison

Performance Considerations:
    - Class name checking avoids expensive isinstance() calls with BSON types
    - Regex compilation is minimized through module-level patterns
    - Recursive normalization is optimized for common MongoDB document structures
    - Decimal conversion is lazy and cached when possible

Maintainer Notes:
    When adding support for new BSON types or PyMongo result objects:
    1. Add class name detection in normalize_for_comparison()
    2. Extract only semantically important attributes
    3. Use string representation for reproducible comparison
    4. Add corresponding test cases for the new type

    Avoid isinstance() checks with BSON types as they may not be available
    in all environments. Use class name string comparison instead.
"""

from __future__ import annotations

import re
from datetime import datetime, timezone
from decimal import Decimal, InvalidOperation
from typing import Any

# Millisecond precision for ISO datetime normalization
# Design Decision: 3 digits (milliseconds) balances precision with readability
# MongoDB typically stores millisecond precision, and longer precision strings
# make test output harder to read and debug
ISO_FRACTIONAL_LEN = 3  # milliseconds

# Precompiled regex for ISO datetime detection
# Pattern matches MongoDB's common datetime output formats
datetime_regex = r"^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z$"


def _to_canonical_iso(date_str) -> str:
    """
    Convert datetime string to canonical ISO format with millisecond precision.

    MongoDB stores datetime values with varying precision (seconds vs milliseconds)
    and different timezone representations. This function normalizes all datetime
    strings to a consistent format for reliable comparison.

    Args:
        date_str (str): ISO datetime string with optional fractional seconds

    Returns:
        str: Normalized ISO string with exactly 3 fractional digits and 'Z' suffix

    Design Decision: Always use UTC timezone (Z suffix) and exactly 3 fractional
    digits to ensure consistent string comparison. This handles the common case
    where MongoDB operations return datetime values with inconsistent precision.

    Examples:
        "2021-12-18T15:55:00Z" -> "2021-12-18T15:55:00.000Z"
        "2021-12-18T15:55:00.123456Z" -> "2021-12-18T15:55:00.123Z"
    """
    # Parse datetime with or without fractional seconds
    if "." in date_str:
        dt = datetime.strptime(date_str, "%Y-%m-%dT%H:%M:%S.%fZ")
    else:
        dt = datetime.strptime(date_str, "%Y-%m-%dT%H:%M:%SZ")

    # Ensure UTC timezone is explicitly set
    dt = dt.replace(tzinfo=timezone.utc)

    # Format with consistent millisecond precision
    iso = dt.strftime("%Y-%m-%dT%H:%M:%S.%f")  # %f gives microseconds (6 digits)
    iso = iso[:-3]  # Truncate to milliseconds (3 digits)
    return iso + "Z"


def _maybe_parse_iso(date_str) -> str | None:
    """
    Attempt to parse and normalize an ISO datetime string.

    This function tries to normalize datetime strings while gracefully handling
    malformed input. It's designed to be permissive - if normalization fails,
    the original string is returned unchanged.

    Args:
        date_str (str): Potential ISO datetime string

    Returns:
        str: Normalized ISO string or original string if parsing fails

    Design Rationale: MongoDB output sometimes contains datetime-like strings
    that aren't actually valid ISO dates. Rather than failing comparison,
    we preserve the original string and let string comparison handle it.
    """
    if "Z" in date_str:
        try:
            # Add milliseconds if missing for consistent normalization
            pattern = r"(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2})Z"
            result = re.sub(pattern, r"\1.000Z", date_str)
            return _to_canonical_iso(result)
        except ValueError:
            # If parsing fails, return original string
            pass
    return date_str


def normalize_for_comparison(value: Any) -> Any:
    """
    Recursively normalize any value to a consistent representation for comparison.

    This is the main entry point for data normalization, handling all MongoDB
    types, PyMongo result objects, and standard Python types. The function
    applies transformations that preserve semantic meaning while ensuring
    consistent representation for reliable comparison.

    Args:
        value (Any): Value of any type to normalize

    Returns:
        Any: Normalized value suitable for comparison

    Normalization Rules:
        1. Ellipsis literals ("...") are preserved unchanged for wildcard matching
        2. PyMongo result objects are reduced to their essential comparative data
        3. BSON types (ObjectId, Decimal128, etc.) become string representations
        4. Datetime objects are normalized to ISO format with millisecond precision
        5. Numeric types preserve their values but gain flexible comparison
        6. Container types (list, dict) are recursively normalized
        7. Unknown types are preserved unchanged (permissive approach)

    Design Philosophy:
        The normalizer is intentionally permissive rather than strict. It's better
        to preserve unknown values and let comparison fail gracefully than to
        raise exceptions that prevent useful comparisons from completing.
    """
    # Preserve ellipsis literals for wildcard pattern matching
    if value == "...":
        return value

    # Handle PyMongo result objects by extracting essential comparative data
    # Design Decision: Use class name checking instead of isinstance() because
    # BSON types may not be available in all environments or installations
    if hasattr(value, "__class__") and value.__class__.__name__ == "InsertOneResult":
        return {
            "inserted_id": (
                str(value.inserted_id) if hasattr(value, "inserted_id") else "..."
            )
        }

    if hasattr(value, "__class__") and value.__class__.__name__ == "UpdateResult":
        return {
            "matched_count": getattr(value, "matched_count", 0),
            "modified_count": getattr(value, "modified_count", 0),
            "upserted_id": (
                str(getattr(value, "upserted_id", None))
                if getattr(value, "upserted_id", None)
                else None
            ),
        }

    if hasattr(value, "__class__") and value.__class__.__name__ == "DeleteResult":
        return {"deleted_count": getattr(value, "deleted_count", 0)}

    if hasattr(value, "__class__") and value.__class__.__name__ == "BulkWriteResult":
        # For bulk results, extract comprehensive summary for comparison
        # All count fields are included since bulk operations can affect multiple document types
        result = {}
        if hasattr(value, "inserted_count"):
            result["inserted_count"] = value.inserted_count
        if hasattr(value, "matched_count"):
            result["matched_count"] = value.matched_count
        if hasattr(value, "modified_count"):
            result["modified_count"] = value.modified_count
        if hasattr(value, "deleted_count"):
            result["deleted_count"] = value.deleted_count
        if hasattr(value, "upserted_count"):
            result["upserted_count"] = value.upserted_count
        return result

    # Handle BSON types - normalize to strings for consistent comparison
    # ObjectId comparison should be by string value, not object identity
    if hasattr(value, "__class__") and value.__class__.__name__ == "ObjectId":
        return str(value)

    # Decimal128 values become strings to handle precision consistently
    if hasattr(value, "__class__") and value.__class__.__name__ == "Decimal128":
        return str(value)

    # Binary data gets Extended JSON representation for structured comparison
    if hasattr(value, "__class__") and value.__class__.__name__ == "Binary":
        return {
            "$binary": {
                "base64": str(value),
                "subType": str(getattr(value, "subtype", 0)),
            }
        }

    # UUID values become strings for reproducible comparison
    if hasattr(value, "__class__") and value.__class__.__name__ == "UUID":
        return str(value)

    # Datetime objects: normalize to canonical ISO format
    # This handles timezone variations and precision differences
    if isinstance(value, datetime):
        if value.tzinfo is None:
            # Assume UTC for naive datetime objects
            iso_string = value.isoformat() + "Z"
        else:
            # Convert to UTC and format consistently
            iso_string = (
                value.astimezone(timezone.utc).isoformat().replace("+00:00", "Z")
            )
        return _to_canonical_iso(iso_string)

    # Strings: check for datetime patterns and normalize if found
    if isinstance(value, str):
        # Check for ISO date format and normalize if found
        # This catches datetime strings that weren't parsed as datetime objects
        if re.match(datetime_regex, value):
            return _maybe_parse_iso(value)

        # Check for datetime.datetime(...) pattern and parse if found
        # This handles expected values like 'datetime.datetime(2023, 1, 15, 10, 30, 0)'
        datetime_pattern = r'datetime\.datetime\((\d{4}),\s*(\d{1,2}),\s*(\d{1,2}),\s*(\d{1,2}),\s*(\d{1,2}),\s*(\d{1,2})(?:,\s*(\d+))?\)'
        match = re.match(datetime_pattern, value)
        if match:
            year, month, day, hour, minute, second = map(int, match.groups()[:6])
            microsecond = int(match.group(7)) if match.group(7) else 0
            dt = datetime(year, month, day, hour, minute, second, microsecond)
            # Convert to ISO format using the same normalization as datetime objects
            iso_string = dt.isoformat() + "Z"
            return _to_canonical_iso(iso_string)

    # Handle bytes objects with Extended JSON representation
    # Bytes are converted to UTF-8 strings with error handling for binary data
    if isinstance(value, bytes):
        return {"$bytes": value.decode("utf-8", errors="ignore")}

    # Numeric types: preserve values for flexible numeric comparison
    # These will be handled by the numbers_equal() function for cross-type comparison
    if isinstance(value, (int, float, Decimal)):
        return value

    # Container types: recursively normalize all contained values
    if isinstance(value, list):
        return [normalize_for_comparison(v) for v in value]

    # Tuples are converted to lists for consistent comparison
    # MongoDB doesn't distinguish between tuples and arrays in most contexts
    if isinstance(value, tuple):
        return [normalize_for_comparison(v) for v in value]

    if isinstance(value, dict):
        # Handle Extended JSON datetime format: {"$date": "2023-01-15T10:30:00.000Z"}
        if set(value.keys()) == {"$date"}:
            date_str = value["$date"]
            if date_str == "...":
                return "..."
            try:
                # Parse and normalize the datetime string
                dt = datetime.fromisoformat(date_str.replace("Z", "+00:00"))
                dt = dt.astimezone(timezone.utc)
                return dt.strftime("%Y-%m-%dT%H:%M:%S.%f")[:-3] + "Z"
            except Exception:
                return date_str

        # Handle other Extended JSON formats if needed (ObjectId, etc.)
        if set(value.keys()) == {"$oid"}:
            oid_str = value["$oid"]
            return "..." if oid_str == "..." else str(oid_str)

        # Recursively normalize all values for regular dictionaries
        return {k: normalize_for_comparison(v) for k, v in value.items()}

    # Fallback: return value unchanged for unknown types
    # This permissive approach allows comparison to proceed even with unexpected types
    return value


def numbers_equal(a: Any, b: Any) -> bool:
    """
    Compare two values for numeric equality with cross-type flexibility.

    MongoDB's numeric system includes int32, int64, double, and Decimal128 types
    that should compare equal when they represent the same mathematical value.
    This function provides flexible numeric comparison that handles these cases.

    Args:
        a (Any): First value to compare
        b (Any): Second value to compare

    Returns:
        bool: True if values are numerically equal, False otherwise

    Design Rationale:
        Standard Python comparison (a == b) is too strict for MongoDB data because:
        1. MongoDB may return different numeric types for the same logical value
        2. Floating point precision issues can cause spurious comparison failures
        3. String representations of numbers should compare equal to numeric values
        4. Decimal128 values need high-precision comparison

    Algorithm:
        1. Convert both values to Decimal for high-precision comparison
        2. Handle int, float, Decimal, and string representations
        3. Use Decimal arithmetic to avoid floating point precision issues
        4. Return False if either value cannot be converted to a number

    Examples:
        numbers_equal(42, 42.0) -> True
        numbers_equal("42", 42) -> True
        numbers_equal(Decimal("42.00"), 42) -> True
        numbers_equal("42.0", "42.00") -> True
        numbers_equal("not_a_number", 42) -> False
    """

    def to_decimal(x: Any) -> Decimal | None:
        """Convert value to Decimal for high-precision comparison."""
        if isinstance(x, Decimal):
            return x
        if isinstance(x, int):
            return Decimal(x)
        if isinstance(x, float):
            # Convert float to string first to avoid precision issues
            # e.g., Decimal(0.1) != Decimal("0.1") due to float representation
            return Decimal(str(x))
        if isinstance(x, str):
            try:
                return Decimal(x)
            except InvalidOperation:
                return None
        return None

    # Attempt to convert both values to Decimal
    decimal_a = to_decimal(a)
    decimal_b = to_decimal(b)

    # Only compare if both values are numeric
    if decimal_a is not None and decimal_b is not None:
        return decimal_a == decimal_b

    # If either value is not numeric, they're not equal
    return False
