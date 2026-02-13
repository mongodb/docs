package compare

import (
	"bufio"
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
	"strings"
)

// resolveFilePath resolves a file path by checking if it exists directly,
// or by walking up from the current working directory to find the 'driver' directory
// and resolving the path relative to it.
// Returns the resolved absolute path and nil error if found, or empty string and error if not found.
func resolveFilePath(path string) (string, error) {
	// First, check if the provided path is absolute and exists
	if filepath.IsAbs(path) {
		if _, err := os.Stat(path); err == nil {
			return path, nil
		}
	}

	// Check if it exists as a relative path from current directory
	if _, err := os.Stat(path); err == nil {
		return path, nil
	}

	// Walk up from the current working directory until we find the 'driver' directory
	wd, err := os.Getwd()
	if err != nil {
		return "", fmt.Errorf("failed to get working directory: %w", err)
	}

	for {
		if wd == "/" || wd == "." {
			break
		}
		base := filepath.Base(wd)
		if base == "driver" {
			candidate := filepath.Join(wd, path)
			if _, err := os.Stat(candidate); err == nil {
				return candidate, nil
			}
		}
		parent := filepath.Dir(wd)
		if parent == wd {
			break
		}
		wd = parent
	}

	return "", fmt.Errorf("failed to find file: %s from any driver directory", path)
}

// readExpectedOutput reads and parses the expected output file
func readExpectedOutput(filePath string) ([]interface{}, error) {
	file, err := os.Open(filePath)
	if err != nil {
		return nil, err
	}
	defer func() { _ = file.Close() }()

	var docs []interface{}
	scanner := bufio.NewScanner(file)
	lineNum := 0
	hasGlobalEllipsis := false

	// First pass: check for global ellipsis
	allLines := []string{}
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		allLines = append(allLines, line)
		if line == "..." {
			hasGlobalEllipsis = true
		}
	}

	if err := scanner.Err(); err != nil {
		return nil, err
	}

	// Second pass: process lines
	for _, line := range allLines {
		lineNum++
		if line == "" {
			continue // Skip empty lines
		}

		// Skip global ellipsis marker but remember it was there
		if line == "..." {
			continue
		}

		// Preprocess the line to handle MongoDB syntax
		normalizedLine := preprocessMongoSyntax(line)

		// Parse as JSON
		var doc interface{}
		if err := json.Unmarshal([]byte(normalizedLine), &doc); err != nil {
			return nil, fmt.Errorf("line %d: failed to parse JSON: %v", lineNum, err)
		}

		// Normalize the parsed document
		normalizedDoc := normalizeValue(doc)

		// Add global ellipsis marker to objects if detected
		if hasGlobalEllipsis {
			if docMap, ok := normalizedDoc.(map[string]interface{}); ok {
				docMap["..."] = "..."
			}
		}

		docs = append(docs, normalizedDoc)
	}

	return docs, nil
}
