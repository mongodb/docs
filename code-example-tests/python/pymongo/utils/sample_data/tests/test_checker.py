"""
Unit tests for the sample data checker module.

These tests use mocking to test the checker functionality without requiring
a real MongoDB connection.
"""

import unittest
from unittest.mock import patch, Mock
import os
from utils.sample_data.checker import SampleDataChecker


class TestSampleDataChecker(unittest.TestCase):
    """Test cases for the sample data checker functionality."""

    def setUp(self):
        """Set up test fixtures before each test method."""
        # Clear cache before each test
        SampleDataChecker.clear_sample_data_cache()

        # Store original environment variable if it exists
        self._original_connection_string = os.environ.get("CONNECTION_STRING")

    def tearDown(self):
        """Clean up after each test method."""
        SampleDataChecker.cleanup()

        # Restore original environment variable
        if self._original_connection_string is not None:
            os.environ["CONNECTION_STRING"] = self._original_connection_string
        elif "CONNECTION_STRING" in os.environ:
            del os.environ["CONNECTION_STRING"]

    @patch.dict(os.environ, {"CONNECTION_STRING": "mongodb://test:27017"})
    def test_get_connection_string_from_env(self):
        """Test getting connection string from environment variable."""
        connection_string = SampleDataChecker._get_connection_string()
        self.assertEqual(connection_string, "mongodb://test:27017")

    @patch("utils.sample_data.checker.load_dotenv")
    def test_get_connection_string_from_dotenv(self, mock_load_dotenv):
        """Test getting connection string from .env file."""
        # Remove CONNECTION_STRING from environment initially
        original_env = os.environ.get("CONNECTION_STRING")
        if "CONNECTION_STRING" in os.environ:
            del os.environ["CONNECTION_STRING"]

        try:
            # Mock that load_dotenv sets the environment variable
            def side_effect():
                os.environ["CONNECTION_STRING"] = "mongodb://dotenv:27017"

            mock_load_dotenv.side_effect = side_effect

            connection_string = SampleDataChecker._get_connection_string()
            self.assertEqual(connection_string, "mongodb://dotenv:27017")
            mock_load_dotenv.assert_called_once()
        finally:
            # Clean up - remove the test env var and restore original if it existed
            if "CONNECTION_STRING" in os.environ:
                del os.environ["CONNECTION_STRING"]
            if original_env is not None:
                os.environ["CONNECTION_STRING"] = original_env

    @patch("utils.sample_data.checker.load_dotenv", side_effect=Exception("Load error"))
    def test_get_connection_string_no_env_or_dotenv(self, mock_load_dotenv):
        """Test behavior when no connection string is available."""
        # Remove CONNECTION_STRING from environment
        original_env = os.environ.get("CONNECTION_STRING")
        if "CONNECTION_STRING" in os.environ:
            del os.environ["CONNECTION_STRING"]

        try:
            connection_string = SampleDataChecker._get_connection_string()
            self.assertIsNone(connection_string)
        finally:
            # Restore original environment variable if it existed
            if original_env is not None:
                os.environ["CONNECTION_STRING"] = original_env

    @patch("utils.sample_data.checker.MongoClient")
    @patch.object(
        SampleDataChecker, "_get_connection_string", return_value="mongodb://test:27017"
    )
    def test_perform_database_check_success(self, mock_get_conn_str, mock_mongo_client):
        """Test _perform_database_check with a database and collections present."""
        mock_db = Mock()
        mock_db.list_collection_names.return_value = ["movies", "theaters", "users"]
        mock_client = Mock()
        mock_client.__getitem__ = Mock(return_value=mock_db)
        mock_mongo_client.return_value = mock_client

        result = SampleDataChecker._perform_database_check(
            "sample_mflix", ["movies", "theaters"]
        )

        self.assertTrue(result)
        mock_mongo_client.assert_called_once_with(
            "mongodb://test:27017",
            serverSelectionTimeoutMS=2000,
            connectTimeoutMS=2000,
            socketTimeoutMS=2000,
        )
        mock_client.close.assert_called_once()

    @patch("utils.sample_data.checker.MongoClient")
    @patch.object(
        SampleDataChecker, "_get_connection_string", return_value="mongodb://test:27017"
    )
    def test_perform_database_check_missing_collection(
        self, mock_get_conn_str, mock_mongo_client
    ):
        """Test _perform_database_check when a required collection is absent."""
        mock_db = Mock()
        mock_db.list_collection_names.return_value = ["movies"]
        mock_client = Mock()
        mock_client.__getitem__ = Mock(return_value=mock_db)
        mock_mongo_client.return_value = mock_client

        result = SampleDataChecker._perform_database_check(
            "sample_mflix", ["movies", "theaters"]
        )

        self.assertFalse(result)
        mock_client.close.assert_called_once()

    @patch("utils.sample_data.checker.MongoClient")
    @patch.object(
        SampleDataChecker, "_get_connection_string", return_value="mongodb://test:27017"
    )
    def test_perform_database_check_empty_db(self, mock_get_conn_str, mock_mongo_client):
        """Test _perform_database_check when the database has no collections."""
        mock_db = Mock()
        mock_db.list_collection_names.return_value = []
        mock_client = Mock()
        mock_client.__getitem__ = Mock(return_value=mock_db)
        mock_mongo_client.return_value = mock_client

        result = SampleDataChecker._perform_database_check("sample_mflix", [])

        self.assertFalse(result)
        mock_client.close.assert_called_once()

    @patch("utils.sample_data.checker.MongoClient")
    @patch.object(
        SampleDataChecker, "_get_connection_string", return_value="mongodb://test:27017"
    )
    def test_perform_database_check_connection_failure(
        self, mock_get_conn_str, mock_mongo_client
    ):
        """Test _perform_database_check when MongoClient raises an exception."""
        mock_mongo_client.side_effect = Exception("Connection refused")

        result = SampleDataChecker._perform_database_check("sample_mflix", ["movies"])

        self.assertFalse(result)

    @patch.object(SampleDataChecker, "_get_connection_string", return_value=None)
    def test_perform_database_check_no_connection_string(self, mock_get_conn_str):
        """Test _perform_database_check when no connection string is available."""
        result = SampleDataChecker._perform_database_check("sample_mflix", ["movies"])
        self.assertFalse(result)

    @patch.object(SampleDataChecker, "_perform_database_check", return_value=True)
    def test_check_sample_data_available_with_collections(self, mock_perform):
        """Test sample data availability check with specific collections."""
        result = SampleDataChecker.check_sample_data_available(
            "sample_mflix", ["movies", "theaters"]
        )
        self.assertTrue(result)
        mock_perform.assert_called_once_with("sample_mflix", ["movies", "theaters"])

    @patch.object(SampleDataChecker, "_perform_database_check", return_value=True)
    def test_check_sample_data_available_default_collections(self, mock_perform):
        """Test sample data availability check uses default collections from registry."""
        result = SampleDataChecker.check_sample_data_available("sample_mflix")
        self.assertTrue(result)

        expected_collections = ["movies", "theaters", "users", "comments", "sessions"]
        mock_perform.assert_called_once_with("sample_mflix", expected_collections)

    @patch.object(SampleDataChecker, "_perform_database_check", return_value=False)
    def test_check_sample_data_available_not_found(self, mock_perform):
        """Test sample data availability check when database is not found."""
        result = SampleDataChecker.check_sample_data_available("sample_mflix")
        self.assertFalse(result)
        mock_perform.assert_called_once()

    def test_check_sample_data_available_invalid_database(self):
        """Test sample data availability check with invalid database name."""
        result = SampleDataChecker.check_sample_data_available("invalid_database")
        self.assertFalse(result)

    def test_check_sample_data_available_caching(self):
        """Test that sample data availability results are cached."""
        with patch.object(
            SampleDataChecker, "_perform_database_check", return_value=True
        ) as mock_perform:
            # First call — hits the database
            result1 = SampleDataChecker.check_sample_data_available(
                "sample_mflix", ["movies"]
            )
            self.assertTrue(result1)

            # Second call — served from cache
            result2 = SampleDataChecker.check_sample_data_available(
                "sample_mflix", ["movies"]
            )
            self.assertTrue(result2)

            # Database check should only happen once
            self.assertEqual(mock_perform.call_count, 1)

    @patch.object(SampleDataChecker, "check_sample_data_available")
    def test_check_multiple_sample_databases(self, mock_check_single):
        """Test checking multiple sample databases."""

        # Mock responses for different databases
        def mock_check_response(db_name, collections=None):
            return db_name in ["sample_mflix", "sample_restaurants"]

        mock_check_single.side_effect = mock_check_response

        result = SampleDataChecker.check_multiple_sample_databases(
            ["sample_mflix", "sample_restaurants", "sample_training"]
        )

        expected = {
            "overall_available": False,
            "available_databases": ["sample_mflix", "sample_restaurants"],
            "missing_databases": ["sample_training"],
            "total_checked": 3,
            "available_count": 2,
        }

        self.assertEqual(result, expected)

    @patch.object(SampleDataChecker, "check_sample_data_available", return_value=True)
    def test_get_available_sample_databases(self, mock_check):
        """Test getting list of available sample databases."""
        available = SampleDataChecker.get_available_sample_databases()

        # Should return all databases from registry since mock returns True for all
        from utils.sample_data.registry import get_all_sample_database_names

        expected_databases = get_all_sample_database_names()

        self.assertEqual(set(available), set(expected_databases))

    @patch("builtins.print")
    @patch.object(SampleDataChecker, "get_available_sample_databases", return_value=[])
    def test_show_sample_data_summary_no_data(self, mock_get_available, mock_print):
        """Test summary display when no sample data is available."""
        SampleDataChecker.show_sample_data_summary()

        # Check that appropriate messages were printed
        print_calls = [call[0][0] for call in mock_print.call_args_list]
        self.assertIn(
            "📊 Sample Data Status: No MongoDB sample databases found", print_calls
        )
        self.assertTrue(any("Atlas:" in call for call in print_calls))

    @patch("builtins.print")
    @patch.object(
        SampleDataChecker,
        "get_available_sample_databases",
        return_value=["sample_mflix", "sample_restaurants"],
    )
    def test_show_sample_data_summary_with_data(self, mock_get_available, mock_print):
        """Test summary display when sample data is available."""
        SampleDataChecker.show_sample_data_summary()

        # Check that appropriate messages were printed
        print_calls = [call[0][0] for call in mock_print.call_args_list]
        self.assertIn("📊 Sample Data Status: 2 database(s) available", print_calls)
        self.assertTrue(
            any("sample_mflix, sample_restaurants" in call for call in print_calls)
        )

    @patch.object(SampleDataChecker, "check_sample_data_available", return_value=False)
    def test_ensure_sample_data_or_skip_missing_data(self, mock_check):
        """Test that SkipTest is raised when sample data is missing."""
        with self.assertRaises(unittest.SkipTest) as cm:
            SampleDataChecker.ensure_sample_data_or_skip("sample_mflix")

        self.assertIn("Sample database 'sample_mflix' not available", str(cm.exception))

    @patch.object(SampleDataChecker, "check_sample_data_available", return_value=True)
    def test_ensure_sample_data_or_skip_data_available(self, mock_check):
        """Test that no exception is raised when sample data is available."""
        try:
            SampleDataChecker.ensure_sample_data_or_skip("sample_mflix")
        except unittest.SkipTest:
            self.fail(
                "ensure_sample_data_or_skip should not raise SkipTest when data is available"
            )


if __name__ == "__main__":
    unittest.main()
