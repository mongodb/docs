package compare

// Schema defines the expected structure for schema-based validation.
// Used with ShouldResemble() to validate documents match a specific structure
// without requiring exact value matches.
type Schema struct {
	// Count specifies the expected number of documents. Required.
	// Must be non-negative. Validation will fail if the actual count doesn't match.
	Count int

	// RequiredFields lists field names that must be present in every document. Optional.
	RequiredFields []string

	// FieldValues specifies field-value pairs that must match exactly in every document. Optional.
	// All documents must contain these fields with the specified values.
	FieldValues map[string]interface{}
}

// Options defines configuration for the compare
type Options struct {
	ComparisonType    string   `json:"comparisonType,omitempty"`    // "ordered", "unordered", or empty
	IgnoreFieldValues []string `json:"ignoreFieldValues,omitempty"` // Field names to ignore value differences
	Schema            *Schema  `json:"schema,omitempty"`            // Schema for ShouldResemble validation
}
