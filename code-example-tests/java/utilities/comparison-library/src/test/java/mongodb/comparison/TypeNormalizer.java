package mongodb.comparison;

import org.bson.types.Decimal128;
import org.bson.types.ObjectId;

import java.time.Instant;
import java.util.*;

/**
 * Normalizer with circular reference protection and improved type support.
 * This addresses critical issues found in real-world MongoDB Java driver documentation patterns.
 */
public class TypeNormalizer {

    // Thread-local storage for tracking visited objects to prevent infinite recursion
    private static final ThreadLocal<Set<Object>> visitedObjects = ThreadLocal.withInitial(HashSet::new);

    /**
     * Normalize any value with circular reference protection.
     */
    public static Object normalizeValue(Object value) {
        try {
            return normalizeValueInternal(value);
        } finally {
            // Clean up thread-local storage to prevent memory leaks
            visitedObjects.get().clear();
        }
    }

    private static Object normalizeValueInternal(Object value) {
        // Handle null values
        if (value == null) {
            return null;
        }

        // Handle primitive types and strings first (no circular reference possible)
        if (isPrimitive(value)) {
            return switch (value) {
                case String s -> s.trim();
                case ObjectId oid -> oid.toHexString();
                case Decimal128 decimal -> decimal.toString();
                case Date date -> formatDate(date);
                case Instant instant -> instant.toString();
                default -> value;
            };
        }

        // Check for circular references on complex objects
        if (visitedObjects.get().contains(value)) {
            return "[CIRCULAR_REFERENCE:" + value.getClass().getSimpleName() + "@" +
                   Integer.toHexString(System.identityHashCode(value)) + "]";
        }

        // Add to visited set
        visitedObjects.get().add(value);

        try {
            return switch (value) {
                case List<?> list -> normalizeList(list);
                case Map<?, ?> map -> normalizeMap(map);
                case Object[] array -> normalizeArray(array);
                default -> value;
            };
        } finally {
            // Remove from visited set when done processing this object
            visitedObjects.get().remove(value);
        }
    }

    /**
     * Check if a value is a primitive type that cannot have circular references
     */
    private static boolean isPrimitive(Object value) {
        return value instanceof String ||
               value instanceof Number ||
               value instanceof Boolean ||
               value instanceof ObjectId ||
               value instanceof Decimal128 ||
               value instanceof Date ||
               value instanceof Instant ||
               value instanceof Character ||
               value == null;
    }

    /**
     * Normalize a List, recursively normalizing all elements.
     */
    private static List<Object> normalizeList(List<?> list) {
        return list.stream()
            .map(TypeNormalizer::normalizeValueInternal)
            .toList();
    }

    /**
     * Normalize a Map, ensuring consistent key-value normalization.
     * Uses LinkedHashMap to preserve insertion order.
     */
    private static Map<String, Object> normalizeMap(Map<?, ?> map) {
        var normalized = new LinkedHashMap<String, Object>();
        map.forEach((key, value) -> {
            var normalizedKey = key != null ? key.toString() : "null";
            var normalizedValue = normalizeValueInternal(value);
            normalized.put(normalizedKey, normalizedValue);
        });
        return normalized;
    }

    /**
     * Normalize an array, converting to List for consistent handling.
     */
    private static List<Object> normalizeArray(Object[] array) {
        return Arrays.stream(array)
            .map(TypeNormalizer::normalizeValueInternal)
            .toList();
    }

    /**
     * Format Date objects to ISO-8601 string for consistent comparison.
     */
    private static String formatDate(Date date) {
        return date.toInstant().toString();
    }

    /**
     * Check if two normalized values are equivalent for comparison purposes.
     */
    public static boolean areValuesEquivalent(Object normalized1, Object normalized2) {
        if (Objects.equals(normalized1, normalized2)) {
            return true;
        }

        // Handle numeric precision issues
        if (normalized1 instanceof Number n1 && normalized2 instanceof Number n2) {
            return compareNumbers(n1, n2);
        }

        return false;
    }

    /**
     * Compare numeric values with appropriate precision handling.
     */
    private static boolean compareNumbers(Number n1, Number n2) {
        double d1 = n1.doubleValue();
        double d2 = n2.doubleValue();

        // Handle special float values
        if (Double.isNaN(d1) && Double.isNaN(d2)) {
            return true;
        }
        if (Double.isInfinite(d1) && Double.isInfinite(d2)) {
            return d1 == d2; // Positive/negative infinity
        }

        // For floating point types, use precision comparison
        if (n1 instanceof Double || n2 instanceof Double ||
            n1 instanceof Float || n2 instanceof Float) {
            return Math.abs(d1 - d2) < 1e-10;
        }

        // For integer types, compare as long
        return n1.longValue() == n2.longValue();
    }
}
