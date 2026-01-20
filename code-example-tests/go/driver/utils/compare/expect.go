package compare

// TestingT is an interface that abstracts testing.T for better testability
type TestingT interface {
	Helper()
	Fatalf(format string, args ...interface{})
}

// ExpectThat creates a new ExpectBuilder for fluent comparison API
// This is the main entry point for the unified comparison API
func ExpectThat(t TestingT, actual interface{}) *ExpectBuilder {
	return &ExpectBuilder{
		t:       t,
		actual:  actual,
		options: []Option{},
	}
}

// ExpectBuilder provides a fluent API for comparing MongoDB results
type ExpectBuilder struct {
	t                    TestingT
	actual               interface{}
	options              []Option
	useShouldResemble    bool        // Tracks if ShouldResemble was called
	resembleExpected     interface{} // Expected value for ShouldResemble (set by ShouldResemble)
	hasIgnoredFields     bool        // Tracks if WithIgnoredFields was called
	hasSortOrderExplicit bool        // Tracks if WithOrderedSort/WithUnorderedSort was called
}

// WithUnorderedSort configures the comparison to use unordered array comparison.
// This is the default behavior for MongoDB results.
//
// This option is only compatible with ShouldMatch and is mutually exclusive
// with ShouldResemble. Schema-based validation doesn't compare documents
// between expected and actual, so ordering is not applicable.
func (e *ExpectBuilder) WithUnorderedSort() *ExpectBuilder {
	if e.useShouldResemble {
		e.t.Helper()
		e.t.Fatalf("WithUnorderedSort cannot be used with ShouldResemble. " +
			"Schema-based validation checks document structure independently - it does not compare " +
			"documents between expected and actual, so ordering is not applicable.")
		return e
	}
	e.options = append(e.options, WithUnorderedSort())
	e.hasSortOrderExplicit = true
	return e
}

// WithOrderedSort configures the comparison to use ordered array comparison.
//
// This option is only compatible with ShouldMatch and is mutually exclusive
// with ShouldResemble. Schema-based validation doesn't compare documents
// between expected and actual, so ordering is not applicable.
func (e *ExpectBuilder) WithOrderedSort() *ExpectBuilder {
	if e.useShouldResemble {
		e.t.Helper()
		e.t.Fatalf("WithOrderedSort cannot be used with ShouldResemble. " +
			"Schema-based validation checks document structure independently - it does not compare " +
			"documents between expected and actual, so ordering is not applicable.")
		return e
	}
	e.options = append(e.options, WithOrderedSort())
	e.hasSortOrderExplicit = true
	return e
}

// WithIgnoredFields configures fields to ignore during comparison.
// This option is only compatible with ShouldMatch and is mutually exclusive
// with ShouldResemble. Using both will cause a test failure.
func (e *ExpectBuilder) WithIgnoredFields(fields ...string) *ExpectBuilder {
	e.options = append(e.options, WithIgnoredFields(fields...))
	e.hasIgnoredFields = true
	return e
}

// ShouldMatch performs the comparison and fails the test if there's a mismatch.
// It automatically detects content types and routes to the appropriate comparison strategy.
// This is mutually exclusive with ShouldResemble.
func (e *ExpectBuilder) ShouldMatch(expected interface{}) {
	result := compare(expected, e.actual, e.options...)
	if !result.IsMatch {
		e.t.Helper()
		e.t.Fatalf("Comparison failed:\n%s", formatComparisonErrors(result.Errors))
	}
}

// ShouldResemble configures schema-based validation mode for comparing results.
// This is useful for cases where MongoDB results may vary (e.g., Vector Search results)
// but you know the expected shape and count of documents.
//
// ShouldResemble REQUIRES WithSchema to be called after it to perform the validation.
//
// ShouldResemble is mutually exclusive with ShouldMatch.
// Using WithIgnoredFields or WithOrderedSort/WithUnorderedSort with ShouldResemble
// will cause a test failure.
//
// Example:
//
//	ExpectThat(t, results).
//	    ShouldResemble(expectedOutput).
//	    WithSchema(Schema{
//	        Count: 20,
//	        RequiredFields: []string{"_id", "title", "year"},
//	        FieldValues: map[string]interface{}{"year": 2012},
//	    })
func (e *ExpectBuilder) ShouldResemble(expected interface{}) *ExpectBuilder {
	// Check if sort order was explicitly set before ShouldResemble
	if e.hasSortOrderExplicit {
		e.t.Helper()
		e.t.Fatalf("WithOrderedSort/WithUnorderedSort cannot be used with ShouldResemble. " +
			"Schema-based validation checks document structure independently - it does not compare " +
			"documents between expected and actual, so ordering is not applicable.")
		return e
	}
	e.useShouldResemble = true
	e.resembleExpected = expected
	return e
}

// WithSchema performs schema-based validation for ShouldResemble comparisons.
// The schema defines expectations about document structure without requiring exact value matches.
//
// Schema fields:
//   - Count: Required. Expected number of documents. Must be non-negative.
//   - RequiredFields: Optional. Field names that must be present in every document.
//   - FieldValues: Optional. Field-value pairs that must match exactly in every document.
//
// WithSchema requires ShouldResemble to be called before it.
// WithSchema is mutually exclusive with ShouldMatch.
func (e *ExpectBuilder) WithSchema(schema Schema) {
	e.t.Helper()

	// Check that ShouldResemble was called first
	if !e.useShouldResemble {
		e.t.Fatalf("WithSchema requires ShouldResemble to be called first. " +
			"Use ShouldResemble(expected).WithSchema(schema) pattern.")
		return
	}

	// Check mutual exclusivity: WithIgnoredFields cannot be used with ShouldResemble
	if e.hasIgnoredFields {
		e.t.Fatalf("ShouldResemble cannot be used with WithIgnoredFields. " +
			"The schema-based comparison validates document structure and count, not exact values, " +
			"so ignoring fields is not applicable. Use ShouldMatch if you need to ignore specific field values.")
		return
	}

	// Validate schema structure - Count is required and must be non-negative
	if schema.Count < 0 {
		e.t.Fatalf("WithSchema requires a non-negative Count")
		return
	}

	// Validate schema against both expected and actual outputs
	result := validateWithSchema(e.resembleExpected, e.actual, &schema)
	if !result.IsMatch {
		e.t.Fatalf("Schema validation failed:\n%s", formatComparisonErrors(result.Errors))
	}
}

// compare is the internal comparison function with automatic content detection
func compare(expected, actual interface{}, options ...Option) Result {
	opts := buildOptions(options...)

	// Automatic content analysis
	expectedType := detectContentType(expected)
	actualType := detectContentType(actual)

	// Select and execute comparison strategy
	strategy := selectComparisonStrategy(expectedType, actualType, opts)
	return strategy.execute(expected, actual, opts)
}

// buildOptions creates an Options struct from functional options
func buildOptions(options ...Option) *Options {
	opts := &Options{
		ComparisonType:    "", // Default: unordered for MongoDB results
		IgnoreFieldValues: []string{},
	}

	for _, option := range options {
		option(opts)
	}

	return opts
}

// formatComparisonErrors formats error messages for test output
func formatComparisonErrors(errors []Error) string {
	if len(errors) == 0 {
		return ""
	}

	result := ""
	for i, err := range errors {
		if i > 0 {
			result += "\n"
		}
		result += formatError(err)
	}
	return result
}

// formatError formats a single error for display
func formatError(err Error) string {
	if err.Path == "" {
		return err.Message
	}

	if err.Expected != "" && err.Actual != "" {
		return err.Path + ": expected " + err.Expected + ", got " + err.Actual + " (" + err.Message + ")"
	}

	return err.Path + ": " + err.Message
}
