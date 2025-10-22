"""
Unit tests for Python 2 u'string' syntax parsing edge cases.
"""
import unittest
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from utils.comparison import Expect
from utils.comparison.parser import parse_expected_content


class TestPython2Unicode(unittest.TestCase):
    """Test Python 2 u'string' syntax parsing with various edge cases."""

    def test_basic_unicode_string(self):
        """Test basic u'string' parsing."""
        content = "u'hello world'"
        parsed, _ = parse_expected_content(content)
        self.assertEqual(parsed, "hello world")

    def test_unicode_string_in_object(self):
        """Test u'string' parsing within objects."""
        content = '''
        {
            "name": u'John Doe',
            "city": u'New York'
        }
        '''
        parsed, _ = parse_expected_content(content)
        expected = {
            "name": "John Doe",
            "city": "New York"
        }
        self.assertEqual(parsed, expected)

    def test_unicode_string_in_array(self):
        """Test u'string' parsing within arrays."""
        content = '''
        [u'first', u'second', u'third']
        '''
        parsed, _ = parse_expected_content(content)
        expected = ["first", "second", "third"]
        self.assertEqual(parsed, expected)

    def test_mixed_string_types(self):
        """Test mixing u'string', 'string', and "string" in same document."""
        content = '''
        {
            "unicode": u'unicode_value',
            "single": 'single_value',
            "double": "double_value"
        }
        '''
        parsed, _ = parse_expected_content(content)
        expected = {
            "unicode": "unicode_value",
            "single": "single_value", 
            "double": "double_value"
        }
        self.assertEqual(parsed, expected)

    def test_unicode_string_with_special_chars(self):
        """Test u'string' with special characters."""
        content = "u'hello@world.com'"
        parsed, _ = parse_expected_content(content)
        self.assertEqual(parsed, "hello@world.com")

    def test_empty_unicode_string(self):
        """Test empty u'string'."""
        content = "u''"
        parsed, _ = parse_expected_content(content)
        self.assertEqual(parsed, "")

    def test_unicode_strings_in_real_world_context(self):
        """Test u'strings' in a realistic PyMongo context."""
        content = '''
        {
            "_id": ObjectId("507f1f77bcf86cd799439011"),
            "name": u'John Smith',
            "email": u'john@example.com',
            "tags": [u'python', u'mongodb', u'developer'],
            "metadata": {
                "created_by": u'admin',
                "department": u'engineering'
            }
        }
        '''
        parsed, _ = parse_expected_content(content)
        expected = {
            "_id": "507f1f77bcf86cd799439011",  # ObjectId gets parsed as string in this context
            "name": "John Smith",
            "email": "john@example.com", 
            "tags": ["python", "mongodb", "developer"],
            "metadata": {
                "created_by": "admin",
                "department": "engineering"
            }
        }
        self.assertEqual(parsed, expected)

    def test_unicode_and_regular_strings_comparison(self):
        """Test that u'string' and 'string' are treated equivalently in comparison."""
        expected_content = '''
        {
            "name": u'John Doe',
            "city": "New York"
        }
        '''
        
        actual_data = {
            "name": "John Doe",
            "city": "New York"
        }
        
        Expect.that(actual_data).should_match(expected_content)

    def test_double_quoted_unicode_strings(self):
        """Test u\"string\" (double-quoted unicode strings)."""
        content = 'u"hello world"'
        parsed, _ = parse_expected_content(content)
        self.assertEqual(parsed, "hello world")

    def test_unicode_strings_with_numbers_and_symbols(self):
        """Test u'strings' containing numbers and symbols."""
        content = '''
        {
            "version": u'1.2.3',
            "pattern": u'user_*_data',
            "formula": u'x + y = z'
        }
        '''
        parsed, _ = parse_expected_content(content)
        expected = {
            "version": "1.2.3",
            "pattern": "user_*_data", 
            "formula": "x + y = z"
        }
        self.assertEqual(parsed, expected)


if __name__ == '__main__':
    unittest.main()
