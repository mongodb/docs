package fileutils

import (
	"fmt"
	"os"
	"path/filepath"
	"time"
)

// GenerateOutputPath constructs a valid file path based on the given directory, prefix, and optional extension.
// It returns the full path to the generated file with formatted filename or an error if any operation fails.
//
// NOTE: You can define a default global directory for all generated files by setting the ATLAS_DOWNLOADS_DIR environment variable.
func GenerateOutputPath(dir, prefix, extension string) (string, error) {
	// If default download directory is set in .env, prepend it to the provided dir
	dir = ResolveWithDownloadsBase(dir)

	// Create directory if it doesn't exist
	if err := os.MkdirAll(dir, 0755); err != nil {
		return "", fmt.Errorf("failed to create output directory: %w", err)
	}

	timestamp := time.Now().Format("20060102")
	var filename string
	if extension == "" {
		filename = fmt.Sprintf("%s_%s", prefix, timestamp)
	} else {
		filename = fmt.Sprintf("%s_%s.%s", prefix, timestamp, extension)
	}

	filename = filepath.Clean(filename)
	if len(filename) > 255 {
		return "", fmt.Errorf("filename exceeds maximum length of 255 characters: %s", filename)
	}

	return filepath.Join(dir, filename), nil
}
