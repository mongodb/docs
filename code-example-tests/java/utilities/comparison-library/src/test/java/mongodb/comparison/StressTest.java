package mongodb.comparison;

import org.bson.Document;
import org.bson.types.ObjectId;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Tests for edge cases and potential failure scenarios based on real-world usage patterns.
 */
class StressTest {

    @Test
    @DisplayName("Very deeply nested documents - stress test for recursion")
    void testDeeplyNestedDocuments() {
        // Create a very deeply nested structure (common in recursive data)
        Map<String, Object> deep = Map.of("value", "bottom");
        for (int i = 0; i < 20; i++) {
            deep = Map.of("level" + i, deep);
        }

        var result = OutputValidator.expect(deep)
            .toMatch(deep);

        assertTrue(result.isMatch(), "Deeply nested structures should be handled");
    }

    @Test
    @DisplayName("Large arrays with mixed types - performance test")
    void testLargeArraysWithMixedTypes() {
        var largeArray = new ArrayList<>();
        for (int i = 0; i < 1000; i++) {
            largeArray.add(switch (i % 5) {
                case 0 -> "string_" + i;
                case 1 -> i;
                case 2 -> i % 2 == 0;
                case 3 -> new ObjectId();
                case 4 -> Map.of("nested", i);
                default -> null;
            });
        }

        var actualResult = Map.of("largeArray", largeArray);

        var result = OutputValidator.expect(actualResult)
            .toMatch(actualResult);

        assertTrue(result.isMatch(), "Large arrays with mixed types should be handled");
    }

    @Test
    @DisplayName("Circular reference handling - should not cause infinite recursion")
    void testCircularReferences() {
        // Note: This is tricky because Map.of() creates immutable maps
        // We'll test a scenario that could appear in real data
        var document = new Document("_id", new ObjectId());
        var child = new Document("parent", document);
        // We can't create true circular references with immutable structures,
        // but we can test self-reference patterns
        document.append("self", document);

        var result = OutputValidator.expect(document)
            .toMatch(document);

        // This should either work or fail gracefully, not infinite loop
        assertTrue(result.isMatch(), "Self-referencing documents should be handled");
    }

    @Test
    @DisplayName("Empty and null collections - boundary conditions")
    void testEmptyAndNullCollections() {
        // Use HashMap instead of Map.of() to support null values
        var testData = new HashMap<String, Object>();
        testData.put("emptyList", List.of());
        testData.put("emptyMap", Map.of());
        testData.put("nullList", null);
        testData.put("emptyString", "");
        testData.put("whitespaceString", "   ");

        var expectedData = new HashMap<String, Object>();
        expectedData.put("emptyList", List.of());
        expectedData.put("emptyMap", Map.of());
        expectedData.put("nullList", null);
        expectedData.put("emptyString", "");
        expectedData.put("whitespaceString", ""); // Trimmed

        var result = OutputValidator.expect(testData)
            .toMatch(expectedData);

        assertTrue(result.isMatch(), "Empty and null collections should be normalized correctly");
    }

    @Test
    @DisplayName("Very long strings - potential memory issues")
    void testVeryLongStrings() {
        var longString = "x".repeat(10000);
        var actualResult = Map.of("longText", longString);

        var result = OutputValidator.expect(actualResult)
            .toMatch(actualResult);

        assertTrue(result.isMatch(), "Very long strings should be handled");
    }

    @Test
    @DisplayName("Mixed numeric precision scenarios")
    void testMixedNumericPrecision() {
        var actualData = Map.of(
            "int", 42,
            "long", 42L,
            "float", 42.0f,
            "double", 42.0,
            "precision", 0.1 + 0.2 // Classic floating point precision issue
        );

        var expectedData = Map.of(
            "int", 42.0, // Different type but same value
            "long", 42,  // Different type but same value
            "float", 42L, // Different type but same value
            "double", 42.0f, // Different type but same value
            "precision", 0.3 // What 0.1 + 0.2 should equal
        );

        var result = OutputValidator.expect(actualData)
            .toMatch(expectedData);

        assertTrue(result.isMatch(), "Numeric precision should be handled correctly");
    }

    @Test
    @DisplayName("Unicode and special characters in strings")
    void testUnicodeAndSpecialCharacters() {
        var unicodeData = Map.of(
            "emoji", "🚀 MongoDB 🔥",
            "unicode", "Héllo Wörld 中文",
            "special", "Line1\nLine2\tTabbed",
            "quotes", "\"Single 'quotes' and double\"",
            "backslashes", "C:\\Windows\\Path\\file.txt"
        );

        var result = OutputValidator.expect(unicodeData)
            .toMatch(unicodeData);

        assertTrue(result.isMatch(), "Unicode and special characters should be preserved");
    }

    @Test
    @DisplayName("Array ordering edge cases with duplicates")
    void testArrayOrderingWithDuplicates() {
        var actualArray = Arrays.asList("a", "b", "a", "c", "b");
        var expectedArrayOrdered = Arrays.asList("a", "b", "a", "c", "b");
        var expectedArrayReordered = Arrays.asList("b", "a", "c", "b", "a");

        // Ordered arrays - should match exactly
        var orderedResult = OutputValidator.expect(actualArray)
            .withOrderedArrays()
            .toMatch(expectedArrayOrdered);

        assertTrue(orderedResult.isMatch(), "Ordered arrays with duplicates should match exactly");

        // Ordered arrays with different order - should NOT match
        var orderedDifferentResult = OutputValidator.expect(actualArray)
            .withOrderedArrays()
            .toMatch(expectedArrayReordered);

        assertFalse(orderedDifferentResult.isMatch(), "Ordered arrays with different order should not match");

        // Unordered arrays - should match even with reordering
        var unorderedResult = OutputValidator.expect(actualArray)
            .withUnorderedArrays()
            .toMatch(expectedArrayReordered);

        assertTrue(unorderedResult.isMatch(), "Unordered arrays should match despite reordering");
    }

    @Test
    @DisplayName("Field exclusion with nested paths")
    void testFieldExclusionWithNestedPaths() {
        var actualData = Map.of(
            "_id", new ObjectId(),
            "timestamp", new Date(),
            "data", Map.of(
                "_id", new ObjectId(),
                "value", "important",
                "timestamp", new Date()
            ),
            "metadata", Map.of(
                "created", new Date(),
                "version", 1
            )
        );

        var expectedData = Map.of(
            "data", Map.of("value", "important"),
            "metadata", Map.of("version", 1)
        );

        // Should ignore _id and timestamp fields at all levels
        var result = OutputValidator.expect(actualData)
            .withIgnoredFields("_id", "timestamp", "created")
            .toMatch(expectedData);

        assertTrue(result.isMatch(), "Nested field exclusion should work correctly");
    }
}
