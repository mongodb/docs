"""
Unit tests for the sample data registry module.
"""

import unittest
from utils.sample_data.registry import (
    SAMPLE_DATABASES,
    get_sample_database_collections,
    is_valid_sample_database,
    get_all_sample_database_names,
)


class TestSampleDataRegistry(unittest.TestCase):
    """Test cases for the sample data registry functionality."""

    def test_sample_databases_registry_structure(self):
        """Test that the sample databases registry has the expected structure."""
        # Verify registry exists and is a dict
        self.assertIsInstance(SAMPLE_DATABASES, dict)

        # Check for expected databases
        expected_databases = [
            "sample_mflix",
            "sample_restaurants",
            "sample_training",
            "sample_analytics",
            "sample_airbnb",
            "sample_geospatial",
            "sample_guides",
            "sample_stores",
            "sample_supplies",
            "sample_weatherdata",
        ]

        for db_name in expected_databases:
            self.assertIn(db_name, SAMPLE_DATABASES)
            self.assertIsInstance(SAMPLE_DATABASES[db_name], list)
            self.assertGreater(len(SAMPLE_DATABASES[db_name]), 0)

    def test_get_sample_database_collections_valid(self):
        """Test getting collections for valid sample databases."""
        # Test sample_mflix
        mflix_collections = get_sample_database_collections("sample_mflix")
        expected_mflix = ["movies", "theaters", "users", "comments", "sessions"]
        self.assertEqual(mflix_collections, expected_mflix)

        # Test sample_restaurants
        restaurants_collections = get_sample_database_collections("sample_restaurants")
        expected_restaurants = ["restaurants", "neighborhoods"]
        self.assertEqual(restaurants_collections, expected_restaurants)

    def test_get_sample_database_collections_invalid(self):
        """Test getting collections for invalid database names."""
        result = get_sample_database_collections("nonexistent_database")
        self.assertIsNone(result)

        result = get_sample_database_collections("")
        self.assertIsNone(result)

        result = get_sample_database_collections(None)
        self.assertIsNone(result)

    def test_is_valid_sample_database(self):
        """Test validation of sample database names."""
        # Valid databases
        self.assertTrue(is_valid_sample_database("sample_mflix"))
        self.assertTrue(is_valid_sample_database("sample_restaurants"))
        self.assertTrue(is_valid_sample_database("sample_training"))

        # Invalid databases
        self.assertFalse(is_valid_sample_database("nonexistent_database"))
        self.assertFalse(is_valid_sample_database(""))
        self.assertFalse(is_valid_sample_database("sample_"))
        self.assertFalse(is_valid_sample_database("regular_database"))

    def test_get_all_sample_database_names(self):
        """Test getting all sample database names."""
        all_names = get_all_sample_database_names()

        # Should return a list
        self.assertIsInstance(all_names, list)

        # Should contain expected databases
        expected_databases = [
            "sample_mflix",
            "sample_restaurants",
            "sample_training",
            "sample_analytics",
            "sample_airbnb",
            "sample_geospatial",
            "sample_guides",
            "sample_stores",
            "sample_supplies",
            "sample_weatherdata",
        ]

        for db_name in expected_databases:
            self.assertIn(db_name, all_names)

        # Should match the registry keys
        self.assertEqual(set(all_names), set(SAMPLE_DATABASES.keys()))

    def test_sample_database_collections_content(self):
        """Test that sample database collections contain expected values."""
        # Test some specific collection expectations
        mflix_collections = SAMPLE_DATABASES["sample_mflix"]
        self.assertIn("movies", mflix_collections)
        self.assertIn("theaters", mflix_collections)

        training_collections = SAMPLE_DATABASES["sample_training"]
        self.assertIn("posts", training_collections)
        self.assertIn("companies", training_collections)

        analytics_collections = SAMPLE_DATABASES["sample_analytics"]
        self.assertIn("customers", analytics_collections)
        self.assertIn("accounts", analytics_collections)


if __name__ == "__main__":
    unittest.main()
