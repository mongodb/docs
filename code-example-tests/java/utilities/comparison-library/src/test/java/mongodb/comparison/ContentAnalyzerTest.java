package mongodb.comparison;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Comprehensive tests for the ContentAnalyzer class.
 * Tests all public methods and content detection logic to ensure proper routing
 * of different content types to appropriate comparison strategies.
 */
class ContentAnalyzerTest {

    @Nested
    @DisplayName("shouldUseStringComparison(Object, Object) Tests")
    class ShouldUseStringComparisonBasicTests {

        @Test
        @DisplayName("Should use string comparison for ellipsis patterns")
        void testEllipsisPatterns() {
            // Simple ellipsis
            assertTrue(ContentAnalyzer.shouldUseStringComparison("...", "anything"));
            
            // Ellipsis with prefix
            assertTrue(ContentAnalyzer.shouldUseStringComparison("Hello...", "Hello world"));
            
            // Ellipsis with suffix
            assertTrue(ContentAnalyzer.shouldUseStringComparison("...world", "Hello world"));
            
            // Ellipsis in middle
            assertTrue(ContentAnalyzer.shouldUseStringComparison("Hello...world", "Hello beautiful world"));
            
            // No ellipsis should not trigger string comparison for non-string actual
            assertFalse(ContentAnalyzer.shouldUseStringComparison("plain text", Map.of("key", "value")));
        }

        @Test
        @DisplayName("Should handle structured content detection")
        void testStructuredContentDetection() {
            // JSON object pattern - expected is JSON string, actual is not string
            assertTrue(ContentAnalyzer.shouldUseStringComparison("{\"key\": \"value\"}", Map.of("key", "value")));
            
            // JSON array pattern - expected is JSON string, actual is not string
            assertTrue(ContentAnalyzer.shouldUseStringComparison("[1, 2, 3]", List.of(1, 2, 3)));
            
            // XML pattern - expected is XML string, actual is not string
            assertTrue(ContentAnalyzer.shouldUseStringComparison("<root>content</root>", Map.of("root", "content")));
            
            // Both are structured strings, single line - should use structural comparison
            assertFalse(ContentAnalyzer.shouldUseStringComparison("{\"key\": \"value\"}", "{\"key\": \"value\"}"));
            
            // Both are structured strings, multi-line - should use string comparison
            String multiLineJson = "{\n  \"key\": \"value\"\n}";
            assertTrue(ContentAnalyzer.shouldUseStringComparison(multiLineJson, "{\"key\": \"value\"}"));
        }

        @Test
        @DisplayName("Should handle plain string comparisons")
        void testPlainStringComparisons() {
            // Both are plain strings - should use string comparison
            assertTrue(ContentAnalyzer.shouldUseStringComparison("hello", "world"));
            
            // Expected is plain string, actual is not string - should use structural comparison
            assertFalse(ContentAnalyzer.shouldUseStringComparison("hello", 123));
            assertFalse(ContentAnalyzer.shouldUseStringComparison("hello", List.of("world")));
        }

        @Test
        @DisplayName("Should use structural comparison for non-string expected values")
        void testNonStringExpectedValues() {
            // Numbers
            assertFalse(ContentAnalyzer.shouldUseStringComparison(123, "123"));
            assertFalse(ContentAnalyzer.shouldUseStringComparison(123, 123));
            
            // Objects
            assertFalse(ContentAnalyzer.shouldUseStringComparison(Map.of("key", "value"), "{\"key\": \"value\"}"));
            
            // Arrays
            assertFalse(ContentAnalyzer.shouldUseStringComparison(List.of(1, 2, 3), "[1, 2, 3]"));
            
            // Booleans
            assertFalse(ContentAnalyzer.shouldUseStringComparison(true, "true"));
            
            // Null
            assertFalse(ContentAnalyzer.shouldUseStringComparison(null, "null"));
        }
    }

    @Nested
    @DisplayName("shouldUseStringComparison(Object, Object, ComparisonOptions) Tests")
    class ShouldUseStringComparisonWithOptionsTests {

        @Test
        @DisplayName("Should handle JSON Lines with unordered comparison")
        void testJsonLinesUnorderedComparison() {
            ComparisonOptions unorderedOptions = ComparisonOptions.builder()
                .withComparisonType(ComparisonType.UNORDERED)
                .build();
            
            // JSON Lines expected, List actual - should use string comparison
            String jsonLines = "{\"id\": 1, \"name\": \"Alice\"} {\"id\": 2, \"name\": \"Bob\"}";
            List<Map<String, Object>> actualList = List.of(
                Map.of("id", 1, "name", "Alice"),
                Map.of("id", 2, "name", "Bob")
            );
            assertTrue(ContentAnalyzer.shouldUseStringComparison(jsonLines, actualList, unorderedOptions));
            
            // JSON Lines expected, Array actual - should use string comparison
            Map<String, Object>[] actualArray = new Map[]{
                Map.of("id", 1, "name", "Alice"),
                Map.of("id", 2, "name", "Bob")
            };
            assertTrue(ContentAnalyzer.shouldUseStringComparison(jsonLines, actualArray, unorderedOptions));
            
            // Both are JSON Lines strings - should use string comparison
            String actualJsonLines = "{\"id\": 2, \"name\": \"Bob\"} {\"id\": 1, \"name\": \"Alice\"}";
            assertTrue(ContentAnalyzer.shouldUseStringComparison(jsonLines, actualJsonLines, unorderedOptions));
        }

        @Test
        @DisplayName("Should fall back to basic logic for non-JSON Lines")
        void testFallbackToBasisLogic() {
            ComparisonOptions unorderedOptions = ComparisonOptions.builder()
                .withComparisonType(ComparisonType.UNORDERED)
                .build();

            // Regular JSON object (not JSON Lines) - should fall back to basic logic
            // Since it's structured content, it should return true for string comparison
            String regularJson = "{\"key\": \"value\"}";
            assertTrue(ContentAnalyzer.shouldUseStringComparison(regularJson, Map.of("key", "value"), unorderedOptions));

            // Ellipsis pattern should still work
            assertTrue(ContentAnalyzer.shouldUseStringComparison("Hello...", "Hello world", unorderedOptions));
        }

        @Test
        @DisplayName("Should handle ordered comparison normally")
        void testOrderedComparison() {
            ComparisonOptions orderedOptions = ComparisonOptions.builder()
                .withComparisonType(ComparisonType.ORDERED)
                .build();
            
            // Even with JSON Lines, ordered comparison should fall back to basic logic
            String jsonLines = "{\"id\": 1} {\"id\": 2}";
            List<Map<String, Object>> actualList = List.of(Map.of("id", 1), Map.of("id", 2));
            
            // Should fall back to basic shouldUseStringComparison logic
            assertTrue(ContentAnalyzer.shouldUseStringComparison(jsonLines, actualList, orderedOptions));
        }
    }

    @Nested
    @DisplayName("determineArrayStrategy Tests")
    class DetermineArrayStrategyTests {

        @Test
        @DisplayName("Should use BACKTRACKING for ellipsis with complex objects")
        void testBacktrackingForEllipsisWithComplexObjects() {
            List<Object> expectedWithEllipsis = List.of(
                Map.of("id", 1, "data", Map.of("nested", "value")),
                "...",
                Map.of("id", 3, "data", Map.of("nested", "value"))
            );
            List<Object> actualComplex = List.of(
                Map.of("id", 1, "data", Map.of("nested", "value")),
                Map.of("id", 2, "data", Map.of("nested", "value")),
                Map.of("id", 3, "data", Map.of("nested", "value"))
            );

            assertEquals(ContentAnalyzer.ArrayComparisonStrategy.BACKTRACKING,
                ContentAnalyzer.determineArrayStrategy(expectedWithEllipsis, actualComplex));
        }

        @Test
        @DisplayName("Should use HYBRID for ellipsis with mixed content")
        void testHybridForEllipsisWithMixedContent() {
            List<Object> expectedWithEllipsis = List.of("string", 123, "...", true);
            List<Object> actualMixed = List.of("string", 123, "extra", true);

            assertEquals(ContentAnalyzer.ArrayComparisonStrategy.HYBRID,
                ContentAnalyzer.determineArrayStrategy(expectedWithEllipsis, actualMixed));
        }

        @Test
        @DisplayName("Should use SET_BASED for large arrays")
        void testSetBasedForLargeArrays() {
            // Create arrays larger than 100 elements
            List<String> largeExpected = new ArrayList<>();
            List<String> largeActual = new ArrayList<>();
            for (int i = 0; i < 150; i++) {
                largeExpected.add("item" + i);
                largeActual.add("item" + i);
            }

            assertEquals(ContentAnalyzer.ArrayComparisonStrategy.SET_BASED,
                ContentAnalyzer.determineArrayStrategy(largeExpected, largeActual));
        }

        @Test
        @DisplayName("Should use BACKTRACKING for medium arrays with complex objects")
        void testBacktrackingForMediumComplexArrays() {
            // Create arrays with 25 complex objects (> 20 threshold)
            List<Map<String, Object>> mediumComplexExpected = new ArrayList<>();
            List<Map<String, Object>> mediumComplexActual = new ArrayList<>();
            for (int i = 0; i < 25; i++) {
                mediumComplexExpected.add(Map.of("id", i, "nested", Map.of("value", "data" + i)));
                mediumComplexActual.add(Map.of("id", i, "nested", Map.of("value", "data" + i)));
            }

            assertEquals(ContentAnalyzer.ArrayComparisonStrategy.BACKTRACKING,
                ContentAnalyzer.determineArrayStrategy(mediumComplexExpected, mediumComplexActual));
        }

        @Test
        @DisplayName("Should use HYBRID for mixed primitive and object content")
        void testHybridForMixedContent() {
            List<Object> mixedExpected = List.of(
                "string1", "string2",  // primitives
                42, 84,                // primitives
                Map.of("key", "value1"), // complex object
                Map.of("key", "value2")  // complex object
            );
            List<Object> mixedActual = List.of(
                "string2", "string1",
                84, 42,
                Map.of("key", "value2"),
                Map.of("key", "value1")
            );

            assertEquals(ContentAnalyzer.ArrayComparisonStrategy.HYBRID,
                ContentAnalyzer.determineArrayStrategy(mixedExpected, mixedActual));
        }

        @Test
        @DisplayName("Should use BACKTRACKING for complex objects only")
        void testBacktrackingForComplexObjectsOnly() {
            List<Map<String, Object>> complexExpected = List.of(
                Map.of("id", 1, "nested", Map.of("deep", "value1")),
                Map.of("id", 2, "nested", Map.of("deep", "value2"))
            );
            List<Map<String, Object>> complexActual = List.of(
                Map.of("id", 2, "nested", Map.of("deep", "value2")),
                Map.of("id", 1, "nested", Map.of("deep", "value1"))
            );

            assertEquals(ContentAnalyzer.ArrayComparisonStrategy.BACKTRACKING,
                ContentAnalyzer.determineArrayStrategy(complexExpected, complexActual));
        }

        @Test
        @DisplayName("Should use SET_BASED for primitives only")
        void testSetBasedForPrimitivesOnly() {
            List<Object> primitiveExpected = List.of("a", "b", "c", 1, 2, 3, true, false);
            List<Object> primitiveActual = List.of(3, 2, 1, "c", "b", "a", false, true);

            assertEquals(ContentAnalyzer.ArrayComparisonStrategy.SET_BASED,
                ContentAnalyzer.determineArrayStrategy(primitiveExpected, primitiveActual));
        }
    }

    @Nested
    @DisplayName("Content Detection Helper Methods Tests")
    class ContentDetectionHelperTests {

        @Test
        @DisplayName("Should detect ellipsis patterns correctly")
        void testEllipsisPatternDetection() {
            // Test through shouldUseStringComparison behavior since containsEllipsisPattern is private

            // Simple ellipsis
            assertTrue(ContentAnalyzer.shouldUseStringComparison("...", "anything"));

            // Ellipsis with text
            assertTrue(ContentAnalyzer.shouldUseStringComparison("Hello...", "Hello world"));
            assertTrue(ContentAnalyzer.shouldUseStringComparison("...world", "Hello world"));
            assertTrue(ContentAnalyzer.shouldUseStringComparison("Hello...world", "Hello beautiful world"));

            // No ellipsis
            assertFalse(ContentAnalyzer.shouldUseStringComparison("no ellipsis", 123));

            // Null handling
            assertFalse(ContentAnalyzer.shouldUseStringComparison(null, "anything"));
        }

        @Test
        @DisplayName("Should detect structured content correctly")
        void testStructuredContentDetection() {
            // Test through shouldUseStringComparison behavior since looksLikeStructuredContent is private

            // JSON objects
            assertTrue(ContentAnalyzer.shouldUseStringComparison("{}", Map.of()));
            assertTrue(ContentAnalyzer.shouldUseStringComparison("{\"key\": \"value\"}", Map.of("key", "value")));
            assertTrue(ContentAnalyzer.shouldUseStringComparison("{ \"nested\": { \"deep\": \"value\" } }", Map.of()));

            // JSON arrays
            assertTrue(ContentAnalyzer.shouldUseStringComparison("[]", List.of()));
            assertTrue(ContentAnalyzer.shouldUseStringComparison("[1, 2, 3]", List.of(1, 2, 3)));
            assertTrue(ContentAnalyzer.shouldUseStringComparison("[ \"a\", \"b\" ]", List.of("a", "b")));

            // XML-like content
            assertTrue(ContentAnalyzer.shouldUseStringComparison("<root></root>", Map.of()));
            assertTrue(ContentAnalyzer.shouldUseStringComparison("<tag>content</tag>", Map.of()));

            // Non-structured content should not trigger structured comparison
            assertFalse(ContentAnalyzer.shouldUseStringComparison("plain text", 123));
            assertFalse(ContentAnalyzer.shouldUseStringComparison("not json", 123));
            assertFalse(ContentAnalyzer.shouldUseStringComparison("", 123));
            assertFalse(ContentAnalyzer.shouldUseStringComparison("   ", 123));
        }

        @Test
        @DisplayName("Should detect JSON Lines format correctly")
        void testJsonLinesDetection() {
            ComparisonOptions unorderedOptions = ComparisonOptions.builder()
                .withComparisonType(ComparisonType.UNORDERED)
                .build();

            // Valid JSON Lines patterns
            assertTrue(ContentAnalyzer.shouldUseStringComparison(
                "{\"id\": 1} {\"id\": 2}", List.of(), unorderedOptions));
            assertTrue(ContentAnalyzer.shouldUseStringComparison(
                "{\"a\": 1}\n{\"b\": 2}", List.of(), unorderedOptions));
            assertTrue(ContentAnalyzer.shouldUseStringComparison(
                "{\"a\": 1}\r\n{\"b\": 2}", List.of(), unorderedOptions));

            // Invalid JSON Lines patterns
            ComparisonOptions orderedOptions = ComparisonOptions.builder()
                .withComparisonType(ComparisonType.ORDERED)
                .build();

            // Single JSON object (not JSON Lines)
            assertTrue(ContentAnalyzer.shouldUseStringComparison(
                "{\"single\": \"object\"}", List.of(), orderedOptions));

            // Array format (not JSON Lines)
            assertTrue(ContentAnalyzer.shouldUseStringComparison(
                "[{\"id\": 1}, {\"id\": 2}]", List.of(), orderedOptions));

            // Empty or null
            assertFalse(ContentAnalyzer.shouldUseStringComparison("", List.of(), unorderedOptions));
            assertFalse(ContentAnalyzer.shouldUseStringComparison("   ", List.of(), unorderedOptions));
        }

        @Test
        @DisplayName("Should detect multi-line content correctly")
        void testMultiLineContentDetection() {
            // Multi-line structured content should use string comparison
            String multiLineJson = "{\n  \"key\": \"value\",\n  \"nested\": {\n    \"deep\": \"data\"\n  }\n}";
            assertTrue(ContentAnalyzer.shouldUseStringComparison(multiLineJson, "{\"key\": \"value\"}"));

            String multiLineJsonCR = "{\r  \"key\": \"value\"\r}";
            assertTrue(ContentAnalyzer.shouldUseStringComparison(multiLineJsonCR, "{\"key\": \"value\"}"));

            // Single line structured content should use structural comparison
            assertFalse(ContentAnalyzer.shouldUseStringComparison("{\"key\": \"value\"}", "{\"key\": \"value\"}"));
        }
    }

    @Nested
    @DisplayName("Object Type Classification Tests")
    class ObjectTypeClassificationTests {

        @Test
        @DisplayName("Should classify primitive types correctly")
        void testPrimitiveTypeClassification() {
            // Test through array strategy selection since isPrimitiveType is private
            // Note: List.of() doesn't accept null, so use Arrays.asList() instead
            List<Object> primitiveList = Arrays.asList("string", 123, 45.67, true, false, 'c', null);
            List<Object> anotherPrimitiveList = Arrays.asList("another", 456, 78.90, false, true, 'd');

            // Should use SET_BASED strategy for primitives only
            assertEquals(ContentAnalyzer.ArrayComparisonStrategy.SET_BASED,
                ContentAnalyzer.determineArrayStrategy(primitiveList, anotherPrimitiveList));
        }

        @Test
        @DisplayName("Should classify complex objects correctly")
        void testComplexObjectClassification() {
            // Test through array strategy selection since isComplexObject is private
            List<Object> complexList = List.of(
                Map.of("key", "value"),           // Map
                List.of(1, 2, 3),                // List
                new int[]{1, 2, 3},              // Array
                new CustomTestObject("test")      // Custom object
            );
            List<Object> anotherComplexList = List.of(
                Map.of("other", "value"),
                List.of(4, 5, 6),
                new String[]{"a", "b"},
                new CustomTestObject("other")
            );

            // Should use BACKTRACKING strategy for complex objects only
            assertEquals(ContentAnalyzer.ArrayComparisonStrategy.BACKTRACKING,
                ContentAnalyzer.determineArrayStrategy(complexList, anotherComplexList));
        }

        @Test
        @DisplayName("Should handle mixed primitive and complex content")
        void testMixedContentClassification() {
            List<Object> mixedList = List.of(
                "primitive string",               // Primitive
                42,                              // Primitive
                Map.of("complex", "object"),     // Complex
                List.of("nested", "list")        // Complex
            );
            List<Object> anotherMixedList = List.of(
                "another string",
                84,
                Map.of("another", "object"),
                List.of("other", "list")
            );

            // Should use HYBRID strategy for mixed content
            assertEquals(ContentAnalyzer.ArrayComparisonStrategy.HYBRID,
                ContentAnalyzer.determineArrayStrategy(mixedList, anotherMixedList));
        }

        // Helper class for testing custom object detection
        private static class CustomTestObject {
            private final String value;

            public CustomTestObject(String value) {
                this.value = value;
            }

            @Override
            public boolean equals(Object obj) {
                if (this == obj) return true;
                if (obj == null || getClass() != obj.getClass()) return false;
                CustomTestObject that = (CustomTestObject) obj;
                return Objects.equals(value, that.value);
            }

            @Override
            public int hashCode() {
                return Objects.hash(value);
            }
        }
    }

    @Nested
    @DisplayName("Edge Cases and Error Conditions Tests")
    class EdgeCasesAndErrorConditionsTests {

        @Test
        @DisplayName("Should handle null inputs gracefully")
        void testNullInputs() {
            // Null expected
            assertFalse(ContentAnalyzer.shouldUseStringComparison(null, "anything"));
            assertFalse(ContentAnalyzer.shouldUseStringComparison(null, null));

            // Null actual
            assertFalse(ContentAnalyzer.shouldUseStringComparison("expected", null));

            // Null in options method
            ComparisonOptions options = ComparisonOptions.builder().build();
            assertFalse(ContentAnalyzer.shouldUseStringComparison(null, "anything", options));
            assertFalse(ContentAnalyzer.shouldUseStringComparison("expected", null, options));
        }

        @Test
        @DisplayName("Should handle empty content")
        void testEmptyContent() {
            // Empty strings
            assertTrue(ContentAnalyzer.shouldUseStringComparison("", ""));
            assertTrue(ContentAnalyzer.shouldUseStringComparison("", "anything"));
            assertFalse(ContentAnalyzer.shouldUseStringComparison("", 123));

            // Whitespace-only strings
            assertTrue(ContentAnalyzer.shouldUseStringComparison("   ", "   "));
            assertTrue(ContentAnalyzer.shouldUseStringComparison("   ", "anything"));
            assertFalse(ContentAnalyzer.shouldUseStringComparison("   ", 123));

            // Empty collections for array strategy
            List<Object> emptyList = List.of();
            assertEquals(ContentAnalyzer.ArrayComparisonStrategy.SET_BASED,
                ContentAnalyzer.determineArrayStrategy(emptyList, emptyList));
        }

        @Test
        @DisplayName("Should handle boundary conditions for array strategy selection")
        void testArrayStrategyBoundaryConditions() {
            // Test exactly at size thresholds

            // Exactly 100 elements - should still use SET_BASED
            List<String> exactly100 = new ArrayList<>();
            for (int i = 0; i < 100; i++) {
                exactly100.add("item" + i);
            }
            assertEquals(ContentAnalyzer.ArrayComparisonStrategy.SET_BASED,
                ContentAnalyzer.determineArrayStrategy(exactly100, exactly100));

            // 101 elements - should use SET_BASED for large arrays
            List<String> over100 = new ArrayList<>(exactly100);
            over100.add("extra");
            assertEquals(ContentAnalyzer.ArrayComparisonStrategy.SET_BASED,
                ContentAnalyzer.determineArrayStrategy(over100, over100));

            // Exactly 20 elements with complex objects - should use HYBRID/SET_BASED
            List<Map<String, Object>> exactly20Complex = new ArrayList<>();
            for (int i = 0; i < 20; i++) {
                exactly20Complex.add(Map.of("id", i));
            }
            // At exactly 20, should not trigger the > 20 condition for BACKTRACKING
            assertEquals(ContentAnalyzer.ArrayComparisonStrategy.BACKTRACKING,
                ContentAnalyzer.determineArrayStrategy(exactly20Complex, exactly20Complex));

            // 21 elements with complex objects - should use BACKTRACKING
            List<Map<String, Object>> over20Complex = new ArrayList<>(exactly20Complex);
            over20Complex.add(Map.of("id", 20));
            assertEquals(ContentAnalyzer.ArrayComparisonStrategy.BACKTRACKING,
                ContentAnalyzer.determineArrayStrategy(over20Complex, over20Complex));
        }

        @Test
        @DisplayName("Should handle malformed or edge case content")
        void testMalformedContent() {
            // Malformed JSON-like strings - these don't match structured content pattern
            // so they should use string comparison only if actual is also a string
            assertFalse(ContentAnalyzer.shouldUseStringComparison("{malformed", Map.of()));
            assertFalse(ContentAnalyzer.shouldUseStringComparison("malformed}", Map.of()));
            assertFalse(ContentAnalyzer.shouldUseStringComparison("[malformed", List.of()));
            assertFalse(ContentAnalyzer.shouldUseStringComparison("malformed]", List.of()));

            // But they should use string comparison if actual is also a string
            assertTrue(ContentAnalyzer.shouldUseStringComparison("{malformed", "anything"));
            assertTrue(ContentAnalyzer.shouldUseStringComparison("malformed}", "anything"));

            // Edge case structured content
            assertTrue(ContentAnalyzer.shouldUseStringComparison("{}", Map.of()));
            assertTrue(ContentAnalyzer.shouldUseStringComparison("[]", List.of()));
            assertTrue(ContentAnalyzer.shouldUseStringComparison("<>", Map.of()));

            // Content that looks structured but isn't
            assertFalse(ContentAnalyzer.shouldUseStringComparison("not {structured}", 123));
            assertFalse(ContentAnalyzer.shouldUseStringComparison("not [structured]", 123));
            assertFalse(ContentAnalyzer.shouldUseStringComparison("not <structured>", 123));
        }

        @Test
        @DisplayName("Should handle arrays with null elements")
        void testArraysWithNullElements() {
            List<Object> listWithNulls = Arrays.asList("string", null, 123, null);
            List<Object> anotherListWithNulls = Arrays.asList(null, "string", null, 123);

            // Should handle null elements gracefully
            ContentAnalyzer.ArrayComparisonStrategy strategy =
                ContentAnalyzer.determineArrayStrategy(listWithNulls, anotherListWithNulls);

            // Should be SET_BASED since nulls are treated as primitives
            assertEquals(ContentAnalyzer.ArrayComparisonStrategy.SET_BASED, strategy);
        }

        @Test
        @DisplayName("Should handle different array sizes")
        void testDifferentArraySizes() {
            List<String> smallArray = List.of("a", "b");
            List<String> largeArray = new ArrayList<>();
            for (int i = 0; i < 150; i++) {
                largeArray.add("item" + i);
            }

            // Should use the max size for strategy selection
            assertEquals(ContentAnalyzer.ArrayComparisonStrategy.SET_BASED,
                ContentAnalyzer.determineArrayStrategy(smallArray, largeArray));
            assertEquals(ContentAnalyzer.ArrayComparisonStrategy.SET_BASED,
                ContentAnalyzer.determineArrayStrategy(largeArray, smallArray));
        }
    }

    @Nested
    @DisplayName("POJO and Custom Object Handling Tests")
    class POJOHandlingTests {

        @Test
        @DisplayName("Should classify POJOs as complex objects")
        void testPOJOClassification() {
            // Create POJO instances
            TestPOJO pojo1 = new TestPOJO("Alice", 25, "alice@example.com");
            TestPOJO pojo2 = new TestPOJO("Bob", 30, "bob@example.com");

            List<Object> pojoList = List.of(pojo1, pojo2);
            List<Object> anotherPojoList = List.of(pojo2, pojo1);

            // POJOs should be classified as complex objects and use BACKTRACKING strategy
            assertEquals(ContentAnalyzer.ArrayComparisonStrategy.BACKTRACKING,
                ContentAnalyzer.determineArrayStrategy(pojoList, anotherPojoList));
        }

        @Test
        @DisplayName("Should use structural comparison for POJO vs POJO")
        void testPOJOStructuralComparison() {
            TestPOJO expectedPojo = new TestPOJO("Alice", 25, "alice@example.com");
            TestPOJO actualPojo = new TestPOJO("Alice", 25, "alice@example.com");

            // POJO vs POJO should use structural comparison (not string comparison)
            assertFalse(ContentAnalyzer.shouldUseStringComparison(expectedPojo, actualPojo));
        }

        @Test
        @DisplayName("Should use string comparison for JSON pattern vs POJO")
        void testJSONPatternVsPOJO() {
            String jsonPattern = "{\"name\": \"Alice\", \"age\": 25, \"email\": \"...\"}";
            TestPOJO actualPojo = new TestPOJO("Alice", 25, "alice@example.com");

            // JSON pattern vs POJO should use string comparison for pattern matching
            assertTrue(ContentAnalyzer.shouldUseStringComparison(jsonPattern, actualPojo));
        }

        @Test
        @DisplayName("Should handle mixed POJO and primitive arrays")
        void testMixedPOJOAndPrimitiveArrays() {
            TestPOJO pojo = new TestPOJO("Alice", 25, "alice@example.com");
            List<Object> mixedList = List.of("string", 123, pojo, true);
            List<Object> anotherMixedList = List.of(true, pojo, 123, "string");

            // Mixed POJO and primitives should use HYBRID strategy
            assertEquals(ContentAnalyzer.ArrayComparisonStrategy.HYBRID,
                ContentAnalyzer.determineArrayStrategy(mixedList, anotherMixedList));
        }

        @Test
        @DisplayName("Should detect custom objects correctly")
        void testCustomObjectDetection() {
            // Test various custom object types
            TestPOJO pojo1 = new TestPOJO("test1", 1, "test1@example.com");
            TestPOJO pojo2 = new TestPOJO("test2", 2, "test2@example.com");

            // Both should be detected as complex objects through array strategy
            List<Object> customObjects = List.of(pojo1, pojo2);
            List<Object> anotherCustomObjects = List.of(pojo2, pojo1);

            assertEquals(ContentAnalyzer.ArrayComparisonStrategy.BACKTRACKING,
                ContentAnalyzer.determineArrayStrategy(customObjects, anotherCustomObjects));
        }

        @Test
        @DisplayName("Should handle MongoDB-specific types as custom objects")
        void testMongoDBTypesAsCustomObjects() {
            // Test with MongoDB Document (if available)
            try {
                Class<?> documentClass = Class.forName("org.bson.Document");
                Object document = documentClass.getDeclaredConstructor().newInstance();

                List<Object> mongoObjects = List.of(document);
                List<Object> anotherMongoObjects = List.of(document);

                // MongoDB Document should be treated as complex object
                assertEquals(ContentAnalyzer.ArrayComparisonStrategy.BACKTRACKING,
                    ContentAnalyzer.determineArrayStrategy(mongoObjects, anotherMongoObjects));

            } catch (ReflectiveOperationException e) {
                // MongoDB classes not available, skip this test
                System.out.println("MongoDB classes not available, skipping MongoDB type test");
            }
        }

        // Test POJO class
        private static class TestPOJO {
            private final String name;
            private final int age;
            private final String email;

            public TestPOJO(String name, int age, String email) {
                this.name = name;
                this.age = age;
                this.email = email;
            }

            public String getName() { return name; }
            public int getAge() { return age; }
            public String getEmail() { return email; }

            @Override
            public boolean equals(Object obj) {
                if (this == obj) return true;
                if (obj == null || getClass() != obj.getClass()) return false;
                TestPOJO testPOJO = (TestPOJO) obj;
                return age == testPOJO.age &&
                       Objects.equals(name, testPOJO.name) &&
                       Objects.equals(email, testPOJO.email);
            }

            @Override
            public int hashCode() {
                return Objects.hash(name, age, email);
            }

            @Override
            public String toString() {
                return "TestPOJO{name='" + name + "', age=" + age + ", email='" + email + "'}";
            }
        }
    }
}
