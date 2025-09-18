package mongodb.comparison;

import org.bson.types.Decimal128;
import org.bson.types.ObjectId;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.*;
import java.util.regex.Pattern;

/**
 * Parser for MongoDB Extended JSON format.
 * Handles conversion of Extended JSON objects to their equivalent Java types
 * for consistent comparison across different MongoDB driver output formats.
 *
 * Supports all major Extended JSON types:
 * - ObjectId: { "$oid": "..." }
 * - Date: { "$date": "..." } or { "$date": { "$numberLong": "..." }}
 * - Numbers: { "$numberLong": "..." }, { "$numberInt": "..." }, etc.
 * - Special values: { "$uuid": "..." }, { "$timestamp": {...}}, etc.
 */
public class ExtendedJsonParser {

    // Extended JSON type markers
    private static final String OID_MARKER = "$oid";
    private static final String DATE_MARKER = "$date";
    private static final String NUMBER_LONG_MARKER = "$numberLong";
    private static final String NUMBER_INT_MARKER = "$numberInt";
    private static final String NUMBER_DOUBLE_MARKER = "$numberDouble";
    private static final String NUMBER_DECIMAL_MARKER = "$numberDecimal";
    private static final String UUID_MARKER = "$uuid";
    private static final String TIMESTAMP_MARKER = "$timestamp";
    private static final String MIN_KEY_MARKER = "$minKey";
    private static final String MAX_KEY_MARKER = "$maxKey";
    private static final String REGEX_MARKER = "$regularExpression";

    // Pattern for ObjectId validation
    private static final Pattern OBJECT_ID_PATTERN = Pattern.compile("^[0-9a-fA-F]{24}$");

    // Pattern for UUID validation
    private static final Pattern UUID_PATTERN = Pattern.compile(
        "^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$"
    );

    /**
     * Check if an object represents an Extended JSON pattern.
     */
    public static boolean isExtendedJson(Object value) {
        if (!(value instanceof Map<?, ?> map)) {
            return false;
        }

        // Check for any of the Extended JSON markers
        return map.containsKey(OID_MARKER) ||
               map.containsKey(DATE_MARKER) ||
               map.containsKey(NUMBER_LONG_MARKER) ||
               map.containsKey(NUMBER_INT_MARKER) ||
               map.containsKey(NUMBER_DOUBLE_MARKER) ||
               map.containsKey(NUMBER_DECIMAL_MARKER) ||
               map.containsKey(UUID_MARKER) ||
               map.containsKey(TIMESTAMP_MARKER) ||
               map.containsKey(MIN_KEY_MARKER) ||
               map.containsKey(MAX_KEY_MARKER) ||
               map.containsKey(REGEX_MARKER);
    }

    /**
     * Parse an Extended JSON object to its equivalent Java type.
     * Returns the original object if it's not a valid Extended JSON pattern.
     */
    public static Object parseExtendedJson(Object value) {
        if (!(value instanceof Map<?, ?> map)) {
            return value;
        }

        // Try to parse each Extended JSON type
        if (map.containsKey(OID_MARKER)) {
            return parseObjectId(map);
        }

        if (map.containsKey(DATE_MARKER)) {
            return parseDate(map);
        }

        if (map.containsKey(NUMBER_LONG_MARKER)) {
            return parseNumberLong(map);
        }

        if (map.containsKey(NUMBER_INT_MARKER)) {
            return parseNumberInt(map);
        }

        if (map.containsKey(NUMBER_DOUBLE_MARKER)) {
            return parseNumberDouble(map);
        }

        if (map.containsKey(NUMBER_DECIMAL_MARKER)) {
            return parseNumberDecimal(map);
        }

        if (map.containsKey(UUID_MARKER)) {
            return parseUuid(map);
        }

        if (map.containsKey(TIMESTAMP_MARKER)) {
            return parseTimestamp(map);
        }

        if (map.containsKey(MIN_KEY_MARKER)) {
            return parseMinKey(map);
        }

        if (map.containsKey(MAX_KEY_MARKER)) {
            return parseMaxKey(map);
        }

        if (map.containsKey(REGEX_MARKER)) {
            return parseRegularExpression(map);
        }

        // Not an Extended JSON pattern, return as-is
        return value;
    }

    /**
     * Parse ObjectId Extended JSON: { "$oid": "507f1f77bcf86cd799439011" }
     */
    private static Object parseObjectId(Map<?, ?> map) {
        try {
            Object oidValue = map.get(OID_MARKER);
            if (oidValue instanceof String oidStr) {
                // Validate ObjectId format
                if (OBJECT_ID_PATTERN.matcher(oidStr).matches()) {
                    return new ObjectId(oidStr);
                }
            }
        } catch (Exception e) {
            // If parsing fails, return original map
        }
        return map;
    }

    /**
     * Parse Date Extended JSON in various formats:
     * - { "$date": "2020-09-30T18:22:51.648Z" } (Relaxed)
     * - { "$date": { "$numberLong": "1601499609000" }} (Extended)
     * - { "$date": 1601499609 } (Strict)
     */
    private static Object parseDate(Map<?, ?> map) {
        try {
            Object dateValue = map.get(DATE_MARKER);

            if (dateValue instanceof String dateStr) {
                // Relaxed format: ISO-8601 string
                return Date.from(Instant.parse(dateStr));
            }

            if (dateValue instanceof Number number) {
                // Strict format: Unix timestamp as number
                return new Date(number.longValue());
            }

            if (dateValue instanceof Map<?, ?> dateMap && dateMap.containsKey(NUMBER_LONG_MARKER)) {
                // Extended format: { "$numberLong": "1601499609000" }
                Object longValue = dateMap.get(NUMBER_LONG_MARKER);
                if (longValue instanceof String longStr) {
                    return new Date(Long.parseLong(longStr));
                }
                if (longValue instanceof Number number) {
                    return new Date(number.longValue());
                }
            }
        } catch (Exception e) {
            // If parsing fails, return original map
        }
        return map;
    }

    /**
     * Parse NumberLong Extended JSON: { "$numberLong": "36520312" }
     */
    private static Object parseNumberLong(Map<?, ?> map) {
        try {
            Object longValue = map.get(NUMBER_LONG_MARKER);
            if (longValue instanceof String longStr) {
                return Long.parseLong(longStr);
            }
            if (longValue instanceof Number number) {
                return number.longValue();
            }
        } catch (Exception e) {
            // If parsing fails, return original map
        }
        return map;
    }

    /**
     * Parse NumberInt Extended JSON: { "$numberInt": "10" }
     */
    private static Object parseNumberInt(Map<?, ?> map) {
        try {
            Object intValue = map.get(NUMBER_INT_MARKER);
            if (intValue instanceof String intStr) {
                return Integer.parseInt(intStr);
            }
            if (intValue instanceof Number number) {
                return number.intValue();
            }
        } catch (Exception e) {
            // If parsing fails, return original map
        }
        return map;
    }

    /**
     * Parse NumberDouble Extended JSON: { "$numberDouble": "10.5" }
     * Handles special values like "Infinity", "-Infinity", "NaN"
     */
    private static Object parseNumberDouble(Map<?, ?> map) {
        try {
            Object doubleValue = map.get(NUMBER_DOUBLE_MARKER);
            if (doubleValue instanceof String doubleStr) {
                return switch (doubleStr) {
                    case "Infinity" -> Double.POSITIVE_INFINITY;
                    case "-Infinity" -> Double.NEGATIVE_INFINITY;
                    case "NaN" -> Double.NaN;
                    default -> Double.parseDouble(doubleStr);
                };
            }
            if (doubleValue instanceof Number number) {
                return number.doubleValue();
            }
        } catch (Exception e) {
            // If parsing fails, return original map
        }
        return map;
    }

    /**
     * Parse NumberDecimal Extended JSON: { "$numberDecimal": "10.99" }
     */
    private static Object parseNumberDecimal(Map<?, ?> map) {
        try {
            Object decimalValue = map.get(NUMBER_DECIMAL_MARKER);
            if (decimalValue instanceof String decimalStr) {
                return new Decimal128(new BigDecimal(decimalStr));
            }
        } catch (Exception e) {
            // If parsing fails, return original map
        }
        return map;
    }

    /**
     * Parse UUID Extended JSON: { "$uuid": "3b241101-e2bb-4255-8caf-4136c566a962" }
     */
    private static Object parseUuid(Map<?, ?> map) {
        try {
            Object uuidValue = map.get(UUID_MARKER);
            if (uuidValue instanceof String uuidStr) {
                // Validate UUID format
                if (UUID_PATTERN.matcher(uuidStr).matches()) {
                    return UUID.fromString(uuidStr);
                }
            }
        } catch (Exception e) {
            // If parsing fails, return original map
        }
        return map;
    }

    /**
     * Parse Timestamp Extended JSON: { "$timestamp": {"t": 1565545664, "i": 1} }
     */
    private static Object parseTimestamp(Map<?, ?> map) {
        try {
            Object timestampValue = map.get(TIMESTAMP_MARKER);
            if (timestampValue instanceof Map<?, ?> timestampMap) {
                Object t = timestampMap.get("t");
                Object i = timestampMap.get("i");

                if (t instanceof Number && i instanceof Number) {
                    // Return a normalized representation
                    Map<String, Long> result = new HashMap<>();
                    result.put("timestamp", ((Number) t).longValue());
                    result.put("increment", ((Number) i).longValue());
                    return result;
                }
            }
        } catch (Exception e) {
            // If parsing fails, return original map
        }
        return map;
    }

    /**
     * Parse MinKey Extended JSON: { "$minKey": 1 }
     */
    private static Object parseMinKey(Map<?, ?> map) {
        // MinKey is a special BSON type, normalize to a consistent representation
        return "MIN_KEY";
    }

    /**
     * Parse MaxKey Extended JSON: { "$maxKey": 1 }
     */
    private static Object parseMaxKey(Map<?, ?> map) {
        // MaxKey is a special BSON type, normalize to a consistent representation
        return "MAX_KEY";
    }

    /**
     * Parse RegularExpression Extended JSON: { "$regularExpression": {"pattern": "^H", "options": "i"} }
     */
    private static Object parseRegularExpression(Map<?, ?> map) {
        try {
            Object regexValue = map.get(REGEX_MARKER);
            if (regexValue instanceof Map<?, ?> regexMap) {
                Object pattern = regexMap.get("pattern");
                Object options = regexMap.get("options");

                // Return a normalized representation
                Map<String, String> result = new HashMap<>();
                result.put("pattern", pattern != null ? pattern.toString() : "");
                result.put("options", options != null ? options.toString() : "");
                return result;
            }
        } catch (Exception e) {
            // If parsing fails, return original map
        }
        return map;
    }
}
