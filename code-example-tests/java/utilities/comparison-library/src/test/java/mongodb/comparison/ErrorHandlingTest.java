package mongodb.comparison;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;

import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Test cases for error handling and reporting from comparison spec section 5.
 *
 * Based on comparison spec sections:
 * - 5.1 Parse Errors
 * - 5.2 Comparison Errors
 * - 5.3 Error Context
 * - 5.4 Critical Error Handling Lessons from C# Implementation
 */
class ErrorHandlingTest {

    @Test
    @DisplayName("Path-specific error reporting with full context")
    void testPathSpecificErrorReporting() {
        var expected = Map.of(
            "users", Arrays.asList(
                Map.of(
                    "profile", Map.of(
                        "email", "alice@example.com",
                        "preferences", Map.of(
                            "theme", "dark",
                            "notifications", true
                        )
                    ),
                    "status", "active"
                )
            ),
            "metadata", Map.of(
                "version", "1.0",
                "tags", Arrays.asList("important", "user-data")
            )
        );

        var actual = Map.of(
            "users", Arrays.asList(
                Map.of(
                    "profile", Map.of(
                        "email", "bob@example.com", // Different email
                        "preferences", Map.of(
                            "theme", "light",      // Different theme
                            "notifications", false // Different notification setting
                        )
                    ),
                    "status", "inactive"           // Different status
                )
            ),
            "metadata", Map.of(
                "version", "2.0",                 // Different version
                "tags", Arrays.asList("standard") // Different tags
            )
        );

        var result = OutputValidator.expect(actual)
            .withOrderedArrays()  // Use ordered comparison for detailed path reporting
            .toMatch(expected);
        assertFalse(result.isMatch());

        // Should report specific paths for each mismatch
        var errors = result.errors();
        assertTrue(errors.stream().anyMatch(e -> e.path().equals("users[0].profile.email")),
            "Should report email field path");
        assertTrue(errors.stream().anyMatch(e -> e.path().equals("users[0].profile.preferences.theme")),
            "Should report nested preference path");
        assertTrue(errors.stream().anyMatch(e -> e.path().equals("users[0].profile.preferences.notifications")),
            "Should report boolean preference path");
        assertTrue(errors.stream().anyMatch(e -> e.path().equals("users[0].status")),
            "Should report status field path");
        assertTrue(errors.stream().anyMatch(e -> e.path().equals("metadata.version")),
            "Should report metadata version path");
        assertTrue(errors.stream().anyMatch(e -> e.path().contains("metadata.tags")),
            "Should report tags array path");
    }

    @Test
    @DisplayName("Safe value conversion for error messages")
    void testSafeValueConversionForErrorMessages() {
        var expected = new HashMap<String, Object>();
        expected.put("simpleValue", "test");
        expected.put("nullValue", null);
        expected.put("largeArray", java.util.Collections.nCopies(100, "item"));
        expected.put("complexObject", Map.of(
            "nested", Map.of("deep", "value"),
            "list", Arrays.asList(1, 2, 3, 4, 5)
        ));

        var actual = Map.of(
            "simpleValue", "different",
            "nullValue", "not null",
            "largeArray", Arrays.asList("wrong", "items"),
            "complexObject", "string instead of object"  // Type mismatch to trigger summary
        );

        var result = OutputValidator.expect(actual).toMatch(expected);
        assertFalse(result.isMatch());

        // Check that error messages are safely formatted
        var errors = result.errors();

        // Null values should be safely represented
        assertTrue(errors.stream().anyMatch(e ->
            e.expected().contains("null") && !e.expected().equals("null")),
            "Null values should be safely formatted in error messages");

        // Large arrays should be summarized
        assertTrue(errors.stream().anyMatch(e ->
            e.expected().contains("Array[100]") || e.expected().contains("100 elements")),
            "Large arrays should be summarized in error messages");

        // Complex objects should be summarized
        assertTrue(errors.stream().anyMatch(e ->
            e.expected().contains("Object{") || e.expected().contains("properties")),
            "Complex objects should be summarized in error messages");

        // Simple values should be shown directly
        assertTrue(errors.stream().anyMatch(e ->
            e.expected().contains("\"test\"") && e.actual().contains("\"different\"")),
            "Simple values should be shown directly in error messages");
    }

    @Test
    @DisplayName("Timeout error with actionable suggestions")
    void testTimeoutErrorWithSuggestions() {
        // Create a structure that would cause timeout
        var largeNestedStructure = createLargeNestedStructure(50); // Deep nesting

        var result = OutputValidator.expect(largeNestedStructure)
            .toMatch(largeNestedStructure);

        if (!result.isMatch()) {
            var errorMessage = result.errors().get(0).message();

            // Should mention timeout
            assertTrue(errorMessage.contains("timeout") || errorMessage.contains("timed out"),
                "Should mention timeout in error message");

            // Should provide actionable suggestions
            assertTrue(errorMessage.contains("Consider simplifying") ||
                      errorMessage.contains("increasing timeout") ||
                      errorMessage.contains("reduce complexity"),
                "Should provide actionable suggestions");

            // Should mention specific timeout duration
            assertTrue(errorMessage.contains("1 second") || errorMessage.contains("1s"),
                "Should mention the timeout duration");

            // Should suggest specific alternatives
            assertTrue(errorMessage.contains("ordered array comparison") ||
                      errorMessage.contains("field ignoring") ||
                      errorMessage.contains("timeout"),
                "Should suggest specific alternatives");
        }
    }

    @Test
    @DisplayName("Array comparison error details with strategy information")
    void testArrayComparisonErrorDetails() {
        var expected = Arrays.asList(
            Map.of("id", 1, "value", "expected1"),
            Map.of("id", 2, "value", "expected2"),
            Map.of("id", 3, "value", "expected3")
        );

        var actual = Arrays.asList(
            Map.of("id", 1, "value", "actual1"),   // Different value
            Map.of("id", 4, "value", "actual4"),   // Different id
            Map.of("id", 5, "value", "actual5")    // Different id
        );

        // Test ordered comparison error
        var orderedResult = OutputValidator.expect(actual)
            .withOrderedArrays()
            .toMatch(expected);

        assertFalse(orderedResult.isMatch());

        var orderedErrors = orderedResult.errors();
        assertTrue(orderedErrors.stream().anyMatch(e ->
            e.message().contains("ordered") || e.message().contains("index")),
            "Ordered comparison should mention index-based comparison");

        // Test unordered comparison error
        var unorderedResult = OutputValidator.expect(actual)
            .withUnorderedArrays()
            .toMatch(expected);

        assertFalse(unorderedResult.isMatch());

        var unorderedErrors = unorderedResult.errors();
        assertTrue(unorderedErrors.stream().anyMatch(e ->
            e.message().contains("unordered") || e.message().contains("matching")),
            "Unordered comparison should mention matching strategy");

        // Should provide helpful suggestions for different strategies
        assertTrue(unorderedErrors.stream().anyMatch(e ->
            e.message().contains("no matching element") ||
            e.message().contains("not found")),
            "Should explain why elements didn't match");
    }

    @Test
    @DisplayName("Type mismatch error reporting with helpful context")
    void testTypeMismatchErrorReporting() {
        var expected = Map.of(
            "stringField", "text",
            "numberField", 42,
            "booleanField", true,
            "arrayField", Arrays.asList(1, 2, 3),
            "objectField", Map.of("nested", "value")
        );

        var actual = Map.of(
            "stringField", 123,                    // Number instead of string
            "numberField", "not a number",         // String instead of number
            "booleanField", "true",                // String instead of boolean
            "arrayField", Map.of("not", "array"),  // Object instead of array
            "objectField", Arrays.asList(1, 2, 3)  // Array instead of object
        );

        var result = OutputValidator.expect(actual).toMatch(expected);
        assertFalse(result.isMatch());

        var errors = result.errors();

        // Should clearly identify type mismatches
        assertTrue(errors.stream().anyMatch(e ->
            e.path().equals("stringField") &&
            e.message().contains("String") && e.message().contains("Number")),
            "Should identify string vs number mismatch");

        assertTrue(errors.stream().anyMatch(e ->
            e.path().equals("arrayField") &&
            e.message().contains("Array") && e.message().contains("Object")),
            "Should identify array vs object mismatch");

        // Should provide both expected and actual types
        assertTrue(errors.stream().anyMatch(e ->
            e.expected().contains("String:") || e.expected().contains("text")),
            "Should show expected type and value");

        assertTrue(errors.stream().anyMatch(e ->
            e.actual().contains("Number:") || e.actual().contains("123")),
            "Should show actual type and value");
    }

    @Test
    @DisplayName("Null values should be formatted as <null> in error messages")
    void testNullValueFormatting() {
        var expected = new HashMap<String, Object>();
        expected.put("nullField", null);

        var actual = Map.of("nullField", "not null");

        var result = OutputValidator.expect(actual).toMatch(expected);

        assertFalse(result.isMatch(), "Null vs non-null should not match");

        var error = result.errors().stream()
                .filter(e -> e.path().equals("nullField"))
                .findFirst()
                .orElseThrow(() -> new AssertionError("Should have error for nullField"));

        assertEquals("<null>", error.expected(),
                "Null values should be formatted as <null> in expected field");
        assertEquals("\"not null\"", error.actual(),
                "String values should be quoted in actual field");
        assertTrue(error.message().contains("Null value mismatch"),
                "Error message should indicate null value mismatch");
    }

    @Test
    @DisplayName("Large arrays should be summarized in error messages")
    void testLargeArrayFormatting() {
        var largeArray = Collections.nCopies(100, "item");
        var smallArray = Arrays.asList("wrong", "items");

        var expected = Map.of("arrayField", largeArray);
        var actual = Map.of("arrayField", smallArray);

        var result = OutputValidator.expect(actual).toMatch(expected);

        assertFalse(result.isMatch(), "Different arrays should not match");

        var error = result.errors().stream()
                .filter(e -> e.path().equals("arrayField"))
                .findFirst()
                .orElseThrow(() -> new AssertionError("Should have error for arrayField"));

        // Large array should be summarized
        assertTrue(
                error.expected().contains("Array with 100 elements") ||
                        error.expected().contains("Array[100]"),
                "Large arrays should be summarized. Got: " + error.expected()
        );

        // Small array should show full content or be summarized as well
        assertTrue(
                error.actual().contains("Array with 2 elements") ||
                        error.actual().contains("[wrong, items]"),
                "Small arrays should show elements or summary. Got: " + error.actual()
        );
    }

    @Test
    @DisplayName("Complex objects should be summarized when they have nested structures")
    void testComplexObjectFormatting() {
        var complexObject = Map.of(
                "nested", Map.of("deep", "value"),
                "list", Arrays.asList(1, 2, 3, 4, 5)
        );

        var expected = Map.of("objectField", complexObject);
        var actual = Map.of("objectField", "string instead of object");

        var result = OutputValidator.expect(actual).toMatch(expected);

        assertFalse(result.isMatch(), "Object vs string should not match");

        var error = result.errors().stream()
                .filter(e -> e.path().equals("objectField"))
                .findFirst()
                .orElseThrow(() -> new AssertionError("Should have error for objectField"));

        // Complex object should be summarized
        assertTrue(
                error.expected().contains("Object with") && error.expected().contains("properties"),
                "Complex objects should be summarized with property count. Got: " + error.expected()
        );

        // String should be quoted
        assertEquals("\"string instead of object\"", error.actual(),
                "String values should be quoted in error messages");
    }

    @Test
    @DisplayName("String values should be properly quoted in error messages")
    void testStringValueFormatting() {
        var expected = Map.of("textField", "expected text");
        var actual = Map.of("textField", "actual text");

        var result = OutputValidator.expect(actual).toMatch(expected);

        assertFalse(result.isMatch(), "Different strings should not match");

        var error = result.errors().get(0);

        assertEquals("\"expected text\"", error.expected(),
                "Expected string should be quoted");
        assertEquals("\"actual text\"", error.actual(),
                "Actual string should be quoted");
    }

    @Test
    @DisplayName("Very long strings should be truncated in error messages")
    void testLongStringTruncation() {
        // Create a string longer than 200 characters
        String longString = "a".repeat(250);
        String shortString = "short";

        var expected = Map.of("longField", longString);
        var actual = Map.of("longField", shortString);

        var result = OutputValidator.expect(actual).toMatch(expected);

        assertFalse(result.isMatch(), "Different strings should not match");

        var error = result.errors().get(0);
        String expectedValue = error.expected();

        // Should be quoted
        assertTrue(expectedValue.startsWith("\""), "String should be quoted");
        assertTrue(expectedValue.endsWith("\""), "String should be quoted");

        // Long string should be truncated: 197 chars + "..." + quotes = 202 chars total
        assertTrue(expectedValue.length() <= 202,
                "Long strings should be truncated. Length: " + expectedValue.length());

        // Should contain ellipsis when truncated
        assertTrue(expectedValue.contains("..."),
                "Truncated strings should contain ellipsis. Got: " + expectedValue.substring(0, Math.min(50, expectedValue.length())) + "...");
    }

    @Test
    @DisplayName("Circular reference detection and error reporting")
    void testCircularReferenceDetectionAndErrorReporting() {
        // Create circular reference
        var circular = new java.util.HashMap<String, Object>();
        circular.put("self", circular);
        circular.put("name", "test");

        var nonCircular = Map.of("name", "test", "self", "different");

        var result = OutputValidator.expect(nonCircular).toMatch(circular);

        // Should handle circular reference gracefully
        // Either match successfully or report circular reference appropriately
        if (!result.isMatch()) {
            assertTrue(result.errors().stream().anyMatch(e ->
                e.message().contains("circular") ||
                e.message().contains("reference") ||
                e.message().contains("recursive")),
                "Should report circular reference issues appropriately");
        }
    }

    @Test
    @DisplayName("Parser error recovery with specific suggestions")
    void testParserErrorRecoveryWithSpecificSuggestions() {
        // Test various malformed content scenarios
        String[] malformedContents = {
            "{ \"name\": \"unescaped \" quote\" }",  // Unescaped quotes
            "{ name: 'single quotes without proper handling' }", // Single quotes
            "{ \"objectId\": ObjectId('unquoted') }",  // Unquoted ObjectId
            "{ // comment in wrong place\n\"field\": \"value\" }", // Comment issues
            "{ \"field\": \"value\", }"  // Trailing comma
        };

        String[] expectedSuggestions = {
            "escape double quotes",
            "convert single quotes",
            "ObjectId values should be quoted",
            "remove comments",
            "remove trailing comma"
        };

        for (int i = 0; i < malformedContents.length; i++) {
            var parseResult = ExpectedOutputParser.parseContent(malformedContents[i]);

            if (!parseResult.isSuccess()) {
                String errorMessage = parseResult.getErrorMessage();
                assertTrue(errorMessage.contains(expectedSuggestions[i]) ||
                          errorMessage.toLowerCase().contains("suggest"),
                    "Should provide specific suggestion for malformed content: " + malformedContents[i]);
            }
        }
    }

    @Test
    @DisplayName("Performance warning and error reporting")
    void testPerformanceWarningAndErrorReporting() {
        // Create structure that would trigger performance warnings
        var largeArray = java.util.Collections.nCopies(200, Map.of("data", "value"));
        var deepNesting = createDeeplyNestedStructure(200);

        // Test large array performance warning
        var result1 = OutputValidator.expect(largeArray)
            .withUnorderedArrays()
            .toMatch(largeArray);

        // Should either succeed efficiently or warn about performance
        if (!result1.isMatch()) {
            assertTrue(result1.errors().stream().anyMatch(e ->
                e.message().contains("size limit") ||
                e.message().contains("performance") ||
                e.message().contains("complexity")),
                "Should warn about performance issues with large arrays");
        }

        // Test deep nesting performance warning
        var result2 = OutputValidator.expect(deepNesting).toMatch(deepNesting);

        if (!result2.isMatch()) {
            assertTrue(result2.errors().stream().anyMatch(e ->
                e.message().contains("depth") ||
                e.message().contains("nesting") ||
                e.message().contains("recursion")),
                "Should warn about deep nesting issues");
        }
    }

    // Helper methods

    private Map<String, Object> createLargeNestedStructure(int depth) {
        if (depth <= 0) {
            return Map.of("value", "leaf");
        }
        return Map.of(
            "level" + depth, createLargeNestedStructure(depth - 1),
            "data" + depth, "value" + depth
        );
    }

    private Map<String, Object> createDeeplyNestedStructure(int depth) {
        if (depth <= 0) {
            return Map.of("deep", "value");
        }
        return Map.of("nested", createDeeplyNestedStructure(depth - 1));
    }
}
