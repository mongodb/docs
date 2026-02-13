package compare

import (
	"fmt"
	"reflect"
	"strings"

	"go.mongodb.org/mongo-driver/v2/bson"
)

// ContentType represents the type of content being compared
type ContentType int

const (
	FileContent ContentType = iota
	PatternString
	TextBlock
	StructuredString
	PlainString
	ArrayContent
	ObjectContent
	PrimitiveContent
	BSONDContent
)

// detectContentType analyzes a value and determines its content type
func detectContentType(value interface{}) ContentType {
	if value == nil {
		return PrimitiveContent
	}

	switch v := value.(type) {
	case string:
		return detectStringContentType(v)
	case []interface{}, bson.A:
		return ArrayContent
	case map[string]interface{}, bson.M:
		return ObjectContent
	case bson.D:
		return BSONDContent
	default:
		// Use reflection to detect slice types (like []bson.D or struct slices)
		val := reflect.ValueOf(value)
		if val.Kind() == reflect.Slice {
			return ArrayContent
		}
		if val.Kind() == reflect.Map {
			return ObjectContent
		}
		if val.Kind() == reflect.Struct {
			return ObjectContent
		}
		return PrimitiveContent
	}
}

// detectStringContentType analyzes a string and determines its content type
func detectStringContentType(s string) ContentType {
	// Check if it's a file path
	if isFilePath(s) {
		return FileContent
	}

	// Check for ellipsis patterns
	if strings.Contains(s, "...") {
		return PatternString
	}

	// Check for multiline text
	if strings.Contains(s, "\n") {
		return TextBlock
	}

	// Check if it looks like JSON/structured data
	if looksLikeJSON(s) {
		return StructuredString
	}

	return PlainString
}

// isFilePath checks if a string is a valid file path
func isFilePath(s string) bool {
	// Empty strings or whitespace-only strings are not file paths
	if len(strings.TrimSpace(s)) == 0 {
		return false
	}

	// Use the shared resolveFilePath utility to check if the path can be resolved
	_, err := resolveFilePath(s)
	return err == nil
}

// looksLikeJSON checks if a string appears to be JSON
func looksLikeJSON(s string) bool {
	s = strings.TrimSpace(s)
	return (strings.HasPrefix(s, "{") && strings.HasSuffix(s, "}")) ||
		(strings.HasPrefix(s, "[") && strings.HasSuffix(s, "]"))
}

// comparisonStrategy represents a strategy for comparing two values
type comparisonStrategy interface {
	execute(expected, actual interface{}, options *Options) Result
}

// fileComparisonStrategy handles file-based comparisons
type fileComparisonStrategy struct{}

func (s *fileComparisonStrategy) execute(expected, actual interface{}, options *Options) Result {
	expectedFilePath := expected.(string)
	return compareDocumentsGeneric(expectedFilePath, actual, options)
}

// objectComparisonStrategy handles direct object comparisons
type objectComparisonStrategy struct{}

func (s *objectComparisonStrategy) execute(expected, actual interface{}, options *Options) Result {
	// Convert both to normalized format
	expectedNormalized, err := convertToNormalizedSlice(expected)
	if err != nil {
		return Result{
			IsMatch: false,
			Errors: []Error{{
				Path:    "conversion",
				Message: "Failed to normalize expected value: " + err.Error(),
			}},
		}
	}

	actualNormalized, err := convertToNormalizedSlice(actual)
	if err != nil {
		return Result{
			IsMatch: false,
			Errors: []Error{{
				Path:    "conversion",
				Message: "Failed to normalize actual value: " + err.Error(),
			}},
		}
	}

	// If both are single values (not arrays), wrap them
	if len(expectedNormalized) == 1 && len(actualNormalized) == 1 {
		return compareValues(expectedNormalized[0], actualNormalized[0], options, false, "")
	}

	// Compare as arrays of documents
	if len(expectedNormalized) != len(actualNormalized) {
		return Result{
			IsMatch: false,
			Errors: []Error{{
				Path:     "",
				Expected: fmt.Sprintf("%d document(s)", len(expectedNormalized)),
				Actual:   fmt.Sprintf("%d document(s)", len(actualNormalized)),
				Message:  fmt.Sprintf("document count mismatch: expected %d document(s) but got %d. Check that your expected output has the same number of documents as your actual results.", len(expectedNormalized), len(actualNormalized)),
			}},
		}
	}

	// Determine comparison strategy
	if options.ComparisonType == "ordered" {
		var allErrors []Error
		for i := 0; i < len(expectedNormalized); i++ {
			docPath := "[" + string(rune('0'+i)) + "]"
			result := compareValues(expectedNormalized[i], actualNormalized[i], options, false, docPath)
			if !result.IsMatch {
				allErrors = append(allErrors, result.Errors...)
			}
		}
		return Result{
			IsMatch: len(allErrors) == 0,
			Errors:  allErrors,
		}
	}

	// Use unordered comparison
	return compareArraysByBacktracking(expectedNormalized, actualNormalized, options, false, "")
}

// patternComparisonStrategy handles pattern-based comparisons (e.g., with ellipsis)
type patternComparisonStrategy struct{}

func (s *patternComparisonStrategy) execute(expected, actual interface{}, options *Options) Result {
	// For now, delegate to object comparison strategy which already handles ellipsis
	objStrategy := &objectComparisonStrategy{}
	return objStrategy.execute(expected, actual, options)
}

// selectComparisonStrategy selects the appropriate comparison strategy based on content types
func selectComparisonStrategy(expectedType, actualType ContentType, options *Options) comparisonStrategy {
	// If expected is a file, use file comparison strategy
	if expectedType == FileContent {
		return &fileComparisonStrategy{}
	}

	// If expected contains patterns (ellipsis), use pattern strategy
	if expectedType == PatternString {
		return &patternComparisonStrategy{}
	}

	// For all other cases, use object comparison strategy
	return &objectComparisonStrategy{}
}

// convertToNormalizedSlice converts a value to a normalized slice for comparison
func convertToNormalizedSlice(value interface{}) ([]interface{}, error) {
	if value == nil {
		return []interface{}{}, nil
	}

	// Check for BSON types FIRST before checking for slices
	// (bson.D is technically a slice type, so we need to handle it explicitly)
	switch val := value.(type) {
	case bson.D:
		normalized := normalizeValue(bsonDToMap(val))
		return []interface{}{normalized}, nil
	case bson.M, map[string]interface{}:
		normalized := normalizeValue(val)
		return []interface{}{normalized}, nil
	}

	v := reflect.ValueOf(value)

	// Handle slices (but only after we've ruled out bson.D)
	if v.Kind() == reflect.Slice {
		return convertActualResults(value)
	}

	// Handle other single values - wrap in slice
	if v.Kind() == reflect.Struct {
		normalized := normalizeValue(structToMap(value))
		return []interface{}{normalized}, nil
	}

	// For primitives
	return []interface{}{value}, nil
}
