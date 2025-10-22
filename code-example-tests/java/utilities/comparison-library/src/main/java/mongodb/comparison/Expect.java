package mongodb.comparison;

/**
 * Fluent API for MongoDB documentation example validation.
 * This entry point provides content-aware comparison with a simplified
 * interface for technical writers.
 *
 * Usage examples:
 * <pre>
 * // File comparison
 * Expect.that(actualResults).shouldMatch("expected.json");
 *
 * // Object comparison with options
 * Expect.that(actualResults)
 *     .withOrderedSort()
 *     .withIgnoredFields("_id", "timestamp")
 *     .shouldMatch(expectedResults);
 *
 * // String content comparison
 * Expect.that(actualResults).shouldMatch("{name: 'Alice', age: '...'}");
 * </pre>
 */
public class Expect {

    /**
     * Start building an expectation for the given actual results.
     * This is the main entry point for all comparison operations.
     *
     * @param actual The actual results to validate (from MongoDB operations)
     * @return ExpectBuilder for fluent configuration and comparison
     */
    public static ExpectBuilder that(Object actual) {
        return new ExpectBuilder(actual);
    }
}
