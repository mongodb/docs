"""
MongoDB Sample Data Utility for PyMongo Code Example Tests

This package provides utilities for checking MongoDB sample database availability
and conditionally skipping tests when required sample data is missing.

Core functionality:
- Sample database availability checking
- Thread-safe caching of results
- Test decorators for unittest integration
- Graceful error handling and test skipping

Usage:
    from utils.sample_data import requires_sample_data, ensure_sample_data_or_skip

    @requires_sample_data("sample_mflix")
    def test_movie_queries(self):
        # Test implementation
        pass

    def test_manual_check(self):
        ensure_sample_data_or_skip("sample_mflix", ["movies", "theaters"])
        # Test implementation
        pass
"""

from .checker import SampleDataChecker
from .decorators import requires_sample_data, RequiresSampleDataMixin
from .registry import SAMPLE_DATABASES


# Convenience functions for direct import
def check_sample_data_available(database_name, required_collections=None):
    """Check if a sample database and its collections are available."""
    return SampleDataChecker.check_sample_data_available(
        database_name, required_collections
    )


def check_multiple_sample_databases(databases, collections_per_database=None):
    """Check multiple sample databases for availability."""
    return SampleDataChecker.check_multiple_sample_databases(
        databases, collections_per_database
    )


def get_available_sample_databases():
    """Get list of available sample databases."""
    return SampleDataChecker.get_available_sample_databases()


def clear_sample_data_cache():
    """Clear the sample data availability cache."""
    return SampleDataChecker.clear_sample_data_cache()


def ensure_sample_data_or_skip(database_name, collections=None):
    """Ensure sample data is available or skip the current test."""
    return SampleDataChecker.ensure_sample_data_or_skip(database_name, collections)


def ensure_multiple_sample_data_or_skip(databases, collections_per_database=None):
    """Ensure multiple sample databases are available or skip the current test."""
    return SampleDataChecker.ensure_multiple_sample_data_or_skip(
        databases, collections_per_database
    )


__all__ = [
    "SampleDataChecker",
    "requires_sample_data",
    "RequiresSampleDataMixin",
    "SAMPLE_DATABASES",
    "check_sample_data_available",
    "check_multiple_sample_databases",
    "get_available_sample_databases",
    "clear_sample_data_cache",
    "ensure_sample_data_or_skip",
    "ensure_multiple_sample_data_or_skip",
]
