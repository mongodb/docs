import unittest

from utils.comparison.parser import parse_expected_content
from utils.comparison.normalize import normalize_for_comparison


class TestParserAndNormalize(unittest.TestCase):
    def test_single_quotes_and_unquoted_keys(self):
        content = """
        // comment
        { _id: ObjectId('507f1f77bcf86cd799439011'), 'name': 'John', created: Date('2021-12-18T15:55:00Z') }
        """
        value, has_global = parse_expected_content(content)
        self.assertFalse(has_global)
        self.assertIsInstance(value, (dict, list))
        # If wrapped into array (single block), handle both cases
        doc = value[0] if isinstance(value, list) else value
        self.assertEqual(doc["_id"], "507f1f77bcf86cd799439011")
        self.assertEqual(doc["name"], "John")
        self.assertEqual(doc["created"], "2021-12-18T15:55:00.000Z")

    def test_global_ellipsis(self):
        content = """
        ...
        { a: 1 }
        """
        value, has_global = parse_expected_content(content)
        self.assertTrue(has_global)
        doc = value[0] if isinstance(value, list) else value
        self.assertEqual(doc["a"], 1)

    def test_normalize_dates(self):
        iso = normalize_for_comparison("2021-12-18T15:55:00Z")
        self.assertEqual(iso, "2021-12-18T15:55:00.000Z")

    def test_standalone_ellipsis_at_field_level_indicates_omitted_fields(self):
        """
        Writer scenario: using `...` at the end of a document to indicate more fields are omitted.
        This pattern should be converted to `"...": "..."` for the comparison engine.
        """
        content = """
        {
            "nErrors": 0,
            "ok": 1,
            ...
        }
        """
        value, has_global = parse_expected_content(content)
        # The standalone `...` at field level should be parsed as a document with ellipsis marker
        doc = value[0] if isinstance(value, list) else value
        self.assertEqual(doc["nErrors"], 0)
        self.assertEqual(doc["ok"], 1)
        self.assertIn("...", doc, "Should contain ellipsis marker for omitted fields")


if __name__ == "__main__":
    unittest.main()
