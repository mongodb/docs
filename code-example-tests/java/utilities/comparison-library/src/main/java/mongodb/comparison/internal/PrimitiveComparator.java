package mongodb.comparison.internal;

import mongodb.comparison.ComparisonOptions;
import mongodb.comparison.ComparisonError;
import mongodb.comparison.ComparisonResult;

import java.util.List;

/**
 * Dedicated primitive value comparison with flexible numeric type handling.
 *
 * Handles:
 * - String comparisons
 * - Numeric type flexibility (int vs long vs double)
 * - Boolean comparisons
 * - Null value handling
 * - MongoDB numeric compatibility
 */
public class PrimitiveComparator {

    /**
     * Check if a value is considered primitive for comparison.
     */
    public static boolean isPrimitive(Object value) {
        return value instanceof String
            || value instanceof Number
            || value instanceof Boolean
            || value instanceof Character;
    }

    /**
     * Compare two primitive values with MongoDB-compatible numeric flexibility.
     */
    public static ComparisonResult compare(Object expected, Object actual, ComparisonOptions options, String path) {
        // Handle null cases
        if (expected == null && actual == null) {
            return ComparisonResult.success();
        }
        if (expected == null || actual == null) {
            return ComparisonResult.failure(List.of(
                ErrorFactory.createNullMismatch(path, expected, actual)
            ));
        }

        // Handle string comparison
        if (expected instanceof String && actual instanceof String) {
            return compareStrings((String) expected, (String) actual, path);
        }

        // Handle numeric comparison with type flexibility
        if (expected instanceof Number && actual instanceof Number) {
            return compareNumbers((Number) expected, (Number) actual, path);
        }

        // Handle boolean comparison
        if (expected instanceof Boolean && actual instanceof Boolean) {
            return expected.equals(actual)
                ? ComparisonResult.success()
                : ComparisonResult.failure(List.of(
                    ErrorFactory.createValueMismatch(path, expected, actual)
                ));
        }

        // Handle character comparison
        if (expected instanceof Character && actual instanceof Character) {
            return expected.equals(actual)
                ? ComparisonResult.success()
                : ComparisonResult.failure(List.of(
                    ErrorFactory.createValueMismatch(path, expected, actual)
                ));
        }

        // Handle type mismatch between primitives
        if (isPrimitive(expected) && isPrimitive(actual)) {
            // Try numeric conversion if one is number and other could be
            if ((expected instanceof Number || actual instanceof Number) &&
                areTypesCompatible(expected, actual)) {
                try {
                    double expectedNum = parseAsNumber(expected);
                    double actualNum = parseAsNumber(actual);
                    return Double.compare(expectedNum, actualNum) == 0
                        ? ComparisonResult.success()
                        : ComparisonResult.failure(List.of(
                            ErrorFactory.createValueMismatch(path, expected, actual)
                        ));
                } catch (NumberFormatException e) {
                    // Fall through to type mismatch error
                }
            }

            return ComparisonResult.failure(List.of(
                ErrorFactory.createTypeMismatch(path, expected, actual)
            ));
        }

        // This shouldn't happen if isPrimitive() is used correctly
        return ComparisonResult.failure(List.of(
            ErrorFactory.createTypeMismatch(path, expected, actual)
        ));
    }

    /**
     * Compare string values.
     */
    private static ComparisonResult compareStrings(String expected, String actual, String path) {
        // Normalize Unicode characters for proper comparison
        String normalizedExpected = ValueNormalizer.normalizeUnicode(expected);
        String normalizedActual = ValueNormalizer.normalizeUnicode(actual);

        // Check for ellipsis patterns first (use normalized strings)
        if (normalizedExpected.contains("...")) {
            // Use EllipsisPatternRegistry for ellipsis pattern matching
            if (EllipsisPatternRegistry.matches(normalizedExpected, normalizedActual, path)) {
                return ComparisonResult.success();
            }

            // If ellipsis pattern doesn't match, provide a better error message
            return ComparisonResult.failure(List.of(
                new ComparisonError(path, expected, actual, "String content does not match ellipsis pattern")
            ));
        }

        // Fall back to exact string comparison (use normalized strings)
        if (normalizedExpected.equals(normalizedActual)) {
            return ComparisonResult.success();
        }

        // For cases where only quote characters differ, try quote-agnostic comparison
        String quoteNormalizedExpected = normalizeQuotesForComparison(normalizedExpected);
        String quoteNormalizedActual = normalizeQuotesForComparison(normalizedActual);

        if (quoteNormalizedExpected.equals(quoteNormalizedActual)) {
            return ComparisonResult.success();
        }

        return ComparisonResult.failure(List.of(
            ErrorFactory.createStringMismatch(path, expected, actual)
        ));
    }

    /**
     * Normalize quotes for comparison to handle JSON parsing differences.
     * Only apply this when exact comparison fails.
     */
    private static String normalizeQuotesForComparison(String str) {
        // Convert all quote types to single quotes for comparison
        return str.replace("\"", "'");
    }

    /**
     * Compare numeric values with MongoDB-compatible type flexibility.
     */
    private static ComparisonResult compareNumbers(Number expected, Number actual, String path) {
        // Use double comparison for MongoDB numeric compatibility
        double expectedDouble = expected.doubleValue();
        double actualDouble = actual.doubleValue();

        // Handle special floating point values
        if (Double.isNaN(expectedDouble) && Double.isNaN(actualDouble)) {
            return ComparisonResult.success();
        }

        if (Double.isInfinite(expectedDouble) && Double.isInfinite(actualDouble)) {
            return expectedDouble == actualDouble
                ? ComparisonResult.success()
                : ComparisonResult.failure(List.of(new ComparisonError(
                    path,
                    safeToString(expected),
                    safeToString(actual),
                    "Infinite values have different signs"
                )));
        }

        // Use epsilon comparison for floating point values
        // Use a larger epsilon to handle float/double precision differences
        double epsilon = 1e-6;  // Increased from 1e-10 to handle float/double conversions
        return Math.abs(expectedDouble - actualDouble) < epsilon
            ? ComparisonResult.success()
            : ComparisonResult.failure(List.of(new ComparisonError(
                path,
                safeToString(expected),
                safeToString(actual),
                "Numeric values do not match"
            )));
    }

    /**
     * Check if types are compatible for numeric conversion.
     */
    private static boolean areTypesCompatible(Object expected, Object actual) {
        // Allow string to number conversion for MongoDB compatibility
        if (expected instanceof String && actual instanceof Number) {
            try {
                Double.parseDouble((String) expected);
                return true;
            } catch (NumberFormatException e) {
                return false;
            }
        }
        if (expected instanceof Number && actual instanceof String) {
            try {
                Double.parseDouble((String) actual);
                return true;
            } catch (NumberFormatException e) {
                return false;
            }
        }
        return false;
    }

    /**
     * Parse object as number for comparison.
     */
    private static double parseAsNumber(Object obj) throws NumberFormatException {
        if (obj instanceof Number number) {
            return number.doubleValue();
        }
        if (obj instanceof String str) {
            return Double.parseDouble(str);
        }
        throw new NumberFormatException("Cannot parse as number: " + obj);
    }

    /**
     * Safe string conversion for error messages.
     */
    private static String safeToString(Object obj) {
        if (obj == null) return "null";
        try {
            return obj.toString();
        } catch (Exception e) {
            return obj.getClass().getSimpleName() + "@" + System.identityHashCode(obj);
        }
    }
}
