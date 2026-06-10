// Package main is the comparison kernel.
//
// It reads newline-delimited JSON requests from stdin and writes newline-delimited
// JSON responses to stdout. Each request contains the raw text of an expected
// output file (already read by the language-specific wrapper), the actual results
// serialised as a JSON array or object, and optional comparison options.
//
// Build (pure-Go cross-compile, no cgo). See build.sh for the full target list:
//
//	GOOS=darwin  GOARCH=arm64 go build -o bin/comparison-kernel-darwin-arm64 .
//	GOOS=linux   GOARCH=amd64 go build -o bin/comparison-kernel-linux-amd64  .
//	...
//
// # Protocol
//
// Request (one JSON object per line):
//
//	{
//	  "protocolVersion": 1,
//	  "expected": "<raw text of expected output file>",
//	  "actual":   <JSON array or object of actual results>,
//	  "options":  {
//	    "comparisonType":    "ordered" | "unordered",
//	    "ignoreFieldValues": ["_id", ...],
//	    "schema": {
//	      "count":          <int>,
//	      "requiredFields": ["field", ...],
//	      "fieldValues":    {"field": <value>, ...}
//	    }
//	  }
//	}
//
// Response (one JSON object per line):
//
//	{ "protocolVersion": 1, "isMatch": true,  "errors": [] }
//	{ "protocolVersion": 1, "isMatch": false, "errors": [{"path": "...", "message": "..."}] }
//	{ "protocolVersion": 1, "error": "protocol error message" }   // on parse failure
//
// protocolVersion is optional on the request for backward compatibility
// (absent → treated as 1). Bridges should send it so the kernel can fail
// fast against a stale binary; the kernel always echoes its version on
// responses so bridges can detect a mismatch.
package main

import (
	"bufio"
	"encoding/json"
	"fmt"
	"os"
	"strings"
)

// ProtocolVersion is the wire-protocol version this kernel speaks. Bumped
// when the shape of request/response/options changes incompatibly.
const ProtocolVersion = 1

// request is the over-the-wire request format.
// Actual is embedded as a JSON value (array or object), not a JSON-encoded
// string, so that the kernel doesn't have to double-decode it.
type request struct {
	ProtocolVersion int         `json:"protocolVersion,omitempty"`
	Expected        string      `json:"expected"`
	Actual          interface{} `json:"actual"`
	Options         Options     `json:"options"`
}

// response is the over-the-wire response format.
type response struct {
	ProtocolVersion int     `json:"protocolVersion"`
	IsMatch         bool    `json:"isMatch"`
	Errors          []Error `json:"errors,omitempty"`
	Error           string  `json:"error,omitempty"` // non-empty on protocol / parse errors
}

func main() {
	// Use a large scanner buffer — expected files can be sizable.
	scanner := bufio.NewScanner(os.Stdin)
	scanner.Buffer(make([]byte, 10*1024*1024), 10*1024*1024)

	for scanner.Scan() {
		line := scanner.Text()
		if strings.TrimSpace(line) == "" {
			continue
		}

		var req request
		if err := json.Unmarshal([]byte(line), &req); err != nil {
			writeResponse(response{Error: fmt.Sprintf("failed to parse request: %v", err)})
			continue
		}

		// Fail fast if the bridge speaks an incompatible protocol version.
		// Absent / zero version is accepted as v1 for backward compatibility.
		if req.ProtocolVersion != 0 && req.ProtocolVersion != ProtocolVersion {
			writeResponse(response{Error: fmt.Sprintf(
				"unsupported protocol version %d (kernel speaks %d); "+
					"rebuild the kernel or update the language bridge",
				req.ProtocolVersion, ProtocolVersion)})
			continue
		}

		result := process(&req)
		writeResponse(response{IsMatch: result.IsMatch, Errors: result.Errors})
	}

	if err := scanner.Err(); err != nil {
		fmt.Fprintf(os.Stderr, "comparison-kernel: scanner error: %v\n", err)
		os.Exit(1)
	}
}

func writeResponse(resp response) {
	// Always advertise the kernel's protocol version so bridges can detect
	// a stale binary even when the request didn't include a version.
	resp.ProtocolVersion = ProtocolVersion
	data, err := json.Marshal(resp)
	if err != nil {
		// Last-resort: write a plain error line
		fmt.Fprintf(os.Stdout, `{"protocolVersion":%d,"error":"failed to marshal response: %s"}`+"\n",
			ProtocolVersion, err)
		return
	}
	fmt.Fprintln(os.Stdout, string(data))
}

// process runs the comparison for a single request and returns the Result.
func process(req *request) Result {
	// Parse the expected content (raw file text).
	expectedDocs, err := parseContent(req.Expected)
	if err != nil {
		return Result{
			IsMatch: false,
			Errors:  []Error{{Path: "expected", Message: fmt.Sprintf("failed to parse expected content: %v", err)}},
		}
	}

	// Actual is delivered as a parsed JSON value (array or object) by the outer
	// request decoder — no second json.Unmarshal needed.
	actualDocs, err := jsonValueToSlice(req.Actual)
	if err != nil {
		return Result{
			IsMatch: false,
			Errors:  []Error{{Path: "actual", Message: err.Error()}},
		}
	}

	opts := &req.Options

	// Schema-based validation (ShouldResemble path).
	if opts.Schema != nil {
		return validateWithSchema(expectedDocs, actualDocs, opts.Schema)
	}

	// Standard document-array comparison (ShouldMatch path).
	return compareDocumentArrays(expectedDocs, actualDocs, opts)
}

// compareDocumentArrays compares expected and actual document arrays applying
// the configured comparison options.
func compareDocumentArrays(expectedDocs, actualDocs []interface{}, options *Options) Result {
	if options == nil {
		options = &Options{}
	}

	// If the expected document list contains "..." items, treat them as "any
	// number of additional documents may appear here" and do a subset match:
	// verify every non-ellipsis expected doc appears somewhere in actual.
	if ellipsisResult := handleArrayLevelEllipsis(expectedDocs); ellipsisResult.handled {
		if ellipsisResult.requiresSpecialMatching {
			return matchDocumentListWithEllipsis(expectedDocs, actualDocs, options)
		}
		// ["..."] alone matches any document list.
		return Result{IsMatch: true}
	}

	if len(expectedDocs) != len(actualDocs) {
		return Result{
			IsMatch: false,
			Errors: []Error{{
				Path:     "",
				Expected: fmt.Sprintf("%d document(s)", len(expectedDocs)),
				Actual:   fmt.Sprintf("%d document(s)", len(actualDocs)),
				Message: fmt.Sprintf(
					"document count mismatch: expected %d document(s) but got %d. Check that your expected output has the same number of documents as your actual results.",
					len(expectedDocs), len(actualDocs),
				),
			}},
		}
	}

	if options.ComparisonType == "ordered" {
		var allErrors []Error
		for i := range expectedDocs {
			docPath := fmt.Sprintf("[%d]", i)
			res := compareValues(expectedDocs[i], actualDocs[i], options, false, docPath)
			if !res.IsMatch {
				allErrors = append(allErrors, res.Errors...)
			}
		}
		return Result{IsMatch: len(allErrors) == 0, Errors: allErrors}
	}

	// Default: unordered comparison.
	return compareArraysByBacktracking(expectedDocs, actualDocs, options, false, "")
}

// matchDocumentListWithEllipsis handles a top-level document list that contains
// "..." items. Those items signal "any number of additional documents may appear
// here." The function verifies that every non-ellipsis expected document appears
// at least once in the actual results (unordered subset match).
func matchDocumentListWithEllipsis(expectedDocs, actualDocs []interface{}, options *Options) Result {
	var nonEllipsis []interface{}
	for _, doc := range expectedDocs {
		if s, ok := doc.(string); ok && s == "..." {
			continue
		}
		nonEllipsis = append(nonEllipsis, doc)
	}

	if len(actualDocs) < len(nonEllipsis) {
		return Result{
			IsMatch: false,
			Errors: []Error{{
				Path:     "",
				Expected: fmt.Sprintf("at least %d document(s)", len(nonEllipsis)),
				Actual:   fmt.Sprintf("%d document(s)", len(actualDocs)),
				Message: fmt.Sprintf(
					"document count mismatch: expected at least %d document(s) but got %d.",
					len(nonEllipsis), len(actualDocs),
				),
			}},
		}
	}

	// Greedily match each required doc to an unused actual doc.
	// hasOmittedFields=false: a top-level "..." item only allows extra documents
	// in the list — it does not loosen field-level matching on the listed docs.
	// Writers who want partial field matching should add an object-level "..."
	// (e.g. {"title": "Gravity", "...": "..."}) inside the doc itself.
	used := make([]bool, len(actualDocs))
	for expIdx, expDoc := range nonEllipsis {
		matched := false
		for actIdx, actDoc := range actualDocs {
			if used[actIdx] {
				continue
			}
			res := compareValues(expDoc, actDoc, options, false, fmt.Sprintf("[%d]", expIdx))
			if res.IsMatch {
				used[actIdx] = true
				matched = true
				break
			}
		}
		if !matched {
			return Result{
				IsMatch: false,
				Errors: []Error{{
					Path: fmt.Sprintf("[%d]", expIdx),
					Message: fmt.Sprintf(
						"expected document not found in %d actual result(s)",
						len(actualDocs),
					),
				}},
			}
		}
	}
	return Result{IsMatch: true}
}

// parseContent pre-processes raw expected-output text and parses it into a
// slice of normalised document values.
func parseContent(content string) ([]interface{}, error) {
	// Normalise line endings.
	content = strings.ReplaceAll(content, "\r\n", "\n")
	lines := strings.Split(content, "\n")

	// Detect a global ellipsis (standalone "..." line).
	hasGlobalEllipsis := false
	for _, line := range lines {
		if strings.TrimSpace(line) == "..." {
			hasGlobalEllipsis = true
			break
		}
	}

	// Strip standalone "..." lines so the remainder parses as JSON.
	var kept []string
	for _, line := range lines {
		if strings.TrimSpace(line) != "..." {
			kept = append(kept, line)
		}
	}
	stripped := strings.Join(kept, "\n")

	// Try to parse the whole content as one JSON value.
	normalized := preprocessMongoSyntax(stripped)
	var root interface{}
	if err := json.Unmarshal([]byte(normalized), &root); err == nil {
		return rootToDocSlice(root, hasGlobalEllipsis)
	}

	// Fall back to newline-delimited JSON (one document per non-empty line).
	return parseNDJSON(lines, hasGlobalEllipsis)
}

func rootToDocSlice(root interface{}, hasGlobalEllipsis bool) ([]interface{}, error) {
	switch v := root.(type) {
	case map[string]interface{}:
		doc := normalizeValue(v)
		applyGlobalEllipsis(hasGlobalEllipsis, doc)
		return []interface{}{doc}, nil
	case []interface{}:
		docs := make([]interface{}, 0, len(v))
		for _, item := range v {
			doc := normalizeValue(item)
			applyGlobalEllipsis(hasGlobalEllipsis, doc)
			docs = append(docs, doc)
		}
		return docs, nil
	default:
		// Primitive root (string/number/bool/null). Treat as a single-element
		// document list so callers can compare against a primitive actual value
		// like Expect.that(2).shouldMatch(2). Global ellipsis does not apply to
		// primitives — there are no fields to elide.
		return []interface{}{normalizeValue(root)}, nil
	}
}

func parseNDJSON(lines []string, hasGlobalEllipsis bool) ([]interface{}, error) {
	var docs []interface{}
	for i, line := range lines {
		trimmed := strings.TrimSpace(line)
		if trimmed == "" || trimmed == "..." {
			continue
		}
		normalized := preprocessMongoSyntax(trimmed)
		var doc interface{}
		if err := json.Unmarshal([]byte(normalized), &doc); err != nil {
			return nil, fmt.Errorf("line %d: failed to parse JSON: %v", i+1, err)
		}
		normalized2 := normalizeValue(doc)
		applyGlobalEllipsis(hasGlobalEllipsis, normalized2)
		docs = append(docs, normalized2)
	}
	return docs, nil
}

func applyGlobalEllipsis(hasGlobalEllipsis bool, doc interface{}) {
	if !hasGlobalEllipsis {
		return
	}
	if m, ok := doc.(map[string]interface{}); ok {
		m["..."] = "..."
	}
}

// jsonValueToSlice converts a parsed JSON value (from json.Unmarshal) into a
// []interface{} of normalised documents. Primitive roots (string/number/bool)
// are wrapped in a single-element slice so that Expect.shouldMatch(<primitive>)
// can flow through the kernel uniformly with object/array comparisons.
func jsonValueToSlice(value interface{}) ([]interface{}, error) {
	switch v := value.(type) {
	case []interface{}:
		normalized := make([]interface{}, len(v))
		for i, item := range v {
			normalized[i] = normalizeValue(item)
		}
		return normalized, nil
	case map[string]interface{}:
		return []interface{}{normalizeValue(v)}, nil
	default:
		return []interface{}{normalizeValue(value)}, nil
	}
}
