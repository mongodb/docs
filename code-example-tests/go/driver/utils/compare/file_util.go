package compare

import (
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

// readExpectedOutput reads and parses the expected output file.
// It first tries to parse the entire file as a single JSON value (pretty-printed
// object or array). If that fails, it falls back to newline-delimited JSON
// (one complete JSON value per non-empty line).
func readExpectedOutput(filePath string) ([]interface{}, error) {
	raw, err := os.ReadFile(filePath)
	if err != nil {
		return nil, err
	}
	content := string(raw)

	normalizedLines := splitNormalizedLines(content)
	hasGlobalEllipsis := false
	for _, line := range normalizedLines {
		if line == "..." {
			hasGlobalEllipsis = true
			break
		}
	}

	// Standalone "..." lines are metadata (global ellipsis), not JSON; strip them so a
	// pretty-printed document followed by "..." still parses as one value.
	contentForFullParse := stripStandaloneEllipsisLines(content)
	normalizedFull := preprocessMongoSyntax(contentForFullParse)

	var root interface{}
	if err := json.Unmarshal([]byte(normalizedFull), &root); err != nil {
		return readExpectedOutputNDJSON(normalizedLines, hasGlobalEllipsis)
	}

	switch v := root.(type) {
	case map[string]interface{}:
		normalizedDoc := normalizeValue(v)
		applyGlobalEllipsis(hasGlobalEllipsis, normalizedDoc)
		return []interface{}{normalizedDoc}, nil
	case []interface{}:
		docs := make([]interface{}, 0, len(v))
		for _, item := range v {
			normalizedDoc := normalizeValue(item)
			applyGlobalEllipsis(hasGlobalEllipsis, normalizedDoc)
			docs = append(docs, normalizedDoc)
		}
		return docs, nil
	default:
		return nil, fmt.Errorf("expected JSON object or array at root, got %T", root)
	}
}

// stripStandaloneEllipsisLines removes lines that contain only "..." (after trim).
// Those lines mark global ellipsis and are not part of the JSON payload.
func stripStandaloneEllipsisLines(content string) string {
	content = strings.ReplaceAll(content, "\r\n", "\n")
	lines := strings.Split(content, "\n")
	var b strings.Builder
	first := true
	for _, line := range lines {
		if strings.TrimSpace(line) == "..." {
			continue
		}
		if !first {
			b.WriteByte('\n')
		}
		first = false
		b.WriteString(line)
	}
	return b.String()
}

func splitNormalizedLines(content string) []string {
	content = strings.ReplaceAll(content, "\r\n", "\n")
	lines := strings.Split(content, "\n")
	out := make([]string, len(lines))
	for i, line := range lines {
		out[i] = strings.TrimSpace(line)
	}
	return out
}

func applyGlobalEllipsis(hasGlobalEllipsis bool, normalizedDoc interface{}) {
	if !hasGlobalEllipsis {
		return
	}
	if docMap, ok := normalizedDoc.(map[string]interface{}); ok {
		docMap["..."] = "..."
	}
}

func readExpectedOutputNDJSON(allLines []string, hasGlobalEllipsis bool) ([]interface{}, error) {
	var docs []interface{}
	lineNum := 0
	for _, line := range allLines {
		lineNum++
		if line == "" {
			continue
		}
		if line == "..." {
			continue
		}

		normalizedLine := preprocessMongoSyntax(line)
		var doc interface{}
		if err := json.Unmarshal([]byte(normalizedLine), &doc); err != nil {
			return nil, fmt.Errorf("line %d: failed to parse JSON: %v", lineNum, err)
		}

		normalizedDoc := normalizeValue(doc)
		applyGlobalEllipsis(hasGlobalEllipsis, normalizedDoc)
		docs = append(docs, normalizedDoc)
	}

	return docs, nil
}
