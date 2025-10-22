"""
This module tests the Expect class that forms the entrypoint
for all comparison operations.
"""

import unittest
import tempfile
import os

from utils.comparison import Expect


class TestExpectAPI(unittest.TestCase):
    """Test the Expect comparison API."""

    def setUp(self):
        """Set up temporary files for testing."""
        self.temp_dir = tempfile.mkdtemp()

    def tearDown(self):
        """Clean up temporary files."""
        import shutil
        shutil.rmtree(self.temp_dir)

    def _create_temp_file(self, content: str, filename: str = "test_expected.txt") -> str:
        """Create a temporary file with the given content."""
        file_path = os.path.join(self.temp_dir, filename)
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(content)
        return file_path

    def test_expect_basic_objects(self):
        """Test Expect with basic object comparison."""
        expected = {"name": "John", "age": 30}
        actual = {"name": "John", "age": 30}

        # Should pass with identical objects
        Expect.that(actual).should_match(expected)

    def test_expect_with_ellipsis_patterns(self):
        """Test Expect with ellipsis patterns in strings."""
        expected = '{"_id": "...", "name": "John", "age": 30}'
        actual = {"_id": "507f1f77bcf86cd799439011", "name": "John", "age": 30}

        # Should pass with ellipsis matching any _id value
        Expect.that(actual).should_match(expected)

    def test_expect_file_comparison(self):
        """Test Expect with file path as expected value."""
        expected_content = '{"name": "John", "age": 30}'
        actual = {"name": "John", "age": 30}

        temp_file = self._create_temp_file(expected_content)

        # Should pass with file comparison
        Expect.that(actual).should_match(temp_file)

    def test_expect_with_options(self):
        """Test Expect with fluent options."""
        expected = {"_id": "different", "name": "John", "age": 30}
        actual = {"_id": "507f1f77bcf86cd799439011", "name": "John", "age": 30}
        # Should pass with ignored _id field
        Expect.that(actual).with_ignored_fields("_id").should_match(expected)

    def test_expect_error_messages(self):
        """Test Expect with error message validation."""
        expected = {"name": "John"}
        actual = {"name": "Jane"}

        with self.assertRaises(AssertionError) as cm:
            Expect.that(actual).should_match(expected)

        # Verify that meaningful error messages are provided
        self.assertIn("name", str(cm.exception))

    def test_expect_array_comparison(self):
        """Test Expect with array comparison."""
        expected = [{"name": "John"}, {"name": "Jane"}]
        actual = [{"name": "John"}, {"name": "Jane"}]

        # Should pass with identical arrays
        Expect.that(actual).should_match(expected)

    def test_expect_text_comparison(self):
        """Test Expect with plain text comparison."""
        expected = "Hello, world!\nThis is a test."
        actual = "Hello, world!\nThis is a test."

        # Should pass with identical text
        Expect.that(actual).should_match(expected)

    def test_expect_fluent_api_basic(self):
        """Test Expect fluent API basic usage."""
        actual = {"name": "John", "age": 30}
        expected = {"name": "John", "age": 30}

        # Should pass with fluent API
        Expect.that(actual).should_match(expected)

    def test_expect_with_ordered_arrays(self):
        """Test Expect fluent API with ordered arrays option."""
        actual = [1, 2, 3]
        expected = [1, 2, 3]

        # Should pass with ordered arrays
        Expect.that(actual).with_ordered_sort().should_match(expected)

    def test_expect_with_ignored_fields(self):
        """Test Expect fluent API with ignored fields option."""
        actual = {"_id": "507f1f77bcf86cd799439011", "name": "John", "age": 30}
        expected = {"_id": "different", "name": "John", "age": 30}

        # Should pass with ignored _id field
        Expect.that(actual).with_ignored_fields("_id").should_match(expected)

    def test_expect_method_chaining(self):
        """Test Expect fluent API with multiple chained methods."""
        actual = [
            {"_id": "507f1f77bcf86cd799439011", "name": "John", "timestamp": "2023-01-01"},
            {"_id": "507f1f77bcf86cd799439012", "name": "Jane", "timestamp": "2023-01-02"}
        ]
        expected = [
            {"_id": "different1", "name": "John", "timestamp": "different1"},
            {"_id": "different2", "name": "Jane", "timestamp": "different2"}
        ]

        # Should pass with chained options
        Expect.that(actual).with_ordered_sort().with_ignored_fields("_id", "timestamp").should_match(expected)

    def test_expect_file_comparison(self):
        """Test Expect fluent API with file comparison."""
        expected_content = '{"name": "John", "age": 30}'
        actual = {"name": "John", "age": 30}

        temp_file = self._create_temp_file(expected_content)

        # Should pass with file comparison using fluent API
        Expect.that(actual).should_match(temp_file)

    def test_content_type_detection(self):
        """Test that content type detection works correctly."""
        from utils.comparison.content_analyzer import ContentAnalyzer

        # Test file detection
        temp_file = self._create_temp_file('{"test": "data"}')
        self.assertEqual(ContentAnalyzer.detect_type(temp_file), "file")

        # Test pattern string detection
        self.assertEqual(ContentAnalyzer.detect_type('{"_id": "..."}'), "pattern_string")

        # Test structured string detection
        self.assertEqual(ContentAnalyzer.detect_type('{"name": "test"}'), "structured_string")

        # Test text block detection
        self.assertEqual(ContentAnalyzer.detect_type("line1\nline2"), "text_block")

        # Test object detection
        self.assertEqual(ContentAnalyzer.detect_type({"key": "value"}), "object")

        # Test array detection
        self.assertEqual(ContentAnalyzer.detect_type([1, 2, 3]), "array")

        # Test primitive detection
        self.assertEqual(ContentAnalyzer.detect_type("simple string"), "plain_string")
        self.assertEqual(ContentAnalyzer.detect_type(42), "primitive")

    def test_mongodb_pattern_detection(self):
        """Test detection of MongoDB-specific patterns."""
        from utils.comparison.content_analyzer import ContentAnalyzer

        # Test MongoDB constructor patterns
        self.assertTrue(ContentAnalyzer._looks_like_json('ObjectId("507f1f77bcf86cd799439011")'))
        self.assertTrue(ContentAnalyzer._looks_like_json('datetime.datetime(2023, 1, 1)'))
        self.assertTrue(ContentAnalyzer._looks_like_json('InsertOne({"name": "test"})'))

        # Test Extended JSON patterns
        self.assertTrue(ContentAnalyzer._looks_like_json('{"_id": {"$oid": "507f1f77bcf86cd799439011"}}'))
        self.assertTrue(ContentAnalyzer._looks_like_json('{"date": {"$date": "2023-01-01T00:00:00Z"}}'))

        # Test regular JSON
        self.assertTrue(ContentAnalyzer._looks_like_json('{"name": "test", "age": 30}'))
        self.assertTrue(ContentAnalyzer._looks_like_json('[1, 2, 3]'))

        # Test non-structured strings
        self.assertFalse(ContentAnalyzer._looks_like_json('simple text'))
        self.assertFalse(ContentAnalyzer._looks_like_json(''))
        self.assertFalse(ContentAnalyzer._looks_like_json('a'))

    def test_error_handling(self):
        """Test error handling in the Expect API."""
        # Test assertion failure
        with self.assertRaises(AssertionError):
            Expect.that({"name": "Jane"}).should_match({"name": "John"})

        # Test fluent API assertion failure
        with self.assertRaises(AssertionError):
            Expect.that({"name": "John"}).should_match({"name": "Jane"})

        # Test file not found handling - use a path that clearly looks like a file
        with self.assertRaises(AssertionError) as cm:
            Expect.that({"test": "data"}).should_match("path/to/nonexistent_file.txt")

        # The error message should indicate a mismatch (fallback to text comparison)
        error_msg = str(cm.exception)
        self.assertIn("Mismatch at line 1", error_msg)

    def test_expect_automatic_content_detection(self):
        """Test Expect fluent API with automatic content detection."""
        # Test 1: Multi-line text (should use text comparison)
        expected = "Hello, world!\nThis is a test."
        actual = "Hello, world!\nThis is a test."
        Expect.that(actual).should_match(expected)

        # Test 2: JSON strings (should be parsed as structured data, allowing formatting differences)
        expected_json = '{"name": "John", "age": 30}'
        actual_json = '{"name":"John","age":30}'  # Different formatting
        Expect.that(actual_json).should_match(expected_json)

        # Test 3: Plain strings (should work with automatic detection)
        expected_plain = "simple text"
        actual_plain = "simple text"
        Expect.that(actual_plain).should_match(expected_plain)

    def test_expect_with_unordered_arrays_complex(self):
        """Test Expect fluent API with complex unordered array scenarios."""
        # Complex objects in unordered arrays
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

        # Should pass with unordered arrays
        Expect.that(actual).should_match(expected)

    def test_expect_complex_method_chaining(self):
        """Test Expect fluent API with complex method chaining combinations."""
        actual = [
            {"_id": "507f1f77bcf86cd799439011", "name": "Alice", "timestamp": "2023-01-01", "score": 95},
            {"_id": "507f1f77bcf86cd799439012", "name": "Bob", "timestamp": "2023-01-02", "score": 87}
        ]
        expected = [
            {"_id": "different2", "name": "Bob", "timestamp": "different2", "score": 87},
            {"_id": "different1", "name": "Alice", "timestamp": "different1", "score": 95}
        ]

        # Test unordered arrays + ignore fields
        Expect.that(actual).with_ignored_fields("_id", "timestamp").should_match(expected)

    def test_expect_pymongo_operations(self):
        """Test Expect fluent API with PyMongo operations."""
        expected = 'InsertOne({"name": "test", "value": 42})'
        actual = {"name": "test", "value": 42}

        # Should handle PyMongo operations with fluent API
        Expect.that(actual).should_match(expected)

        # Test with ignore fields
        expected_with_id = 'InsertOne({"_id": "...", "name": "test", "value": 42})'
        actual_with_id = {"_id": "507f1f77bcf86cd799439011", "name": "test", "value": 42}

        Expect.that(actual_with_id).with_ignored_fields("_id").should_match(expected_with_id)

    def test_expect_datetime_handling(self):
        """Test Expect fluent API with datetime handling."""
        from datetime import datetime

        expected = {"created": "2023-01-15T10:30:00.123456Z", "name": "test"}
        actual = {"created": datetime(2023, 1, 15, 10, 30, 0, 123456), "name": "test"}

        # Should handle datetime normalization with fluent API
        Expect.that(actual).should_match(expected)

    def test_expect_ellipsis_patterns(self):
        """Test Expect fluent API with ellipsis patterns."""
        # Test with simple ellipsis patterns in structured data
        expected = {"_id": "...", "name": "John", "metadata": {"created": "...", "version": 1}}
        actual = {
            "_id": "507f1f77bcf86cd799439011",
            "name": "John",
            "metadata": {"created": "2023-01-15T10:30:00Z", "version": 1}
        }

        # Should handle ellipsis patterns with fluent API
        Expect.that(actual).should_match(expected)

    def test_expect_file_handling_edge_cases(self):
        """Test Expect fluent API with file handling edge cases."""
        # Test with JSON file content
        expected_content = '{"name": "John", "age": 30}'
        temp_file = self._create_temp_file(expected_content)
        actual = {"name": "John", "age": 30}

        # Should handle JSON file comparison
        Expect.that(actual).should_match(temp_file)

        # Test with text file - automatic content detection should handle this
        text_content = "Hello, world!\nThis is a test."
        text_file = self._create_temp_file(text_content)

        # Should handle text file comparison automatically
        Expect.that(text_content).should_match(text_file)

    def test_expect_error_handling_detailed(self):
        """Test detailed error handling for Expect fluent API."""
        # Test ordered array failure
        with self.assertRaises(AssertionError) as cm:
            Expect.that([1, 2, 3]).with_ordered_sort().should_match([3, 2, 1])

        error_msg = str(cm.exception)
        # Check for array-related error message
        self.assertTrue("$[0]" in error_msg or "Array" in error_msg)

        # Test ignore fields with missing field
        with self.assertRaises(AssertionError) as cm:
            Expect.that({"name": "John"}).with_ignored_fields("_id").should_match({"name": "Jane", "_id": "123"})

        error_msg = str(cm.exception)
        self.assertIn("name", error_msg)

    def test_expect_method_order_independence(self):
        """Test that Expect method chaining order doesn't matter."""
        actual = [
            {"_id": "507f1f77bcf86cd799439011", "name": "Alice"},
            {"_id": "507f1f77bcf86cd799439012", "name": "Bob"}
        ]
        expected = [
            {"_id": "different2", "name": "Bob"},
            {"_id": "different1", "name": "Alice"}
        ]

        # Test different chaining orders - should all work the same
        Expect.that(actual).with_ignored_fields("_id").should_match(expected)
        Expect.that(actual).with_ignored_fields("_id").should_match(expected)

    def test_expect_property_level_ellipsis(self):
        """Test Expect fluent API with property-level ellipsis patterns."""
        # Test exact ellipsis
        expected = {"_id": "...", "name": "John", "age": 30}
        actual = {"_id": "507f1f77bcf86cd799439011", "name": "John", "age": 30}

        Expect.that(actual).should_match(expected)

        # Test multiple exact ellipsis fields
        expected_multi = {"_id": "...", "status": "...", "name": "John"}
        actual_multi = {"_id": "507f1f77bcf86cd799439011", "status": "active", "name": "John"}

        Expect.that(actual_multi).should_match(expected_multi)

        # Test truncated string ellipsis
        expected_truncated = {"message": "Error: Connection failed...", "code": 500}
        actual_truncated = {"message": "Error: Connection failed after 3 retries with timeout", "code": 500}

        Expect.that(actual_truncated).should_match(expected_truncated)

    def test_expect_array_level_ellipsis(self):
        """Test Expect fluent API with array-level ellipsis patterns."""
        # Test full array wildcard
        expected_wildcard = ["..."]
        actual_wildcard = [1, 2, 3, "anything", {"nested": "object"}]

        Expect.that(actual_wildcard).should_match(expected_wildcard)

        # Test array with ellipsis gaps
        expected_gaps = [1, "...", 5]
        actual_gaps = [1, 2, 3, 4, 5]

        Expect.that(actual_gaps).should_match(expected_gaps)

        # Test mixed array with ellipsis
        expected_mixed = [{"name": "Alice"}, "...", {"name": "Bob"}]
        actual_mixed = [
            {"name": "Alice"},
            {"name": "Charlie", "age": 25},
            {"name": "David", "city": "NYC"},
            {"name": "Bob"}
        ]

        Expect.that(actual_mixed).should_match(expected_mixed)

    def test_expect_object_level_ellipsis(self):
        """Test Expect fluent API with object-level ellipsis patterns."""
        expected = {"...": "..."}
        actual = {
            "any": "object",
            "with": "any",
            "properties": True,
            "nested": {"data": 123}
        }

        Expect.that(actual).should_match(expected)

    def test_expect_global_ellipsis(self):
        """Test Expect fluent API with global ellipsis patterns."""
        # Test global ellipsis allowing extra fields
        expected = '...\n{"name": "Alice", "department": "Engineering"}'
        actual = {
            "name": "Alice",
            "department": "Engineering",
            "employee_id": "E12345",
            "start_date": "2022-03-01",
            "manager": "Bob Smith"
        }

        Expect.that(actual).should_match(expected)

        # Test global ellipsis with nested structures
        expected_nested = '''
        ...
        {
          "users": [
            {
              "name": "John",
              "age": 30
            }
          ],
          "meta": {
            "total": 1
          }
        }
        '''
        actual_nested = {
            "users": [
                {
                    "name": "John",
                    "age": 30,
                    "id": "user123",
                    "created_at": "2023-01-01"
                }
            ],
            "meta": {"total": 1, "page": 1, "limit": 10},
            "request_id": "req-456",
            "timestamp": "2023-01-01T10:00:00Z"
        }

        Expect.that(actual_nested).should_match(expected_nested)

    def test_expect_complex_ellipsis_combinations(self):
        """Test Expect fluent API with complex ellipsis pattern combinations."""
        expected = '''
        ...
        {
          "_id": "...",
          "users": [
            {
              "name": "Alice",
              "profile": {"...": "..."}
            },
            "...",
            {
              "name": "Bob",
              "email": "bob@example.com"
            }
          ],
          "message": "Processing completed...",
          "stats": {
            "processed": 100
          }
        }
        '''
        actual = {
            "_id": "507f1f77bcf86cd799439011",
            "users": [
                {
                    "name": "Alice",
                    "profile": {
                        "age": 25,
                        "city": "NYC",
                        "preferences": {"theme": "dark"}
                    }
                },
                {"name": "Charlie", "email": "charlie@example.com"},
                {"name": "David", "phone": "123-456-7890"},
                {"name": "Bob", "email": "bob@example.com"}
            ],
            "message": "Processing completed successfully with 0 errors",
            "stats": {"processed": 100, "errors": 0, "warnings": 2},
            "server_id": "srv-001",
            "timestamp": "2023-01-01T10:00:00Z"
        }

        Expect.that(actual).should_match(expected)

    def test_expect_ellipsis_with_options(self):
        """Test Expect fluent API ellipsis patterns combined with other options."""
        # Test ellipsis patterns (ordered by default)
        expected = [{"name": "Alice", "_id": "..."}, "...", {"name": "Bob", "_id": "..."}]
        actual = [
            {"name": "Alice", "_id": "507f1f77bcf86cd799439011"},
            {"name": "Charlie", "_id": "507f1f77bcf86cd799439013"},
            {"name": "Bob", "_id": "507f1f77bcf86cd799439012"}
        ]

        Expect.that(actual).should_match(expected)

        # Test ellipsis with ignore fields - use global ellipsis to allow extra fields
        expected_ignore = '...\n{"_id": "...", "name": "John", "timestamp": "..."}'
        actual_ignore = {"_id": "507f1f77bcf86cd799439011", "name": "John", "timestamp": "2023-01-01", "extra": "field"}

        Expect.that(actual_ignore).should_match(expected_ignore)

    def test_expect_ellipsis_file_comparison(self):
        """Test Expect fluent API ellipsis patterns with file comparison."""
        # Test property-level ellipsis from file
        expected_content = '''
        {
          "_id": "...",
          "name": "John",
          "age": 30
        }
        '''
        temp_file = self._create_temp_file(expected_content)
        actual = {"_id": "507f1f77bcf86cd799439011", "name": "John", "age": 30}

        Expect.that(actual).should_match(temp_file)

        # Test array ellipsis from file
        array_content = '["..."]'
        array_file = self._create_temp_file(array_content)
        actual_array = [1, 2, 3, "anything", {"nested": "object"}]

        Expect.that(actual_array).should_match(array_file)


if __name__ == "__main__":
    unittest.main()
