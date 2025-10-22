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

        Expect.that(deep)
            .shouldMatch(deep);
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

        Expect.that(actualResult)
            .shouldMatch(actualResult);
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

        // This should either work or fail gracefully, not infinite loop
        Expect.that(document)
            .shouldMatch(document);
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

        Expect.that(testData)
            .shouldMatch(expectedData);
    }

    @Test
    @DisplayName("Very long strings - potential memory issues")
    void testVeryLongStrings() {
        var longString = "x".repeat(10000);
        var actualResult = Map.of("longText", longString);

        Expect.that(actualResult)
            .shouldMatch(actualResult);
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

        Expect.that(actualData)
            .shouldMatch(expectedData);
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

        Expect.that(unicodeData)
            .shouldMatch(unicodeData);
    }

    @Test
    @DisplayName("Array ordering edge cases with duplicates")
    void testArrayOrderingWithDuplicates() {
        var actualArray = Arrays.asList("a", "b", "a", "c", "b");
        var expectedArrayOrdered = Arrays.asList("a", "b", "a", "c", "b");
        var expectedArrayReordered = Arrays.asList("b", "a", "c", "b", "a");

        // Ordered arrays - should match exactly
        Expect.that(actualArray)
            .withOrderedSort()
            .shouldMatch(expectedArrayOrdered);

        // Ordered arrays with different order - should NOT match
        assertThrows(AssertionError.class, () ->
                Expect.that(actualArray)
                        .withOrderedSort()
                        .shouldMatch(expectedArrayReordered));

        // Unordered arrays - should match even with reordering
        Expect.that(actualArray)
            .shouldMatch(expectedArrayReordered);
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
        Expect.that(actualData)
            .withIgnoredFields("_id", "timestamp", "created")
            .shouldMatch(expectedData);
    }
}
