package compare

import (
	"fmt"
	"strings"
)

// ellipsisResult represents the result of ellipsis pattern handling
type ellipsisResult struct {
	handled bool
	matches bool
}

// handleEllipsisPatterns checks for various ellipsis patterns
func handleEllipsisPatterns(expected, actual interface{}) ellipsisResult {
	// Property-level ellipsis
	if expectedStr, ok := expected.(string); ok {
		if expectedStr == "..." {
			return ellipsisResult{handled: true, matches: true}
		}
		if strings.HasSuffix(expectedStr, "...") {
			if actualStr, ok := actual.(string); ok {
				prefix := expectedStr[:len(expectedStr)-3]
				return ellipsisResult{handled: true, matches: strings.HasPrefix(actualStr, prefix)}
			}
			return ellipsisResult{handled: true, matches: false}
		}
	}

	// Array-level ellipsis
	if expectedSlice, ok := expected.([]interface{}); ok {
		// Full array wildcard
		if len(expectedSlice) == 1 {
			if expectedStr, ok := expectedSlice[0].(string); ok && expectedStr == "..." {
				if _, ok := actual.([]interface{}); ok {
					return ellipsisResult{handled: true, matches: true}
				}
			}
		}
	}

	// Object-level ellipsis
	if expectedMap, ok := expected.(map[string]interface{}); ok {
		if len(expectedMap) == 1 {
			if val, exists := expectedMap["..."]; exists {
				if valStr, ok := val.(string); ok && valStr == "..." {
					if _, ok := actual.(map[string]interface{}); ok {
						return ellipsisResult{handled: true, matches: true}
					}
				}
			}
		}
	}

	return ellipsisResult{handled: false, matches: false}
}

// handleArrayLevelEllipsis checks for array-level ellipsis patterns
func handleArrayLevelEllipsis(expected []interface{}) arrayEllipsisResult {
	// Full array wildcard
	if len(expected) == 1 {
		if expectedStr, ok := expected[0].(string); ok && expectedStr == "..." {
			return arrayEllipsisResult{handled: true, matches: true}
		}
	}

	// Check if array contains ellipsis elements
	for _, item := range expected {
		if itemStr, ok := item.(string); ok && itemStr == "..." {
			return arrayEllipsisResult{handled: true, requiresSpecialMatching: true}
		}
	}

	return arrayEllipsisResult{handled: false}
}

// matchArrayWithEllipsis handles arrays containing ellipsis elements
func matchArrayWithEllipsis(expected, actual []interface{}, path string) Result {
	// This is a simplified implementation - would need more sophisticated logic for complex ellipsis matching
	// For now, return true if actual array has at least as many elements as non-ellipsis expected elements
	nonEllipsisCount := 0
	for _, item := range expected {
		if itemStr, ok := item.(string); !ok || itemStr != "..." {
			nonEllipsisCount++
		}
	}

	if len(actual) >= nonEllipsisCount {
		return Result{IsMatch: true}
	}

	return Result{
		IsMatch: false,
		Errors: []Error{{
			Path:     path,
			Expected: fmt.Sprintf("at least %d elements", nonEllipsisCount),
			Actual:   fmt.Sprintf("%d elements", len(actual)),
			Message:  "insufficient elements for ellipsis pattern",
		}},
	}
}
