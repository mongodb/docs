"""
Test comprehensive error message quality for technical writers.

This module tests that error messages provide meaningful, actionable information
for technical writers who need to debug comparison failures in MongoDB documentation.
"""

import unittest
from utils.comparison import Expect
from utils.comparison.comparison import compare_values, ComparisonOptions


class TestErrorMessageQuality(unittest.TestCase):
    """Test that error messages are helpful and actionable for technical writers."""

    def test_simple_type_mismatch_includes_path_and_types(self):
        """Test that type mismatches include clear path and type information."""
        with self.assertRaises(AssertionError) as cm:
            Expect.that({'name': 'John', 'age': 25}).should_match({'name': 'John', 'age': 'twenty-five'})

        error_msg = str(cm.exception)
        self.assertIn('$.age', error_msg, "Should include JSONPath to the mismatched field")
        self.assertIn('int', error_msg, "Should mention the actual type")
        self.assertIn('str', error_msg, "Should mention the expected type")

    def test_missing_field_error_clarity(self):
        """Test that missing field errors are clear and actionable."""
        with self.assertRaises(AssertionError) as cm:
            Expect.that({'name': 'John'}).should_match({'name': 'John', 'email': 'john@example.com'})

        error_msg = str(cm.exception)
        self.assertIn('email', error_msg, "Should mention the missing field name")
        self.assertIn('$.email', error_msg, "Should include JSONPath to the missing field")

    def test_array_mismatch_provides_specific_element_info(self):
        """Test that array mismatches identify specific problematic elements."""
        with self.assertRaises(AssertionError) as cm:
            Expect.that([
                {'id': 1, 'name': 'John'},
                {'id': 2, 'name': 'Jane'}
            ]).should_match([
                {'id': 1, 'name': 'John'},
                {'id': 2, 'name': 'Bob'}
            ])

        error_msg = str(cm.exception)
        # Verify the improved error message includes all the required information
        self.assertIn("Array elements could not be matched", error_msg)
        self.assertIn("Expected:", error_msg)
        self.assertIn("Actual:", error_msg)
        self.assertIn("Suggestion:", error_msg)
        self.assertIn("[using unordered array comparison]", error_msg)
        self.assertIn("'name': 'Bob'", error_msg)  # Expected element detail
        self.assertIn("'name': 'Jane'", error_msg)  # Actual element detail

    def test_nested_structure_error_includes_full_path(self):
        """Test that deeply nested errors include the complete path."""
        with self.assertRaises(AssertionError) as cm:
            Expect.that({
                'user': {
                    'profile': {
                        'personal': {'name': 'John', 'age': 25},
                        'preferences': {'theme': 'dark'}
                    }
                }
            }).should_match({
                'user': {
                    'profile': {
                        'personal': {'name': 'Jane', 'age': 25},
                        'preferences': {'theme': 'dark'}
                    }
                }
            })

        error_msg = str(cm.exception)
        self.assertIn('$.user.profile.personal.name', error_msg,
                     "Should include complete JSONPath to deeply nested field")

    def test_pymongo_operation_error_context(self):
        """Test that PyMongo operation errors provide operation context."""
        with self.assertRaises(AssertionError) as cm:
            Expect.that({'name': 'John', 'age': 25}).should_match('InsertOne({"name": "Jane", "age": 30})')

        error_msg = str(cm.exception)
        # Should ideally mention that this is a PyMongo operation comparison
        print(f"PyMongo operation error: {error_msg}")

    def test_ellipsis_pattern_error_explains_pattern_type(self):
        """Test that ellipsis pattern errors explain what pattern was expected."""
        with self.assertRaises(AssertionError) as cm:
            Expect.that({'name': 'John', 'status': 'active'}).should_match({'name': 'Jane...', 'status': 'active'})

        error_msg = str(cm.exception)
        self.assertIn('Jane', error_msg, "Should show the expected prefix")
        self.assertIn('John', error_msg, "Should show the actual value")

    def test_array_length_mismatch_shows_lengths(self):
        """Test that array length mismatches show expected vs actual lengths."""
        with self.assertRaises(AssertionError) as cm:
            Expect.that([1, 2]).should_match([1, 2, 3, 4])

        error_msg = str(cm.exception)
        # Should ideally show array lengths for quick diagnosis
        print(f"Array length mismatch error: {error_msg}")

    def test_comparison_strategy_context_in_errors(self):
        """Test that errors mention which comparison strategy was used."""
        with self.assertRaises(AssertionError) as cm:
            Expect.that([1, 2, 3]).with_ordered_sort().should_match([3, 2, 1])

        error_msg = str(cm.exception)
        # Should ideally mention that ordered comparison was used
        print(f"Ordered array comparison error: {error_msg}")

    def test_timeout_error_provides_actionable_suggestions(self):
        """Test that timeout errors provide actionable suggestions."""
        # Create a structure that might timeout with very short timeout
        large_structure = {f"field_{i}": list(range(100)) for i in range(50)}

        try:
            result = compare_values(large_structure, large_structure,
                                  ComparisonOptions(timeout_seconds=0.001))
            if not result.is_match and result.error:
                error_msg = result.error
                print(f"Timeout error: {error_msg}")
                # Should provide suggestions like:
                # - Increase timeout
                # - Simplify comparison
                # - Use with_ignored_fields for variable data
        except Exception as e:
            print(f"Timeout handling error: {e}")

    def test_circular_reference_error_clarity(self):
        """Test that circular reference errors are clear."""
        # Create circular reference
        circular = {'name': 'test'}
        circular['self'] = circular

        try:
            result = compare_values(circular, {'name': 'test', 'self': {'name': 'different'}})
            if not result.is_match:
                print(f"Circular reference error: {result.error}")
        except Exception as e:
            print(f"Circular reference handling: {e}")

    def test_multiple_errors_in_complex_structure(self):
        """Test error reporting when multiple fields fail in complex structures."""
        with self.assertRaises(AssertionError) as cm:
            Expect.that({
                'users': [
                    {'name': 'John', 'age': 25, 'email': 'john@example.com'},
                    {'name': 'Jane', 'age': 30, 'email': 'jane@example.com'}
                ],
                'metadata': {'version': 1, 'created': '2023-01-01'}
            }).should_match({
                'users': [
                    {'name': 'Bob', 'age': 35, 'email': 'bob@example.com'},
                    {'name': 'Alice', 'age': 28, 'email': 'alice@example.com'}
                ],
                'metadata': {'version': 2, 'created': '2023-01-02'}
            })

        error_msg = str(cm.exception)
        # Current implementation likely only shows first error
        # Should ideally show multiple errors or at least indicate there are more
        print(f"Multiple errors case: {error_msg}")

    def test_improved_array_error_messages(self):
        """Test that improved array error messages provide better context."""
        with self.assertRaises(AssertionError) as cm:
            Expect.that([
                {'id': 1, 'name': 'John'},
                {'id': 2, 'name': 'Jane'}
            ]).should_match([
                {'id': 1, 'name': 'John'},
                {'id': 2, 'name': 'Bob'}
            ])

        error_msg = str(cm.exception)
        # Should now include array summaries and suggestions
        self.assertIn("unordered comparison", error_msg, "Should mention comparison strategy")
        print(f"Improved array error: {error_msg}")

    def test_improved_type_mismatch_messages(self):
        """Test that type mismatch errors include values and suggestions."""
        with self.assertRaises(AssertionError) as cm:
            Expect.that({'age': 25}).should_match({'age': 'twenty-five'})

        error_msg = str(cm.exception)
        self.assertIn("25", error_msg, "Should include actual value")
        self.assertIn("twenty-five", error_msg, "Should include expected value")
        self.assertIn("Suggestion:", error_msg, "Should include actionable suggestion")
        print(f"Improved type mismatch error: {error_msg}")

    def test_improved_missing_field_messages(self):
        """Test that missing field errors include helpful suggestions."""
        with self.assertRaises(AssertionError) as cm:
            Expect.that({'name': 'John'}).should_match({'name': 'John', 'email': 'john@example.com'})

        error_msg = str(cm.exception)
        self.assertIn("Suggestion:", error_msg, "Should include actionable suggestion")
        self.assertIn("ellipsis", error_msg, "Should suggest ellipsis patterns")
        print(f"Improved missing field error: {error_msg}")

    def test_comparison_strategy_context_in_errors(self):
        """Test that errors include comparison strategy context."""
        with self.assertRaises(AssertionError) as cm:
            Expect.that([1, 2, 3]).with_ordered_sort().should_match([3, 2, 1])

        error_msg = str(cm.exception)
        self.assertIn("ordered", error_msg, "Should mention ordered comparison strategy")
        print(f"Strategy context error: {error_msg}")


if __name__ == "__main__":
    unittest.main()
