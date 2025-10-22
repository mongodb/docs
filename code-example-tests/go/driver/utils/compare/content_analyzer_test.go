package compare

import (
	"fmt"
	"path/filepath"
	"testing"

	"go.mongodb.org/mongo-driver/v2/bson"
)

// TestDetectContentType tests the main content type detection function
func TestDetectContentType(t *testing.T) {
	tempDir := t.TempDir()
	testFile := filepath.Join(tempDir, "test.txt")
	createTestFile(t, testFile, `{"name":"test"}`)

	tests := []struct {
		name         string
		value        interface{}
		expectedType ContentType
		description  string
	}{
		{
			name:         "Nil value",
			value:        nil,
			expectedType: PrimitiveContent,
			description:  "Nil should be treated as primitive",
		},
		{
			name:         "Existing file path",
			value:        testFile,
			expectedType: FileContent,
			description:  "String that is an existing file path should be FileContent",
		},
		{
			name:         "Pattern string with ellipsis",
			value:        "some value...",
			expectedType: PatternString,
			description:  "String containing ellipsis should be PatternString",
		},
		{
			name:         "Multi-line text block",
			value:        "line 1\nline 2\nline 3",
			expectedType: TextBlock,
			description:  "String with newlines should be TextBlock",
		},
		{
			name:         "JSON-like string (object)",
			value:        `{"key": "value", "nested": {"data": 123}}`,
			expectedType: StructuredString,
			description:  "String that looks like JSON object should be StructuredString",
		},
		{
			name:         "JSON-like string (array)",
			value:        `[1, 2, 3, "test"]`,
			expectedType: StructuredString,
			description:  "String that looks like JSON array should be StructuredString",
		},
		{
			name:         "Plain string",
			value:        "simple text without special markers",
			expectedType: PlainString,
			description:  "Simple string should be PlainString",
		},
		{
			name:         "Slice of interfaces",
			value:        []interface{}{1, 2, 3},
			expectedType: ArrayContent,
			description:  "[]interface{} should be ArrayContent",
		},
		{
			name:         "BSON.A array",
			value:        bson.A{1, 2, 3},
			expectedType: ArrayContent,
			description:  "bson.A should be ArrayContent",
		},
		{
			name:         "Map string interface",
			value:        map[string]interface{}{"key": "value"},
			expectedType: ObjectContent,
			description:  "map[string]interface{} should be ObjectContent",
		},
		{
			name:         "BSON.M map",
			value:        bson.M{"key": "value"},
			expectedType: ObjectContent,
			description:  "bson.M should be ObjectContent",
		},
		{
			name:         "BSON.D document",
			value:        bson.D{{Key: "key", Value: "value"}},
			expectedType: BSONDContent,
			description:  "bson.D should be BSONDContent",
		},
		{
			name:         "Slice of BSON.D",
			value:        []bson.D{{{Key: "key", Value: "value"}}},
			expectedType: ArrayContent,
			description:  "[]bson.D should be ArrayContent",
		},
		{
			name: "Struct type",
			value: struct {
				Name string
				Age  int
			}{Name: "test", Age: 30},
			expectedType: ObjectContent,
			description:  "Struct should be ObjectContent",
		},
		{
			name:         "Integer primitive",
			value:        42,
			expectedType: PrimitiveContent,
			description:  "Integer should be PrimitiveContent",
		},
		{
			name:         "String primitive",
			value:        "test",
			expectedType: PlainString,
			description:  "Plain string should be PlainString",
		},
		{
			name:         "Boolean primitive",
			value:        true,
			expectedType: PrimitiveContent,
			description:  "Boolean should be PrimitiveContent",
		},
		{
			name:         "Float primitive",
			value:        3.14,
			expectedType: PrimitiveContent,
			description:  "Float should be PrimitiveContent",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			detected := detectContentType(tt.value)
			if detected != tt.expectedType {
				t.Errorf("%s: expected %v, got %v", tt.description, tt.expectedType, detected)
			}
		})
	}
}

// TestDetectStringContentType tests string-specific content type detection
func TestDetectStringContentType(t *testing.T) {
	tempDir := t.TempDir()
	testFile := filepath.Join(tempDir, "detect.txt")
	createTestFile(t, testFile, "content")

	tests := []struct {
		name         string
		value        string
		expectedType ContentType
	}{
		{
			name:         "Absolute file path that exists",
			value:        testFile,
			expectedType: FileContent,
		},
		{
			name:         "String with ellipsis at end",
			value:        "Error: Connection failed...",
			expectedType: PatternString,
		},
		{
			name:         "String with ellipsis in middle",
			value:        "Some ... text",
			expectedType: PatternString,
		},
		{
			name:         "String with just ellipsis",
			value:        "...",
			expectedType: PatternString,
		},
		{
			name:         "Multi-line with Unix line endings",
			value:        "line1\nline2\nline3",
			expectedType: TextBlock,
		},
		{
			name:         "Multi-line with Windows line endings",
			value:        "line1\r\nline2\r\nline3",
			expectedType: TextBlock,
		},
		{
			name:         "JSON object",
			value:        `{"name": "test", "age": 30}`,
			expectedType: StructuredString,
		},
		{
			name:         "JSON array",
			value:        `[1, 2, 3]`,
			expectedType: StructuredString,
		},
		{
			name:         "JSON object with whitespace",
			value:        `  {"key": "value"}  `,
			expectedType: StructuredString,
		},
		{
			name:         "JSON array with whitespace",
			value:        `  [1, 2, 3]  `,
			expectedType: StructuredString,
		},
		{
			name:         "Malformed JSON-like (missing closing brace)",
			value:        `{"incomplete": "json"`,
			expectedType: PlainString,
		},
		{
			name:         "Plain text",
			value:        "just some text",
			expectedType: PlainString,
		},
		{
			name:         "Empty string",
			value:        "",
			expectedType: PlainString,
		},
		{
			name:         "String with only whitespace",
			value:        "   ",
			expectedType: PlainString,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			detected := detectStringContentType(tt.value)
			if detected != tt.expectedType {
				t.Errorf("Expected %v, got %v for input: %q", tt.expectedType, detected, tt.value)
			}
		})
	}
}

// TestIsFilePath tests file path detection
func TestIsFilePath(t *testing.T) {
	tempDir := t.TempDir()
	existingFile := filepath.Join(tempDir, "existing.txt")
	createTestFile(t, existingFile, "content")

	tests := []struct {
		name     string
		path     string
		expected bool
	}{
		{
			name:     "Existing absolute path",
			path:     existingFile,
			expected: true,
		},
		{
			name:     "Non-existing absolute path",
			path:     "/nonexistent/path/to/file.txt",
			expected: false,
		},
		{
			name:     "String without path separators or extensions",
			path:     "notapath",
			expected: false,
		},
		{
			name:     "String with .txt extension",
			path:     "somefile.txt",
			expected: false, // Won't find it unless it exists or is in driver dir
		},
		{
			name:     "String with .json extension",
			path:     "data.json",
			expected: false,
		},
		{
			name:     "Empty string",
			path:     "",
			expected: false,
		},
		{
			name:     "Just filename without extension",
			path:     "README",
			expected: false,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			result := isFilePath(tt.path)
			if result != tt.expected {
				t.Errorf("isFilePath(%q) = %v, expected %v", tt.path, result, tt.expected)
			}
		})
	}
}

// TestLooksLikeJSON tests JSON detection
func TestLooksLikeJSON(t *testing.T) {
	tests := []struct {
		name     string
		input    string
		expected bool
	}{
		{
			name:     "Valid JSON object",
			input:    `{"key": "value"}`,
			expected: true,
		},
		{
			name:     "Valid JSON array",
			input:    `[1, 2, 3]`,
			expected: true,
		},
		{
			name:     "JSON object with whitespace",
			input:    `  {"key": "value"}  `,
			expected: true,
		},
		{
			name:     "JSON array with whitespace",
			input:    `  [1, 2, 3]  `,
			expected: true,
		},
		{
			name:     "Complex nested JSON",
			input:    `{"outer": {"inner": [1, 2, 3]}}`,
			expected: true,
		},
		{
			name:     "Empty object",
			input:    `{}`,
			expected: true,
		},
		{
			name:     "Empty array",
			input:    `[]`,
			expected: true,
		},
		{
			name:     "Incomplete JSON object",
			input:    `{"key": "value"`,
			expected: false,
		},
		{
			name:     "Incomplete JSON array",
			input:    `[1, 2, 3`,
			expected: false,
		},
		{
			name:     "Plain text",
			input:    "just text",
			expected: false,
		},
		{
			name:     "String starting with brace only",
			input:    "{incomplete",
			expected: false,
		},
		{
			name:     "String ending with brace only",
			input:    "incomplete}",
			expected: false,
		},
		{
			name:     "Empty string",
			input:    "",
			expected: false,
		},
		{
			name:     "Whitespace only",
			input:    "   ",
			expected: false,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			result := looksLikeJSON(tt.input)
			if result != tt.expected {
				t.Errorf("looksLikeJSON(%q) = %v, expected %v", tt.input, result, tt.expected)
			}
		})
	}
}

// TestSelectComparisonStrategy tests strategy selection logic
func TestSelectComparisonStrategy(t *testing.T) {
	tempDir := t.TempDir()
	testFile := filepath.Join(tempDir, "strategy.txt")
	createTestFile(t, testFile, `{"test": "data"}`)

	tests := []struct {
		name             string
		expectedType     ContentType
		actualType       ContentType
		expectedStrategy string // We'll check the type name
	}{
		{
			name:             "File content should use file strategy",
			expectedType:     FileContent,
			actualType:       ArrayContent,
			expectedStrategy: "*compare.fileComparisonStrategy",
		},
		{
			name:             "Pattern string should use pattern strategy",
			expectedType:     PatternString,
			actualType:       ObjectContent,
			expectedStrategy: "*compare.patternComparisonStrategy",
		},
		{
			name:             "Object to object should use object strategy",
			expectedType:     ObjectContent,
			actualType:       ObjectContent,
			expectedStrategy: "*compare.objectComparisonStrategy",
		},
		{
			name:             "Array to array should use object strategy",
			expectedType:     ArrayContent,
			actualType:       ArrayContent,
			expectedStrategy: "*compare.objectComparisonStrategy",
		},
		{
			name:             "Primitive comparison should use object strategy",
			expectedType:     PrimitiveContent,
			actualType:       PrimitiveContent,
			expectedStrategy: "*compare.objectComparisonStrategy",
		},
		{
			name:             "Text block should use object strategy",
			expectedType:     TextBlock,
			actualType:       TextBlock,
			expectedStrategy: "*compare.objectComparisonStrategy",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			opts := &Options{}
			strategy := selectComparisonStrategy(tt.expectedType, tt.actualType, opts)
			strategyType := fmt.Sprintf("%T", strategy)
			if strategyType != tt.expectedStrategy {
				t.Errorf("Expected strategy %s, got %s", tt.expectedStrategy, strategyType)
			}
		})
	}
}

// TestFileComparisonStrategy tests file comparison strategy execution
func TestFileComparisonStrategy(t *testing.T) {
	tempDir := t.TempDir()
	testFile := filepath.Join(tempDir, "file_strategy.txt")
	createTestFile(t, testFile, `{"name":"Alice","age":30}`)

	strategy := &fileComparisonStrategy{}

	tests := []struct {
		name        string
		expected    interface{}
		actual      interface{}
		options     *Options
		shouldMatch bool
	}{
		{
			name:     "Matching BSON.D slice",
			expected: testFile,
			actual: []bson.D{
				{{Key: "name", Value: "Alice"}, {Key: "age", Value: 30}},
			},
			options:     &Options{},
			shouldMatch: true,
		},
		{
			name:     "Mismatching values",
			expected: testFile,
			actual: []bson.D{
				{{Key: "name", Value: "Bob"}, {Key: "age", Value: 30}},
			},
			options:     &Options{},
			shouldMatch: false,
		},
		{
			name:     "With ignored fields",
			expected: testFile,
			actual: []bson.D{
				{{Key: "name", Value: "Alice"}, {Key: "age", Value: 25}},
			},
			options:     &Options{IgnoreFieldValues: []string{"age"}},
			shouldMatch: true,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			result := strategy.execute(tt.expected, tt.actual, tt.options)
			if result.IsMatch != tt.shouldMatch {
				t.Errorf("Expected match=%v, got match=%v. Errors: %v",
					tt.shouldMatch, result.IsMatch, result.Errors)
			}
		})
	}
}

// TestObjectComparisonStrategy tests object comparison strategy execution
func TestObjectComparisonStrategy(t *testing.T) {
	strategy := &objectComparisonStrategy{}

	tests := []struct {
		name        string
		expected    interface{}
		actual      interface{}
		options     *Options
		shouldMatch bool
	}{
		{
			name: "Matching BSON.D slices",
			expected: []bson.D{
				{{Key: "name", Value: "Alice"}},
			},
			actual: []bson.D{
				{{Key: "name", Value: "Alice"}},
			},
			options:     &Options{},
			shouldMatch: true,
		},
		{
			name: "Matching maps",
			expected: []map[string]interface{}{
				{"name": "Alice", "age": float64(30)},
			},
			actual: []map[string]interface{}{
				{"name": "Alice", "age": float64(30)},
			},
			options:     &Options{},
			shouldMatch: true,
		},
		{
			name: "Single value comparison",
			expected: map[string]interface{}{
				"name": "Alice",
				"age":  float64(30),
			},
			actual: map[string]interface{}{
				"name": "Alice",
				"age":  float64(30),
			},
			options:     &Options{},
			shouldMatch: true,
		},
		{
			name: "Mismatching values",
			expected: []bson.D{
				{{Key: "name", Value: "Alice"}},
			},
			actual: []bson.D{
				{{Key: "name", Value: "Bob"}},
			},
			options:     &Options{},
			shouldMatch: false,
		},
		{
			name: "Different array lengths",
			expected: []bson.D{
				{{Key: "name", Value: "Alice"}},
			},
			actual: []bson.D{
				{{Key: "name", Value: "Alice"}},
				{{Key: "name", Value: "Bob"}},
			},
			options:     &Options{},
			shouldMatch: false,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			result := strategy.execute(tt.expected, tt.actual, tt.options)
			if result.IsMatch != tt.shouldMatch {
				t.Errorf("Expected match=%v, got match=%v. Errors: %v",
					tt.shouldMatch, result.IsMatch, result.Errors)
			}
		})
	}
}

// TestPatternComparisonStrategy tests pattern comparison strategy
func TestPatternComparisonStrategy(t *testing.T) {
	strategy := &patternComparisonStrategy{}

	tests := []struct {
		name        string
		expected    interface{}
		actual      interface{}
		options     *Options
		shouldMatch bool
	}{
		{
			name:        "Pattern with ellipsis",
			expected:    "Error: Connection failed...",
			actual:      "Error: Connection failed after 3 retries",
			options:     &Options{},
			shouldMatch: true,
		},
		{
			name:        "Pattern mismatch",
			expected:    "Success...",
			actual:      "Error: Failed",
			options:     &Options{},
			shouldMatch: false,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			result := strategy.execute(tt.expected, tt.actual, tt.options)
			if result.IsMatch != tt.shouldMatch {
				t.Errorf("Expected match=%v, got match=%v. Errors: %v",
					tt.shouldMatch, result.IsMatch, result.Errors)
			}
		})
	}
}

// TestConvertToNormalizedSlice tests conversion of various types to normalized slices
func TestConvertToNormalizedSlice(t *testing.T) {
	type Person struct {
		Name string `bson:"name"`
		Age  int    `bson:"age"`
	}

	tests := []struct {
		name        string
		input       interface{}
		expectError bool
		checkLength int // Expected length of result slice
	}{
		{
			name:        "Nil value",
			input:       nil,
			expectError: false,
			checkLength: 0,
		},
		{
			name: "Slice of BSON.D",
			input: []bson.D{
				{{Key: "name", Value: "Alice"}},
				{{Key: "name", Value: "Bob"}},
			},
			expectError: false,
			checkLength: 2,
		},
		{
			name: "Slice of structs",
			input: []Person{
				{Name: "Alice", Age: 30},
				{Name: "Bob", Age: 25},
			},
			expectError: false,
			checkLength: 2,
		},
		{
			name: "Slice of maps",
			input: []map[string]interface{}{
				{"name": "Alice", "age": 30},
				{"name": "Bob", "age": 25},
			},
			expectError: false,
			checkLength: 2,
		},
		{
			name:        "Single BSON.D (wrapped in slice)",
			input:       bson.D{{Key: "name", Value: "Alice"}},
			expectError: false,
			checkLength: 1,
		},
		{
			name:        "Single map (wrapped in slice)",
			input:       map[string]interface{}{"name": "Alice"},
			expectError: false,
			checkLength: 1,
		},
		{
			name:        "Single struct (wrapped in slice)",
			input:       Person{Name: "Alice", Age: 30},
			expectError: false,
			checkLength: 1,
		},
		{
			name:        "BSON.M",
			input:       bson.M{"name": "Alice", "age": 30},
			expectError: false,
			checkLength: 1,
		},
		{
			name:        "Primitive value (wrapped in slice)",
			input:       42,
			expectError: false,
			checkLength: 1,
		},
		{
			name:        "String value (wrapped in slice)",
			input:       "test",
			expectError: false,
			checkLength: 1,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			result, err := convertToNormalizedSlice(tt.input)

			if tt.expectError {
				if err == nil {
					t.Error("Expected error but got none")
				}
				return
			}

			if err != nil {
				t.Errorf("Unexpected error: %v", err)
				return
			}

			if len(result) != tt.checkLength {
				t.Errorf("Expected length %d, got %d", tt.checkLength, len(result))
			}
		})
	}
}

// TestContentTypeEdgeCases tests edge cases in content type detection
func TestContentTypeEdgeCases(t *testing.T) {
	tests := []struct {
		name         string
		value        interface{}
		expectedType ContentType
	}{
		{
			name:         "Empty string",
			value:        "",
			expectedType: PlainString,
		},
		{
			name:         "Whitespace only string",
			value:        "   \t\n  ",
			expectedType: TextBlock, // Has newline
		},
		{
			name:         "Empty BSON.D",
			value:        bson.D{},
			expectedType: BSONDContent,
		},
		{
			name:         "Empty slice",
			value:        []interface{}{},
			expectedType: ArrayContent,
		},
		{
			name:         "Empty map",
			value:        map[string]interface{}{},
			expectedType: ObjectContent,
		},
		{
			name:         "Slice with nil elements",
			value:        []interface{}{nil, nil, nil},
			expectedType: ArrayContent,
		},
		{
			name:         "Map with nil values",
			value:        map[string]interface{}{"key1": nil, "key2": nil},
			expectedType: ObjectContent,
		},
		{
			name:         "Single ellipsis string",
			value:        "...",
			expectedType: PatternString,
		},
		{
			name:         "JSON-like but invalid",
			value:        `{invalid json}`,
			expectedType: StructuredString, // looksLikeJSON checks format, not validity
		},
		{
			name:         "Pointer to struct",
			value:        &struct{ Name string }{Name: "test"},
			expectedType: PrimitiveContent, // Pointers are treated as primitives by reflect.ValueOf
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			detected := detectContentType(tt.value)
			if detected != tt.expectedType {
				t.Errorf("Expected %v, got %v for %q", tt.expectedType, detected, tt.name)
			}
		})
	}
}

// TestStrategyExecutionWithOptions tests that strategies respect options
func TestStrategyExecutionWithOptions(t *testing.T) {
	strategy := &objectComparisonStrategy{}

	t.Run("Ordered comparison enforced", func(t *testing.T) {
		expected := []bson.D{
			{{Key: "id", Value: 1}},
			{{Key: "id", Value: 2}},
		}
		actual := []bson.D{
			{{Key: "id", Value: 2}},
			{{Key: "id", Value: 1}},
		}

		// With ordered comparison, this should fail
		result := strategy.execute(expected, actual, &Options{ComparisonType: "ordered"})
		if result.IsMatch {
			t.Error("Expected ordered comparison to fail with different order")
		}
	})

	t.Run("Unordered comparison allows different order", func(t *testing.T) {
		expected := []bson.D{
			{{Key: "id", Value: 1}},
			{{Key: "id", Value: 2}},
		}
		actual := []bson.D{
			{{Key: "id", Value: 2}},
			{{Key: "id", Value: 1}},
		}

		// With unordered comparison, this should pass
		result := strategy.execute(expected, actual, &Options{ComparisonType: "unordered"})
		if !result.IsMatch {
			t.Errorf("Expected unordered comparison to succeed: %v", result.Errors)
		}
	})

	t.Run("Ignored fields are respected", func(t *testing.T) {
		expected := []bson.D{
			{{Key: "_id", Value: "original"}, {Key: "name", Value: "Alice"}},
		}
		actual := []bson.D{
			{{Key: "_id", Value: "different"}, {Key: "name", Value: "Alice"}},
		}

		// With ignored _id field, this should pass
		result := strategy.execute(expected, actual, &Options{IgnoreFieldValues: []string{"_id"}})
		if !result.IsMatch {
			t.Errorf("Expected comparison to succeed with ignored field: %v", result.Errors)
		}
	})
}
