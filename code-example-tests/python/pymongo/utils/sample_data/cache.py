"""
Thread-Safe Caching System for Sample Data Availability Checks

This module provides a high-performance, thread-safe caching layer for sample
database availability checks. The cache reduces redundant MongoDB connection
attempts and database queries during test execution, significantly improving
test suite performance in environments with many sample data dependent tests.

Caching Strategy:
    The cache operates on the principle that sample database availability is
    relatively stable during a test run. Once we determine that a database
    is available (or unavailable), that result is unlikely to change within
    the same test session.

Thread Safety Design:
    All cache operations use fine-grained locking to ensure thread safety
    in parallel test execution environments. Separate locks are used for
    cache data and summary display to minimize contention.

Performance Characteristics:
    - Cache lookups: O(1) hash table access with minimal locking overhead
    - Memory usage: Bounded by number of unique database/collection combinations
    - Lock contention: Minimized through separate locks for different operations
    - Cache invalidation: Manual clearing between test sessions

Key Design Decisions:
    1. Global singleton pattern for shared state across test modules
    2. String-based keys for predictable serialization and comparison
    3. None return values to distinguish cache miss from False availability
    4. Summary display tracking to avoid duplicate informational output
    5. Collection sorting in keys for deterministic cache behavior

Maintainer Notes:
    The cache is designed to be transparent to callers - all complexity is
    hidden behind simple get/set operations. When modifying:
    1. Preserve thread safety guarantees
    2. Maintain O(1) access performance
    3. Consider memory usage impact of key format changes
    4. Test with parallel execution to verify lock behavior
"""

import threading
from typing import Optional, Any, List


class SampleDataCache:
    """
    High-performance, thread-safe cache for sample database availability results.

    This cache significantly improves test suite performance by avoiding repeated
    MongoDB connection attempts and database queries. It's designed for use in
    multi-threaded test environments where multiple test cases may check the
    same sample databases simultaneously.

    Attributes:
        _cache (dict): Thread-safe storage for availability results
        _lock (threading.Lock): Protects cache data during concurrent access
        _summary_shown (bool): Tracks whether informational summary has been displayed
        _summary_lock (threading.Lock): Protects summary display state

    Design Principles:
        1. Thread Safety: All public methods are thread-safe for parallel test execution
        2. Performance: O(1) cache access with minimal locking overhead
        3. Abstraction: Simple get/set interface hides complexity from callers
        4. Reliability: Graceful error handling prevents cache issues from breaking tests

    Cache Key Strategy:
        Keys are deterministic strings based on database name and sorted collection
        lists. This ensures consistent cache behavior regardless of the order in
        which collections are specified by different test cases.
    """

    def __init__(self):
        """Initialize cache with thread-safe storage and locking mechanisms."""
        self._cache = {}
        self._lock = threading.Lock()
        self._summary_shown = False
        self._summary_lock = threading.Lock()

    def get(self, key: str) -> Optional[Any]:
        """
        Retrieve a cached availability result with thread-safe access.

        Args:
            key (str): Cache key identifying the database/collection combination

        Returns:
            Any | None: Cached availability result, or None if not found

        Design Decision: Returns None for cache misses rather than raising
        exceptions. This allows callers to easily distinguish between
        "not cached" and "cached as unavailable" states.

        Thread Safety: Uses lock to ensure consistent reads during concurrent
        cache modifications by other threads.
        """
        with self._lock:
            return self._cache.get(key)

    def set(self, key: str, value: Any) -> None:
        """
        Store an availability result in the cache with thread-safe access.

        Args:
            key (str): Cache key identifying the database/collection combination
            value (Any): Availability result to cache (typically boolean)

        Design Decision: Accepts Any type for values to support future
        extensions (e.g., caching metadata along with availability status).

        Thread Safety: Uses lock to ensure atomic updates during concurrent
        access from multiple test threads.
        """
        with self._lock:
            self._cache[key] = value

    def clear(self) -> None:
        """
        Clear all cached data and reset summary display state.

        This method is typically called between test sessions to ensure
        fresh availability checks. It clears both the availability cache
        and the summary display tracking to allow informational output
        in the new session.

        Thread Safety: Uses both locks to ensure atomic clearing of all
        cached state, preventing race conditions during concurrent access.
        """
        with self._lock:
            self._cache.clear()
        with self._summary_lock:
            self._summary_shown = False

    def has_key(self, key: str) -> bool:
        """
        Check if a key exists in the cache without retrieving the value.

        Args:
            key (str): Cache key to check for existence

        Returns:
            bool: True if key exists in cache, False otherwise

        Use Cases: Useful for debugging or when you need to distinguish
        between "key not found" and "key exists with None value".
        """
        with self._lock:
            return key in self._cache

    def ensure_summary_shown_once(self, show_summary_func) -> None:
        """
        Display informational summary exactly once per test session.

        This method ensures that helpful information about sample data
        availability is shown to users exactly once, regardless of how
        many tests check for sample data availability.

        Args:
            show_summary_func (callable): Function to call for displaying summary

        Design Rationale: Test output can become cluttered if every test
        method displays availability information. This mechanism ensures
        users see the information once at the start of the test run.

        Error Handling: Summary display errors are caught and silently
        handled to prevent informational output from breaking test execution.

        Thread Safety: Uses separate lock to avoid blocking cache operations
        during potentially slow summary generation.
        """
        with self._summary_lock:
            if not self._summary_shown:
                try:
                    show_summary_func()
                except Exception:
                    # Silently handle errors in summary generation to avoid breaking tests
                    # Summary display is informational only and shouldn't affect test results
                    pass
                finally:
                    self._summary_shown = True

    def make_cache_key(
        self, database_name: str, collections: Optional[List[str]] = None
    ) -> str:
        """
        Generate a deterministic cache key for database and collection combinations.

        Args:
            database_name (str): Name of the sample database
            collections (Optional[List[str]]): List of collection names, if any

        Returns:
            str: Deterministic cache key for the database/collection combination

        Key Format Design:
            - Database only: "sample_mflix"
            - Database + collections: "sample_mflix:collection1,collection2"
            - Collections are sorted alphabetically for deterministic keys

        Deterministic Behavior:
            The same database/collection combination always produces the same
            key, regardless of the order collections are specified. This ensures
            cache hits work correctly when different test methods specify the
            same requirements in different orders.

        Example Keys:
            make_cache_key("sample_mflix") -> "sample_mflix"
            make_cache_key("sample_mflix", ["theaters", "movies"]) -> "sample_mflix:movies,theaters"
            make_cache_key("sample_mflix", ["movies", "theaters"]) -> "sample_mflix:movies,theaters"

        Design Decision: Use colon as separator since it's not valid in MongoDB
        database or collection names, ensuring no ambiguity in key parsing.
        """
        if collections is not None:
            # Sort collections for consistent cache keys regardless of input order
            sorted_collections = sorted(collections)
            return f"{database_name}:{','.join(sorted_collections)}"
        return database_name


# Global cache instance - shared across all sample data checking operations
# Design Decision: Use module-level singleton to ensure all parts of the test
# suite benefit from the same cache, avoiding redundant availability checks
_cache = SampleDataCache()


def get_cache() -> SampleDataCache:
    """
    Get the global cache instance for sample data availability results.

    Returns:
        SampleDataCache: The shared cache instance used throughout the test suite

    Design Pattern: This function provides access to the global cache singleton
    while maintaining the flexibility to potentially support multiple cache
    instances in the future if needed.

    Usage: Called by SampleDataChecker and other components that need to
    cache availability results or coordinate summary display.
    """
    return _cache
