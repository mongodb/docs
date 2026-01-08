"""
Tests to verify PyMongo handles mixing property-level and document-level ellipsis.
This feature was added to mongosh in commit 67d16af07bc.
Using QUOTED ellipsis to isolate this feature from unquoted ellipsis support.
"""

import unittest
import tempfile
import os

from utils.comparison import Expect
from utils.comparison.parser import parse_expected_content


class TestMixedEllipsisLevels(unittest.TestCase):
    """Test mixing property-level ellipsis ('...' as value) with document-level ellipsis (standalone '...')."""

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

    def test_property_ellipsis_with_document_ellipsis(self):
        """Test mixing property-level ellipsis ('...' as value) with document-level ellipsis (standalone '...')."""
        # This pattern has:
        # 1. Property-level ellipsis: { _id: '...' } - matches any value for _id
        # 2. Document-level ellipsis: standalone '...' - allows extra fields in all objects
        content = """
{ _id: '...' , name: 'Carl' }
...
{ status: 'active' }
"""

        result, has_global = parse_expected_content(content)

        self.assertIsInstance(result, list)
        self.assertEqual(len(result), 2, "Should have 2 documents (standalone ... is just a marker)")
        self.assertTrue(has_global, "Should detect global ellipsis from standalone '...'")

        first_doc = result[0]
        self.assertEqual(first_doc["_id"], "...", "Property-level ellipsis should be preserved")
        self.assertEqual(first_doc["name"], "Carl")

        second_doc = result[1]
        self.assertEqual(second_doc["status"], "active")

    def test_property_ellipsis_only(self):
        """Test that property-level ellipsis works without document-level ellipsis."""
        content = """{ _id: '...' , name: 'Carl' }"""

        result, has_global = parse_expected_content(content)

        self.assertIsInstance(result, dict)
        self.assertFalse(has_global, "Should NOT have global ellipsis without standalone '...'")

        self.assertEqual(result["_id"], "...")
        self.assertEqual(result["name"], "Carl")

    def test_document_ellipsis_only(self):
        """Test that document-level ellipsis works without property-level ellipsis."""
        content = """
{ name: 'Carl' }
...
{ status: 'active' }
"""

        result, has_global = parse_expected_content(content)

        self.assertIsInstance(result, list)
        self.assertEqual(len(result), 2)
        self.assertTrue(has_global, "Should have global ellipsis from standalone '...'")

        first_doc = result[0]
        self.assertEqual(first_doc["name"], "Carl")

        second_doc = result[1]
        self.assertEqual(second_doc["status"], "active")

    def test_end_to_end_mixed_ellipsis_levels(self):
        """Test end-to-end comparison with mixed ellipsis levels."""
        # Actual output with extra fields
        actual_output = [
            {
                "_id": "507f1f77bcf86cd799439011",
                "name": "Carl",
                "email": "carl@example.com",  # Extra field
                "age": 30  # Extra field
            },
            {
                "status": "active",
                "lastLogin": "2024-01-01"  # Extra field
            }
        ]

        # Expected with property-level ellipsis (_id: '...') AND document-level ellipsis (standalone '...')
        expected_content = """
{ _id: '...' , name: 'Carl' }
...
{ status: 'active' }
"""

        # This should match because:
        # 1. _id: '...' matches any value for _id
        # 2. Standalone '...' allows extra fields (email, age, lastLogin)
        Expect.that(actual_output).should_match(expected_content)

    def test_mixed_ellipsis_in_array(self):
        """Test that mixing works in arrays too."""
        # Note: In PyMongo, '...' inside array is for array-level ellipsis
        # Standalone ... on its own line would be global ellipsis
        content = """[
  { _id: '...' , count: '...' },
  { _id: '...' , count: '...' },
  '...'
]"""

        result, has_global = parse_expected_content(content)

        self.assertIsInstance(result, list)
        self.assertEqual(len(result), 3, "Should have 2 objects + 1 ellipsis string")
        self.assertFalse(has_global, "No standalone ... on its own line, so no global ellipsis")

        first_doc = result[0]
        self.assertEqual(first_doc["_id"], "...")
        self.assertEqual(first_doc["count"], "...")

        second_doc = result[1]
        self.assertEqual(second_doc["_id"], "...")
        self.assertEqual(second_doc["count"], "...")

        # Third element should be the ellipsis string (for array matching)
        self.assertEqual(result[2], "...")

    def test_multiple_truncated_strings_with_ellipsis(self):
        """Test multiple truncated string patterns combined with property ellipsis."""
        content = """{
  _id: '...',
  message: 'Error: Connection failed...',
  summary: 'Processing...',
  status: 'active'
}"""

        result, _ = parse_expected_content(content)

        self.assertIsInstance(result, dict)
        self.assertEqual(result["_id"], "...")
        self.assertEqual(result["message"], "Error: Connection failed...")
        self.assertEqual(result["summary"], "Processing...")
        self.assertEqual(result["status"], "active")

    def test_nested_objects_with_mixed_ellipsis(self):
        """Test nested objects with both property and document level ellipsis."""
        content = """
{
  user: {
    _id: '...',
    name: 'Alice'
  },
  meta: {
    total: 1
  }
}
...
"""

        result, has_global = parse_expected_content(content)

        self.assertIsInstance(result, dict)
        self.assertTrue(has_global)

        self.assertEqual(result["user"]["_id"], "...")
        self.assertEqual(result["user"]["name"], "Alice")
        self.assertEqual(result["meta"]["total"], 1)


if __name__ == "__main__":
    unittest.main()

