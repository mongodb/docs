"""
Unit tests for the sample data decorators module.
"""

import unittest
from unittest.mock import patch, Mock
from utils.sample_data.decorators import requires_sample_data, RequiresSampleDataMixin
from utils.sample_data.checker import SampleDataChecker


class TestRequiresSampleDataDecorator(unittest.TestCase):
    """Test cases for the @requires_sample_data decorator."""

    def setUp(self):
        """Set up test fixtures before each test method."""
        # Clear cache before each test
        SampleDataChecker.clear_sample_data_cache()

    @patch.object(SampleDataChecker, "ensure_sample_data_or_skip")
    def test_decorator_single_database(self, mock_ensure):
        """Test decorator with single database requirement."""

        @requires_sample_data("sample_mflix")
        def test_function():
            return "test_result"

        result = test_function()

        mock_ensure.assert_called_once_with("sample_mflix", None)
        self.assertEqual(result, "test_result")

    @patch.object(SampleDataChecker, "ensure_sample_data_or_skip")
    def test_decorator_single_database_with_collections(self, mock_ensure):
        """Test decorator with single database and specific collections."""

        @requires_sample_data("sample_mflix", collections=["movies", "theaters"])
        def test_function():
            return "test_result"

        result = test_function()

        mock_ensure.assert_called_once_with("sample_mflix", ["movies", "theaters"])
        self.assertEqual(result, "test_result")

    @patch.object(SampleDataChecker, "ensure_multiple_sample_data_or_skip")
    def test_decorator_multiple_databases(self, mock_ensure_multiple):
        """Test decorator with multiple databases."""

        @requires_sample_data(["sample_mflix", "sample_restaurants"])
        def test_function():
            return "test_result"

        result = test_function()

        mock_ensure_multiple.assert_called_once_with(
            ["sample_mflix", "sample_restaurants"], None
        )
        self.assertEqual(result, "test_result")

    @patch.object(SampleDataChecker, "ensure_multiple_sample_data_or_skip")
    def test_decorator_multiple_databases_with_collections(self, mock_ensure_multiple):
        """Test decorator with multiple databases and specific collections."""
        collections_map = {
            "sample_mflix": ["movies", "theaters"],
            "sample_restaurants": ["restaurants"],
        }

        @requires_sample_data(
            ["sample_mflix", "sample_restaurants"],
            collections_per_database=collections_map,
        )
        def test_function():
            return "test_result"

        result = test_function()

        mock_ensure_multiple.assert_called_once_with(
            ["sample_mflix", "sample_restaurants"], collections_map
        )
        self.assertEqual(result, "test_result")

    @patch.object(
        SampleDataChecker,
        "ensure_sample_data_or_skip",
        side_effect=unittest.SkipTest("Database not available"),
    )
    def test_decorator_skip_test(self, mock_ensure):
        """Test that decorator properly propagates SkipTest exception."""

        @requires_sample_data("sample_mflix")
        def test_function():
            return "test_result"

        with self.assertRaises(unittest.SkipTest) as cm:
            test_function()

        self.assertEqual(str(cm.exception), "Database not available")
        mock_ensure.assert_called_once_with("sample_mflix", None)

    def test_decorator_preserves_function_metadata(self):
        """Test that decorator preserves function name and docstring."""

        @requires_sample_data("sample_mflix")
        def test_function():
            """Test function docstring."""
            return "test_result"

        self.assertEqual(test_function.__name__, "test_function")
        self.assertEqual(test_function.__doc__, "Test function docstring.")

    @patch.object(SampleDataChecker, "ensure_sample_data_or_skip")
    def test_decorator_with_arguments(self, mock_ensure):
        """Test decorator works with functions that have arguments."""

        @requires_sample_data("sample_mflix")
        def test_function_with_args(arg1, arg2, kwarg1=None):
            return f"{arg1}-{arg2}-{kwarg1}"

        result = test_function_with_args("a", "b", kwarg1="c")

        mock_ensure.assert_called_once_with("sample_mflix", None)
        self.assertEqual(result, "a-b-c")


class TestRequiresSampleDataMixin(unittest.TestCase):
    """Test cases for the RequiresSampleDataMixin class."""

    def setUp(self):
        """Set up test fixtures before each test method."""
        # Clear cache before each test
        SampleDataChecker.clear_sample_data_cache()

        # Create a test class that uses the mixin
        class TestClassWithMixin(unittest.TestCase, RequiresSampleDataMixin):
            pass

        self.test_instance = TestClassWithMixin()

    @patch.object(SampleDataChecker, "ensure_sample_data_or_skip")
    def test_mixin_ensure_sample_data(self, mock_ensure):
        """Test mixin ensure_sample_data method."""
        self.test_instance.ensure_sample_data("sample_mflix")
        mock_ensure.assert_called_once_with("sample_mflix", None)

        self.test_instance.ensure_sample_data("sample_mflix", ["movies", "theaters"])
        mock_ensure.assert_called_with("sample_mflix", ["movies", "theaters"])

    @patch.object(SampleDataChecker, "ensure_multiple_sample_data_or_skip")
    def test_mixin_ensure_multiple_sample_data(self, mock_ensure_multiple):
        """Test mixin ensure_multiple_sample_data method."""
        databases = ["sample_mflix", "sample_restaurants"]
        self.test_instance.ensure_multiple_sample_data(databases)
        mock_ensure_multiple.assert_called_once_with(databases, None)

        collections_map = {"sample_mflix": ["movies"]}
        self.test_instance.ensure_multiple_sample_data(databases, collections_map)
        mock_ensure_multiple.assert_called_with(databases, collections_map)

    @patch.object(SampleDataChecker, "check_sample_data_available", return_value=True)
    def test_mixin_check_sample_data_available(self, mock_check):
        """Test mixin check_sample_data_available method."""
        result = self.test_instance.check_sample_data_available("sample_mflix")
        self.assertTrue(result)
        mock_check.assert_called_once_with("sample_mflix", None)

        result = self.test_instance.check_sample_data_available(
            "sample_mflix", ["movies"]
        )
        mock_check.assert_called_with("sample_mflix", ["movies"])

    @patch.object(
        SampleDataChecker,
        "get_available_sample_databases",
        return_value=["sample_mflix", "sample_restaurants"],
    )
    def test_mixin_get_available_sample_databases(self, mock_get_available):
        """Test mixin get_available_sample_databases method."""
        result = self.test_instance.get_available_sample_databases()
        self.assertEqual(result, ["sample_mflix", "sample_restaurants"])
        mock_get_available.assert_called_once()


class TestDecoratorIntegration(unittest.TestCase):
    """Integration tests for decorators with unittest.TestCase."""

    @patch.object(SampleDataChecker, "check_sample_data_available", return_value=True)
    @patch.object(SampleDataChecker, "_ensure_summary_shown")
    def test_decorator_with_unittest_method(self, mock_summary, mock_check):
        """Test decorator works correctly with unittest test methods."""

        class SampleTestCase(unittest.TestCase):
            @requires_sample_data("sample_mflix")
            def test_with_sample_data(self):
                self.assertTrue(True)  # Simple assertion
                return "test_passed"

        test_instance = SampleTestCase()
        result = test_instance.test_with_sample_data()

        self.assertEqual(result, "test_passed")
        mock_summary.assert_called_once()

    @patch.object(SampleDataChecker, "check_sample_data_available", return_value=False)
    @patch.object(SampleDataChecker, "_ensure_summary_shown")
    def test_decorator_skips_unittest_method(self, mock_summary, mock_check):
        """Test decorator properly skips unittest test methods when data unavailable."""

        class SampleTestCase(unittest.TestCase):
            @requires_sample_data("sample_mflix")
            def test_with_sample_data(self):
                self.fail("This test should be skipped")

        test_instance = SampleTestCase()

        with self.assertRaises(unittest.SkipTest):
            test_instance.test_with_sample_data()

        mock_summary.assert_called_once()


if __name__ == "__main__":
    unittest.main()
