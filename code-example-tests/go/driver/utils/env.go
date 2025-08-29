package utils

import (
	"log"
	"os"
	"os/exec"
	"path/filepath"
	"strings"

	"github.com/joho/godotenv"
)

var envLoaded bool

// EnsureEnvLoaded ensures that environment variables are loaded from .env files
// This function is safe to call multiple times - it only loads once
func EnsureEnvLoaded() {
	if envLoaded {
		return // Already loaded
	}

	// Get the Go module root directory directly
	projectRoot, err := getProjectRoot()
	if err != nil {
		log.Printf("Failed to find Go module root: %v", err)
		envLoaded = true
		return
	}

	// Load .env from the project root
	envPath := filepath.Join(projectRoot, ".env")
	if err := godotenv.Load(envPath); err != nil {
		log.Printf("No .env file found at %s", envPath)
	} else {
		log.Printf("Environment loaded from %s", envPath)
	}

	envLoaded = true
}

// getProjectRoot gets the Go module root using go list command
func getProjectRoot() (string, error) {
	cmd := exec.Command("go", "list", "-m", "-f", "{{.Dir}}")
	output, err := cmd.Output()
	if err != nil {
		return "", err
	}
	return strings.TrimSpace(string(output)), nil
}

// GetConnectionString returns the MongoDB connection string, automatically loading .env if needed
func GetConnectionString() string {
	EnsureEnvLoaded()
	return os.Getenv("CONNECTION_STRING")
}
