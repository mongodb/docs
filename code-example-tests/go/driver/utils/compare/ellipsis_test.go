package compare

import (
	"go.mongodb.org/mongo-driver/v2/bson"
	"path/filepath"
	"testing"
)

func TestEllipsisPatterns(t *testing.T) {
	tempDir := t.TempDir()

	tests := []struct {
		name         string
		expectedFile string
		actual       []bson.D
		shouldMatch  bool
	}{
		{
			name:         "Property-level exact ellipsis",
			expectedFile: "prop_ellipsis.txt",
			actual: []bson.D{
				{{Key: "id", Value: "anything"}, {Key: "name", Value: "John"}},
			},
			shouldMatch: true,
		},
		{
			name:         "Property-level truncated string",
			expectedFile: "truncated.txt",
			actual: []bson.D{
				{{Key: "message", Value: "Error: Connection failed after 3 retries"}},
			},
			shouldMatch: true,
		},
		{
			name:         "Array with ellipsis",
			expectedFile: "array_ellipsis.txt",
			actual: []bson.D{
				{{Key: "tags", Value: []interface{}{"user", "active", "premium"}}},
			},
			shouldMatch: true,
		},
		{
			name:         "Global ellipsis allows extra fields",
			expectedFile: "global_ellipsis.txt",
			actual: []bson.D{
				{{Key: "name", Value: "John"}, {Key: "extra", Value: "field"}},
			},
			shouldMatch: true,
		},
	}

	// Create test files
	createTestFile(t, filepath.Join(tempDir, "prop_ellipsis.txt"), `{"id":"...","name":"John"}`)
	createTestFile(t, filepath.Join(tempDir, "truncated.txt"), `{"message":"Error: Connection failed..."}`)
	createTestFile(t, filepath.Join(tempDir, "array_ellipsis.txt"), `{"tags":["..."]}`)
	createTestFile(t, filepath.Join(tempDir, "global_ellipsis.txt"), "...\n"+`{"name":"John"}`)

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			result := BsonDocuments(filepath.Join(tempDir, tt.expectedFile), tt.actual, nil)

			if result.IsMatch != tt.shouldMatch {
				t.Errorf("Expected match=%v, got match=%v. Errors: %v", tt.shouldMatch, result.IsMatch, result.Errors)
			}
		})
	}
}

func TestHandleEllipsisPatterns(t *testing.T) {
	tests := []struct {
		name     string
		expected interface{}
		actual   interface{}
		handled  bool
		matches  bool
	}{
		{
			name:     "Exact ellipsis string",
			expected: "...",
			actual:   "anything",
			handled:  true,
			matches:  true,
		},
		{
			name:     "Truncated string match",
			expected: "Hello...",
			actual:   "Hello World",
			handled:  true,
			matches:  true,
		},
		{
			name:     "Truncated string mismatch",
			expected: "Hello...",
			actual:   "Goodbye World",
			handled:  true,
			matches:  false,
		},
		{
			name:     "Array wildcard",
			expected: []interface{}{"..."},
			actual:   []interface{}{1, 2, 3},
			handled:  true,
			matches:  true,
		},
		{
			name:     "Object wildcard",
			expected: map[string]interface{}{"...": "..."},
			actual:   map[string]interface{}{"key": "value"},
			handled:  true,
			matches:  true,
		},
		{
			name:     "No ellipsis pattern",
			expected: "normal",
			actual:   "normal",
			handled:  false,
			matches:  false,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			result := handleEllipsisPatterns(tt.expected, tt.actual)

			if result.handled != tt.handled {
				t.Errorf("Expected handled=%v, got handled=%v", tt.handled, result.handled)
			}

			if result.matches != tt.matches {
				t.Errorf("Expected matches=%v, got matches=%v", tt.matches, result.matches)
			}
		})
	}
}
