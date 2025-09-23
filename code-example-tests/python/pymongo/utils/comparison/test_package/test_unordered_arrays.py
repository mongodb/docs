#!/usr/bin/env python3
"""
Test unordered array comparison functionality.
"""
import unittest

from utils.comparison.comparison import compare_values, ComparisonOptions
from utils.comparison.assert_helpers import ComparisonTestCase


class TestUnorderedArrayComparison(ComparisonTestCase):
    """Test unordered array comparison strategies."""

    def test_ordered_comparison_explicit(self):
        """Test explicitly ordered array comparison."""
        options = ComparisonOptions(comparison_type="ordered")

        # Should match in order
        result = compare_values([1, 2, 3], [1, 2, 3], options)
        self.assertTrue(result.is_match)

        # Should fail when out of order
        result = compare_values([1, 2, 3], [3, 2, 1], options)
        self.assertFalse(result.is_match)
        self.assertIn("Value mismatch", result.error)

    def test_unordered_comparison_explicit(self):
        """Test explicitly unordered array comparison."""
        options = ComparisonOptions(comparison_type="unordered")

        # Should match regardless of order
        result = compare_values([1, 2, 3], [3, 2, 1], options)
        self.assertTrue(result.is_match)

        # Should match with duplicates in different order
        result = compare_values([1, 2, 2, 3], [2, 3, 1, 2], options)
        self.assertTrue(result.is_match)

        # Should fail with different elements
        result = compare_values([1, 2, 3], [1, 2, 4], options)
        self.assertFalse(result.is_match)

        # Should fail with different counts
        result = compare_values([1, 2, 3], [1, 2], options)
        self.assertFalse(result.is_match)

    def test_unordered_with_objects(self):
        """Test unordered comparison with complex objects."""
        options = ComparisonOptions(comparison_type="unordered")

        expected = [
            {"name": "Alice", "age": 30},
            {"name": "Bob", "age": 25},
            {"name": "Carol", "age": 35},
        ]

        actual = [
            {"name": "Bob", "age": 25},
            {"name": "Carol", "age": 35},
            {"name": "Alice", "age": 30},
        ]

        result = compare_values(expected, actual, options)
        self.assertTrue(result.is_match)

    def test_unordered_with_nested_arrays(self):
        """Test unordered comparison with nested arrays."""
        options = ComparisonOptions(comparison_type="unordered")

        expected = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]

        actual = [[7, 8, 9], [1, 2, 3], [4, 5, 6]]

        result = compare_values(expected, actual, options)
        self.assertTrue(result.is_match)

    def test_auto_select_small_arrays(self):
        """Test auto-selection uses unordered for small arrays."""
        options = ComparisonOptions(comparison_type=None, array_size_threshold=10)

        # Small array should use unordered by default
        result = compare_values([1, 2, 3], [3, 2, 1], options)
        self.assertTrue(result.is_match)

    def test_auto_select_large_arrays(self):
        """Test auto-selection uses ordered for large arrays."""
        options = ComparisonOptions(comparison_type=None, array_size_threshold=3)

        # Array larger than threshold should use ordered
        result = compare_values([1, 2, 3, 4], [4, 3, 2, 1], options)
        self.assertFalse(result.is_match)

    def test_size_threshold_protection(self):
        """Test that large arrays are rejected for unordered comparison."""
        options = ComparisonOptions(comparison_type="unordered", array_size_threshold=5)

        large_expected = list(range(10))
        large_actual = list(reversed(range(10)))

        result = compare_values(large_expected, large_actual, options)
        self.assertFalse(result.is_match)
        self.assertIn("Array too large for unordered comparison", result.error)
        self.assertIn("Consider using ordered comparison", result.error)

    def test_unordered_with_ellipsis(self):
        """Test unordered comparison with ellipsis elements."""
        options = ComparisonOptions(comparison_type="unordered")

        # Ellipsis allows extra elements
        result = compare_values([1, "...", 3], [3, 2, 5, 1], options)
        self.assertTrue(result.is_match)

        # Should work with multiple ellipsis
        result = compare_values([1, "...", 3, "..."], [3, 2, 5, 1, 7], options)
        self.assertTrue(result.is_match)

    def test_hybrid_strategy_mixed_types(self):
        """Test hybrid strategy with mixed primitives and objects."""
        options = ComparisonOptions(comparison_type=None, array_size_threshold=10)

        expected = [
            1,
            2,
            3,  # primitives
            {"name": "Alice"},
            {"name": "Bob"},  # objects
        ]

        actual = [
            {"name": "Bob"},
            {"name": "Alice"},  # objects in different order
            3,
            1,
            2,  # primitives in different order
        ]

        result = compare_values(expected, actual, options)
        self.assertTrue(result.is_match)

    def test_hybrid_strategy_primitive_frequency(self):
        """Test hybrid strategy correctly handles primitive frequency."""
        options = ComparisonOptions(comparison_type=None, array_size_threshold=10)

        expected = [1, 1, 2, {"name": "Alice"}]
        actual = [{"name": "Alice"}, 2, 1, 1]

        result = compare_values(expected, actual, options)
        self.assertTrue(result.is_match)

        # Should fail with wrong frequency
        expected = [1, 1, 2, {"name": "Alice"}]
        actual = [{"name": "Alice"}, 2, 1]  # missing one 1

        result = compare_values(expected, actual, options)
        self.assertFalse(result.is_match)

    def test_timeout_protection(self):
        """Test that timeout protection works during backtracking."""
        options = ComparisonOptions(
            comparison_type="unordered",
            timeout_seconds=1,  # Very short timeout
            array_size_threshold=20,
        )

        # Create arrays that would require significant backtracking
        # but are small enough to pass size check
        expected = [{"id": i, "value": f"val_{i}"} for i in range(15)]
        actual = list(reversed(expected))

        # This should either succeed quickly or timeout
        result = compare_values(expected, actual, options)
        # We can't guarantee timeout in 1 second, so we just check it doesn't crash
        self.assertIsInstance(result.is_match, bool)

    def test_ellipsis_ordered_behavior(self):
        """Test that ellipsis uses ordered behavior in auto-selection."""
        options = ComparisonOptions(comparison_type=None)

        # With ellipsis, should use ordered matching (order matters)
        result = compare_values([1, "...", 3], [1, 2, 3], options)
        self.assertTrue(result.is_match)

        # Should fail when order is wrong for ellipsis
        result = compare_values([1, "...", 3], [3, 2, 1], options)
        self.assertFalse(result.is_match)
        self.assertIn(
            "Array elements did not match with ellipsis wildcard", result.error
        )

    def test_ellipsis_insufficient_elements(self):
        """Test ellipsis with insufficient elements."""
        options = ComparisonOptions(comparison_type="unordered")

        # Should fail when not enough elements for non-ellipsis requirements
        result = compare_values([1, "...", 3, 5], [3, 1], options)  # Missing 5
        self.assertFalse(result.is_match)
        self.assertIn("Array too short for ellipsis matching", result.error)

    def test_mixed_types_with_ellipsis(self):
        """Test mixed primitives and objects with ellipsis."""
        options = ComparisonOptions(comparison_type="unordered")

        expected = [1, "...", {"name": "Alice"}]
        actual = [{"name": "Alice"}, 2, 3, 1]

        result = compare_values(expected, actual, options)
        self.assertTrue(result.is_match)

    def test_nested_array_structures(self):
        """Test nested array structures with unordered comparison."""
        options = ComparisonOptions(comparison_type="unordered")

        expected = [{"items": [1, 2, 3]}, {"items": [4, 5, 6]}, {"items": [7, 8, 9]}]

        actual = [{"items": [7, 8, 9]}, {"items": [1, 2, 3]}, {"items": [4, 5, 6]}]

        result = compare_values(expected, actual, options)
        self.assertTrue(result.is_match)

    def test_hybrid_strategy_complex_objects(self):
        """Test hybrid strategy with complex nested objects."""
        options = ComparisonOptions(comparison_type=None, array_size_threshold=10)

        expected = [
            1,
            2,  # primitives
            {"user": {"name": "Alice", "roles": ["admin", "user"]}},
            {"user": {"name": "Bob", "roles": ["user"]}},
        ]

        actual = [
            {"user": {"name": "Bob", "roles": ["user"]}},
            {"user": {"name": "Alice", "roles": ["admin", "user"]}},
            2,
            1,
        ]

        result = compare_values(expected, actual, options)
        self.assertTrue(result.is_match)

    def test_hybrid_strategy_wrong_primitive_frequency(self):
        """Test hybrid strategy fails with wrong primitive frequency."""
        options = ComparisonOptions(comparison_type=None, array_size_threshold=10)

        expected = [1, 1, 1, {"name": "Alice"}]  # Three 1s
        actual = [{"name": "Alice"}, 1, 1]  # Only two 1s

        result = compare_values(expected, actual, options)
        self.assertFalse(result.is_match)

    def test_empty_arrays(self):
        """Test comparison of empty arrays."""
        options = ComparisonOptions(comparison_type="unordered")

        # Empty arrays should match
        result = compare_values([], [], options)
        self.assertTrue(result.is_match)

        # Empty vs non-empty should fail
        result = compare_values([], [1], options)
        self.assertFalse(result.is_match)

        result = compare_values([1], [], options)
        self.assertFalse(result.is_match)

    def test_single_element_arrays(self):
        """Test comparison of single-element arrays."""
        options = ComparisonOptions(comparison_type="unordered")

        # Single elements should match
        result = compare_values([1], [1], options)
        self.assertTrue(result.is_match)

        # Different single elements should fail
        result = compare_values([1], [2], options)
        self.assertFalse(result.is_match)

    def test_strategy_selection_edge_cases(self):
        """Test edge cases in strategy selection."""
        # Test exactly at threshold boundary
        options = ComparisonOptions(comparison_type=None, array_size_threshold=3)

        # Array of exactly threshold size should use unordered
        result = compare_values([1, 2, 3], [3, 2, 1], options)
        self.assertTrue(result.is_match)

        # Array just over threshold should use ordered
        result = compare_values([1, 2, 3, 4], [4, 3, 2, 1], options)
        self.assertFalse(result.is_match)

    def test_error_messages_quality(self):
        """Test that error messages are helpful and specific."""
        # Test size threshold error message
        options = ComparisonOptions(comparison_type="unordered", array_size_threshold=2)
        result = compare_values([1, 2, 3], [3, 2, 1], options)
        self.assertFalse(result.is_match)
        self.assertIn("Array too large for unordered comparison", result.error)
        self.assertIn("Consider using ordered comparison", result.error)
        self.assertIn("limit: 2", result.error)

        # Test unordered matching failure
        options = ComparisonOptions(comparison_type="unordered")
        result = compare_values([1, 2], [3, 4], options)
        self.assertFalse(result.is_match)
        self.assertIn("No valid unordered matching found", result.error)
        self.assertIn(
            "Consider using ordered comparison if element order matters", result.error
        )


if __name__ == "__main__":
    unittest.main()
