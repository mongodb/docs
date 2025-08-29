package compare

import (
	"os"
	"testing"
)

// Helper functions

func createTestFile(t *testing.T, filePath, content string) {
	t.Helper()
	err := os.WriteFile(filePath, []byte(content), 0644)
	if err != nil {
		t.Fatalf("Failed to create test file %s: %v", filePath, err)
	}
}

func contains(s, substr string) bool {
	return len(substr) == 0 || (len(s) >= len(substr) && findInString(s, substr))
}

func findInString(s, substr string) bool {
	for i := 0; i <= len(s)-len(substr); i++ {
		if s[i:i+len(substr)] == substr {
			return true
		}
	}
	return false
}

// Helper function to create temporary test files
func createTempFile(t *testing.T, content string) (string, func()) {
	t.Helper()

	tmpfile, err := os.CreateTemp("", "test_comparison_*.txt")
	if err != nil {
		t.Fatalf("Failed to create temp file: %v", err)
	}

	if _, err := tmpfile.Write([]byte(content)); err != nil {
		tmpfile.Close()
		os.Remove(tmpfile.Name())
		t.Fatalf("Failed to write temp file: %v", err)
	}
	tmpfile.Close()

	cleanup := func() {
		os.Remove(tmpfile.Name())
	}

	return tmpfile.Name(), cleanup
}
