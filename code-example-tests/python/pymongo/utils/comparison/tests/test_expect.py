"""
Unit tests for the plain-text fallback in ``utils.comparison.expect``.

These mirror the Go ``kernel_bridge_test.go`` coverage: when the comparison
kernel reports that it cannot parse the expected content as JSON and the
actual value is a string, ``Expect.should_match`` falls through to a
whitespace-tolerant text equality check so non-JSON fixtures keep working.
"""

import os
import tempfile
import unittest

from utils.comparison.expect import (
    Expect,
    _kernel_reports_parse_failure,
    _text_compare,
)
from utils.comparison.kernel_bridge import kernel_compare


class TestPlainTextFallback(unittest.TestCase):
    """End-to-end tests pinning Expect.should_match's plain-text fallback."""

    def setUp(self):
        self._tmpdir = tempfile.TemporaryDirectory()
        self.addCleanup(self._tmpdir.cleanup)
        self.dir = self._tmpdir.name

    def _write(self, name: str, content: str) -> str:
        path = os.path.join(self.dir, name)
        with open(path, "w", encoding="utf-8") as fh:
            fh.write(content)
        return path

    def test_file_match(self):
        content = "Hello, world!\nThis is plain text.\n"
        path = self._write("plain.txt", content)
        # Should not raise.
        Expect.that(content).should_match(path)

    def test_trailing_whitespace_tolerated(self):
        expected = "log line one\nlog line two"
        path = self._write("plain.txt", expected + "\n")
        # Extra trailing whitespace on actual is normalised by _text_compare.
        Expect.that(expected + "\n\n").should_match(path)

    def test_mismatch_still_fails(self):
        path = self._write("plain.txt", "expected text")
        with self.assertRaises(AssertionError):
            Expect.that("different text").should_match(path)

    def test_non_string_actual_rejected(self):
        # The fallback only applies when actual is a string; any other type
        # must propagate the kernel's parse-failure errors instead of
        # silently matching.
        path = self._write("plain.txt", "plain text")
        with self.assertRaises(AssertionError):
            Expect.that({"a": 1}).should_match(path)

    def test_malformed_json_shaped_expected(self):
        # Content starts with '{' so the kernel's parser travels further
        # before failing — guarding against future changes to the
        # parse-failure error path/message that would silently bypass
        # _kernel_reports_parse_failure.
        content = '{"this looks like json but isn\'t: missing colon and brace'
        path = self._write("malformed.txt", content)
        Expect.that(content).should_match(path)


class TestKernelContract(unittest.TestCase):
    """Contract test between the Python bridge and the kernel binary.

    The plain-text fallback hinges on ``_kernel_reports_parse_failure``
    recognising the kernel's error shape (``path == "expected"``, message
    contains ``"failed to parse expected content"``). If the kernel changes
    that wording or path, this fails loudly instead of silently disabling
    the fallback for every non-JSON fixture in production.
    """

    def test_kernel_still_emits_recognised_parse_failure(self):
        response = kernel_compare("not json at all", "not json at all")
        self.assertFalse(
            response.get("isMatch"),
            "kernel unexpectedly matched non-JSON expected against string actual",
        )
        self.assertTrue(
            _kernel_reports_parse_failure(response),
            f"kernel no longer emits a recognised parse-failure error; "
            f"plain-text fallback in Expect.should_match will be bypassed. "
            f"response={response}",
        )


class TestKernelReportsParseFailure(unittest.TestCase):
    """Unit tests for the _kernel_reports_parse_failure predicate."""

    def test_empty_response(self):
        self.assertFalse(_kernel_reports_parse_failure({}))

    def test_no_errors_list(self):
        self.assertFalse(_kernel_reports_parse_failure({"isMatch": False}))

    def test_top_level_error_treated_as_parse_failure(self):
        self.assertTrue(_kernel_reports_parse_failure({"error": "boom"}))

    def test_unrelated_path(self):
        response = {"errors": [{"path": "[0].name", "message": "mismatch"}]}
        self.assertFalse(_kernel_reports_parse_failure(response))

    def test_parse_failure_on_expected(self):
        response = {
            "errors": [
                {
                    "path": "expected",
                    "message": "failed to parse expected content: line 1: bad json",
                }
            ]
        }
        self.assertTrue(_kernel_reports_parse_failure(response))

    def test_matching_path_different_message(self):
        response = {"errors": [{"path": "expected", "message": "something else"}]}
        self.assertFalse(_kernel_reports_parse_failure(response))


class TestTextCompare(unittest.TestCase):
    """Unit tests for the _text_compare whitespace-tolerant equality check."""

    def test_identical(self):
        self.assertTrue(_text_compare("abc", "abc"))

    def test_crlf_vs_lf(self):
        self.assertTrue(_text_compare("a\r\nb", "a\nb"))

    def test_trailing_newline(self):
        self.assertTrue(_text_compare("abc", "abc\n"))

    def test_trailing_spaces(self):
        self.assertTrue(_text_compare("abc", "abc   "))

    def test_interior_whitespace_differs(self):
        self.assertFalse(_text_compare("a b", "a  b"))

    def test_different_content(self):
        self.assertFalse(_text_compare("abc", "xyz"))

    def test_non_string_actual_rejected(self):
        self.assertFalse(_text_compare("abc", {"a": 1}))
        self.assertFalse(_text_compare("abc", None))


if __name__ == "__main__":
    unittest.main()
