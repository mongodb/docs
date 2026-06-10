package mongodb.comparison;

import java.io.IOException;

/**
 * Builder for configuring and executing comparisons in the Expect API.
 *
 * <p>Every comparison performed via this builder is delegated to the
 * language-agnostic comparison kernel (a native Go binary under
 * tools/comparison-kernel/bin/), so behaviour stays consistent across all
 * driver test suites.
 *
 * <p>Two mutually exclusive comparison modes are supported:
 * <ul>
 *   <li>{@code shouldMatch()} — Exact matching with optional ignored fields and sort options</li>
 *   <li>{@code shouldResemble().withSchema()} — Schema-based validation for variable results</li>
 * </ul>
 *
 * <p>The {@code withIgnoredFields()}, {@code withOrderedSort()}, and
 * {@code withUnorderedSort()} options are only compatible with
 * {@code shouldMatch()}.
 */
public class ExpectBuilder {
    private final Object actual;
    private final ComparisonOptions.Builder options;
    private boolean hasIgnoredFields = false;
    private boolean hasSortOption = false;

    /** Package-private constructor. Use Expect.that() to create instances. */
    ExpectBuilder(Object actual) {
        this.actual = actual;
        this.options = ComparisonOptions.builder();
    }

    /**
     * Configure ordered array comparison where element position matters.
     * Only compatible with {@code shouldMatch()}.
     */
    public ExpectBuilder withOrderedSort() {
        this.hasSortOption = true;
        options.withOrderedArrays();
        return this;
    }

    /**
     * Configure unordered array comparison (the default). Use this method to
     * make the choice explicit. Only compatible with {@code shouldMatch()}.
     */
    public ExpectBuilder withUnorderedSort() {
        this.hasSortOption = true;
        options.withUnorderedArrays();
        return this;
    }

    /**
     * Specify field names whose values should be ignored during comparison.
     * Only compatible with {@code shouldMatch()}.
     */
    public ExpectBuilder withIgnoredFields(String... fields) {
        this.hasIgnoredFields = fields != null && fields.length > 0;
        options.withIgnoredFields(fields);
        return this;
    }

    /**
     * Begin resemblance-based validation. Mutually exclusive with
     * {@code shouldMatch()}; the returned {@link ResemblanceBuilder} requires a
     * call to {@code withSchema()} to complete the validation.
     */
    public ResemblanceBuilder shouldResemble(Object expected) {
        if (hasIgnoredFields) {
            throw new IllegalStateException(
                    "withIgnoredFields() is not compatible with shouldResemble(). " +
                            "Use shouldMatch() for comparisons with ignored fields.");
        }
        if (hasSortOption) {
            throw new IllegalStateException(
                    "withOrderedSort()/withUnorderedSort() cannot be used with shouldResemble(). " +
                            "Schema-based validation checks document structure independently - it does not compare " +
                            "documents between expected and actual, so ordering is not applicable.");
        }
        return new ResemblanceBuilder(actual, expected);
    }

    /**
     * Execute the comparison against the expected value via the comparison
     * kernel. The expected argument can be a {@link java.nio.file.Path}, a
     * file-path string, a JSON-shaped string, or any structured value
     * (Document, Map, List, primitive). The bridge serialises it
     * appropriately.
     *
     * @throws AssertionError if the comparison fails
     */
    public void shouldMatch(Object expected) {
        ComparisonResult result;
        try {
            result = KernelBridge.compare(expected, actual, options.build());
        } catch (IOException e) {
            throw new AssertionError("Comparison kernel invocation failed: " + e.getMessage(), e);
        }
        if (!result.isMatch()) {
            throw new AssertionError(result.message());
        }
    }
}
