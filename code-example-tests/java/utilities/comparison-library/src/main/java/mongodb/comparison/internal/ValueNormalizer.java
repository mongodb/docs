package mongodb.comparison.internal;

import java.time.Instant;
import java.util.*;
import java.time.format.DateTimeFormatter;

/**
 * Normalize content using Java 21 switch expressions.
 */
public final class ValueNormalizer {

    private static final int MAX_DEPTH = 20;

    /**
     * Normalize any value to a comparable form with comprehensive type handling.
     * Uses a single switch expression to handle all normalization cases cleanly.
     */
    public static Object normalize(Object value) {
        return normalize(value, 0);
    }

    private static Object normalize(Object value, int depth) {
        // Depth protection
        if (depth > MAX_DEPTH) {
            return "[MAX_DEPTH:" + depth + "]";
        }

        // Null handling
        if (value == null) {
            return null;
        }

        // Main normalization switch - handles all types in one place
        return switch (value) {

            // Primitive types - direct normalization
            case String s -> normalizeString(s);
            case Boolean b -> b;
            case Character c -> c.toString();

            // MongoDB types - handle via reflection to avoid ClassNotFoundException
            case UUID uuid -> uuid.toString();

            // Number types - handle specific numeric types first, then general Number
            case Integer i -> i;
            case Long l -> l;
            case Double d -> d;
            case Float f -> f.doubleValue(); // Convert float to double for consistency
            case Number n -> n; // Catch other Number types

            // Date types - handle specific date types first
            case Date date -> normalizeDateValue(date);
            case Instant instant -> normalizeInstantValue(instant);

            // Collections - recursive normalization
            case List<?> list -> normalizeList(list, depth);
            case Object[] array -> normalizeArray(array, depth);
            case Map<?, ?> map -> normalizeMap(map, depth);

            // Default - handle MongoDB types safely, then return as-is for unknown types
            default -> normalizeMongoTypes(value);
        };
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

            // Handle Document using reflection
            if ("org.bson.Document".equals(className)) {
                // Document implements Map, so we can cast it safely
                if (value instanceof Map) {
                    return normalizeMap((Map<?, ?>) value, 0);
                }
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
     * String normalization with MongoDB-specific handling.
     * Enhanced to handle JSON strings with ellipsis patterns.
     */
    private static Object normalizeString(String str) {
        if (str == null) {
            return null;
        }

        String trimmed = str.trim();

        // Apply Unicode normalization first
        trimmed = normalizeUnicode(trimmed);

        // Handle any JSON-like strings (with or without ellipsis) - key enhancement for MongoDB docs
        if (isJsonString(trimmed)) {
            Object parsed = parseJsonString(trimmed);
            if (parsed != null && !parsed.equals(trimmed)) {
                return normalize(parsed);  // Return the parsed object, not toString()
            }
        }

        // Handle Extended JSON strings
        if (isExtendedJsonString(trimmed)) {
            Object parsed = parseExtendedJsonString(trimmed);
            if (parsed != null && !parsed.equals(trimmed)) {
                return normalize(parsed);  // Return the parsed object, not toString()
            }
        }

        return trimmed;
    }

    /**
     * Decimal128 normalization.
     */
    /**
     * Date normalization to ISO string format.
     */
    private static String normalizeDateValue(Date date) {
        return DateTimeFormatter.ISO_INSTANT.format(date.toInstant());
    }

    /**
     * Instant normalization to ISO string format.
     */
    private static String normalizeInstantValue(Instant instant) {
        return DateTimeFormatter.ISO_INSTANT.format(instant);
    }

    /**
     * List normalization with recursive element handling.
     */
    private static List<Object> normalizeList(List<?> list, int depth) {
        if (list == null || list.isEmpty()) {
            return new ArrayList<>();
        }

        List<Object> normalized = new ArrayList<>();
        for (Object item : list) {
            normalized.add(normalize(item, depth + 1));
        }
        return normalized;
    }

    /**
     * Array normalization with conversion to list.
     */
    private static List<Object> normalizeArray(Object[] array, int depth) {
        if (array == null || array.length == 0) {
            return new ArrayList<>();
        }

        List<Object> normalized = new ArrayList<>();
        for (Object item : array) {
            normalized.add(normalize(item, depth + 1));
        }
        return normalized;
    }

    /**
     * Map normalization with Extended JSON detection and recursive value handling.
     */
    private static Object normalizeMap(Map<?, ?> map, int depth) {
        if (map == null || map.isEmpty()) {
            return new HashMap<>();
        }

        // Check for Extended JSON patterns first
        Object extendedJsonValue = extractExtendedJsonValue(map);
        if (extendedJsonValue != null) {
            return normalize(extendedJsonValue, depth + 1);
        }

        // Regular map normalization
        Map<Object, Object> normalized = new HashMap<>();
        for (Map.Entry<?, ?> entry : map.entrySet()) {
            Object normalizedKey = normalize(entry.getKey(), depth + 1);
            Object normalizedValue = normalize(entry.getValue(), depth + 1);
            normalized.put(normalizedKey, normalizedValue);
        }
        return normalized;
    }

    /**
     * Extract Extended JSON type values (ObjectId, Date, etc.) from map structures.
     */
    private static Object extractExtendedJsonValue(Map<?, ?> map) {
        // ObjectId: {"$oid": "..."}
        if (map.containsKey("$oid")) {
            Object oidValue = map.get("$oid");
            return oidValue instanceof String ? oidValue : null;
        }

        // Date: {"$date": "..."}
        if (map.containsKey("$date")) {
            return normalizeExtendedJsonDate(map.get("$date"));
        }

        // NumberLong: {"$numberLong": "..."}
        if (map.containsKey("$numberLong")) {
            Object value = map.get("$numberLong");
            return parseNumericString(value, Long::parseLong);
        }

        // NumberInt: {"$numberInt": "..."}
        if (map.containsKey("$numberInt")) {
            Object value = map.get("$numberInt");
            return parseNumericString(value, Integer::parseInt);
        }

        // NumberDouble: {"$numberDouble": "..."}
        if (map.containsKey("$numberDouble")) {
            Object value = map.get("$numberDouble");
            return parseNumericString(value, Double::parseDouble);
        }

        // NumberDecimal: {"$numberDecimal": "..."}
        if (map.containsKey("$numberDecimal")) {
            Object value = map.get("$numberDecimal");
            if (value instanceof String str) {
                try {
                    return new java.math.BigDecimal(str);
                } catch (NumberFormatException e) {
                    return str; // Keep as string if parsing fails
                }
            }
        }

        return null; // Not an Extended JSON pattern
    }

    /**
     * Normalize Extended JSON date values.
     */
    private static Object normalizeExtendedJsonDate(Object dateValue) {
        if (dateValue instanceof String dateStr) {
            try {
                Instant instant = Instant.parse(dateStr);
                return DateTimeFormatter.ISO_INSTANT.format(instant);
            } catch (Exception e) {
                return dateStr; // Keep as string if parsing fails
            }
        }

        if (dateValue instanceof Number number) {
            try {
                Instant instant = Instant.ofEpochMilli(number.longValue());
                return DateTimeFormatter.ISO_INSTANT.format(instant);
            } catch (Exception e) {
                return number; // Keep as number if conversion fails
            }
        }

        // Handle nested Extended JSON like {"$numberLong": "1640000000000"}
        if (dateValue instanceof Map<?, ?> map) {
            if (map.containsKey("$numberLong")) {
                Object longValue = map.get("$numberLong");
                if (longValue instanceof String longStr) {
                    try {
                        long timestamp = Long.parseLong(longStr);
                        Instant instant = Instant.ofEpochMilli(timestamp);
                        return DateTimeFormatter.ISO_INSTANT.format(instant);
                    } catch (NumberFormatException e) {
                        // Fall through to return as-is
                    }
                } else if (longValue instanceof Number number) {
                    try {
                        Instant instant = Instant.ofEpochMilli(number.longValue());
                        return DateTimeFormatter.ISO_INSTANT.format(instant);
                    } catch (Exception e) {
                        // Fall through to return as-is
                    }
                }
            }
        }

        return dateValue; // Return as-is for other types
    }

    /**
     * Parse numeric strings with error handling.
     */
    private static Object parseNumericString(Object value, java.util.function.Function<String, Object> parser) {
        if (value instanceof String str) {
            try {
                return parser.apply(str);
            } catch (NumberFormatException e) {
                return str; // Keep as string if parsing fails
            }
        }
        return value; // Return as-is if not a string
    }

    /**
     * Check if a string might be Extended JSON.
     */
    private static boolean isExtendedJsonString(String str) {
        return str.startsWith("{") && str.endsWith("}") &&
               (str.contains("$oid") || str.contains("$date") ||
                str.contains("$numberLong") || str.contains("$numberInt") ||
                str.contains("$numberDouble") || str.contains("$numberDecimal"));
    }

    /**
     * Check if a string is JSON (with or without ellipsis patterns).
     * Enhanced detection for MongoDB documentation patterns.
     */
    private static boolean isJsonString(String str) {
        return (str.startsWith("{") && str.endsWith("}")) ||
               (str.startsWith("[") && str.endsWith("]"));
    }

    /**
     * Parse JSON string (with or without ellipsis patterns).
     * This creates a Map/List structure with ellipsis values preserved for comparison.
     */
    private static Object parseJsonString(String jsonStr) {
        try {
            // Use the same parsing logic for all JSON strings
            if (jsonStr.startsWith("{") && jsonStr.endsWith("}")) {
                return parseJsonObjectWithEllipsis(jsonStr);
            } else if (jsonStr.startsWith("[") && jsonStr.endsWith("]")) {
                return parseJsonArrayWithEllipsis(jsonStr);
            }
        } catch (Exception e) {
            // Parsing failed, return null to indicate no transformation
        }
        return null;
    }

    /**
     * Parse JSON object string with ellipsis support.
     * Handles patterns like {"_id": "...", "name": "test", "data": "..."}.
     */
    private static Map<String, Object> parseJsonObjectWithEllipsis(String jsonStr) {
        Map<String, Object> result = new HashMap<>();

        // Remove outer braces
        String content = jsonStr.substring(1, jsonStr.length() - 1).trim();

        // Simple field parsing - handles quoted keys and values
        String[] fields = splitJsonFields(content);

        for (String field : fields) {
            String[] keyValue = splitJsonKeyValue(field);
            if (keyValue.length == 2) {
                String key = unquoteJson(keyValue[0].trim());
                String value = keyValue[1].trim();
                Object parsedValue = parseJsonValue(value);
                result.put(key, parsedValue);
            }
        }

        return result;
    }

    /**
     * Parse JSON array string with ellipsis support.
     */
    private static java.util.List<Object> parseJsonArrayWithEllipsis(String jsonStr) {
        java.util.List<Object> result = new ArrayList<>();

        // Remove outer brackets
        String content = jsonStr.substring(1, jsonStr.length() - 1).trim();

        if (content.isEmpty()) {
            return result;
        }

        // Simple array element parsing
        String[] elements = splitJsonArrayElements(content);

        for (String element : elements) {
            Object parsedValue = parseJsonValue(element.trim());
            result.add(parsedValue);
        }

        return result;
    }

    /**
     * Split JSON object content into field strings.
     */
    private static String[] splitJsonFields(String content) {
        java.util.List<String> fields = new ArrayList<>();
        StringBuilder current = new StringBuilder();
        boolean inQuotes = false;
        int braceLevel = 0;

        for (int i = 0; i < content.length(); i++) {
            char c = content.charAt(i);

            if (c == '"' && (i == 0 || content.charAt(i - 1) != '\\')) {
                inQuotes = !inQuotes;
            } else if (!inQuotes) {
                if (c == '{' || c == '[') {
                    braceLevel++;
                } else if (c == '}' || c == ']') {
                    braceLevel--;
                } else if (c == ',' && braceLevel == 0) {
                    fields.add(current.toString());
                    current = new StringBuilder();
                    continue;
                }
            }

            current.append(c);
        }

        if (current.length() > 0) {
            fields.add(current.toString());
        }

        return fields.toArray(new String[0]);
    }

    /**
     * Split JSON field into key and value.
     */
    private static String[] splitJsonKeyValue(String field) {
        int colonIndex = -1;
        boolean inQuotes = false;

        for (int i = 0; i < field.length(); i++) {
            char c = field.charAt(i);
            if (c == '"' && (i == 0 || field.charAt(i - 1) != '\\')) {
                inQuotes = !inQuotes;
            } else if (!inQuotes && c == ':') {
                colonIndex = i;
                break;
            }
        }

        if (colonIndex == -1) {
            return new String[]{field};
        }

        return new String[]{
            field.substring(0, colonIndex),
            field.substring(colonIndex + 1)
        };
    }

    /**
     * Split JSON array content into element strings.
     */
    private static String[] splitJsonArrayElements(String content) {
        java.util.List<String> elements = new ArrayList<>();
        StringBuilder current = new StringBuilder();
        boolean inQuotes = false;
        int braceLevel = 0;

        for (int i = 0; i < content.length(); i++) {
            char c = content.charAt(i);

            if (c == '"' && (i == 0 || content.charAt(i - 1) != '\\')) {
                inQuotes = !inQuotes;
            } else if (!inQuotes) {
                if (c == '{' || c == '[') {
                    braceLevel++;
                } else if (c == '}' || c == ']') {
                    braceLevel--;
                } else if (c == ',' && braceLevel == 0) {
                    elements.add(current.toString());
                    current = new StringBuilder();
                    continue;
                }
            }

            current.append(c);
        }

        if (current.length() > 0) {
            elements.add(current.toString());
        }

        return elements.toArray(new String[0]);
    }

    /**
     * Parse a JSON value (string, number, boolean, object, array).
     */
    private static Object parseJsonValue(String value) {
        value = value.trim();

        // Ellipsis pattern - preserve as string
        if ("\"...\"".equals(value)) {
            return "...";
        }

        // String value - apply Unicode normalization
        if (value.startsWith("\"") && value.endsWith("\"")) {
            return normalizeUnicode(unquoteJson(value));
        }

        // Boolean values
        if ("true".equals(value)) {
            return true;
        }
        if ("false".equals(value)) {
            return false;
        }

        // Null value
        if ("null".equals(value)) {
            return null;
        }

        // Number value
        try {
            if (value.contains(".")) {
                return Double.parseDouble(value);
            } else {
                return Long.parseLong(value);
            }
        } catch (NumberFormatException e) {
            // Not a number, return as string
        }

        // Nested object or array
        if (value.startsWith("{") || value.startsWith("[")) {
            Object parsed = parseJsonObjectWithEllipsis(value);
            return parsed != null ? parsed : value;
        }

        // Default to string
        return value;
    }

    /**
     * Remove quotes from JSON string and handle escape sequences.
     */
    private static String unquoteJson(String quoted) {
        if (quoted.length() >= 2 && quoted.startsWith("\"") && quoted.endsWith("\"")) {
            String unquoted = quoted.substring(1, quoted.length() - 1);
            // Handle basic escape sequences
            return unquoted.replace("\\\"", "\"")
                          .replace("\\\\", "\\")
                          .replace("\\n", "\n")
                          .replace("\\r", "\r")
                          .replace("\\t", "\t");
        }
        return quoted;
    }

    /**
     * Normalize Unicode representations to handle differences between
     * raw Unicode characters and escape sequences.
     * This converts Unicode escape sequences (\\uXXXX) to actual Unicode characters.
     */
    public static String normalizeUnicode(String str) {
        if (str == null) {
            return str;
        }

        // First, handle Unicode escape sequences
        String result = str;
        if (str.contains("\\u")) {
            result = convertUnicodeEscapes(str);
        }

        // Then normalize quote characters to handle Unicode quote variants
        result = normalizeQuoteCharacters(result);

        return result;
    }

    /**
     * Convert Unicode escape sequences to actual characters.
     */
    private static String convertUnicodeEscapes(String str) {
        StringBuilder result = new StringBuilder();
        int i = 0;
        while (i < str.length()) {
            if (i <= str.length() - 6 && str.charAt(i) == '\\' && str.charAt(i + 1) == 'u') {
                // Found a potential Unicode escape sequence
                try {
                    String hexCode = str.substring(i + 2, i + 6);
                    int codePoint = Integer.parseInt(hexCode, 16);

                    // Check if this is a high surrogate and there's a low surrogate following
                    if (Character.isHighSurrogate((char) codePoint) &&
                        i <= str.length() - 12 &&
                        str.substring(i + 6, i + 8).equals("\\u")) {

                        try {
                            String lowSurrogateHex = str.substring(i + 8, i + 12);
                            int lowSurrogate = Integer.parseInt(lowSurrogateHex, 16);

                            if (Character.isLowSurrogate((char) lowSurrogate)) {
                                // Convert surrogate pair to actual Unicode character
                                int fullCodePoint = Character.toCodePoint((char) codePoint, (char) lowSurrogate);
                                result.appendCodePoint(fullCodePoint);
                                i += 12; // Skip both escape sequences
                                continue;
                            }
                        } catch (NumberFormatException e) {
                            // Low surrogate is invalid, treat high surrogate as normal char
                        }
                    }

                    // Normal Unicode character or invalid surrogate pair
                    result.append((char) codePoint);
                    i += 6;
                } catch (NumberFormatException e) {
                    // Not a valid Unicode escape, keep as is
                    result.append(str.charAt(i));
                    i++;
                }
            } else {
                result.append(str.charAt(i));
                i++;
            }
        }
        return result.toString();
    }

    /**
     * Normalize quote characters to handle Unicode quote variants.
     * This ensures that different quote character representations are treated consistently.
     */
    private static String normalizeQuoteCharacters(String str) {
        // Normalize various Unicode quote characters to standard ASCII quotes
        return str
            // Left and right double quotation marks to standard double quote
            .replace("\u201C", "\"")  // Left double quotation mark
            .replace("\u201D", "\"")  // Right double quotation mark
            // Left and right single quotation marks to standard single quote
            .replace("\u2018", "'")   // Left single quotation mark
            .replace("\u2019", "'")   // Right single quotation mark
            // Additional quote variants
            .replace("\u00AB", "\"")  // Left-pointing double angle quotation mark
            .replace("\u00BB", "\"")  // Right-pointing double angle quotation mark
            .replace("\u2039", "'")   // Single left-pointing angle quotation mark
            .replace("\u203A", "'");  // Single right-pointing angle quotation mark
    }

    /**
     * Parse Extended JSON string to object.
     */
    private static Object parseExtendedJsonString(String str) {
        try {
            // Simple Extended JSON parsing for common patterns
            // This is a simplified version - could be enhanced with a full JSON parser
            if (str.contains("\"$oid\"")) {
                // Extract ObjectId value
                int start = str.indexOf("\"$oid\"") + 6;
                int valueStart = str.indexOf("\"", start) + 1;
                int valueEnd = str.indexOf("\"", valueStart);
                if (valueStart > 0 && valueEnd > valueStart) {
                    return str.substring(valueStart, valueEnd);
                }
            }
            // Add more patterns as needed
        } catch (Exception e) {
            // Parsing failed, return null to indicate no transformation
        }
        return null;
    }
}
