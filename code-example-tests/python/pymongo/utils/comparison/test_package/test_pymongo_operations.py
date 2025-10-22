#!/usr/bin/env python3
"""
Test PyMongo operations comparison functionality using the Expect API.
"""
import unittest

from utils.comparison import Expect


class TestPyMongoOperations(unittest.TestCase):
    """Test PyMongo operations comparison using the expect API."""

    def test_insert_one_operation(self):
        """Test InsertOne operation comparison."""
        expected = 'InsertOne({"name": "test", "value": 42})'
        actual = {"name": "test", "value": 42}

        # Should match InsertOne operation with document
        Expect.that(actual).should_match(expected)

    def test_update_one_operation(self):
        """Test UpdateOne operation comparison."""
        expected = 'UpdateOne({"_id": "..."}, {"$set": {"status": "updated"}})'
        actual = {
            "filter": {"_id": "507f1f77bcf86cd799439011"},
            "update": {"$set": {"status": "updated"}}
        }

        # Should match UpdateOne operation with filter/update structure
        Expect.that(actual).should_match(expected)

    def test_delete_one_operation(self):
        """Test DeleteOne operation comparison."""
        expected = 'DeleteOne({"status": "inactive"})'
        actual = {"status": "inactive"}

        # Should match DeleteOne operation with filter
        Expect.that(actual).should_match(expected)

    def test_replace_one_operation(self):
        """Test ReplaceOne operation comparison."""
        expected = 'ReplaceOne({"_id": "..."}, {"name": "replaced", "value": 100})'
        actual = {
            "filter": {"_id": "507f1f77bcf86cd799439011"},
            "replacement": {"name": "replaced", "value": 100}
        }

        # Should match ReplaceOne operation
        Expect.that(actual).should_match(expected)

    def test_bulk_operations_array(self):
        """Test array of bulk operations."""
        expected = [
            'InsertOne({"name": "doc1"})',
            'UpdateOne({"_id": "..."}, {"$set": {"updated": true}})',
            'DeleteOne({"status": "old"})'
        ]
        actual = [
            {"name": "doc1"},
            {
                "filter": {"_id": "507f1f77bcf86cd799439011"},
                "update": {"$set": {"updated": True}}
            },
            {"status": "old"}
        ]

        # Should match array of operations
        Expect.that(actual).should_match(expected)

    def test_operations_with_ellipsis(self):
        """Test operations with ellipsis patterns."""
        expected = 'InsertOne({"_id": "...", "name": "test", "metadata": "..."})'
        actual = {
            "_id": "507f1f77bcf86cd799439011",
            "name": "test",
            "metadata": {"created_by": "system", "timestamp": "2023-01-15"}
        }

        # Should match with ellipsis patterns
        Expect.that(actual).should_match(expected)

    def test_operations_with_ignored_fields(self):
        """Test operations with ignored fields."""
        expected = 'UpdateOne({"_id": "ignored"}, {"$set": {"name": "test"}})'
        actual = {
            "filter": {"_id": "507f1f77bcf86cd799439011"},
            "update": {"$set": {"name": "test"}}
        }
        # Should match with ignored fields
        Expect.that(actual).with_ignored_fields("_id").should_match(expected)

    def test_fluent_api_operations(self):
        """Test fluent API with PyMongo operations."""
        expected = 'InsertOne({"_id": "ignored", "name": "test"})'
        actual = {"_id": "507f1f77bcf86cd799439011", "name": "test"}

        # Should match with fluent API
        Expect.that(actual).with_ignored_fields("_id").should_match(expected)

    def test_nested_operations(self):
        """Test nested operation structures."""
        expected = {
            "operations": [
                'InsertOne({"name": "doc1"})',
                'UpdateOne({"_id": "..."}, {"$set": {"status": "active"}})'
            ],
            "metadata": {
                "batch_id": "...",
                "timestamp": "..."
            }
        }
        actual = {
            "operations": [
                {"name": "doc1"},
                {
                    "filter": {"_id": "507f1f77bcf86cd799439011"},
                    "update": {"$set": {"status": "active"}}
                }
            ],
            "metadata": {
                "batch_id": "batch_123",
                "timestamp": "2023-01-15T10:30:00Z"
            }
        }

        # Should match nested operations
        Expect.that(actual).should_match(expected)

    def test_operations_with_unordered_arrays(self):
        """Test operations with unordered array comparison."""
        expected = [
            'InsertOne({"name": "doc1"})',
            'InsertOne({"name": "doc2"})',
            'UpdateOne({"_id": "..."}, {"$set": {"processed": true}})'
        ]
        actual = [
            {
                "filter": {"_id": "507f1f77bcf86cd799439011"},
                "update": {"$set": {"processed": True}}
            },
            {"name": "doc1"},
            {"name": "doc2"}
        ]
        # Should match with unordered arrays
        Expect.that(actual).should_match(expected)

    def test_complex_update_operations(self):
        """Test complex update operations."""
        expected = 'UpdateOne({"status": "pending"}, {"$set": {"status": "processing"}, "$inc": {"attempts": 1}})'
        actual = {
            "filter": {"status": "pending"},
            "update": {
                "$set": {"status": "processing"},
                "$inc": {"attempts": 1}
            }
        }

        # Should match complex update operations
        Expect.that(actual).should_match(expected)

    def test_aggregation_pipeline_operations(self):
        """Test aggregation pipeline operations."""
        expected = [
            {"$match": {"status": "active"}},
            {"$group": {"_id": "$category", "count": {"$sum": 1}}},
            {"$sort": {"count": -1}}
        ]
        actual = [
            {"$match": {"status": "active"}},
            {"$group": {"_id": "$category", "count": {"$sum": 1}}},
            {"$sort": {"count": -1}}
        ]

        # Should match aggregation pipelines
        Expect.that(actual).should_match(expected)

    def test_operation_result_objects(self):
        """Test PyMongo result objects."""
        expected = {
            "acknowledged": True,
            "inserted_id": "...",
            "matched_count": 1,
            "modified_count": 1
        }
        actual = {
            "acknowledged": True,
            "inserted_id": "507f1f77bcf86cd799439011",
            "matched_count": 1,
            "modified_count": 1
        }

        # Should match result objects with ellipsis
        Expect.that(actual).should_match(expected)

    def test_cursor_results(self):
        """Test cursor result arrays."""
        expected = [
            {"_id": "...", "name": "doc1", "status": "active"},
            {"_id": "...", "name": "doc2", "status": "active"}
        ]
        actual = [
            {"_id": "507f1f77bcf86cd799439011", "name": "doc1", "status": "active"},
            {"_id": "507f1f77bcf86cd799439012", "name": "doc2", "status": "active"}
        ]

        # Should match cursor results with ellipsis
        Expect.that(actual).should_match(expected)

    def test_error_handling_operations(self):
        """Test error handling with operations."""
        # Test invalid operation format
        expected = 'InvalidOperation({"test": "data"})'
        actual = {"test": "data"}

        # Should handle unknown operations gracefully
        with self.assertRaises(AssertionError):
            Expect.that(actual).should_match(expected)


if __name__ == "__main__":
    unittest.main()
