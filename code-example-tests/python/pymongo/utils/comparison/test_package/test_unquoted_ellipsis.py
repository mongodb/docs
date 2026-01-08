"""
Tests to verify PyMongo handles unquoted ellipsis patterns similar to mongosh commit 67d16af07bc.
This commit added support for:
1. Unquoted ellipsis as property values: { _id: ... , count: ... }
2. Mixing property-level and document-level ellipsis
3. Preserving ellipsis inside quoted strings (not treating them as markers)
"""

import unittest
import tempfile
import os

from utils.comparison import Expect
from utils.comparison.parser import parse_expected_content


class TestUnquotedEllipsisPatterns(unittest.TestCase):
    """Test that PyMongo handles unquoted ellipsis like mongosh and C#."""

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

    def test_unquoted_ellipsis_as_property_value(self):
        """Test that unquoted ellipsis as property values are parsed correctly."""
        # This is the exact pattern from mongosh commit 67d16af07bc
        content = """[
  { _id: ... , count: ... },
  { _id: ... , count: ... }
]"""

        result, has_global = parse_expected_content(content)

        self.assertIsInstance(result, list)
        self.assertEqual(len(result), 2)
        self.assertFalse(has_global)

        first_doc = result[0]
        self.assertIsInstance(first_doc, dict)
        self.assertEqual(first_doc["_id"], "...")
        self.assertEqual(first_doc["count"], "...")

    def test_mixed_property_and_array_ellipsis(self):
        """Test mixing property-level ellipsis with array-level ellipsis."""
        # In PyMongo, standalone ... on its own line is treated as global ellipsis (document-level)
        # For array-level ellipsis, use quoted "..." inside the array
        content = """[
  { _id: ... , count: ... },
  { _id: ... , count: ... },
  "..."
]"""

        result, has_global = parse_expected_content(content)

        self.assertIsInstance(result, list)
        # Should have 3 elements: two objects and the ellipsis string
        self.assertEqual(len(result), 3)
        self.assertFalse(has_global)  # No standalone ... on its own line

        first_doc = result[0]
        self.assertEqual(first_doc["_id"], "...")
        self.assertEqual(first_doc["count"], "...")

        second_doc = result[1]
        self.assertEqual(second_doc["_id"], "...")
        self.assertEqual(second_doc["count"], "...")

        # Third element should be the ellipsis marker for array matching
        self.assertEqual(result[2], "...")

    def test_quoted_and_unquoted_ellipsis_are_equivalent(self):
        """Test that both quoted and unquoted ellipsis work equivalently."""
        unquoted_content = """{ _id: ... , count: ... }"""
        quoted_content = """{ _id: '...' , count: '...' }"""

        unquoted_result, _ = parse_expected_content(unquoted_content)
        quoted_result, _ = parse_expected_content(quoted_content)

        self.assertIsInstance(unquoted_result, dict)
        self.assertIsInstance(quoted_result, dict)

        self.assertEqual(unquoted_result["_id"], quoted_result["_id"])
        self.assertEqual(unquoted_result["count"], quoted_result["count"])
        self.assertEqual(unquoted_result["_id"], "...")

    def test_ellipsis_inside_strings_preserved(self):
        """Test that ellipsis inside quoted strings are NOT treated as truncation markers."""
        # This tests the critical case from mongosh commit fbccfb5c64bb
        content = """{
  plot: 'What do you love the most?", "What scares you the most?",...',
  _id: ...,
  title: 'Test Movie'
}"""

        result, has_global = parse_expected_content(content)

        self.assertIsInstance(result, dict)

        # The plot should preserve the ellipsis inside the string
        self.assertIn(',...', result["plot"])
        self.assertEqual(result["plot"], 'What do you love the most?", "What scares you the most?",...')

        # The _id should be converted to "..."
        self.assertEqual(result["_id"], "...")
        self.assertEqual(result["title"], "Test Movie")

    def test_property_ellipsis_with_global_ellipsis(self):
        """Test mixing property-level ellipsis with document-level ellipsis (global ellipsis)."""
        content = """
{ _id: ... , name: 'Carl' }
...
{ status: 'active' }
"""

        result, has_global = parse_expected_content(content)

        self.assertIsInstance(result, list)
        self.assertEqual(len(result), 2)
        self.assertTrue(has_global)

        first_doc = result[0]
        self.assertEqual(first_doc["_id"], "...")
        self.assertEqual(first_doc["name"], "Carl")

        second_doc = result[1]
        self.assertEqual(second_doc["status"], "active")

    def test_end_to_end_comparison_with_unquoted_ellipsis(self):
        """Test end-to-end comparison with unquoted ellipsis patterns."""
        # Simulate actual output from MongoDB
        actual_output = [
            {"_id": "507f1f77bcf86cd799439011", "count": 42},
            {"_id": "507f1f77bcf86cd799439012", "count": 17}
        ]

        # Expected output with unquoted ellipsis
        expected_content = """[
  { _id: ... , count: 42 },
  { _id: ... , count: 17 }
]"""

        Expect.that(actual_output).should_match(expected_content)

    def test_unquoted_ellipsis_in_nested_objects(self):
        """Test unquoted ellipsis in nested object structures."""
        content = """{
  user: {
    _id: ...,
    name: 'Alice'
  },
  timestamp: ...
}"""

        result, _ = parse_expected_content(content)

        self.assertIsInstance(result, dict)
        self.assertIsInstance(result["user"], dict)
        self.assertEqual(result["user"]["_id"], "...")
        self.assertEqual(result["user"]["name"], "Alice")
        self.assertEqual(result["timestamp"], "...")


if __name__ == "__main__":
    unittest.main()

