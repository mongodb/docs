package compare

import (
	"path/filepath"
	"testing"

	"go.mongodb.org/mongo-driver/v2/bson"
)

// TestGlobalEllipsisAllowsExtraFields tests the global ellipsis feature
// This is a critical feature that allows matching objects even when they have extra fields
func TestGlobalEllipsisAllowsExtraFields(t *testing.T) {
	tempDir := t.TempDir()

	tests := []struct {
		name        string
		fileContent string
		actual      []bson.D
		description string
	}{
		{
			name:        "Global ellipsis with extra fields",
			fileContent: "...\n" + `{"name":"John"}`,
			actual: []bson.D{
				{{Key: "name", Value: "John"}, {Key: "extra", Value: "field"}, {Key: "another", Value: "value"}},
			},
			description: "Global ellipsis should allow extra fields in actual object",
		},
		{
			name:        "Global ellipsis with nested objects",
			fileContent: "...\n" + `{"user":{"name":"Alice"}}`,
			actual: []bson.D{
				{{Key: "user", Value: map[string]interface{}{"name": "Alice", "age": 30}}, {Key: "timestamp", Value: "2023-01-01"}},
			},
			description: "Global ellipsis should work with nested objects",
		},
		{
			name:        "Global ellipsis with arrays",
			fileContent: "...\n" + `{"items":[1,2,3]}`,
			actual: []bson.D{
				{{Key: "items", Value: []interface{}{1, 2, 3}}, {Key: "total", Value: 6}, {Key: "count", Value: 3}},
			},
			description: "Global ellipsis should work with arrays and allow extra fields",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			testFile := filepath.Join(tempDir, tt.name+".txt")
			createTestFile(t, testFile, tt.fileContent)

			ExpectThat(t, tt.actual).ShouldMatch(testFile)
		})
	}
}

// TestHandleEllipsisPatternsUnit provides unit test coverage for the handleEllipsisPatterns function
func TestHandleEllipsisPatternsUnit(t *testing.T) {
	tests := []struct {
		name         string
		expected     interface{}
		actual       interface{}
		shouldHandle bool
		shouldMatch  bool
		description  string
	}{
		{
			name:         "Exact ellipsis matches anything",
			expected:     "...",
			actual:       "any value at all",
			shouldHandle: true,
			shouldMatch:  true,
			description:  "The exact string '...' should match any actual value",
		},
		{
			name:         "Exact ellipsis matches numbers",
			expected:     "...",
			actual:       42,
			shouldHandle: true,
			shouldMatch:  true,
			description:  "Ellipsis should match numeric values too",
		},
		{
			name:         "Truncated string prefix match success",
			expected:     "Hello...",
			actual:       "Hello World",
			shouldHandle: true,
			shouldMatch:  true,
			description:  "Truncated pattern should match when prefix matches",
		},
		{
			name:         "Truncated string prefix match with longer suffix",
			expected:     "Error: Connection failed...",
			actual:       "Error: Connection failed after 3 retries with timeout",
			shouldHandle: true,
			shouldMatch:  true,
			description:  "Truncated pattern should match long suffixes",
		},
		{
			name:         "Truncated string prefix mismatch",
			expected:     "Hello...",
			actual:       "Goodbye World",
			shouldHandle: true,
			shouldMatch:  false,
			description:  "Truncated pattern should NOT match when prefix doesn't match",
		},
		{
			name:         "Truncated string empty suffix",
			expected:     "Complete...",
			actual:       "Complete",
			shouldHandle: true,
			shouldMatch:  true,
			description:  "Truncated pattern should match exact prefix (empty suffix)",
		},
		{
			name:         "Array wildcard matches any array",
			expected:     []interface{}{"..."},
			actual:       []interface{}{1, 2, 3, 4, 5},
			shouldHandle: true,
			shouldMatch:  true,
			description:  "Array with single ellipsis should match any array",
		},
		{
			name:         "Array wildcard matches empty array",
			expected:     []interface{}{"..."},
			actual:       []interface{}{},
			shouldHandle: true,
			shouldMatch:  true,
			description:  "Array wildcard should even match empty arrays",
		},
		{
			name:         "Object wildcard matches any object",
			expected:     map[string]interface{}{"...": "..."},
			actual:       map[string]interface{}{"key1": "value1", "key2": "value2"},
			shouldHandle: true,
			shouldMatch:  true,
			description:  "Object with '...' key should match any object",
		},
		{
			name:         "Object wildcard matches empty object",
			expected:     map[string]interface{}{"...": "..."},
			actual:       map[string]interface{}{},
			shouldHandle: true,
			shouldMatch:  true,
			description:  "Object wildcard should match empty objects",
		},
		{
			name:         "No ellipsis pattern - not handled",
			expected:     "normal string",
			actual:       "normal string",
			shouldHandle: false,
			shouldMatch:  false,
			description:  "Regular strings without ellipsis should not be handled by ellipsis logic",
		},
		{
			name:         "Non-matching types should not be handled",
			expected:     42,
			actual:       42,
			shouldHandle: false,
			shouldMatch:  false,
			description:  "Non-string, non-array, non-object types should not trigger ellipsis handling",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			result := handleEllipsisPatterns(tt.expected, tt.actual)

			if result.handled != tt.shouldHandle {
				t.Errorf("%s: Expected handled=%v, got handled=%v",
					tt.description, tt.shouldHandle, result.handled)
			}

			if result.matches != tt.shouldMatch {
				t.Errorf("%s: Expected matches=%v, got matches=%v",
					tt.description, tt.shouldMatch, result.matches)
			}
		})
	}
}

// TestEllipsisMatchFailures tests that ellipsis patterns properly fail when they should
func TestEllipsisMatchFailures(t *testing.T) {
	tempDir := t.TempDir()

	tests := []struct {
		name          string
		fileContent   string
		actual        []bson.D
		shouldFail    bool
		errorContains string
	}{
		{
			name:          "Truncated string mismatch",
			fileContent:   `{"message":"Success..."}`,
			actual:        []bson.D{{{Key: "message", Value: "Error: Failed completely"}}},
			shouldFail:    true,
			errorContains: "mismatch",
		},
		{
			name:          "Property ellipsis with missing required field",
			fileContent:   `{"_id":"...","name":"Required"}`,
			actual:        []bson.D{{{Key: "_id", Value: "123"}}}, // Missing "name"
			shouldFail:    true,
			errorContains: "missing",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			testFile := filepath.Join(tempDir, tt.name+".txt")
			createTestFile(t, testFile, tt.fileContent)

			// Use mock to capture failure
			mockT := &mockTestingT{t: t, shouldFail: tt.shouldFail}
			ExpectThat(mockT, tt.actual).ShouldMatch(testFile)

			if tt.shouldFail && !mockT.failed {
				t.Errorf("Test should have failed but passed")
			}
		})
	}
}

// TestEllipsisInNestedStructures tests ellipsis patterns in complex nested data
func TestEllipsisInNestedStructures(t *testing.T) {
	tempDir := t.TempDir()

	tests := []struct {
		name        string
		fileContent string
		actual      []bson.D
	}{
		{
			name:        "Nested object with property ellipsis",
			fileContent: `{"user":{"id":"...","name":"Alice"},"timestamp":"..."}`,
			actual: []bson.D{
				{{Key: "user", Value: map[string]interface{}{"id": "auto-gen-123", "name": "Alice"}},
					{Key: "timestamp", Value: "2023-01-01T00:00:00Z"}},
			},
		},
		{
			name:        "Array of objects with ellipsis",
			fileContent: `{"users":[{"id":"...","name":"Alice"},{"id":"...","name":"Bob"}]}`,
			actual: []bson.D{
				{{Key: "users", Value: []interface{}{
					map[string]interface{}{"id": "uuid-1", "name": "Alice"},
					map[string]interface{}{"id": "uuid-2", "name": "Bob"},
				}}},
			},
		},
		{
			name:        "Mixed ellipsis patterns",
			fileContent: `{"message":"Processing...","items":["..."],"status":"..."}`,
			actual: []bson.D{
				{{Key: "message", Value: "Processing complete with 5 items"},
					{Key: "items", Value: []interface{}{1, 2, 3, 4, 5}},
					{Key: "status", Value: "success"}},
			},
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			testFile := filepath.Join(tempDir, tt.name+".txt")
			createTestFile(t, testFile, tt.fileContent)

			ExpectThat(t, tt.actual).ShouldMatch(testFile)
		})
	}
}

// TestEllipsisEdgeCases tests edge cases in ellipsis handling
func TestEllipsisEdgeCases(t *testing.T) {
	tempDir := t.TempDir()

	tests := []struct {
		name        string
		fileContent string
		actual      []bson.D
		description string
	}{
		{
			name:        "Ellipsis with empty string",
			fileContent: `{"value":"..."}`,
			actual:      []bson.D{{{Key: "value", Value: ""}}},
			description: "Ellipsis should match empty strings",
		},
		{
			name:        "Ellipsis with null value",
			fileContent: `{"value":"..."}`,
			actual:      []bson.D{{{Key: "value", Value: nil}}},
			description: "Ellipsis should match null values",
		},
		{
			name:        "Multiple ellipsis in same object",
			fileContent: `{"id":"...","timestamp":"...","uuid":"..."}`,
			actual: []bson.D{
				{{Key: "id", Value: "123"}, {Key: "timestamp", Value: "2023"}, {Key: "uuid", Value: "abc"}},
			},
			description: "Multiple ellipsis patterns should all work in the same object",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			testFile := filepath.Join(tempDir, tt.name+".txt")
			createTestFile(t, testFile, tt.fileContent)

			ExpectThat(t, tt.actual).ShouldMatch(testFile)
		})
	}
}
