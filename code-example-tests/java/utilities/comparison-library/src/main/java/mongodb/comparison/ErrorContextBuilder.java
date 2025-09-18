package mongodb.comparison;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Builder for creating detailed error context with suggestions and metadata.
 * Implements spec section 5.3 for error reporting with path context.
 */
public class ErrorContextBuilder {
    private String message;
    private String jsonPath = "";
    private Object expected;
    private Object actual;
    private final List<String> suggestions = new ArrayList<>();
    private final Map<String, Object> context = new HashMap<>();

    /**
     * Set the error message.
     */
    public ErrorContextBuilder withMessage(String message) {
        this.message = message;
        return this;
    }

    /**
     * Set the JSON path where the error occurred.
     */
    public ErrorContextBuilder withPath(String jsonPath) {
        this.jsonPath = jsonPath != null ? jsonPath : "";
        return this;
    }

    /**
     * Set the expected value.
     */
    public ErrorContextBuilder withExpected(Object expected) {
        this.expected = expected;
        return this;
    }

    /**
     * Set the actual value.
     */
    public ErrorContextBuilder withActual(Object actual) {
        this.actual = actual;
        return this;
    }

    /**
     * Add an actionable suggestion for resolving the error.
     */
    public ErrorContextBuilder withSuggestion(String suggestion) {
        if (suggestion != null && !suggestion.trim().isEmpty()) {
            this.suggestions.add(suggestion);
        }
        return this;
    }

    /**
     * Add multiple suggestions.
     */
    public ErrorContextBuilder withSuggestions(List<String> suggestions) {
        if (suggestions != null) {
            for (String suggestion : suggestions) {
                withSuggestion(suggestion);
            }
        }
        return this;
    }

    /**
     * Add context metadata.
     */
    public ErrorContextBuilder withContext(String key, Object value) {
        if (key != null && value != null) {
            this.context.put(key, value);
        }
        return this;
    }

    /**
     * Add type mismatch context with appropriate suggestions.
     */
    public ErrorContextBuilder withTypeMismatch(Object expected, Object actual) {
        this.expected = expected;
        this.actual = actual;

        String expectedType = getTypeName(expected);
        String actualType = getTypeName(actual);

        withContext("expectedType", expectedType);
        withContext("actualType", actualType);

        // Add specific suggestions based on type mismatch
        if ("String".equals(expectedType) && "Number".equals(actualType)) {
            withSuggestion("Convert number to string or check if numeric comparison is intended");
        } else if ("Number".equals(expectedType) && "String".equals(actualType)) {
            withSuggestion("Convert string to number or check if the value should be numeric");
        } else if ("Array".equals(expectedType) && "Object".equals(actualType)) {
            withSuggestion("Check if the data should be an array or if field mapping is correct");
        } else if ("Object".equals(expectedType) && "Array".equals(actualType)) {
            withSuggestion("Check if the data should be an object or if array processing is needed");
        } else if ("Boolean".equals(expectedType) && "String".equals(actualType)) {
            withSuggestion("Convert string to boolean or check if string representation is intended");
        }

        return this;
    }

    /**
     * Add array comparison context with strategy-specific suggestions.
     */
    public ErrorContextBuilder withArrayComparisonContext(String strategy, int expectedSize, int actualSize) {
        withContext("comparisonStrategy", strategy);
        withContext("expectedArraySize", expectedSize);
        withContext("actualArraySize", actualSize);

        if (expectedSize != actualSize) {
            withSuggestion("Array sizes differ - check if elements are missing or extra elements present");
        }

        switch (strategy.toLowerCase()) {
            case "ordered" -> withSuggestion("Try unordered array comparison if element order is not important");
            case "unordered" -> withSuggestion("Try ordered array comparison if element order matters");
            case "backtracking" -> withSuggestion("Consider simpler comparison strategy for better performance");
        }

        return this;
    }

    /**
     * Add timeout context with performance suggestions.
     */
    public ErrorContextBuilder withTimeoutContext(long timeoutSeconds, String operationType) {
        withContext("timeoutSeconds", timeoutSeconds);
        withContext("operationType", operationType);

        withSuggestion("Consider increasing timeout duration for complex comparisons");
        withSuggestion("Try simplifying the comparison by ignoring variable fields");
        withSuggestion("Consider using ordered array comparison for better performance");

        if (timeoutSeconds < 10) {
            withSuggestion("Timeout of %d seconds may be too short for complex data structures".formatted(timeoutSeconds));
        }

        return this;
    }

    /**
     * Add performance context with complexity suggestions.
     */
    public ErrorContextBuilder withPerformanceContext(int complexity, String limitType) {
        withContext("complexity", complexity);
        withContext("limitType", limitType);

        switch (limitType.toLowerCase()) {
            case "array_size" -> {
                withSuggestion("Large array detected - consider using ordered comparison for better performance");
                withSuggestion("For very large arrays, consider sampling or using set-based comparison");
            }
            case "recursion_depth" -> {
                withSuggestion("Deep nesting detected - check for circular references");
                withSuggestion("Consider flattening data structures or increasing recursion limits");
            }
            case "object_complexity" -> {
                withSuggestion("Complex object structure detected - consider ignoring variable fields");
                withSuggestion("Break down comparison into smaller parts for better error reporting");
            }
        }

        return this;
    }

    /**
     * Add parsing error context with format-specific suggestions.
     */
    public ErrorContextBuilder withParsingContext(String content, String errorType) {
        withContext("contentLength", content != null ? content.length() : 0);
        withContext("errorType", errorType);

        switch (errorType.toLowerCase()) {
            case "unescaped_quotes" -> {
                withSuggestion("Escape double quotes in JSON strings with backslashes");
                withSuggestion("Check for unescaped quotes within string values");
            }
            case "single_quotes" -> {
                withSuggestion("Convert single quotes to double quotes for valid JSON");
                withSuggestion("Use double quotes for all JSON string values");
            }
            case "unquoted_objectid" -> {
                withSuggestion("ObjectId values should be quoted strings in JSON");
                withSuggestion("Use format: \"ObjectId('...')\" or Extended JSON format");
            }
            case "comments" -> {
                withSuggestion("Remove comments from JSON content");
                withSuggestion("Comments are not allowed in standard JSON format");
            }
            case "trailing_comma" -> {
                withSuggestion("Remove trailing commas from JSON objects and arrays");
                withSuggestion("Trailing commas are not allowed in standard JSON");
            }
            default -> {
                withSuggestion("Check JSON syntax and format");
                withSuggestion("Use a JSON validator to identify specific issues");
            }
        }

        return this;
    }

    /**
     * Add ellipsis pattern context.
     */
    public ErrorContextBuilder withEllipsisContext(String pattern, String matchType) {
        withContext("ellipsisPattern", pattern);
        withContext("matchType", matchType);

        withSuggestion("Check if ellipsis pattern '...' is correctly placed");
        withSuggestion("Ensure ellipsis patterns match the expected data structure");

        return this;
    }

    /**
     * Build the failure result with all context.
     */
    public ComparisonResult.Failure build() {
        if (message == null || message.trim().isEmpty()) {
            message = "Comparison failed";
        }

        return new ComparisonResult.Failure(
            message,
            jsonPath,
            expected,
            actual,
            List.copyOf(suggestions),
            Map.copyOf(context)
        );
    }

    /**
     * Build and return as ComparisonResult interface.
     */
    public ComparisonResult buildResult() {
        return build();
    }

    /**
     * Get human-readable type name for an object.
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
     * Static factory method for creating error context.
     */
    public static ErrorContextBuilder create(String message) {
        return new ErrorContextBuilder().withMessage(message);
    }

    /**
     * Static factory method for type mismatch errors.
     */
    public static ErrorContextBuilder typeMismatch(String path, Object expected, Object actual) {
        String expectedType = getTypeName(expected);
        String actualType = getTypeName(actual);

        return new ErrorContextBuilder()
            .withMessage("Type mismatch: expected %s but got %s".formatted(expectedType, actualType))
            .withPath(path)
            .withTypeMismatch(expected, actual);
    }

    /**
     * Static factory method for value mismatch errors.
     */
    public static ErrorContextBuilder valueMismatch(String path, Object expected, Object actual) {
        return new ErrorContextBuilder()
            .withMessage("Value mismatch")
            .withPath(path)
            .withExpected(expected)
            .withActual(actual)
            .withSuggestion("Check if the values should be equal or if comparison logic needs adjustment");
    }

    /**
     * Static factory method for missing field errors.
     */
    public static ErrorContextBuilder missingField(String path, Object expectedValue) {
        return new ErrorContextBuilder()
            .withMessage("Expected field is missing")
            .withPath(path)
            .withExpected(expectedValue)
            .withActual(null)
            .withSuggestion("Check if the field name is correct")
            .withSuggestion("Verify that the data source includes this field");
    }

    /**
     * Static factory method for unexpected field errors.
     */
    public static ErrorContextBuilder unexpectedField(String path, Object actualValue) {
        return new ErrorContextBuilder()
            .withMessage("Unexpected field found")
            .withPath(path)
            .withExpected(null)
            .withActual(actualValue)
            .withSuggestion("Check if this field should be ignored")
            .withSuggestion("Verify if the data structure has changed");
    }
}
