package compare

import (
	"path/filepath"
	"strings"
	"testing"

	"go.mongodb.org/mongo-driver/v2/bson"
)

// TestErrorMessagesForFileIssues tests that file-related errors provide clear, actionable messages
func TestErrorMessagesForFileIssues(t *testing.T) {
	tempDir := t.TempDir()

	tests := []struct {
		name              string
		setupFile         func() string
		actual            []bson.D
		expectedErrorPart string
		description       string
	}{
		{
			name: "File not found error",
			setupFile: func() string {
				return filepath.Join(tempDir, "nonexistent-file.txt")
			},
			actual:            []bson.D{{{Key: "name", Value: "test"}}},
			expectedErrorPart: "Comparison failed",
			description:       "Should report comparison failure when file doesn't exist",
		},
		{
			name: "Invalid JSON in file",
			setupFile: func() string {
				path := filepath.Join(tempDir, "invalid-json.txt")
				createTestFile(t, path, `{invalid json syntax without quotes}`)
				return path
			},
			actual:            []bson.D{{{Key: "name", Value: "test"}}},
			expectedErrorPart: "Comparison failed",
			description:       "Should report failure when JSON is malformed",
		},
		{
			name: "Empty file",
			setupFile: func() string {
				path := filepath.Join(tempDir, "empty.txt")
				createTestFile(t, path, "")
				return path
			},
			actual:            []bson.D{{{Key: "name", Value: "test"}}},
			expectedErrorPart: "document count",
			description:       "Empty file should indicate count mismatch",
		},
		{
			name: "Incomplete JSON object",
			setupFile: func() string {
				path := filepath.Join(tempDir, "incomplete.txt")
				createTestFile(t, path, `{"name":"test"`)
				return path
			},
			actual:            []bson.D{{{Key: "name", Value: "test"}}},
			expectedErrorPart: "Comparison failed",
			description:       "Incomplete JSON should report failure",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			filePath := tt.setupFile()

			// Create a mock testing.T to capture the error
			mockT := &mockTestingTWithErrorCapture{mockTestingT: mockTestingT{t: t, shouldFail: true}}
			ExpectThat(mockT, tt.actual).ShouldMatch(filePath)

			if !mockT.failed {
				t.Errorf("%s: Expected test to fail but it passed", tt.description)
			}

			if mockT.errorMessage != "" && !strings.Contains(mockT.errorMessage, tt.expectedErrorPart) {
				t.Errorf("%s: Expected error containing %q, got: %q",
					tt.description, tt.expectedErrorPart, mockT.errorMessage)
			}
		})
	}
}

// TestErrorMessagesForDataMismatches tests that comparison errors are detected
func TestErrorMessagesForDataMismatches(t *testing.T) {
	tempDir := t.TempDir()

	tests := []struct {
		name        string
		fileContent string
		actual      []bson.D
		description string
	}{
		{
			name:        "Document count mismatch",
			fileContent: `{"name":"Alice"}`,
			actual: []bson.D{
				{{Key: "name", Value: "Alice"}},
				{{Key: "name", Value: "Bob"}},
			},
			description: "Should detect when document counts don't match",
		},
		{
			name:        "Field value mismatch",
			fileContent: `{"name":"Alice","age":30}`,
			actual:      []bson.D{{{Key: "name", Value: "Alice"}, {Key: "age", Value: 25}}},
			description: "Should detect field value mismatch",
		},
		{
			name:        "Missing field in actual",
			fileContent: `{"name":"Alice","email":"alice@example.com"}`,
			actual:      []bson.D{{{Key: "name", Value: "Alice"}}},
			description: "Should detect missing required field",
		},
		{
			name:        "Extra field in actual",
			fileContent: `{"name":"Alice"}`,
			actual:      []bson.D{{{Key: "name", Value: "Alice"}, {Key: "extra", Value: "field"}}},
			description: "Should detect unexpected extra field",
		},
		{
			name:        "Type mismatch",
			fileContent: `{"age":30}`,
			actual:      []bson.D{{{Key: "age", Value: "30"}}},
			description: "Should detect type mismatches",
		},
		{
			name:        "Array length mismatch",
			fileContent: `{"items":[1,2,3]}`,
			actual:      []bson.D{{{Key: "items", Value: []interface{}{1, 2}}}},
			description: "Should detect array length differences",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			testFile := filepath.Join(tempDir, tt.name+".txt")
			createTestFile(t, testFile, tt.fileContent)

			mockT := &mockTestingTWithErrorCapture{mockTestingT: mockTestingT{t: t, shouldFail: true}}
			ExpectThat(mockT, tt.actual).ShouldMatch(testFile)

			if !mockT.failed {
				t.Errorf("%s: Expected test to fail but it passed", tt.description)
			}

			// Verify some error message was provided
			if mockT.errorMessage == "" {
				t.Errorf("%s: Expected error message but got none", tt.description)
			}
		})
	}
}

// TestErrorMessageFormatting tests that error messages are provided for writers
func TestErrorMessageFormatting(t *testing.T) {
	tempDir := t.TempDir()

	t.Run("Nested field mismatch provides error", func(t *testing.T) {
		fileContent := `{"user":{"profile":{"name":"Alice"}}}`
		testFile := filepath.Join(tempDir, "nested.txt")
		createTestFile(t, testFile, fileContent)

		actual := []bson.D{
			{{Key: "user", Value: map[string]interface{}{
				"profile": map[string]interface{}{
					"name": "Bob", // Mismatch here
				},
			}}},
		}

		mockT := &mockTestingTWithErrorCapture{mockTestingT: mockTestingT{t: t, shouldFail: true}}
		ExpectThat(mockT, actual).ShouldMatch(testFile)

		if !mockT.failed {
			t.Error("Expected test to fail for nested mismatch")
		}

		// Should provide some error message
		if mockT.errorMessage == "" {
			t.Error("Should provide error message for nested mismatch")
		}
	})

	t.Run("Simple field mismatch provides error", func(t *testing.T) {
		fileContent := `{"status":"active"}`
		testFile := filepath.Join(tempDir, "status.txt")
		createTestFile(t, testFile, fileContent)

		actual := []bson.D{{{Key: "status", Value: "inactive"}}}

		mockT := &mockTestingTWithErrorCapture{mockTestingT: mockTestingT{t: t, shouldFail: true}}
		ExpectThat(mockT, actual).ShouldMatch(testFile)

		if !mockT.failed {
			t.Error("Expected test to fail for value mismatch")
		}

		// Should provide error message
		if mockT.errorMessage == "" {
			t.Error("Should provide error message for value mismatch")
		}
	})
}

// TestMismatchesAreDetected tests that mismatches cause test failures
func TestMismatchesAreDetected(t *testing.T) {
	tempDir := t.TempDir()

	fileContent := `{"name":"Alice","age":30,"email":"alice@example.com"}`
	testFile := filepath.Join(tempDir, "multiple-errors.txt")
	createTestFile(t, testFile, fileContent)

	// Actual has multiple mismatches
	actual := []bson.D{
		{{Key: "name", Value: "Bob"}, {Key: "age", Value: 25}, {Key: "email", Value: "bob@example.com"}},
	}

	mockT := &mockTestingTWithErrorCapture{mockTestingT: mockTestingT{t: t, shouldFail: true}}
	ExpectThat(mockT, actual).ShouldMatch(testFile)

	if !mockT.failed {
		t.Error("Expected test to fail when data mismatches")
	}

	// Should provide some error message
	if mockT.errorMessage == "" {
		t.Error("Should provide error message when comparison fails")
	}
}

// mockTestingT is a mock implementation of TestingT for testing
type mockTestingT struct {
	t          *testing.T
	failed     bool
	shouldFail bool
}

func (m *mockTestingT) Helper() {}

func (m *mockTestingT) Fatalf(format string, args ...interface{}) {
	m.failed = true
	if !m.shouldFail {
		m.t.Errorf("Unexpected failure: "+format, args...)
	}
}

// mockTestingTWithErrorCapture extends mockTestingT to capture error messages
type mockTestingTWithErrorCapture struct {
	mockTestingT
	errorMessage string
}

func (m *mockTestingTWithErrorCapture) Fatalf(format string, args ...interface{}) {
	m.failed = true
	m.errorMessage = formatMessage(format, args...)
	if !m.shouldFail {
		m.t.Errorf("Unexpected failure: "+format, args...)
	}
}

func formatMessage(format string, args ...interface{}) string {
	if len(args) == 0 {
		return format
	}
	// Simple sprintf-like formatting
	result := format
	for _, arg := range args {
		result = strings.Replace(result, "%s", toString(arg), 1)
		result = strings.Replace(result, "%v", toString(arg), 1)
	}
	return result
}

func toString(v interface{}) string {
	switch val := v.(type) {
	case string:
		return val
	case error:
		return val.Error()
	default:
		return ""
	}
}
