package mongodb.comparison;

import java.util.List;
import java.util.Map;

/**
 * Analyzes content to intelligently determine the best comparison strategy.
 * No need for users to specify complex comparison types.
 */
public class ContentAnalyzer {

    /**
     * Determines whether string-based or structural comparison should be used.
     */
    public static boolean shouldUseStringComparison(Object expected, Object actual) {
        // Use string comparison if expected is a string with ellipsis patterns
        // This allows comparing JSON patterns against objects
        if (expected instanceof String) {
            String expectedStr = (String) expected;

            // If expected contains ellipsis patterns, use string comparison for pattern matching
            if (containsEllipsisPattern(expectedStr)) {
                return true;
            }

            // If both are strings and structured content (JSON-like), check for multi-line patterns
            if (actual instanceof String) {
                String actualStr = (String) actual;
                if (looksLikeStructuredContent(expectedStr) && looksLikeStructuredContent(actualStr)) {
                    // For multi-line content (JSON Lines), prefer string comparison for better pattern handling
                    if (isMultiLineContent(expectedStr) || isMultiLineContent(actualStr)) {
                        return true;
                    }
                    return false;
                }
                // Default to string comparison for plain strings
                return true;
            }

            // If expected is a structured string (JSON-like) but actual is not a string,
            // use string comparison to allow JSON pattern matching against objects/arrays
            if (looksLikeStructuredContent(expectedStr)) {
                return true;
            }

            // If expected is a string but actual is not, use structural comparison
            // unless the expected string contains ellipsis (handled above)
            return false;
        }

        // For non-string expected values, always use structural comparison
        return false;
    }

    /**
     * Determines whether string-based or structural comparison should be used,
     * taking into account the comparison options.
     */
    public static boolean shouldUseStringComparison(Object expected, Object actual, ComparisonOptions options) {
        // For unordered comparison with JSON Lines format, use string comparison
        // to handle the line-by-line comparison properly
        if (options.comparisonType() == ComparisonType.UNORDERED &&
            expected instanceof String expectedStr &&
            looksLikeJsonLines(expectedStr)) {
            // If expected is JSON Lines and actual is a List/Array, use string comparison
            // to convert the List to JSON Lines format and compare with proper unordered logic
            if (actual instanceof java.util.List || (actual != null && actual.getClass().isArray())) {
                return true;
            }
            // If both are strings, also use string comparison
            if (actual instanceof String actualStr && looksLikeJsonLines(actualStr)) {
                return true;
            }
        }

        // For unordered comparison with JSON ellipsis patterns, still use string comparison
        // but the string comparison strategy will handle unordered comparison internally

        // Fall back to the original logic
        return shouldUseStringComparison(expected, actual);
    }

    /**
     * Determines the best array comparison strategy for unordered comparison.
     */
    public static ArrayComparisonStrategy determineArrayStrategy(List<?> expected, List<?> actual) {
        // Check if arrays contain ellipsis patterns
        if (containsArrayEllipsis(expected)) {
            // Use backtracking for ellipsis patterns with complex objects
            if (hasComplexObjects(expected) || hasComplexObjects(actual)) {
                return ArrayComparisonStrategy.BACKTRACKING;
            }
            // Use hybrid for ellipsis with mixed content
            return ArrayComparisonStrategy.HYBRID;
        }

        // Performance-based strategy selection
        int maxSize = Math.max(expected.size(), actual.size());

        // For large arrays, use set-based comparison for performance
        if (maxSize > 100) {
            return ArrayComparisonStrategy.SET_BASED;
        }

        // For medium arrays with complex objects, use backtracking
        if (maxSize > 20 && (hasComplexObjects(expected) || hasComplexObjects(actual))) {
            return ArrayComparisonStrategy.BACKTRACKING;
        }

        // Check content composition
        boolean hasPrimitives = hasPrimitiveElements(expected) || hasPrimitiveElements(actual);
        boolean hasObjects = hasComplexObjects(expected) || hasComplexObjects(actual);

        if (hasPrimitives && hasObjects) {
            // Mixed content - use hybrid strategy
            return ArrayComparisonStrategy.HYBRID;
        } else if (hasObjects) {
            // Complex objects - use backtracking for optimal matching
            return ArrayComparisonStrategy.BACKTRACKING;
        } else {
            // Primitives only - use efficient set-based comparison
            return ArrayComparisonStrategy.SET_BASED;
        }
    }

    /**
     * Checks if a string contains ellipsis patterns like "..." or "Hello..."
     */
    private static boolean containsEllipsisPattern(String str) {
        return str != null && (str.contains("...") || str.equals("..."));
    }

    /**
     * Checks if a string looks like structured content (JSON, XML, etc.)
     */
    private static boolean looksLikeStructuredContent(String str) {
        if (str == null || str.trim().isEmpty()) {
            return false;
        }

        String trimmed = str.trim();

        // JSON-like patterns
        return (trimmed.startsWith("{") && trimmed.endsWith("}")) ||
               (trimmed.startsWith("[") && trimmed.endsWith("]")) ||
               // XML-like patterns
               (trimmed.startsWith("<") && trimmed.endsWith(">"));
    }

    /**
     * Checks if a string contains multiple lines of content
     */
    private static boolean isMultiLineContent(String str) {
        if (str == null) {
            return false;
        }

        return str.contains("\n") || str.contains("\r");
    }

    /**
     * Check if a string looks like JSON Lines format (multiple JSON objects separated by newlines/spaces).
     */
    private static boolean looksLikeJsonLines(String str) {
        if (str == null || str.trim().isEmpty()) {
            return false;
        }

        String trimmed = str.trim();

        // Must start and end with braces (JSON objects)
        if (!trimmed.startsWith("{") || !trimmed.endsWith("}")) {
            return false;
        }

        // Look for patterns indicating multiple JSON objects:
        // 1. Contains "} {" pattern (objects separated by space)
        // 2. Contains "}\n{" pattern (objects separated by newline)
        return trimmed.contains("} {") ||
               trimmed.contains("}\n{") ||
               trimmed.contains("}\r\n{");
    }

    /**
     * Checks if a list contains ellipsis elements ("...")
     */
    private static boolean containsArrayEllipsis(List<?> list) {
        if (list == null) {
            return false;
        }

        return list.stream().anyMatch(item -> "...".equals(item));
    }

    /**
     * Checks if a list contains complex objects (not primitives)
     */
    private static boolean hasComplexObjects(List<?> list) {
        if (list == null || list.isEmpty()) {
            return false;
        }

        return list.stream().anyMatch(ContentAnalyzer::isComplexObject);
    }

    /**
     * Checks if a list contains primitive elements
     */
    private static boolean hasPrimitiveElements(List<?> list) {
        if (list == null || list.isEmpty()) {
            return false;
        }

        return list.stream().anyMatch(ContentAnalyzer::isPrimitiveType);
    }

    /**
     * Determines if an object is a complex structure
     */
    private static boolean isComplexObject(Object obj) {
        if (obj == null) {
            return false;
        }

        return obj instanceof Map<?, ?> ||
               obj instanceof List<?> ||
               obj.getClass().isArray() ||
               isCustomObject(obj);
    }

    /**
     * Determines if an object is a primitive type
     */
    private static boolean isPrimitiveType(Object obj) {
        if (obj == null) {
            return true; // Treat null as primitive
        }

        return obj instanceof String ||
               obj instanceof Number ||
               obj instanceof Boolean ||
               obj instanceof Character;
    }

    /**
     * Checks if an object is a custom type (not a standard Java type)
     */
    private static boolean isCustomObject(Object obj) {
        if (obj == null) {
            return false;
        }

        Class<?> clazz = obj.getClass();

        // Primitives and wrapper types are not custom objects
        if (clazz.isPrimitive() ||
            Number.class.isAssignableFrom(clazz) ||
            CharSequence.class.isAssignableFrom(clazz) ||
            Boolean.class.equals(clazz) ||
            Character.class.equals(clazz)) {
            return false;
        }

        // Standard Java types are not custom objects
        String className = clazz.getName();
        if (className.startsWith("java.lang.") ||
            className.startsWith("java.util.") ||
            className.startsWith("java.time.")) {
            return false;
        }

        return true;
    }

    /**
     * Enum representing different array comparison strategies
     */
    public enum ArrayComparisonStrategy {
        SET_BASED,      // Frequency-based comparison for primitives
        HYBRID,         // Mixed strategy for primitives and objects
        BACKTRACKING    // Optimal assignment for complex objects
    }
}