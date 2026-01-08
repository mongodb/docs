package compare

import (
	"path/filepath"
	"testing"

	"go.mongodb.org/mongo-driver/v2/bson"
)

// TestUnquotedEllipsisAsPropertyValue tests that unquoted ellipsis as property values are parsed correctly.
// This matches the functionality added to mongosh in commit 67d16af07bc.
func TestUnquotedEllipsisAsPropertyValue(t *testing.T) {
	tempDir := t.TempDir()

	tests := []struct {
		name        string
		fileContent string
		actual      []bson.D
		description string
	}{
		{
			name:        "Unquoted ellipsis as property value",
			fileContent: `{"_id": ... , "count": ...}`,
			actual: []bson.D{
				{{Key: "_id", Value: "507f1f77bcf86cd799439011"}, {Key: "count", Value: 42}},
			},
			description: "Unquoted ellipsis like { _id: ... } should match any value",
		},
		{
			name: "Multiple documents with unquoted ellipsis",
			fileContent: `{"_id": ... , "count": 42}
{"_id": ... , "count": 17}`,
			actual: []bson.D{
				{{Key: "_id", Value: "507f1f77bcf86cd799439011"}, {Key: "count", Value: 42}},
				{{Key: "_id", Value: "507f1f77bcf86cd799439012"}, {Key: "count", Value: 17}},
			},
			description: "Multiple documents with unquoted ellipsis should work",
		},
		{
			name:        "Unquoted ellipsis with nested objects",
			fileContent: `{"user": {"id": ..., "name": "Alice"}, "timestamp": ...}`,
			actual: []bson.D{
				{
					{Key: "user", Value: map[string]interface{}{"id": "auto-gen-123", "name": "Alice"}},
					{Key: "timestamp", Value: "2023-01-01T00:00:00Z"},
				},
			},
			description: "Unquoted ellipsis should work in nested objects",
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

// TestQuotedAndUnquotedEllipsisEquivalence tests that both quoted and unquoted ellipsis work equivalently.
func TestQuotedAndUnquotedEllipsisEquivalence(t *testing.T) {
	tempDir := t.TempDir()

	actual := []bson.D{
		{{Key: "_id", Value: "507f1f77bcf86cd799439011"}, {Key: "count", Value: 42}},
	}

	tests := []struct {
		name        string
		fileContent string
	}{
		{
			name:        "Quoted ellipsis",
			fileContent: `{"_id": "...", "count": 42}`,
		},
		{
			name:        "Unquoted ellipsis",
			fileContent: `{"_id": ..., "count": 42}`,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			testFile := filepath.Join(tempDir, tt.name+".txt")
			createTestFile(t, testFile, tt.fileContent)

			ExpectThat(t, actual).ShouldMatch(testFile)
		})
	}
}

// TestUnquotedEllipsisInArrays tests unquoted ellipsis in array contexts.
func TestUnquotedEllipsisInArrays(t *testing.T) {
	tempDir := t.TempDir()

	tests := []struct {
		name        string
		fileContent string
		actual      []bson.D
		description string
	}{
		{
			name:        "Unquoted ellipsis as array element",
			fileContent: `{"items": [1, 2, ...]}`,
			actual: []bson.D{
				{{Key: "items", Value: []interface{}{1, 2, 3, 4, 5}}},
			},
			description: "Unquoted ellipsis in array should match remaining elements",
		},
		{
			name:        "Array with only unquoted ellipsis",
			fileContent: `{"items": [...]}`,
			actual: []bson.D{
				{{Key: "items", Value: []interface{}{1, 2, 3, 4, 5}}},
			},
			description: "Array with single unquoted ellipsis should match any array",
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

