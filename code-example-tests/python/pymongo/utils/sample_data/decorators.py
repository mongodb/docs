"""
Test Decorators for MongoDB Sample Data Integration

This module provides unittest integration decorators that automatically handle
sample data availability checking and test skipping. The decorators are designed
to make it easy for test authors to specify sample data requirements declaratively
without manually writing availability checks in each test method.

Decorator Design Philosophy:
    1. Declarative Requirements: Test dependencies are clear from the decorator syntax
    2. Automatic Skipping: Tests skip gracefully when requirements aren't met
    3. Flexible Configuration: Support both simple and complex sample data requirements
    4. Performance Optimization: Leverage caching to avoid repeated database checks
    5. Informative Messages: Provide clear skip messages for debugging

Integration Patterns:
    The decorators support two primary integration patterns:

    1. Function Decorators: Applied to individual test methods
       - Clean syntax for method-level requirements
       - Easy to see dependencies at point of use
       - Compatible with all unittest features

    2. Mixin Classes: Inherited by test classes
       - Provides instance methods for conditional checks
       - Useful for complex test setup scenarios
       - Allows runtime decision making about sample data needs

Error Handling Strategy:
    All sample data failures result in test skips rather than test failures.
    This ensures that missing sample data doesn't break the test suite in
    environments where sample databases aren't loaded (e.g., CI, developer laptops).

Maintainer Notes:
    When extending the decorator functionality:
    1. Preserve the declarative syntax for ease of use
    2. Ensure skips provide helpful messages for troubleshooting
    3. Maintain compatibility with existing unittest patterns
    4. Consider performance impact of additional database checks
"""

import functools
from typing import List, Optional, Dict, Union
from .checker import SampleDataChecker


def requires_sample_data(
    database_or_databases: Union[str, List[str]],
    collections: Optional[List[str]] = None,
    collections_per_database: Optional[Dict[str, List[str]]] = None,
):
    """
    Decorator to automatically skip tests when required sample databases are unavailable.

    This decorator provides a clean, declarative way to specify sample data requirements
    for individual test methods. Tests are automatically skipped with informative messages
    when the required databases or collections are not found.

    Args:
        database_or_databases (Union[str, List[str]]): Single database name or list of names
        collections (Optional[List[str]]): Required collections for single database scenario
        collections_per_database (Optional[Dict[str, List[str]]]): Per-database collection requirements

    Returns:
        Callable: Decorated test function that will skip if sample data unavailable

    Design Decision: The decorator supports both simple and complex requirements:
    - Simple: Single database, optionally with specific collections
    - Complex: Multiple databases with per-database collection requirements

    This flexibility handles common MongoDB testing scenarios from basic queries
    to complex aggregations that span multiple sample databases.

    Usage Examples:
        # Basic database requirement
        @requires_sample_data("sample_mflix")
        def test_movie_queries(self):
            pass

        # Database with specific collections
        @requires_sample_data("sample_mflix", collections=["movies", "theaters"])
        def test_movie_theater_joins(self):
            pass

        # Multiple databases
        @requires_sample_data(["sample_mflix", "sample_restaurants"])
        def test_cross_database_aggregation(self):
            pass

        # Multiple databases with specific collections
        @requires_sample_data(
            ["sample_mflix", "sample_restaurants"],
            collections_per_database={
                "sample_mflix": ["movies", "theaters"],
                "sample_restaurants": ["restaurants", "neighborhoods"]
            }
        )
        def test_complex_multi_db_query(self):
            pass

    Error Handling:
        When sample data is unavailable, the test is skipped with a descriptive
        message indicating exactly what databases/collections were missing.
        This helps developers understand what they need to load to run the test.
    """

    def decorator(test_func):
        @functools.wraps(test_func)
        def wrapper(*args, **kwargs):
            # Handle both single database and multiple databases
            if isinstance(database_or_databases, str):
                # Single database scenario
                SampleDataChecker.ensure_sample_data_or_skip(
                    database_or_databases, collections
                )
            else:
                # Multiple databases scenario
                SampleDataChecker.ensure_multiple_sample_data_or_skip(
                    database_or_databases, collections_per_database
                )

            # If we reach here, all required sample data is available
            return test_func(*args, **kwargs)

        return wrapper

    return decorator


class RequiresSampleDataMixin:
    """
    Mixin class providing sample data validation methods for test classes.

    This mixin provides an alternative to decorators for test classes that need
    more complex or conditional sample data checking. It's particularly useful
    when sample data requirements can't be determined until test execution time
    or when the same test class needs different sample data for different test methods.

    Design Rationale:
        While decorators work well for static requirements, some testing scenarios
        need runtime flexibility:
        - Tests that conditionally require different sample databases
        - Test setup methods that need to check availability before proceeding
        - Complex test scenarios where sample data requirements vary by test parameters

    Integration Pattern:
        class TestAdvancedQueries(unittest.TestCase, RequiresSampleDataMixin):
            def setUp(self):
                # Conditional sample data checking based on test configuration
                if self.test_cross_database:
                    self.ensure_multiple_sample_data(["sample_mflix", "sample_restaurants"])
                else:
                    self.ensure_sample_data("sample_mflix")

            def test_complex_aggregation(self):
                # Sample data availability already validated in setUp()
                pass

    Thread Safety:
        All methods delegate to the thread-safe SampleDataChecker class, making
        this mixin safe for use in parallel test execution environments.

    Usage Examples:
        # Basic usage with inheritance
        class TestMovies(unittest.TestCase, RequiresSampleDataMixin):
            def test_movies(self):
                self.ensure_sample_data("sample_mflix")
                # Test implementation follows
                pass

        # Conditional requirements
        class TestConfigurableQueries(unittest.TestCase, RequiresSampleDataMixin):
            def test_query(self):
                required_db = self.get_required_database()  # Runtime decision
                self.ensure_sample_data(required_db)
                # Test implementation follows
                pass

        # Availability checking without skipping
        class TestOptionalFeatures(unittest.TestCase, RequiresSampleDataMixin):
            def test_with_fallback(self):
                if self.check_sample_data_available("sample_analytics"):
                    # Use advanced analytics features
                    pass
                else:
                    # Use basic features only
                    pass
    """

    def ensure_sample_data(
        self, database_name: str, collections: Optional[List[str]] = None
    ):
        """
        Ensure sample data is available or skip the current test.

        Args:
            database_name (str): Name of the sample database
            collections (Optional[List[str]]): List of required collections
        """
        SampleDataChecker.ensure_sample_data_or_skip(database_name, collections)

    def ensure_multiple_sample_data(
        self,
        databases: List[str],
        collections_per_database: Optional[Dict[str, List[str]]] = None,
    ):
        """
        Ensure multiple sample databases are available or skip the current test.

        Args:
            databases (List[str]): List of database names to check
            collections_per_database (Optional[Dict[str, List[str]]]): Collections per database
        """
        SampleDataChecker.ensure_multiple_sample_data_or_skip(
            databases, collections_per_database
        )

    def check_sample_data_available(
        self, database_name: str, collections: Optional[List[str]] = None
    ) -> bool:
        """
        Check if sample data is available without skipping.

        Args:
            database_name (str): Name of the sample database
            collections (Optional[List[str]]): List of required collections

        Returns:
            bool: True if sample data is available
        """
        return SampleDataChecker.check_sample_data_available(database_name, collections)

    def get_available_sample_databases(self) -> List[str]:
        """
        Get list of available sample databases.

        Returns:
            List[str]: List of available sample database names
        """
        return SampleDataChecker.get_available_sample_databases()
