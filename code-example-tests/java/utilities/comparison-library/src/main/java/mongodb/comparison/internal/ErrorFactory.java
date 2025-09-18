package mongodb.comparison.internal;

import mongodb.comparison.ComparisonError;
import mongodb.comparison.ComparisonResult;

/**
 * Provides clean, consistent error creation with proper value formatting.
 */
public final class ErrorFactory {

    /**
     * Create a simple comparison error with proper value formatting.
     */
    public static ComparisonError createError(String path, Object expected, Object actual, String message) {
        return new ComparisonError(
            path != null ? path : "",
            ComparisonResult.safeValueToString(expected),
            ComparisonResult.safeValueToString(actual),
            message
        );
    }

    /**
     * Create a type mismatch error.
     */
    public static ComparisonError createTypeMismatch(String path, Object expected, Object actual) {
        String expectedType = getTypeName(expected);
        String actualType = getTypeName(actual);

        // Check for circular references in the string representations
        String expectedStr = ComparisonResult.safeValueToString(expected);
        String actualStr = ComparisonResult.safeValueToString(actual);

        if (expectedStr.contains("CIRCULAR_REFERENCE") || actualStr.contains("CIRCULAR_REFERENCE")) {
            return createError(
                path,
                expected,
                actual,
                "Circular reference detected - object references itself recursively, cannot compare with non-circular object"
            );
        }

        return createError(
            path,
            expected,
            actual,
            "Type mismatch: expected %s but got %s".formatted(expectedType, actualType)
        );
    }

    /**
     * Create a value mismatch error.
     */
    public static ComparisonError createValueMismatch(String path, Object expected, Object actual) {
        return createError(
            path,
            expected,
            actual,
            "Value mismatch"
        );
    }

    /**
     * Create a null value mismatch error.
     */
    public static ComparisonError createNullMismatch(String path, Object expected, Object actual) {
        return createError(path, expected, actual, "Null value mismatch");
    }

    /**
     * Create an array size mismatch error.
     */
    public static ComparisonError createArraySizeMismatch(String path, int expectedSize, int actualSize) {
        return createError(
            path,
            "Array with %d elements".formatted(expectedSize),
            "Array with %d elements".formatted(actualSize),
            "Array sizes don't match: expected %d elements but got %d".formatted(expectedSize, actualSize)
        );
    }

    /**
     * Create an ordered array size mismatch error.
     */
    public static ComparisonError createOrderedArraySizeMismatch(String path, int expectedSize, int actualSize) {
        return createError(
            path,
            "Array with %d elements".formatted(expectedSize),
            "Array with %d elements".formatted(actualSize),
            "Array sizes don't match in ordered comparison: expected %d elements but got %d".formatted(expectedSize, actualSize)
        );
    }

    /**
     * Create an unordered array size mismatch error.
     */
    public static ComparisonError createUnorderedArraySizeMismatch(String path, int expectedSize, int actualSize) {
        return createError(
            path,
            "Array with %d elements".formatted(expectedSize),
            "Array with %d elements".formatted(actualSize),
            "Array sizes don't match in unordered comparison: expected %d elements but got %d".formatted(expectedSize, actualSize)
        );
    }

    /**
     * Create an error for unordered array element not found.
     */
    public static ComparisonError createUnorderedElementNotFound(String path, Object expectedElement) {
        return createError(
            path,
            expectedElement,
            "<not found>",
            "Expected element not found in actual array during unordered matching"
        );
    }

    /**
     * Create a missing field error.
     */
    public static ComparisonError createMissingField(String path, String fieldName) {
        return createError(
            path,
            "field '%s'".formatted(fieldName),
            "<missing>",
            "Missing required field: %s".formatted(fieldName)
        );
    }

    /**
     * Create an unexpected field error.
     */
    public static ComparisonError createUnexpectedField(String path, String fieldName, Object value) {
        return createError(
            path,
            "<not expected>",
            value,
            "Unexpected field: %s".formatted(fieldName)
        );
    }

    /**
     * Create a string content mismatch error.
     */
    public static ComparisonError createStringMismatch(String path, String expected, String actual) {
        return createError(
            path,
            expected,
            actual,
            "String values do not match"
        );
    }

    /**
     * Create a circular reference error.
     */
    public static ComparisonError createCircularReferenceError(String path, Object value) {
        return createError(
            path,
            "Object without circular reference",
            "Object with circular reference",
            "Circular reference detected - object references itself recursively"
        );
    }

    /**
     * Get a human-readable type name for error messages.
     */
    private static String getTypeName(Object value) {
        if (value == null) {
            return "null";
        }

        return switch (value) {
            case String s -> "String";
            case Integer i -> "Number";
            case Long l -> "Number";
            case Double d -> "Number";
            case Float f -> "Number";
            case Boolean b -> "Boolean";
            case java.util.List<?> list -> "Array";
            case java.util.Map<?, ?> map -> "Object";
            default -> value.getClass().getSimpleName();
        };
    }
}
