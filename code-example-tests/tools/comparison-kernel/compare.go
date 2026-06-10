package main

import (
	"fmt"
	"reflect"
	"strings"
)

// compareValues is the recursive comparison entry point. It dispatches to
// ellipsis handling, null checking, primitive comparison, array comparison,
// and object comparison in that order.
func compareValues(expected, actual interface{}, options *Options, hasOmittedFields bool, path string) Result {
	if result := handleEllipsisPatterns(expected, actual); result.handled {
		if !result.matches {
			return Result{
				IsMatch: false,
				Errors: []Error{{
					Path:     path,
					Expected: fmt.Sprintf("%v", expected),
					Actual:   fmt.Sprintf("%v", actual),
					Message:  "ellipsis pattern mismatch",
				}},
			}
		}
		return Result{IsMatch: true}
	}

	if expected == nil || actual == nil {
		if expected != actual {
			return Result{
				IsMatch: false,
				Errors: []Error{{
					Path:     path,
					Expected: fmt.Sprintf("%v", expected),
					Actual:   fmt.Sprintf("%v", actual),
					Message:  "null/undefined mismatch",
				}},
			}
		}
		return Result{IsMatch: true}
	}

	expectedVal := reflect.ValueOf(expected)
	actualVal := reflect.ValueOf(actual)

	// Primitives (neither is a slice or map)
	if expectedVal.Kind() != reflect.Slice && expectedVal.Kind() != reflect.Map &&
		actualVal.Kind() != reflect.Slice && actualVal.Kind() != reflect.Map {
		return comparePrimitives(expected, actual, path)
	}

	// Arrays: both must be []interface{} (JSON arrays)
	if expectedVal.Kind() == reflect.Slice && actualVal.Kind() == reflect.Slice {
		expectedSlice, ok1 := expected.([]interface{})
		actualSlice, ok2 := actual.([]interface{})
		if !ok1 || !ok2 {
			return Result{IsMatch: false, Errors: []Error{{Path: path, Message: "internal: slice type assertion failed"}}}
		}
		return compareArrays(expectedSlice, actualSlice, options, hasOmittedFields, path)
	}

	// Type mismatch: one is array, other is object
	if (expectedVal.Kind() == reflect.Slice) != (actualVal.Kind() == reflect.Slice) {
		return Result{
			IsMatch: false,
			Errors: []Error{{
				Path:     path,
				Expected: fmt.Sprintf("type: %s", expectedVal.Kind()),
				Actual:   fmt.Sprintf("type: %s", actualVal.Kind()),
				Message:  "type mismatch between array and object",
			}},
		}
	}

	return compareObjects(expected, actual, options, hasOmittedFields, path)
}

func compareArrays(expected, actual []interface{}, options *Options, hasOmittedFields bool, path string) Result {
	if result := handleArrayLevelEllipsis(expected); result.handled {
		if result.requiresSpecialMatching {
			return matchArrayWithEllipsis(expected, actual, options, hasOmittedFields, path)
		}
		return Result{IsMatch: result.matches}
	}
	if options.ComparisonType == "ordered" {
		return compareArraysOrdered(expected, actual, options, hasOmittedFields, path)
	}
	return compareArraysByBacktracking(expected, actual, options, hasOmittedFields, path)
}

func compareArraysOrdered(expected, actual []interface{}, options *Options, hasOmittedFields bool, path string) Result {
	if len(expected) != len(actual) {
		return Result{
			IsMatch: false,
			Errors: []Error{{
				Path:     path,
				Expected: fmt.Sprintf("length: %d", len(expected)),
				Actual:   fmt.Sprintf("length: %d", len(actual)),
				Message:  "array length mismatch",
			}},
		}
	}
	var allErrors []Error
	for i := range expected {
		res := compareValues(expected[i], actual[i], options, hasOmittedFields, fmt.Sprintf("%s[%d]", path, i))
		if !res.IsMatch {
			allErrors = append(allErrors, res.Errors...)
		}
	}
	return Result{IsMatch: len(allErrors) == 0, Errors: allErrors}
}

func compareArraysByBacktracking(expected, actual []interface{}, options *Options, hasOmittedFields bool, path string) Result {
	if len(expected) != len(actual) {
		return Result{
			IsMatch: false,
			Errors: []Error{{
				Path:     path,
				Expected: fmt.Sprintf("length: %d", len(expected)),
				Actual:   fmt.Sprintf("length: %d", len(actual)),
				Message:  "array length mismatch",
			}},
		}
	}
	if len(expected) == 0 {
		return Result{IsMatch: true}
	}
	if isPrimitiveArray(expected) && isPrimitiveArray(actual) {
		return compareArraysByFrequency(expected, actual, path)
	}
	if findMatching(expected, actual, make([]bool, len(actual)), 0, options, hasOmittedFields, path) {
		return Result{IsMatch: true}
	}
	return analyzeUnorderedMismatch(expected, actual, options, hasOmittedFields, path)
}

func isPrimitiveArray(arr []interface{}) bool {
	for _, item := range arr {
		if item == nil {
			continue
		}
		switch v := item.(type) {
		case string:
			// Strings ending with "..." are ellipsis patterns that need
			// backtracking so that handleEllipsisPatterns() can evaluate them.
			if strings.HasSuffix(v, "...") {
				return false
			}
			continue
		case int, int32, int64, float32, float64, bool:
			continue
		default:
			return false
		}
	}
	return true
}

func compareArraysByFrequency(expected, actual []interface{}, path string) Result {
	expectedFreq := make(map[interface{}]int)
	actualFreq := make(map[interface{}]int)
	for _, item := range expected {
		expectedFreq[normalizePrimitive(item)]++
	}
	for _, item := range actual {
		actualFreq[normalizePrimitive(item)]++
	}
	for key, expCount := range expectedFreq {
		if actCount, ok := actualFreq[key]; !ok || actCount != expCount {
			return Result{IsMatch: false, Errors: []Error{{Path: path, Message: "element frequency mismatch in array"}}}
		}
	}
	for key, actCount := range actualFreq {
		if _, ok := expectedFreq[key]; !ok {
			return Result{IsMatch: false, Errors: []Error{{Path: path, Expected: "not present", Actual: fmt.Sprintf("frequency of %v: %d", key, actCount), Message: "unexpected element in actual array"}}}
		}
	}
	return Result{IsMatch: true}
}

func findMatching(expected, actual []interface{}, used []bool, idx int, options *Options, hasOmittedFields bool, path string) bool {
	if idx >= len(expected) {
		return true
	}
	for i := range actual {
		if !used[i] {
			res := compareValues(expected[idx], actual[i], options, hasOmittedFields, fmt.Sprintf("%s[%d]", path, idx))
			if res.IsMatch {
				used[i] = true
				if findMatching(expected, actual, used, idx+1, options, hasOmittedFields, path) {
					return true
				}
				used[i] = false
			}
		}
	}
	return false
}

func compareObjects(expected, actual interface{}, options *Options, hasOmittedFields bool, path string) Result {
	expectedMap, ok1 := expected.(map[string]interface{})
	actualMap, ok2 := actual.(map[string]interface{})
	if !ok1 || !ok2 {
		return Result{IsMatch: false, Errors: []Error{{Path: path, Message: "expected objects, got non-object types"}}}
	}

	globalEllipsis := false
	if val, exists := expectedMap["..."]; exists {
		if valStr, ok := val.(string); ok && valStr == "..." {
			globalEllipsis = true
			hasOmittedFields = true
		}
	}

	var allErrors []Error
	for key, expectedVal := range expectedMap {
		if shouldIgnoreKey(key, options) {
			continue
		}
		keyPath := path
		if keyPath != "" {
			keyPath += "."
		}
		keyPath += key

		actualVal, exists := actualMap[key]
		if !exists {
			// A property-level "..." value means "this key is optional;
			// match any value if present, including absent". This matches
			// the documented contract (`"..."` matches any value for a key)
			// and the legacy per-language engines callers were written
			// against before the kernel migration.
			if expectedStr, ok := expectedVal.(string); ok && expectedStr == "..." {
				continue
			}
			if !hasOmittedFields {
				allErrors = append(allErrors, Error{
					Path:     keyPath,
					Expected: fmt.Sprintf("%#v", expectedVal),
					Actual:   "<missing>",
					Message:  "missing key in actual object",
				})
			}
			continue
		}
		res := compareValues(expectedVal, actualVal, options, hasOmittedFields, keyPath)
		if !res.IsMatch {
			allErrors = append(allErrors, res.Errors...)
		}
	}

	if !hasOmittedFields && !globalEllipsis {
		for key := range actualMap {
			if _, exists := expectedMap[key]; !exists && !shouldIgnoreKey(key, options) {
				keyPath := path
				if keyPath != "" {
					keyPath += "."
				}
				keyPath += key
				allErrors = append(allErrors, Error{Path: keyPath, Message: "unexpected key in actual object"})
			}
		}
	}
	return Result{IsMatch: len(allErrors) == 0, Errors: allErrors}
}

func shouldIgnoreKey(key string, options *Options) bool {
	if key == "..." {
		return true
	}
	if options != nil {
		for _, ignored := range options.IgnoreFieldValues {
			if key == ignored {
				return true
			}
		}
	}
	return false
}

func comparePrimitives(expected, actual interface{}, path string) Result {
	ne := normalizePrimitive(expected)
	na := normalizePrimitive(actual)
	if ne != na {
		return Result{
			IsMatch: false,
			Errors: []Error{{
				Path:     path,
				Expected: fmt.Sprintf("%v", ne),
				Actual:   fmt.Sprintf("%v", na),
				Message:  "primitive value mismatch",
			}},
		}
	}
	return Result{IsMatch: true}
}

func analyzeUnorderedMismatch(expected, actual []interface{}, options *Options, hasOmittedFields bool, path string) Result {
	type matchResult struct {
		expectedIdx int
		actualIdx   int
		result      Result
		errorCount  int
	}
	var allMatches []matchResult
	usedActual := make(map[int]bool)
	for expIdx, expDoc := range expected {
		var bestMatch *matchResult
		for actIdx, actDoc := range actual {
			// Skip actuals already claimed by an earlier expected as a perfect
			// match, so the failure report doesn't double-attribute one actual
			// document to multiple expecteds (e.g. when two expected docs are
			// identical and both would otherwise greedily claim actual[0]).
			if usedActual[actIdx] {
				continue
			}
			elemPath := fmt.Sprintf("%s[%d]", path, expIdx)
			res := compareValues(expDoc, actDoc, options, hasOmittedFields, elemPath)
			m := matchResult{expectedIdx: expIdx, actualIdx: actIdx, result: res, errorCount: len(res.Errors)}
			if res.IsMatch {
				bestMatch = &m
				usedActual[actIdx] = true
				break
			}
			if bestMatch == nil || m.errorCount < bestMatch.errorCount {
				bestMatch = &m
			}
		}
		if bestMatch != nil {
			allMatches = append(allMatches, *bestMatch)
		}
	}
	perfectMatches := 0
	for _, m := range allMatches {
		if m.result.IsMatch {
			perfectMatches++
		}
	}
	var allErrors []Error
	failedCount := len(expected) - perfectMatches
	if failedCount == len(expected) {
		allErrors = append(allErrors, Error{Path: path, Message: fmt.Sprintf("no matching arrangement found for %d documents in unordered comparison", len(expected))})
	} else {
		allErrors = append(allErrors, Error{Path: path, Message: fmt.Sprintf("no matching arrangement found: %d of %d documents don't match in any arrangement", failedCount, len(expected))})
	}
	for _, m := range allMatches {
		if m.result.IsMatch {
			allErrors = append(allErrors, Error{Path: fmt.Sprintf("%s[%d]", path, m.expectedIdx), Message: fmt.Sprintf("matches actual[%d] ✓", m.actualIdx)})
		} else {
			errWord := "mismatch"
			if m.errorCount != 1 {
				errWord = "mismatches"
			}
			allErrors = append(allErrors, Error{Path: fmt.Sprintf("%s[%d]", path, m.expectedIdx), Message: fmt.Sprintf("closest to actual[%d] (%d %s):", m.actualIdx, m.errorCount, errWord)})
			maxShow := 10
			for i, e := range m.result.Errors {
				if i >= maxShow {
					allErrors = append(allErrors, Error{Path: fmt.Sprintf("%s[%d]", path, m.expectedIdx), Message: fmt.Sprintf("... and %d more differences", len(m.result.Errors)-maxShow)})
					break
				}
				allErrors = append(allErrors, e)
			}
		}
	}
	return Result{IsMatch: false, Errors: allErrors}
}
