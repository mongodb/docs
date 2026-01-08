package compare

import (
	"path/filepath"
	"testing"

	"go.mongodb.org/mongo-driver/v2/bson"
)

// TestMixedPropertyAndDocumentEllipsis tests mixing property-level ellipsis with document-level ellipsis.
// This feature was added to mongosh in commit 67d16af07bc and C# in commit ddd298d.
func TestMixedPropertyAndDocumentEllipsis(t *testing.T) {
	tempDir := t.TempDir()

	tests := []struct {
		name        string
		fileContent string
		actual      []bson.D
		description string
	}{
		{
			name: "Property ellipsis with document ellipsis (unquoted)",
			fileContent: `{"_id": ..., "name": "Carl"}
...
{"status": "active"}`,
			actual: []bson.D{
				{
					{Key: "_id", Value: "507f1f77bcf86cd799439011"},
					{Key: "name", Value: "Carl"},
					{Key: "email", Value: "carl@example.com"}, // Extra field allowed by ...
					{Key: "age", Value: 30},                   // Extra field allowed by ...
				},
				{
					{Key: "status", Value: "active"},
					{Key: "lastLogin", Value: "2024-01-01"}, // Extra field allowed by ...
				},
			},
			description: "Property-level ellipsis (_id: ...) AND document-level ellipsis (standalone ...) should both work",
		},
		{
			name: "Property ellipsis with document ellipsis (quoted)",
			fileContent: `{"_id": "...", "name": "Carl"}
...
{"status": "active"}`,
			actual: []bson.D{
				{
					{Key: "_id", Value: "507f1f77bcf86cd799439011"},
					{Key: "name", Value: "Carl"},
					{Key: "email", Value: "carl@example.com"},
				},
				{
					{Key: "status", Value: "active"},
					{Key: "lastLogin", Value: "2024-01-01"},
				},
			},
			description: "Quoted property-level ellipsis should also work with document-level ellipsis",
		},
		{
			name:        "Property ellipsis only (no document ellipsis)",
			fileContent: `{"_id": ..., "name": "Carl"}`,
			actual: []bson.D{
				{{Key: "_id", Value: "507f1f77bcf86cd799439011"}, {Key: "name", Value: "Carl"}},
			},
			description: "Property-level ellipsis should work without document-level ellipsis",
		},
		{
			name: "Document ellipsis only (no property ellipsis)",
			fileContent: `{"name": "Carl"}
...
{"status": "active"}`,
			actual: []bson.D{
				{{Key: "name", Value: "Carl"}, {Key: "extra", Value: "field"}},
				{{Key: "status", Value: "active"}, {Key: "another", Value: "field"}},
			},
			description: "Document-level ellipsis should work without property-level ellipsis",
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

// TestMixedEllipsisInArrays tests mixing property-level and array-level ellipsis.
func TestMixedEllipsisInArrays(t *testing.T) {
	tempDir := t.TempDir()

	tests := []struct {
		name        string
		fileContent string
		actual      []bson.D
		description string
	}{
		{
			name: "Property ellipsis with array ellipsis (unquoted)",
			fileContent: `{"_id": ..., "count": ...}
{"_id": ..., "count": ...}`,
			actual: []bson.D{
				{{Key: "_id", Value: "uuid-1"}, {Key: "count", Value: 10}},
				{{Key: "_id", Value: "uuid-2"}, {Key: "count", Value: 20}},
			},
			description: "Multiple documents with property-level ellipsis should work",
		},
		{
			name:        "Complex nested with mixed ellipsis",
			fileContent: `{"message": "Processing...", "items": [...], "status": ...}`,
			actual: []bson.D{
				{
					{Key: "message", Value: "Processing complete with 5 items"},
					{Key: "items", Value: []interface{}{1, 2, 3, 4, 5}},
					{Key: "status", Value: "success"},
				},
			},
			description: "Truncated string, array wildcard, and property ellipsis should all work together",
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

