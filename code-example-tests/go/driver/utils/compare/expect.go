package compare

// TestingT abstracts testing.T for better testability.
type TestingT interface {
	Helper()
	Fatalf(format string, args ...interface{})
}

// ExpectThat creates a new ExpectBuilder for fluent comparison. This is the
// main entry point of the package; every comparison performed via the returned
// builder is delegated to the language-agnostic comparison kernel (a native
// Go binary under tools/comparison-kernel/bin/) so behaviour stays consistent
// across language suites.
func ExpectThat(t TestingT, actual interface{}) *ExpectBuilder {
	return &ExpectBuilder{
		t:       t,
		actual:  actual,
		options: []Option{},
	}
}

// ExpectBuilder provides a fluent API for comparing MongoDB results.
type ExpectBuilder struct {
	t                    TestingT
	actual               interface{}
	options              []Option
	useShouldResemble    bool
	resembleExpected     interface{}
	hasIgnoredFields     bool
	hasSortOrderExplicit bool
}

// WithUnorderedSort configures unordered array comparison (the default for
// MongoDB results). Only compatible with ShouldMatch; mutually exclusive with
// ShouldResemble.
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

// WithOrderedSort configures ordered array comparison. Only compatible with
// ShouldMatch; mutually exclusive with ShouldResemble.
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
// Only compatible with ShouldMatch; mutually exclusive with ShouldResemble.
func (e *ExpectBuilder) WithIgnoredFields(fields ...string) *ExpectBuilder {
	e.options = append(e.options, WithIgnoredFields(fields...))
	e.hasIgnoredFields = true
	return e
}

// ShouldMatch performs an exact-match comparison via the comparison kernel.
// The expected argument can be a file path, a JSON-shaped string, a primitive,
// or any BSON document / struct slice; the bridge serialises it appropriately.
func (e *ExpectBuilder) ShouldMatch(expected interface{}) {
	opts := buildOptions(e.options...)
	result := compareViaKernel(expected, e.actual, opts)
	if !result.IsMatch {
		e.t.Helper()
		e.t.Fatalf("Comparison failed:\n%s", formatComparisonErrors(result.Errors))
	}
}

// ShouldResemble configures schema-based validation mode. ShouldResemble
// REQUIRES WithSchema to be called after it; using it with WithIgnoredFields or
// WithOrderedSort/WithUnorderedSort will fail the test.
func (e *ExpectBuilder) ShouldResemble(expected interface{}) *ExpectBuilder {
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
// The schema defines expectations about document structure without requiring
// exact value matches. Schema.Count is required and must be non-negative.
func (e *ExpectBuilder) WithSchema(schema Schema) {
	e.t.Helper()

	if !e.useShouldResemble {
		e.t.Fatalf("WithSchema requires ShouldResemble to be called first. " +
			"Use ShouldResemble(expected).WithSchema(schema) pattern.")
		return
	}
	if e.hasIgnoredFields {
		e.t.Fatalf("ShouldResemble cannot be used with WithIgnoredFields. " +
			"The schema-based comparison validates document structure and count, not exact values, " +
			"so ignoring fields is not applicable. Use ShouldMatch if you need to ignore specific field values.")
		return
	}
	if schema.Count < 0 {
		e.t.Fatalf("WithSchema requires a non-negative Count")
		return
	}

	opts := buildOptions(e.options...)
	opts.Schema = &schema
	result := compareViaKernel(e.resembleExpected, e.actual, opts)
	if !result.IsMatch {
		e.t.Fatalf("Schema validation failed:\n%s", formatComparisonErrors(result.Errors))
	}
}

// buildOptions creates an Options struct from the given functional options.
func buildOptions(options ...Option) *Options {
	opts := &Options{
		ComparisonType:    "",
		IgnoreFieldValues: []string{},
	}
	for _, option := range options {
		option(opts)
	}
	return opts
}

// formatComparisonErrors formats kernel-reported errors for test output.
func formatComparisonErrors(errors []Error) string {
	if len(errors) == 0 {
		return ""
	}
	result := ""
	for i, err := range errors {
		if i > 0 {
			result += "\n"
		}
		if err.Path == "" {
			result += err.Message
		} else if err.Expected != "" && err.Actual != "" {
			result += err.Path + ": expected " + err.Expected + ", got " + err.Actual + " (" + err.Message + ")"
		} else {
			result += err.Path + ": " + err.Message
		}
	}
	return result
}
