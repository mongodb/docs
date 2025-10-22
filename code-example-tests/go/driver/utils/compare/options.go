package compare

// Options defines configuration for the compare
type Options struct {
	ComparisonType    string   `json:"comparisonType,omitempty"`    // "ordered", "unordered", or empty
	IgnoreFieldValues []string `json:"ignoreFieldValues,omitempty"` // Field names to ignore value differences
}
