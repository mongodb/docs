package compare

import (
	"bytes"
	"encoding/json"
	"fmt"
	"os"
	"os/exec"
	"path/filepath"
	"reflect"
	"runtime"
	"strings"
)

// compareViaKernel delegates a comparison to the language-agnostic kernel
// binary. The expected value is serialised into raw text the kernel can parse
// (existing file path → file contents; JSON-shaped string → as-is; everything
// else → BSON-normalised and JSON-encoded) and the actual value is serialised
// into a JSON-compatible payload. The kernel handles all parsing, ellipsis,
// MongoDB-shell normalisation, and schema validation, keeping behaviour
// identical across language suites.
func compareViaKernel(expected, actual interface{}, options *Options) Result {
	expectedContent, err := serializeExpectedForKernel(expected)
	if err != nil {
		return Result{
			IsMatch: false,
			Errors: []Error{{
				Path:    "expected",
				Message: fmt.Sprintf("Failed to resolve expected value: %v", err),
			}},
		}
	}

	actualPayload := serializeActualForKernel(actual)
	isMatch, kerrs, kerr := kernelCompare(expectedContent, actualPayload, options)
	if kerr != nil {
		return Result{
			IsMatch: false,
			Errors: []Error{{
				Path:    "kernel",
				Message: fmt.Sprintf("comparison-kernel invocation failed: %v", kerr),
			}},
		}
	}

	if isMatch {
		return Result{IsMatch: true}
	}

	// Plain-text fallback: when the kernel reports a parse failure on the
	// expected content and both sides are strings, fall through to a simple
	// text equality check so non-JSON text fixtures still work.
	if kernelReportsParseFailure(kerrs) {
		if actualStr, ok := actual.(string); ok && textCompare(expectedContent, actualStr) {
			return Result{IsMatch: true}
		}
	}

	return Result{IsMatch: false, Errors: kerrs}
}

// serializeExpectedForKernel turns an expected value into raw text the kernel
// can parse:
//   - existing file path                → file contents
//   - string starting with "{" or "["   → as-is (MongoDB-syntax content)
//   - everything else                   → BSON-normalised and JSON-serialised
func serializeExpectedForKernel(expected interface{}) (string, error) {
	if expected == nil {
		return "null", nil
	}
	if s, ok := expected.(string); ok {
		if looksLikeFilePath(s) {
			if resolved, err := resolveFilePath(s); err == nil {
				raw, ioErr := os.ReadFile(resolved)
				if ioErr != nil {
					return "", fmt.Errorf("failed to read expected file: %w", ioErr)
				}
				return string(raw), nil
			}
		}
		trimmed := strings.TrimLeft(s, " \t\r\n")
		if strings.HasPrefix(trimmed, "{") || strings.HasPrefix(trimmed, "[") {
			return s, nil
		}
		encoded, _ := json.Marshal(s)
		return string(encoded), nil
	}

	// Normalise BSON/struct types into JSON-friendly Go values, then encode.
	normalized := normalizeExpectedForWire(expected)
	encoded, err := json.Marshal(normalized)
	if err != nil {
		return "", fmt.Errorf("failed to marshal expected value: %w", err)
	}
	return string(encoded), nil
}

// normalizeExpectedForWire walks an arbitrary Go value and produces a
// JSON-marshalable equivalent, normalising BSON wrappers (ObjectID, Decimal128,
// DateTime), time.Time, bson.D/M/A, and struct slices so they survive the wire
// transit to the kernel.
func normalizeExpectedForWire(value interface{}) interface{} {
	if value == nil {
		return nil
	}
	// Slices need recursive normalisation; convertActualResults handles
	// bson.D / bson.M / struct slices via reflection and returns
	// []interface{}.
	v := reflect.ValueOf(value)
	if v.Kind() == reflect.Slice {
		if normalized, err := convertActualResults(value); err == nil {
			return normalized
		}
	}
	return normalizeValue(structToMap(value))
}

// looksLikeFilePath returns true if a string could plausibly be a file path
// (single-line, no JSON markers at the start, short enough to be a path).
func looksLikeFilePath(s string) bool {
	if s == "" || strings.ContainsAny(s, "\n\r") {
		return false
	}
	if len(s) > 1024 {
		return false
	}
	trimmed := strings.TrimLeft(s, " \t")
	if strings.HasPrefix(trimmed, "{") || strings.HasPrefix(trimmed, "[") {
		return false
	}
	return true
}

// kernelReportsParseFailure tells callers whether the kernel rejected the
// expected payload at parse time, so they can fall back to text comparison.
func kernelReportsParseFailure(errs []Error) bool {
	for _, e := range errs {
		if e.Path == "expected" && strings.Contains(e.Message, "failed to parse expected content") {
			return true
		}
	}
	return false
}

// textCompare provides a lightweight plain-text equality check, normalising
// CRLF and stripping trailing whitespace before comparing.
func textCompare(expected, actual string) bool {
	norm := func(s string) string {
		s = strings.ReplaceAll(s, "\r\n", "\n")
		return strings.TrimRight(s, " \t\n")
	}
	return norm(expected) == norm(actual)
}

// kernelProtocolVersion is the wire-protocol version this bridge speaks.
// Must match the kernel's ProtocolVersion constant.
const kernelProtocolVersion = 1

// kernelBinaryName returns the file name of the kernel binary matching the
// current host's GOOS/GOARCH, as produced by tools/comparison-kernel/build.sh.
func kernelBinaryName() string {
	suffix := ""
	if runtime.GOOS == "windows" {
		suffix = ".exe"
	}
	return fmt.Sprintf("comparison-kernel-%s-%s%s", runtime.GOOS, runtime.GOARCH, suffix)
}

// kernelBinaryPath walks up from the working directory (and the executable
// directory) to find the platform-specific kernel binary under
// tools/comparison-kernel/bin/.
func kernelBinaryPath() (string, error) {
	binaryName := kernelBinaryName()
	starts := []string{}

	if exe, err := os.Executable(); err == nil {
		starts = append(starts, filepath.Dir(exe))
	}
	if wd, err := os.Getwd(); err == nil {
		starts = append(starts, wd)
	}

	for _, start := range starts {
		dir := start
		for i := 0; i < 12; i++ {
			candidate := filepath.Join(
				dir, "tools", "comparison-kernel", "bin", binaryName,
			)
			if _, err := os.Stat(candidate); err == nil {
				return candidate, nil
			}
			parent := filepath.Dir(dir)
			if parent == dir {
				break
			}
			dir = parent
		}
	}

	return "", fmt.Errorf(
		"%s not found; build it with: ./build.sh in "+
			"code-example-tests/tools/comparison-kernel",
		binaryName,
	)
}

// serializeActualForKernel normalizes BSON/Go types into a JSON-serialisable
// value (typically a []interface{}) suitable for the kernel's "actual" field.
// The value is embedded directly in the request JSON, not stringified.
// It uses convertActualResults (normalize.go) which correctly handles []bson.D,
// []bson.M, and generic struct slices via reflection.
func serializeActualForKernel(actual interface{}) interface{} {
	if actual == nil {
		return []interface{}{}
	}

	// convertActualResults handles []bson.D, []bson.M, and struct slices.
	// If actual is not a slice, fall back to normalizeValue and wrap in a slice.
	normalized, err := convertActualResults(actual)
	if err != nil {
		// Not a slice — treat as a single document.
		normalized = []interface{}{normalizeValue(actual)}
	}
	return normalized
}

// kernelCompare sends a one-shot comparison request to the kernel process.
// Returns (isMatch, errors, error). A non-nil error means the kernel could
// not be invoked or returned a malformed response; callers should surface it
// to the test rather than masking it.
func kernelCompare(expectedContent string, actualPayload interface{}, opts *Options) (bool, []Error, error) {
	binaryPath, err := kernelBinaryPath()
	if err != nil {
		return false, nil, err
	}

	type wireSchema struct {
		Count          int                    `json:"count"`
		RequiredFields []string               `json:"requiredFields,omitempty"`
		FieldValues    map[string]interface{} `json:"fieldValues,omitempty"`
	}
	type wireOptions struct {
		ComparisonType    string      `json:"comparisonType,omitempty"`
		IgnoreFieldValues []string    `json:"ignoreFieldValues,omitempty"`
		Schema            *wireSchema `json:"schema,omitempty"`
	}
	type wireRequest struct {
		ProtocolVersion int         `json:"protocolVersion"`
		Expected        string      `json:"expected"`
		Actual          interface{} `json:"actual"`
		Options         wireOptions `json:"options"`
	}

	wOpts := wireOptions{}
	if opts != nil {
		wOpts.ComparisonType = opts.ComparisonType
		wOpts.IgnoreFieldValues = opts.IgnoreFieldValues
		if opts.Schema != nil {
			fv := opts.Schema.FieldValues
			normalizedFV := make(map[string]interface{}, len(fv))
			for k, v := range fv {
				normalizedFV[k] = normalizeExpectedForWire(v)
			}
			wOpts.Schema = &wireSchema{
				Count:          opts.Schema.Count,
				RequiredFields: opts.Schema.RequiredFields,
				FieldValues:    normalizedFV,
			}
		}
	}

	reqBytes, err := json.Marshal(wireRequest{
		ProtocolVersion: kernelProtocolVersion,
		Expected:        expectedContent,
		Actual:          actualPayload,
		Options:         wOpts,
	})
	if err != nil {
		return false, nil, fmt.Errorf("failed to marshal kernel request: %w", err)
	}

	cmd := exec.Command(binaryPath)
	cmd.Stdin = bytes.NewReader(append(reqBytes, '\n'))

	var stdout, stderr bytes.Buffer
	cmd.Stdout = &stdout
	cmd.Stderr = &stderr

	if err := cmd.Run(); err != nil {
		return false, nil, fmt.Errorf(
			"kernel exited with error: %v\nstderr: %s", err, stderr.String(),
		)
	}

	line := strings.TrimSpace(stdout.String())
	if line == "" {
		return false, nil, fmt.Errorf("kernel returned empty response")
	}

	type wireError struct {
		Path     string `json:"path"`
		Message  string `json:"message"`
		Expected string `json:"expected"`
		Actual   string `json:"actual"`
	}
	type wireResponse struct {
		IsMatch bool        `json:"isMatch"`
		Errors  []wireError `json:"errors"`
		Error   string      `json:"error"`
	}

	var resp wireResponse
	if err := json.Unmarshal([]byte(line), &resp); err != nil {
		return false, nil, fmt.Errorf("failed to parse kernel response: %w", err)
	}

	if resp.IsMatch {
		return true, nil, nil
	}

	errs := make([]Error, 0, len(resp.Errors))
	for _, ke := range resp.Errors {
		errs = append(errs, Error{
			Path:     ke.Path,
			Message:  ke.Message,
			Expected: ke.Expected,
			Actual:   ke.Actual,
		})
	}
	if len(errs) == 0 && resp.Error != "" {
		errs = append(errs, Error{Message: resp.Error})
	}

	return false, errs, nil
}
