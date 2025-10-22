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
	t       TestingT
	actual  interface{}
	options []Option
}

// WithUnorderedSort configures the comparison to use unordered array comparison
// This is the default behavior for MongoDB results
func (e *ExpectBuilder) WithUnorderedSort() *ExpectBuilder {
	e.options = append(e.options, WithUnorderedSort())
	return e
}

// WithOrderedSort configures the comparison to use ordered array comparison
func (e *ExpectBuilder) WithOrderedSort() *ExpectBuilder {
	e.options = append(e.options, WithOrderedSort())
	return e
}

// WithIgnoredFields configures fields to ignore during comparison
func (e *ExpectBuilder) WithIgnoredFields(fields ...string) *ExpectBuilder {
	e.options = append(e.options, WithIgnoredFields(fields...))
	return e
}

// ShouldMatch performs the comparison and fails the test if there's a mismatch
// It automatically detects content types and routes to the appropriate comparison strategy
func (e *ExpectBuilder) ShouldMatch(expected interface{}) {
	result := compare(expected, e.actual, e.options...)
	if !result.IsMatch {
		e.t.Helper()
		e.t.Fatalf("Comparison failed:\n%s", formatComparisonErrors(result.Errors))
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
