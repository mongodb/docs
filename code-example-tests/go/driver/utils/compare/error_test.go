package compare

import (
	"go.mongodb.org/mongo-driver/v2/bson"
	"path/filepath"
	"testing"
)

func TestErrorHandling(t *testing.T) {
	tests := []struct {
		name          string
		expectedFile  string
		actual        []bson.D
		shouldHaveErr bool
		errContains   string
	}{
		{
			name:          "File not found",
			expectedFile:  "nonexistent.txt",
			actual:        []bson.D{},
			shouldHaveErr: true,
			errContains:   "Failed to read expected output",
		},
		{
			name:          "Invalid JSON in file",
			expectedFile:  "invalid.txt",
			actual:        []bson.D{},
			shouldHaveErr: true,
			errContains:   "failed to parse JSON",
		},
	}

	tempDir := t.TempDir()
	// Create invalid JSON file
	createTestFile(t, filepath.Join(tempDir, "invalid.txt"), `{invalid json`)

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			result := BsonDocuments(filepath.Join(tempDir, tt.expectedFile), tt.actual, nil)

			if tt.shouldHaveErr {
				if result.IsMatch {
					t.Error("Expected compare to fail, but it passed")
				}
				if len(result.Errors) == 0 {
					t.Error("Expected errors, but got none")
				}
				found := false
				for _, err := range result.Errors {
					if len(tt.errContains) > 0 && contains(err.Message, tt.errContains) {
						found = true
						break
					}
				}
				if !found && tt.errContains != "" {
					t.Errorf("Expected error containing %q, but got: %v", tt.errContains, result.Errors)
				}
			}
		})
	}
}
