"""
Specialized Exception Classes for MongoDB Document Comparison

This module defines exception classes that provide enhanced error reporting for
document comparison failures, including path context for precise error location.

Design Philosophy:
    Traditional assertion errors only show that a comparison failed, but not WHERE
    in a complex nested structure the failure occurred. These exception classes
    solve this by tracking the JSON path to the exact location of the mismatch.

Path Format:
    Uses JSONPath-like notation for consistency with debugging tools:
    - "$" for root
    - "$.field" for object properties
    - "$[0]" for array elements
    - "$.users[2].profile.email" for nested paths

Error Message Strategy:
    The error message is designed to be immediately actionable for technical writers:
    1. Clear description of what went wrong
    2. Exact path to the problematic element
    3. Expected vs actual values when relevant
    4. Suggestions for common fixes when possible
"""


class ComparisonError(AssertionError):
    """
    Represents a comparison failure with optional path context.

    This exception is raised when document comparison fails and provides
    enhanced error reporting including the exact location of the mismatch
    within nested data structures.

    Design Decision: Inherits from AssertionError to maintain compatibility
    with unittest framework while adding path context functionality.

    Attributes:
        path (str): JSONPath-style location of the mismatch (defaults to "$" for root)

    Example:
        try:
            compare_documents(expected, actual)
        except ComparisonError as e:
            print(f"Comparison failed at {e.path}: {e}")
            # Output: "Comparison failed at $.users[0].email: Expected 'user@example.com' but got 'admin@example.com' (at $.users[0].email)"
    """

    def __init__(self, message: str, path: str | None = None):
        """
        Initialize a comparison error with message and optional path.

        Args:
            message (str): Human-readable description of the comparison failure
            path (str | None): JSONPath-style location of the mismatch.
                              Defaults to "$" (root) if not provided.

        Design Note: The path is always included in the error message even if
        it's just "$" to maintain consistent error message format across
        all comparison failures.
        """
        self.path = path or "$"
        super().__init__(f"{message} (at {self.path})")
