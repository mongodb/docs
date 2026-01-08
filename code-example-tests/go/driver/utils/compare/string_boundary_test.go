package compare

import (
	"path/filepath"
	"testing"

	"go.mongodb.org/mongo-driver/v2/bson"
)

// TestEllipsisInsideQuotedStringsPreserved tests that ellipsis inside quoted strings are NOT treated as truncation markers.
// This is the critical bug fix from MongoDB Shell commit fbccfb5c64bb2a4cdf89e1873f9e4b79469e28fd.
// The ",...'" pattern at the end of a string value should remain intact after normalization.
func TestEllipsisInsideQuotedStringsPreserved(t *testing.T) {
	tempDir := t.TempDir()

	tests := []struct {
		name        string
		fileContent string
		actual      []bson.D
		description string
	}{
		{
			name:        "Ellipsis at end of double-quoted string",
			fileContent: `{"plot": "What do you love the most, what scares you the most...", "title": "Test Movie"}`,
			actual: []bson.D{
				{
					{Key: "plot", Value: "What do you love the most, what scares you the most..."},
					{Key: "title", Value: "Test Movie"},
				},
			},
			description: "Ellipsis inside double-quoted strings should be preserved as literal text",
		},
		{
			name:        "Ellipsis in middle of double-quoted string",
			fileContent: `{"description": "This is a long description that ends with...", "name": "Test"}`,
			actual: []bson.D{
				{
					{Key: "description", Value: "This is a long description that ends with..."},
					{Key: "name", Value: "Test"},
				},
			},
			description: "Ellipsis at the end of a string value should be preserved",
		},
		{
			name:        "Multiple ellipsis patterns in one document",
			fileContent: `{"plot": "The story continues...", "summary": "A tale of...", "title": "Movie"}`,
			actual: []bson.D{
				{
					{Key: "plot", Value: "The story continues..."},
					{Key: "summary", Value: "A tale of..."},
					{Key: "title", Value: "Movie"},
				},
			},
			description: "Multiple ellipsis inside strings should all be preserved",
		},
		{
			name:        "Mixed: ellipsis in string AND as property value",
			fileContent: `{"plot": "The story continues...", "_id": ..., "title": "Movie"}`,
			actual: []bson.D{
				{
					{Key: "plot", Value: "The story continues..."},
					{Key: "_id", Value: "507f1f77bcf86cd799439011"},
					{Key: "title", Value: "Movie"},
				},
			},
			description: "Ellipsis inside strings should be preserved while unquoted ellipsis as values should be treated as wildcards",
		},
		{
			name:        "Ellipsis in single-quoted string",
			fileContent: `{"plot": 'The story continues...', "title": "Movie"}`,
			actual: []bson.D{
				{
					{Key: "plot", Value: "The story continues..."},
					{Key: "title", Value: "Movie"},
				},
			},
			description: "Ellipsis inside single-quoted strings should also be preserved",
		},
		{
			name:        "Escaped quotes with ellipsis",
			fileContent: `{"text": "He said \"wait...\" and left", "status": "complete"}`,
			actual: []bson.D{
				{
					{Key: "text", Value: `He said "wait..." and left`},
					{Key: "status", Value: "complete"},
				},
			},
			description: "Ellipsis inside strings with escaped quotes should be preserved",
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

// TestEllipsisOutsideStringsAreQuoted tests that unquoted ellipsis outside strings are properly quoted.
func TestEllipsisOutsideStringsAreQuoted(t *testing.T) {
	tempDir := t.TempDir()

	tests := []struct {
		name        string
		fileContent string
		actual      []bson.D
		description string
	}{
		{
			name:        "Unquoted ellipsis as property value",
			fileContent: `{"_id": ..., "name": "Test"}`,
			actual: []bson.D{
				{{Key: "_id", Value: "any-value"}, {Key: "name", Value: "Test"}},
			},
			description: "Unquoted ellipsis outside strings should be treated as wildcard",
		},
		{
			name:        "Unquoted ellipsis in array",
			fileContent: `{"items": [1, 2, ...]}`,
			actual: []bson.D{
				{{Key: "items", Value: []interface{}{1, 2, 3, 4, 5}}},
			},
			description: "Unquoted ellipsis in arrays should be treated as wildcard",
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
