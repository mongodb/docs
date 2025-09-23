"""
MongoDB PyMongo Code Example Test Utilities

This package provides comprehensive utilities for testing MongoDB PyMongo code examples,
including output comparison, sample data management, and test helpers.

Design Philosophy:
    The utilities are designed to support technical writers creating MongoDB documentation
    by providing robust, maintainable tools for validating code example outputs. The
    architecture prioritizes:

    1. Ease of use for non-technical writers
    2. Robust ellipsis pattern matching for flexible output validation
    3. Thread-safe sample data checking with intelligent caching
    4. Comprehensive error reporting with actionable feedback

Architecture Overview:
    - comparison/: Advanced document comparison engine with MongoDB type support
    - sample_data/: Thread-safe sample database availability checking
    - test_helper.py: Legacy utility functions (maintained for compatibility)

Key Design Decisions:
    - All utilities are designed to fail gracefully and provide helpful error messages
    - Caching is used extensively to improve performance in test suites
    - The comparison engine prioritizes semantic accuracy over strict syntactic matching
    - Sample data checking uses short timeouts to avoid blocking test execution

Example Usage:
    from utils.comparison import assert_expected_file_matches_output, ComparisonOptions
    from utils.sample_data import requires_sample_data

    @requires_sample_data("sample_mflix")
    def test_movie_query(self):
        # Your test code here
        actual_result = collection.find_one({"title": "The Matrix"})
        assert_expected_file_matches_output(self, "expected_output.txt", actual_result)
"""
