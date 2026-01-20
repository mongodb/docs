package compare

// Option is a functional option for configuring comparison behavior
type Option func(*Options)

// WithUnorderedSort configures comparison to use unordered array comparison
// This is typically the default for MongoDB results where document order may vary
func WithUnorderedSort() Option {
	return func(o *Options) {
		o.ComparisonType = "unordered"
	}
}

// WithOrderedSort configures comparison to use ordered array comparison
// Use this when the order of elements in arrays matters
func WithOrderedSort() Option {
	return func(o *Options) {
		o.ComparisonType = "ordered"
	}
}

// WithIgnoredFields configures fields to ignore during comparison
// Useful for auto-generated fields like _id or timestamps
func WithIgnoredFields(fields ...string) Option {
	return func(o *Options) {
		o.IgnoreFieldValues = fields
	}
}

// WithSchemaOption configures schema validation for ShouldResemble comparisons.
// This is an internal option applied by the fluent API's WithSchema method.
func WithSchemaOption(schema *Schema) Option {
	return func(o *Options) {
		o.Schema = schema
	}
}
