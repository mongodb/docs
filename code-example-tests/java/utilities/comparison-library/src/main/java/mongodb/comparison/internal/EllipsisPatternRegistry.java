package mongodb.comparison.internal;

import java.util.List;
import java.util.Map;
import java.util.Objects;

/**
 * Simplified ellipsis pattern registry following C# patterns.
 * Consolidates ellipsis detection and matching logic in one place.
 * Only implements methods actually needed by the main implementation.
 */
public class EllipsisPatternRegistry {

    private static final String ELLIPSIS = "...";

    /**
     * Main ellipsis pattern matching - core method used by comparison pipeline.
     * IMPORTANT: This method is called BEFORE structural comparison to check for
     * simple ellipsis patterns that can short-circuit the comparison.
     * For Maps, it only returns true if it's a COMPLETE match (no extra fields or global ellipsis).
     * Partial matches go through full structural comparison in ObjectComparator.
     */
    public static boolean matches(Object expected, Object actual, String context) {
        // Global ellipsis matches anything
        if (ELLIPSIS.equals(expected)) {
            return true;
        }

        // String patterns with ellipsis
        if (expected instanceof String expectedStr && expectedStr.contains(ELLIPSIS)) {
            return matchesStringPattern(expectedStr, actual != null ? actual.toString() : null);
        }

        // Map patterns with ellipsis fields
        // Only short-circuit if it's a complete match (all fields match, no extras unless global ellipsis)
        if (expected instanceof Map<?, ?> expectedMap && actual instanceof Map<?, ?> actualMap) {
            return matchesMapPattern(expectedMap, actualMap);
        }

        // Note: Array ellipsis patterns are now handled directly by ArrayComparator
        // This registry focuses on string and map patterns only

        // No ellipsis - exact equality
        return expected != null ? expected.equals(actual) : actual == null;
    }

    /**
     * Simple string pattern matching with ellipsis.
     */
    private static boolean matchesStringPattern(String pattern, String actual) {
        if (actual == null) return false;

        if (pattern.equals(ELLIPSIS)) {
            return true;
        }

        if (pattern.startsWith(ELLIPSIS)) {
            String suffix = pattern.substring(3);
            return actual.endsWith(suffix);
        }

        if (pattern.endsWith(ELLIPSIS)) {
            String prefix = pattern.substring(0, pattern.length() - 3);
            return actual.startsWith(prefix);
        }

        if (pattern.contains(ELLIPSIS)) {
            // Check if this looks like JSON with ellipsis - handle specially
            if (pattern.trim().startsWith("{") && pattern.contains("\"...\"")) {
                return matchesJsonPattern(pattern, actual);
            }

            // Handle multiple ellipsis patterns using regex approach
            try {
                String regex = convertEllipsisToRegex(pattern);
                return java.util.regex.Pattern.compile(regex, java.util.regex.Pattern.DOTALL)
                    .matcher(actual).matches();
            } catch (Exception e) {
                // Fallback to simple split approach for single ellipsis
                String[] parts = pattern.split("\\.\\.\\.");
                if (parts.length == 2) {
                    return actual.startsWith(parts[0]) && actual.endsWith(parts[1]);
                }
            }
        }

        return false;
    }

    /**
     * Handle JSON patterns with ellipsis like {"_id": "...", "name": "value"}
     * This should match different JSON formats (Extended JSON, relaxed JSON, etc.)
     */
    private static boolean matchesJsonPattern(String pattern, String actual) {
        try {
            // For JSON patterns, try to do a more sophisticated match
            // that accounts for different JSON formats

            // Simple approach: convert ellipsis values to regex and match
            // Replace "..." with a pattern that matches any JSON value
            String regexPattern = pattern
                .replace("\"...\"", "\"[^\"]*\"|\\{[^}]*\\}|\\[[^\\]]*\\]|[^,}\\]]*")
                .replace("...", ".*");

            // Escape other regex special chars except our replacements
            regexPattern = regexPattern
                .replace("(", "\\(")
                .replace(")", "\\)")
                .replace("$", "\\$")
                .replace("^", "\\^")
                .replace("+", "\\+")
                .replace("?", "\\?")
                .replace("*", "\\*")
                .replace("|", "\\|");

            // Remove extra whitespace from both pattern and actual for matching
            String normalizedPattern = regexPattern.replaceAll("\\s+", "\\\\s*");
            String normalizedActual = actual.replaceAll("\\s+", " ").trim();

            return java.util.regex.Pattern.compile(normalizedPattern, java.util.regex.Pattern.DOTALL)
                .matcher(normalizedActual).matches();

        } catch (Exception e) {
            // If JSON pattern matching fails, fall back to regular ellipsis matching
            return false;
        }
    }

    /**
     * Converts a string with ellipsis patterns to a regex pattern.
     * Same logic as in StringComparisonStrategy for consistency.
     */
    private static String convertEllipsisToRegex(String ellipsisPattern) {
        // First, protect actual ellipsis patterns by replacing them temporarily
        String temp = ellipsisPattern.replace("...", "___ELLIPSIS_PLACEHOLDER___");

        // Now escape all regex special characters
        String escaped = temp
            .replace("\\", "\\\\")
            .replace(".", "\\.")
            .replace("^", "\\^")
            .replace("$", "\\$")
            .replace("|", "\\|")
            .replace("?", "\\?")
            .replace("*", "\\*")
            .replace("+", "\\+")
            .replace("(", "\\(")
            .replace(")", "\\)")
            .replace("[", "\\[")
            .replace("]", "\\]")
            .replace("{", "\\{")
            .replace("}", "\\}");

        // Finally, restore ellipsis patterns as regex wildcards
        escaped = escaped.replace("___ELLIPSIS_PLACEHOLDER___", ".*");

        return escaped;
    }

    /**
     * Simple map pattern matching - if any field has ellipsis value, that field matches anything.
     * IMPORTANT: This method checks for COMPLETE matches only.
     * It returns false if there are extra fields in actual (unless global ellipsis is present).
     * This ensures that partial matches go through full structural comparison in ObjectComparator.
     */
    private static boolean matchesMapPattern(Map<?, ?> expectedMap, Map<?, ?> actualMap) {
        // Check if expected has global ellipsis marker
        boolean hasGlobalEllipsis = expectedMap.containsKey(ELLIPSIS) && ELLIPSIS.equals(expectedMap.get(ELLIPSIS));

        // Check all expected keys
        for (Map.Entry<?, ?> entry : expectedMap.entrySet()) {
            Object key = entry.getKey();
            Object expectedValue = entry.getValue();

            // Skip the global ellipsis marker itself
            if (ELLIPSIS.equals(key)) {
                continue;
            }

            if (ELLIPSIS.equals(expectedValue)) {
                // Ellipsis field - just check key exists
                if (!actualMap.containsKey(key)) {
                    return false;
                }
            } else {
                // Regular field - must match exactly
                Object actualValue = actualMap.get(key);
                if (!Objects.equals(expectedValue, actualValue)) {
                    return false;
                }
            }
        }

        // Check for extra keys in actual - only allowed if global ellipsis is present
        if (!hasGlobalEllipsis) {
            for (Object key : actualMap.keySet()) {
                if (!expectedMap.containsKey(key)) {
                    return false; // Extra key found - not a complete match
                }
            }
        }

        return true;
    }

    /**
     * Check for global ellipsis in file content - used by ExpectedOutputParser.
     * Recognizes both unquoted ... and quoted "..." as standalone ellipsis markers.
     */
    public static boolean detectGlobalEllipsis(String fileContent) {
        if (fileContent == null || fileContent.isBlank()) {
            return false;
        }
        return fileContent.lines().anyMatch(line -> {
            String trimmed = line.trim();
            return ELLIPSIS.equals(trimmed) || "\"...\"".equals(trimmed);
        });
    }

    /**
     * Check if any value contains ellipsis patterns (for recursive detection).
     * Note: Array ellipsis matching is handled directly by ArrayComparator.
     * This method only detects presence of ellipsis for compatibility.
     */
    public static boolean hasEllipsisPatterns(Object value) {
        if (value instanceof String str) return str.contains(ELLIPSIS);
        if (value instanceof Map<?, ?> map) return map.containsValue(ELLIPSIS);
        if (value instanceof List<?> list) return list.contains(ELLIPSIS); // Detection only
        return false;
    }

    /**
     * Check string content ellipsis - used by StringComparator.
     */
    public static boolean hasStringContentEllipsis(Object expected, Object actual) {
        if (!(expected instanceof String expectedStr)) return false;
        if (actual == null) return false;
        return matchesStringPattern(expectedStr, actual.toString());
    }

    // Simple compatibility methods for migration

    public static boolean isEllipsisPattern(Object value) {
        if (value instanceof String str) {
            return str.contains(ELLIPSIS) || str.equals("[...]") || str.matches("\\[.*\\.\\.\\..*\\]");
        }
        return false;
    }

    public static boolean matchesPattern(Object pattern, Object actual) {
        if (pattern instanceof String patternStr) {
            // Handle special array patterns
            if (patternStr.equals("[...]")) {
                return actual instanceof java.util.List || actual.getClass().isArray();
            }
            // Handle JSON array patterns with ellipsis
            if (patternStr.matches("\\[.*\\.\\.\\..*\\]")) {
                return true; // Simple match for compatibility
            }
        }
        return matches(pattern, actual, "");
    }
}
