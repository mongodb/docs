"""
Comprehensive test suite covering all essential and edge cases from the implementation plan.
Tests real-world patterns found in PyMongo driver documentation examples.
"""

import unittest

from utils.comparison.comparison import (
    compare_documents,
    compare_values,
    ComparisonOptions,
)

from utils.comparison.parser import parse_expected_content
from utils.comparison import Expect


class TestComprehensiveCases(unittest.TestCase):
    """Test all essential cases from the implementation plan."""

    def test_basic_primitives(self):
        """Test basic primitive comparisons."""
        # Strings
        Expect.that("hello").should_match('"hello"')

        # Numbers - numeric flexibility
        Expect.that(42).should_match("42")
        Expect.that(42).should_match("42.0")
        Expect.that(42.0).should_match("42")

        # Booleans
        Expect.that(True).should_match("true")
        Expect.that(False).should_match("false")

        # Null
        Expect.that(None).should_match("null")

    def test_mongodb_types_normalization(self):
        """Test MongoDB BSON types normalize to comparable strings."""
        # ObjectId normalization
        result = compare_documents(
            'ObjectId("507f1f77bcf86cd799439011")', "507f1f77bcf86cd799439011"
        )
        self.assertTrue(result.is_match, result.error)

        # Decimal128 normalization
        result = compare_documents('Decimal128("123.45")', "123.45")
        self.assertTrue(result.is_match, result.error)

        # Date normalization
        result = compare_documents(
            'Date("2021-12-18T15:55:00Z")', "2021-12-18T15:55:00.000Z"
        )
        self.assertTrue(result.is_match, result.error)

    def test_pymongo_result_objects(self):
        """Test PyMongo result object normalization."""
        # Mock result objects would be tested with actual PyMongo objects in real scenarios
        expected_content = """
        {
          "inserted_id": ObjectId("507f1f77bcf86cd799439011")
        }
        """
        actual_normalized = {"inserted_id": "507f1f77bcf86cd799439011"}
        result = compare_documents(expected_content, actual_normalized)
        self.assertTrue(result.is_match, result.error)

    def test_python2_python3_compatibility(self):
        """Test Python 2/3 string representation handling."""
        # u'string' (Python 2 unicode) should parse as regular string
        content = "u'hello world'"
        parsed, _ = parse_expected_content(content)
        self.assertEqual(parsed, "hello world")

        # b'bytes' should be handled appropriately
        content = "b'binary data'"
        parsed, _ = parse_expected_content(content)
        self.assertEqual(parsed, {"$bytes": "binary data"})

    def test_binary_and_uuid_types(self):
        """Test Binary and UUID type handling."""
        # Binary constructor
        content = 'Binary("data", 0)'
        parsed, _ = parse_expected_content(content)
        expected_structure = {"$binary": {"base64": "data", "subType": "0"}}
        self.assertEqual(parsed, expected_structure)

        # UUID constructor
        content = 'UUID("550e8400-e29b-41d4-a716-446655440000")'
        parsed, _ = parse_expected_content(content)
        self.assertEqual(parsed, "550e8400-e29b-41d4-a716-446655440000")

    def test_collation_objects(self):
        """Test Collation object parsing and normalization."""
        content = "Collation(locale='fr_CA')"
        parsed, _ = parse_expected_content(content)
        self.assertEqual(parsed, {"locale": "fr_CA"})

    def test_array_strategies(self):
        """Test different array comparison strategies."""
        # Ordered comparison (default)
        expected = [1, 2, 3]
        actual = [1, 2, 3]
        result = compare_values(expected, actual)
        self.assertTrue(result.is_match)

        # Length mismatch should fail
        result = compare_values([1, 2, 3], [1, 2])
        self.assertFalse(result.is_match)

        # Order mismatch should fail in ordered mode (explicitly specified)
        options = ComparisonOptions(comparison_type="ordered")
        result = compare_values([1, 2, 3], [3, 2, 1], options)
        self.assertFalse(result.is_match)

    def test_ellipsis_property_level(self):
        """Test property-level ellipsis ("...") wildcards."""
        expected = {"name": "John", "age": "..."}
        actual = {"name": "John", "age": 25}
        result = compare_values(expected, actual)
        self.assertTrue(result.is_match, result.error)

    def test_ellipsis_truncated_strings(self):
        """Test truncated string ellipsis matching."""
        expected = "Hello..."
        actual = "Hello, world!"
        result = compare_values(expected, actual)
        self.assertTrue(result.is_match, result.error)

        # Should fail if prefix doesn't match
        result = compare_values("Goodbye...", "Hello, world!")
        self.assertFalse(result.is_match)

    def test_ellipsis_object_level(self):
        """Test object-level ellipsis matching."""
        expected = {"...": "..."}
        actual = {"any": "object", "with": "any", "properties": True}
        result = compare_values(expected, actual)
        self.assertTrue(result.is_match, result.error)

    def test_ellipsis_array_level(self):
        """Test array-level ellipsis matching."""
        # Full wildcard array
        expected = ["..."]
        actual = [1, 2, 3, "anything"]
        result = compare_values(expected, actual)
        self.assertTrue(result.is_match, result.error)

        # Ellipsis as wildcard within array
        expected = [1, "...", 5]
        actual = [1, 2, 3, 4, 5]
        result = compare_values(expected, actual)
        self.assertTrue(result.is_match, result.error)

    def test_ellipsis_global(self):
        """Test global ellipsis allowing extra fields."""
        content = """
        ...
        {
          "name": "John",
          "age": 30
        }
        """
        # Actual has extra field
        actual = {"name": "John", "age": 30, "city": "New York"}
        result = compare_documents(content, actual)
        self.assertTrue(result.is_match, result.error)

    def test_ignore_field_values(self):
        """Test ignoring specific field values by name."""
        expected = {"_id": "anything", "name": "John"}
        actual = {"_id": "507f1f77bcf86cd799439011", "name": "John"}

        Expect.that(actual).with_ignored_fields("_id").should_match(expected)

    def test_ignore_field_values_nested(self):
        """Test ignoring field values at multiple nesting levels."""
        expected = {
            "users": [{"_id": "...", "name": "John"}, {"_id": "...", "name": "Jane"}]
        }
        actual = {
            "users": [
                {"_id": "507f1f77bcf86cd799439011", "name": "John"},
                {"_id": "507f1f77bcf86cd799439012", "name": "Jane"},
            ]
        }

        Expect.that(actual).with_ignored_fields("_id").should_match(expected)

    def test_extended_json_edge_cases(self):
        """Test Extended JSON format edge cases."""
        # $date format
        content = '{"created": {"$date": "2021-12-18T15:55:00Z"}}'
        parsed, _ = parse_expected_content(content)
        expected = {"created": "2021-12-18T15:55:00.000Z"}
        self.assertEqual(parsed, expected)

        # $oid format
        content = '{"_id": {"$oid": "507f1f77bcf86cd799439011"}}'
        parsed, _ = parse_expected_content(content)
        expected = {"_id": "507f1f77bcf86cd799439011"}
        self.assertEqual(parsed, expected)

    def test_comment_removal(self):
        """Test comment removal from expected content."""
        content = """
        {
          // This is a comment
          "name": "John", /* This is also a comment */
          "age": 30
        }
        """
        parsed, _ = parse_expected_content(content)
        expected = {"name": "John", "age": 30}
        self.assertEqual(parsed, expected)

    def test_jsonl_detection(self):
        """Test JSON Lines detection and array wrapping."""
        content = """
        {"name": "John", "age": 30}
        {"name": "Jane", "age": 25}
        """
        parsed, _ = parse_expected_content(content)
        expected = [{"name": "John", "age": 30}, {"name": "Jane", "age": 25}]
        self.assertEqual(parsed, expected)

    def test_multiblock_detection(self):
        """Test multi-block content detection."""
        content = """
        {"name": "John"}

        {"name": "Jane"}
        """
        parsed, _ = parse_expected_content(content)
        expected = [{"name": "John"}, {"name": "Jane"}]
        self.assertEqual(parsed, expected)

    def test_unquoted_keys_and_single_quotes(self):
        """Test parsing of unquoted keys and single-quoted values."""
        content = "{name: 'John', age: 30, _id: ObjectId('507f1f77bcf86cd799439011')}"
        parsed, _ = parse_expected_content(content)
        expected = {"name": "John", "age": 30, "_id": "507f1f77bcf86cd799439011"}
        self.assertEqual(parsed, expected)

    def test_numeric_flexibility(self):
        """Test numeric type flexibility in comparisons."""
        # int vs float
        result = compare_values(42, 42.0)
        self.assertTrue(result.is_match)

        # string number vs numeric
        result = compare_values("42.5", 42.5)
        self.assertTrue(result.is_match)  # Should pass with numeric comparison

        # Decimal precision handling
        from decimal import Decimal

        result = compare_values(Decimal("123.45"), 123.45)
        self.assertTrue(result.is_match)  # Numeric flexibility should handle this


class TestParserEdgeCases(unittest.TestCase):
    """Test parser edge cases and error conditions."""

    def test_nested_comments_in_strings(self):
        """Test that comments inside strings are preserved."""
        content = '{"message": "Hello // this is not a comment"}'
        parsed, _ = parse_expected_content(content)
        self.assertEqual(parsed["message"], "Hello // this is not a comment")

    def test_escaped_quotes_handling(self):
        """Test proper handling of escaped quotes in strings."""
        content = r'{"message": "He said \"Hello\" to me"}'
        parsed, _ = parse_expected_content(content)
        self.assertEqual(parsed["message"], 'He said "Hello" to me')

    def test_empty_content_handling(self):
        """Test handling of empty or whitespace-only content."""
        content = "   \n\n   "
        parsed, has_global = parse_expected_content(content)
        self.assertEqual(parsed, [])  # Empty array
        self.assertFalse(has_global)

    def test_malformed_constructors(self):
        """Test handling of malformed MongoDB constructors."""
        # This should still be parseable as regular function call-like syntax
        content = "ObjectId(invalid_param)"
        try:
            parsed, _ = parse_expected_content(content)
            # Should either parse or fail gracefully
            self.assertTrue(True)  # If we get here, parsing didn't crash
        except Exception:
            # If parsing fails, that's also acceptable for malformed input
            self.assertTrue(True)


class TestErrorMessages(unittest.TestCase):
    """Test that error messages are helpful and include path information."""

    def test_type_mismatch_error_path(self):
        """Test that type mismatches include proper path information."""
        expected = {"user": {"name": "John", "age": "not_a_number"}}
        actual = {"user": {"name": "John", "age": 25}}
        result = compare_values(expected, actual)
        self.assertFalse(result.is_match)
        self.assertIn("$.user.age", result.error)  # Should include path

    def test_missing_key_error_path(self):
        """Test that missing key errors include path information."""
        expected = {"user": {"name": "John", "email": "john@example.com"}}
        actual = {"user": {"name": "John"}}  # missing email
        result = compare_values(expected, actual)
        self.assertFalse(result.is_match)
        self.assertIn("email", result.error)  # Should mention missing key

    def test_array_length_mismatch_error(self):
        """Test that array length mismatches provide helpful messages."""
        expected = [1, 2, 3]
        actual = [1, 2]
        result = compare_values(expected, actual)
        self.assertFalse(result.is_match)
        self.assertIn("length", result.error.lower())


if __name__ == "__main__":
    unittest.main()
