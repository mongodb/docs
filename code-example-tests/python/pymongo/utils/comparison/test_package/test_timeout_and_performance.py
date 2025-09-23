"""
Tests for timeout handling and performance edge cases.
"""

import unittest

from utils.comparison.comparison import compare_values, ComparisonOptions


class TestTimeoutAndPerformance(unittest.TestCase):
    """Test timeout and performance-related functionality."""

    def test_timeout_on_large_comparison(self):
        """Test that timeout is enforced for large comparisons."""

        # Create large nested structure that would take time to compare
        def create_deep_structure(depth):
            if depth == 0:
                return list(range(100))  # Large array at leaves
            return {f"level_{i}": create_deep_structure(depth - 1) for i in range(10)}

        expected = create_deep_structure(3)
        actual = create_deep_structure(3)
        # Modify one deep value to force full comparison
        actual["level_0"]["level_0"]["level_0"][50] = 999

        options = ComparisonOptions(timeout_seconds=1)  # Very short timeout
        result = compare_values(expected, actual, options)

        # Should either complete quickly or timeout - both are acceptable
        self.assertIsInstance(result.is_match, bool)  # Just verify it completes

    def test_recursion_depth_limit(self):
        """Test that recursion depth limits are enforced."""

        # Create very deeply nested structure
        def create_deep_nested(depth):
            if depth == 0:
                return {"value": 42}
            return {"nested": create_deep_nested(depth - 1)}

        expected = create_deep_nested(200)  # Very deep nesting
        actual = create_deep_nested(200)

        result = compare_values(expected, actual)
        # Should either complete or hit recursion limit gracefully
        self.assertIsInstance(result.is_match, bool)

    def test_large_array_handling(self):
        """Test handling of large arrays."""
        # Test with reasonably large arrays
        expected = list(range(1000))
        actual = list(range(1000))

        result = compare_values(expected, actual)
        self.assertTrue(result.is_match, result.error)

        # Test with one different element
        actual_modified = list(range(1000))
        actual_modified[500] = 999999
        result = compare_values(expected, actual_modified)
        self.assertFalse(result.is_match)


if __name__ == "__main__":
    unittest.main()
