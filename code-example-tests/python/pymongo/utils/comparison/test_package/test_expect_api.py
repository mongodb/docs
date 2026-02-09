"""
This module tests the Expect class that forms the entrypoint
for all comparison operations.
"""

import unittest
import tempfile
import os

from utils.comparison import Expect, ConfigurationError, SchemaDefinition


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


class TestShouldResembleAPI(unittest.TestCase):
    """Test the should_resemble and with_schema APIs for schema-based validation."""

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

    # ==================== Basic Schema Validation ====================

    def test_basic_schema_validation_matching_count(self):
        """Should validate matching document count."""
        actual = [{'name': 'Alice'}, {'name': 'Bob'}]
        expected = [{'name': 'Charlie'}, {'name': 'David'}]
        # Should pass - both have 2 documents
        Expect.that(actual).should_resemble(expected).with_schema({
            'count': 2
        })

    def test_basic_schema_validation_actual_count_mismatch(self):
        """Should fail when actual count does not match."""
        actual = [{'name': 'Alice'}]  # Only 1 document
        expected = [{'name': 'Charlie'}, {'name': 'David'}]
        with self.assertRaises(AssertionError) as cm:
            Expect.that(actual).should_resemble(expected).with_schema({
                'count': 2
            })
        self.assertIn("actual", str(cm.exception))
        self.assertIn("1 documents, expected 2", str(cm.exception))

    def test_basic_schema_validation_expected_count_mismatch(self):
        """Should fail when expected count does not match."""
        actual = [{'name': 'Alice'}, {'name': 'Bob'}]
        expected = [{'name': 'Charlie'}]  # Only 1 document
        with self.assertRaises(AssertionError) as cm:
            Expect.that(actual).should_resemble(expected).with_schema({
                'count': 2
            })
        self.assertIn("expected", str(cm.exception))
        self.assertIn("1 documents, expected 2", str(cm.exception))

    # ==================== Required Fields Validation ====================

    def test_required_fields_all_present(self):
        """Should pass when all required fields present."""
        actual = [{'_id': '1', 'name': 'Alice', 'age': 30}]
        expected = [{'_id': '2', 'name': 'Bob', 'age': 25}]
        Expect.that(actual).should_resemble(expected).with_schema({
            'count': 1,
            'required_fields': ['_id', 'name', 'age']
        })

    def test_required_fields_missing_in_actual(self):
        """Should fail when required field missing in actual."""
        actual = [{'_id': '1', 'name': 'Alice'}]  # Missing 'age'
        expected = [{'_id': '2', 'name': 'Bob', 'age': 25}]
        with self.assertRaises(AssertionError) as cm:
            Expect.that(actual).should_resemble(expected).with_schema({
                'count': 1,
                'required_fields': ['_id', 'name', 'age']
            })
        self.assertIn("actual", str(cm.exception))
        self.assertIn("age", str(cm.exception))

    def test_required_fields_missing_in_expected(self):
        """Should fail when required field missing in expected."""
        actual = [{'_id': '1', 'name': 'Alice', 'age': 30}]
        expected = [{'_id': '2', 'name': 'Bob'}]  # Missing 'age'
        with self.assertRaises(AssertionError) as cm:
            Expect.that(actual).should_resemble(expected).with_schema({
                'count': 1,
                'required_fields': ['_id', 'name', 'age']
            })
        self.assertIn("expected", str(cm.exception))
        self.assertIn("age", str(cm.exception))

    # ==================== Field Values Validation ====================

    def test_field_values_all_match(self):
        """Should pass when all field values match."""
        actual = [
            {'_id': '1', 'year': 2012, 'genre': 'Action'},
            {'_id': '2', 'year': 2012, 'genre': 'Action'}
        ]
        expected = [
            {'_id': 'a', 'year': 2012, 'genre': 'Action'},
            {'_id': 'b', 'year': 2012, 'genre': 'Action'}
        ]
        Expect.that(actual).should_resemble(expected).with_schema({
            'count': 2,
            'field_values': {'year': 2012, 'genre': 'Action'}
        })

    def test_field_values_mismatch_in_actual(self):
        """Should fail when field value does not match in actual."""
        actual = [{'_id': '1', 'year': 2015}]  # Wrong year
        expected = [{'_id': 'a', 'year': 2012}]
        with self.assertRaises(AssertionError) as cm:
            Expect.that(actual).should_resemble(expected).with_schema({
                'count': 1,
                'field_values': {'year': 2012}
            })
        self.assertIn("actual", str(cm.exception))
        self.assertIn("year", str(cm.exception))
        self.assertIn("2015", str(cm.exception))
        self.assertIn("2012", str(cm.exception))

    def test_field_values_missing_field(self):
        """Should fail when field for fieldValues is missing."""
        actual = [{'_id': '1', 'name': 'Test'}]  # Missing 'year'
        expected = [{'_id': 'a', 'name': 'Other'}]  # Missing 'year'
        with self.assertRaises(AssertionError) as cm:
            Expect.that(actual).should_resemble(expected).with_schema({
                'count': 1,
                'field_values': {'year': 2012}
            })
        self.assertIn("missing field 'year'", str(cm.exception))

    # ==================== API Error Handling ====================

    def test_error_with_schema_without_should_resemble(self):
        """Should throw when with_schema called without should_resemble."""
        with self.assertRaises(ConfigurationError) as cm:
            Expect.that([{'a': 1}]).with_schema({'count': 1})
        self.assertIn("should_resemble", str(cm.exception))

    def test_error_should_resemble_after_should_match(self):
        """Should throw when should_resemble called after should_match."""
        with self.assertRaises(ConfigurationError) as cm:
            e = Expect.that([{'a': 1}])
            e.should_match([{'a': 1}])
            e.should_resemble([{'a': 1}])
        self.assertIn("mutually exclusive", str(cm.exception))

    def test_error_should_match_after_should_resemble(self):
        """Should throw when should_match called after should_resemble."""
        with self.assertRaises(ConfigurationError) as cm:
            e = Expect.that([{'a': 1}])
            e.should_resemble([{'a': 1}])
            e.should_match([{'a': 1}])
        self.assertIn("mutually exclusive", str(cm.exception))

    def test_error_with_ignored_fields_before_should_resemble(self):
        """Should throw when should_resemble called after with_ignored_fields."""
        with self.assertRaises(ConfigurationError) as cm:
            Expect.that([{'a': 1}]).with_ignored_fields('a').should_resemble([{'a': 1}])
        self.assertIn("mutually exclusive", str(cm.exception))

    def test_error_with_ignored_fields_after_should_resemble(self):
        """Should throw when with_ignored_fields called after should_resemble."""
        with self.assertRaises(ConfigurationError) as cm:
            e = Expect.that([{'a': 1}])
            e.should_resemble([{'a': 1}])
            e.with_ignored_fields('a')
        self.assertIn("mutually exclusive", str(cm.exception))

    def test_error_with_ordered_sort_before_should_resemble(self):
        """Should throw when should_resemble called after with_ordered_sort."""
        with self.assertRaises(ConfigurationError) as cm:
            Expect.that([{'a': 1}]).with_ordered_sort().should_resemble([{'a': 1}])
        self.assertIn("mutually exclusive", str(cm.exception))

    def test_error_with_unordered_sort_before_should_resemble(self):
        """Should throw when should_resemble called after with_unordered_sort."""
        with self.assertRaises(ConfigurationError) as cm:
            Expect.that([{'a': 1}]).with_unordered_sort().should_resemble([{'a': 1}])
        self.assertIn("mutually exclusive", str(cm.exception))

    def test_error_schema_missing_count(self):
        """Should throw ConfigurationError when schema is missing count."""
        actual = [{'a': 1}, {'a': 2}]
        expected = [{'a': 3}]
        with self.assertRaises(ConfigurationError) as cm:
            Expect.that(actual).should_resemble(expected).with_schema({
                'required_fields': ['a']
            })
        self.assertIn("count", str(cm.exception))

    def test_error_schema_invalid_count(self):
        """Should throw ConfigurationError when count is not a non-negative integer."""
        actual = [{'a': 1}]
        expected = [{'a': 2}]
        # Test with negative count
        with self.assertRaises(ConfigurationError) as cm:
            Expect.that(actual).should_resemble(expected).with_schema({
                'count': -1
            })
        self.assertIn("non-negative", str(cm.exception))

        # Test with non-integer count
        with self.assertRaises(ConfigurationError) as cm:
            Expect.that(actual).should_resemble(expected).with_schema({
                'count': "five"
            })
        self.assertIn("non-negative integer", str(cm.exception))

    def test_error_schema_invalid_required_fields(self):
        """Should throw ConfigurationError when required_fields is not a list."""
        actual = [{'a': 1}]
        expected = [{'a': 2}]
        with self.assertRaises(ConfigurationError) as cm:
            Expect.that(actual).should_resemble(expected).with_schema({
                'count': 1,
                'required_fields': 'a'  # Should be a list
            })
        self.assertIn("required_fields", str(cm.exception))
        self.assertIn("list", str(cm.exception))

    def test_error_schema_invalid_field_values(self):
        """Should throw ConfigurationError when field_values is not a dict."""
        actual = [{'a': 1}]
        expected = [{'a': 2}]
        with self.assertRaises(ConfigurationError) as cm:
            Expect.that(actual).should_resemble(expected).with_schema({
                'count': 1,
                'field_values': ['a', 1]  # Should be a dict
            })
        self.assertIn("field_values", str(cm.exception))
        self.assertIn("dictionary", str(cm.exception))

    # ==================== Complex Scenarios ====================

    def test_complex_all_schema_options_together(self):
        """Should validate with all schema options together."""
        actual = [
            {'_id': '1', 'title': 'Movie A', 'year': 2012, 'genre': 'Action'},
            {'_id': '2', 'title': 'Movie B', 'year': 2012, 'genre': 'Action'},
            {'_id': '3', 'title': 'Movie C', 'year': 2012, 'genre': 'Action'},
        ]
        expected = [
            {'_id': 'a', 'title': 'Different', 'year': 2012, 'genre': 'Action'},
            {'_id': 'b', 'title': 'Titles', 'year': 2012, 'genre': 'Action'},
            {'_id': 'c', 'title': 'Here', 'year': 2012, 'genre': 'Action'},
        ]
        Expect.that(actual).should_resemble(expected).with_schema({
            'count': 3,
            'required_fields': ['_id', 'title', 'year', 'genre'],
            'field_values': {'year': 2012, 'genre': 'Action'}
        })

    def test_complex_empty_required_fields_and_field_values(self):
        """Should work with empty required_fields and field_values."""
        actual = [{'a': 1}, {'b': 2}]
        expected = [{'c': 3}, {'d': 4}]
        Expect.that(actual).should_resemble(expected).with_schema({
            'count': 2,
            'required_fields': [],
            'field_values': {}
        })

    def test_complex_only_count_specified(self):
        """Should work with only count specified."""
        actual = [{'any': 'content'}, {'goes': 'here'}]
        expected = [{'different': 'stuff'}]
        with self.assertRaises(AssertionError):
            # Fails because expected has 1, not 2
            Expect.that(actual).should_resemble(expected).with_schema({
                'count': 2
            })

    def test_complex_nested_field_values(self):
        """Should handle nested field values."""
        actual = [
            {'_id': '1', 'meta': {'version': 1}},
            {'_id': '2', 'meta': {'version': 1}},
        ]
        expected = [
            {'_id': 'a', 'meta': {'version': 1}},
            {'_id': 'b', 'meta': {'version': 1}},
        ]
        # field_values validates that ALL documents have the exact nested value
        Expect.that(actual).should_resemble(expected).with_schema({
            'count': 2,
            'required_fields': ['_id', 'meta'],
            'field_values': {'meta': {'version': 1}}
        })

    def test_complex_nested_field_values_mismatch(self):
        """Should fail with mismatched nested field values."""
        actual = [
            {'_id': '1', 'meta': {'version': 2}},  # version is 2, not 1
        ]
        expected = [
            {'_id': 'a', 'meta': {'version': 1}},
        ]
        with self.assertRaises(AssertionError) as cm:
            Expect.that(actual).should_resemble(expected).with_schema({
                'count': 1,
                'field_values': {'meta': {'version': 1}}
            })
        self.assertIn("meta", str(cm.exception))

    # ==================== Expected Output Formats ====================

    def test_format_array_as_expected_output(self):
        """Should accept array as expected output."""
        actual = [{'name': 'A'}, {'name': 'B'}, {'name': 'C'}]
        expected = [{'name': 'X'}, {'name': 'Y'}, {'name': 'Z'}]
        Expect.that(actual).should_resemble(expected).with_schema({
            'count': 3,
            'required_fields': ['name']
        })

    def test_format_single_dict_as_expected_output(self):
        """Should accept single dict as expected output (treated as single-doc list)."""
        actual = {'name': 'Alice', 'age': 30}
        expected = {'name': 'Bob', 'age': 25}
        Expect.that(actual).should_resemble(expected).with_schema({
            'count': 1,
            'required_fields': ['name', 'age']
        })

    # ==================== Dot Notation and Nested Array Tests ====================

    def test_dot_notation_required_fields(self):
        """Should validate required fields using dot notation for nested paths."""
        actual = [
            {'queryPlanner': {'winningPlan': {'stage': 'COLLSCAN'}}, 'year': 2012},
            {'queryPlanner': {'winningPlan': {'stage': 'IXSCAN'}}, 'year': 2012}
        ]
        expected = [
            {'queryPlanner': {'winningPlan': {'stage': 'FETCH'}}, 'year': 2012},
            {'queryPlanner': {'winningPlan': {'stage': 'FETCH'}}, 'year': 2012}
        ]
        Expect.that(actual).should_resemble(expected).with_schema({
            'count': 2,
            'required_fields': ['queryPlanner.winningPlan.stage', 'year']
        })

    def test_dot_notation_required_fields_missing(self):
        """Should fail when nested required field is missing."""
        actual = [
            {'queryPlanner': {'winningPlan': {}}, 'year': 2012}  # Missing 'stage'
        ]
        expected = [
            {'queryPlanner': {'winningPlan': {'stage': 'FETCH'}}, 'year': 2012}
        ]
        with self.assertRaises(AssertionError) as cm:
            Expect.that(actual).should_resemble(expected).with_schema({
                'count': 1,
                'required_fields': ['queryPlanner.winningPlan.stage']
            })
        self.assertIn("actual", str(cm.exception))
        self.assertIn("queryPlanner.winningPlan.stage", str(cm.exception))

    def test_dot_notation_field_values(self):
        """Should validate field values using dot notation for nested paths."""
        actual = [
            {'queryPlanner': {'winningPlan': {'stage': 'COLLSCAN'}}}
        ]
        expected = [
            {'queryPlanner': {'winningPlan': {'stage': 'COLLSCAN'}}}
        ]
        Expect.that(actual).should_resemble(expected).with_schema({
            'count': 1,
            'required_fields': ['queryPlanner.winningPlan.stage'],
            'field_values': {'queryPlanner.winningPlan.stage': 'COLLSCAN'}
        })

    def test_dot_notation_field_values_mismatch(self):
        """Should fail when nested field value does not match."""
        actual = [
            {'queryPlanner': {'winningPlan': {'stage': 'IXSCAN'}}}  # Different stage
        ]
        expected = [
            {'queryPlanner': {'winningPlan': {'stage': 'COLLSCAN'}}}
        ]
        with self.assertRaises(AssertionError) as cm:
            Expect.that(actual).should_resemble(expected).with_schema({
                'count': 1,
                'required_fields': ['queryPlanner.winningPlan.stage'],
                'field_values': {'queryPlanner.winningPlan.stage': 'COLLSCAN'}
            })
        self.assertIn("actual", str(cm.exception))
        self.assertIn("queryPlanner.winningPlan.stage", str(cm.exception))
        self.assertIn("IXSCAN", str(cm.exception))
        self.assertIn("COLLSCAN", str(cm.exception))

    def test_array_indexing_required_fields(self):
        """Should validate required fields using array indexing."""
        actual = [
            {'stages': [{'name': 'first'}, {'name': 'second'}]}
        ]
        expected = [
            {'stages': [{'name': 'alpha'}, {'name': 'beta'}]}
        ]
        Expect.that(actual).should_resemble(expected).with_schema({
            'count': 1,
            'required_fields': ['stages[0].name', 'stages[1].name']
        })

    def test_array_indexing_required_fields_missing(self):
        """Should fail when array element is missing."""
        actual = [
            {'stages': [{'name': 'first'}]}  # Missing stages[1]
        ]
        expected = [
            {'stages': [{'name': 'alpha'}, {'name': 'beta'}]}
        ]
        with self.assertRaises(AssertionError) as cm:
            Expect.that(actual).should_resemble(expected).with_schema({
                'count': 1,
                'required_fields': ['stages[0].name', 'stages[1].name']
            })
        self.assertIn("actual", str(cm.exception))
        self.assertIn("stages[1].name", str(cm.exception))

    def test_array_indexing_field_values(self):
        """Should validate field values using array indexing."""
        actual = [
            {'stages': [{'$cursor': {'queryPlanner': {'winningPlan': {'stage': 'IXSCAN'}}}}]}
        ]
        expected = [
            {'stages': [{'$cursor': {'queryPlanner': {'winningPlan': {'stage': 'IXSCAN'}}}}]}
        ]
        Expect.that(actual).should_resemble(expected).with_schema({
            'count': 1,
            'required_fields': ['stages[0].$cursor.queryPlanner.winningPlan.stage'],
            'field_values': {'stages[0].$cursor.queryPlanner.winningPlan.stage': 'IXSCAN'}
        })

    def test_combined_dot_notation_and_array_indexing(self):
        """Should handle combined dot notation and array indexing paths."""
        actual = [
            {
                'explainVersion': '1',
                'stages': [
                    {
                        '$cursor': {
                            'queryPlanner': {
                                'winningPlan': {
                                    'stage': 'FETCH',
                                    'inputStage': {'stage': 'IXSCAN'}
                                }
                            }
                        }
                    }
                ]
            }
        ]
        expected = [
            {
                'explainVersion': '1',
                'stages': [
                    {
                        '$cursor': {
                            'queryPlanner': {
                                'winningPlan': {
                                    'stage': 'FETCH',
                                    'inputStage': {'stage': 'IXSCAN'}
                                }
                            }
                        }
                    }
                ]
            }
        ]
        Expect.that(actual).should_resemble(expected).with_schema({
            'count': 1,
            'required_fields': [
                'explainVersion',
                'stages[0].$cursor.queryPlanner.winningPlan.stage',
                'stages[0].$cursor.queryPlanner.winningPlan.inputStage.stage'
            ],
            'field_values': {
                'explainVersion': '1',
                'stages[0].$cursor.queryPlanner.winningPlan.stage': 'FETCH',
                'stages[0].$cursor.queryPlanner.winningPlan.inputStage.stage': 'IXSCAN'
            }
        })

    def test_multi_dimensional_array_indexing(self):
        """Should handle multi-dimensional array indexing like arr[0][1]."""
        actual = [
            {'matrix': [[1, 2, 3], [4, 5, 6]]}
        ]
        expected = [
            {'matrix': [[1, 2, 3], [4, 5, 6]]}
        ]
        Expect.that(actual).should_resemble(expected).with_schema({
            'count': 1,
            'required_fields': ['matrix[0][0]', 'matrix[1][2]'],
            'field_values': {'matrix[0][0]': 1, 'matrix[1][2]': 6}
        })

    def test_simple_field_still_works(self):
        """Should still work with simple (non-nested) field names."""
        actual = [{'name': 'Alice', 'age': 30}]
        expected = [{'name': 'Alice', 'age': 25}]  # Same name, different age
        Expect.that(actual).should_resemble(expected).with_schema({
            'count': 1,
            'required_fields': ['name', 'age'],
            'field_values': {'name': 'Alice'}  # Validates both actual and expected have name='Alice'
        })

    def test_mixed_simple_and_nested_fields(self):
        """Should handle mix of simple and nested field paths."""
        actual = [
            {
                'title': 'Test Movie',
                'year': 2012,
                'metadata': {'director': 'John Doe', 'rating': 8.5}
            }
        ]
        expected = [
            {
                'title': 'Other Movie',
                'year': 2012,
                'metadata': {'director': 'Jane Doe', 'rating': 8.5}
            }
        ]
        Expect.that(actual).should_resemble(expected).with_schema({
            'count': 1,
            'required_fields': ['title', 'year', 'metadata.director', 'metadata.rating'],
            'field_values': {'year': 2012, 'metadata.rating': 8.5}
        })


class TestPathParsing(unittest.TestCase):
    """Test the internal path parsing functions."""

    def test_parse_simple_field(self):
        """Should parse simple field name."""
        from utils.comparison.expect import _parse_field_path
        parts = _parse_field_path('name')
        self.assertEqual(len(parts), 1)
        self.assertEqual(parts[0].field_name, 'name')
        self.assertFalse(parts[0].is_array_index)

    def test_parse_dot_notation(self):
        """Should parse dot notation path."""
        from utils.comparison.expect import _parse_field_path
        parts = _parse_field_path('queryPlanner.winningPlan.stage')
        self.assertEqual(len(parts), 3)
        self.assertEqual(parts[0].field_name, 'queryPlanner')
        self.assertEqual(parts[1].field_name, 'winningPlan')
        self.assertEqual(parts[2].field_name, 'stage')

    def test_parse_array_indexing(self):
        """Should parse array indexing."""
        from utils.comparison.expect import _parse_field_path
        parts = _parse_field_path('stages[0]')
        self.assertEqual(len(parts), 2)
        self.assertEqual(parts[0].field_name, 'stages')
        self.assertTrue(parts[1].is_array_index)
        self.assertEqual(parts[1].array_index, 0)

    def test_parse_combined_path(self):
        """Should parse combined dot notation and array indexing."""
        from utils.comparison.expect import _parse_field_path
        parts = _parse_field_path('stages[0].$cursor.queryPlanner')
        self.assertEqual(len(parts), 4)
        self.assertEqual(parts[0].field_name, 'stages')
        self.assertTrue(parts[1].is_array_index)
        self.assertEqual(parts[1].array_index, 0)
        self.assertEqual(parts[2].field_name, '$cursor')
        self.assertEqual(parts[3].field_name, 'queryPlanner')

    def test_parse_multi_dimensional_array(self):
        """Should parse multi-dimensional array indexing."""
        from utils.comparison.expect import _parse_field_path
        parts = _parse_field_path('matrix[0][1]')
        self.assertEqual(len(parts), 3)
        self.assertEqual(parts[0].field_name, 'matrix')
        self.assertTrue(parts[1].is_array_index)
        self.assertEqual(parts[1].array_index, 0)
        self.assertTrue(parts[2].is_array_index)
        self.assertEqual(parts[2].array_index, 1)


class TestNestedValueRetrieval(unittest.TestCase):
    """Test the internal nested value retrieval function."""

    def test_get_simple_field(self):
        """Should get simple field value."""
        from utils.comparison.expect import _try_get_nested_value
        doc = {'name': 'Alice'}
        found, value = _try_get_nested_value(doc, 'name')
        self.assertTrue(found)
        self.assertEqual(value, 'Alice')

    def test_get_nested_field(self):
        """Should get nested field value using dot notation."""
        from utils.comparison.expect import _try_get_nested_value
        doc = {'queryPlanner': {'winningPlan': {'stage': 'COLLSCAN'}}}
        found, value = _try_get_nested_value(doc, 'queryPlanner.winningPlan.stage')
        self.assertTrue(found)
        self.assertEqual(value, 'COLLSCAN')

    def test_get_array_element(self):
        """Should get array element value."""
        from utils.comparison.expect import _try_get_nested_value
        doc = {'stages': [{'name': 'first'}, {'name': 'second'}]}
        found, value = _try_get_nested_value(doc, 'stages[0].name')
        self.assertTrue(found)
        self.assertEqual(value, 'first')

    def test_get_combined_path(self):
        """Should get value using combined path."""
        from utils.comparison.expect import _try_get_nested_value
        doc = {'stages': [{'$cursor': {'queryPlanner': {'winningPlan': {'stage': 'IXSCAN'}}}}]}
        found, value = _try_get_nested_value(doc, 'stages[0].$cursor.queryPlanner.winningPlan.stage')
        self.assertTrue(found)
        self.assertEqual(value, 'IXSCAN')

    def test_missing_field_returns_false(self):
        """Should return False for missing field."""
        from utils.comparison.expect import _try_get_nested_value
        doc = {'a': {'b': 1}}
        found, value = _try_get_nested_value(doc, 'a.c.d')
        self.assertFalse(found)
        self.assertIsNone(value)

    def test_array_index_out_of_bounds(self):
        """Should return False for out of bounds array index."""
        from utils.comparison.expect import _try_get_nested_value
        doc = {'stages': [{'name': 'first'}]}
        found, value = _try_get_nested_value(doc, 'stages[5].name')
        self.assertFalse(found)
        self.assertIsNone(value)

    def test_multi_dimensional_array(self):
        """Should handle multi-dimensional arrays."""
        from utils.comparison.expect import _try_get_nested_value
        doc = {'matrix': [[1, 2, 3], [4, 5, 6]]}
        found, value = _try_get_nested_value(doc, 'matrix[1][2]')
        self.assertTrue(found)
        self.assertEqual(value, 6)


if __name__ == "__main__":
    unittest.main()
