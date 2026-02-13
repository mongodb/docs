package compare

import (
	"fmt"
	"reflect"

	"go.mongodb.org/mongo-driver/v2/bson"
)

// compareDocumentsGeneric is the internal function that handles both BSON.D slices and struct slices
func compareDocumentsGeneric(expectedFilePath string, actualResults interface{}, options *Options) Result {
	if options == nil {
		options = &Options{}
	}

	// Resolve the file path using the shared utility
	finalPath, err := resolveFilePath(expectedFilePath)
	if err != nil {
		return Result{
			IsMatch: false,
			Errors: []Error{{
				Path:    "file",
				Message: fmt.Sprintf("Failed to read expected output: %v", err),
			}},
		}
	}

	// Read and parse expected output
	expectedDocs, err := readExpectedOutput(finalPath)
	if err != nil {
		return Result{
			IsMatch: false,
			Errors: []Error{{
				Path:    "file",
				Message: fmt.Sprintf("Failed to read expected output: %v", err),
			}},
		}
	}

	// Convert actual results to normalized format based on type
	actualNormalized, err := convertActualResults(actualResults)
	if err != nil {
		return Result{
			IsMatch: false,
			Errors: []Error{{
				Path:    "conversion",
				Message: fmt.Sprintf("Failed to convert actual results: %v", err),
			}},
		}
	}

	// Compare the document arrays
	if len(expectedDocs) != len(actualNormalized) {
		return Result{
			IsMatch: false,
			Errors: []Error{{
				Path:     "",
				Expected: fmt.Sprintf("%d document(s)", len(expectedDocs)),
				Actual:   fmt.Sprintf("%d document(s)", len(actualNormalized)),
				Message:  fmt.Sprintf("document count mismatch: expected %d document(s) but got %d. Check that your expected output has the same number of documents as your actual results.", len(expectedDocs), len(actualNormalized)),
			}},
		}
	}

	// Check if we should compare documents in order or allow unordered comparison
	if options.ComparisonType == "ordered" {
		// Compare each document pair in order
		var allErrors []Error
		for i := 0; i < len(expectedDocs); i++ {
			docPath := fmt.Sprintf("[%d]", i)
			result := compareValues(expectedDocs[i], actualNormalized[i], options, false, docPath)
			if !result.IsMatch {
				allErrors = append(allErrors, result.Errors...)
			}
		}

		return Result{
			IsMatch: len(allErrors) == 0,
			Errors:  allErrors,
		}
	}

	// Default to unordered comparison for document arrays
	// Convert documents to interface{} slices for unordered comparison
	expectedInterfaces := make([]interface{}, len(expectedDocs))
	actualInterfaces := make([]interface{}, len(actualNormalized))

	for i, doc := range expectedDocs {
		expectedInterfaces[i] = doc
	}
	for i, doc := range actualNormalized {
		actualInterfaces[i] = doc
	}

	// Use the same unordered comparison logic as arrays
	return compareArraysByBacktracking(expectedInterfaces, actualInterfaces, options, false, "")
}

// compareValues is the main compare function
func compareValues(expected, actual interface{}, options *Options, hasOmittedFields bool, path string) Result {
	// Handle ellipsis patterns first
	if result := handleEllipsisPatterns(expected, actual); result.handled {
		if !result.matches {
			// Ellipsis pattern didn't match, create error
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

	// Handle null/undefined cases
	if expected == nil || actual == nil {
		isMatch := expected == actual
		if !isMatch {
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

	// Handle primitive types (non-objects)
	expectedVal := reflect.ValueOf(expected)
	actualVal := reflect.ValueOf(actual)

	if expectedVal.Kind() != reflect.Slice && expectedVal.Kind() != reflect.Map &&
		actualVal.Kind() != reflect.Slice && actualVal.Kind() != reflect.Map {
		return comparePrimitives(expected, actual, path)
	}

	// Handle arrays (support both []interface{} and bson.A)
	if expectedVal.Kind() == reflect.Slice && actualVal.Kind() == reflect.Slice {
		var expectedSlice, actualSlice []interface{}

		switch e := expected.(type) {
		case []interface{}:
			expectedSlice = e
		case bson.A:
			expectedSlice = []interface{}(e)
		default:
			return Result{
				IsMatch: false,
				Errors: []Error{{
					Path:    path,
					Message: "expected value is not a slice",
				}},
			}
		}

		switch a := actual.(type) {
		case []interface{}:
			actualSlice = a
		case bson.A:
			actualSlice = []interface{}(a)
		default:
			return Result{
				IsMatch: false,
				Errors: []Error{{
					Path:    path,
					Message: "actual value is not a slice",
				}},
			}
		}

		return compareArrays(expectedSlice, actualSlice, options, hasOmittedFields, path)
	}

	// Handle type mismatches (one array, one object)
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

	// Handle objects
	return compareObjects(expected, actual, options, hasOmittedFields, path)
}

// compareArrays compares two arrays based on the compare strategy
func compareArrays(expected, actual []interface{}, options *Options, hasOmittedFields bool, path string) Result {
	// Handle array-level ellipsis patterns
	if result := handleArrayLevelEllipsis(expected); result.handled {
		if result.requiresSpecialMatching {
			return matchArrayWithEllipsis(expected, actual, path)
		}
		return Result{IsMatch: result.matches}
	}

	// Determine compare strategy
	if options.ComparisonType == "ordered" {
		return compareArraysOrdered(expected, actual, options, hasOmittedFields, path)
	}

	// Default to unordered compare for MongoDB results
	return compareArraysByBacktracking(expected, actual, options, hasOmittedFields, path)
}

// arrayEllipsisResult represents the result of array-level ellipsis handling
type arrayEllipsisResult struct {
	handled                 bool
	matches                 bool
	requiresSpecialMatching bool
}

// compareArraysOrdered compares arrays in order
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
	for i := 0; i < len(expected); i++ {
		elemPath := fmt.Sprintf("%s[%d]", path, i)
		result := compareValues(expected[i], actual[i], options, hasOmittedFields, elemPath)
		if !result.IsMatch {
			allErrors = append(allErrors, result.Errors...)
		}
	}

	return Result{
		IsMatch: len(allErrors) == 0,
		Errors:  allErrors,
	}
}

// compareArraysByBacktracking uses backtracking to find matches in unordered arrays
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

	// For empty arrays, they match
	if len(expected) == 0 && len(actual) == 0 {
		return Result{IsMatch: true}
	}

	// For primitive arrays, use simple frequency-based compare
	if len(expected) > 0 && len(actual) > 0 {
		if isPrimitiveArray(expected) && isPrimitiveArray(actual) {
			return compareArraysByFrequency(expected, actual, path)
		}
	}

	// For complex arrays or mixed types, use backtracking
	if findMatching(expected, actual, make([]bool, len(actual)), 0, options, hasOmittedFields, path) {
		return Result{IsMatch: true}
	}

	// Backtracking failed - provide detailed error analysis
	return analyzeUnorderedMismatch(expected, actual, options, hasOmittedFields, path)
}

// isPrimitiveArray checks if all elements in the array are primitive types
func isPrimitiveArray(arr []interface{}) bool {
	for _, item := range arr {
		if item == nil {
			continue
		}
		switch item.(type) {
		case string, int, int32, int64, float32, float64, bool:
			continue
		default:
			return false
		}
	}
	return true
}

// compareArraysByFrequency compares arrays by counting element frequencies
func compareArraysByFrequency(expected, actual []interface{}, path string) Result {
	expectedFreq := make(map[interface{}]int)
	actualFreq := make(map[interface{}]int)

	// Count frequencies in expected array
	for _, item := range expected {
		normalized := normalizePrimitive(item)
		expectedFreq[normalized]++
	}

	// Count frequencies in actual array
	for _, item := range actual {
		normalized := normalizePrimitive(item)
		actualFreq[normalized]++
	}

	// Compare frequencies
	for key, expectedCount := range expectedFreq {
		if actualCount, exists := actualFreq[key]; !exists || actualCount != expectedCount {
			return Result{
				IsMatch: false,
				Errors: []Error{{
					Path:     path,
					Expected: fmt.Sprintf("frequency of %v: %d", key, expectedCount),
					Actual:   fmt.Sprintf("frequency of %v: %d", key, actualFreq[key]),
					Message:  "element frequency mismatch in array",
				}},
			}
		}
	}

	// Check for extra elements in actual
	for key, actualCount := range actualFreq {
		if _, exists := expectedFreq[key]; !exists {
			return Result{
				IsMatch: false,
				Errors: []Error{{
					Path:     path,
					Expected: "not present",
					Actual:   fmt.Sprintf("frequency of %v: %d", key, actualCount),
					Message:  "unexpected element in actual array",
				}},
			}
		}
	}

	return Result{IsMatch: true}
}

// findMatching recursively finds a matching arrangement using backtracking
func findMatching(expected, actual []interface{}, used []bool, expectedIndex int, options *Options, hasOmittedFields bool, path string) bool {
	if expectedIndex >= len(expected) {
		return true
	}

	for i := 0; i < len(actual); i++ {
		if !used[i] {
			elemPath := fmt.Sprintf("%s[%d]", path, expectedIndex)
			result := compareValues(expected[expectedIndex], actual[i], options, hasOmittedFields, elemPath)
			if result.IsMatch {
				used[i] = true
				if findMatching(expected, actual, used, expectedIndex+1, options, hasOmittedFields, path) {
					return true
				}
				used[i] = false
			}
		}
	}

	return false
}

// compareObjects compares two objects
func compareObjects(expected, actual interface{}, options *Options, hasOmittedFields bool, path string) Result {
	expectedMap, ok1 := expected.(map[string]interface{})
	actualMap, ok2 := actual.(map[string]interface{})

	if !ok1 || !ok2 {
		return Result{
			IsMatch: false,
			Errors: []Error{{
				Path:    path,
				Message: "expected objects, got non-object types",
			}},
		}
	}

	// Check for global ellipsis
	globalEllipsis := false
	if _, exists := expectedMap["..."]; exists {
		if val, ok := expectedMap["..."].(string); ok && val == "..." {
			globalEllipsis = true
			hasOmittedFields = true
		}
	}

	var allErrors []Error

	// Check all expected keys exist in actual (unless ignored)
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

		// Compare values
		result := compareValues(expectedVal, actualVal, options, hasOmittedFields, keyPath)
		if !result.IsMatch {
			allErrors = append(allErrors, result.Errors...)
		}
	}

	// Check for extra keys in actual (unless in omitted fields mode)
	if !hasOmittedFields && !globalEllipsis {
		for key := range actualMap {
			if _, exists := expectedMap[key]; !exists && !shouldIgnoreKey(key, options) {
				keyPath := path
				if keyPath != "" {
					keyPath += "."
				}
				keyPath += key

				allErrors = append(allErrors, Error{
					Path:    keyPath,
					Message: "unexpected key in actual object",
				})
			}
		}
	}

	return Result{
		IsMatch: len(allErrors) == 0,
		Errors:  allErrors,
	}
}

// shouldIgnoreKey determines if a key should be ignored during compare
func shouldIgnoreKey(key string, options *Options) bool {
	if key == "..." {
		return true
	}
	if options != nil && options.IgnoreFieldValues != nil {
		for _, ignoredField := range options.IgnoreFieldValues {
			if key == ignoredField {
				return true
			}
		}
	}
	return false
}

// comparePrimitives compares primitive values
func comparePrimitives(expected, actual interface{}, path string) Result {
	normalizedExpected := normalizePrimitive(expected)
	normalizedActual := normalizePrimitive(actual)

	isMatch := normalizedExpected == normalizedActual
	if !isMatch {
		return Result{
			IsMatch: false,
			Errors: []Error{{
				Path:     path,
				Expected: fmt.Sprintf("%v", normalizedExpected),
				Actual:   fmt.Sprintf("%v", normalizedActual),
				Message:  "primitive value mismatch",
			}},
		}
	}

	return Result{IsMatch: true}
}

// analyzeUnorderedMismatch provides detailed error analysis when unordered comparison fails
// We try all pairings and report best matches
func analyzeUnorderedMismatch(expected, actual []interface{}, options *Options, hasOmittedFields bool, path string) Result {
	// Try to match each expected document with all actual documents
	type matchResult struct {
		expectedIdx int
		actualIdx   int
		result      Result
		errorCount  int
	}

	var allMatches []matchResult
	usedActual := make(map[int]bool)

	// For each expected document, find its best match in actual
	for expIdx, expDoc := range expected {
		var bestMatch *matchResult

		for actIdx, actDoc := range actual {
			elemPath := fmt.Sprintf("%s[%d]", path, expIdx)
			result := compareValues(expDoc, actDoc, options, hasOmittedFields, elemPath)

			match := matchResult{
				expectedIdx: expIdx,
				actualIdx:   actIdx,
				result:      result,
				errorCount:  len(result.Errors),
			}

			// Perfect match - use this and mark actual as used
			if result.IsMatch {
				bestMatch = &match
				usedActual[actIdx] = true
				break
			}

			// Track best (fewest errors) non-perfect match
			if bestMatch == nil || match.errorCount < bestMatch.errorCount {
				bestMatch = &match
			}
		}

		if bestMatch != nil {
			allMatches = append(allMatches, *bestMatch)
		}
	}

	// Count how many perfect matches we found
	perfectMatches := 0
	for _, match := range allMatches {
		if match.result.IsMatch {
			perfectMatches++
		}
	}

	// Build comprehensive error message
	var allErrors []Error

	// Add summary header
	failedCount := len(expected) - perfectMatches
	if failedCount == len(expected) {
		allErrors = append(allErrors, Error{
			Path:    path,
			Message: fmt.Sprintf("no matching arrangement found for %d documents in unordered comparison", len(expected)),
		})
	} else {
		allErrors = append(allErrors, Error{
			Path:    path,
			Message: fmt.Sprintf("no matching arrangement found: %d of %d documents don't match in any arrangement", failedCount, len(expected)),
		})
	}

	// Add detailed analysis for each expected document
	for _, match := range allMatches {
		if match.result.IsMatch {
			// Document matched perfectly - show success marker
			allErrors = append(allErrors, Error{
				Path:    fmt.Sprintf("%s[%d]", path, match.expectedIdx),
				Message: fmt.Sprintf("matches actual[%d] ✓", match.actualIdx),
			})
		} else {
			// Document didn't match - show closest match and differences
			errorCountMsg := fmt.Sprintf("%d mismatch", match.errorCount)
			if match.errorCount != 1 {
				errorCountMsg += "es"
			}

			allErrors = append(allErrors, Error{
				Path:    fmt.Sprintf("%s[%d]", path, match.expectedIdx),
				Message: fmt.Sprintf("closest to actual[%d] (%s):", match.actualIdx, errorCountMsg),
			})

			// Add the field-level errors, limiting to first 10 to avoid overwhelming output
			maxErrors := 10
			for i, err := range match.result.Errors {
				if i >= maxErrors {
					remaining := len(match.result.Errors) - maxErrors
					allErrors = append(allErrors, Error{
						Path:    fmt.Sprintf("%s[%d]", path, match.expectedIdx),
						Message: fmt.Sprintf("... and %d more differences", remaining),
					})
					break
				}
				allErrors = append(allErrors, err)
			}
		}
	}

	return Result{
		IsMatch: false,
		Errors:  allErrors,
	}
}
