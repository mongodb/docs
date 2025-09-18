package mongodb.comparison;

import java.util.List;
import java.util.Map;

/**
 * Result of a comparison operation with detailed error information and context.
 * Uses Java 21 sealed interfaces and records for type safety and immutable data structures.
 * Implements spec section 5.3 for error reporting.
 */
public sealed interface ComparisonResult
    permits ComparisonResult.Success, ComparisonResult.Failure {

    /**
     * Successful comparison result with optional metadata.
     */
    record Success(String message, Map<String, Object> metadata) implements ComparisonResult {
        public Success(String message) {
            this(message, Map.of());
        }
    }

    /**
     * Failed comparison result with detailed context and actionable suggestions.
     */
    record Failure(
        String message,
        String jsonPath,
        Object expected,
        Object actual,
        List<String> suggestions,
        Map<String, Object> context
    ) implements ComparisonResult {}

    /**
     * Check if the comparison was successful.
     */
    default boolean isMatch() {
        return this instanceof Success;
    }

    /**
     * Get the primary message for this result.
     */
    default String message() {
        return switch (this) {
            case Success success -> success.message();
            case Failure failure -> failure.message();
        };
    }

    /**
     * Get errors from this result (empty list for success).
     * Maintains compatibility with existing API.
     */
    default List<ComparisonError> errors() {
        return switch (this) {
            case Success ignored -> List.of();
            case Failure failure -> {
                // Check if we have multiple errors stored in context
                @SuppressWarnings("unchecked")
                List<ComparisonError> allErrors = (List<ComparisonError>) failure.context().get("allErrors");
                if (allErrors != null) {
                    yield allErrors;
                }
                // Otherwise return single error
                yield List.of(new ComparisonError(
                    failure.jsonPath(),
                    safeValueToString(failure.expected()),
                    safeValueToString(failure.actual()),
                    failure.message()
                ));
            }
        };
    }

    /**
     * Get summary message for compatibility.
     */
    default String summary() {
        return switch (this) {
            case Success success -> success.message();
            case Failure failure -> "Comparison failed: " + failure.message();
        };
    }

    /**
     * Create a successful comparison result.
     */
    static ComparisonResult success() {
        return new Success("Comparison successful");
    }

    /**
     * Create a successful comparison result with metadata.
     */
    static ComparisonResult success(String message, Map<String, Object> metadata) {
        return new Success(message, metadata);
    }

    /**
     * Create a failure result with detailed context.
     */
    static ComparisonResult failure(
        String message,
        String jsonPath,
        Object expected,
        Object actual,
        List<String> suggestions,
        Map<String, Object> context
    ) {
        return new Failure(message, jsonPath, expected, actual, suggestions, context);
    }

    /**
     * Create a simple failure result.
     */
    static ComparisonResult failure(String message) {
        return new Failure(
            message,
            "",
            null,
            null,
            List.of(),
            Map.of()
        );
    }

    /**
     * Create a failure result from a list of errors (compatibility).
     */
    static ComparisonResult failure(List<ComparisonError> errors) {
        if (errors.isEmpty()) {
            return failure("Unknown comparison failure");
        }

        ComparisonError firstError = errors.get(0);
        String message = errors.size() == 1
            ? firstError.message()
            : "Comparison failed with %d error(s)".formatted(errors.size());

        return new Failure(
            message,
            firstError.path(),
            firstError.expected(),
            firstError.actual(),
            List.of(),
            Map.of("errorCount", errors.size(), "allErrors", errors)
        );
    }

    /**
     * Assert that the comparison was successful, throwing if not.
     */
    default void assertSuccess() {
        if (!isMatch()) {
            throw new AssertionError(summary());
        }
    }

    /**
     * Print detailed comparison information to System.out.
     * Useful for debugging test failures.
     */
    default void printDebugInfo() {
        switch (this) {
            case Success success -> {
                System.out.println("✓ Comparison successful: " + success.message());
                if (!success.metadata().isEmpty()) {
                    System.out.println("  Metadata: " + success.metadata());
                }
            }
            case Failure failure -> {
                System.out.println("✗ Comparison failed: " + failure.message());
                if (!failure.jsonPath().isEmpty()) {
                    System.out.printf("  Path: %s%n", failure.jsonPath());
                }
                if (failure.expected() != null) {
                    System.out.printf("  Expected: %s%n", safeValueToString(failure.expected()));
                }
                if (failure.actual() != null) {
                    System.out.printf("  Actual: %s%n", safeValueToString(failure.actual()));
                }
                if (!failure.suggestions().isEmpty()) {
                    System.out.println("  Suggestions:");
                    for (String suggestion : failure.suggestions()) {
                        System.out.printf("    • %s%n", suggestion);
                    }
                }
                if (!failure.context().isEmpty()) {
                    System.out.println("  Additional context: " + failure.context());
                }
                System.out.println();
            }
        }
    }

    /**
     * Assert success and print debug info on failure.
     */
    default void assertSuccessWithDebug() {
        if (!isMatch()) {
            printDebugInfo();
            throw new AssertionError(summary());
        }
    }

    /**
     * Safely convert a value to string for error reporting.
     * Handles large arrays, complex objects, and null values appropriately.
     */
    public static String safeValueToString(Object value) {
        if (value == null) {
            return "<null>";  // Use angle brackets to distinguish from string "null"
        }

        // First, try to normalize using MongoTypeNormalizer to detect circular references
        try {
            Object normalized = MongoTypeNormalizer.normalizeValue(value);
            if (normalized != value) {
                // If normalization changed the value, apply formatting to the normalized value
                // This ensures that normalized collections still get proper formatting
                return formatValue(normalized);
            }
        } catch (Exception e) {
            // If normalization fails, continue with original logic
        }

        return formatValue(value);
    }

    /**
     * Apply formatting rules to a value (used for both original and normalized values).
     */
    private static String formatValue(Object value) {
        if (value == null) {
            return "<null>";
        }

        if (value instanceof String str) {
            if (str.length() > 200) {
                return "\"" + str.substring(0, 197) + "...\"";
            }
            return "\"" + str + "\"";
        }

        if (value instanceof List<?> list) {
            if (list.isEmpty()) {
                return "[]";
            }
            if (list.size() > 10) {
                return "Array with %d elements".formatted(list.size());
            }
            return list.toString();
        }

        if (value instanceof Map<?, ?> map) {
            if (map.isEmpty()) {
                return "{}";
            }
            // Summarize any map that has nested structures or more than 3 properties
            if (map.size() > 3 || hasNestedStructures(map)) {
                return "Object with %d properties".formatted(map.size());
            }
            return map.toString();
        }

        String str = value.toString();
        if (str.length() > 200) {
            return str.substring(0, 197) + "...";
        }
        return str;
    }

    /**
     * Check if a map contains nested structures (other maps or lists).
     */
    private static boolean hasNestedStructures(Map<?, ?> map) {
        return map.values().stream()
            .anyMatch(value -> value instanceof Map<?, ?> || value instanceof List<?>);
    }
}
