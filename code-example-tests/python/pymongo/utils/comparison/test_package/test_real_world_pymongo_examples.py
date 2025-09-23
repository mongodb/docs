"""
Tests based on real-world PyMongo documentation examples.
These tests validate that the library handles actual patterns found in driver documentation.
"""

import unittest
from utils.comparison.comparison import ComparisonOptions
from utils.comparison.assert_helpers import ComparisonTestCase


class TestRealWorldExamples(ComparisonTestCase):
    """Test patterns from actual PyMongo documentation examples."""

    def test_insert_result_example(self):
        """Test handling of InsertOneResult pattern."""
        expected_content = """
        {
          "acknowledged": true,
          "inserted_id": ObjectId("...")
        }
        """

        # Simulate what actual PyMongo result would look like when normalized
        actual_data = {"acknowledged": True, "inserted_id": "507f1f77bcf86cd799439011"}

        # Should match with ellipsis for ObjectId
        self.assertMatchesExpectedContent(expected_content, actual_data)

    def test_bulk_write_result_example(self):
        """Test complex BulkWriteResult pattern."""
        expected_content = """
        {
          "acknowledged": true,
          "deleted_count": 0,
          "inserted_count": 3,
          "matched_count": 0,
          "modified_count": 0,
          "upserted_count": 0,
          "upserted_ids": {}
        }
        """

        actual_data = {
            "acknowledged": True,
            "deleted_count": 0,
            "inserted_count": 3,
            "matched_count": 0,
            "modified_count": 0,
            "upserted_count": 0,
            "upserted_ids": {},
        }

        self.assertMatchesExpectedContent(expected_content, actual_data)

    def test_aggregation_pipeline_result(self):
        """Test aggregation pipeline results with ignored _id fields."""
        expected_content = """
        [
          {
            "_id": "...",
            "name": "John Doe",
            "total_purchases": 150.00
          },
          {
            "_id": "...", 
            "name": "Jane Smith",
            "total_purchases": 200.50
          }
        ]
        """

        actual_data = [
            {
                "_id": "507f1f77bcf86cd799439011",
                "name": "John Doe",
                "total_purchases": 150.0,
            },
            {
                "_id": "507f1f77bcf86cd799439012",
                "name": "Jane Smith",
                "total_purchases": 200.5,
            },
        ]

        options = ComparisonOptions(ignore_field_values={"_id"})
        self.assertMatchesExpectedContent(expected_content, actual_data, options)

    def test_find_with_cursor_result(self):
        """Test find operation results as arrays."""
        expected_content = """
        [
          {
            "_id": ObjectId("..."),
            "name": "Alice",
            "age": 25
          },
          {
            "_id": ObjectId("..."),
            "name": "Bob", 
            "age": 30
          }
        ]
        """

        actual_data = [
            {"_id": "507f1f77bcf86cd799439011", "name": "Alice", "age": 25},
            {"_id": "507f1f77bcf86cd799439012", "name": "Bob", "age": 30},
        ]

        self.assertMatchesExpectedContent(expected_content, actual_data)

    def test_update_result_with_optional_fields(self):
        """Test UpdateResult with optional upserted_id."""
        expected_content = """
        {
          "acknowledged": true,
          "matched_count": 1,
          "modified_count": 1,
          "upserted_id": null
        }
        """

        actual_data = {
            "acknowledged": True,
            "matched_count": 1,
            "modified_count": 1,
            "upserted_id": None,
        }

        self.assertMatchesExpectedContent(expected_content, actual_data)

    def test_mixed_bson_types(self):
        """Test document with various BSON types."""
        expected_content = """
        {
          "_id": ObjectId("507f1f77bcf86cd799439011"),
          "name": "Test Document",
          "price": Decimal128("99.99"),
          "created": Date("2021-12-18T15:55:00Z"),
          "binary_data": Binary("data", 0),
          "uuid_field": UUID("550e8400-e29b-41d4-a716-446655440000")
        }
        """

        actual_data = {
            "_id": "507f1f77bcf86cd799439011",
            "name": "Test Document",
            "price": "99.99",
            "created": "2021-12-18T15:55:00.000Z",
            "binary_data": {"$binary": {"base64": "data", "subType": "0"}},
            "uuid_field": "550e8400-e29b-41d4-a716-446655440000",
        }

        self.assertMatchesExpectedContent(expected_content, actual_data)

    def test_global_ellipsis_with_extra_fields(self):
        """Test global ellipsis allowing extra fields in results."""
        expected_content = """
        ...
        {
          "name": "John",
          "email": "john@example.com"
        }
        """

        # Actual result has extra metadata fields
        actual_data = {
            "name": "John",
            "email": "john@example.com",
            "_id": "507f1f77bcf86cd799439011",
            "created_at": "2021-12-18T15:55:00Z",
            "updated_at": "2021-12-18T15:55:00Z",
        }

        self.assertMatchesExpectedContent(expected_content, actual_data)

    def test_partial_array_matching(self):
        """Test partial array matching with ellipsis."""
        expected_content = """
        [
          {"name": "First"},
          "...",
          {"name": "Last"}
        ]
        """

        actual_data = [
            {"name": "First"},
            {"name": "Middle1"},
            {"name": "Middle2"},
            {"name": "Middle3"},
            {"name": "Last"},
        ]

        self.assertMatchesExpectedContent(expected_content, actual_data)


if __name__ == "__main__":
    unittest.main()
