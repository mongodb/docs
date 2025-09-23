"""
Tests for datetime.datetime() constructor parsing and real-world PyMongo example integration.
"""

import unittest
from datetime import datetime, timezone

from utils.comparison.parser import parse_expected_content
from utils.comparison.comparison import compare_documents, ComparisonOptions
from utils.comparison.assert_helpers import ComparisonTestCase


class TestDatetimeParsing(ComparisonTestCase):
    """Test datetime.datetime() constructor parsing and normalization."""

    def test_basic_datetime_parsing(self):
        """Test basic datetime.datetime() constructor parsing."""
        content = "datetime.datetime(1998, 12, 26, 13, 13, 55)"
        parsed, has_global = parse_expected_content(content)

        # Should parse to normalized ISO string
        expected_iso = "1998-12-26T13:13:55.000Z"
        self.assertEqual(parsed, expected_iso)
        self.assertFalse(has_global)

    def test_datetime_with_microseconds(self):
        """Test datetime with microseconds (6th argument)."""
        content = "datetime.datetime(2021, 5, 12, 23, 14, 30, 123456)"
        parsed, has_global = parse_expected_content(content)

        # Should parse to normalized ISO string with millisecond precision
        expected_iso = "2021-05-12T23:14:30.123Z"
        self.assertEqual(parsed, expected_iso)

    def test_datetime_minimal_args(self):
        """Test datetime with minimal arguments (year, month, day only)."""
        content = "datetime.datetime(1972, 1, 13)"
        parsed, has_global = parse_expected_content(content)

        expected_iso = "1972-01-13T00:00:00.000Z"
        self.assertEqual(parsed, expected_iso)

    def test_datetime_with_time_args(self):
        """Test datetime with hour, minute, second."""
        content = "datetime.datetime(1985, 5, 12, 23, 14, 30)"
        parsed, has_global = parse_expected_content(content)

        expected_iso = "1985-05-12T23:14:30.000Z"
        self.assertEqual(parsed, expected_iso)

    def test_datetime_in_dict(self):
        """Test datetime.datetime() inside a dictionary."""
        content = """
        {
          "person_id": "7363626383",
          "firstname": "Carl",
          "dateofbirth": datetime.datetime(1998, 12, 26, 13, 13, 55),
          "vocation": "ENGINEER"
        }
        """
        parsed, has_global = parse_expected_content(content)

        expected = {
            "person_id": "7363626383",
            "firstname": "Carl",
            "dateofbirth": "1998-12-26T13:13:55.000Z",
            "vocation": "ENGINEER",
        }
        self.assertEqual(parsed, expected)

    def test_datetime_in_array(self):
        """Test datetime.datetime() inside an array structure."""
        content = """
        [
          {
            "name": "Event 1",
            "timestamp": datetime.datetime(2020, 1, 1, 8, 25, 37)
          },
          {
            "name": "Event 2",
            "timestamp": datetime.datetime(2020, 5, 30, 8, 35, 52)
          }
        ]
        """
        parsed, has_global = parse_expected_content(content)

        expected = [
            {"name": "Event 1", "timestamp": "2020-01-01T08:25:37.000Z"},
            {"name": "Event 2", "timestamp": "2020-05-30T08:35:52.000Z"},
        ]
        self.assertEqual(parsed, expected)

    def test_malformed_datetime_handling(self):
        """Test handling of malformed datetime constructors."""
        content = "datetime.datetime(invalid, args)"
        parsed, has_global = parse_expected_content(content)

        # Should fallback to ellipsis for invalid datetime
        self.assertEqual(parsed, "...")

    def test_comparison_with_normalized_datetime(self):
        """Test comparison between parsed datetime and normalized datetime string."""
        expected_content = "datetime.datetime(1998, 12, 26, 13, 13, 55)"
        actual_value = "1998-12-26T13:13:55.000Z"

        result = compare_documents(expected_content, actual_value)
        self.assertTrue(result.is_match, result.error)

    def test_comparison_with_python_datetime_object(self):
        """Test comparison with actual Python datetime object."""
        expected_content = "datetime.datetime(1998, 12, 26, 13, 13, 55)"
        actual_datetime = datetime(1998, 12, 26, 13, 13, 55, tzinfo=timezone.utc)

        result = compare_documents(expected_content, actual_datetime)
        self.assertTrue(result.is_match, result.error)

    def test_real_world_example_structure(self):
        """Test parsing structure similar to real PyMongo output files."""
        content = """
        {'person_id': '7363626383', 'firstname': 'Carl', 'lastname': 'Simmons', 'dateofbirth': datetime.datetime(1998, 12, 26, 13, 13, 55), 'vocation': 'ENGINEER'}
        {'person_id': '1723338115', 'firstname': 'Olive', 'lastname': 'Ranieri', 'dateofbirth': datetime.datetime(1985, 5, 12, 23, 14, 30), 'gender': 'FEMALE', 'vocation': 'ENGINEER'}
        """
        parsed, has_global = parse_expected_content(content)

        # Should parse as JSONL (array of objects)
        self.assertIsInstance(parsed, list)
        self.assertEqual(len(parsed), 2)

        # Check first object
        first_obj = parsed[0]
        self.assertEqual(first_obj["person_id"], "7363626383")
        self.assertEqual(first_obj["firstname"], "Carl")
        self.assertEqual(first_obj["dateofbirth"], "1998-12-26T13:13:55.000Z")

        # Check second object
        second_obj = parsed[1]
        self.assertEqual(second_obj["dateofbirth"], "1985-05-12T23:14:30.000Z")

    def test_mixed_datetime_formats(self):
        """Test mixing datetime.datetime() with other date formats."""
        content = """
        {
          "created_at": datetime.datetime(2021, 12, 18, 15, 55, 0),
          "updated_at": Date("2021-12-19T10:30:00Z"),
          "iso_field": "2021-12-20T12:00:00.000Z"
        }
        """
        parsed, has_global = parse_expected_content(content)

        expected = {
            "created_at": "2021-12-18T15:55:00.000Z",
            "updated_at": "2021-12-19T10:30:00.000Z",
            "iso_field": "2021-12-20T12:00:00.000Z",
        }
        self.assertEqual(parsed, expected)

    def test_nested_datetime_in_complex_structure(self):
        """Test datetime in deeply nested structures."""
        content = """
        {
          "orders": [
            {
              "order_date": datetime.datetime(2020, 1, 1, 8, 25, 37),
              "items": [
                {
                  "name": "Item 1",
                  "delivery_date": datetime.datetime(2020, 1, 5, 12, 0, 0)
                }
              ]
            }
          ]
        }
        """
        parsed, has_global = parse_expected_content(content)

        expected = {
            "orders": [
                {
                    "order_date": "2020-01-01T08:25:37.000Z",
                    "items": [
                        {"name": "Item 1", "delivery_date": "2020-01-05T12:00:00.000Z"}
                    ],
                }
            ]
        }
        self.assertEqual(parsed, expected)

    def test_datetime_normalization_edge_cases(self):
        """Test edge cases in datetime normalization for real-world data."""
        expected_content = """
        [
          {
            "event_time": datetime.datetime(2020, 1, 1, 8, 25, 37),
            "metadata": {
              "processed_at": datetime.datetime(2020, 1, 1, 8, 25, 38, 123456)
            }
          }
        ]
        """

        # Test with various actual datetime representations
        actual_data_variants = [
            # ISO string format (most common)
            [
                {
                    "event_time": "2020-01-01T08:25:37.000Z",
                    "metadata": {"processed_at": "2020-01-01T08:25:38.123Z"},
                }
            ],
            # Python datetime object (what PyMongo might return)
            # Note: In real tests this would be actual datetime objects, but we simulate the normalized form
        ]

        for actual_data in actual_data_variants:
            with self.subTest(actual_data=actual_data):
                result = compare_documents(expected_content, actual_data)
                self.assertTrue(
                    result.is_match, f"Failed for {actual_data}: {result.error}"
                )

    def test_partial_matching_with_datetime_fields(self):
        """Test partial matching patterns that include datetime fields."""
        expected_content = """
        ...
        [
          {
            "timestamp": datetime.datetime(2020, 1, 1, 8, 25, 37),
            "status": "completed",
            "details": "..."
          },
          "..."
        ]
        """

        # Actual data has the required fields plus extra items and fields
        actual_data = [
            {
                "timestamp": "2020-01-01T08:25:37.000Z",
                "status": "completed",
                "details": "Some long description here",
                "extra_field": "should be ignored",
            },
            {
                "timestamp": "2020-01-02T10:30:00.000Z",
                "status": "pending",
                "details": "Another description",
            },
            {
                "timestamp": "2020-01-03T15:45:00.000Z",
                "status": "failed",
                "details": "Error occurred",
            },
        ]

        self.assertMatchesExpectedContent(expected_content, actual_data)

    def test_mixed_types_with_datetime(self):
        """Test documents with mixed BSON types including datetime."""
        expected_content = """
        {
          "_id": ObjectId("507f1f77bcf86cd799439011"),
          "created_at": datetime.datetime(2021, 12, 18, 15, 55, 0),
          "updated_at": Date("2021-12-19T10:30:00Z"),
          "price": Decimal128("99.99"),
          "metadata": {
            "processed": true,
            "tags": ["important", "datetime"],
            "processing_time": datetime.datetime(2021, 12, 18, 15, 55, 5)
          }
        }
        """

        actual_data = {
            "_id": "507f1f77bcf86cd799439011",
            "created_at": "2021-12-18T15:55:00.000Z",
            "updated_at": "2021-12-19T10:30:00.000Z",
            "price": "99.99",
            "metadata": {
                "processed": True,
                "tags": ["important", "datetime"],
                "processing_time": "2021-12-18T15:55:05.000Z",
            },
        }

        self.assertMatchesExpectedContent(expected_content, actual_data)

    def test_datetime_with_ignore_fields(self):
        """Test datetime fields combined with ignore_field_values option."""
        expected_content = """
        [
          {
            "_id": "...",
            "created_at": datetime.datetime(2021, 1, 1, 12, 0, 0),
            "name": "Test Item"
          }
        ]
        """

        actual_data = [
            {
                "_id": "507f1f77bcf86cd799439011",
                "created_at": "2021-01-01T12:00:00.000Z",
                "name": "Test Item",
            }
        ]

        options = ComparisonOptions(ignore_field_values={"_id"})
        self.assertMatchesExpectedContent(expected_content, actual_data, options)

    def test_datetime_precision_handling(self):
        """Test that datetime precision is handled correctly."""

        # Test various datetime precisions
        test_cases = [
            # (expected_content, actual_data, description)
            (
                "datetime.datetime(2021, 1, 1, 12, 0, 0)",
                "2021-01-01T12:00:00.000Z",
                "No microseconds",
            ),
            (
                "datetime.datetime(2021, 1, 1, 12, 0, 0, 123000)",
                "2021-01-01T12:00:00.123Z",
                "Microseconds to milliseconds",
            ),
            (
                "datetime.datetime(2021, 1, 1, 12, 0, 0, 123456)",
                "2021-01-01T12:00:00.123Z",  # Truncated to milliseconds
                "Microseconds truncated",
            ),
        ]

        for expected_content, actual_data, description in test_cases:
            with self.subTest(description=description):
                self.assertMatchesExpectedContent(expected_content, actual_data)


class TestRealWorldIntegration(ComparisonTestCase):
    """Test integration with real PyMongo example patterns."""

    def test_aggregation_result_with_datetime(self):
        """Test comparison with aggregation results containing datetime objects."""
        expected_content = """
        [
          {
            "person_id": "7363626383",
            "firstname": "Carl",
            "dateofbirth": datetime.datetime(1998, 12, 26, 13, 13, 55),
            "vocation": "ENGINEER"
          }
        ]
        """

        # Simulate actual aggregation result with normalized datetime
        actual_data = [
            {
                "person_id": "7363626383",
                "firstname": "Carl",
                "dateofbirth": "1998-12-26T13:13:55.000Z",
                "vocation": "ENGINEER",
            }
        ]

        self.assertMatchesExpectedContent(expected_content, actual_data)

    def test_group_result_with_nested_datetime(self):
        """Test complex group results with nested datetime structures."""
        expected_content = """
        {
          "first_purchase_date": datetime.datetime(2020, 1, 1, 8, 25, 37),
          "total_value": 63,
          "orders": [
            {
              "orderdate": datetime.datetime(2020, 1, 1, 8, 25, 37),
              "value": 63
            }
          ],
          "customer_id": "customer@example.com"
        }
        """

        actual_data = {
            "first_purchase_date": "2020-01-01T08:25:37.000Z",
            "total_value": 63,
            "orders": [{"orderdate": "2020-01-01T08:25:37.000Z", "value": 63}],
            "customer_id": "customer@example.com",
        }

        self.assertMatchesExpectedContent(expected_content, actual_data)

    def test_datetime_with_ellipsis_patterns(self):
        """Test datetime fields combined with ellipsis patterns."""
        expected_content = """
        {
          "timestamp": datetime.datetime(2021, 1, 1, 12, 0, 0),
          "data": "...",
          "metadata": {
            "...": "..."
          }
        }
        """

        actual_data = {
            "timestamp": "2021-01-01T12:00:00.000Z",
            "data": "any value here",
            "metadata": {"any": "fields", "can": "be here"},
        }

        self.assertMatchesExpectedContent(expected_content, actual_data)


if __name__ == "__main__":
    unittest.main()
