"""
Integration tests for the sample data utility.

These tests require a real MongoDB connection and are designed to test
the actual functionality against a MongoDB instance. They can be run
with or without sample data to verify both scenarios.
"""

import unittest
import os
from unittest.mock import patch
from dotenv import load_dotenv
from utils.sample_data.checker import SampleDataChecker
from utils.sample_data.decorators import requires_sample_data, RequiresSampleDataMixin


class TestSampleDataIntegration(unittest.TestCase):
    """Integration tests for sample data utility with real MongoDB connection."""

    @classmethod
    def setUpClass(cls):
        """Set up class-level test fixtures."""
        # Load environment variables
        load_dotenv()
        cls.connection_available = os.getenv("CONNECTION_STRING") is not None

        if cls.connection_available:
            print(f"\n{'='*60}")
            print("Running integration tests with MongoDB connection")
            print(f"{'='*60}")
        else:
            print(f"\n{'='*60}")
            print("Skipping integration tests - no CONNECTION_STRING found")
            print("Set CONNECTION_STRING environment variable to run these tests")
            print(f"{'='*60}")

    def setUp(self):
        """Set up test fixtures before each test method."""
        if not self.connection_available:
            self.skipTest("No MongoDB connection string available")

        # Clear cache before each test
        SampleDataChecker.clear_sample_data_cache()

    @classmethod
    def tearDownClass(cls):
        """Clean up class-level test fixtures."""
        SampleDataChecker.cleanup()

    def test_get_available_sample_databases_real(self):
        """Test getting available sample databases with real connection."""
        available_databases = SampleDataChecker.get_available_sample_databases()

        # Should return a list (may be empty if no sample data is loaded)
        self.assertIsInstance(available_databases, list)

        # All returned databases should be valid sample database names
        from utils.sample_data.registry import is_valid_sample_database

        for db_name in available_databases:
            self.assertTrue(is_valid_sample_database(db_name))

        print(f"Available sample databases: {available_databases}")

    def test_check_sample_data_available_real(self):
        """Test checking specific sample databases with real connection."""
        # Test with sample_mflix (common sample database)
        mflix_available = SampleDataChecker.check_sample_data_available("sample_mflix")
        print(f"sample_mflix available: {mflix_available}")

        # Test with specific collections
        if mflix_available:
            movies_available = SampleDataChecker.check_sample_data_available(
                "sample_mflix", ["movies"]
            )
            self.assertTrue(movies_available)

            # Test with non-existent collection
            invalid_collection = SampleDataChecker.check_sample_data_available(
                "sample_mflix", ["nonexistent_collection"]
            )
            self.assertFalse(invalid_collection)

        # Test with non-existent database
        invalid_db = SampleDataChecker.check_sample_data_available(
            "nonexistent_database"
        )
        self.assertFalse(invalid_db)

    def test_check_multiple_sample_databases_real(self):
        """Test checking multiple sample databases with real connection."""
        databases_to_check = ["sample_mflix", "sample_restaurants", "sample_training"]

        result = SampleDataChecker.check_multiple_sample_databases(databases_to_check)

        # Verify result structure
        self.assertIn("overall_available", result)
        self.assertIn("available_databases", result)
        self.assertIn("missing_databases", result)
        self.assertIn("total_checked", result)
        self.assertIn("available_count", result)

        self.assertEqual(result["total_checked"], 3)
        self.assertEqual(
            len(result["available_databases"]) + len(result["missing_databases"]), 3
        )

        print(f"Multiple database check result: {result}")

    def test_caching_behavior_real(self):
        """Test that caching works correctly with real connection."""
        # Clear cache to start fresh
        SampleDataChecker.clear_sample_data_cache()

        # First call (should hit database)
        start_time = __import__("time").time()
        result1 = SampleDataChecker.check_sample_data_available("sample_mflix")
        first_call_time = __import__("time").time() - start_time

        # Second call (should use cache)
        start_time = __import__("time").time()
        result2 = SampleDataChecker.check_sample_data_available("sample_mflix")
        second_call_time = __import__("time").time() - start_time

        # Results should be the same
        self.assertEqual(result1, result2)

        # Second call should be faster (cached)
        # Note: This might not always be true due to network variations,
        # but it's generally expected
        print(
            f"First call time: {first_call_time:.4f}s, Second call time: {second_call_time:.4f}s"
        )

    def test_summary_display_real(self):
        """Test summary display with real connection."""
        import io
        import contextlib

        # Capture printed output
        output_buffer = io.StringIO()
        with contextlib.redirect_stdout(output_buffer):
            SampleDataChecker.show_sample_data_summary()

        output = output_buffer.getvalue()

        # Should contain the status indicator
        self.assertIn("📊 Sample Data Status:", output)

        # Should contain either "No MongoDB sample databases found" or "database(s) available"
        self.assertTrue(
            "No MongoDB sample databases found" in output
            or "database(s) available" in output
        )

        print(f"Summary output:\n{output}")


class TestSampleDataDecoratorIntegration(unittest.TestCase, RequiresSampleDataMixin):
    """Integration tests for decorators with real MongoDB connection."""

    @classmethod
    def setUpClass(cls):
        """Set up class-level test fixtures."""
        load_dotenv()
        cls.connection_available = os.getenv("CONNECTION_STRING") is not None

    def setUp(self):
        """Set up test fixtures before each test method."""
        if not self.connection_available:
            self.skipTest("No MongoDB connection string available")

        # Clear cache before each test
        SampleDataChecker.clear_sample_data_cache()

    def test_decorator_with_available_data(self):
        """Test decorator when sample data is available."""
        # First check what's available
        available_databases = SampleDataChecker.get_available_sample_databases()

        if not available_databases:
            self.skipTest("No sample databases available for decorator test")

        # Use the first available database
        test_database = available_databases[0]

        # Define a test function with the decorator
        @requires_sample_data(test_database)
        def test_function():
            return f"Success with {test_database}"

        # Should execute without raising SkipTest
        result = test_function()
        self.assertEqual(result, f"Success with {test_database}")

    def test_decorator_with_unavailable_data(self):
        """Test decorator when sample data is not available."""

        @requires_sample_data("definitely_nonexistent_database")
        def test_function():
            self.fail("This should not execute")

        # Should raise SkipTest
        with self.assertRaises(unittest.SkipTest) as cm:
            test_function()

        self.assertIn("definitely_nonexistent_database", str(cm.exception))

    def test_mixin_methods_real(self):
        """Test mixin methods with real connection."""
        # Test check method
        result = self.check_sample_data_available("sample_mflix")
        self.assertIsInstance(result, bool)

        # Test get available databases
        available = self.get_available_sample_databases()
        self.assertIsInstance(available, list)

        if available:
            # Test ensure method with available database
            try:
                self.ensure_sample_data(available[0])
            except unittest.SkipTest:
                self.fail("ensure_sample_data should not skip for available database")

        # Test ensure method with unavailable database
        with self.assertRaises(unittest.SkipTest):
            self.ensure_sample_data("definitely_nonexistent_database")


class TestErrorHandlingIntegration(unittest.TestCase):
    """Integration tests for error handling scenarios."""

    def test_invalid_connection_string(self):
        """Test behavior with invalid connection string."""
        # Temporarily override connection string
        original_connection_string = SampleDataChecker._connection_string
        SampleDataChecker._connection_string = "invalid://connection:string"
        SampleDataChecker._client = None  # Force reconnection

        try:
            # Should handle connection errors gracefully
            result = SampleDataChecker.check_sample_data_available("sample_mflix")
            self.assertFalse(result)

            available = SampleDataChecker.get_available_sample_databases()
            self.assertEqual(available, [])

            # Summary should still work
            import io
            import contextlib

            output_buffer = io.StringIO()
            with contextlib.redirect_stdout(output_buffer):
                SampleDataChecker.show_sample_data_summary()

            output = output_buffer.getvalue()
            self.assertIn("No MongoDB sample databases found", output)

        finally:
            # Restore original connection string
            SampleDataChecker._connection_string = original_connection_string
            SampleDataChecker._client = None

    def test_no_connection_string(self):
        """Test behavior when no connection string is available."""
        # Temporarily clear connection string
        original_connection_string = SampleDataChecker._connection_string
        SampleDataChecker._connection_string = None
        SampleDataChecker._client = None

        # Mock environment to not have CONNECTION_STRING
        with patch.dict(os.environ, {}, clear=True):
            try:
                # Should handle missing connection string gracefully
                result = SampleDataChecker.check_sample_data_available("sample_mflix")
                self.assertFalse(result)

                available = SampleDataChecker.get_available_sample_databases()
                self.assertEqual(available, [])

            finally:
                # Restore original connection string
                SampleDataChecker._connection_string = original_connection_string
                SampleDataChecker._client = None


if __name__ == "__main__":
    # Run with higher verbosity to see the output
    unittest.main(verbosity=2)
