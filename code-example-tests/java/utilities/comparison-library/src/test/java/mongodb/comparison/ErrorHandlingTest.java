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
    @DisplayName("Deeply nested comparison failures should throw AssertionError")
    void testDeeplyNestedComparisonFailure() {
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

        // Should throw AssertionError for mismatched nested structures
        assertThrows(AssertionError.class, () ->
                Expect.that(actual)
                        .withOrderedSort()
                        .shouldMatch(expected));
    }

    @Test
    @DisplayName("Comparisons with null values, large arrays, and complex objects should fail appropriately")
    void testComplexStructureComparisons() {
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
            "complexObject", "string instead of object"
        );

        // Should throw AssertionError with error details in the message
        assertThrows(AssertionError.class, () ->
                Expect.that(actual).shouldMatch(expected));
    }

    @Test
    @DisplayName("Large nested structures should complete without timeout")
    void testLargeNestedStructureHandling() {
        // Create a structure with deep nesting
        var largeNestedStructure = createLargeNestedStructure(50);

        // Should complete successfully (either matches or throws if timeout)
        assertDoesNotThrow(() ->
                Expect.that(largeNestedStructure).shouldMatch(largeNestedStructure));
    }

    @Test
    @DisplayName("Array comparisons should fail appropriately for both ordered and unordered strategies")
    void testArrayComparisonStrategies() {
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

        // Test ordered comparison fails
        assertThrows(AssertionError.class, () ->
                Expect.that(actual)
                        .withOrderedSort()
                        .shouldMatch(expected));

        // Test unordered comparison fails
        assertThrows(AssertionError.class, () ->
                Expect.that(actual).shouldMatch(expected));
    }

    @Test
    @DisplayName("Type mismatches should throw AssertionError")
    void testTypeMismatches() {
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

        // Should throw AssertionError for type mismatches
        assertThrows(AssertionError.class, () ->
                Expect.that(actual).shouldMatch(expected));
    }

    @Test
    @DisplayName("Null vs non-null comparisons should fail")
    void testNullValueComparison() {
        var expected = new HashMap<String, Object>();
        expected.put("nullField", null);

        var actual = Map.of("nullField", "not null");

        // Should throw AssertionError for null vs non-null
        assertThrows(AssertionError.class, () ->
                Expect.that(actual).shouldMatch(expected));
    }

    @Test
    @DisplayName("Large vs small array comparisons should fail")
    void testLargeArrayComparison() {
        var largeArray = Collections.nCopies(100, "item");
        var smallArray = Arrays.asList("wrong", "items");

        var expected = Map.of("arrayField", largeArray);
        var actual = Map.of("arrayField", smallArray);

        // Should throw AssertionError for array size/content mismatch
        assertThrows(AssertionError.class, () ->
                Expect.that(actual).shouldMatch(expected));
    }

    @Test
    @DisplayName("Complex object vs simple type comparisons should fail")
    void testComplexObjectVsSimpleType() {
        var complexObject = Map.of(
                "nested", Map.of("deep", "value"),
                "list", Arrays.asList(1, 2, 3, 4, 5)
        );

        var expected = Map.of("objectField", complexObject);
        var actual = Map.of("objectField", "string instead of object");

        // Should throw AssertionError for object vs string type mismatch
        assertThrows(AssertionError.class, () ->
                Expect.that(actual).shouldMatch(expected));
    }

    @Test
    @DisplayName("Different string values should fail comparison")
    void testStringValueComparison() {
        var expected = Map.of("textField", "expected text");
        var actual = Map.of("textField", "actual text");

        // Should throw AssertionError for different strings
        assertThrows(AssertionError.class, () ->
                Expect.that(actual).shouldMatch(expected));
    }

    @Test
    @DisplayName("Very long vs short string comparisons should fail")
    void testLongStringComparison() {
        // Create a string longer than 200 characters
        String longString = "a".repeat(250);
        String shortString = "short";

        var expected = Map.of("longField", longString);
        var actual = Map.of("longField", shortString);

        // Should throw AssertionError for different string lengths
        assertThrows(AssertionError.class, () ->
                Expect.that(actual).shouldMatch(expected));
    }

    @Test
    @DisplayName("Circular reference comparisons should be handled gracefully")
    void testCircularReferenceHandling() {
        // Create circular reference
        var circular = new java.util.HashMap<String, Object>();
        circular.put("self", circular);
        circular.put("name", "test");

        var nonCircular = Map.of("name", "test", "self", "different");

        // Should handle circular reference without infinite loop
        // Either succeed or throw AssertionError
        assertThrows(AssertionError.class, () ->
                Expect.that(nonCircular).shouldMatch(circular));
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
    @DisplayName("Large arrays and deep nesting should handle limits appropriately")
    void testLargeStructurePerformance() {
        // Create structure that tests performance
        var largeArray = java.util.Collections.nCopies(200, Map.of("data", "value"));
        var deepNesting = createDeeplyNestedStructure(200);

        // Test large array - should complete successfully
        assertDoesNotThrow(() ->
                Expect.that(largeArray).shouldMatch(largeArray));

        // Test deep nesting - may hit recursion depth limit
        try {
            Expect.that(deepNesting).shouldMatch(deepNesting);
            // If it succeeds, that's fine
        } catch (AssertionError e) {
            // If it fails, verify it's due to recursion depth
            assertTrue(e.getMessage().contains("recursion depth") ||
                      e.getMessage().contains("too deep") ||
                      e.getMessage().contains("exceeds maximum"),
                    "Should report recursion depth issues");
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
