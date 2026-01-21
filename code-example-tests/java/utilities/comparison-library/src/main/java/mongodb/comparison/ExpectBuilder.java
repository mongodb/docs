package mongodb.comparison;

import java.nio.file.Path;

/**
 * Builder for configuring and executing comparisons in the Expect API.
 * Provides a fluent interface that automatically handles content-aware
 * comparison strategy selection.
 *
 * <p>This builder supports two mutually exclusive comparison modes:
 * <ul>
 *   <li>{@code shouldMatch()} - Exact matching with optional ignored fields and sort options</li>
 *   <li>{@code shouldResemble().withSchema()} - Schema-based validation for variable results</li>
 * </ul>
 *
 * <p>The {@code withIgnoredFields()}, {@code withOrderedSort()}, and {@code withUnorderedSort()}
 * options are only compatible with {@code shouldMatch()}.
 */
public class ExpectBuilder {
    private final Object actual;
    private final ComparisonOptions.Builder options;
    private boolean hasIgnoredFields = false;
    private boolean hasSortOption = false;

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
     * <p>Note: This option is only compatible with {@code shouldMatch()}.
     * Using this with {@code shouldResemble()} will throw an error because
     * schema-based validation doesn't compare documents between expected and actual,
     * so ordering is not applicable.
     *
     * @return this builder for method chaining
     */
    public ExpectBuilder withOrderedSort() {
        this.hasSortOption = true;
        options.withOrderedArrays();
        return this;
    }

    /**
     * Configure to use unordered array comparison where element position does not matter.
     * This is the default behavior. Use this method to explicitly indicate that
     * array order should be ignored during comparison.
     *
     * <p>Note: This option is only compatible with {@code shouldMatch()}.
     * Using this with {@code shouldResemble()} will throw an error because
     * schema-based validation doesn't compare documents between expected and actual,
     * so ordering is not applicable.
     *
     * @return this builder for method chaining
     */
    public ExpectBuilder withUnorderedSort() {
        this.hasSortOption = true;
        options.withUnorderedArrays();
        return this;
    }

    /**
     * Specify fields to ignore during comparison.
     * Useful for dynamic fields like _id, timestamps, or generated values.
     *
     * <p>Note: This option is only compatible with {@code shouldMatch()}.
     * Using this with {@code shouldResemble()} will throw an error.
     *
     * @param fields Names of fields to ignore at any nesting level
     * @return this builder for method chaining
     */
    public ExpectBuilder withIgnoredFields(String... fields) {
        this.hasIgnoredFields = fields != null && fields.length > 0;
        options.withIgnoredFields(fields);
        return this;
    }

    /**
     * Begin resemblance-based validation for results that may vary.
     * This is useful for scenarios like Vector Search where the exact documents
     * may differ, but the count and structure should match a defined schema.
     *
     * <p>This method is mutually exclusive with {@code shouldMatch()}. The returned
     * {@link ResemblanceBuilder} requires a call to {@code withSchema()} to complete
     * the validation.
     *
     * <p>Note: {@code withIgnoredFields()}, {@code withOrderedSort()}, and
     * {@code withUnorderedSort()} are not compatible with this method.
     *
     * @param expected The expected value to validate structure against
     * @return a ResemblanceBuilder to configure schema validation
     * @throws IllegalStateException if withIgnoredFields() or sort options were called on this builder
     *
     * @see ResemblanceSchema
     * @see ResemblanceBuilder#withSchema(ResemblanceSchema)
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
        // Handle Path objects by converting to string
        if (expected instanceof Path pathExpected) {
            return ComparisonEngine.compareWithFile(actual, pathExpected.toString(), options);
        }

        // Handle file path detection using the enhanced ContentAnalyzer
        if (expected instanceof String expectedStr && ContentAnalyzer.isFilePath(expectedStr)) {
            return ComparisonEngine.compareWithFile(actual, expectedStr, options);
        }

        // Handle multi-line strings with structured content - parse them first
        // This ensures that patterns like "{ \"name\": \"Alice\" }\n..." are parsed
        // into structured data before comparison, rather than being treated as pattern strings
        // Only do this when comparing against non-string actual values
        if (expected instanceof String expectedStr &&
            shouldParseAsStructuredContent(expectedStr, actual)) {
            var parseResult = ExpectedOutputParser.parseContent(expectedStr);
            if (parseResult.isSuccess()) {
                // Use the parsed data for comparison
                return ContentAnalyzer.compareWithContentAnalysis(parseResult.getData(), actual, options);
            }
            // If parsing fails, fall through to normal string comparison
        }

        // Use content-aware comparison from ContentAnalyzer
        return ContentAnalyzer.compareWithContentAnalysis(expected, actual, options);
    }

    /**
     * Determine if a string should be parsed as structured content before comparison.
     * This handles cases like multi-line JSON with ellipsis markers.
     *
     * We only parse when:
     * 1. The expected string is multi-line
     * 2. It looks like structured content (JSON)
     * 3. It contains ellipsis patterns
     * 4. The actual value is NOT a string (to avoid breaking string-to-string comparisons)
     */
    private boolean shouldParseAsStructuredContent(String str, Object actual) {
        if (str == null || str.trim().isEmpty()) {
            return false;
        }

        // Don't parse if actual is a string - let string comparison handle it
        if (actual instanceof String) {
            return false;
        }

        // Check if it's multi-line content
        if (!str.contains("\n")) {
            return false;
        }

        String trimmed = str.trim();

        // Check if it looks like structured content (JSON objects/arrays)
        boolean looksStructured = (trimmed.startsWith("{") || trimmed.startsWith("["));

        // If it looks structured and contains ellipsis, parse it
        return looksStructured && str.contains("...");
    }
}
