package main

// Schema defines the expected structure for schema-based validation.
// Used with the "schema" field in request Options to validate documents
// match a specific structure without requiring exact value matches.
type Schema struct {
	// Count specifies the expected number of documents. Required.
	Count int `json:"count"`

	// RequiredFields lists field names that must be present in every document. Optional.
	RequiredFields []string `json:"requiredFields,omitempty"`

	// FieldValues specifies field-value pairs that must match exactly in every document. Optional.
	FieldValues map[string]interface{} `json:"fieldValues,omitempty"`
}

// Options defines configuration for a comparison request.
type Options struct {
	// ComparisonType is "ordered", "unordered", or empty (default: unordered).
	ComparisonType string `json:"comparisonType,omitempty"`

	// IgnoreFieldValues lists field names whose values are not compared.
	IgnoreFieldValues []string `json:"ignoreFieldValues,omitempty"`

	// Schema enables schema-based validation instead of exact comparison.
	// When set, the kernel validates document count and field presence/values
	// rather than doing a full document-by-document comparison.
	Schema *Schema `json:"schema,omitempty"`
}
