package compare

import (
	"os"
	"path/filepath"
	"testing"
)

// These tests pin the plain-text fallback in compareViaKernel: when the
// comparison kernel reports that it can't parse the expected content as JSON
// and the actual value is a string, the bridge falls through to a
// whitespace-tolerant text equality check so non-JSON fixtures still work.

func TestCompareViaKernel_PlainTextFallback_FileMatch(t *testing.T) {
	dir := t.TempDir()
	path := filepath.Join(dir, "plain.txt")
	content := "Hello, world!\nThis is plain text.\n"
	if err := os.WriteFile(path, []byte(content), 0o644); err != nil {
		t.Fatalf("WriteFile: %v", err)
	}

	result := compareViaKernel(path, content, &Options{})
	if !result.IsMatch {
		t.Fatalf("expected plain-text fallback to match, got errors: %v", result.Errors)
	}
}

func TestCompareViaKernel_PlainTextFallback_TrailingWhitespaceTolerated(t *testing.T) {
	dir := t.TempDir()
	path := filepath.Join(dir, "plain.txt")
	expected := "log line one\nlog line two"
	if err := os.WriteFile(path, []byte(expected+"\n"), 0o644); err != nil {
		t.Fatalf("WriteFile: %v", err)
	}

	result := compareViaKernel(path, expected+"\n\n", &Options{})
	if !result.IsMatch {
		t.Fatalf("expected fallback to tolerate trailing whitespace, got: %v", result.Errors)
	}
}

func TestCompareViaKernel_PlainTextFallback_Mismatch(t *testing.T) {
	dir := t.TempDir()
	path := filepath.Join(dir, "plain.txt")
	if err := os.WriteFile(path, []byte("expected text"), 0o644); err != nil {
		t.Fatalf("WriteFile: %v", err)
	}

	result := compareViaKernel(path, "different text", &Options{})
	if result.IsMatch {
		t.Fatal("expected mismatch when actual differs from non-JSON expected")
	}
	if len(result.Errors) == 0 {
		t.Fatal("expected kernel errors to be surfaced on mismatch")
	}
}

func TestCompareViaKernel_PlainTextFallback_NonStringActualRejected(t *testing.T) {
	// The fallback only applies when the actual value is a string; any other
	// type must propagate the kernel's parse-failure errors instead of
	// silently matching.
	dir := t.TempDir()
	path := filepath.Join(dir, "plain.txt")
	if err := os.WriteFile(path, []byte("plain text"), 0o644); err != nil {
		t.Fatalf("WriteFile: %v", err)
	}

	result := compareViaKernel(path, map[string]interface{}{"a": 1}, &Options{})
	if result.IsMatch {
		t.Fatal("expected non-string actual not to satisfy the text fallback")
	}
	if len(result.Errors) == 0 {
		t.Fatal("expected kernel errors to be surfaced when fallback does not apply")
	}
}

func TestKernelReportsParseFailure(t *testing.T) {
	cases := []struct {
		name string
		errs []Error
		want bool
	}{
		{"empty", nil, false},
		{"unrelated path", []Error{{Path: "[0].name", Message: "mismatch"}}, false},
		{
			"parse failure on expected",
			[]Error{{Path: "expected", Message: "failed to parse expected content: line 1: bad json"}},
			true,
		},
		{
			"matching path different message",
			[]Error{{Path: "expected", Message: "something else"}},
			false,
		},
	}
	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			if got := kernelReportsParseFailure(tc.errs); got != tc.want {
				t.Fatalf("kernelReportsParseFailure = %v, want %v", got, tc.want)
			}
		})
	}
}

func TestTextCompare(t *testing.T) {
	cases := []struct {
		name             string
		expected, actual string
		want             bool
	}{
		{"identical", "abc", "abc", true},
		{"crlf vs lf", "a\r\nb", "a\nb", true},
		{"trailing newline", "abc", "abc\n", true},
		{"trailing spaces", "abc", "abc   ", true},
		{"interior whitespace differs", "a b", "a  b", false},
		{"different content", "abc", "xyz", false},
	}
	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			if got := textCompare(tc.expected, tc.actual); got != tc.want {
				t.Fatalf("textCompare(%q, %q) = %v, want %v", tc.expected, tc.actual, got, tc.want)
			}
		})
	}
}

func TestCompareViaKernel_PlainTextFallback_MalformedJSONShapedExpected(t *testing.T) {
	// The existing FileMatch case uses obviously non-JSON content, so the
	// kernel may bail at the first token. This case uses content that starts
	// like JSON ("{...") so it travels further into the kernel's parser
	// before failing — guarding against future changes to the parse-failure
	// error path/message that would silently bypass kernelReportsParseFailure.
	dir := t.TempDir()
	path := filepath.Join(dir, "malformed.txt")
	content := `{"this looks like json but isn't: missing colon and brace`
	if err := os.WriteFile(path, []byte(content), 0o644); err != nil {
		t.Fatalf("WriteFile: %v", err)
	}

	result := compareViaKernel(path, content, &Options{})
	if !result.IsMatch {
		t.Fatalf("expected plain-text fallback to match malformed-JSON-shaped fixture, got: %v", result.Errors)
	}
}

func TestCompareViaKernel_KernelStillEmitsRecognisedParseFailure(t *testing.T) {
	// Contract test between the bridge and the kernel binary: the plain-text
	// fallback hinges on kernelReportsParseFailure recognising the kernel's
	// error shape (Path == "expected", message contains
	// "failed to parse expected content"). If the kernel changes that
	// wording or path, this fails loudly instead of silently disabling the
	// fallback for every non-JSON fixture in production.
	_, kerrs, err := kernelCompare("not json at all", "not json at all", &Options{})
	if err != nil {
		t.Fatalf("kernelCompare: %v", err)
	}
	if !kernelReportsParseFailure(kerrs) {
		t.Fatalf("kernel no longer emits a recognised parse-failure error; "+
			"plain-text fallback in compareViaKernel will be bypassed. errors=%v", kerrs)
	}
}
