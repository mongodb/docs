package compare

import (
	"bufio"
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
	"strings"
)

// GetResolvedFilePath resolves the final path for an expected file.
func GetResolvedFilePath(expectedFilePath string) (string, error) {
	if filepath.IsAbs(expectedFilePath) {
		return expectedFilePath, nil
	}

	possiblePaths := []string{
		expectedFilePath,
		filepath.Join("../../../", expectedFilePath),
		filepath.Join("../../", expectedFilePath),
		filepath.Join("../", expectedFilePath),
	}

	for _, path := range possiblePaths {
		if _, err := os.Stat(path); err == nil {
			return path, nil
		}
	}

	return "", fmt.Errorf("file not found: %s", expectedFilePath)
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
