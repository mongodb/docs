import unittest

from utils.comparison.comparison import compare_values, ComparisonOptions


class TestCompareCore(unittest.TestCase):
    def test_primitives_equal(self):
        r = compare_values(1, 1)
        self.assertTrue(r.is_match, r.error)
        r = compare_values(1.0, 1)
        self.assertTrue(r.is_match, r.error)
        r = compare_values("abc", "abc")
        self.assertTrue(r.is_match, r.error)

    def test_truncated_string(self):
        r = compare_values("Hello...", "Hello, world!")
        self.assertTrue(r.is_match, r.error)
        r = compare_values("Hello...", 5)
        self.assertFalse(r.is_match)

    def test_object_comparison_strict(self):
        expected = {"a": 1, "b": 2}
        actual = {"a": 1, "b": 2}
        self.assertTrue(compare_values(expected, actual).is_match)
        # extra key should fail when not in omitted fields mode
        actual2 = {"a": 1, "b": 2, "c": 3}
        self.assertFalse(compare_values(expected, actual2).is_match)

    def test_object_comparison_with_ignored_fields(self):
        expected = {"_id": "anything", "name": "John"}
        actual = {"_id": "507f1f77bcf86cd799439011", "name": "John"}
        r = compare_values(
            expected, actual, ComparisonOptions(ignore_field_values={"_id"})
        )
        self.assertTrue(r.is_match, r.error)

    def test_object_level_ellipsis(self):
        expected = {"...": "..."}
        actual = {"a": 1, "b": 2}
        self.assertTrue(compare_values(expected, actual).is_match)

    def test_array_ordered_and_ellipsis(self):
        expected = [1, 2, 3]
        actual = [1, 2, 3]
        self.assertTrue(compare_values(expected, actual).is_match)
        expected2 = [1, "...", 4]
        actual2 = [1, 2, 3, 4]
        self.assertTrue(compare_values(expected2, actual2).is_match)
        # full wildcard
        self.assertTrue(compare_values(["..."], [9, 8, 7]).is_match)


if __name__ == "__main__":
    unittest.main()
