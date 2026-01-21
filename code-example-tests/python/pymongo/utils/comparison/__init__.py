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
    - expect.py: API for specifying comparison options and running comparisons
    - comparison.py: Core comparison engine with algorithm selection
    - content_analyzer.py: Detects structured content and selects comparison strategy
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
    - Content type
    - Ellipsis presence (affects matching strategy)
    - User preferences (Expect methods can specify optional behavior)

Example Usage:
    # Basic comparison (arrays and ellipsis patterns unordered by default for MongoDB compatibility)
    # Automatic content detection selects the best comparison strategy
    Expect.that(actual_result).should_match("expected.txt")
    Expect.that(actual_document).should_match({"name": "test", "_id": "..."})

    # Ellipsis patterns work with unordered arrays (perfect for MongoDB results)
    Expect.that(mongodb_results).should_match([{"name": "Alice"}, "...", {"name": "Bob"}])

    # Ignore volatile fields
    Expect.that(actual_result).with_ignored_fields("_id", "timestamp").should_match("expected.txt")

    # Require exact array order (only when needed)
    Expect.that(actual_array).with_ordered_sort().should_match(expected_array)

Threading and Performance:
    - All functions are thread-safe
    - Parsing results are not cached (content varies too much)
    - Timeout protection prevents infinite loops in complex comparisons
    - Memory usage is bounded by recursion depth limits
"""

from .expect import Expect
from .content_analyzer import ContentAnalyzer

# Core comparison components (for advanced usage)
from .comparison import (
    ComparisonOptions,
    ComparisonResult,
    SchemaDefinition,
    ConfigurationError,
)
from .errors import ComparisonError

__all__ = [
    # High-level API
    "Expect",
    "ContentAnalyzer",
    # Core components
    "ComparisonOptions",
    "ComparisonResult",
    "ComparisonError",
    # Schema validation
    "SchemaDefinition",
    "ConfigurationError",
]
