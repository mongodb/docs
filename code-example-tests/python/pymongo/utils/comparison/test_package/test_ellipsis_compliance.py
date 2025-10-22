"""
Test ellipsis handling in all assert helpers regardless of whether ComparisonOptions are provided.
This verifies compliance with the comparison-spec.md requirements.
"""

import unittest
import tempfile
import os
from pathlib import Path

from utils.comparison import Expect
from utils.comparison.errors import ComparisonError


class TestEllipsisHandlingInAssertHelpers(unittest.TestCase):
    """Test that all ellipsis patterns work in all assert helpers without requiring ComparisonOptions."""

    def setUp(self):
        """Set up temporary files for testing."""
        self.temp_dir = tempfile.mkdtemp()

    def tearDown(self):
        """Clean up temporary files."""
        import shutil

        shutil.rmtree(self.temp_dir)

    def _create_temp_file(
        self, content: str, filename: str = "test_expected.txt"
    ) -> str:
        """Create a temporary file with the given content."""
        file_path = os.path.join(self.temp_dir, filename)
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(content)
        return file_path


class TestPropertyLevelEllipsis(TestEllipsisHandlingInAssertHelpers):
    """Test property-level ellipsis patterns according to spec section 3.2.1."""

    def test_exact_ellipsis_assert_expected_file_matches_output_no_options(self):
        """Test that {_id: "..."} matches any value without options."""
        expected_content = """
        {
          "_id": "...",
          "name": "John",
          "age": 30
        }
        """
        actual_output = {"_id": "507f1f77bcf86cd799439011", "name": "John", "age": 30}

        temp_file = self._create_temp_file(expected_content)

        # Should work without options
        Expect.that(actual_output).should_match(temp_file)

    def test_exact_ellipsis_assert_matches_expected_content_no_options(self):
        """Test that assert_matches_expected_content handles exact ellipsis without options."""
        expected_content = """
        {
          "_id": "...",
          "status": "...",
          "name": "John"
        }
        """
        actual_value = {
            "_id": "507f1f77bcf86cd799439011",
            "status": "active",
            "name": "John",
        }

        # Should work without options
        Expect.that(actual_value).should_match(expected_content)

    def test_truncated_string_ellipsis(self):
        """Test that truncated strings with ellipsis work across all helpers."""
        expected_content = """
        {
          "message": "Error: Connection failed...",
          "code": 500
        }
        """
        actual_value = {
            "message": "Error: Connection failed after 3 retries with timeout",
            "code": 500,
        }

        # Test with Expect.that (no options)
        Expect.that(actual_value).should_match(expected_content)

        # Test with file comparison (no options)
        temp_file = self._create_temp_file(expected_content)
        Expect.that(actual_value).should_match(temp_file)


class TestArrayLevelEllipsis(TestEllipsisHandlingInAssertHelpers):
    """Test array-level ellipsis patterns according to spec section 3.2.2."""

    def test_full_array_wildcard_no_options(self):
        """Test that ["..."] matches any array without options."""
        expected_content = '["..."]'
        actual_value = [1, 2, 3, "anything", {"nested": "object"}]

        # Should work without options
        Expect.that(actual_value).should_match(expected_content)

        # Test with file
        temp_file = self._create_temp_file(expected_content)
        Expect.that(actual_value).should_match(temp_file)

    def test_array_with_ellipsis_gaps_no_options(self):
        """Test that [1, "...", 5] matches arrays with gaps without options."""
        expected_content = '[1, "...", 5]'
        actual_value = [1, 2, 3, 4, 5]

        # Should work without options
        Expect.that(actual_value).should_match(expected_content)

        # Test with file
        temp_file = self._create_temp_file(expected_content)
        Expect.that(actual_value).should_match(temp_file)

    def test_mixed_array_with_ellipsis_no_options(self):
        """Test arrays with mixed content and ellipsis without options."""
        expected_content = """
        [
          {"name": "Alice"},
          "...",
          {"name": "Bob"}
        ]
        """
        actual_value = [
            {"name": "Alice"},
            {"name": "Charlie", "age": 25},
            {"name": "David", "city": "NYC"},
            {"name": "Bob"},
        ]

        # Should work without options
        Expect.that(actual_value).should_match(expected_content)


class TestObjectLevelEllipsis(TestEllipsisHandlingInAssertHelpers):
    """Test object-level ellipsis patterns according to spec section 3.2.3."""

    def test_object_wildcard_no_options(self):
        """Test that {"...": "..."} matches any object without options."""
        expected_content = '{"...": "..."}'
        actual_value = {
            "any": "object",
            "with": "any",
            "properties": True,
            "nested": {"data": 123},
        }

        # Should work without options
        Expect.that(actual_value).should_match(expected_content)

        # Test with file
        temp_file = self._create_temp_file(expected_content)
        Expect.that(actual_value).should_match(temp_file)


class TestGlobalEllipsis(TestEllipsisHandlingInAssertHelpers):
    """Test global ellipsis patterns according to spec section 3.1."""

    def test_global_ellipsis_allows_extra_fields_no_options(self):
        """Test that global ellipsis allows extra fields without options."""
        expected_content = """
        ...
        {
          "name": "Alice",
          "department": "Engineering"
        }
        """
        actual_value = {
            "name": "Alice",
            "department": "Engineering",
            "employee_id": "E12345",  # Extra field
            "start_date": "2022-03-01",  # Extra field
            "manager": "Bob Smith",  # Extra field
        }

        # Should work without options
        Expect.that(actual_value).should_match(expected_content)

        # Test with file
        temp_file = self._create_temp_file(expected_content)
        Expect.that(actual_value).should_match(temp_file)

    def test_global_ellipsis_with_nested_structures_no_options(self):
        """Test global ellipsis with complex nested structures without options."""
        expected_content = """
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
        """
        actual_value = {
            "users": [
                {
                    "name": "John",
                    "age": 30,
                    "id": "user123",  # Extra field
                    "created_at": "2023-01-01",  # Extra field
                }
            ],
            "meta": {"total": 1, "page": 1, "limit": 10},  # Extra field  # Extra field
            "request_id": "req-456",  # Extra field at top level
            "timestamp": "2023-01-01T10:00:00Z",  # Extra field at top level
        }

        # Should work without options
        Expect.that(actual_value).should_match(expected_content)


class TestComplexEllipsisPatterns(TestEllipsisHandlingInAssertHelpers):
    """Test complex combinations of ellipsis patterns."""

    def test_multiple_ellipsis_types_combined_no_options(self):
        """Test combining different ellipsis types without options."""
        expected_content = """
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
        """
        actual_value = {
            "_id": "507f1f77bcf86cd799439011",
            "users": [
                {
                    "name": "Alice",
                    "profile": {
                        "age": 25,
                        "city": "NYC",
                        "preferences": {"theme": "dark"},
                    },
                },
                {"name": "Charlie", "email": "charlie@example.com"},
                {"name": "David", "phone": "123-456-7890"},
                {"name": "Bob", "email": "bob@example.com"},
            ],
            "message": "Processing completed successfully with 0 errors",
            "stats": {"processed": 100, "errors": 0, "warnings": 2},
            "server_id": "srv-001",
            "timestamp": "2023-01-01T10:00:00Z",
        }

        # Should work without options
        Expect.that(actual_value).should_match(expected_content)


class TestExpectAPIEllipsis(TestEllipsisHandlingInAssertHelpers):
    """Test ellipsis handling in the Expect API."""

    def test_expect_api_ellipsis_no_options(self):
        """Test that the Expect API handles ellipsis without options."""
        # Property-level ellipsis
        Expect.that({"_id": "507f1f77bcf86cd799439011", "name": "John"}).should_match(
            '{"_id": "...", "name": "John"}'
        )

        # Array-level ellipsis
        Expect.that([1, 2, 3, "anything"]).should_match('["..."]')

        # Global ellipsis
        Expect.that({"name": "Alice", "extra": "field"}).should_match(
            '...\n{"name": "Alice"}'
        )

    def test_expect_api_with_structured_ellipsis(self):
        """Test that the Expect API handles structured content with ellipsis."""
        expected_text = """{"_id": "...", "name": "John", "age": 30}"""
        actual_data = {"_id": "507f1f77bcf86cd799439011", "name": "John", "age": 30}

        # Should work with Expect API
        Expect.that(actual_data).should_match(expected_text)


if __name__ == "__main__":
    unittest.main()
