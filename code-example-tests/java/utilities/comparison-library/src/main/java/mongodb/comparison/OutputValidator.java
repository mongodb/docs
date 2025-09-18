package mongodb.comparison;

/**
 * Main API for validating MongoDB Java Driver output against expected results.
 * Supports both Sync and Reactive Streams drivers through common MongoDB types.
 *
 * This class provides a fluent API for technical writers to easily validate
 * their MongoDB driver output against expected results stored in files.
 */
public class OutputValidator {
    private final Object actualResults;
    private final ComparisonOptions.Builder optionsBuilder;

    public OutputValidator(Object actualResults) {
        this.actualResults = actualResults;
        this.optionsBuilder = ComparisonOptions.builder();
    }

    /**
     * Start building a validation for the given actual results.
     * Accepts results from both Sync and Reactive drivers.
     *
     * @param results The actual results to validate (List, Array, Document, etc.)
     * @return OutputValidator for fluent configuration
     */
    public static OutputValidator expect(Object results) {
        return new OutputValidator(results);
    }

    /**
     * Configure to use ordered array comparison (elements must match by index).
     *
     * @return this validator for method chaining
     */
    public OutputValidator withOrderedArrays() {
        optionsBuilder.withOrderedArrays();
        return this;
    }

    /**
     * Configure to use unordered array comparison.
     * The library will automatically select the best unordered comparison strategy
     * (set-based, hybrid, backtracking) based on content analysis.
     *
     * @return this validator for method chaining
     */
    public OutputValidator withUnorderedArrays() {
        optionsBuilder.withUnorderedArrays();
        return this;
    }

    /**
     * Specify fields to ignore during comparison (useful for dynamic fields like _id).
     *
     * @param fieldNames Names of fields to ignore
     * @return this validator for method chaining
     */
    public OutputValidator withIgnoredFields(String... fieldNames) {
        optionsBuilder.withIgnoredFields(fieldNames);
        return this;
    }

    /**
     * Compare against expected results loaded from a file.
     * The file should contain JSON or MongoDB-extended JSON format.
     *
     * @param expectedFilePath Path to file containing expected results
     * @return ComparisonResult indicating success or failure with details
     */
    public ComparisonResult toMatchFile(String expectedFilePath) {
        ComparisonOptions options = optionsBuilder.build();
        return ComparisonEngine.compareWithFile(actualResults, expectedFilePath, options);
    }

    /**
     * Compare against provided expected results directly.
     *
     * @param expectedResults Expected results to compare against
     * @return ComparisonResult indicating success or failure with details
     */
    public ComparisonResult toMatch(Object expectedResults) {
        ComparisonOptions options = optionsBuilder.build();
        return ComparisonEngine.compare(expectedResults, actualResults, options);
    }

    /**
     * Configure to use unordered comparison for all results (not just arrays).
     * Useful for aggregation results or reactive operations that may return in different orders.
     *
     * @return this validator for method chaining
     */
    public OutputValidator withUnorderedComparison() {
        optionsBuilder.withUnorderedComparison();
        return this;
    }

    /**
     * Compare against expected content provided as a string.
     * The string should contain JSON lines, JSON array, or MongoDB-extended JSON format.
     *
     * @param expectedContent String containing expected results
     * @return ComparisonResult indicating success or failure with details
     */
    public ComparisonResult toMatchContent(String expectedContent) {
        ComparisonOptions options = optionsBuilder.build();
        return ComparisonEngine.compareWithContent(actualResults, expectedContent, options);
    }

    /**
     * Convenience method that loads expected results from file and asserts success.
     * Throws AssertionError if comparison fails.
     *
     * @param expectedFilePath Path to file containing expected results
     * @throws AssertionError if comparison fails
     */
    public void assertMatchesFile(String expectedFilePath) {
        toMatchFile(expectedFilePath).assertSuccess();
    }

    /**
     * Convenience method that compares against expected results and asserts success.
     * Throws AssertionError if comparison fails.
     *
     * @param expectedResults Expected results to compare against
     * @throws AssertionError if comparison fails
     */
    public void assertMatches(Object expectedResults) {
        toMatch(expectedResults).assertSuccess();
    }

    /**
    * Assertion that prints debug information on failure.
     *
     * @param expectedFilePath Path to file containing expected results
     * @throws AssertionError if comparison fails (with debug output)
     */
    public void assertMatchesFileWithDebug(String expectedFilePath) {
        toMatchFile(expectedFilePath).assertSuccessWithDebug();
    }

    /**
    * Assertion that prints debug information on failure.
     *
     * @param expectedResults Expected results to compare against
     * @throws AssertionError if comparison fails (with debug output)
     */
    public void assertMatchesWithDebug(Object expectedResults) {
        toMatch(expectedResults).assertSuccessWithDebug();
    }

    /**
     * Convenience method that compares against expected content and asserts success.
     * Throws AssertionError if comparison fails.
     *
     * @param expectedContent String containing expected results
     * @throws AssertionError if comparison fails
     */
    public void assertMatchesContent(String expectedContent) {
        ComparisonResult result = toMatchContent(expectedContent);
        if (!result.isMatch()) {
            throw new AssertionError("Comparison failed: " + result.summary());
        }
    }
}
