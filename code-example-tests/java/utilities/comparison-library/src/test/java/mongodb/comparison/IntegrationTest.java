package mongodb.comparison;

import org.bson.Document;
import org.bson.types.ObjectId;
import org.junit.jupiter.api.Test;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Comprehensive tests for the comparison library covering all major scenarios
 * from the comparison spec.
 */
class ComparisonLibraryIntegrationTest {

    @Test
    void testSimpleFileComparison() {
        var actual = Map.of(
            "name", "Alice",
            "age", 25,
            "active", true
        );

        Expect.that(actual)
            .shouldMatch("test-data/simple-output.txt");
    }

    @Test
    void testMongoDBTypeNormalization() {
        var objectId1 = new ObjectId("507f1f77bcf86cd799439011");
        var objectId2 = new ObjectId("507f1f77bcf86cd799439012");

        var actual = List.of(
            Map.of("_id", objectId1, "name", "John", "status", "active"),
            Map.of("_id", objectId2, "name", "Jane", "status", "inactive")
        );

        Expect.that(actual)
            .shouldMatch("test-data/mongodb-types.txt");
    }

    @Test
    void testUnorderedArrayComparison() {
        var actual = List.of(
            Map.of("name", "third", "value", 3),
            Map.of("name", "first", "value", 1),
            Map.of("name", "second", "value", 2)
        );

        Expect.that(actual)
            .shouldMatch("test-data/unordered-array.txt");
    }

    @Test
    void testOrderedArrayComparisonFails() {
        var actual = List.of(
            Map.of("name", "third", "value", 3),
            Map.of("name", "first", "value", 1),
            Map.of("name", "second", "value", 2)
        );

        assertThrows(AssertionError.class, () ->
                Expect.that(actual)
                        .withOrderedSort()
                        .shouldMatch("test-data/unordered-array.txt"));
    }

    @Test
    void testIgnoredFields() {
        var actual = Map.of(
            "name", "Alice",
            "age", 25,
            "active", true,
            "_id", "different-id",
            "timestamp", new Date()
        );

        var expected = Map.of(
            "name", "Alice",
            "age", 25,
            "active", true,
            "_id", "original-id",
            "timestamp", "2023-01-01T00:00:00Z"
        );

        Expect.that(actual)
            .withIgnoredFields("_id", "timestamp")
            .shouldMatch(expected);
    }

    @Test
    void testEllipsisPatterns() {
        var actual = Map.of(
            "message", "Error: Connection timeout after 30 seconds",
            "code", 500,
            "timestamp", "2023-01-01T12:34:56Z"
        );

        Expect.that(actual)
            .shouldMatch("test-data/ellipsis-patterns.txt");
    }

    @Test
    void testTimeSeries() {
        var actual = List.of(
            Map.of("date", "2021-12-18T15:55:00Z", "ticker", "MDB", "close", 254.03, "volume", 40270.0),
            Map.of("date", "2021-12-18T15:56:00Z", "ticker", "MDB", "close", 253.63, "volume", 27890.0),
            Map.of("date", "2021-12-18T15:57:00Z", "ticker", "MDB", "close", 253.62, "volume", 40182.0)
        );

        Expect.that(actual)
            .shouldMatch("test-data/timeseries-jsonl.txt");
    }

    @Test
    void testNumericTypeCompatibility() {
        var actual = Map.of(
            "intValue", 42,
            "doubleValue", 42.0,
            "longValue", 42L
        );

        var expected = Map.of(
            "intValue", 42.0, // double instead of int
            "doubleValue", 42, // int instead of double
            "longValue", 42.0 // double instead of long
        );

        Expect.that(actual).shouldMatch(expected);
    }

    @Test
    void testNullHandling() {
        var actual = new HashMap<String, Object>();
        actual.put("name", "test");
        actual.put("optional", null);

        var expected = new HashMap<String, Object>();
        expected.put("name", "test");
        expected.put("optional", null);

        Expect.that(actual).shouldMatch(expected);
    }

    @Test
    void testMismatchReportsErrors() {
        var actual = Map.of(
            "name", "actual",
            "count", 43
        );

        var expected = Map.of(
            "name", "expected",
            "count", 42
        );

        assertThrows(AssertionError.class, () ->
                Expect.that(actual).shouldMatch(expected));
    }

    @Test
    void testDeepNesting() {
        var actual = Map.of(
            "level1", Map.of(
                "level2", Map.of(
                    "level3", Map.of(
                        "deepValue", "found",
                        "array", List.of(1, 2, 3)
                    )
                )
            )
        );

        var expected = Map.of(
            "level1", Map.of(
                "level2", Map.of(
                    "level3", Map.of(
                        "deepValue", "found",
                        "array", List.of(1, 2, 3)
                    )
                )
            )
        );

        Expect.that(actual).shouldMatch(expected);
    }

    @Test
    void testMixedTypeArray() {
        var actual = Arrays.asList(
            "string",
            42,
            true,
            null,
            Map.of("nested", "object"),
            List.of(1, 2, 3)
        );

        var expected = Arrays.asList(
            "string",
            42,
            true,
            null,
            Map.of("nested", "object"),
            List.of(1, 2, 3)
        );

        Expect.that(actual).shouldMatch(expected);
    }

    @Test
    void testBsonDocumentHandling() {
        var doc1 = new Document("name", "test").append("value", 42);
        var doc2 = new Document("name", "test").append("value", 42);

        Expect.that(doc1).shouldMatch(doc2);
    }
}
