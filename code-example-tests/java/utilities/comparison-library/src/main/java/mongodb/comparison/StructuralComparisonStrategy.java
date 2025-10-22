package mongodb.comparison;

import mongodb.comparison.internal.ComparisonPipeline;
import java.util.List;
import java.util.Map;

/**
 * Handles structural comparisons for objects, arrays, and complex data structures.
 * This is separate from string comparisons to maintain clean separation of concerns.
 * Package-private - internal implementation detail for the Expect API.
 */
class StructuralComparisonStrategy {

    /**
     * Compares two objects structurally (comparing their structure and content).
     *
     * @param expected The expected value
     * @param actual The actual value
     * @param options Comparison options
     * @return ComparisonResult indicating success or failure
     */
    public static ComparisonResult compare(Object expected, Object actual, ComparisonOptions options) {
        // Use the existing ComparisonPipeline for structural comparison
        // This leverages all the recursion depth tracking and integration work
        return ComparisonPipeline.create(expected, actual, options, "", 0).execute();
    }

    /**
     * Determines if a value is a complex structure that benefits from structural comparison.
     */
    private static boolean isComplexStructure(Object value) {
        if (value == null) {
            return false;
        }

        return value instanceof Map<?, ?> ||
               value instanceof List<?> ||
               value.getClass().isArray() ||
               isCustomObject(value);
    }

    /**
     * Checks if a value is a custom object (not a primitive or common type).
     */
    private static boolean isCustomObject(Object value) {
        if (value == null) {
            return false;
        }

        Class<?> clazz = value.getClass();

        // Primitives and common types are not custom objects
        if (clazz.isPrimitive() ||
            Number.class.isAssignableFrom(clazz) ||
            CharSequence.class.isAssignableFrom(clazz) ||
            Boolean.class.equals(clazz) ||
            Character.class.equals(clazz)) {
            return false;
        }

        // Check for common Java types
        String className = clazz.getName();
        if (className.startsWith("java.lang.") ||
            className.startsWith("java.util.") ||
            className.startsWith("java.time.")) {
            return false;
        }

        return true;
    }
}
