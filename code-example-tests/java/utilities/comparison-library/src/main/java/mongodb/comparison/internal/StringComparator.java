package mongodb.comparison.internal;

import mongodb.comparison.ComparisonOptions;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;

/**
 * Enhanced string comparison logic for MongoDB documentation scenarios.
 * Handles console output, log messages, toString() representations, and mixed text/JSON content.
 * Supports ellipsis patterns within string content for dynamic data like ObjectIds and timestamps.
 */
public class StringComparator {

    // Patterns for detecting different types of embedded content
    private static final Pattern JSON_OBJECT_PATTERN = Pattern.compile("\\{[^{}]*\\}");
    private static final Pattern JSON_ARRAY_PATTERN = Pattern.compile("\\[[^\\[\\]]*\\]");
    private static final Pattern OBJECTID_PATTERN = Pattern.compile("ObjectId\\([\"']?[a-fA-F0-9]{24}[\"']?\\)");

    // Enhanced patterns for Priority 4: Complex Object toString() Support
    private static final Pattern POJO_PATTERN = Pattern.compile("\\w+\\{[^{}]*\\}");
    private static final Pattern BULK_WRITE_RESULT_PATTERN = Pattern.compile("BulkWriteResult\\{[^{}]*\\}");
    private static final Pattern INSERT_RESULT_PATTERN = Pattern.compile("Insert(?:One|Many)?Result\\{[^{}]*\\}");
    private static final Pattern MONGODB_RESULT_PATTERN = Pattern.compile("\\w*(?:Result|Response)\\{[^{}]*\\}");

    /**
     * Compare two strings with support for ellipsis patterns and embedded content.
     * This method is specifically designed for MongoDB console output and documentation scenarios.
     *
     * @param expected The expected string content (may contain ellipsis patterns)
     * @param actual The actual string content to compare
     * @param options Comparison options
     * @param context Context string for error reporting
     * @return List of comparison errors (empty if match)
     */
    public static List<String> compareStrings(String expected, String actual, ComparisonOptions options, String context) {
        List<String> errors = new ArrayList<>();

        if (expected == null && actual == null) {
            return errors; // Both null, considered equal
        }

        if (expected == null || actual == null) {
            errors.add(context + ": One string is null but other is not. Expected: " + expected + ", Actual: " + actual);
            return errors;
        }

        // Normalize whitespace for comparison (but preserve structure)
        String normalizedExpected = normalizeWhitespace(expected);
        String normalizedActual = normalizeWhitespace(actual);

        // If exact match after normalization, we're done
        if (normalizedExpected.equals(normalizedActual)) {
            return errors;
        }

        // Check for ellipsis patterns
        boolean ellipsisMatch = matchesWithEllipsis(normalizedExpected, normalizedActual, options);

        if (ellipsisMatch) {
            return errors; // Match with ellipsis patterns
        }

        // If no match, provide detailed error
        errors.add(formatStringComparisonError(expected, actual, context));
        return errors;
    }

    /**
     * Normalize whitespace while preserving the overall structure of the string.
     * This handles common variations in console output formatting.
     */
    private static String normalizeWhitespace(String text) {
        if (text == null) return null;

        // Normalize line endings
        text = text.replace("\r\n", "\n").replace("\r", "\n");

        // Trim leading/trailing whitespace
        text = text.trim();

        // Normalize multiple spaces to single spaces (but preserve intentional formatting)
        text = text.replaceAll(" +", " ");

        return text;
    }

    /**
     * Enhanced ellipsis matching for string content scenarios.
     * Delegates to EllipsisPatternRegistry for consistent pattern handling.
     */
    public static boolean matchesWithEllipsis(String expected, String actual, ComparisonOptions options) {
        if (expected == null || actual == null) {
            return false;
        }

        // Delegate to EllipsisPatternRegistry for string content ellipsis patterns
        return EllipsisPatternRegistry.hasStringContentEllipsis(expected, actual);
    }

    /**
     * Match multi-line content with embedded structures and ellipsis patterns.
     */
    private static boolean matchMultiLineWithEllipsis(String expected, String actual) {
        String[] expectedLines = expected.split("\n");
        String[] actualLines = actual.split("\n");

        // Try line-by-line matching with ellipsis support
        boolean lineMatch = matchLinesWithEllipsis(expectedLines, actualLines);
        if (lineMatch) {
            return true;
        }

        // If line-by-line fails, try treating as one pattern (for embedded objects spanning multiple lines)
        String regexPattern = convertEllipsisToRegex(expected);
        try {
            Pattern pattern = Pattern.compile(regexPattern, Pattern.DOTALL);
            boolean regexResult = pattern.matcher(actual).matches();
            return regexResult;
        } catch (Exception e) {
            return false;
        }
    }

    /**
     * Match lines with ellipsis patterns, supporting flexible line matching.
     */
    private static boolean matchLinesWithEllipsis(String[] expectedLines, String[] actualLines) {
        int expectedIndex = 0;
        int actualIndex = 0;

        while (expectedIndex < expectedLines.length && actualIndex < actualLines.length) {
            String expectedLine = expectedLines[expectedIndex].trim();
            String actualLine = actualLines[actualIndex].trim();

            // Handle ellipsis line - skip matching content
            if ("...".equals(expectedLine)) {
                expectedIndex++;
                if (expectedIndex >= expectedLines.length) {
                    return true; // Ellipsis at end matches rest
                }

                // Find the next line that matches the pattern after ellipsis
                String nextExpected = expectedLines[expectedIndex].trim();
                boolean foundMatch = false;

                while (actualIndex < actualLines.length) {
                    if (matchSingleLineWithEllipsis(nextExpected, actualLines[actualIndex].trim())) {
                        foundMatch = true;
                        break;
                    }
                    actualIndex++;
                }

                if (!foundMatch) {
                    return false; // Couldn't find matching line
                }
                continue;
            }

            // Regular line matching
            boolean lineMatches = matchSingleLineWithEllipsis(expectedLine, actualLine);
            if (!lineMatches) {
                return false;
            }

            expectedIndex++;
            actualIndex++;
        }

        // Check if we've consumed all expected lines or only have ellipsis remaining
        while (expectedIndex < expectedLines.length) {
            if (!"...".equals(expectedLines[expectedIndex].trim())) {
                return false; // Unmatched non-ellipsis line
            }
            expectedIndex++;
        }

        return true;
    }

    /**
     * Match single line with ellipsis support.
     */
    private static boolean matchSingleLineWithEllipsis(String expected, String actual) {
        // First try exact match
        if (expected.equals(actual)) {
            return true;
        }

        // Check for simple ellipsis
        if ("...".equals(expected)) {
            return true;
        }

        // If line contains structured objects, use specialized matching
        if (containsAnyStructuredPatterns(expected, actual)) {
            boolean structuredResult = matchStructuredObjectsWithEllipsis(expected, actual);
            return structuredResult;
        }

        // Otherwise use regex matching
        String regexPattern = convertEllipsisToRegex(expected);
        try {
            Pattern pattern = Pattern.compile(regexPattern, Pattern.DOTALL);
            boolean matches = pattern.matcher(actual).matches();
            return matches;
        } catch (Exception e) {
            boolean fallbackResult = containsEllipsisMatch(expected, actual);
            return fallbackResult;
        }
    }

    /**
     * Check if strings contain any structured patterns (more permissive than before).
     */
    private static boolean containsAnyStructuredPatterns(String expected, String actual) {
        // Only treat as structured if both strings have compatible structured patterns
        boolean hasObjectPatterns = containsObjectPattern(expected) && containsObjectPattern(actual);
        boolean hasEmbeddedCollections = containsEmbeddedCollections(expected) && containsEmbeddedCollections(actual);

        return hasObjectPatterns || hasEmbeddedCollections;
    }

    /**
     * Check if string contains object patterns (POJO or MongoDB results).
     */
    private static boolean containsObjectPattern(String text) {
        if (text == null) return false;

        // Look for ClassName{...} patterns - more robust detection
        // This pattern allows for nested braces within the object
        return text.matches(".*\\w+\\{.*\\}.*");
    }

    /**
     * Check if string contains collection patterns within text.
     */
    private static boolean containsCollectionPatternInString(String text) {
        if (text == null) return false;

        // Look for [...] or {key=value...} patterns
        return text.matches(".*\\[[^\\[\\]]*\\].*") ||
               text.matches(".*\\{[^{}]*=.*\\}.*");
    }

    /**
     * Convert ellipsis patterns in the expected string to regex patterns.
     * This handles various common patterns found in MongoDB documentation,
     * including Extended JSON format matching with ellipsis.
     */
    private static String convertEllipsisToRegex(String expected) {
        // SIMPLE APPROACH: Use placeholders to protect regex patterns while quoting

        String result = expected;

        // Step 1: Replace quoted ellipsis patterns first (like "...")
        // Use unique placeholders that won't conflict
        result = result.replace("\"...\"", "__QUOTED_ELLIPSIS__");

        // Step 2: Replace remaining unquoted ellipsis patterns
        result = result.replace("...", "__UNQUOTED_ELLIPSIS__");

        // Step 3: Quote the literal parts
        result = Pattern.quote(result);

        // Step 4: Replace placeholders with actual regex patterns (unquoted)
        // The placeholders are now inside \Q...\E sections, so we need to break those up
        result = result.replace("__QUOTED_ELLIPSIS__", "\\E(?:\"[^\"]*\"|[^,}\\]\\s]+)\\Q");
        result = result.replace("__UNQUOTED_ELLIPSIS__", "\\E.*?\\Q");

        // Clean up any empty \Q\E sections
        result = result.replace("\\Q\\E", "");

        return result;
    }

    /**
     * Fallback method for ellipsis matching when regex compilation fails.
     * Uses simpler string-based checks for common patterns.
     */
    private static boolean containsEllipsisMatch(String expected, String actual) {
        // Split by ellipsis and check if all parts are present in order
        String[] parts = expected.split("\\.\\.\\.");

        if (parts.length <= 1) {
            return false; // No ellipsis found
        }

        int lastIndex = 0;
        for (String part : parts) {
            if (!part.isEmpty()) {
                int index = actual.indexOf(part, lastIndex);
                if (index == -1) {
                    return false; // Part not found
                }
                lastIndex = index + part.length();
            }
        }

        return true; // All parts found in order
    }

    /**
     * Format a detailed error message for string comparison failures.
     * Provides useful context for debugging mismatches.
     */
    private static String formatStringComparisonError(String expected, String actual, String context) {
        StringBuilder error = new StringBuilder();
        error.append(context).append(": String content mismatch\n");

        // Show first few lines of each for context
        String[] expectedLines = expected.split("\n");
        String[] actualLines = actual.split("\n");

        error.append("Expected (first ").append(Math.min(expectedLines.length, 5)).append(" lines):\n");
        for (int i = 0; i < Math.min(expectedLines.length, 5); i++) {
            error.append("  ").append(expectedLines[i]).append("\n");
        }

        error.append("Actual (first ").append(Math.min(actualLines.length, 5)).append(" lines):\n");
        for (int i = 0; i < Math.min(actualLines.length, 5); i++) {
            error.append("  ").append(actualLines[i]).append("\n");
        }

        // If strings are very different in length, mention it
        if (Math.abs(expected.length() - actual.length()) > 100) {
            error.append("Note: Significant length difference - Expected: ")
                .append(expected.length())
                .append(" chars, Actual: ")
                .append(actual.length())
                .append(" chars\n");
        }

        return error.toString().trim();
    }

    /**
     * Check if a string appears to contain embedded JSON or structured data.
     * This can help determine if special handling is needed.
     * Enhanced for Priority 4: Complex Object toString() Support.
     */
    public static boolean containsEmbeddedStructuredData(String text) {
        if (text == null) return false;

        return JSON_OBJECT_PATTERN.matcher(text).find() ||
               JSON_ARRAY_PATTERN.matcher(text).find() ||
               OBJECTID_PATTERN.matcher(text).find() ||
               POJO_PATTERN.matcher(text).find() ||
               BULK_WRITE_RESULT_PATTERN.matcher(text).find() ||
               INSERT_RESULT_PATTERN.matcher(text).find() ||
               MONGODB_RESULT_PATTERN.matcher(text).find() ||
               text.contains("Document{") ||
               text.contains("BsonDocument{") ||
               text.contains("="); // Key-value pairs typical in toString()
    }

    /**
     * Normalize common MongoDB object representations for comparison.
     * Handles toString() output from various MongoDB Java objects.
     */
    public static String normalizeMongoDbToString(String text) {
        if (text == null) return null;

        // 1. Normalize MongoDB shell syntax to Extended JSON first
        text = normalizeMongoShellSyntax(text);

        // 2. Normalize Document toString() format: Document{{key=value}} -> {"key": "value"}
        text = normalizeDocumentToString(text);

        // 3. Normalize BsonDocument representations
        text = text.replaceAll("BsonDocument\\{([^}]+)\\}", "{$1}");

        // 4. Normalize ObjectId toString() format - handle both actual values and ellipsis consistently
        // Transform BsonObjectId{value=...} to ObjectId("...") for consistency
        text = text.replaceAll("BsonObjectId\\{value=([a-fA-F0-9]{24})\\}", "ObjectId(\"$1\")");
        text = text.replaceAll("BsonObjectId\\{value=\\.\\.\\.\\}", "ObjectId(\"...\")");  // Handle ellipsis case

        // 5. Enhanced normalization for Priority 4: Complex Object toString() Support

        // 6. Normalize POJO toString() format: Class{field=value, field2=value2} -> JSON
        text = normalizePOJOToJsonString(text);

        // 7. Normalize MongoDB Result objects
        text = normalizeMongoDBResultObjects(text);

        // 8. Normalize List<Document> toString() format
        text = normalizeListDocumentToString(text);

        // 9. Normalize Collection toString() formats
        text = normalizeCollectionToString(text);

        return text;
    }

    /**
     * Normalize MongoDB shell syntax to Extended JSON or ellipsis patterns.
     * Handles ObjectId("..."), ISODate("..."), etc.
     */
    private static String normalizeMongoShellSyntax(String text) {
        // ONLY convert ObjectId/ISODate when they contain ellipsis patterns, not actual values
        // This preserves actual ObjectId values while normalizing ellipsis patterns

        // Don't convert actual ObjectId values - only convert if there are ellipsis patterns
        // text = text.replaceAll("ObjectId\\(\"([a-fA-F0-9]{24})\"\\)", "\"$1\"");

        // Convert other MongoDB shell types to quoted strings (these typically are for Extended JSON conversion)
        text = text.replaceAll("ISODate\\(\"([^\"]+)\"\\)", "\"$1\"");
        text = text.replaceAll("NumberDecimal\\(\"([^\"]+)\"\\)", "\"$1\"");
        text = text.replaceAll("NumberInt\\(\"([^\"]+)\"\\)", "\"$1\"");
        text = text.replaceAll("NumberLong\\(\"([^\"]+)\"\\)", "\"$1\"");

        return text;
    }

    /**
     * Enhanced Document toString() normalization.
     * Converts Document{{key=value}} -> {"key": "value"} with proper JSON formatting.
     */
    private static String normalizeDocumentToString(String text) {
        // Match Document{{...}} pattern and extract content
        java.util.regex.Pattern documentPattern = java.util.regex.Pattern.compile(
            "Document\\{\\{([^}]+)\\}\\}"
        );
        java.util.regex.Matcher matcher = documentPattern.matcher(text);

        StringBuffer result = new StringBuffer();
        while (matcher.find()) {
            String content = matcher.group(1);
            String jsonContent = convertKeyValueToJson(content);
            matcher.appendReplacement(result, "{" + jsonContent + "}");
        }
        matcher.appendTail(result);

        return result.toString();
    }

    /**
     * Convert key=value pairs to JSON format with proper quoting.
     */
    private static String convertKeyValueToJson(String keyValuePairs) {
        if (keyValuePairs == null || keyValuePairs.trim().isEmpty()) {
            return "";
        }

        // Split on commas, handling nested brackets and quotes
        List<String> pairs = splitKeyValuePairs(keyValuePairs);
        List<String> jsonPairs = new ArrayList<>();

        for (String pair : pairs) {
            pair = pair.trim();
            if (pair.isEmpty()) continue;

            // Find the first = sign that's not inside brackets or quotes
            int equalIndex = findEqualSignIndex(pair);
            if (equalIndex > 0) {
                String key = pair.substring(0, equalIndex).trim();
                String value = pair.substring(equalIndex + 1).trim();

                // Quote the key if not already quoted
                if (!key.startsWith("\"")) {
                    key = "\"" + key + "\"";
                }

                // Handle value formatting
                value = formatJsonValue(value);

                jsonPairs.add(key + ": " + value);
            }
        }

        return String.join(", ", jsonPairs);
    }

    /**
     * Split key=value pairs handling nested structures.
     */
    private static List<String> splitKeyValuePairs(String text) {
        List<String> pairs = new ArrayList<>();
        StringBuilder current = new StringBuilder();
        int depth = 0;
        boolean inQuotes = false;
        boolean escaped = false;

        for (int i = 0; i < text.length(); i++) {
            char c = text.charAt(i);

            if (escaped) {
                escaped = false;
                current.append(c);
                continue;
            }

            if (c == '\\') {
                escaped = true;
                current.append(c);
                continue;
            }

            if (c == '"') {
                inQuotes = !inQuotes;
                current.append(c);
                continue;
            }

            if (!inQuotes) {
                if (c == '[' || c == '{') {
                    depth++;
                } else if (c == ']' || c == '}') {
                    depth--;
                } else if (c == ',' && depth == 0) {
                    pairs.add(current.toString());
                    current = new StringBuilder();
                    continue;
                }
            }

            current.append(c);
        }

        if (current.length() > 0) {
            pairs.add(current.toString());
        }

        return pairs;
    }

    /**
     * Find the index of the first = sign that's not inside brackets or quotes.
     */
    private static int findEqualSignIndex(String text) {
        int depth = 0;
        boolean inQuotes = false;
        boolean escaped = false;

        for (int i = 0; i < text.length(); i++) {
            char c = text.charAt(i);

            if (escaped) {
                escaped = false;
                continue;
            }

            if (c == '\\') {
                escaped = true;
                continue;
            }

            if (c == '"') {
                inQuotes = !inQuotes;
                continue;
            }

            if (!inQuotes) {
                if (c == '[' || c == '{') {
                    depth++;
                } else if (c == ']' || c == '}') {
                    depth--;
                } else if (c == '=' && depth == 0) {
                    return i;
                }
            }
        }

        return -1;
    }

    /**
     * Format values for JSON output.
     */
    private static String formatJsonValue(String value) {
        if (value == null) {
            return "null";
        }

        value = value.trim();

        // Keep ellipsis as-is (quoted)
        if ("...".equals(value)) {
            return "\"...\"";
        }

        // Keep booleans as-is
        if ("true".equals(value) || "false".equals(value)) {
            return value;
        }

        // Keep numbers as-is if they look like numbers
        if (value.matches("-?\\d+(\\.\\d+)?")) {
            return value;
        }

        // Handle arrays - process individual elements if not already properly formatted
        if (value.startsWith("[") && value.endsWith("]")) {
            String content = value.substring(1, value.length() - 1).trim();
            if (!content.isEmpty()) {
                // Check if elements are already properly quoted
                if (!content.contains("\"")) {
                    // Split and quote individual elements
                    String[] elements = content.split("\\s*,\\s*");
                    StringBuilder formatted = new StringBuilder("[");
                    for (int i = 0; i < elements.length; i++) {
                        if (i > 0) formatted.append(", ");
                        String element = elements[i].trim();
                        // Quote string elements
                        if (!element.matches("-?\\d+(\\.\\d+)?") &&
                            !element.equals("true") && !element.equals("false") &&
                            !element.equals("null")) {
                            formatted.append("\"").append(element).append("\"");
                        } else {
                            formatted.append(element);
                        }
                    }
                    formatted.append("]");
                    return formatted.toString();
                }
            }
            return value;
        }

        // Handle objects - keep as-is if already braced
        if (value.startsWith("{") && value.endsWith("}")) {
            return value;
        }

        // Quote string values if not already quoted
        if (!value.startsWith("\"") || !value.endsWith("\"")) {
            // Remove single quotes if present and replace with double quotes
            if (value.startsWith("'") && value.endsWith("'")) {
                value = value.substring(1, value.length() - 1);
            }
            return "\"" + value + "\"";
        }

        return value;
    }

    /**
     * Normalize POJO toString() to JSON format.
     * Converts ClassName{field=value} -> {"field": "value"}
     */
    private static String normalizePOJOToJsonString(String text) {
        // SIMPLE APPROACH: Replace POJO patterns with JSON format
        // Use basic string replacement to avoid infinite loops
        java.util.regex.Pattern pojoPattern = java.util.regex.Pattern.compile(
            "(\\w+)\\{([^{}]+)\\}"  // Match only simple content without nested braces
        );
        java.util.regex.Matcher matcher = pojoPattern.matcher(text);

        StringBuffer result = new StringBuffer();
        while (matcher.find()) {
            String className = matcher.group(1);
            String content = matcher.group(2);

            // Skip MongoDB result objects - handle them separately
            if (className.contains("Result") || className.contains("Response")) {
                matcher.appendReplacement(result, java.util.regex.Matcher.quoteReplacement(matcher.group(0)));
            } else if (content.trim().equals("...")) {
                // Special case: preserve ellipsis patterns like User{...} -> {...}
                matcher.appendReplacement(result, "{...}");
            } else {
                String jsonContent = convertKeyValueToJson(content);
                matcher.appendReplacement(result, "{" + jsonContent + "}");
            }
        }
        matcher.appendTail(result);
        text = result.toString();

        return text;
    }

    /**
     * Normalize List<Document>.toString() format.
     * Converts [Document{{...}}, Document{{...}}] -> [{"..."}, {"..."}]
     */
    private static String normalizeListDocumentToString(String text) {
        // First normalize any Document toString patterns within the list
        text = normalizeDocumentToString(text);

        // Now handle the list formatting - ensure proper JSON array format
        if (text.startsWith("[") && text.endsWith("]")) {
            // Extract content and reformat with proper spacing
            String content = text.substring(1, text.length() - 1).trim();
            if (!content.isEmpty()) {
                // Split by commas not inside nested structures and reformat
                List<String> items = splitKeyValuePairs(content);
                List<String> formattedItems = new ArrayList<>();

                for (String item : items) {
                    item = item.trim();
                    if (!item.isEmpty()) {
                        formattedItems.add(item);
                    }
                }

                if (formattedItems.size() > 1) {
                    // Multi-line format for readability
                    return "[\n    " + String.join(",\n    ", formattedItems) + "\n]";
                } else if (formattedItems.size() == 1) {
                    return "[" + formattedItems.get(0) + "]";
                }
            }
        }

        return text;
    }

    /**
     * Normalize MongoDB result object toString() representations.
     * Handles BulkWriteResult, InsertResult, etc.
     */
    private static String normalizeMongoDBResultObjects(String text) {
        // Normalize BulkWriteResult toString() format
        text = text.replaceAll("BulkWriteResult\\{\\s*", "BulkWriteResult{");
        text = text.replaceAll("\\s*,\\s*", ", ");
        text = text.replaceAll("\\s*\\}", "}");

        // Normalize InsertResult toString() format
        text = text.replaceAll("Insert(?:One|Many)?Result\\{\\s*", "InsertResult{");

        // Normalize generic MongoDB result patterns
        text = text.replaceAll("(\\w*(?:Result|Response))\\{\\s*", "$1{");

        return text;
    }

    /**
     * Normalize Collection toString() formats.
     * Handles List, Set, Map toString() methods.
     */
    private static String normalizeCollectionToString(String text) {
        // Normalize List/Set toString(): [item1, item2, item3]
        text = text.replaceAll("\\[\\s*", "[");
        text = text.replaceAll("\\s*\\]", "]");
        text = text.replaceAll(",\\s+", ", ");

        // Normalize Map toString(): {key1=value1, key2=value2}
        text = text.replaceAll("\\{\\s*", "{");
        text = text.replaceAll("\\s*\\}", "}");

        return text;
    }

    /**
     * Check if strings contain structured object patterns that need special handling.
     * Only applies when BOTH strings are pure object representations, not embedded in text.
     */
    private static boolean containsStructuredObjectPatterns(String expected, String actual) {
        // Only use structured matching if both strings are pure object representations
        return (isPurePOJOPattern(expected) && isPurePOJOPattern(actual)) ||
               (isPureMongoDBResultPattern(expected) && isPureMongoDBResultPattern(actual)) ||
               (isPureCollectionPattern(expected) && isPureCollectionPattern(actual));
    }

    /**
     * Check if string is a pure POJO pattern (not embedded in other text).
     */
    private static boolean isPurePOJOPattern(String text) {
        if (text == null) return false;
        text = text.trim();

        // Must start with ClassName{ and end with }
        return text.matches("\\w+\\{.*\\}") &&
               !text.contains("Result{") && // Exclude result objects
               !text.contains("Response{") &&
               (text.contains("=") || text.contains("...")) && // POJO toString typically has field=value or ellipsis
               !text.contains(": "); // Exclude mixed text like "Result: ClassName{...}"
    }

    /**
     * Check if string is a pure MongoDB result pattern (not embedded in other text).
     */
    private static boolean isPureMongoDBResultPattern(String text) {
        if (text == null) return false;
        text = text.trim();

        // Must be pure result object, not embedded in other text
        return (text.matches("BulkWriteResult\\{.*\\}") ||
                text.matches("Insert(?:One|Many)?Result\\{.*\\}") ||
                text.matches("\\w*(?:Result|Response)\\{.*\\}")) &&
               !text.contains(": "); // Exclude "Result: BulkWriteResult{...}"
    }

    /**
     * Check if string is a pure collection pattern (not embedded in other text).
     */
    private static boolean isPureCollectionPattern(String text) {
        if (text == null) return false;
        text = text.trim();

        // Must be pure collection, not embedded in console output
        return ((text.startsWith("[") && text.endsWith("]")) ||
                (text.startsWith("{") && text.endsWith("}") && text.contains("="))) &&
               !text.contains(": ") && // Exclude "ids: [...]"
               !text.contains("with ") && // Exclude "with ids: [...]"
               !text.startsWith("{\"") && // Exclude JSON
               !text.startsWith("[{"); // Exclude JSON arrays
    }

    /**
     * Match structured objects with ellipsis support.
     * This provides enhanced matching for complex object toString() representations.
     */
    private static boolean matchStructuredObjectsWithEllipsis(String expected, String actual) {
        // First try handling embedded objects within strings
        if (containsEmbeddedObjects(expected) && containsEmbeddedObjects(actual)) {
            return matchStringsWithEmbeddedObjects(expected, actual);
        }

        // Try handling embedded collections within strings
        if (containsEmbeddedCollections(expected) && containsEmbeddedCollections(actual)) {
            return matchStringsWithEmbeddedCollections(expected, actual);
        }

        // Normalize both strings first
        String normalizedExpected = normalizeMongoDbToString(expected);
        String normalizedActual = normalizeMongoDbToString(actual);

        // Check for POJO pattern matching
        if (isPurePOJOPattern(normalizedExpected) && isPurePOJOPattern(normalizedActual)) {
            return matchPOJOWithEllipsis(normalizedExpected, normalizedActual);
        }

        // Check for MongoDB result pattern matching
        if (isPureMongoDBResultPattern(normalizedExpected) && isPureMongoDBResultPattern(normalizedActual)) {
            return matchMongoDBResultWithEllipsis(normalizedExpected, normalizedActual);
        }

        // Check for Collection pattern matching
        if (isPureCollectionPattern(normalizedExpected) && isPureCollectionPattern(normalizedActual)) {
            return matchCollectionWithEllipsis(normalizedExpected, normalizedActual);
        }

        // Fall back to regular ellipsis matching
        return false;
    }

    /**
     * Check if string contains embedded objects (like "Result: BulkWriteResult{...}").
     * This should only return true for objects embedded within other text, not pure objects.
     */
    private static boolean containsEmbeddedObjects(String text) {
        if (text == null) return false;

        text = text.trim();

        // If the entire string starts with ClassName{ and ends with }, it's a pure object
        if (text.matches("^\\w+\\{.*\\}$")) {
            return false; // Pure object, not embedded (even with nested structures)
        }

        // Check for objects that have text before or after them (truly embedded)
        // Like "Result: BulkWriteResult{...}" or "Error occurred: {...} details"
        return text.contains(": ") && text.matches(".*\\w+\\{.*\\}.*");
    }

    /**
     * Check if string contains embedded collections (like "IDs: [...]").
     * This should only return true for collections embedded within other text, not pure collections.
     */
    private static boolean containsEmbeddedCollections(String text) {
        if (text == null) return false;

        text = text.trim();

        // If the entire string starts with [ and ends with ], it's a pure collection
        if (text.matches("^\\[.*\\]$")) {
            return false; // Pure collection, not embedded
        }

        // If it looks like JSON, don't treat as embedded collections
        if (text.startsWith("{") && text.endsWith("}")) {
            return false; // JSON objects, not embedded collections
        }

        // Only detect very specific patterns like "IDs: [...]" or "processed IDs: [...]"
        // Use very restrictive pattern to avoid false positives
        return text.matches(".*\\b(?:IDs?|processed\\s+IDs?|successfully\\s+processed\\s+IDs?)\\s*:\\s*\\[.*\\].*");
    }

    /**
     * Match strings that contain embedded objects with ellipsis support.
     */
    private static boolean matchStringsWithEmbeddedObjects(String expected, String actual) {
        // For multi-line content, try line-by-line matching first
        if (expected.contains("\n") || actual.contains("\n")) {
            return matchMultiLineWithEllipsis(expected, actual);
        }

        // Find and extract object patterns from both strings
        List<ObjectMatch> expectedObjects = extractObjectPatterns(expected);
        List<ObjectMatch> actualObjects = extractObjectPatterns(actual);

        if (expectedObjects.isEmpty() || actualObjects.isEmpty()) {
            // Fall back to regular regex matching
            String regexPattern = convertEllipsisToRegex(expected);
            try {
                Pattern pattern = Pattern.compile(regexPattern, Pattern.DOTALL);
                return pattern.matcher(actual).matches();
            } catch (Exception e) {
                return false;
            }
        }

        // For each object in expected, find a matching object in actual
        for (ObjectMatch expectedObj : expectedObjects) {
            boolean foundMatch = false;
            for (ObjectMatch actualObj : actualObjects) {
                if (matchObjectPatterns(expectedObj.content, actualObj.content)) {
                    foundMatch = true;
                    break;
                }
            }
            if (!foundMatch) {
                return false;
            }
        }

        // Also check that the non-object parts match with ellipsis
        String expectedWithoutObjects = replaceObjectsWithPlaceholder(expected, expectedObjects);
        String actualWithoutObjects = replaceObjectsWithPlaceholder(actual, actualObjects);

        String regexPattern = convertEllipsisToRegex(expectedWithoutObjects);
        try {
            Pattern pattern = Pattern.compile(regexPattern, Pattern.DOTALL);
            return pattern.matcher(actualWithoutObjects).matches();
        } catch (Exception e) {
            return false;
        }
    }

    /**
     * Match strings that contain embedded collections with ellipsis support.
     */
    private static boolean matchStringsWithEmbeddedCollections(String expected, String actual) {
        // For multi-line content, try line-by-line matching first
        if (expected.contains("\n") || actual.contains("\n")) {
            return matchMultiLineWithEllipsis(expected, actual);
        }

        // For collection patterns, use simpler regex-based matching
        // Collection ellipsis [...] should match any array content
        String regexPattern = convertEllipsisToRegex(expected);
        try {
            Pattern pattern = Pattern.compile(regexPattern, Pattern.DOTALL);
            return pattern.matcher(actual).matches();
        } catch (Exception e) {
            return false;
        }
    }

    /**
     * Extract object patterns from a string.
     */
    private static List<ObjectMatch> extractObjectPatterns(String text) {
        List<ObjectMatch> matches = new ArrayList<>();

        // Find ClassName{...} patterns
        Pattern objectPattern = Pattern.compile("\\w+\\{[^{}]*\\}");
        java.util.regex.Matcher matcher = objectPattern.matcher(text);
        while (matcher.find()) {
            matches.add(new ObjectMatch(matcher.start(), matcher.end(), matcher.group()));
        }

        return matches;
    }

    /**
     * Replace object patterns with placeholders for regex matching.
     */
    private static String replaceObjectsWithPlaceholder(String text, List<ObjectMatch> objects) {
        StringBuilder result = new StringBuilder();
        int lastEnd = 0;

        for (ObjectMatch obj : objects) {
            result.append(text, lastEnd, obj.start);
            result.append("OBJECT_PLACEHOLDER");
            lastEnd = obj.end;
        }
        result.append(text.substring(lastEnd));

        return result.toString();
    }

    /**
     * Helper class to track object matches in strings.
     */
    private static class ObjectMatch {
        final int start;
        final int end;
        final String content;

        ObjectMatch(int start, int end, String content) {
            this.start = start;
            this.end = end;
            this.content = content;
        }
    }

    /**
     * Match POJO toString() with ellipsis support.
     * Example: Flower{id=..., name='daisy'} matches Flower{id=507f..., name='daisy', extra=value}
     */
    private static boolean matchPOJOWithEllipsis(String expected, String actual) {
        // Extract class name and field patterns
        String expectedClass = extractClassName(expected);
        String actualClass = extractClassName(actual);

        if (!expectedClass.equals(actualClass)) {
            return false; // Different classes
        }

        // Extract field patterns
        Map<String, String> expectedFields = extractFieldPatterns(expected);
        Map<String, String> actualFields = extractFieldPatterns(actual);

        // Check that all expected fields (except ellipsis) match
        for (Map.Entry<String, String> entry : expectedFields.entrySet()) {
            String fieldName = entry.getKey();
            String expectedValue = entry.getValue();

            if ("...".equals(expectedValue)) {
                continue; // Ellipsis matches any value or absence
            }

            if (!actualFields.containsKey(fieldName)) {
                return false; // Required field missing
            }

            String actualValue = actualFields.get(fieldName);
            if (!valuesMatch(expectedValue, actualValue)) {
                return false; // Field values don't match
            }
        }

        return true;
    }

    /**
     * Match MongoDB result objects with ellipsis support.
     * Example: BulkWriteResult{acknowledged=true, insertedCount=...}
     */
    private static boolean matchMongoDBResultWithEllipsis(String expected, String actual) {
        // Use similar field-based matching as POJO
        return matchPOJOWithEllipsis(expected, actual);
    }

    /**
     * Match collection toString() with ellipsis support.
     * Example: [item1, item2, ...] matches [item1, item2, item3, item4]
     */
    private static boolean matchCollectionWithEllipsis(String expected, String actual) {
        // Handle list patterns [item1, item2, ...]
        if (expected.startsWith("[") && expected.endsWith("]") &&
            actual.startsWith("[") && actual.endsWith("]")) {
            return matchListWithEllipsis(expected, actual);
        }

        // Handle map patterns {key1=value1, key2=value2, ...}
        if (expected.startsWith("{") && expected.endsWith("}") &&
            actual.startsWith("{") && actual.endsWith("}")) {
            return matchMapWithEllipsis(expected, actual);
        }

        return false;
    }

    /**
     * Extract class name from POJO toString().
     */
    private static String extractClassName(String pojoString) {
        int braceIndex = pojoString.indexOf('{');
        if (braceIndex == -1) return "";
        return pojoString.substring(0, braceIndex).trim();
    }

    /**
     * Extract field patterns from POJO toString().
     * Enhanced to handle nested structures like collections and maps.
     */
    private static Map<String, String> extractFieldPatterns(String pojoString) {
        Map<String, String> fields = new HashMap<>();

        int start = pojoString.indexOf('{');
        int end = pojoString.lastIndexOf('}');
        if (start == -1 || end == -1) return fields;

        String fieldsContent = pojoString.substring(start + 1, end);

        // Enhanced parsing to handle nested structures
        List<String> fieldPairs = parseFieldPairs(fieldsContent);

        for (String fieldPair : fieldPairs) {
            String[] parts = fieldPair.split("=", 2);
            if (parts.length == 2) {
                fields.put(parts[0].trim(), parts[1].trim());
            }
        }

        return fields;
    }

    /**
     * Parse field pairs handling nested structures correctly.
     * Enhanced to handle missing commas between fields.
     */
    private static List<String> parseFieldPairs(String content) {
        List<String> pairs = new ArrayList<>();
        StringBuilder current = new StringBuilder();
        int depth = 0;
        boolean inQuotes = false;

        for (int i = 0; i < content.length(); i++) {
            char c = content.charAt(i);

            if (c == '\'' || c == '"') {
                inQuotes = !inQuotes;
            } else if (!inQuotes) {
                if (c == '[' || c == '{') {
                    depth++;
                } else if (c == ']' || c == '}') {
                    depth--;
                } else if (c == ',' && depth == 0) {
                    // This is a field separator
                    pairs.add(current.toString().trim());
                    current = new StringBuilder();
                    continue;
                } else if (depth == 0 && c == ' ' && i + 1 < content.length()) {
                    // Check if next sequence looks like a field name (identifier followed by =)
                    String remaining = content.substring(i + 1);
                    if (remaining.matches("^\\w+\\s*=.*")) {
                        // This looks like the start of a new field without comma separator
                        pairs.add(current.toString().trim());
                        current = new StringBuilder();
                        continue;
                    }
                }
            }

            current.append(c);
        }

        if (current.length() > 0) {
            pairs.add(current.toString().trim());
        }

        return pairs;
    }

    /**
     * Check if two field values match, considering ellipsis patterns.
     * Enhanced to handle nested collections and complex structures.
     */
    private static boolean valuesMatch(String expected, String actual) {
        if ("...".equals(expected)) {
            return true; // Ellipsis matches anything
        }

        // Normalize Unicode before comparison
        String normalizedExpected = ValueNormalizer.normalizeUnicode(expected);
        String normalizedActual = ValueNormalizer.normalizeUnicode(actual);

        if (normalizedExpected.equals(normalizedActual)) {
            return true; // Exact match after Unicode normalization
        }

        // Handle pure ellipsis patterns
        if ("[...]".equals(expected)) {
            return actual.startsWith("[") && actual.endsWith("]"); // Any list content
        }

        if ("{...}".equals(expected)) {
            return actual.startsWith("{") && actual.endsWith("}"); // Any map content
        }

        // Handle nested collection patterns
        if (isCollectionValue(expected) && isCollectionValue(actual)) {
            return matchCollectionValues(expected, actual);
        }

        // Handle nested map patterns
        if (isMapValue(expected) && isMapValue(actual)) {
            return matchMapValues(expected, actual);
        }

        // Handle nested object patterns (like BsonObjectId{...})
        if (isObjectPattern(expected) && isObjectPattern(actual)) {
            return matchObjectPatterns(expected, actual);
        }

        // Check for ellipsis within the expected value
        if (expected.contains("...")) {
            String regexPattern = convertEllipsisToRegex(expected);
            try {
                Pattern pattern = Pattern.compile(regexPattern);
                return pattern.matcher(actual).matches();
            } catch (Exception e) {
                return false;
            }
        }

        return false;
    }

    /**
     * Match object patterns using appropriate strategy based on type.
     */
    private static boolean matchObjectPatterns(String expected, String actual) {
        // Extract class name and check they match
        String expectedClass = extractClassName(expected);
        String actualClass = extractClassName(actual);

        if (!expectedClass.equals(actualClass)) {
            return false; // Different classes
        }

        // Extract field patterns
        Map<String, String> expectedFields = extractFieldPatterns(expected);
        Map<String, String> actualFields = extractFieldPatterns(actual);

        // Check that all expected fields (except ellipsis) match
        for (Map.Entry<String, String> entry : expectedFields.entrySet()) {
            String fieldName = entry.getKey();
            String expectedValue = entry.getValue();

            if ("...".equals(expectedValue)) {
                continue; // Ellipsis matches any value or absence
            }

            if (!actualFields.containsKey(fieldName)) {
                return false; // Required field missing
            }

            String actualValue = actualFields.get(fieldName);
            if (!valuesMatch(expectedValue, actualValue)) {
                return false; // Field values don't match
            }
        }

        return true;
    }

    /**
     * Check if value represents a collection (starts with [ and ends with ]).
     */
    private static boolean isCollectionValue(String value) {
        if (value == null) return false;
        value = value.trim();
        return value.startsWith("[") && value.endsWith("]");
    }

    /**
     * Check if value represents a map (starts with { and ends with } and contains =).
     */
    private static boolean isMapValue(String value) {
        if (value == null) return false;
        value = value.trim();
        return value.startsWith("{") && value.endsWith("}") && value.contains("=");
    }

    /**
     * Check if value represents an object pattern (ClassName{...}).
     */
    private static boolean isObjectPattern(String value) {
        if (value == null) return false;
        value = value.trim();
        return value.matches("\\w+\\{.*\\}");
    }

    /**
     * Match collection values with ellipsis support.
     */
    private static boolean matchCollectionValues(String expected, String actual) {
        // Remove brackets
        String expectedContent = expected.substring(1, expected.length() - 1).trim();
        String actualContent = actual.substring(1, actual.length() - 1).trim();

        if (expectedContent.equals("...")) {
            return true; // [...] matches any collection content
        }

        if (expectedContent.isEmpty() && actualContent.isEmpty()) {
            return true; // Both empty
        }

        // Parse collection items
        List<String> expectedItems = parseCollectionItems(expectedContent);
        List<String> actualItems = parseCollectionItems(actualContent);

        // Check if expected ends with ellipsis
        boolean hasEllipsis = expectedItems.size() > 0 &&
                             expectedItems.get(expectedItems.size() - 1).equals("...");

        if (hasEllipsis) {
            // Must have at least as many items as expected (minus ellipsis)
            if (actualItems.size() < expectedItems.size() - 1) {
                return false;
            }

            // Check that all non-ellipsis items match
            for (int i = 0; i < expectedItems.size() - 1; i++) {
                if (!valuesMatch(expectedItems.get(i), actualItems.get(i))) {
                    return false;
                }
            }
            return true;
        } else {
            // Exact length match required
            if (expectedItems.size() != actualItems.size()) {
                return false;
            }

            // Check all items match
            for (int i = 0; i < expectedItems.size(); i++) {
                if (!valuesMatch(expectedItems.get(i), actualItems.get(i))) {
                    return false;
                }
            }
            return true;
        }
    }

    /**
     * Match map values with ellipsis support.
     */
    private static boolean matchMapValues(String expected, String actual) {
        Map<String, String> expectedMap = parseMapContent(expected);
        Map<String, String> actualMap = parseMapContent(actual);

        // Check that all expected entries (except ellipsis) match
        for (Map.Entry<String, String> entry : expectedMap.entrySet()) {
            String key = entry.getKey();
            String expectedValue = entry.getValue();

            if ("...".equals(key) || "...".equals(expectedValue)) {
                continue; // Ellipsis entry
            }

            if (!actualMap.containsKey(key)) {
                return false; // Required key missing
            }

            String actualValue = actualMap.get(key);
            if (!valuesMatch(expectedValue, actualValue)) {
                return false; // Values don't match
            }
        }

        return true;
    }

    /**
     * Parse collection items handling nested structures.
     */
    private static List<String> parseCollectionItems(String content) {
        if (content.trim().isEmpty()) {
            return new ArrayList<>();
        }

        List<String> items = new ArrayList<>();
        StringBuilder current = new StringBuilder();
        int depth = 0;
        boolean inQuotes = false;

        for (int i = 0; i < content.length(); i++) {
            char c = content.charAt(i);

            if (c == '\'' || c == '"') {
                inQuotes = !inQuotes;
            } else if (!inQuotes) {
                if (c == '[' || c == '{') {
                    depth++;
                } else if (c == ']' || c == '}') {
                    depth--;
                } else if (c == ',' && depth == 0) {
                    // This is an item separator
                    items.add(current.toString().trim());
                    current = new StringBuilder();
                    continue;
                }
            }

            current.append(c);
        }

        if (current.length() > 0) {
            items.add(current.toString().trim());
        }

        return items;
    }

    /**
     * Parse map content into key-value pairs.
     */
    private static Map<String, String> parseMapContent(String mapString) {
        Map<String, String> result = new HashMap<>();

        int start = mapString.indexOf('{');
        int end = mapString.lastIndexOf('}');
        if (start == -1 || end == -1) return result;

        String content = mapString.substring(start + 1, end);
        List<String> pairs = parseFieldPairs(content); // Reuse the enhanced parser

        for (String pair : pairs) {
            String[] parts = pair.split("=", 2);
            if (parts.length == 2) {
                result.put(parts[0].trim(), parts[1].trim());
            } else if (parts.length == 1 && parts[0].trim().equals("...")) {
                result.put("...", "...");
            }
        }

        return result;
    }

    /**
     * Match list toString() with ellipsis support.
     */
    private static boolean matchListWithEllipsis(String expected, String actual) {
        // Remove brackets and split by comma
        String expectedContent = expected.substring(1, expected.length() - 1).trim();
        String actualContent = actual.substring(1, actual.length() - 1).trim();

        if (expectedContent.isEmpty() && actualContent.isEmpty()) {
            return true; // Both empty
        }

        if (expectedContent.equals("...")) {
            return true; // Ellipsis matches any content
        }

        String[] expectedItems = expectedContent.split(",\\s*");
        String[] actualItems = actualContent.split(",\\s*");

        // Check if expected ends with ellipsis
        boolean hasEllipsis = expectedItems.length > 0 &&
                             expectedItems[expectedItems.length - 1].equals("...");

        if (hasEllipsis) {
            // Must have at least as many items as expected (minus ellipsis)
            if (actualItems.length < expectedItems.length - 1) {
                return false;
            }

            // Check that all non-ellipsis items match
            for (int i = 0; i < expectedItems.length - 1; i++) {
                if (!valuesMatch(expectedItems[i], actualItems[i])) {
                    return false;
                }
            }
            return true;
        } else {
            // Exact length match required
            if (expectedItems.length != actualItems.length) {
                return false;
            }

            // Check all items match
            for (int i = 0; i < expectedItems.length; i++) {
                if (!valuesMatch(expectedItems[i], actualItems[i])) {
                    return false;
                }
            }
            return true;
        }
    }

    /**
     * Match map toString() with ellipsis support.
     */
    private static boolean matchMapWithEllipsis(String expected, String actual) {
        // Similar to POJO matching but for key=value pairs
        Map<String, String> expectedMap = parseMapToString(expected);
        Map<String, String> actualMap = parseMapToString(actual);

        // Check that all expected entries (except ellipsis) match
        for (Map.Entry<String, String> entry : expectedMap.entrySet()) {
            String key = entry.getKey();
            String expectedValue = entry.getValue();

            if ("...".equals(key) || "...".equals(expectedValue)) {
                continue; // Ellipsis entry
            }

            if (!actualMap.containsKey(key)) {
                return false; // Required key missing
            }

            String actualValue = actualMap.get(key);
            if (!valuesMatch(expectedValue, actualValue)) {
                return false; // Values don't match
            }
        }

        return true;
    }

    /**
     * Parse map toString() format into key-value pairs.
     */
    private static Map<String, String> parseMapToString(String mapString) {
        Map<String, String> result = new HashMap<>();

        int start = mapString.indexOf('{');
        int end = mapString.lastIndexOf('}');
        if (start == -1 || end == -1) return result;

        String content = mapString.substring(start + 1, end);
        String[] pairs = content.split(",\\s*");

        for (String pair : pairs) {
            String[] parts = pair.split("=", 2);
            if (parts.length == 2) {
                result.put(parts[0].trim(), parts[1].trim());
            } else if (parts.length == 1 && parts[0].trim().equals("...")) {
                result.put("...", "...");
            }
        }

        return result;
    }

    /**
     * Split document items in a list, handling nested braces correctly
     */
    private static List<String> splitDocumentItems(String content) {
        List<String> items = new ArrayList<>();
        StringBuilder current = new StringBuilder();
        int braceCount = 0;
        boolean inQuotes = false;
        char lastChar = 0;

        for (char c : content.toCharArray()) {
            if (c == '\'' && lastChar != '\\') {
                inQuotes = !inQuotes;
            } else if (!inQuotes) {
                if (c == '{') {
                    braceCount++;
                } else if (c == '}') {
                    braceCount--;
                }
            }

            current.append(c);

            // If we hit a comma at the top level and just finished a complete item
            if (!inQuotes && braceCount == 0 && c == ',' && current.toString().trim().endsWith("}},")) {
                String item = current.toString();
                // Remove trailing comma
                if (item.endsWith(",")) {
                    item = item.substring(0, item.length() - 1);
                }
                items.add(item.trim());
                current = new StringBuilder();
            }

            lastChar = c;
        }

        // Add the last item
        if (current.length() > 0) {
            items.add(current.toString().trim());
        }

        return items;
    }
}
