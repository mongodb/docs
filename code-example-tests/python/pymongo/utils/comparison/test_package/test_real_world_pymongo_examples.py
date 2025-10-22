#!/usr/bin/env python3
"""
Test real-world PyMongo examples using the Expect API.
"""
import unittest
from datetime import datetime

from utils.comparison import Expect


class TestRealWorldPyMongoExamples(unittest.TestCase):
    """Test real-world PyMongo examples using the Expect API."""

    def test_user_document_example(self):
        """Test typical user document comparison."""
        expected = {
            "_id": "...",
            "username": "john_doe",
            "email": "john@example.com",
            "profile": {
                "first_name": "John",
                "last_name": "Doe",
                "age": 30
            },
            "created_at": "...",
            "last_login": "..."
        }
        actual = {
            "_id": "507f1f77bcf86cd799439011",
            "username": "john_doe",
            "email": "john@example.com",
            "profile": {
                "first_name": "John",
                "last_name": "Doe",
                "age": 30
            },
            "created_at": datetime(2023, 1, 15, 10, 30, 0),
            "last_login": datetime(2023, 1, 16, 9, 15, 0)
        }

        # Should match user document with ellipsis
        Expect.that(actual).should_match(expected)

    def test_product_catalog_example(self):
        """Test product catalog document comparison."""
        expected = [
            {
                "_id": "...",
                "name": "Laptop",
                "price": 999.99,
                "category": "Electronics",
                "tags": ["computer", "portable", "work"],
                "in_stock": True
            },
            {
                "_id": "...",
                "name": "Mouse",
                "price": 29.99,
                "category": "Electronics",
                "tags": ["computer", "accessory"],
                "in_stock": True
            }
        ]
        actual = [
            {
                "_id": "507f1f77bcf86cd799439011",
                "name": "Laptop",
                "price": 999.99,
                "category": "Electronics",
                "tags": ["computer", "portable", "work"],
                "in_stock": True
            },
            {
                "_id": "507f1f77bcf86cd799439012",
                "name": "Mouse",
                "price": 29.99,
                "category": "Electronics",
                "tags": ["computer", "accessory"],
                "in_stock": True
            }
        ]

        # Should match product catalog
        Expect.that(actual).should_match(expected)

    def test_blog_post_example(self):
        """Test blog post document comparison."""
        expected = {
            "_id": "...",
            "title": "Getting Started with MongoDB",
            "author": {
                "name": "Jane Smith",
                "email": "jane@example.com"
            },
            "content": "MongoDB is a NoSQL database...",
            "tags": ["mongodb", "database", "tutorial"],
            "published": True,
            "created_at": "...",
            "comments": [
                {
                    "author": "reader1",
                    "text": "Great tutorial!",
                    "timestamp": "..."
                }
            ]
        }
        actual = {
            "_id": "507f1f77bcf86cd799439011",
            "title": "Getting Started with MongoDB",
            "author": {
                "name": "Jane Smith",
                "email": "jane@example.com"
            },
            "content": "MongoDB is a NoSQL database...",
            "tags": ["mongodb", "database", "tutorial"],
            "published": True,
            "created_at": datetime(2023, 1, 15, 10, 30, 0),
            "comments": [
                {
                    "author": "reader1",
                    "text": "Great tutorial!",
                    "timestamp": datetime(2023, 1, 15, 11, 0, 0)
                }
            ]
        }

        # Should match blog post with nested structures
        Expect.that(actual).should_match(expected)

    def test_aggregation_result_example(self):
        """Test aggregation pipeline result comparison."""
        expected = [
            {"_id": "Electronics", "total_sales": 15000, "avg_price": 750.0},
            {"_id": "Books", "total_sales": 8000, "avg_price": 25.0},
            {"_id": "Clothing", "total_sales": 12000, "avg_price": 60.0}
        ]
        actual = [
            {"_id": "Electronics", "total_sales": 15000, "avg_price": 750.0},
            {"_id": "Books", "total_sales": 8000, "avg_price": 25.0},
            {"_id": "Clothing", "total_sales": 12000, "avg_price": 60.0}
        ]

        # Should match aggregation results
        Expect.that(actual).should_match(expected)

    def test_order_document_example(self):
        """Test e-commerce order document comparison."""
        expected = {
            "_id": "...",
            "order_number": "ORD-2023-001",
            "customer": {
                "id": "...",
                "name": "Alice Johnson",
                "email": "alice@example.com"
            },
            "items": [
                {
                    "product_id": "...",
                    "name": "Wireless Headphones",
                    "quantity": 1,
                    "price": 199.99
                },
                {
                    "product_id": "...",
                    "name": "Phone Case",
                    "quantity": 2,
                    "price": 15.99
                }
            ],
            "total": 231.97,
            "status": "shipped",
            "created_at": "...",
            "shipped_at": "..."
        }
        actual = {
            "_id": "507f1f77bcf86cd799439011",
            "order_number": "ORD-2023-001",
            "customer": {
                "id": "507f1f77bcf86cd799439012",
                "name": "Alice Johnson",
                "email": "alice@example.com"
            },
            "items": [
                {
                    "product_id": "507f1f77bcf86cd799439013",
                    "name": "Wireless Headphones",
                    "quantity": 1,
                    "price": 199.99
                },
                {
                    "product_id": "507f1f77bcf86cd799439014",
                    "name": "Phone Case",
                    "quantity": 2,
                    "price": 15.99
                }
            ],
            "total": 231.97,
            "status": "shipped",
            "created_at": datetime(2023, 1, 15, 10, 30, 0),
            "shipped_at": datetime(2023, 1, 16, 14, 20, 0)
        }

        # Should match order document
        Expect.that(actual).should_match(expected)

    def test_time_series_data_example(self):
        """Test time series data comparison."""
        expected = [
            {
                "timestamp": "...",
                "sensor_id": "temp_01",
                "temperature": 23.5,
                "humidity": 45.2,
                "location": "office"
            },
            {
                "timestamp": "...",
                "sensor_id": "temp_02",
                "temperature": 24.1,
                "humidity": 43.8,
                "location": "warehouse"
            }
        ]
        actual = [
            {
                "timestamp": datetime(2023, 1, 15, 10, 30, 0),
                "sensor_id": "temp_01",
                "temperature": 23.5,
                "humidity": 45.2,
                "location": "office"
            },
            {
                "timestamp": datetime(2023, 1, 15, 10, 31, 0),
                "sensor_id": "temp_02",
                "temperature": 24.1,
                "humidity": 43.8,
                "location": "warehouse"
            }
        ]

        # Should match time series data
        Expect.that(actual).should_match(expected)

    def test_bulk_operation_results(self):
        """Test bulk operation results comparison."""
        expected = {
            "acknowledged": True,
            "inserted_count": 3,
            "matched_count": 2,
            "modified_count": 2,
            "deleted_count": 1,
            "upserted_count": 0,
            "upserted_ids": [],
            "inserted_ids": ["...", "...", "..."]
        }
        actual = {
            "acknowledged": True,
            "inserted_count": 3,
            "matched_count": 2,
            "modified_count": 2,
            "deleted_count": 1,
            "upserted_count": 0,
            "upserted_ids": [],
            "inserted_ids": [
                "507f1f77bcf86cd799439011",
                "507f1f77bcf86cd799439012",
                "507f1f77bcf86cd799439013"
            ]
        }

        # Should match bulk operation results
        Expect.that(actual).should_match(expected)

    def test_search_results_with_score(self):
        """Test search results with relevance scores."""
        expected = [
            {
                "_id": "...",
                "title": "MongoDB Tutorial",
                "content": "Learn MongoDB basics...",
                "score": "..."
            },
            {
                "_id": "...",
                "title": "Advanced MongoDB",
                "content": "Advanced MongoDB techniques...",
                "score": "..."
            }
        ]
        actual = [
            {
                "_id": "507f1f77bcf86cd799439011",
                "title": "MongoDB Tutorial",
                "content": "Learn MongoDB basics...",
                "score": 0.95
            },
            {
                "_id": "507f1f77bcf86cd799439012",
                "title": "Advanced MongoDB",
                "content": "Advanced MongoDB techniques...",
                "score": 0.87
            }
        ]

        # Should match search results with ellipsis for scores
        Expect.that(actual).should_match(expected)

    def test_geospatial_data_example(self):
        """Test geospatial data comparison."""
        expected = {
            "_id": "...",
            "name": "Central Park",
            "location": {
                "type": "Point",
                "coordinates": [-73.965355, 40.782865]
            },
            "category": "park",
            "area_km2": 3.41
        }
        actual = {
            "_id": "507f1f77bcf86cd799439011",
            "name": "Central Park",
            "location": {
                "type": "Point",
                "coordinates": [-73.965355, 40.782865]
            },
            "category": "park",
            "area_km2": 3.41
        }

        # Should match geospatial data
        Expect.that(actual).should_match(expected)

    def test_fluent_api_real_world(self):
        """Test fluent API with real-world example."""
        expected = {
            "_id": "ignored",
            "created_at": "ignored",
            "user": {
                "name": "Test User",
                "preferences": ["email", "sms", "push"]
            }
        }
        actual = {
            "_id": "507f1f77bcf86cd799439011",
            "created_at": datetime(2023, 1, 15, 10, 30, 0),
            "user": {
                "name": "Test User",
                "preferences": ["push", "email", "sms"]  # Different order
            }
        }

        # Should match with fluent API ignoring fields and unordered arrays
        Expect.that(actual)\
            .with_ignored_fields("_id", "created_at")\
            \
            .should_match(expected)


if __name__ == "__main__":
    unittest.main()
