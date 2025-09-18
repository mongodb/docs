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

        var result = OutputValidator.expect(actual)
            .toMatchFile("test-data/simple-output.txt");

        assertTrue(result.isMatch(), "Simple file comparison should succeed");
    }

    @Test
    void testMongoDBTypeNormalization() {
        var objectId1 = new ObjectId("507f1f77bcf86cd799439011");
        var objectId2 = new ObjectId("507f1f77bcf86cd799439012");

        var actual = List.of(
            Map.of("_id", objectId1, "name", "John", "status", "active"),
            Map.of("_id", objectId2, "name", "Jane", "status", "inactive")
        );

        var result = OutputValidator.expect(actual)
            .toMatchFile("test-data/mongodb-types.txt");

        assertTrue(result.isMatch(), "MongoDB type normalization should work");
    }

    @Test
    void testUnorderedArrayComparison() {
        var actual = List.of(
            Map.of("name", "third", "value", 3),
            Map.of("name", "first", "value", 1),
            Map.of("name", "second", "value", 2)
        );

        var result = OutputValidator.expect(actual)
            .withUnorderedArrays()
            .toMatchFile("test-data/unordered-array.txt");

        assertTrue(result.isMatch(), "Unordered array comparison should succeed");
    }

    @Test
    void testOrderedArrayComparisonFails() {
        var actual = List.of(
            Map.of("name", "third", "value", 3),
            Map.of("name", "first", "value", 1),
            Map.of("name", "second", "value", 2)
        );

        var result = OutputValidator.expect(actual)
            .withOrderedArrays()
            .toMatchFile("test-data/unordered-array.txt");

        assertFalse(result.isMatch(), "Ordered array comparison should fail when order differs");
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

        var result = OutputValidator.expect(actual)
            .withIgnoredFields("_id", "timestamp")
            .toMatch(expected);

        assertTrue(result.isMatch(), "Ignored fields should not affect comparison");
    }

    @Test
    void testEllipsisPatterns() {
        var actual = Map.of(
            "message", "Error: Connection timeout after 30 seconds",
            "code", 500,
            "timestamp", "2023-01-01T12:34:56Z"
        );

        var result = OutputValidator.expect(actual)
            .toMatchFile("test-data/ellipsis-patterns.txt");

        assertTrue(result.isMatch(), "Ellipsis patterns should match");
    }

    @Test
    void testTimeSeries() {
        var actual = List.of(
            Map.of("date", "2021-12-18T15:55:00Z", "ticker", "MDB", "close", 254.03, "volume", 40270.0),
            Map.of("date", "2021-12-18T15:56:00Z", "ticker", "MDB", "close", 253.63, "volume", 27890.0),
            Map.of("date", "2021-12-18T15:57:00Z", "ticker", "MDB", "close", 253.62, "volume", 40182.0)
        );

        var result = OutputValidator.expect(actual)
            .toMatchFile("test-data/timeseries-jsonl.txt");

        assertTrue(result.isMatch(), "Time series data should match");
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

        var result = OutputValidator.expect(actual).toMatch(expected);

        assertTrue(result.isMatch(), "Different numeric types with same value should match");
    }

    @Test
    void testNullHandling() {
        var actual = new HashMap<String, Object>();
        actual.put("name", "test");
        actual.put("optional", null);

        var expected = new HashMap<String, Object>();
        expected.put("name", "test");
        expected.put("optional", null);

        var result = OutputValidator.expect(actual).toMatch(expected);

        assertTrue(result.isMatch(), "Null values should match");
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

        var result = OutputValidator.expect(actual).toMatch(expected);

        assertFalse(result.isMatch(), "Mismatched values should fail");
        assertFalse(result.errors().isEmpty(), "Should have error details");
        assertTrue(result.errors().stream().anyMatch(e -> e.path().equals("name")),
            "Should report name field error");
        assertTrue(result.errors().stream().anyMatch(e -> e.path().equals("count")),
            "Should report count field error");
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

        var result = OutputValidator.expect(actual).toMatch(expected);

        assertTrue(result.isMatch(), "Deep nesting should work correctly");
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

        var result = OutputValidator.expect(actual).toMatch(expected);

        assertTrue(result.isMatch(), "Mixed type arrays should match");
    }

    @Test
    void testBsonDocumentHandling() {
        var doc1 = new Document("name", "test").append("value", 42);
        var doc2 = new Document("name", "test").append("value", 42);

        var result = OutputValidator.expect(doc1).toMatch(doc2);

        assertTrue(result.isMatch(), "BSON Documents should match when equivalent");
    }
}
