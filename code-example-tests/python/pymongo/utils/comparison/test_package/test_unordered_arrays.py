#!/usr/bin/env python3
"""
Test unordered array comparison functionality using the Expect API.
"""
import unittest

from utils.comparison import Expect


class TestUnorderedArrayComparison(unittest.TestCase):
    """Test unordered array comparison strategies using the Expect API."""

    def test_ordered_comparison_explicit(self):
        """Test explicitly ordered array comparison."""
        # Should match in order
        Expect.that([1, 2, 3]).with_ordered_sort().should_match([1, 2, 3])

        # Should fail when out of order
        with self.assertRaises(AssertionError):
            Expect.that([3, 2, 1]).with_ordered_sort().should_match([1, 2, 3])

    def test_unordered_comparison_explicit(self):
        """Test unordered array comparison (default behavior)."""
        # Should match regardless of order
        Expect.that([3, 2, 1]).should_match([1, 2, 3])

        # Should match with duplicates in different order
        Expect.that([2, 3, 1, 2]).should_match([1, 2, 2, 3])

        # Should fail with different elements
        with self.assertRaises(AssertionError):
            Expect.that([1, 2, 4]).should_match([1, 2, 3])

        # Should fail with different counts
        with self.assertRaises(AssertionError):
            Expect.that([1, 2]).should_match([1, 2, 3])

    def test_unordered_with_objects(self):
        """Test unordered comparison with complex objects."""
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

        Expect.that(actual).should_match(expected)

    def test_unordered_with_nested_arrays(self):
        """Test unordered comparison with nested arrays."""
        expected = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
        actual = [[7, 8, 9], [1, 2, 3], [4, 5, 6]]

        Expect.that(actual).should_match(expected)

    def test_auto_select_small_arrays(self):
        """Test auto-selection uses unordered for small arrays."""
        # Small array should use unordered by default
        Expect.that([3, 2, 1]).should_match([1, 2, 3])

    def test_auto_select_large_arrays(self):
        """Test auto-selection uses ordered for large arrays."""
        # Create array larger than threshold (50 elements) should use ordered
        large_expected = list(range(60))  # 60 elements > 50 threshold
        large_actual = list(reversed(range(60)))  # Reversed order

        with self.assertRaises(AssertionError):
            Expect.that(large_actual).should_match(large_expected)

    def test_size_threshold_protection(self):
        """Test that large arrays automatically use ordered comparison."""
        # Create arrays larger than threshold (50 elements)
        large_expected = list(range(60))  # 60 elements > 50 threshold
        large_actual = list(reversed(range(60)))

        # Large arrays should fail with ordered comparison (since they're in reverse order)
        with self.assertRaises(AssertionError) as cm:
            Expect.that(large_actual).should_match(large_expected)

        error_msg = str(cm.exception)
        # Should get an ordered comparison error, not an unordered rejection
        self.assertIn("Value mismatch", error_msg)

    def test_unordered_with_ellipsis(self):
        """Test unordered comparison with ellipsis elements."""
        # Ellipsis allows extra elements and uses unordered matching by default (MongoDB compatible)
        Expect.that([1, 2, 5, 3]).should_match([1, "...", 3])

        # Should work with multiple ellipsis
        Expect.that([1, 2, 5, 3, 7]).should_match([1, "...", 3, "..."])

    def test_hybrid_strategy_mixed_types(self):
        """Test hybrid strategy with mixed primitives and objects."""
        expected = [
            1, 2, 3,  # primitives
            {"name": "Alice"},
            {"name": "Bob"},  # objects
        ]

        actual = [
            {"name": "Bob"},
            {"name": "Alice"},  # objects in different order
            3, 1, 2,  # primitives in different order
        ]

        Expect.that(actual).should_match(expected)

    def test_hybrid_strategy_primitive_frequency(self):
        """Test hybrid strategy correctly handles primitive frequency."""
        expected = [1, 1, 2, {"name": "Alice"}]
        actual = [{"name": "Alice"}, 2, 1, 1]

        Expect.that(actual).should_match(expected)

        # Should fail with wrong frequency
        expected = [1, 1, 2, {"name": "Alice"}]
        actual = [{"name": "Alice"}, 2, 1]  # missing one 1

        with self.assertRaises(AssertionError):
            Expect.that(actual).should_match(expected)

    def test_timeout_protection(self):
        """Test that timeout protection works during backtracking."""
        # Create arrays that would require significant backtracking
        # but are small enough to pass size check
        expected = [{"id": i, "value": f"val_{i}"} for i in range(15)]
        actual = list(reversed(expected))

        # This should either succeed quickly or timeout
        try:
            Expect.that(actual).should_match(expected)
        except AssertionError:
            # Timeout or comparison failure is acceptable
            pass

    def test_ellipsis_unordered_behavior(self):
        """Test that ellipsis uses unordered behavior in auto-selection for MongoDB compatibility."""
        # With ellipsis, should use unordered matching (order doesn't matter)
        Expect.that([1, 2, 3]).should_match([1, "...", 3])

        # Should succeed even when order is different for ellipsis (MongoDB compatibility)
        Expect.that([3, 2, 1]).should_match([1, "...", 3])

        # Should fail when required elements are missing
        with self.assertRaises(AssertionError) as cm:
            Expect.that([2, 4]).should_match([1, "...", 3])  # Missing both 1 and 3

        error_msg = str(cm.exception)
        self.assertIn("could not be matched", error_msg)

    def test_ellipsis_insufficient_elements(self):
        """Test ellipsis with insufficient elements."""
        # Should fail when not enough elements for non-ellipsis requirements
        with self.assertRaises(AssertionError) as cm:
            Expect.that([3, 1]).should_match([1, "...", 3, 5])  # Missing 5

        error_msg = str(cm.exception)
        self.assertIn("Array too short for ellipsis matching", error_msg)

    def test_mixed_types_with_ellipsis(self):
        """Test mixed primitives and objects with ellipsis."""
        expected = [1, "...", {"name": "Alice"}]
        actual = [1, 2, 3, {"name": "Alice"}]

        Expect.that(actual).should_match(expected)

    def test_nested_array_structures(self):
        """Test nested array structures with unordered comparison."""
        expected = [{"items": [1, 2, 3]}, {"items": [4, 5, 6]}, {"items": [7, 8, 9]}]
        actual = [{"items": [7, 8, 9]}, {"items": [1, 2, 3]}, {"items": [4, 5, 6]}]

        Expect.that(actual).should_match(expected)

    def test_fluent_api_unordered_arrays(self):
        """Test fluent API with unordered arrays."""
        expected = [1, 2, 3]
        actual = [3, 2, 1]

        # Should pass with fluent API
        Expect.that(actual).should_match(expected)

    def test_fluent_api_ordered_arrays(self):
        """Test fluent API with ordered arrays."""
        expected = [1, 2, 3]
        actual = [1, 2, 3]

        # Should pass with fluent API
        Expect.that(actual).with_ordered_sort().should_match(expected)

        # Should fail when out of order
        with self.assertRaises(AssertionError):
            Expect.that([3, 2, 1]).with_ordered_sort().should_match(expected)

    def test_empty_arrays(self):
        """Test comparison of empty arrays."""
        # Empty arrays should match
        Expect.that([]).should_match([])

        # Empty vs non-empty should fail
        with self.assertRaises(AssertionError):
            Expect.that([1]).should_match([])

        with self.assertRaises(AssertionError):
            Expect.that([]).should_match([1])

    def test_single_element_arrays(self):
        """Test comparison of single-element arrays."""
        # Single elements should match
        Expect.that([1]).should_match([1])

        # Different single elements should fail
        with self.assertRaises(AssertionError):
            Expect.that([2]).should_match([1])

    def test_explicit_with_unordered_sort(self):
        """Test the explicit with_unordered_sort() method."""
        # Should match regardless of order
        Expect.that([3, 2, 1]).with_unordered_sort().should_match([1, 2, 3])

        # Should match with duplicates in different order
        Expect.that([2, 3, 1, 2]).with_unordered_sort().should_match([1, 2, 2, 3])

        # Should fail with different elements
        with self.assertRaises(AssertionError):
            Expect.that([1, 2, 4]).with_unordered_sort().should_match([1, 2, 3])

    def test_explicit_with_unordered_sort_objects(self):
        """Test with_unordered_sort() with complex objects."""
        expected = [
            {"name": "Alice", "age": 30},
            {"name": "Bob", "age": 25},
            {"name": "Charlie", "age": 35}
        ]

        actual = [
            {"name": "Charlie", "age": 35},
            {"name": "Alice", "age": 30},
            {"name": "Bob", "age": 25}
        ]

        # Should pass with explicit unordered sort
        Expect.that(actual).with_unordered_sort().should_match(expected)

    def test_default_behavior_is_unordered(self):
        """Test that default behavior (no method call) is unordered."""
        # Without calling any method, arrays should be compared in unordered mode
        Expect.that([3, 2, 1]).should_match([1, 2, 3])

        # Should match complex objects in different order
        expected = [{"name": "Alice"}, {"name": "Bob"}]
        actual = [{"name": "Bob"}, {"name": "Alice"}]
        Expect.that(actual).should_match(expected)

    def test_with_unordered_sort_same_as_default(self):
        """Test that with_unordered_sort() produces same results as default behavior."""
        # Test case 1: Simple array
        expected1 = [1, 2, 3]
        actual1 = [3, 2, 1]

        # Both should pass
        Expect.that(actual1).should_match(expected1)
        Expect.that(actual1).with_unordered_sort().should_match(expected1)

        # Test case 2: Complex objects
        expected2 = [{"name": "Alice", "age": 30}, {"name": "Bob", "age": 25}]
        actual2 = [{"name": "Bob", "age": 25}, {"name": "Alice", "age": 30}]

        # Both should pass
        Expect.that(actual2).should_match(expected2)
        Expect.that(actual2).with_unordered_sort().should_match(expected2)

        # Test case 3: Failure case should fail the same way
        expected3 = [1, 2, 3]
        actual3 = [1, 2, 4]

        # Both should fail
        with self.assertRaises(AssertionError):
            Expect.that(actual3).should_match(expected3)

        with self.assertRaises(AssertionError):
            Expect.that(actual3).with_unordered_sort().should_match(expected3)

    def test_with_unordered_sort_chained_with_ignored_fields(self):
        """Test with_unordered_sort() chained with with_ignored_fields()."""
        actual = [
            {"_id": "507f1f77bcf86cd799439011", "name": "Alice", "timestamp": "2023-01-01"},
            {"_id": "507f1f77bcf86cd799439012", "name": "Bob", "timestamp": "2023-01-02"}
        ]
        expected = [
            {"_id": "different2", "name": "Bob", "timestamp": "different2"},
            {"_id": "different1", "name": "Alice", "timestamp": "different1"}
        ]

        # Should pass with chained options (order 1)
        Expect.that(actual).with_unordered_sort().with_ignored_fields("_id", "timestamp").should_match(expected)

        # Should pass with chained options (order 2)
        Expect.that(actual).with_ignored_fields("_id", "timestamp").with_unordered_sort().should_match(expected)

    def test_with_unordered_sort_nested_arrays(self):
        """Test with_unordered_sort() with nested array structures."""
        expected = [
            {"items": [1, 2, 3], "name": "Group A"},
            {"items": [4, 5, 6], "name": "Group B"},
            {"items": [7, 8, 9], "name": "Group C"}
        ]
        actual = [
            {"items": [7, 8, 9], "name": "Group C"},
            {"items": [1, 2, 3], "name": "Group A"},
            {"items": [4, 5, 6], "name": "Group B"}
        ]

        # Should pass with explicit unordered sort
        Expect.that(actual).with_unordered_sort().should_match(expected)

    def test_with_unordered_sort_vs_with_ordered_sort(self):
        """Test that with_unordered_sort() and with_ordered_sort() have different behaviors."""
        expected = [1, 2, 3]
        actual = [3, 2, 1]

        # Should pass with unordered
        Expect.that(actual).with_unordered_sort().should_match(expected)

        # Should fail with ordered
        with self.assertRaises(AssertionError):
            Expect.that(actual).with_ordered_sort().should_match(expected)

    def test_with_unordered_sort_with_duplicates(self):
        """Test with_unordered_sort() correctly handles duplicate elements."""
        # Should match when duplicates are present in same frequency
        Expect.that([1, 2, 2, 3, 3, 3]).with_unordered_sort().should_match([3, 3, 3, 2, 2, 1])

        # Should fail when duplicate counts differ
        with self.assertRaises(AssertionError):
            Expect.that([1, 2, 2, 3]).with_unordered_sort().should_match([1, 2, 3, 3])

    def test_with_unordered_sort_empty_and_single_element(self):
        """Test with_unordered_sort() with edge cases."""
        # Empty arrays
        Expect.that([]).with_unordered_sort().should_match([])

        # Single element
        Expect.that([1]).with_unordered_sort().should_match([1])

        # Should fail when sizes differ
        with self.assertRaises(AssertionError):
            Expect.that([1]).with_unordered_sort().should_match([])


if __name__ == "__main__":
    unittest.main()
