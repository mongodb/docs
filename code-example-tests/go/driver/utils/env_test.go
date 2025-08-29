package utils

import (
	"os"
	"testing"
)

// TestEnvUtility tests the centralized environment loading functionality
func TestEnvUtility(t *testing.T) {
	t.Run("GetConnectionString", func(t *testing.T) {
		// This should automatically load .env and return connection string
		connectionString := GetConnectionString()

		if connectionString == "" {
			t.Log("No connection string found - this is expected if no .env file exists")
		} else {
			t.Logf("✅ Successfully loaded connection string: %s",
				connectionString[:min(10, len(connectionString))]+"...")
		}
	})

	t.Run("EnvLoadingIsIdempotent", func(t *testing.T) {
		// Multiple calls should be safe
		str1 := GetConnectionString()
		str2 := GetConnectionString()

		if str1 != str2 {
			t.Error("Multiple calls to GetConnectionString should return the same result")
		}
	})

	t.Run("EnsureEnvLoadedIsIdempotent", func(t *testing.T) {
		// Reset the envLoaded flag to test the idempotent behavior
		originalEnvLoaded := envLoaded
		defer func() { envLoaded = originalEnvLoaded }()

		// First call should load
		envLoaded = false
		EnsureEnvLoaded()
		firstCallState := envLoaded

		// Second call should be a no-op
		EnsureEnvLoaded()
		secondCallState := envLoaded

		if !firstCallState || !secondCallState {
			t.Error("EnsureEnvLoaded should set envLoaded to true")
		}
	})

	t.Run("GetProjectRootReturnsValidPath", func(t *testing.T) {
		projectRoot, err := getProjectRoot()

		if err != nil {
			t.Fatalf("getProjectRoot should not return error: %v", err)
		}

		if projectRoot == "" {
			t.Error("getProjectRoot should return non-empty path")
		}

		// Check if the returned path exists and contains go.mod
		if _, err := os.Stat(projectRoot); os.IsNotExist(err) {
			t.Errorf("Project root path does not exist: %s", projectRoot)
		}

		goModPath := projectRoot + "/go.mod"
		if _, err := os.Stat(goModPath); os.IsNotExist(err) {
			t.Errorf("go.mod not found at project root: %s", goModPath)
		}
	})

	t.Run("EnvironmentVariableAccess", func(t *testing.T) {
		// Test that we can access environment variables after loading
		EnsureEnvLoaded()

		// This should not panic and should return some value (empty string if not set)
		connectionString := os.Getenv("CONNECTION_STRING")
		t.Logf("CONNECTION_STRING after env loading: %v", connectionString != "")

		// Test accessing any environment variable
		path := os.Getenv("PATH")
		if path == "" {
			t.Error("PATH environment variable should be accessible")
		}
	})
}
