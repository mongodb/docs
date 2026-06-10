package main

import (
	"encoding/json"
	"os"
	"strings"
	"testing"
)

// TestKernelSmokeTest exercises the core kernel logic directly (without
// going through a child process) to verify that parseContent,
// compareDocumentArrays, and validateWithSchema behave correctly for
// representative cases.

func TestParseAndCompare_BasicMatch(t *testing.T) {
	expected, err := parseContent(`{"name":"Alice"}`)
	if err != nil {
		t.Fatalf("parseContent: %v", err)
	}
	actual := []interface{}{map[string]interface{}{"name": "Alice"}}
	result := compareDocumentArrays(expected, actual, &Options{})
	if !result.IsMatch {
		t.Errorf("expected match, got errors: %v", result.Errors)
	}
}

func TestParseAndCompare_BasicMismatch(t *testing.T) {
	expected, _ := parseContent(`{"name":"Alice"}`)
	actual := []interface{}{map[string]interface{}{"name": "Bob"}}
	result := compareDocumentArrays(expected, actual, &Options{})
	if result.IsMatch {
		t.Error("expected mismatch, got match")
	}
	if len(result.Errors) == 0 {
		t.Error("expected errors to be non-empty on mismatch")
	}
}

func TestParseAndCompare_EllipsisWildcard(t *testing.T) {
	expected, err := parseContent(`{"name":"...","_id":"..."}`)
	if err != nil {
		t.Fatalf("parseContent: %v", err)
	}
	actual := []interface{}{map[string]interface{}{"name": "Alice", "_id": "abc123"}}
	result := compareDocumentArrays(expected, actual, &Options{})
	if !result.IsMatch {
		t.Errorf("expected ellipsis wildcard to match, got: %v", result.Errors)
	}
}

// TestParseAndCompare_EllipsisAllowsMissingKey verifies that a property-level
// "..." value matches when the key is absent from actual, preserving the
// legacy per-language engine contract that documented `"..."` as "matches any
// value for a key" (including the key being omitted).
func TestParseAndCompare_EllipsisAllowsMissingKey(t *testing.T) {
	expected, err := parseContent(`{"name":"Alice","cast":"...","writers":"..."}`)
	if err != nil {
		t.Fatalf("parseContent: %v", err)
	}
	actual := []interface{}{map[string]interface{}{"name": "Alice"}}
	result := compareDocumentArrays(expected, actual, &Options{})
	if !result.IsMatch {
		t.Errorf("expected ellipsis value to allow missing key, got: %v", result.Errors)
	}
}

func TestParseAndCompare_GlobalEllipsis(t *testing.T) {
	// The "..." on its own line means extra fields in actual are allowed.
	content := `{"name":"Alice"}` + "\n..."
	expected, err := parseContent(content)
	if err != nil {
		t.Fatalf("parseContent: %v", err)
	}
	actual := []interface{}{map[string]interface{}{"name": "Alice", "age": float64(30)}}
	result := compareDocumentArrays(expected, actual, &Options{})
	if !result.IsMatch {
		t.Errorf("expected global ellipsis to allow extra fields, got: %v", result.Errors)
	}
}

func TestParseAndCompare_IgnoredFields(t *testing.T) {
	expected, _ := parseContent(`{"name":"Alice","_id":"placeholder"}`)
	actual := []interface{}{map[string]interface{}{"name": "Alice", "_id": "different-every-time"}}
	result := compareDocumentArrays(expected, actual, &Options{IgnoreFieldValues: []string{"_id"}})
	if !result.IsMatch {
		t.Errorf("expected ignored _id to match, got: %v", result.Errors)
	}
}

func TestParseAndCompare_OrderedComparison(t *testing.T) {
	content := `{"name":"Alice"}` + "\n" + `{"name":"Bob"}`
	expected, _ := parseContent(content)
	// Same docs in reverse order — should fail with ordered, succeed with unordered
	actual := []interface{}{
		map[string]interface{}{"name": "Bob"},
		map[string]interface{}{"name": "Alice"},
	}
	ordered := compareDocumentArrays(expected, actual, &Options{ComparisonType: "ordered"})
	if ordered.IsMatch {
		t.Error("expected ordered comparison to fail for reversed documents")
	}
	unordered := compareDocumentArrays(expected, actual, &Options{})
	if !unordered.IsMatch {
		t.Errorf("expected unordered comparison to succeed for reversed documents, got: %v", unordered.Errors)
	}
}

func TestParseAndCompare_MongoDBSyntax(t *testing.T) {
	// ObjectId() constructor should be reduced to its hex string.
	content := `{"_id": ObjectId('507f1f77bcf86cd799439011'), "name": 'Alice'}`
	expected, err := parseContent(content)
	if err != nil {
		t.Fatalf("parseContent with MongoDB syntax: %v", err)
	}
	actual := []interface{}{
		map[string]interface{}{
			"_id":  "507f1f77bcf86cd799439011",
			"name": "Alice",
		},
	}
	result := compareDocumentArrays(expected, actual, &Options{})
	if !result.IsMatch {
		t.Errorf("expected MongoDB ObjectId syntax to normalise and match, got: %v", result.Errors)
	}
}

func TestParseAndCompare_ExtendedJSONDate(t *testing.T) {
	// {$date: "..."} in the expected file should be reduced to its ISO string.
	content := `{"ts":{"$date":"2021-12-18T15:55:00Z"}}`
	expected, err := parseContent(content)
	if err != nil {
		t.Fatalf("parseContent with $date: %v", err)
	}
	actual := []interface{}{map[string]interface{}{"ts": "2021-12-18T15:55:00Z"}}
	result := compareDocumentArrays(expected, actual, &Options{})
	if !result.IsMatch {
		t.Errorf("expected $date to normalise and match, got: %v", result.Errors)
	}
}

func TestParseAndCompare_ActualExtendedJSONDate(t *testing.T) {
	// The Java bridge serialises Date values as {"$date":"..."} in the actual JSON.
	// normalizeValue must collapse that wrapper so it compares equal to the plain
	// ISO string that preprocessMongoSyntax produces from the expected file.
	content := `{"ts":"2021-12-18T15:55:00Z"}`
	expected, err := parseContent(content)
	if err != nil {
		t.Fatalf("parseContent: %v", err)
	}
	// Simulate what the Java bridge sends: a JSON array where the date field is
	// an Extended JSON object {"$date":"..."}.  Route through jsonValueToSlice so
	// that normalizeValue is applied, exactly as process() does at runtime.
	actualJSON := `[{"ts":{"$date":"2021-12-18T15:55:00Z"}}]`
	var actualRaw interface{}
	if err := json.Unmarshal([]byte(actualJSON), &actualRaw); err != nil {
		t.Fatalf("json.Unmarshal: %v", err)
	}
	actual, err := jsonValueToSlice(actualRaw)
	if err != nil {
		t.Fatalf("jsonValueToSlice: %v", err)
	}
	result := compareDocumentArrays(expected, actual, &Options{})
	if !result.IsMatch {
		t.Errorf("expected actual {$date:...} to normalise and match plain string, got: %v", result.Errors)
	}
}

func TestParseAndCompare_CSharpFractionalSeconds(t *testing.T) {
	// The C# ValueNormalizer always emits milliseconds: "2021-12-18T15:55:00.000Z".
	// normalizeStringValue must parse that via RFC3339Nano so that it compares equal
	// to the second-precision string that may appear in the expected file.
	content := `{"ts":"2021-12-18T15:55:00Z"}`
	expected, err := parseContent(content)
	if err != nil {
		t.Fatalf("parseContent: %v", err)
	}
	actual := []interface{}{map[string]interface{}{"ts": "2021-12-18T15:55:00.000Z"}}
	result := compareDocumentArrays(expected, actual, &Options{})
	if !result.IsMatch {
		t.Errorf("expected fractional-second date to normalise and match, got: %v", result.Errors)
	}
}

func TestSchemaValidation(t *testing.T) {
	expectedDocs := []interface{}{
		map[string]interface{}{"_id": "a1", "title": "Movie A", "year": float64(2012)},
		map[string]interface{}{"_id": "a2", "title": "Movie B", "year": float64(2012)},
	}
	actualDocs := []interface{}{
		map[string]interface{}{"_id": "b1", "title": "Film X", "year": float64(2012), "extra": "data"},
		map[string]interface{}{"_id": "b2", "title": "Film Y", "year": float64(2012)},
	}
	schema := &Schema{
		Count:          2,
		RequiredFields: []string{"_id", "title", "year"},
		FieldValues:    map[string]interface{}{"year": float64(2012)},
	}
	result := validateWithSchema(expectedDocs, actualDocs, schema)
	if !result.IsMatch {
		t.Errorf("expected schema validation to pass, got: %v", result.Errors)
	}
}

func TestProcessRequest_FullProtocol(t *testing.T) {
	// Simulate the full over-the-wire flow by round-tripping the request
	// through JSON exactly like the kernel main loop does.
	expectedContent := `{"name":"Alice"}`
	wire, _ := json.Marshal(map[string]interface{}{
		"protocolVersion": ProtocolVersion,
		"expected":        expectedContent,
		"actual":          []map[string]interface{}{{"name": "Alice"}},
		"options":         map[string]interface{}{},
	})
	var req request
	if err := json.Unmarshal(wire, &req); err != nil {
		t.Fatalf("json.Unmarshal: %v", err)
	}
	if req.ProtocolVersion != ProtocolVersion {
		t.Errorf("expected protocolVersion to round-trip, got %d", req.ProtocolVersion)
	}
	result := process(&req)
	if !result.IsMatch {
		t.Errorf("expected full protocol match, got: %v", result.Errors)
	}
}

// TestParseAndCompare_DocListEllipsis verifies that "..." items in the top-level
// document list allow extra actual documents (subset match). This replicates the
// CI failure where AnalyzerPathSearchOutput.txt expected ["...", {Gravity}, "..."]
// but Atlas Search returned 5 docs instead of 3.
func TestParseAndCompare_DocListEllipsis(t *testing.T) {
	// Expected file contains 3 items: two "..." wildcards and one required doc.
	expectedContent := `[
  "...",
  { "title" : "Gravity", "year" : 2013, "rated" : "PG-13" },
  "..."
]`
	expectedDocs, err := parseContent(expectedContent)
	if err != nil {
		t.Fatalf("parseContent: %v", err)
	}

	// Simulate CI: actual has 5 docs, only one of which is Gravity.
	actualDocs := []interface{}{
		map[string]interface{}{"title": "Gravity Falls", "year": float64(2012), "rated": "TV-Y7"},
		map[string]interface{}{"title": "Gravity", "year": float64(2013), "rated": "PG-13"},
		map[string]interface{}{"title": "Zero Gravity", "year": float64(1999), "rated": "PG"},
		map[string]interface{}{"title": "Anti-Gravity", "year": float64(2000), "rated": "R"},
		map[string]interface{}{"title": "Defying Gravity", "year": float64(2008), "rated": "TV-14"},
	}

	result := compareDocumentArrays(expectedDocs, actualDocs, &Options{})
	if !result.IsMatch {
		t.Errorf("expected subset match to pass with 5 actual docs, got: %v", result.Errors)
	}

	// Simulate local: exact count (3) also still works.
	threeActual := []interface{}{
		map[string]interface{}{"title": "Gravity Falls", "year": float64(2012), "rated": "TV-Y7"},
		map[string]interface{}{"title": "Gravity", "year": float64(2013), "rated": "PG-13"},
		map[string]interface{}{"title": "Zero Gravity", "year": float64(1999), "rated": "PG"},
	}
	result2 := compareDocumentArrays(expectedDocs, threeActual, &Options{})
	if !result2.IsMatch {
		t.Errorf("expected subset match to pass with 3 actual docs, got: %v", result2.Errors)
	}

	// Verify it fails when the required doc is absent.
	noGravity := []interface{}{
		map[string]interface{}{"title": "Gravity Falls", "year": float64(2012), "rated": "TV-Y7"},
		map[string]interface{}{"title": "Zero Gravity", "year": float64(1999), "rated": "PG"},
	}
	result3 := compareDocumentArrays(expectedDocs, noGravity, &Options{})
	if result3.IsMatch {
		t.Errorf("expected mismatch when required doc is absent, but got IsMatch=true")
	}
}

// TestDocListEllipsis_DoesNotLoosenFieldMatching verifies that "..." items in
// the top-level document list only affect the count subset; per-doc field
// matching stays strict. Writers must use an object-level "..." inside a doc
// to allow extra fields.
func TestDocListEllipsis_DoesNotLoosenFieldMatching(t *testing.T) {
	expectedContent := `[
  { "title" : "Gravity", "year" : 2013 },
  "..."
]`
	expectedDocs, err := parseContent(expectedContent)
	if err != nil {
		t.Fatalf("parseContent: %v", err)
	}

	// Actual contains an extra field "rating" on the otherwise-matching doc.
	// With the previous behaviour (hasOmittedFields forced to true) this would
	// have matched silently. The fix requires the listed doc to match exactly,
	// so the extra field should now be reported.
	actualDocs := []interface{}{
		map[string]interface{}{"title": "Gravity", "year": float64(2013), "rating": "PG-13"},
	}
	result := compareDocumentArrays(expectedDocs, actualDocs, &Options{})
	if result.IsMatch {
		t.Error("expected strict per-doc match to reject extra fields, but got IsMatch=true")
	}

	// The same expected list should still match an actual list whose Gravity
	// doc has exactly the listed fields, even with extra docs around it.
	actualDocs2 := []interface{}{
		map[string]interface{}{"title": "Other", "year": float64(1999)},
		map[string]interface{}{"title": "Gravity", "year": float64(2013)},
	}
	result2 := compareDocumentArrays(expectedDocs, actualDocs2, &Options{})
	if !result2.IsMatch {
		t.Errorf("expected subset match with exact per-doc fields to pass, got: %v", result2.Errors)
	}

	// Writers who want field omission must opt in via an object-level "...".
	openContent := `[
  { "title" : "Gravity", "year" : 2013, "..." : "..." },
  "..."
]`
	openDocs, err := parseContent(openContent)
	if err != nil {
		t.Fatalf("parseContent: %v", err)
	}
	result3 := compareDocumentArrays(openDocs, actualDocs, &Options{})
	if !result3.IsMatch {
		t.Errorf("expected object-level ... to allow extra fields, got: %v", result3.Errors)
	}
}

// TestNestedArrayEllipsis_ChecksElementContent verifies that an array with
// "..." items nested inside a document validates the non-ellipsis elements
// against actual array elements, not just the element count. A length-only
// check would let [1, "...", {"x": 1}] silently pass against [5, 6, 7].
func TestNestedArrayEllipsis_ChecksElementContent(t *testing.T) {
	expectedContent := `{ "tags" : [1, "...", { "x" : 1 }] }`
	expectedDocs, err := parseContent(expectedContent)
	if err != nil {
		t.Fatalf("parseContent: %v", err)
	}

	// Actual has the right length but neither 1 nor {x:1} is present.
	bogus := []interface{}{map[string]interface{}{
		"tags": []interface{}{float64(5), float64(6), float64(7)},
	}}
	result := compareDocumentArrays(expectedDocs, bogus, &Options{})
	if result.IsMatch {
		t.Error("expected mismatch when required elements are absent, but got IsMatch=true")
	}

	// Actual contains both required elements interleaved with extras.
	good := []interface{}{map[string]interface{}{
		"tags": []interface{}{float64(1), float64(2), map[string]interface{}{"x": float64(1)}},
	}}
	result2 := compareDocumentArrays(expectedDocs, good, &Options{})
	if !result2.IsMatch {
		t.Errorf("expected match when required elements are present, got: %v", result2.Errors)
	}

	// Required element missing while the other is present still fails.
	partial := []interface{}{map[string]interface{}{
		"tags": []interface{}{float64(1), float64(2), float64(3)},
	}}
	result3 := compareDocumentArrays(expectedDocs, partial, &Options{})
	if result3.IsMatch {
		t.Error("expected mismatch when one required element is absent, but got IsMatch=true")
	}
}

// TestNestedArrayEllipsis_FullWildcardStillMatches confirms that the single-
// element ["..."] form continues to match any array, including empty arrays.
func TestNestedArrayEllipsis_FullWildcardStillMatches(t *testing.T) {
	expectedDocs, err := parseContent(`{ "tags" : ["..."] }`)
	if err != nil {
		t.Fatalf("parseContent: %v", err)
	}
	cases := [][]interface{}{
		{},
		{float64(1)},
		{float64(1), float64(2), map[string]interface{}{"x": float64(99)}},
	}
	for i, tags := range cases {
		actual := []interface{}{map[string]interface{}{"tags": tags}}
		res := compareDocumentArrays(expectedDocs, actual, &Options{})
		if !res.IsMatch {
			t.Errorf("case %d: expected ['...'] to match any array, got: %v", i, res.Errors)
		}
	}
}

// TestNestedArrayEllipsis_InsufficientElements verifies the existing length
// guard still fires when actual has fewer elements than the non-ellipsis
// expected count.
func TestNestedArrayEllipsis_InsufficientElements(t *testing.T) {
	expectedDocs, err := parseContent(`{ "tags" : [1, 2, "...", 3] }`)
	if err != nil {
		t.Fatalf("parseContent: %v", err)
	}
	actual := []interface{}{map[string]interface{}{
		"tags": []interface{}{float64(1), float64(2)},
	}}
	result := compareDocumentArrays(expectedDocs, actual, &Options{})
	if result.IsMatch {
		t.Error("expected mismatch when actual has fewer elements than required, but got IsMatch=true")
	}
}

// TestAnalyzeUnorderedMismatch_NoDoubleClaim verifies that the failure-report
// helper claims each actual document at most once, even when two expected
// documents would both prefer the same actual.
func TestAnalyzeUnorderedMismatch_NoDoubleClaim(t *testing.T) {
	// expected[0] and expected[1] are identical; without honouring usedActual,
	// expected[1] would also claim actual[0] as a perfect match.
	expected := []interface{}{
		map[string]interface{}{"x": float64(1)},
		map[string]interface{}{"x": float64(1)},
	}
	actual := []interface{}{
		map[string]interface{}{"x": float64(1)},
		map[string]interface{}{"x": float64(2)},
	}

	result := analyzeUnorderedMismatch(expected, actual, &Options{}, false, "")
	if result.IsMatch {
		t.Fatal("expected analyzeUnorderedMismatch to report a failure")
	}

	// Walk the per-doc messages and count perfect-match claims per actual index.
	claims := map[string]int{}
	for _, e := range result.Errors {
		if strings.Contains(e.Message, "matches actual[") && strings.Contains(e.Message, "✓") {
			claims[e.Message]++
		}
	}
	for msg, count := range claims {
		if count > 1 {
			t.Errorf("actual doc claimed %d times in report: %q", count, msg)
		}
	}
	if len(claims) > 1 {
		t.Errorf("expected at most one perfect-match claim, got %d: %v", len(claims), claims)
	}
}

// TestNormalizeExtendedJSON_NumberDecimal verifies that {"$numberDecimal": "3.14"}
// from a language bridge collapses to its underlying string so it matches an
// expected file that uses the plain-string form.
func TestNormalizeExtendedJSON_NumberDecimal(t *testing.T) {
	expected, err := parseContent(`{"price":"3.14"}`)
	if err != nil {
		t.Fatalf("parseContent: %v", err)
	}
	actualJSON := `[{"price":{"$numberDecimal":"3.14"}}]`
	var actualRaw interface{}
	if err := json.Unmarshal([]byte(actualJSON), &actualRaw); err != nil {
		t.Fatalf("json.Unmarshal: %v", err)
	}
	actual, err := jsonValueToSlice(actualRaw)
	if err != nil {
		t.Fatalf("jsonValueToSlice: %v", err)
	}
	result := compareDocumentArrays(expected, actual, &Options{})
	if !result.IsMatch {
		t.Errorf("expected $numberDecimal to collapse and match, got: %v", result.Errors)
	}
}

// TestNormalizeExtendedJSON_NumberLongAndInt verifies that {"$numberLong":"123"}
// and {"$numberInt":"42"} from a language bridge collapse to plain numbers so
// they match an expected file that uses bare JSON-number form.
func TestNormalizeExtendedJSON_NumberLongAndInt(t *testing.T) {
	expected, err := parseContent(`{"longVal":123,"intVal":42}`)
	if err != nil {
		t.Fatalf("parseContent: %v", err)
	}
	actualJSON := `[{"longVal":{"$numberLong":"123"},"intVal":{"$numberInt":"42"}}]`
	var actualRaw interface{}
	if err := json.Unmarshal([]byte(actualJSON), &actualRaw); err != nil {
		t.Fatalf("json.Unmarshal: %v", err)
	}
	actual, err := jsonValueToSlice(actualRaw)
	if err != nil {
		t.Fatalf("jsonValueToSlice: %v", err)
	}
	result := compareDocumentArrays(expected, actual, &Options{})
	if !result.IsMatch {
		t.Errorf("expected $numberLong/$numberInt to collapse and match, got: %v", result.Errors)
	}
}

// TestNormalizeExtendedJSON_NumberLongOverflow verifies that a $numberLong
// value too large for float64 falls back to its string form, so an expected
// file using the equivalent string still matches.
func TestNormalizeExtendedJSON_NumberLongOverflow(t *testing.T) {
	// 2^63 - 1, well beyond float64's 2^53 precision boundary.
	expected, err := parseContent(`{"big":"9223372036854775807"}`)
	if err != nil {
		t.Fatalf("parseContent: %v", err)
	}
	actualJSON := `[{"big":{"$numberLong":"9223372036854775807"}}]`
	var actualRaw interface{}
	if err := json.Unmarshal([]byte(actualJSON), &actualRaw); err != nil {
		t.Fatalf("json.Unmarshal: %v", err)
	}
	actual, err := jsonValueToSlice(actualRaw)
	if err != nil {
		t.Fatalf("jsonValueToSlice: %v", err)
	}
	result := compareDocumentArrays(expected, actual, &Options{})
	if !result.IsMatch {
		t.Errorf("expected oversized $numberLong to keep string form and match, got: %v", result.Errors)
	}
}

func TestParseNDJSON_RealFile(t *testing.T) {
	content, err := os.ReadFile("testdata/sample-ndjson.txt")
	if err != nil {
		t.Fatalf("read testdata fixture: %v", err)
	}
	docs, err := parseContent(string(content))
	if err != nil {
		t.Fatalf("parseContent of NDJSON fixture: %v", err)
	}
	if len(docs) != 4 {
		t.Errorf("expected 4 documents, got %d", len(docs))
	}
}

// TestPrimitiveRootValues verifies that the kernel handles bare primitive
// values at the root of both expected and actual — essential for routing
// Expect.shouldMatch(<primitive>) through the kernel.
func TestPrimitiveRootValues(t *testing.T) {
	cases := []struct {
		name     string
		expected string
		actual   interface{}
		match    bool
	}{
		{"matching number", `42`, float64(42), true},
		{"mismatching number", `42`, float64(43), false},
		{"matching string", `"hello"`, "hello", true},
		{"mismatching string", `"hello"`, "world", false},
		{"matching bool", `true`, true, true},
		{"mismatching bool", `true`, false, false},
		{"matching null", `null`, nil, true},
	}

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			expectedDocs, err := parseContent(tc.expected)
			if err != nil {
				t.Fatalf("parseContent(%q): %v", tc.expected, err)
			}
			actualDocs, err := jsonValueToSlice(tc.actual)
			if err != nil {
				t.Fatalf("jsonValueToSlice(%v): %v", tc.actual, err)
			}
			result := compareDocumentArrays(expectedDocs, actualDocs, &Options{})
			if result.IsMatch != tc.match {
				t.Errorf("got IsMatch=%v, want %v; errors=%v",
					result.IsMatch, tc.match, result.Errors)
			}
		})
	}
}

func TestRemoveTrailingCommas(t *testing.T) {
	cases := []struct {
		name  string
		input string
		want  string
	}{
		{
			name:  "trailing comma before closing brace",
			input: `{"a":1,}`,
			want:  `{"a":1}`,
		},
		{
			name:  "trailing comma before closing bracket",
			input: `[1, 2,]`,
			want:  `[1, 2]`,
		},
		{
			name:  "trailing comma with whitespace before closer",
			input: "{\"a\":1,\n  }",
			want:  "{\"a\":1\n  }",
		},
		{
			name:  "comma-then-brace inside string value is preserved",
			input: `{"raw":",}"}`,
			want:  `{"raw":",}"}`,
		},
		{
			name:  "comma-then-bracket inside string value is preserved",
			input: `{"pattern":",]"}`,
			want:  `{"pattern":",]"}`,
		},
		{
			name:  "escaped quote inside string does not end the string",
			input: `{"raw":"a\",}"}`,
			want:  `{"raw":"a\",}"}`,
		},
		{
			name:  "no trailing commas is a no-op",
			input: `{"a":1,"b":2}`,
			want:  `{"a":1,"b":2}`,
		},
	}
	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			got := removeTrailingCommas(tc.input)
			if got != tc.want {
				t.Errorf("removeTrailingCommas(%q) = %q, want %q", tc.input, got, tc.want)
			}
		})
	}
}

func TestParseAndCompare_StringValueContainingTrailingCommaPattern(t *testing.T) {
	// Regression: an expected file may contain a string value whose contents
	// happen to look like a trailing comma (e.g. ",}"). The preprocessing pass
	// must not strip that comma from inside the quoted value.
	expected, err := parseContent(`{"raw":",}"}`)
	if err != nil {
		t.Fatalf("parseContent: %v", err)
	}
	actual := []interface{}{map[string]interface{}{"raw": ",}"}}
	result := compareDocumentArrays(expected, actual, &Options{})
	if !result.IsMatch {
		t.Errorf("expected string value \",}\" to survive preprocessing, got: %v", result.Errors)
	}
}
