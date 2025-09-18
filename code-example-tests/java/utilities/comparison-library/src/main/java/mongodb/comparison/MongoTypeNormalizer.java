package mongodb.comparison;

import java.time.Instant;
import java.util.*;

/**
 * Normalizes MongoDB types for comparison using Java 21 pattern matching.
 * This class handles the conversion of MongoDB-specific types to standard
 * Java types that can be consistently compared.
 *
 * Includes circular reference protection, null value handling, and Extended JSON format recognition and parsing.
 */
public class MongoTypeNormalizer {

    // Thread-local storage for tracking object identities to prevent infinite recursion
    private static final ThreadLocal<Set<Object>> visitedObjects =
        ThreadLocal.withInitial(() -> Collections.newSetFromMap(new IdentityHashMap<>()));

    // Recursion depth limit as additional safety
    private static final ThreadLocal<Integer> recursionDepth =
        ThreadLocal.withInitial(() -> 0);

    private static final int MAX_RECURSION_DEPTH = 50;

    /**
     * Normalize any value using Java 21 pattern matching for switch.
     * This is the main entry point for type normalization with circular reference protection.
     */
    public static Object normalizeValue(Object value) {
        try {
            return normalizeValueInternal(value);
        } finally {
            // Clean up thread-local storage to prevent memory leaks
            if (recursionDepth.get() == 0) {
                visitedObjects.get().clear();
            }
        }
    }

    /**
     * Normalize dates to consistent Extended JSON format for comparison.
     * Converts Date and Instant objects to Extended JSON date format.
     */
    public static Object normalizeDateToExtendedJson(Object value) {
        if (value instanceof Date date) {
            Map<String, String> dateObj = new HashMap<>();
            dateObj.put("$date", date.toInstant().toString());
            return dateObj;
        }

        if (value instanceof Instant instant) {
            Map<String, String> dateObj = new HashMap<>();
            dateObj.put("$date", instant.toString());
            return dateObj;
        }

        return value;
    }

    /**
     * Internal normalization with circular reference protection.
     */
    private static Object normalizeValueInternal(Object value) {
        // Handle null values
        if (value == null) {
            return null;
        }

        // Check recursion depth limit
        int currentDepth = recursionDepth.get();
        if (currentDepth > MAX_RECURSION_DEPTH) {
            return "[MAX_DEPTH_EXCEEDED]";
        }

        recursionDepth.set(currentDepth + 1);

        try {
            // Handle primitive types and strings first (no circular reference possible)
            if (isPrimitive(value)) {
                return switch (value) {
                    case String s -> s.trim();
                    case Date date -> normalizeDateToExtendedJson(date);
                    case Instant instant -> normalizeDateToExtendedJson(instant);
                    case UUID uuid -> uuid.toString();
                    default -> normalizeMongoTypes(value);
                };
            }

            // Check for Extended JSON patterns before checking for circular references
            if (ExtendedJsonParser.isExtendedJson(value)) {
                Object parsed = ExtendedJsonParser.parseExtendedJson(value);
                // If parsing succeeded and returned a different object, normalize the result
                if (parsed != value) {
                    return normalizeValueInternal(parsed);
                }
                // If parsing failed, continue with normal processing
            }

            // Check for circular references on complex objects using identity-based checking
            if (visitedObjects.get().contains(value)) {
                // Use a consistent placeholder that doesn't depend on memory address
                // This allows equivalent circular structures to be compared properly
                return "[CIRCULAR_REFERENCE:" + value.getClass().getSimpleName() + "]";
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

        } finally {
            recursionDepth.set(currentDepth);
        }
    }

    /**
     * Safely normalize MongoDB types using reflection to avoid ClassNotFoundException
     * when BSON library is not available.
     */
    private static Object normalizeMongoTypes(Object value) {
        if (value == null) {
            return null;
        }

        String className = value.getClass().getName();

        try {
            // Handle ObjectId using reflection
            if ("org.bson.types.ObjectId".equals(className)) {
                // Call toHexString() method via reflection
                return value.getClass().getMethod("toHexString").invoke(value);
            }

            // Handle Decimal128 using reflection
            if ("org.bson.types.Decimal128".equals(className)) {
                // Call toString() method
                return value.toString();
            }

            // If not a MongoDB type, return as-is
            return value;

        } catch (Exception e) {
            // If reflection fails or BSON classes aren't available,
            // just return the value as-is
            return value;
        }
    }

    /**
     * Check if a value is a primitive type that cannot have circular references.
     */
    private static boolean isPrimitive(Object value) {
        return value instanceof String ||
               value instanceof Number ||
               value instanceof Boolean ||
               isMongoType(value) ||
               value instanceof Date ||
               value instanceof Instant ||
               value instanceof Character ||
               value instanceof UUID;
    }

    /**
     * Safely check if an object is a MongoDB type without causing ClassNotFoundException.
     */
    private static boolean isMongoType(Object value) {
        if (value == null) {
            return false;
        }

        String className = value.getClass().getName();
        return "org.bson.types.ObjectId".equals(className) ||
               "org.bson.types.Decimal128".equals(className);
    }

    /**
     * Normalize a List, recursively normalizing all elements with null-safe handling.
     */
    private static List<Object> normalizeList(List<?> list) {
        if (list == null || list.isEmpty()) {
            return new ArrayList<>();
        }

        List<Object> normalized = new ArrayList<>();
        for (Object item : list) {
            normalized.add(normalizeValueInternal(item));
        }
        return normalized;
    }

    /**
     * Normalize a Map, ensuring consistent key-value normalization with null-safe handling.
     * Uses HashMap to support null values.
     */
    private static Map<Object, Object> normalizeMap(Map<?, ?> map) {
        if (map == null || map.isEmpty()) {
            return new HashMap<>();
        }

        // Use HashMap instead of LinkedHashMap and Map.of() to support null values
        Map<Object, Object> normalized = new HashMap<>();
        for (Map.Entry<?, ?> entry : map.entrySet()) {
            Object normalizedKey = normalizeValueInternal(entry.getKey());
            Object normalizedValue = normalizeValueInternal(entry.getValue());
            normalized.put(normalizedKey, normalizedValue);
        }
        return normalized;
    }

    /**
     * Normalize an array, converting to List for consistent handling.
     */
    private static List<Object> normalizeArray(Object[] array) {
        if (array == null || array.length == 0) {
            return new ArrayList<>();
        }

        List<Object> normalized = new ArrayList<>();
        for (Object item : array) {
            normalized.add(normalizeValueInternal(item));
        }
        return normalized;
    }

    /**
     * Format Date objects to ISO-8601 string for consistent comparison.
     */
    private static String formatDate(Date date) {
        return date.toInstant().toString();
    }

    /**
     * Check if two normalized values are equivalent for comparison purposes.
     * This handles special cases like numeric precision and MongoDB type variations.
     */
    public static boolean areValuesEquivalent(Object normalized1, Object normalized2) {
        if (Objects.equals(normalized1, normalized2)) {
            return true;
        }

        // Handle numeric precision issues
        if (normalized1 instanceof Number n1 && normalized2 instanceof Number n2) {
            return compareNumbers(n1, n2);
        }

        // Handle date string equivalence (different formats of the same instant)
        if (normalized1 instanceof String s1 && normalized2 instanceof String s2) {
            return areEquivalentDateStrings(s1, s2);
        }

        // Handle mixed numeric/string representations
        if (isNumericString(normalized1) && normalized2 instanceof Number) {
            try {
                Double d1 = Double.parseDouble(normalized1.toString());
                return compareNumbers(d1, (Number) normalized2);
            } catch (NumberFormatException e) {
                // Not a valid number, continue with normal comparison
            }
        }

        if (normalized1 instanceof Number && isNumericString(normalized2)) {
            try {
                Double d2 = Double.parseDouble(normalized2.toString());
                return compareNumbers((Number) normalized1, d2);
            } catch (NumberFormatException e) {
                // Not a valid number, continue with normal comparison
            }
        }

        return false;
    }

    /**
    * Compare numeric values with appropriate precision handling.
    * Allows cross-type numeric comparisons (int vs double, etc.)
     */
    private static boolean compareNumbers(Number n1, Number n2) {
        // Handle exact equality first
        if (n1.equals(n2)) {
            return true;
        }

        double d1 = n1.doubleValue();
        double d2 = n2.doubleValue();

        // Handle special float values
        if (Double.isNaN(d1) && Double.isNaN(d2)) {
            return true;
        }
        if (Double.isInfinite(d1) && Double.isInfinite(d2)) {
            return d1 == d2; // Positive/negative infinity
        }

        // For any mix with floating point types, use precision comparison
        // Use a more lenient precision for cross-type comparisons (float vs double)
        if (n1 instanceof Double || n2 instanceof Double ||
            n1 instanceof Float || n2 instanceof Float) {

            // Use different precision thresholds based on types involved
            double precision = (n1 instanceof Float || n2 instanceof Float) ? 1e-6 : 1e-10;
            return Math.abs(d1 - d2) < precision;
        }

        // For integer types, compare values even if types differ
        // This allows int(42) == long(42) == double(42.0)
        if (d1 == Math.floor(d1) && d2 == Math.floor(d2)) {
            return n1.longValue() == n2.longValue();
        }

        // Fall back to double comparison for mixed cases
        return Math.abs(d1 - d2) < 1e-10;
    }

    /**
     * Check if two date strings represent the same instant.
     * Handles different ISO-8601 formats that represent the same time.
     */
    private static boolean areEquivalentDateStrings(String s1, String s2) {
        // If strings are exactly equal, they're equivalent
        if (s1.equals(s2)) {
            return true;
        }

        // Try to parse both as ISO-8601 dates and compare
        try {
            Instant instant1 = Instant.parse(s1);
            Instant instant2 = Instant.parse(s2);
            return instant1.equals(instant2);
        } catch (Exception e) {
            // If either string is not a valid ISO-8601 date, fall back to string comparison
            return false;
        }
    }

    /**
     * Check if an object represents a numeric string.
     */
    private static boolean isNumericString(Object obj) {
        if (!(obj instanceof String str)) {
            return false;
        }

        try {
            Double.parseDouble(str);
            return true;
        } catch (NumberFormatException e) {
            return false;
        }
    }
}
