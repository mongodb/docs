package main

import (
	"fmt"
	"strings"
)

// ellipsisResult represents the result of ellipsis pattern handling.
type ellipsisResult struct {
	handled bool
	matches bool
}

// handleEllipsisPatterns checks for property-level, array-level, and
// object-level ellipsis patterns and returns whether they were handled and matched.
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

	// Array-level ellipsis: ["..."] matches any array
	if expectedSlice, ok := expected.([]interface{}); ok {
		if len(expectedSlice) == 1 {
			if expectedStr, ok := expectedSlice[0].(string); ok && expectedStr == "..." {
				if _, ok := actual.([]interface{}); ok {
					return ellipsisResult{handled: true, matches: true}
				}
			}
		}
	}

	// Object-level ellipsis: {"...": "..."} matches any object
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

// arrayEllipsisResult represents the result of array-level ellipsis handling.
type arrayEllipsisResult struct {
	handled                 bool
	matches                 bool
	requiresSpecialMatching bool
}

// handleArrayLevelEllipsis checks for full-array wildcard and partial ellipsis patterns.
func handleArrayLevelEllipsis(expected []interface{}) arrayEllipsisResult {
	if len(expected) == 1 {
		if expectedStr, ok := expected[0].(string); ok && expectedStr == "..." {
			return arrayEllipsisResult{handled: true, matches: true}
		}
	}
	for _, item := range expected {
		if itemStr, ok := item.(string); ok && itemStr == "..." {
			return arrayEllipsisResult{handled: true, requiresSpecialMatching: true}
		}
	}
	return arrayEllipsisResult{handled: false}
}

// matchArrayWithEllipsis handles arrays containing "..." elements by treating
// them as "any number of additional elements may appear here" and verifying
// that every non-ellipsis expected element matches some unused element in
// actual (unordered subset match). The length check alone is insufficient — an
// expected array like [1, "...", {"x": 1}] must also confirm that the listed
// elements are actually present.
func matchArrayWithEllipsis(expected, actual []interface{}, options *Options, hasOmittedFields bool, path string) Result {
	var nonEllipsis []interface{}
	var nonEllipsisIdx []int
	for i, item := range expected {
		if s, ok := item.(string); ok && s == "..." {
			continue
		}
		nonEllipsis = append(nonEllipsis, item)
		nonEllipsisIdx = append(nonEllipsisIdx, i)
	}

	if len(actual) < len(nonEllipsis) {
		return Result{
			IsMatch: false,
			Errors: []Error{{
				Path:     path,
				Expected: fmt.Sprintf("at least %d elements", len(nonEllipsis)),
				Actual:   fmt.Sprintf("%d elements", len(actual)),
				Message:  "insufficient elements for ellipsis pattern",
			}},
		}
	}

	// Greedily match each required element to an unused actual element.
	// hasOmittedFields propagates from the caller — an array-level "..." item
	// only allows extra elements in the array, it does not loosen field
	// matching on the listed elements themselves.
	used := make([]bool, len(actual))
	for i, expElem := range nonEllipsis {
		elemPath := fmt.Sprintf("%s[%d]", path, nonEllipsisIdx[i])
		matched := false
		for actIdx, actElem := range actual {
			if used[actIdx] {
				continue
			}
			res := compareValues(expElem, actElem, options, hasOmittedFields, elemPath)
			if res.IsMatch {
				used[actIdx] = true
				matched = true
				break
			}
		}
		if !matched {
			return Result{
				IsMatch: false,
				Errors: []Error{{
					Path:     elemPath,
					Expected: fmt.Sprintf("%#v", expElem),
					Actual:   fmt.Sprintf("%d element(s)", len(actual)),
					Message:  "expected element not found in actual array",
				}},
			}
		}
	}

	return Result{IsMatch: true}
}
