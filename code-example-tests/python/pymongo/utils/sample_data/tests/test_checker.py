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
        # Clear cache and reset connection state before each test
        SampleDataChecker.clear_sample_data_cache()
        SampleDataChecker._client = None
        SampleDataChecker._connection_string = None

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
        # Reset cached connection string
        SampleDataChecker._connection_string = None

        connection_string = SampleDataChecker._get_connection_string()
        self.assertEqual(connection_string, "mongodb://test:27017")

    @patch("utils.sample_data.checker.load_dotenv")
    def test_get_connection_string_from_dotenv(self, mock_load_dotenv):
        """Test getting connection string from .env file."""
        # Remove CONNECTION_STRING from environment initially
        original_env = os.environ.get("CONNECTION_STRING")
        if "CONNECTION_STRING" in os.environ:
            del os.environ["CONNECTION_STRING"]

        # Reset cached connection string
        SampleDataChecker._connection_string = None

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

        # Reset cached connection string
        SampleDataChecker._connection_string = None

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
    def test_get_client_success(self, mock_get_conn_str, mock_mongo_client):
        """Test successful MongoDB client creation."""
        # Reset client state
        SampleDataChecker._client = None

        # Mock successful client creation
        mock_client = Mock()
        mock_client.admin.command.return_value = {"ok": 1}
        mock_mongo_client.return_value = mock_client

        client = SampleDataChecker._get_client()

        self.assertIsNotNone(client)
        mock_mongo_client.assert_called_once_with(
            "mongodb://test:27017",
            serverSelectionTimeoutMS=2000,
            connectTimeoutMS=2000,
            socketTimeoutMS=2000,
        )
        mock_client.admin.command.assert_called_once_with("ping")

    @patch("utils.sample_data.checker.MongoClient")
    @patch.object(
        SampleDataChecker, "_get_connection_string", return_value="mongodb://test:27017"
    )
    def test_get_client_connection_failure(self, mock_get_conn_str, mock_mongo_client):
        """Test MongoDB client creation with connection failure."""
        # Reset client state
        SampleDataChecker._client = None

        # Mock connection failure
        mock_mongo_client.side_effect = Exception("Connection failed")

        client = SampleDataChecker._get_client()
        self.assertIsNone(client)

    @patch.object(SampleDataChecker, "_get_connection_string", return_value=None)
    def test_get_client_no_connection_string(self, mock_get_conn_str):
        """Test client creation when no connection string is available."""
        client = SampleDataChecker._get_client()
        self.assertIsNone(client)

    @patch.object(SampleDataChecker, "_get_client")
    def test_check_database_exists_success(self, mock_get_client):
        """Test successful database existence check."""
        # Mock client with database list
        mock_client = Mock()
        mock_client.list_database_names.return_value = [
            "sample_mflix",
            "sample_restaurants",
            "admin",
        ]
        mock_get_client.return_value = mock_client

        result = SampleDataChecker._check_database_exists("sample_mflix")
        self.assertTrue(result)

        result = SampleDataChecker._check_database_exists("nonexistent_db")
        self.assertFalse(result)

    @patch.object(SampleDataChecker, "_get_client", return_value=None)
    def test_check_database_exists_no_client(self, mock_get_client):
        """Test database existence check when client is unavailable."""
        result = SampleDataChecker._check_database_exists("sample_mflix")
        self.assertFalse(result)

    @patch.object(SampleDataChecker, "_get_client")
    def test_check_database_exists_error(self, mock_get_client):
        """Test database existence check with error."""
        # Mock client that raises an error
        mock_client = Mock()
        mock_client.list_database_names.side_effect = Exception("Database error")
        mock_get_client.return_value = mock_client

        result = SampleDataChecker._check_database_exists("sample_mflix")
        self.assertFalse(result)

    @patch.object(SampleDataChecker, "_get_client")
    def test_check_collections_exist_success(self, mock_get_client):
        """Test successful collection existence check."""
        # Mock client with collection list
        mock_client = Mock()
        mock_db = Mock()
        mock_db.list_collection_names.return_value = [
            "movies",
            "theaters",
            "users",
            "comments",
        ]
        mock_client.__getitem__ = Mock(return_value=mock_db)
        mock_get_client.return_value = mock_client

        result = SampleDataChecker._check_collections_exist(
            "sample_mflix", ["movies", "theaters"]
        )
        self.assertTrue(result)

        result = SampleDataChecker._check_collections_exist(
            "sample_mflix", ["movies", "nonexistent"]
        )
        self.assertFalse(result)

    @patch.object(SampleDataChecker, "_get_client", return_value=None)
    def test_check_collections_exist_no_client(self, mock_get_client):
        """Test collection existence check when client is unavailable."""
        result = SampleDataChecker._check_collections_exist("sample_mflix", ["movies"])
        self.assertFalse(result)

    @patch.object(SampleDataChecker, "_check_database_exists", return_value=True)
    @patch.object(SampleDataChecker, "_check_collections_exist", return_value=True)
    def test_check_sample_data_available_with_collections(
        self, mock_check_collections, mock_check_db
    ):
        """Test sample data availability check with specific collections."""
        result = SampleDataChecker.check_sample_data_available(
            "sample_mflix", ["movies", "theaters"]
        )
        self.assertTrue(result)

        mock_check_db.assert_called_once_with("sample_mflix")
        mock_check_collections.assert_called_once_with(
            "sample_mflix", ["movies", "theaters"]
        )

    @patch.object(SampleDataChecker, "_check_database_exists", return_value=True)
    @patch.object(SampleDataChecker, "_check_collections_exist", return_value=True)
    def test_check_sample_data_available_default_collections(
        self, mock_check_collections, mock_check_db
    ):
        """Test sample data availability check with default collections."""
        result = SampleDataChecker.check_sample_data_available("sample_mflix")
        self.assertTrue(result)

        mock_check_db.assert_called_once_with("sample_mflix")
        # Should use default collections from registry
        expected_collections = ["movies", "theaters", "users", "comments", "sessions"]
        mock_check_collections.assert_called_once_with(
            "sample_mflix", expected_collections
        )

    @patch.object(SampleDataChecker, "_check_database_exists", return_value=False)
    def test_check_sample_data_available_db_not_exists(self, mock_check_db):
        """Test sample data availability check when database doesn't exist."""
        result = SampleDataChecker.check_sample_data_available("sample_mflix")
        self.assertFalse(result)

        mock_check_db.assert_called_once_with("sample_mflix")

    def test_check_sample_data_available_invalid_database(self):
        """Test sample data availability check with invalid database name."""
        result = SampleDataChecker.check_sample_data_available("invalid_database")
        self.assertFalse(result)

    def test_check_sample_data_available_caching(self):
        """Test that sample data availability results are cached."""
        with patch.object(
            SampleDataChecker, "_check_database_exists", return_value=True
        ) as mock_check_db, patch.object(
            SampleDataChecker, "_check_collections_exist", return_value=True
        ) as mock_check_collections:

            # First call
            result1 = SampleDataChecker.check_sample_data_available(
                "sample_mflix", ["movies"]
            )
            self.assertTrue(result1)

            # Second call should use cache
            result2 = SampleDataChecker.check_sample_data_available(
                "sample_mflix", ["movies"]
            )
            self.assertTrue(result2)

            # Database and collections should only be checked once
            self.assertEqual(mock_check_db.call_count, 1)
            self.assertEqual(mock_check_collections.call_count, 1)

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
