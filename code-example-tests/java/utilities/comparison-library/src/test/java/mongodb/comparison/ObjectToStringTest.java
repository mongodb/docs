package mongodb.comparison;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import static org.junit.jupiter.api.Assertions.*;

/**
 * Tests string comparison functionality for handling:
 * 1. POJO toString() representations
 * 2. Collection toString() formats (List, Set, Map toString() methods)
 * 3. Complex object structure comparison within strings
 * 4. Class-specific toString() pattern matching for MongoDB result objects
 *
 * These tests validate patterns commonly found in MongoDB documentation examples.
 */
class ComplexObjectToStringTest {

    // POJO toString() Support Tests

    @Test
    @DisplayName("Should handle basic POJO toString() with ellipsis")
    void testBasicPOJOToStringWithEllipsis() {
        String expected = "Flower{id=..., name='daisy'}";
        String actual = "Flower{id=507f1f77bcf86cd799439013, name='daisy'}";

        Expect.that(actual)
            .shouldMatch(expected);
    }

    @Test
    @DisplayName("Should handle POJO toString() with multiple ellipsis fields")
    void testPOJOWithMultipleEllipsisFields() {
        String expected = "Flower{id=..., name='daisy', colors=[purple, white], isBlooming=..., height=21.1}";
        String actual = "Flower{id=507f1f77bcf86cd799439013, name='daisy', colors=[purple, white], isBlooming=true, height=21.1}";

        Expect.that(actual)
            .shouldMatch(expected);
    }

    @Test
    @DisplayName("Should handle POJO toString() with extra fields in actual")
    void testPOJOWithExtraFields() {
        String expected = "Flower{id=..., name='daisy'}";
        String actual = "Flower{id=507f1f77bcf86cd799439013, name='daisy', colors=[purple, white], height=21.1, createdAt=2023-09-04}";

        Expect.that(actual)
            .shouldMatch(expected);
    }

    @Test
    @DisplayName("Should handle POJO toString() with nested collections")
    void testPOJOWithNestedCollections() {
        String expected = "Flower{id=..., name='peony', colors=[...], tags={type=..., season=spring}}";
        String actual = "Flower{id=507f1f77bcf86cd799439014, name='peony', colors=[red, green, yellow], tags={type=perennial, season=spring, zone=5}}";

        Expect.that(actual)
            .shouldMatch(expected);
    }

    @Test
    @DisplayName("Should fail when POJO class names don't match")
    void testPOJOClassNameMismatch() {
        String expected = "Flower{id=..., name='daisy'}";
        String actual = "Plant{id=507f1f77bcf86cd799439013, name='daisy'}";

        assertThrows(AssertionError.class, () ->
                Expect.that(actual).shouldMatch(expected));
    }

    @Test
    @DisplayName("Should fail when required POJO fields are missing")
    void testPOJORequiredFieldMissing() {
        String expected = "Flower{id=..., name='daisy', height=21.1}";
        String actual = "Flower{id=507f1f77bcf86cd799439013, name='daisy'}"; // height missing

        assertThrows(AssertionError.class, () ->
                Expect.that(actual).shouldMatch(expected));
    }

    // MongoDB Result Objects Tests

    @Test
    @DisplayName("Should handle BulkWriteResult toString() with ellipsis")
    void testBulkWriteResultToString() {
        String expected = "BulkWriteResult{acknowledged=true, insertedCount=..., deletedCount=0}";
        String actual = "BulkWriteResult{acknowledged=true, insertedCount=25, deletedCount=0, matchedCount=0, modifiedCount=0}";

        Expect.that(actual)
            .shouldMatch(expected);
    }

    @Test
    @DisplayName("Should handle InsertResult toString() with ellipsis")
    void testInsertResultToString() {
        String expected = "InsertOneResult{acknowledged=true, insertedId=...}";
        String actual = "InsertOneResult{acknowledged=true, insertedId=BsonObjectId{value=507f1f77bcf86cd799439013}}";

        Expect.that(actual)
            .shouldMatch(expected);
    }

    @Test
    @DisplayName("Should handle InsertManyResult toString() with ellipsis")
    void testInsertManyResultToString() {
        String expected = "InsertManyResult{acknowledged=true, insertedIds={...}}";
        String actual = "InsertManyResult{acknowledged=true, insertedIds={0=BsonObjectId{value=507f1f77bcf86cd799439013}, 1=BsonObjectId{value=507f1f77bcf86cd799439014}}}";

        Expect.that(actual)
            .shouldMatch(expected);
    }

    @Test
    @DisplayName("Should handle generic MongoDB result patterns")
    void testGenericMongoDBResultPatterns() {
        String expected = "UpdateResult{acknowledged=true, matchedCount=..., modifiedCount=...}";
        String actual = "UpdateResult{acknowledged=true, matchedCount=5, modifiedCount=5, upsertedId=null}";

        Expect.that(actual)
            .shouldMatch(expected);
    }

    // Collection toString() Support Tests

    @Test
    @DisplayName("Should handle List toString() with ellipsis")
    void testListToStringWithEllipsis() {
        String expected = "[507f1f77bcf86cd799439013, 507f1f77bcf86cd799439014, ...]";
        String actual = "[507f1f77bcf86cd799439013, 507f1f77bcf86cd799439014, 507f1f77bcf86cd799439015, 507f1f77bcf86cd799439016]";

        Expect.that(actual)
            .shouldMatch(expected);
    }

    @Test
    @DisplayName("Should handle Set toString() with ellipsis")
    void testSetToStringWithEllipsis() {
        String expected = "[red, green, ...]";
        String actual = "[red, green, blue, yellow, purple]";

        Expect.that(actual)
            .shouldMatch(expected);
    }

    @Test
    @DisplayName("Should handle Map toString() with ellipsis")
    void testMapToStringWithEllipsis() {
        String expected = "{type=flower, season=spring, ...}";
        String actual = "{type=flower, season=spring, zone=5, watering=weekly, sunlight=full}";

        Expect.that(actual)
            .shouldMatch(expected);
    }

    @Test
    @DisplayName("Should handle empty collections")
    void testEmptyCollections() {
        String expected = "[]";
        String actual = "[]";

        Expect.that(actual)
            .shouldMatch(expected);
    }

    @Test
    @DisplayName("Should handle collection with all ellipsis")
    void testCollectionWithAllEllipsis() {
        String expected = "[...]";
        String actual = "[item1, item2, item3, item4, item5]";

        Expect.that(actual)
            .shouldMatch(expected);
    }

    // Complex Nested Structures Tests

    @Test
    @DisplayName("Should handle nested POJO with collection fields")
    void testNestedPOJOWithCollections() {
        String expected = "Garden{name='...' flowers=[Flower{name='rose', ...}, ...], tools=[...]}";
        String actual = "Garden{name='My Garden', flowers=[Flower{name='rose', colors=[red]}, Flower{name='tulip', colors=[yellow]}], tools=[shovel, hose, gloves]}";

        Expect.that(actual)
            .shouldMatch(expected);
    }

    @Test
    @DisplayName("Should handle result objects in console output")
    void testResultObjectsInConsoleOutput() {
        String expected = """
            Bulk write operation completed.
            Result: BulkWriteResult{acknowledged=true, insertedCount=..., deletedCount=0}
            Operation took ... ms
            """;
        String actual = """
            Bulk write operation completed.
            Result: BulkWriteResult{acknowledged=true, insertedCount=25, deletedCount=0, matchedCount=5, modifiedCount=5}
            Operation took 127 ms
            """;

        Expect.that(actual)
            .shouldMatch(expected);
    }

    @Test
    @DisplayName("Should handle POJO array in console output")
    void testPOJOArrayInConsoleOutput() {
        String expected = """
            Found flowers: [Flower{id=..., name='daisy', ...}, Flower{id=..., name='rose', ...}]
            Total count: 2
            """;
        String actual = """
            Found flowers: [Flower{id=507f1f77bcf86cd799439013, name='daisy', colors=[white, yellow], height=15.5}, Flower{id=507f1f77bcf86cd799439014, name='rose', colors=[red], height=30.0, thorns=true}]
            Total count: 2
            """;

        Expect.that(actual)
            .shouldMatch(expected);
    }

    // Real-World MongoDB Documentation Patterns

    @Test
    @DisplayName("Should handle reactive streams result patterns")
    void testReactiveStreamsResultPatterns() {
        String expected = "Publisher created: ..., Result: BulkWriteResult{acknowledged=true, insertedCount=...}";
        String actual = "Publisher created: reactor.core.publisher.FluxFlatMap@1a2b3c4d, Result: BulkWriteResult{acknowledged=true, insertedCount=15, deletedCount=0, matchedCount=0, modifiedCount=0}";

        Expect.that(actual)
            .shouldMatch(expected);
    }

    @Test
    @DisplayName("Should handle exception messages with embedded results")
    void testExceptionMessagesWithEmbeddedResults() {
        String expected = """
            MongoBulkWriteException occurred
            Partial result: BulkWriteResult{acknowledged=true, insertedCount=..., deletedCount=0}
            Successfully processed IDs: [...]
            Failed operations: 2
            """;
        String actual = """
            MongoBulkWriteException occurred
            Partial result: BulkWriteResult{acknowledged=true, insertedCount=10, deletedCount=0, matchedCount=0, modifiedCount=0}
            Successfully processed IDs: [507f1f77bcf86cd799439013, 507f1f77bcf86cd799439014, 507f1f77bcf86cd799439015]
            Failed operations: 2
            """;

        Expect.that(actual)
            .shouldMatch(expected);
    }

    @Test
    @DisplayName("Should handle performance monitoring output")
    void testPerformanceMonitoringOutput() {
        String expected = """
            Query execution completed
            Documents examined: ...
            Documents returned: ...
            Execution stats: QueryStats{totalDocsExamined=..., totalKeysExamined=..., ...}
            """;
        String actual = """
            Query execution completed
            Documents examined: 1500
            Documents returned: 25
            Execution stats: QueryStats{totalDocsExamined=1500, totalKeysExamined=1500, indexesUsed=[name_1], executionTimeMillis=45}
            """;

        Expect.that(actual)
            .shouldMatch(expected);
    }

    // Edge Cases and Error Handling

    @Test
    @DisplayName("Should handle malformed POJO toString()")
    void testMalformedPOJOToString() {
        String expected = "InvalidClass{field=...}";
        String actual = "InvalidClass{field=value, malformed";  // Missing closing brace

        assertThrows(AssertionError.class, () ->
                Expect.that(actual).shouldMatch(expected));
    }

    @Test
    @DisplayName("Should handle mixed JSON and POJO patterns")
    void testMixedJsonAndPOJOPatterns() {
        String expected = """
            Query result: {"status": "success", "count": ...}
            Objects: [Flower{name='daisy', ...}, ...]
            """;
        String actual = """
            Query result: {"status": "success", "count": 25}
            Objects: [Flower{name='daisy', colors=[white]}, Flower{name='rose', colors=[red]}]
            """;

        Expect.that(actual)
            .shouldMatch(expected);
    }

    @Test
    @DisplayName("Should provide helpful error messages for POJO mismatches")
    void testPOJOErrorMessages() {
        String expected = "Flower{id=123, name='rose'}";
        String actual = "Flower{id=456, name='daisy'}";

        assertThrows(AssertionError.class, () ->
                Expect.that(actual).shouldMatch(expected));
    }

    // Integration with Existing Features

    @Test
    @DisplayName("Should work with unordered comparison options")
    void testPOJOWithUnorderedComparison() {
        // Test unordered comparison within string content containing POJO arrays
        String expected = "Results: [Flower{name='rose', ...}, Flower{name='daisy', ...}]";
        String actual = "Results: [Flower{name='daisy', id=507f1f77bcf86cd799439014}, Flower{name='rose', id=507f1f77bcf86cd799439013}]";

        // Test with unordered comparison - should match despite different order
        Expect.that(actual)
            .shouldMatch(expected);

        // Test with ordered comparison - should fail due to different order
        assertThrows(AssertionError.class, () ->
                Expect.that(actual)
                        .withOrderedSort()
                        .shouldMatch(expected));
    }

    @Test
    @DisplayName("Should maintain backward compatibility")
    void testBackwardCompatibility() {
        // Ensure existing string comparison still works
        String expected = "Simple string with ellipsis: ...";
        String actual = "Simple string with ellipsis: any content here";

        Expect.that(actual)
            .shouldMatch(expected);
    }
}
