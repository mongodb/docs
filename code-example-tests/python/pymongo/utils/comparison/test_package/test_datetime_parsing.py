#!/usr/bin/env python3
"""
Test datetime parsing and normalization functionality.
"""
import unittest
from datetime import datetime

from utils.comparison import Expect


class TestDatetimeParsing(unittest.TestCase):
    """Test datetime parsing and normalization."""

    def test_datetime_object_comparison(self):
        """Test comparison of datetime objects."""
        dt1 = datetime(2023, 1, 15, 10, 30, 0)
        dt2 = datetime(2023, 1, 15, 10, 30, 0)

        # Should match identical datetime objects
        Expect.that(dt2).should_match(dt1)

    def test_datetime_string_formats(self):
        """Test various datetime string formats."""
        # ISO format - use document comparison to leverage datetime normalization
        expected = '{"timestamp": "2023-01-15T10:30:00.000Z"}'
        actual = {"timestamp": datetime(2023, 1, 15, 10, 30, 0)}

        # Should match datetime object with ISO string in document context
        Expect.that(actual).should_match(expected)

    def test_mongodb_datetime_constructor(self):
        """Test MongoDB datetime constructor patterns."""
        expected = 'datetime.datetime(2023, 1, 15, 10, 30, 0)'
        actual = datetime(2023, 1, 15, 10, 30, 0)

        # Should match MongoDB constructor with datetime object
        Expect.that(actual).should_match(expected)

    def test_extended_json_datetime(self):
        """Test Extended JSON datetime format."""
        expected = '{"created_at": {"$date": "2023-01-15T10:30:00.000Z"}}'
        actual = {"created_at": datetime(2023, 1, 15, 10, 30, 0)}

        # Should match Extended JSON with datetime object
        Expect.that(actual).should_match(expected)

    def test_datetime_in_arrays(self):
        """Test datetime objects within arrays."""
        expected = [
            {"timestamp": "2023-01-15T10:30:00.000Z"},
            {"timestamp": "2023-01-16T11:45:00.000Z"}
        ]
        actual = [
            {"timestamp": datetime(2023, 1, 15, 10, 30, 0)},
            {"timestamp": datetime(2023, 1, 16, 11, 45, 0)}
        ]

        # Should match arrays with datetime objects
        Expect.that(actual).should_match(expected)

    def test_datetime_with_ellipsis(self):
        """Test datetime comparison with ellipsis patterns."""
        expected = '{"_id": "...", "created_at": "2023-01-15T10:30:00.000Z"}'
        actual = {
            "_id": "507f1f77bcf86cd799439011",
            "created_at": datetime(2023, 1, 15, 10, 30, 0)
        }

        # Should match with ellipsis ignoring _id
        Expect.that(actual).should_match(expected)

    def test_datetime_with_ignored_fields(self):
        """Test datetime comparison with ignored fields."""
        expected = {"name": "test", "created_at": "ignored"}
        actual = {"name": "test", "created_at": datetime(2023, 1, 15, 10, 30, 0)}
        # Should match with ignored datetime field
        Expect.that(actual).with_ignored_fields("created_at").should_match(expected)

    def test_fluent_api_datetime(self):
        """Test fluent API with datetime objects."""
        expected = {"_id": "ignored", "timestamp": "2023-01-15T10:30:00.000Z"}
        actual = {
            "_id": "507f1f77bcf86cd799439011",
            "timestamp": datetime(2023, 1, 15, 10, 30, 0)
        }

        # Should match with fluent API
        Expect.that(actual).with_ignored_fields("_id").should_match(expected)

    def test_mixed_datetime_formats(self):
        """Test mixed datetime formats in the same document."""
        expected = {
            "created": 'datetime.datetime(2023, 1, 15, 10, 30, 0)',
            "updated": "2023-01-16T11:45:00.000Z",
            "expires": {"$date": "2023-12-31T23:59:59.999Z"}
        }
        actual = {
            "created": datetime(2023, 1, 15, 10, 30, 0),
            "updated": datetime(2023, 1, 16, 11, 45, 0),
            "expires": datetime(2023, 12, 31, 23, 59, 59, 999000)
        }

        # Should match mixed datetime formats
        Expect.that(actual).should_match(expected)

    def test_datetime_precision_handling(self):
        """Test datetime precision handling."""
        # Test microsecond precision
        expected = "2023-01-15T10:30:00.123456Z"
        actual = datetime(2023, 1, 15, 10, 30, 0, 123456)

        # Should handle microsecond precision
        Expect.that(actual).should_match(expected)

    def test_datetime_timezone_handling(self):
        """Test datetime timezone handling."""
        # Test UTC timezone
        expected = "2023-01-15T10:30:00.000Z"
        actual = datetime(2023, 1, 15, 10, 30, 0)

        # Should handle timezone indicators
        Expect.that(actual).should_match(expected)

    def test_datetime_error_cases(self):
        """Test datetime comparison error cases."""
        # Test invalid datetime format
        expected = "invalid-datetime-format"
        actual = datetime(2023, 1, 15, 10, 30, 0)

        # Should fail with invalid format
        with self.assertRaises(AssertionError):
            Expect.that(actual).should_match(expected)

    def test_datetime_nested_structures(self):
        """Test datetime objects in nested structures."""
        expected = {
            "user": {
                "profile": {
                    "created_at": "2023-01-15T10:30:00.000Z",
                    "last_login": 'datetime.datetime(2023, 1, 16, 9, 15, 0)'
                }
            },
            "events": [
                {"timestamp": "2023-01-15T11:00:00.000Z"},
                {"timestamp": "2023-01-15T12:00:00.000Z"}
            ]
        }
        actual = {
            "user": {
                "profile": {
                    "created_at": datetime(2023, 1, 15, 10, 30, 0),
                    "last_login": datetime(2023, 1, 16, 9, 15, 0)
                }
            },
            "events": [
                {"timestamp": datetime(2023, 1, 15, 11, 0, 0)},
                {"timestamp": datetime(2023, 1, 15, 12, 0, 0)}
            ]
        }

        # Should match nested datetime structures
        Expect.that(actual).should_match(expected)

    def test_datetime_with_unordered_arrays(self):
        """Test datetime objects with unordered array comparison."""
        expected = [
            {"event": "login", "time": "2023-01-15T10:30:00.000Z"},
            {"event": "logout", "time": "2023-01-15T11:30:00.000Z"}
        ]
        actual = [
            {"event": "logout", "time": datetime(2023, 1, 15, 11, 30, 0)},
            {"event": "login", "time": datetime(2023, 1, 15, 10, 30, 0)}
        ]
        # Should match with unordered arrays
        Expect.that(actual).should_match(expected)


if __name__ == "__main__":
    unittest.main()
