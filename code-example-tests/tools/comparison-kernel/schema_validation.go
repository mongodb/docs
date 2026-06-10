package main

import (
	"fmt"
	"reflect"
	"strconv"
	"strings"
)

// PathPart represents a single segment of a field path — either a field name or
// an array index.
type PathPart struct {
	FieldName    string
	ArrayIndex   int
	IsArrayIndex bool
}

// NewFieldNamePart creates a PathPart for a field name.
func NewFieldNamePart(name string) PathPart { return PathPart{FieldName: name, ArrayIndex: -1} }

// NewArrayIndexPart creates a PathPart for an array index.
func NewArrayIndexPart(index int) PathPart { return PathPart{ArrayIndex: index, IsArrayIndex: true} }

// ParseFieldPath parses a dot-notation path (e.g., "stages[0].$cursor.queryPlanner")
// into ordered PathParts.
func ParseFieldPath(fieldPath string) []PathPart {
	var parts []PathPart
	for _, segment := range strings.Split(fieldPath, ".") {
		bi := strings.Index(segment, "[")
		if bi >= 0 {
			if bi > 0 {
				parts = append(parts, NewFieldNamePart(segment[:bi]))
			}
			remaining := segment[bi:]
			for strings.HasPrefix(remaining, "[") {
				ci := strings.Index(remaining, "]")
				if ci < 0 {
					break
				}
				if idx, err := strconv.Atoi(remaining[1:ci]); err == nil {
					parts = append(parts, NewArrayIndexPart(idx))
				}
				remaining = remaining[ci+1:]
			}
		} else {
			parts = append(parts, NewFieldNamePart(segment))
		}
	}
	return parts
}

// TryGetNestedValue retrieves a value from a nested structure using dot notation
// and array indexing. Returns the value and true if found, nil and false otherwise.
func TryGetNestedValue(doc map[string]interface{}, fieldPath string) (interface{}, bool) {
	var current interface{} = doc
	for _, part := range ParseFieldPath(fieldPath) {
		if current == nil {
			return nil, false
		}
		current = normalizeValue(current)
		if part.IsArrayIndex {
			arr, ok := current.([]interface{})
			if !ok || part.ArrayIndex < 0 || part.ArrayIndex >= len(arr) {
				return nil, false
			}
			current = arr[part.ArrayIndex]
		} else {
			m, ok := current.(map[string]interface{})
			if !ok {
				return nil, false
			}
			val, exists := m[part.FieldName]
			if !exists {
				return nil, false
			}
			current = val
		}
	}
	return current, true
}

func hasNestedPath(fieldPath string) bool {
	return strings.Contains(fieldPath, ".") || strings.Contains(fieldPath, "[")
}

// validateWithSchema validates that both expectedDocs and actualDocs match the
// schema: correct count, required fields present, and specific field values matching.
func validateWithSchema(expectedDocs, actualDocs []interface{}, schema *Schema) Result {
	var allErrors []Error

	expectedMaps, err := toDocMaps(expectedDocs)
	if err != nil {
		return Result{IsMatch: false, Errors: []Error{{Path: "expected", Message: err.Error()}}}
	}
	actualMaps, err := toDocMaps(actualDocs)
	if err != nil {
		return Result{IsMatch: false, Errors: []Error{{Path: "actual", Message: err.Error()}}}
	}

	if len(expectedMaps) != schema.Count {
		allErrors = append(allErrors, Error{
			Path:     "expected output",
			Expected: fmt.Sprintf("%d", schema.Count),
			Actual:   fmt.Sprintf("%d", len(expectedMaps)),
			Message:  fmt.Sprintf("Expected %d documents but got %d", schema.Count, len(expectedMaps)),
		})
	}
	if len(actualMaps) != schema.Count {
		allErrors = append(allErrors, Error{
			Path:     "actual output",
			Expected: fmt.Sprintf("%d", schema.Count),
			Actual:   fmt.Sprintf("%d", len(actualMaps)),
			Message:  fmt.Sprintf("Expected %d documents but got %d", schema.Count, len(actualMaps)),
		})
	}

	allErrors = append(allErrors, validateDocumentsAgainstSchema(expectedMaps, schema, "expected")...)
	allErrors = append(allErrors, validateDocumentsAgainstSchema(actualMaps, schema, "actual")...)
	return Result{IsMatch: len(allErrors) == 0, Errors: allErrors}
}

// toDocMaps converts a []interface{} slice (containing map[string]interface{} elements)
// to []map[string]interface{}.
func toDocMaps(docs []interface{}) ([]map[string]interface{}, error) {
	result := make([]map[string]interface{}, 0, len(docs))
	for i, doc := range docs {
		m, ok := doc.(map[string]interface{})
		if !ok {
			return nil, fmt.Errorf("document at index %d is not an object", i)
		}
		result = append(result, m)
	}
	return result, nil
}

func validateDocumentsAgainstSchema(docs []map[string]interface{}, schema *Schema, source string) []Error {
	var errors []Error
	for i, doc := range docs {
		docPath := fmt.Sprintf("%s[%d]", source, i)
		for _, field := range schema.RequiredFields {
			var exists bool
			if hasNestedPath(field) {
				_, exists = TryGetNestedValue(doc, field)
			} else {
				_, exists = doc[field]
			}
			if !exists {
				errors = append(errors, Error{Path: docPath, Message: fmt.Sprintf("Missing required field %q", field)})
			}
		}
		for field, expectedValue := range schema.FieldValues {
			var actualValue interface{}
			var exists bool
			if hasNestedPath(field) {
				actualValue, exists = TryGetNestedValue(doc, field)
			} else {
				actualValue, exists = doc[field]
			}
			if !exists {
				errors = append(errors, Error{Path: docPath, Message: fmt.Sprintf("Missing field %q required by fieldValues", field)})
				continue
			}
			ne := normalizeValue(expectedValue)
			na := normalizeValue(actualValue)
			if !reflect.DeepEqual(ne, na) {
				errors = append(errors, Error{
					Path:     fmt.Sprintf("%s.%s", docPath, field),
					Expected: fmt.Sprintf("%v", ne),
					Actual:   fmt.Sprintf("%v", na),
					Message:  fmt.Sprintf("Field %q has value %v but expected %v", field, na, ne),
				})
			}
		}
	}
	return errors
}
