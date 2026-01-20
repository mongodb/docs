package compare

import (
	"encoding/json"
	"fmt"
	"reflect"
)

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
func validateDocumentsAgainstSchema(docs []map[string]interface{}, schema *Schema, source string) []Error {
	var errors []Error

	for i, doc := range docs {
		docPath := fmt.Sprintf("%s[%d]", source, i)

		// Check required fields
		for _, field := range schema.RequiredFields {
			if _, exists := doc[field]; !exists {
				errors = append(errors, Error{
					Path:    docPath,
					Message: fmt.Sprintf("Missing required field %q", field),
				})
			}
		}

		// Check field values
		for field, expectedValue := range schema.FieldValues {
			actualValue, exists := doc[field]
			if !exists {
				errors = append(errors, Error{
					Path:    docPath,
					Message: fmt.Sprintf("Missing field %q", field),
				})
				continue
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
