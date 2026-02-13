package compare

import (
	"encoding/json"
	"fmt"
	"reflect"
	"strconv"
	"strings"
)

// PathPart represents a single part of a field path - either a field name or an array index.
type PathPart struct {
	FieldName    string
	ArrayIndex   int
	IsArrayIndex bool
}

// NewFieldNamePart creates a PathPart for a field name.
func NewFieldNamePart(fieldName string) PathPart {
	return PathPart{
		FieldName:    fieldName,
		ArrayIndex:   -1,
		IsArrayIndex: false,
	}
}

// NewArrayIndexPart creates a PathPart for an array index.
func NewArrayIndexPart(index int) PathPart {
	return PathPart{
		FieldName:    "",
		ArrayIndex:   index,
		IsArrayIndex: true,
	}
}

// ParseFieldPath parses a field path into individual parts, handling both dot notation and array indexing.
// For example, "stages[0].$cursor.queryPlanner" becomes:
// [FieldName("stages"), ArrayIndex(0), FieldName("$cursor"), FieldName("queryPlanner")]
func ParseFieldPath(fieldPath string) []PathPart {
	var parts []PathPart
	segments := strings.Split(fieldPath, ".")

	for _, segment := range segments {
		// Check if segment contains array indexing like "stages[0]" or "items[2]"
		bracketIndex := strings.Index(segment, "[")
		if bracketIndex >= 0 {
			// Extract field name before the bracket (if any)
			if bracketIndex > 0 {
				fieldName := segment[:bracketIndex]
				parts = append(parts, NewFieldNamePart(fieldName))
			}

			// Extract all array indices from the segment (handles cases like "arr[0][1]")
			remaining := segment[bracketIndex:]
			for len(remaining) > 0 && strings.HasPrefix(remaining, "[") {
				closeBracket := strings.Index(remaining, "]")
				if closeBracket < 0 {
					break
				}

				indexStr := remaining[1:closeBracket]
				if arrayIndex, err := strconv.Atoi(indexStr); err == nil {
					parts = append(parts, NewArrayIndexPart(arrayIndex))
				}

				remaining = remaining[closeBracket+1:]
			}
		} else {
			// Simple field name
			parts = append(parts, NewFieldNamePart(segment))
		}
	}

	return parts
}

// TryGetNestedValue attempts to get a value from a nested structure using dot notation and array indexing.
// Supports paths like "queryPlanner.winningPlan.stage" and "stages[0].$cursor.queryPlanner.winningPlan.stage".
// Returns the value and true if the path exists, nil and false otherwise.
func TryGetNestedValue(doc map[string]interface{}, fieldPath string) (interface{}, bool) {
	pathParts := ParseFieldPath(fieldPath)
	var current interface{} = doc

	for _, part := range pathParts {
		if current == nil {
			return nil, false
		}

		// Normalize the current value to handle various types
		normalizedCurrent := normalizeValue(current)

		if part.IsArrayIndex {
			// Handle array indexing
			switch arr := normalizedCurrent.(type) {
			case []interface{}:
				if part.ArrayIndex < 0 || part.ArrayIndex >= len(arr) {
					return nil, false
				}
				current = arr[part.ArrayIndex]
			case []map[string]interface{}:
				if part.ArrayIndex < 0 || part.ArrayIndex >= len(arr) {
					return nil, false
				}
				current = arr[part.ArrayIndex]
			default:
				// Check if it's a slice using reflection
				v := reflect.ValueOf(normalizedCurrent)
				if v.Kind() == reflect.Slice {
					if part.ArrayIndex < 0 || part.ArrayIndex >= v.Len() {
						return nil, false
					}
					current = v.Index(part.ArrayIndex).Interface()
				} else {
					// Not an array/slice, can't index
					return nil, false
				}
			}
		} else {
			// Handle dictionary key access
			switch m := normalizedCurrent.(type) {
			case map[string]interface{}:
				val, exists := m[part.FieldName]
				if !exists {
					return nil, false
				}
				current = val
			default:
				// Try reflection for other map types
				v := reflect.ValueOf(normalizedCurrent)
				if v.Kind() == reflect.Map {
					keyVal := v.MapIndex(reflect.ValueOf(part.FieldName))
					if !keyVal.IsValid() {
						return nil, false
					}
					current = keyVal.Interface()
				} else {
					// Current value is not a map, can't navigate further
					return nil, false
				}
			}
		}
	}

	return current, true
}

// hasNestedPath checks if a field path contains dot notation or array indexing.
func hasNestedPath(fieldPath string) bool {
	return strings.Contains(fieldPath, ".") || strings.Contains(fieldPath, "[")
}

// validateWithSchema validates that both expected and actual outputs match the given schema.
// It checks:
// 1. Document count matches Schema.Count
// 2. All required fields are present in every document (if specified)
// 3. All field values match the specified values in every document (if specified)
func validateWithSchema(expected, actual interface{}, schema *Schema) Result {
	var allErrors []Error

	// Convert expected and actual to normalized document slices
	expectedDocs, err := normalizeToDocuments(expected)
	if err != nil {
		return Result{
			IsMatch: false,
			Errors: []Error{{
				Path:    "expected",
				Message: fmt.Sprintf("failed to normalize expected output: %v", err),
			}},
		}
	}

	actualDocs, err := normalizeToDocuments(actual)
	if err != nil {
		return Result{
			IsMatch: false,
			Errors: []Error{{
				Path:    "actual",
				Message: fmt.Sprintf("failed to normalize actual output: %v", err),
			}},
		}
	}

	// Validate count - always check (count is required)
	if len(expectedDocs) != schema.Count {
		allErrors = append(allErrors, Error{
			Path:     "expected output",
			Expected: fmt.Sprintf("%d", schema.Count),
			Actual:   fmt.Sprintf("%d", len(expectedDocs)),
			Message:  fmt.Sprintf("Expected %d documents but got %d", schema.Count, len(expectedDocs)),
		})
	}
	if len(actualDocs) != schema.Count {
		allErrors = append(allErrors, Error{
			Path:     "actual output",
			Expected: fmt.Sprintf("%d", schema.Count),
			Actual:   fmt.Sprintf("%d", len(actualDocs)),
			Message:  fmt.Sprintf("Expected %d documents but got %d", schema.Count, len(actualDocs)),
		})
	}

	// Validate expected documents match schema
	expectedErrors := validateDocumentsAgainstSchema(expectedDocs, schema, "expected")
	allErrors = append(allErrors, expectedErrors...)

	// Validate actual documents match schema
	actualErrors := validateDocumentsAgainstSchema(actualDocs, schema, "actual")
	allErrors = append(allErrors, actualErrors...)

	return Result{
		IsMatch: len(allErrors) == 0,
		Errors:  allErrors,
	}
}

// validateDocumentsAgainstSchema validates that all documents match the schema requirements.
// Only validates nested fields when dot notation or array indexing is used in field paths.
func validateDocumentsAgainstSchema(docs []map[string]interface{}, schema *Schema, source string) []Error {
	var errors []Error

	for i, doc := range docs {
		docPath := fmt.Sprintf("%s[%d]", source, i)

		// Check required fields
		for _, field := range schema.RequiredFields {
			// Only use nested path navigation if dot notation or array indexing is used
			if hasNestedPath(field) {
				if _, exists := TryGetNestedValue(doc, field); !exists {
					errors = append(errors, Error{
						Path:    docPath,
						Message: fmt.Sprintf("Missing required field %q", field),
					})
				}
			} else {
				if _, exists := doc[field]; !exists {
					errors = append(errors, Error{
						Path:    docPath,
						Message: fmt.Sprintf("Missing required field %q", field),
					})
				}
			}
		}

		// Check field values
		for field, expectedValue := range schema.FieldValues {
			var actualValue interface{}
			var exists bool

			// Only use nested path navigation if dot notation or array indexing is used
			if hasNestedPath(field) {
				actualValue, exists = TryGetNestedValue(doc, field)
				if !exists {
					errors = append(errors, Error{
						Path:    docPath,
						Message: fmt.Sprintf("Missing field %q which is required by fieldValues", field),
					})
					continue
				}
			} else {
				actualValue, exists = doc[field]
				if !exists {
					errors = append(errors, Error{
						Path:    docPath,
						Message: fmt.Sprintf("Missing field %q", field),
					})
					continue
				}
			}

			// Normalize values for comparison
			normalizedExpected := normalizeValue(expectedValue)
			normalizedActual := normalizeValue(actualValue)

			if !valuesEqual(normalizedExpected, normalizedActual) {
				errors = append(errors, Error{
					Path:     fmt.Sprintf("%s.%s", docPath, field),
					Expected: fmt.Sprintf("%v", normalizedExpected),
					Actual:   fmt.Sprintf("%v", normalizedActual),
					Message:  fmt.Sprintf("Field %q has value %v but expected %v", field, normalizedActual, normalizedExpected),
				})
			}
		}
	}

	return errors
}

// normalizeToDocuments converts various input types to a slice of document maps.
func normalizeToDocuments(input interface{}) ([]map[string]interface{}, error) {
	if input == nil {
		return nil, fmt.Errorf("input is nil")
	}

	// Handle string inputs (file paths or JSON strings)
	if strInput, ok := input.(string); ok {
		return normalizeStringToDocuments(strInput)
	}

	// Handle slice inputs using reflection
	return normalizeSliceToDocuments(input)
}

// normalizeStringToDocuments handles string inputs (file paths or JSON content).
func normalizeStringToDocuments(input string) ([]map[string]interface{}, error) {
	// Check if it's a file path
	contentType := detectContentType(input)
	if contentType == FileContent {
		// Read the file and parse its content
		docs, err := readExpectedOutput(input)
		if err != nil {
			return nil, fmt.Errorf("failed to read file: %v", err)
		}
		return convertToDocMaps(docs)
	}

	// Try to parse as JSON string
	return parseJSONToDocMaps(input)
}

// convertToDocMaps converts a slice of interface{} to []map[string]interface{}.
func convertToDocMaps(docs []interface{}) ([]map[string]interface{}, error) {
	result := make([]map[string]interface{}, 0, len(docs))
	for i, doc := range docs {
		docMap, ok := doc.(map[string]interface{})
		if !ok {
			return nil, fmt.Errorf("document at index %d is not a map", i)
		}
		result = append(result, docMap)
	}
	return result, nil
}

// parseJSONToDocMaps parses a JSON string into document maps.
func parseJSONToDocMaps(input string) ([]map[string]interface{}, error) {
	// Preprocess the input to handle MongoDB syntax
	normalizedInput := preprocessMongoSyntax(input)

	// Try to parse as a single document or an array of documents
	var result []map[string]interface{}

	// First, try parsing as an array
	var docsArray []interface{}
	if err := json.Unmarshal([]byte(normalizedInput), &docsArray); err == nil {
		return convertToDocMaps(docsArray)
	}

	// Try parsing as a single document
	var singleDoc map[string]interface{}
	if err := json.Unmarshal([]byte(normalizedInput), &singleDoc); err == nil {
		return []map[string]interface{}{singleDoc}, nil
	}

	// If both fail, return an error
	return result, fmt.Errorf("failed to parse input as JSON document(s)")
}

// normalizeSliceToDocuments handles slice inputs and converts them to document maps.
// It also handles single documents (structs/maps/bson.D) by auto-wrapping them in a slice.
func normalizeSliceToDocuments(input interface{}) ([]map[string]interface{}, error) {
	v := reflect.ValueOf(input)

	// Check for bson.D first - it's a slice type but represents a single document
	if isBsonD(input) {
		normalized := normalizeValue(structToMap(input))
		docMap, ok := normalized.(map[string]interface{})
		if !ok {
			return nil, fmt.Errorf("bson.D is not a valid document type: %T", input)
		}
		return []map[string]interface{}{docMap}, nil
	}

	// Handle single documents (structs or maps) by auto-wrapping in a slice
	if v.Kind() == reflect.Struct || v.Kind() == reflect.Map {
		normalized := normalizeValue(structToMap(input))
		docMap, ok := normalized.(map[string]interface{})
		if !ok {
			return nil, fmt.Errorf("single document is not a valid document type: %T", input)
		}
		return []map[string]interface{}{docMap}, nil
	}

	// Handle pointer to struct/map
	if v.Kind() == reflect.Ptr && !v.IsNil() {
		elem := v.Elem()
		if elem.Kind() == reflect.Struct || elem.Kind() == reflect.Map {
			normalized := normalizeValue(structToMap(elem.Interface()))
			docMap, ok := normalized.(map[string]interface{})
			if !ok {
				return nil, fmt.Errorf("single document pointer is not a valid document type: %T", input)
			}
			return []map[string]interface{}{docMap}, nil
		}
	}

	if v.Kind() != reflect.Slice {
		return nil, fmt.Errorf("expected slice or document, got %T", input)
	}

	length := v.Len()
	docs := make([]map[string]interface{}, 0, length)

	for i := 0; i < length; i++ {
		item := v.Index(i).Interface()
		normalized := normalizeValue(structToMap(item))

		// Convert to map[string]interface{}
		docMap, ok := normalized.(map[string]interface{})
		if !ok {
			return nil, fmt.Errorf("document at index %d is not a valid document type", i)
		}
		docs = append(docs, docMap)
	}

	return docs, nil
}

// valuesEqual compares two normalized values for equality.
func valuesEqual(a, b interface{}) bool {
	// Handle nil cases
	if a == nil && b == nil {
		return true
	}
	if a == nil || b == nil {
		return false
	}

	// Use reflect.DeepEqual for complex types
	return reflect.DeepEqual(a, b)
}

// isBsonD checks if the input is a bson.D type (which is []bson.E but represents a single document)
func isBsonD(input interface{}) bool {
	t := reflect.TypeOf(input)
	if t == nil {
		return false
	}
	// Check the type name - bson.D is defined as []bson.E
	return t.String() == "bson.D"
}
