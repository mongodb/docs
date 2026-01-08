package mongodb.comparison.internal;

import mongodb.comparison.ComparisonError;
import mongodb.comparison.ComparisonOptions;
import mongodb.comparison.ComparisonResult;
import mongodb.comparison.ErrorContextBuilder;
import mongodb.comparison.MongoTypeNormalizer;

import java.util.*;

/**
 * Handles object/document comparison logic.
 */
public class ObjectComparator {

    /**
     * Compare two objects recursively with performance limits and recursion tracking.
     * Enhanced version that enforces depth limits and prevents stack overflow.
     */
    public static List<ComparisonError> compareObjectsWithLimits(
            Object expected,
            Object actual,
            ComparisonOptions options,
            String basePath,
            int currentDepth) {

        return compareObjectsWithLimits(expected, actual, options, basePath, currentDepth,
            new java.util.IdentityHashMap<>());
    }

    /**
     * Compare two objects recursively with circular reference tracking.
     */
    private static List<ComparisonError> compareObjectsWithLimits(
            Object expected,
            Object actual,
            ComparisonOptions options,
            String basePath,
            int currentDepth,
            java.util.IdentityHashMap<ObjectPair, Boolean> visitedPairs) {

        // Check for circular references FIRST - before checking depth limits
        // If we've seen this exact pair before, consider it a match to avoid infinite recursion
        if (expected != null && actual != null && !isPrimitiveType(expected) && !isPrimitiveType(actual)) {
            ObjectPair pair = new ObjectPair(expected, actual);
            if (visitedPairs.containsKey(pair)) {
                // We've seen this exact pair before - assume it matches to avoid infinite recursion
                return List.of();
            }
            visitedPairs.put(pair, Boolean.TRUE);

            // For circular references, check if objects are structurally equivalent
            // This handles cases where we have two separate but equivalent circular structures
            if (areCircularReferences(expected, actual)) {
                if (areStructurallyEquivalent(expected, actual, new java.util.IdentityHashMap<>())) {
                    return List.of(); // Structurally equivalent circular references match
                }
            }
        }

        // Check recursion depth limit AFTER circular reference check
        if (currentDepth > options.maxRecursionDepth()) {
            var errorBuilder = ErrorContextBuilder.create("Maximum recursion depth exceeded")
                .withPath(basePath)
                .withPerformanceContext(currentDepth, "recursion_depth")
                .withContext("maxAllowed", options.maxRecursionDepth())
                .withSuggestion("Increase maxRecursionDepth if deeper nesting is expected")
                .withSuggestion("Check for circular references in data structures");

            return List.of(new ComparisonError(
                basePath,
                "Deep nested structure",
                "Exceeded depth limit: " + currentDepth,
                errorBuilder.build().message()
            ));
        }

        try {
            return compareObjectsInternal(expected, actual, options, basePath, currentDepth, visitedPairs);
        } finally {
            // Clean up the visited pair after comparison
            if (expected != null && actual != null && !isPrimitiveType(expected) && !isPrimitiveType(actual)) {
                ObjectPair pair = new ObjectPair(expected, actual);
                visitedPairs.remove(pair);
            }
        }
    }

    /**
     * Helper class to track object pairs for circular reference detection.
     */
    private static class ObjectPair {
        private final Object expected;
        private final Object actual;

        ObjectPair(Object expected, Object actual) {
            this.expected = expected;
            this.actual = actual;
        }

        @Override
        public boolean equals(Object obj) {
            if (this == obj) return true;
            if (!(obj instanceof ObjectPair other)) return false;
            return expected == other.expected && actual == other.actual;
        }

        @Override
        public int hashCode() {
            return System.identityHashCode(expected) * 31 + System.identityHashCode(actual);
        }
    }

    /**
     * Check if an object is a primitive type that can't have circular references.
     */
    private static boolean isPrimitiveType(Object obj) {
        return obj instanceof String || obj instanceof Number || obj instanceof Boolean;
    }

    /**
     * Check if two objects contain circular references to themselves or each other.
     */
    private static boolean areCircularReferences(Object obj1, Object obj2) {
        return containsCircularReference(obj1) || containsCircularReference(obj2);
    }

    /**
     * Check if an object contains a circular reference.
     */
    private static boolean containsCircularReference(Object obj) {
        return containsCircularReference(obj, new java.util.IdentityHashMap<>());
    }

    private static boolean containsCircularReference(Object obj, java.util.IdentityHashMap<Object, Boolean> visited) {
        if (obj == null || isPrimitiveType(obj)) {
            return false;
        }

        if (visited.containsKey(obj)) {
            return true; // Found circular reference
        }

        visited.put(obj, Boolean.TRUE);

        try {
            if (obj instanceof Map<?, ?> map) {
                for (Object value : map.values()) {
                    if (containsCircularReference(value, visited)) {
                        return true;
                    }
                }
            } else if (obj instanceof Iterable<?> iterable) {
                for (Object item : iterable) {
                    if (containsCircularReference(item, visited)) {
                        return true;
                    }
                }
            }
            return false;
        } finally {
            visited.remove(obj);
        }
    }

    /**
     * Check if two objects are structurally equivalent despite being different instances.
     * This handles circular references by comparing structure rather than identity.
     */
    private static boolean areStructurallyEquivalent(Object obj1, Object obj2, java.util.IdentityHashMap<Object, Object> mappings) {
        if (obj1 == obj2) return true;
        if (obj1 == null || obj2 == null) return false;

        // Check if we've already established a mapping for obj1
        if (mappings.containsKey(obj1)) {
            return mappings.get(obj1) == obj2;
        }

        // Primitive types must be equal
        if (isPrimitiveType(obj1) || isPrimitiveType(obj2)) {
            return Objects.equals(obj1, obj2);
        }

        // Different types are not equivalent
        if (!obj1.getClass().equals(obj2.getClass())) {
            return false;
        }

        // Establish mapping to handle circular references
        mappings.put(obj1, obj2);

        try {
            if (obj1 instanceof Map<?, ?> map1 && obj2 instanceof Map<?, ?> map2) {
                if (map1.size() != map2.size()) return false;

                for (Map.Entry<?, ?> entry1 : map1.entrySet()) {
                    Object key = entry1.getKey();
                    if (!map2.containsKey(key)) return false;

                    if (!areStructurallyEquivalent(entry1.getValue(), map2.get(key), mappings)) {
                        return false;
                    }
                }
                return true;
            } else if (obj1 instanceof List<?> list1 && obj2 instanceof List<?> list2) {
                if (list1.size() != list2.size()) return false;

                for (int i = 0; i < list1.size(); i++) {
                    if (!areStructurallyEquivalent(list1.get(i), list2.get(i), mappings)) {
                        return false;
                    }
                }
                return true;
            } else {
                // For other types, use equals comparison
                return Objects.equals(obj1, obj2);
            }
        } finally {
            mappings.remove(obj1);
        }
    }

    /**
     * Internal comparison method that delegates to the main comparison logic
     * while tracking recursion depth and circular references.
     */
    private static List<ComparisonError> compareObjectsInternal(
            Object expected,
            Object actual,
            ComparisonOptions options,
            String basePath,
            int currentDepth,
            java.util.IdentityHashMap<ObjectPair, Boolean> visitedPairs) {

        List<ComparisonError> errors = new ArrayList<>();

        // Handle null values
        if (expected == null && actual == null) {
            return errors; // Both null, match
        }
        if (expected == null || actual == null) {
            // Use enhanced error reporting for null mismatches
            var errorBuilder = ErrorContextBuilder.create("Null value mismatch")
                .withPath(basePath)
                .withExpected(expected)
                .withActual(actual);

            if (expected == null) {
                errorBuilder.withSuggestion("Expected null but got a value - check if field should be omitted");
            } else {
                errorBuilder.withSuggestion("Expected a value but got null - check if field is missing from data source");
            }

            errors.add(ErrorFactory.createNullMismatch(basePath, expected, actual));
            return errors;
        }

        // Handle ellipsis patterns BEFORE normalization
        // This prevents normalization from interfering with ellipsis detection
        if (EllipsisPatternRegistry.matches(expected, actual, basePath)) {
            return errors; // Ellipsis pattern matched successfully
        }

        // Now normalize both values (after ellipsis check)
        // Apply enhanced normalization that handles cross-format MongoDB type equivalence
        Object normalizedExpected = enhancedNormalizeValue(expected);
        Object normalizedActual = enhancedNormalizeValue(actual);

        // Handle different types after normalization
        if (!haveSameType(normalizedExpected, normalizedActual)) {
            var errorBuilder = ErrorContextBuilder.typeMismatch(basePath, normalizedExpected, normalizedActual)
                .withContext("beforeNormalization", Map.of(
                    "expectedType", getTypeName(expected),
                    "actualType", getTypeName(actual)
                ))
                .withContext("afterNormalization", Map.of(
                    "expectedType", getTypeName(normalizedExpected),
                    "actualType", getTypeName(normalizedActual)
                ));

            errors.add(new ComparisonError(
                basePath,
                ComparisonResult.safeValueToString(normalizedExpected),
                ComparisonResult.safeValueToString(normalizedActual),
                errorBuilder.build().message()
            ));
            return errors;
        }

        // Compare based on type - pass along currentDepth for recursion tracking
        return switch (normalizedExpected) {
            case List<?> expectedList when normalizedActual instanceof List<?> actualList -> {
                // Use ArrayComparator with proper depth tracking
                ComparisonResult arrayResult = ArrayComparator.compare(expectedList, actualList, options, basePath, currentDepth);
                yield arrayResult.isMatch() ? List.of() : arrayResult.errors();
            }

            case Map<?, ?> expectedMap when normalizedActual instanceof Map<?, ?> actualMap ->
                compareMapsWithDepth(expectedMap, actualMap, options, basePath, currentDepth, visitedPairs);

            default -> {
                if (!MongoTypeNormalizer.areValuesEquivalent(normalizedExpected, normalizedActual)) {
                    // Check for circular reference in either value
                    String expectedStr = ComparisonResult.safeValueToString(normalizedExpected);
                    String actualStr = ComparisonResult.safeValueToString(normalizedActual);
                    boolean hasCircularRef = expectedStr.contains("CIRCULAR_REFERENCE") || actualStr.contains("CIRCULAR_REFERENCE");

                    var errorBuilder = hasCircularRef ?
                        ErrorContextBuilder.create("Circular reference detected in comparison")
                            .withPath(basePath)
                            .withExpected(normalizedExpected)
                            .withActual(normalizedActual)
                            .withSuggestion("Expected contains a circular reference that could not be matched with actual value")
                        :
                        ErrorContextBuilder.valueMismatch(basePath, normalizedExpected, normalizedActual)
                            .withContext("comparisonType", "primitive_value")
                            .withContext("dataTypes", Map.of(
                                "expected", getTypeName(normalizedExpected),
                                "actual", getTypeName(normalizedActual)
                            ));

                    // Add specific suggestions based on value types (only for non-circular cases)
                    if (!hasCircularRef) {
                        if (normalizedExpected instanceof Number && normalizedActual instanceof Number) {
                            errorBuilder.withSuggestion("Check if numeric precision or rounding differences are expected");
                        } else if (normalizedExpected instanceof String && normalizedActual instanceof String) {
                            String expectedStrVal = (String) normalizedExpected;
                            String actualStrVal = (String) normalizedActual;
                            if (expectedStrVal.toLowerCase().equals(actualStrVal.toLowerCase())) {
                                errorBuilder.withSuggestion("Values differ only in case - check if case-insensitive comparison is needed");
                            } else if (expectedStrVal.trim().equals(actualStrVal.trim())) {
                                errorBuilder.withSuggestion("Values differ only in whitespace - check if whitespace normalization is needed");
                            }
                        }
                    }

                    yield List.of(new ComparisonError(
                        basePath,
                        expectedStr,
                        actualStr,
                        errorBuilder.build().message()
                    ));
                }
                yield List.of();
            }
        };
    }

    /**
     * Compare two objects recursively.
     * Maintains backward compatibility by calling the enhanced version with depth tracking.
     */
    public static List<ComparisonError> compareObjects(
            Object expected,
            Object actual,
            ComparisonOptions options,
            String basePath) {

        return compareObjectsWithLimits(expected, actual, options, basePath, 0);
    }

    /**
     * Handle string content comparison mode.
     * This is designed for console output, log messages, and mixed text/JSON content.
     */
    private static List<ComparisonError> compareAsStringContent(
            Object expected,
            Object actual,
            ComparisonOptions options,
            String basePath) {

        List<ComparisonError> errors = new ArrayList<>();

        // Convert both values to strings
        String expectedStr = convertToStringForComparison(expected);
        String actualStr = convertToStringForComparison(actual);

        // Use StringComparator for enhanced string comparison
        List<String> stringErrors = StringComparator.compareStrings(
            expectedStr, actualStr, options, basePath.isEmpty() ? "root" : basePath
        );

        // Convert string errors to ComparisonError objects
        for (String errorMessage : stringErrors) {
            errors.add(new ComparisonError(
                basePath.isEmpty() ? "root" : basePath,
                expectedStr,
                actualStr,
                errorMessage
            ));
        }

        return errors;
    }

    /**
     * Convert an object to its string representation for string comparison mode.
     * Handles various MongoDB object types and their toString() methods.
     */
    private static String convertToStringForComparison(Object obj) {
        if (obj == null) {
            return "null";
        }

        if (obj instanceof String str) {
            // Apply normalization to string objects too - they might be Document.toString() results
            String normalized = StringComparator.normalizeMongoDbToString(str);
            return normalized;
        }

        // For collections, format them nicely
        if (obj instanceof List<?> list) {
            return formatListAsString(list);
        }

        if (obj instanceof Map<?, ?> map) {
            return formatMapAsString(map);
        }

        // Use object's toString() method and normalize MongoDB representations
        String result = obj.toString();
        String normalized = StringComparator.normalizeMongoDbToString(result);
        return normalized;
    }

    /**
     * Format a list as a string for string comparison.
     */
    private static String formatListAsString(List<?> list) {
        if (list.isEmpty()) {
            return "[]";
        }

        StringBuilder sb = new StringBuilder();
        sb.append("[");
        for (int i = 0; i < list.size(); i++) {
            if (i > 0) sb.append(", ");
            sb.append(convertToStringForComparison(list.get(i)));
        }
        sb.append("]");
        return sb.toString();
    }

    /**
     * Format a map as a string for string comparison.
     */
    private static String formatMapAsString(Map<?, ?> map) {
        if (map.isEmpty()) {
            return "{}";
        }

        StringBuilder sb = new StringBuilder();
        sb.append("{");
        boolean first = true;
        for (Map.Entry<?, ?> entry : map.entrySet()) {
            if (!first) sb.append(", ");
            first = false;
            sb.append('"').append(entry.getKey()).append("\": ");
            sb.append(convertToStringForComparison(entry.getValue()));
        }
        sb.append("}");
        return sb.toString();
    }

    /**
     * Compare two maps (documents) with depth tracking and circular reference handling.
     * Enhanced to support global ellipsis (omitted fields) mode and recursion limits.
     */
    private static List<ComparisonError> compareMapsWithDepth(
            Map<?, ?> expected,
            Map<?, ?> actual,
            ComparisonOptions options,
            String basePath,
            int currentDepth,
            java.util.IdentityHashMap<ObjectPair, Boolean> visitedPairs) {

        List<ComparisonError> errors = new ArrayList<>();

        // Convert to string keys for consistent handling
        Map<String, Object> expectedMap = convertToStringKeyMap(expected);
        Map<String, Object> actualMap = convertToStringKeyMap(actual);

        // Check for global ellipsis marker which enables omitted fields mode
        // IMPORTANT: Only the explicit "...": "..." marker enables global ellipsis.
        // Property-level ellipsis (e.g., "_id": "...") is a different feature that
        // matches any value for that specific field, but does NOT allow extra fields.
        // Global ellipsis can also be inherited from parent objects (like C# implementation).
        boolean hasGlobalEllipsis = (expectedMap.containsKey("...") && "...".equals(expectedMap.get("...")))
                                   || options.inheritedGlobalEllipsis();

        // Check for missing keys in actual - only if global ellipsis is NOT present
        if (!hasGlobalEllipsis) {
            for (String key : expectedMap.keySet()) {
                if (options.ignoreFieldValues().contains(key)) {
                    continue; // Skip ignored fields
                }

                if ("...".equals(key)) {
                    continue; // Skip the global ellipsis marker itself
                }

                if (!actualMap.containsKey(key)) {
                    var errorBuilder = ErrorContextBuilder.missingField(appendPath(basePath, key), expectedMap.get(key))
                        .withContext("fieldName", key)
                        .withContext("hasGlobalEllipsis", hasGlobalEllipsis);

                    errors.add(new ComparisonError(
                        appendPath(basePath, key),
                        safeValueToString(expectedMap.get(key)),
                        "<missing>",
                        errorBuilder.build().message()
                    ));
                }
            }
        }

        // Check for extra keys in actual - only if global ellipsis is NOT present
        if (!hasGlobalEllipsis) {
            for (String key : actualMap.keySet()) {
                if (options.ignoreFieldValues().contains(key)) {
                    continue; // Skip ignored fields
                }

                if (!expectedMap.containsKey(key)) {
                    var errorBuilder = ErrorContextBuilder.unexpectedField(appendPath(basePath, key), actualMap.get(key))
                        .withContext("fieldName", key)
                        .withContext("hasGlobalEllipsis", hasGlobalEllipsis)
                        .withSuggestion("Consider using global ellipsis {...: ...} to allow extra fields")
                        .withSuggestion("Add field to ignored fields list if it's expected to vary");

                    errors.add(new ComparisonError(
                        appendPath(basePath, key),
                        "<missing>",
                        safeValueToString(actualMap.get(key)),
                        errorBuilder.build().message()
                    ));
                }
            }
        }
        // If hasGlobalEllipsis is true, we allow extra fields in actual

        // Compare values for common keys - pass currentDepth + 1 for recursion tracking
        for (String key : expectedMap.keySet()) {
            if (options.ignoreFieldValues().contains(key)) {
                continue; // Skip ignored fields
            }

            if ("...".equals(key)) {
                continue; // Skip the global ellipsis marker itself
            }

            if (actualMap.containsKey(key)) {
                Object expectedValue = expectedMap.get(key);
                Object actualValue = actualMap.get(key);

                // Check if expected value is any ellipsis pattern - if so, use ellipsis matching
                if (EllipsisPatternRegistry.matches(expectedValue, actualValue, appendPath(basePath, key))) {
                    continue; // Skip normal comparison since ellipsis was handled
                }

                String fieldPath = appendPath(basePath, key);

                // If current object has global ellipsis, inherit it to nested comparisons
                ComparisonOptions nestedOptions = hasGlobalEllipsis && !options.inheritedGlobalEllipsis()
                    ? options.withInheritedGlobalEllipsis(true)
                    : options;

                // Use ComparisonPipeline for nested object comparisons to ensure consistent depth tracking
                ComparisonResult fieldResult = ComparisonPipeline.create(
                    expectedValue,
                    actualValue,
                    nestedOptions,
                    fieldPath,
                    currentDepth + 1
                ).execute();

                if (!fieldResult.isMatch()) {
                    errors.addAll(fieldResult.errors());
                }
            }
        }

        return errors;
    }

    /**
     * Compare two maps (documents).
     * Maintains backward compatibility by calling the enhanced version with depth tracking.
     */
    private static List<ComparisonError> compareMaps(
            Map<?, ?> expected,
            Map<?, ?> actual,
            ComparisonOptions options,
            String basePath) {

        return compareMapsWithDepth(expected, actual, options, basePath, 0, new java.util.IdentityHashMap<>());
    }

    /**
     * Convert map with any key type to string-keyed map.
     */
    private static Map<String, Object> convertToStringKeyMap(Map<?, ?> map) {
        Map<String, Object> result = new HashMap<>();
        map.forEach((key, value) ->
            result.put(key != null ? key.toString() : "null", value));
        return result;
    }

    /**
     * Check if two objects have the same type after normalization.
     * Enhanced to support MongoDB numeric type flexibility.
     */
    private static boolean haveSameType(Object obj1, Object obj2) {
        if (obj1 == null || obj2 == null) {
            return obj1 == obj2;
        }

        // Enhanced MongoDB numeric compatibility - handle all numeric types as compatible
        if (areTypesCompatible(obj1, obj2)) {
            return true;
        }

        // Check exact class match for non-numeric types
        return obj1.getClass().equals(obj2.getClass());
    }

    /**
     * Numeric type flexibility for MongoDB operations.
     * MongoDB may return int as double - should be compatible.
     * Implements spec section 6.2 numeric type handling.
     */
    private static boolean areTypesCompatible(Object expected, Object actual) {
        // Both numeric types should be compatible regardless of specific type
        if (isNumeric(expected) && isNumeric(actual)) {
            return true;
        }

        // String and numeric compatibility for MongoDB Extended JSON
        if (expected instanceof String && actual instanceof Number) {
            // Check if string represents a valid number
            try {
                Double.parseDouble((String) expected);
                return true;
            } catch (NumberFormatException e) {
                return false;
            }
        }

        if (expected instanceof Number && actual instanceof String) {
            // Check if string represents a valid number
            try {
                Double.parseDouble((String) actual);
                return true;
            } catch (NumberFormatException e) {
                return false;
            }
        }

        // Date and string compatibility for ISO date strings
        if (expected instanceof java.util.Date && actual instanceof String) {
            return isIsoDateString((String) actual);
        }

        if (expected instanceof String && actual instanceof java.util.Date) {
            return isIsoDateString((String) expected);
        }

        // ObjectId and string compatibility
        if (isObjectIdInstance(expected) && actual instanceof String) {
            return isValidObjectIdString((String) actual);
        }

        if (expected instanceof String && isObjectIdInstance(actual)) {
            return isValidObjectIdString((String) expected);
        }

        return false;
    }

    /**
     * Check if a string represents a valid ISO date format.
     */
    private static boolean isIsoDateString(String str) {
        try {
            java.time.Instant.parse(str);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    /**
     * Check if an object is a MongoDB ObjectId instance.
     */
    private static boolean isObjectIdInstance(Object obj) {
        if (obj == null) {
            return false;
        }
        return obj.getClass().getSimpleName().equals("ObjectId");
    }

    /**
     * Check if a string represents a valid ObjectId format.
     */
    private static boolean isValidObjectIdString(String str) {
        if (str == null || str.length() != 24) {
            return false;
        }
        // Check if all characters are valid hex
        return str.matches("[0-9a-fA-F]{24}");
    }

    /**
     * Check if object is a numeric type.
     */
    private static boolean isNumeric(Object obj) {
        return obj instanceof Number;
    }

    /**
     * Get human-readable type name.
     */
    private static String getTypeName(Object obj) {
        if (obj == null) return "null";
        if (obj instanceof List) return "Array";
        if (obj instanceof Map) return "Object";
        if (obj instanceof String) return "String";
        if (obj instanceof Number) return "Number";
        if (obj instanceof Boolean) return "Boolean";
        return obj.getClass().getSimpleName();
    }

    /**
     * Append field name to path.
     */
    private static String appendPath(String basePath, String field) {
        if (basePath.isEmpty()) {
            return field;
        }
        return basePath + "." + field;
    }

    /**
     * Simplified value normalization using the new ValueNormalizer.
     * Replaces the complex multi-step normalization chain with a single, comprehensive call.
     */
    private static Object enhancedNormalizeValue(Object value) {
        return ValueNormalizer.normalize(value);
    }

    /**
     * Cross-format document comparison with ellipsis support.
     *
     * This method converts MongoDB Document toString format to JSON-like format
     * to enable comparison with JSON expected content while preserving ellipsis patterns.
     */
    private static Object normalizeForCrossFormatComparison(Object value) {
        if (value == null) {
            return null;
        }

        // Handle List<Document> to JSON array conversion
        if (value instanceof List<?> list && !list.isEmpty()) {
            Object first = list.get(0);
            if (isDocumentInstance(first)) {
                // Convert List<Document> to a format that can be compared with JSON
                return normalizeDocumentListToJson(list);
            }
        }

        // Handle single Document to JSON object conversion
        if (isDocumentInstance(value)) {
            return normalizeDocumentToJson(value);
        }

        return value;
    }

    /**
     * Check if an object is a MongoDB Document instance.
     * Uses reflection to avoid compile-time dependency on MongoDB driver.
     */
    private static boolean isDocumentInstance(Object obj) {
        if (obj == null) {
            return false;
        }
        return obj.getClass().getSimpleName().equals("Document");
    }

    /**
     * Convert a List of Documents to JSON-compatible format.
     * If the list contains only one document, return just that document (not as array).
     * This handles the common case where MongoDB operations return List<Document> with one result
     * but the expected content is written as a single JSON object.
     */
    @SuppressWarnings("unchecked")
    private static Object normalizeDocumentListToJson(List<?> documentList) {
        if (documentList.isEmpty()) {
            return new ArrayList<>();
        }

        // For single-document lists, return the document itself, not wrapped in array
        // This handles the type mismatch issue: "expected Object but got Array"
        if (documentList.size() == 1) {
            return normalizeDocumentToJson(documentList.get(0));
        }

        // For multiple documents, convert each and return as list
        List<Object> normalizedList = new ArrayList<>();
        for (Object doc : documentList) {
            normalizedList.add(normalizeDocumentToJson(doc));
        }
        return normalizedList;
    }

    /**
     * Convert a MongoDB Document to JSON-compatible Map format.
     * Converts Document{{key=value}} format to {"key": "value"} format
     * while preserving ellipsis patterns and MongoDB type representations.
     */
    private static Object normalizeDocumentToJson(Object document) {
        if (document == null) {
            return null;
        }

        // Use Document's toString() and convert to JSON-like format
        String documentString = document.toString();

        // Handle Document{{...}} format conversion
        if (documentString.startsWith("Document{{") && documentString.endsWith("}}")) {
            // Extract the content between Document{{ and }}
            String content = documentString.substring(10, documentString.length() - 2);

            // Convert key=value format to "key": value format
            String jsonLikeContent = convertDocumentContentToJson(content);

            // Parse the converted content as a Map
            try {
                // Use a simple parser to convert to Map structure
                return parseDocumentContentAsMap(jsonLikeContent);
            } catch (Exception e) {
                // If parsing fails, return the original document
                // This preserves backward compatibility
                return document;
            }
        }

        return document;
    }

    /**
     * Convert Document content from key=value format to JSON format.
     * Handles nested structures and preserves ellipsis patterns.
     */
    private static String convertDocumentContentToJson(String content) {
        if (content == null || content.trim().isEmpty()) {
            return "{}";
        }

        // Simple state machine to handle nested structures and quoted values
        StringBuilder result = new StringBuilder("{");

        boolean inQuotes = false;
        boolean inNestedDoc = false;
        int nestedLevel = 0;
        char[] chars = content.toCharArray();

        for (int i = 0; i < chars.length; i++) {
            char c = chars[i];

            switch (c) {
                case '\'' -> {
                    // Convert single quotes to double quotes
                    result.append('"');
                    inQuotes = !inQuotes;
                }
                case '"' -> {
                    result.append('"');
                    inQuotes = !inQuotes;
                }
                case '=' -> {
                    if (!inQuotes) {
                        // Convert = to : for JSON format
                        result.append(": ");
                    } else {
                        result.append(c);
                    }
                }
                case '{' -> {
                    if (!inQuotes) {
                        nestedLevel++;
                        inNestedDoc = true;
                    }
                    result.append(c);
                }
                case '}' -> {
                    if (!inQuotes) {
                        nestedLevel--;
                        if (nestedLevel == 0) {
                            inNestedDoc = false;
                        }
                    }
                    result.append(c);
                }
                case '[', ']' -> {
                    // Preserve array brackets as-is
                    result.append(c);
                }
                default -> {
                    // For field names that aren't quoted, add quotes
                    if (!inQuotes && !inNestedDoc && Character.isLetter(c) &&
                        (i == 0 || chars[i-1] == ',' || chars[i-1] == ' ' || chars[i-1] == '{')) {
                        // Look ahead to see if this is a field name (followed by =)
                        int j = i;
                        while (j < chars.length && chars[j] != '=' && chars[j] != ',' && chars[j] != '}') {
                            j++;
                        }
                        if (j < chars.length && chars[j] == '=') {
                            // This is a field name, add quotes
                            result.append('"');
                            while (i < j) {
                                result.append(chars[i]);
                                i++;
                            }
                            result.append('"');
                            i--; // Back up one since the loop will increment
                        } else {
                            result.append(c);
                        }
                    } else {
                        result.append(c);
                    }
                }
            }
        }

        result.append("}");
        return result.toString();
    }

    /**
     * Parse converted document content as a Map structure.
     * Simple parser that handles basic JSON-like structures.
     */
    @SuppressWarnings("unchecked")
    private static Map<String, Object> parseDocumentContentAsMap(String jsonContent) {
        try {
            // Use Jackson to parse if possible
            var mapper = new com.fasterxml.jackson.databind.ObjectMapper();
            return mapper.readValue(jsonContent, Map.class);
        } catch (Exception e) {
            // Fallback to simple parsing
            return parseSimpleJsonMap(jsonContent);
        }
    }

    /**
     * Simple JSON map parser for fallback cases.
     */
    private static Map<String, Object> parseSimpleJsonMap(String content) {
        Map<String, Object> result = new HashMap<>();

        // Remove outer braces
        if (content.startsWith("{") && content.endsWith("}")) {
            content = content.substring(1, content.length() - 1).trim();
        }

        // Simple key-value parsing (doesn't handle all JSON complexity but covers basic cases)
        String[] pairs = content.split(",");
        for (String pair : pairs) {
            String[] keyValue = pair.split(":", 2);
            if (keyValue.length == 2) {
                String key = keyValue[0].trim().replaceAll("\"", "");
                String value = keyValue[1].trim();

                // Parse basic value types
                Object parsedValue;
                if ("null".equals(value)) {
                    parsedValue = null;
                } else if ("true".equals(value) || "false".equals(value)) {
                    parsedValue = Boolean.parseBoolean(value);
                } else if (value.startsWith("\"") && value.endsWith("\"")) {
                    parsedValue = value.substring(1, value.length() - 1);
                } else if (value.matches("-?\\d+")) {
                    parsedValue = Long.parseLong(value);
                } else if (value.matches("-?\\d+\\.\\d+")) {
                    parsedValue = Double.parseDouble(value);
                } else {
                    parsedValue = value; // Keep as string
                }

                result.put(key, parsedValue);
            }
        }

        return result;
    }

    /**
     * Apply enhanced normalization rules for cross-format equivalence.
     */
    private static Object applyEnhancedNormalization(Object value) {
        if (value == null) {
            return null;
        }

        return switch (value) {
            case Map<?, ?> map -> normalizeMapForEquivalence(map);
            case List<?> list -> normalizeListForEquivalence(list);
            default -> value;
        };
    }

    /**
     * Normalize map structures to handle cross-format equivalence.
     */
    @SuppressWarnings("unchecked")
    private static Object normalizeMapForEquivalence(Map<?, ?> map) {
        if (map == null || map.isEmpty()) {
            return new HashMap<>();
        }

        // Check if this map represents a MongoDB Extended JSON type
        Object mongoTypeValue = extractMongoTypeValue(map);
        if (mongoTypeValue != null) {
            return mongoTypeValue;
        }

        // For regular maps, recursively normalize all values
        Map<Object, Object> normalized = new HashMap<>();
        for (Map.Entry<?, ?> entry : map.entrySet()) {
            Object normalizedKey = applyEnhancedNormalization(entry.getKey());
            Object normalizedValue = applyEnhancedNormalization(entry.getValue());
            normalized.put(normalizedKey, normalizedValue);
        }
        return normalized;
    }

    /**
     * Extract the canonical value from a MongoDB Extended JSON type representation.
     * Enhanced to handle more MongoDB Extended JSON patterns and nested date formats.
     */
    private static Object extractMongoTypeValue(Map<?, ?> map) {
        // Handle ObjectId patterns
        if (map.containsKey("$oid")) {
            Object oidValue = map.get("$oid");
            if (oidValue instanceof String oidStr) {
                return oidStr; // Normalize ObjectId to hex string for comparison
            }
        }

        // Handle Date patterns - normalize all date formats to ISO string
        if (map.containsKey("$date")) {
            return normalizeExtendedJsonDates(map.get("$date"));
        }

        // Handle numeric patterns - normalize to the actual numeric value
        if (map.containsKey("$numberLong")) {
            Object longValue = map.get("$numberLong");
            return parseNumericValue(longValue, Long::parseLong);
        }

        if (map.containsKey("$numberInt")) {
            Object intValue = map.get("$numberInt");
            return parseNumericValue(intValue, Integer::parseInt);
        }

        if (map.containsKey("$numberDouble")) {
            Object doubleValue = map.get("$numberDouble");
            return parseNumericValue(doubleValue, Double::parseDouble);
        }

        // Handle other Extended JSON types
        if (map.containsKey("$numberDecimal")) {
            Object decimalValue = map.get("$numberDecimal");
            if (decimalValue instanceof String decimalStr) {
                try {
                    return Double.parseDouble(decimalStr); // Normalize to double for comparison
                } catch (NumberFormatException e) {
                    return decimalValue;
                }
            }
        }

        // Handle Binary data
        if (map.containsKey("$binary")) {
            // For comparison purposes, treat binary as the base64 string
            Object binaryData = map.get("$binary");
            if (binaryData instanceof Map<?, ?> binaryMap && binaryMap.containsKey("base64")) {
                return binaryMap.get("base64");
            }
            return binaryData;
        }

        // Handle Regular Expression
        if (map.containsKey("$regex")) {
            Object regexValue = map.get("$regex");
            Object optionsValue = map.get("$options");
            if (optionsValue != null) {
                return regexValue + "/" + optionsValue; // Combine pattern and options
            }
            return regexValue;
        }

        // Handle Timestamp
        if (map.containsKey("$timestamp")) {
            Object tsValue = map.get("$timestamp");
            if (tsValue instanceof Map<?, ?> tsMap) {
                Object t = tsMap.get("t");
                Object i = tsMap.get("i");
                return Map.of("t", t, "i", i); // Preserve timestamp structure
            }
            return tsValue;
        }

        // Not a MongoDB Extended JSON type
        return null;
    }

    /**
     * Handle MongoDB Extended JSON with nested dates.
     * Enhanced to handle complex nested date structures and multiple formats.
     */
    private static Object normalizeExtendedJsonDates(Object dateValue) {
        if (dateValue instanceof String dateStr) {
            // Relaxed format: ISO-8601 string - normalize to consistent format
            try {
                java.time.Instant instant = java.time.Instant.parse(dateStr);
                return instant.toString(); // Canonical ISO-8601 format
            } catch (Exception e) {
                // Try parsing as epoch milliseconds string
                try {
                    long timestamp = Long.parseLong(dateStr);
                    java.time.Instant instant = java.time.Instant.ofEpochMilli(timestamp);
                    return instant.toString();
                } catch (NumberFormatException ne) {
                    return dateStr; // Return as-is if not parseable
                }
            }
        }

        if (dateValue instanceof Number number) {
            // Strict format: Unix timestamp as number
            try {
                java.time.Instant instant = java.time.Instant.ofEpochMilli(number.longValue());
                return instant.toString();
            } catch (Exception e) {
                return dateValue;
            }
        }

        if (dateValue instanceof Map<?, ?> dateMap) {
            // Handle nested structures like { "$numberLong": "1601499609000" }
            if (dateMap.containsKey("$numberLong")) {
                Object longValue = dateMap.get("$numberLong");
                if (longValue instanceof String longStr) {
                    try {
                        long timestamp = Long.parseLong(longStr);
                        java.time.Instant instant = java.time.Instant.ofEpochMilli(timestamp);
                        return instant.toString();
                    } catch (Exception e) {
                        return dateValue;
                    }
                }
                if (longValue instanceof Number number) {
                    try {
                        java.time.Instant instant = java.time.Instant.ofEpochMilli(number.longValue());
                        return instant.toString();
                    } catch (Exception e) {
                        return dateValue;
                    }
                }
            }

            // Handle other nested date formats
            if (dateMap.containsKey("$numberInt")) {
                // Sometimes dates are stored as seconds instead of milliseconds
                Object intValue = dateMap.get("$numberInt");
                if (intValue instanceof String intStr) {
                    try {
                        long timestamp = Long.parseLong(intStr);
                        // Try as milliseconds first, then as seconds
                        java.time.Instant instant;
                        if (timestamp > 9999999999L) { // Likely milliseconds
                            instant = java.time.Instant.ofEpochMilli(timestamp);
                        } else { // Likely seconds
                            instant = java.time.Instant.ofEpochSecond(timestamp);
                        }
                        return instant.toString();
                    } catch (Exception e) {
                        return dateValue;
                    }
                }
            }
        }

        // Handle Java Date objects
        if (dateValue instanceof java.util.Date date) {
            return java.time.Instant.ofEpochMilli(date.getTime()).toString();
        }

        // Handle Java Instant objects
        if (dateValue instanceof java.time.Instant instant) {
            return instant.toString();
        }

        return dateValue; // Return as-is if format not recognized
    }

    /**
     * Parse a numeric value that might be a string or actual number.
     */
    private static Object parseNumericValue(Object value, java.util.function.Function<String, Number> parser) {
        if (value instanceof String str) {
            try {
                return parser.apply(str);
            } catch (NumberFormatException e) {
                return value;
            }
        }
        if (value instanceof Number) {
            return value;
        }
        return value;
    }

    /**
     * Normalize list structures recursively.
     */
    private static List<Object> normalizeListForEquivalence(List<?> list) {
        if (list == null || list.isEmpty()) {
            return new ArrayList<>();
        }

        List<Object> normalized = new ArrayList<>();
        for (Object item : list) {
            normalized.add(applyEnhancedNormalization(item));
        }
        return normalized;
    }

    /**
     * Safely convert a value to string for error reporting.
     * Handles large arrays, complex objects, and null values appropriately.
     */
    private static String safeValueToString(Object value) {
        if (value == null) {
            return "<null>";  // Use angle brackets to distinguish from string "null"
        }

        if (value instanceof String str) {
            return "\"" + str + "\"";
        }

        if (value instanceof List<?> list) {
            if (list.isEmpty()) {
                return "[]";
            }
            if (list.size() > 10) {
                return "Array[%d elements] (first few: %s)".formatted(
                    list.size(),
                    list.subList(0, Math.min(3, list.size())).toString()
                );
            }
            return list.toString();
        }

        if (value instanceof Map<?, ?> map) {
            if (map.isEmpty()) {
                return "{}";
            }
            if (map.size() > 10) {
                return "Object{%d properties}".formatted(map.size());
            }
            return map.toString();
        }

        String str = value.toString();
        if (str.length() > 200) {
            return str.substring(0, 197) + "...";
        }
        return str;
    }
}
