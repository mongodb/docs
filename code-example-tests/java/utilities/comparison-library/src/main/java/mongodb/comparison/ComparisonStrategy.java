package mongodb.comparison;

import java.util.Objects;

/**
 * Main entry point for comparison operations that routes to appropriate
 * comparison strategies based on content analysis. The strategy selection is automated,
 * with users only needing to specify ORDERED vs UNORDERED comparison.
 * Package-private - internal implementation detail for the Expect API.
 */
class ComparisonStrategy {

    /**
     * Compares two objects using intelligent strategy selection based on content analysis.
     *
     * @param expected The expected value
     * @param actual The actual value
     * @param options Comparison options (ORDERED or UNORDERED)
     * @return ComparisonResult indicating success or failure with details
     */
    public static ComparisonResult compare(Object expected, Object actual, ComparisonOptions options) {
        // Handle null cases first
        if (expected == null && actual == null) {
            return ComparisonResult.success();
        }
        if (expected == null || actual == null) {
            return ComparisonResult.failure("One value is null while the other is not");
        }

        // Use ContentAnalyzer to determine if string-based comparison is appropriate
        if (ContentAnalyzer.shouldUseStringComparison(expected, actual, options)) {
            return StringComparisonStrategy.compare(expected, actual, options);
        }

        // Default to structural comparison for complex objects, arrays, and documents
        return StructuralComparisonStrategy.compare(expected, actual, options);
    }

    /**
     * Helper to check if two values are equal using standard Java equality.
     * This handles common cases efficiently before delegating to strategies.
     */
    public static boolean areEqual(Object expected, Object actual) {
        return Objects.equals(expected, actual);
    }
}
