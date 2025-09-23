"""
Unit tests for the sample data cache module.
"""

import unittest
import threading
from utils.sample_data.cache import SampleDataCache, get_cache


class TestSampleDataCache(unittest.TestCase):
    """Test cases for the sample data cache functionality."""

    def setUp(self):
        """Set up test fixtures before each test method."""
        self.cache = SampleDataCache()

    def test_cache_basic_operations(self):
        """Test basic cache operations: set, get, has_key."""
        # Test setting and getting values
        self.cache.set("test_key", "test_value")
        self.assertEqual(self.cache.get("test_key"), "test_value")

        # Test has_key
        self.assertTrue(self.cache.has_key("test_key"))
        self.assertFalse(self.cache.has_key("nonexistent_key"))

        # Test getting nonexistent key
        self.assertIsNone(self.cache.get("nonexistent_key"))

    def test_cache_clear(self):
        """Test cache clearing functionality."""
        # Set some values
        self.cache.set("key1", "value1")
        self.cache.set("key2", "value2")

        # Verify they exist
        self.assertTrue(self.cache.has_key("key1"))
        self.assertTrue(self.cache.has_key("key2"))

        # Clear cache
        self.cache.clear()

        # Verify they're gone
        self.assertFalse(self.cache.has_key("key1"))
        self.assertFalse(self.cache.has_key("key2"))
        self.assertIsNone(self.cache.get("key1"))
        self.assertIsNone(self.cache.get("key2"))

    def test_make_cache_key(self):
        """Test cache key generation."""
        # Test with database only
        key1 = self.cache.make_cache_key("sample_mflix")
        self.assertEqual(key1, "sample_mflix")

        # Test with collections
        key2 = self.cache.make_cache_key("sample_mflix", ["movies", "theaters"])
        self.assertEqual(key2, "sample_mflix:movies,theaters")

        # Test that collections are sorted for consistent keys
        key3 = self.cache.make_cache_key("sample_mflix", ["theaters", "movies"])
        self.assertEqual(key3, "sample_mflix:movies,theaters")
        self.assertEqual(key2, key3)

        # Test with empty collections list
        key4 = self.cache.make_cache_key("sample_mflix", [])
        self.assertEqual(key4, "sample_mflix:")

    def test_thread_safety(self):
        """Test that cache operations are thread-safe."""
        num_threads = 10
        operations_per_thread = 100

        def cache_operations(thread_id):
            """Perform cache operations in a thread."""
            for i in range(operations_per_thread):
                key = f"thread_{thread_id}_key_{i}"
                value = f"thread_{thread_id}_value_{i}"

                self.cache.set(key, value)
                retrieved_value = self.cache.get(key)
                self.assertEqual(retrieved_value, value)

        # Create and start threads
        threads = []
        for thread_id in range(num_threads):
            thread = threading.Thread(target=cache_operations, args=(thread_id,))
            threads.append(thread)
            thread.start()

        # Wait for all threads to complete
        for thread in threads:
            thread.join()

        # Verify all values are still accessible
        for thread_id in range(num_threads):
            for i in range(operations_per_thread):
                key = f"thread_{thread_id}_key_{i}"
                expected_value = f"thread_{thread_id}_value_{i}"
                actual_value = self.cache.get(key)
                self.assertEqual(actual_value, expected_value)

    def test_summary_shown_once(self):
        """Test that summary is shown only once."""
        call_count = 0

        def mock_summary():
            nonlocal call_count
            call_count += 1
            return "Summary shown"

        # Call multiple times
        self.cache.ensure_summary_shown_once(mock_summary)
        self.cache.ensure_summary_shown_once(mock_summary)
        self.cache.ensure_summary_shown_once(mock_summary)

        # Should only be called once
        self.assertEqual(call_count, 1)

        # After clearing, should be callable again
        self.cache.clear()
        self.cache.ensure_summary_shown_once(mock_summary)
        self.assertEqual(call_count, 2)

    def test_summary_error_handling(self):
        """Test that summary errors are handled gracefully."""

        def error_summary():
            raise Exception("Summary error")

        # Should not raise an exception
        try:
            self.cache.ensure_summary_shown_once(error_summary)
        except Exception:
            self.fail("ensure_summary_shown_once should handle errors gracefully")

    def test_global_cache_instance(self):
        """Test that get_cache returns a consistent global instance."""
        cache1 = get_cache()
        cache2 = get_cache()

        # Should be the same instance
        self.assertIs(cache1, cache2)

        # Setting on one should be visible on the other
        cache1.set("global_test", "global_value")
        self.assertEqual(cache2.get("global_test"), "global_value")

    def test_cache_with_different_data_types(self):
        """Test caching different data types."""
        # String
        self.cache.set("string_key", "string_value")
        self.assertEqual(self.cache.get("string_key"), "string_value")

        # Integer
        self.cache.set("int_key", 42)
        self.assertEqual(self.cache.get("int_key"), 42)

        # Boolean
        self.cache.set("bool_key", True)
        self.assertTrue(self.cache.get("bool_key"))

        # List
        test_list = ["item1", "item2", "item3"]
        self.cache.set("list_key", test_list)
        self.assertEqual(self.cache.get("list_key"), test_list)

        # Dict
        test_dict = {"key1": "value1", "key2": "value2"}
        self.cache.set("dict_key", test_dict)
        self.assertEqual(self.cache.get("dict_key"), test_dict)

        # None
        self.cache.set("none_key", None)
        self.assertIsNone(self.cache.get("none_key"))
        self.assertTrue(self.cache.has_key("none_key"))  # Should still be in cache


if __name__ == "__main__":
    unittest.main()
