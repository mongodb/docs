package mongodb.comparison;

/**
 * Builder for configuring and executing comparisons in the Expect API.
 * Provides a fluent interface that automatically handles content-aware
 * comparison strategy selection.
 */
public class ExpectBuilder {
    private final Object actual;
    private final ComparisonOptions.Builder options;

    /**
     * Package-private constructor. Use Expect.that() to create instances.
     */
    ExpectBuilder(Object actual) {
        this.actual = actual;
        this.options = ComparisonOptions.builder();
    }

    /**
     * Configure to use ordered array comparison where element position matters.
     * Use this for sorted query results or when order is significant.
     *
     * @return this builder for method chaining
     */
    public ExpectBuilder withOrderedSort() {
        options.withOrderedArrays();
        return this;
    }

    /**
     * Configure to use unordered array comparison where element position does not matter.
     * This is the default behavior. Use this method to explicitly indicate that
     * array order should be ignored during comparison.
     *
     * @return this builder for method chaining
     */
    public ExpectBuilder withUnorderedSort() {
        options.withUnorderedArrays();
        return this;
    }

    /**
     * Specify fields to ignore during comparison.
     * Useful for dynamic fields like _id, timestamps, or generated values.
     *
     * @param fields Names of fields to ignore at any nesting level
     * @return this builder for method chaining
     */
    public ExpectBuilder withIgnoredFields(String... fields) {
        options.withIgnoredFields(fields);
        return this;
    }

    /**
     * Execute the comparison against the expected value.
     * This method automatically detects the content type and selects the
     * appropriate comparison strategy:
     *
     * - File paths: Loads and parses the file content
     * - Strings with ellipsis: Uses pattern matching
     * - JSON strings: Parses and compares structurally
     * - Objects/Arrays: Direct structural comparison
     *
     * @param expected The expected value (file path, string, object, etc.)
     * @throws AssertionError if the comparison fails
     */
    public void shouldMatch(Object expected) {
        ComparisonResult result = compare(expected, actual, options.build());
        if (!result.isMatch()) {
            throw new AssertionError(result.message());
        }
    }


    /**
     * shouldMatchWithDebug is provided only for internal testing and should not
     * be used in your unit tests. If you find yourself using this method,
     * use the shouldMatch method instead.
     * Execute the comparison with debug output on failure.
     * Automatically prints detailed diagnostic information if the comparison fails,
     * then throws an AssertionError. Useful during test development.
     *
     * @param expected The expected value (file path, string, object, etc.)
     * @throws AssertionError if the comparison fails (with debug output)
     */
    public void shouldMatchWithDebug(Object expected) {
        ComparisonResult result = compare(expected, actual, options.build());
        if (!result.isMatch()) {
            result.printDebugInfo();
            throw new AssertionError(result.summary());
        }
    }

    /**
     * Internal comparison logic that handles content-aware strategy selection.
     * This method determines the best comparison approach based on the types
     * and content of the expected and actual values.
     */
    private ComparisonResult compare(Object expected, Object actual, ComparisonOptions options) {
        // Handle file path detection using the enhanced ContentAnalyzer
        if (expected instanceof String expectedStr && ContentAnalyzer.isFilePath(expectedStr)) {
            return ComparisonEngine.compareWithFile(actual, expectedStr, options);
        }

        // Use content-aware comparison from ContentAnalyzer
        return ContentAnalyzer.compareWithContentAnalysis(expected, actual, options);
    }
}
