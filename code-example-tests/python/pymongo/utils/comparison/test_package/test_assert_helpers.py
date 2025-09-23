"""
Test the assert_helpers module functions, especially the updated assert_expected_file_matches_output
function with ComparisonOptions support.
"""

import unittest
import tempfile
import os
from pathlib import Path

from utils.comparison.assert_helpers import (
    assert_expected_file_matches_output,
    assert_outputs_match,
    assert_matches_expected_file,
    assert_matches_expected_content,
    ComparisonTestCase,
)
from utils.comparison.comparison import ComparisonOptions
from utils.comparison.errors import ComparisonError


class TestAssertHelpers(unittest.TestCase):
    """Test the assert helper functions."""

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

    def test_assert_expected_file_matches_output_text_mode(self):
        """Test basic text comparison without options (backward compatibility)."""
        expected_content = "Hello, world!\nThis is a test."
        actual_output = "Hello, world!\nThis is a test."

        temp_file = self._create_temp_file(expected_content)

        # Should pass with identical content
        assert_expected_file_matches_output(self, temp_file, actual_output)

    def test_assert_expected_file_matches_output_text_mode_failure(self):
        """Test text comparison failure without options."""
        expected_content = "Hello, world!"
        actual_output = "Goodbye, world!"

        temp_file = self._create_temp_file(expected_content)

        # Should fail with different content
        with self.assertRaises(ComparisonError):
            assert_expected_file_matches_output(self, temp_file, actual_output)

    def test_assert_expected_file_matches_output_with_options_basic(self):
        """Test document comparison mode with basic ComparisonOptions."""
        expected_content = """
        {
          "name": "John",
          "age": 30,
          "city": "New York"
        }
        """
        # Actual output as a dictionary (what would come from document normalization)
        actual_output = {"name": "John", "age": 30, "city": "New York"}

        temp_file = self._create_temp_file(expected_content)
        options = ComparisonOptions()

        # Should pass with matching document structure
        assert_expected_file_matches_output(self, temp_file, actual_output, options)

    def test_assert_expected_file_matches_output_with_ignore_fields(self):
        """Test document comparison with ignore_field_values option."""
        expected_content = """
        {
          "_id": "...",
          "name": "John",
          "age": 30
        }
        """
        actual_output = {"_id": "507f1f77bcf86cd799439011", "name": "John", "age": 30}

        temp_file = self._create_temp_file(expected_content)
        options = ComparisonOptions(ignore_field_values={"_id"})

        # Should pass even though _id values differ
        assert_expected_file_matches_output(self, temp_file, actual_output, options)

    def test_assert_expected_file_matches_output_with_mongodb_types(self):
        """Test document comparison with MongoDB types like ObjectId and datetime."""
        expected_content = """
        {
          "_id": ObjectId("507f1f77bcf86cd799439011"),
          "name": "John",
          "created_at": datetime.datetime(2023, 1, 15, 10, 30, 0)
        }
        """
        actual_output = {
            "_id": "507f1f77bcf86cd799439011",
            "name": "John",
            "created_at": "2023-01-15T10:30:00.000Z",
        }

        temp_file = self._create_temp_file(expected_content)
        options = ComparisonOptions()

        # Should pass with MongoDB type normalization
        assert_expected_file_matches_output(self, temp_file, actual_output, options)

    def test_assert_expected_file_matches_output_with_arrays(self):
        """Test document comparison with array data."""
        expected_content = """
        [
          {
            "name": "John",
            "scores": [85, 92, 78]
          },
          {
            "name": "Jane", 
            "scores": [95, 88, 91]
          }
        ]
        """
        actual_output = [
            {"name": "John", "scores": [85, 92, 78]},
            {"name": "Jane", "scores": [95, 88, 91]},
        ]

        temp_file = self._create_temp_file(expected_content)
        options = ComparisonOptions()

        # Should pass with array comparison
        assert_expected_file_matches_output(self, temp_file, actual_output, options)

    def test_assert_expected_file_matches_output_with_ellipsis(self):
        """Test document comparison with ellipsis patterns."""
        expected_content = """
        ...
        {
          "name": "John",
          "age": 30
        }
        """
        actual_output = {
            "name": "John",
            "age": 30,
            "city": "New York",
            "country": "USA",
        }

        temp_file = self._create_temp_file(expected_content)
        options = ComparisonOptions()

        # Should pass with global ellipsis allowing extra fields
        assert_expected_file_matches_output(self, temp_file, actual_output, options)

    def test_assert_expected_file_matches_output_comparison_failure(self):
        """Test document comparison failure with options."""
        expected_content = """
        {
          "name": "John",
          "age": 30
        }
        """
        actual_output = {"name": "Jane", "age": 25}  # Different data

        temp_file = self._create_temp_file(expected_content)
        options = ComparisonOptions()

        # Should fail with mismatched data
        with self.assertRaises(ComparisonError):
            assert_expected_file_matches_output(self, temp_file, actual_output, options)

    def test_assert_expected_file_matches_output_path_object(self):
        """Test that the function accepts Path objects as well as strings."""
        expected_content = "Test content"
        actual_output = "Test content"

        temp_file = self._create_temp_file(expected_content)
        temp_path = Path(temp_file)

        # Should work with Path object
        assert_expected_file_matches_output(self, temp_path, actual_output)

        # Should also work with Path object and options (will fall back to text comparison for plain text)
        options = ComparisonOptions()
        assert_expected_file_matches_output(self, temp_path, actual_output, options)

    def test_assert_expected_file_matches_output_with_complex_options(self):
        """Test document comparison with multiple option settings."""
        expected_content = """
        ...
        {
          "_id": "...",
          "metadata": {
            "created_by": "...",
            "process_id": "..."
          },
          "data": {
            "items": [1, 2, 3],
            "status": "complete"
          }
        }
        """
        actual_output = {
            "_id": "507f1f77bcf86cd799439011",
            "metadata": {
                "created_by": "system",
                "process_id": "12345",
                "extra_field": "should_be_ignored",
            },
            "data": {"items": [1, 2, 3], "status": "complete"},
        }

        temp_file = self._create_temp_file(expected_content)
        options = ComparisonOptions(
            ignore_field_values={"_id", "created_by", "process_id"}, timeout_seconds=60
        )

        # Should pass with multiple ignore fields and custom timeout
        # The global ellipsis should allow extra fields like extra_field
        assert_expected_file_matches_output(self, temp_file, actual_output, options)


class TestAssertHelpersCompatibility(unittest.TestCase):
    """Test backward compatibility and interaction with other assert helpers."""

    def test_assert_outputs_match_still_works(self):
        """Ensure assert_outputs_match still works as before."""
        expected = "Hello, world!\nLine 2"
        actual = "Hello, world!\nLine 2"

        # Should not raise any exception
        assert_outputs_match(self, expected, actual)

        # Should raise ComparisonError for mismatched content
        with self.assertRaises(ComparisonError):
            assert_outputs_match(self, expected, "Different content")

    def test_comparison_test_case_still_works(self):
        """Ensure ComparisonTestCase methods still work."""

        class TestCaseImpl(ComparisonTestCase):
            def run_test(self):
                # Test assertMatchesExpectedContent
                self.assertMatchesExpectedContent('{"name": "John"}', {"name": "John"})

                # Test with options
                options = ComparisonOptions(ignore_field_values={"_id"})
                self.assertMatchesExpectedContent(
                    '{"_id": "...", "name": "John"}',
                    {"_id": "12345", "name": "John"},
                    options,
                )

        test_instance = TestCaseImpl()
        test_instance.run_test()  # Should not raise any exceptions


class TestAssertHelpersEdgeCases(unittest.TestCase):
    """Test edge cases and error conditions."""

    def setUp(self):
        self.temp_dir = tempfile.mkdtemp()

    def tearDown(self):
        import shutil

        shutil.rmtree(self.temp_dir)

    def _create_temp_file(self, content: str, filename: str = "test.txt") -> str:
        file_path = os.path.join(self.temp_dir, filename)
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(content)
        return file_path

    def test_empty_file_content(self):
        """Test behavior with empty file content."""
        temp_file = self._create_temp_file("")
        actual_output = ""

        # Should pass with both empty
        assert_expected_file_matches_output(self, temp_file, actual_output)

        # Should also work with options (will fall back to text comparison for empty strings)
        options = ComparisonOptions()
        assert_expected_file_matches_output(self, temp_file, actual_output, options)

    def test_file_with_whitespace_only(self):
        """Test behavior with whitespace-only file content."""
        temp_file = self._create_temp_file("   \n\n   \t  ")
        actual_output = ""

        # Text comparison might be strict about whitespace
        with self.assertRaises(ComparisonError):
            assert_expected_file_matches_output(self, temp_file, actual_output)

        # Document comparison should handle empty/whitespace more gracefully
        options = ComparisonOptions()
        # This might pass or fail depending on how parser handles whitespace-only content
        try:
            assert_expected_file_matches_output(self, temp_file, actual_output, options)
        except ComparisonError:
            # Either outcome is acceptable for edge case
            pass

    def test_nonexistent_file(self):
        """Test behavior with nonexistent file."""
        nonexistent_path = "/path/that/does/not/exist.txt"

        with self.assertRaises(FileNotFoundError):
            assert_expected_file_matches_output(self, nonexistent_path, "content")

    def test_malformed_json_in_file_with_options(self):
        """Test behavior with malformed JSON when using options."""
        malformed_content = '{"name": "John", "age":}'  # Missing value
        temp_file = self._create_temp_file(malformed_content)
        actual_output = '{"name": "John", "age":}'  # Same malformed content

        options = ComparisonOptions()

        # Should fall back to text comparison and pass with identical malformed content
        assert_expected_file_matches_output(self, temp_file, actual_output, options)

        # Should fail with different content
        different_output = '{"name": "Jane", "age":}'
        with self.assertRaises(ComparisonError):
            assert_expected_file_matches_output(
                self, temp_file, different_output, options
            )


if __name__ == "__main__":
    unittest.main()
