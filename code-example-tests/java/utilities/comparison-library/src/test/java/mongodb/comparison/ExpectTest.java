package mongodb.comparison;

import org.bson.Document;
import org.bson.types.ObjectId;
import org.bson.types.Decimal128;

import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.LinkedHashMap;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Tests for the Expect API.
 */
class ExpectTest {

    @Nested
    public class TypeHandling {
        @Test
        void testBasicDocumentComparison() {
            Document expected = Document.parse("{\"name\": \"test\", \"count\": 42}");
            Document actual = Document.parse("{\"name\": \"test\", \"count\": 42}");

            Expect.that(actual).shouldMatch(expected);
        }

        @Test
        void testListComparison() {
            List<Document> expected = List.of(
                    Document.parse("{\"name\": \"first\", \"value\": 1}"),
                    Document.parse("{\"name\": \"second\", \"value\": 2}")
            );
            List<Document> actual = List.of(
                    Document.parse("{\"name\": \"second\", \"value\": 2}"),
                    Document.parse("{\"name\": \"first\", \"value\": 1}")
            );

            // Unordered comparison should match (default behavior)
            Expect.that(actual).shouldMatch(expected);

            // Ordered comparison should fail
            assertThrows(AssertionError.class, () ->
                    Expect.that(actual)
                            .withOrderedSort()
                            .shouldMatch(expected));
        }

        @Test
        void testEmptyLists() {
            List<Document> empty1 = List.of();
            List<Document> empty2 = List.of();

            Expect.that(empty1).shouldMatch(empty2);
        }

        @Test
        void testNullHandling() {
            Expect.that(null).shouldMatch(null);

            assertThrows(AssertionError.class, () ->
                    Expect.that(null).shouldMatch("not null"));
        }
    }

    @Nested
    public class OptionsHandling {
        @Test
        void testIgnoredFields() {
            Document expected = Document.parse("{\"name\": \"test\", \"_id\": \"ignored1\"}");
            Document actual = Document.parse("{\"name\": \"test\", \"_id\": \"ignored2\"}");

            Expect.that(actual)
                    .withIgnoredFields("_id")
                    .shouldMatch(expected);
        }

        @Test
        void testExplicitUnorderedSort() {
            // Test that withUnorderedSort() explicitly enables unordered comparison
            List<Document> expected = List.of(
                    Document.parse("{\"name\": \"first\", \"value\": 1}"),
                    Document.parse("{\"name\": \"second\", \"value\": 2}")
            );
            List<Document> actual = List.of(
                    Document.parse("{\"name\": \"second\", \"value\": 2}"),
                    Document.parse("{\"name\": \"first\", \"value\": 1}")
            );

            // Explicitly use withUnorderedSort() - should match even though order differs
            Expect.that(actual)
                    .withUnorderedSort()
                    .shouldMatch(expected);
        }

        @Test
        void testOrderedVsUnorderedComparison() {
            // Test that withUnorderedSort() and withOrderedSort() behave differently
            List<Document> expected = List.of(
                    Document.parse("{\"id\": 1}"),
                    Document.parse("{\"id\": 2}"),
                    Document.parse("{\"id\": 3}")
            );
            List<Document> actual = List.of(
                    Document.parse("{\"id\": 3}"),
                    Document.parse("{\"id\": 1}"),
                    Document.parse("{\"id\": 2}")
            );

            // Unordered should succeed
            assertDoesNotThrow(() ->
                    Expect.that(actual)
                            .withUnorderedSort()
                            .shouldMatch(expected));

            // Ordered should fail
            assertThrows(AssertionError.class, () ->
                    Expect.that(actual)
                            .withOrderedSort()
                            .shouldMatch(expected));
        }
    }

    @Nested
    public class AssertionHandling {
        @Test
        void testAssertionFailure() {
            Document expected = Document.parse("{\"name\": \"expected\"}");
            Document actual = Document.parse("{\"name\": \"actual\"}");

            assertThrows(AssertionError.class, () ->
                    Expect.that(actual).shouldMatch(expected));
        }

        @Test
        void testAssertMatchesWithDebugSuccess() {
            // Test that shouldMatchWithDebug works for successful comparisons
            Document expected = Document.parse("{\"name\": \"test\", \"value\": 42}");
            Document actual = Document.parse("{\"name\": \"test\", \"value\": 42}");

            // Should not throw any exception for matching documents
            assertDoesNotThrow(() ->
                    Expect.that(actual).shouldMatchWithDebug(expected));
        }

        @Test
        void testAssertMatchesWithDebugFailure() {
            // Test that shouldMatchWithDebug throws AssertionError with debug info on failure
            Document expected = Document.parse("{\"name\": \"expected\", \"count\": 42}");
            Document actual = Document.parse("{\"name\": \"actual\", \"count\": 43}");

            // Should throw AssertionError with detailed debug information
            AssertionError error = assertThrows(AssertionError.class, () ->
                    Expect.that(actual).shouldMatchWithDebug(expected));

            // Verify the error message contains debug information
            String errorMessage = error.getMessage();
            assertTrue(errorMessage.contains("Comparison failed"),
                "Error should contain comparison failure message");
            // The debug output shows detailed error information - check for error indicators
            assertTrue(errorMessage.contains("error") || errorMessage.contains("Path:") ||
                      errorMessage.contains("Expected:") || errorMessage.contains("Actual:"),
                "Error should contain detailed debug information");
        }

        @Test
        void testAssertMatchesWithDebugComplexObjects() {
            // Test debug output with complex nested objects
            Map<String, Object> expected = Map.of(
                "user", Map.of("name", "Alice", "age", 30),
                "items", List.of("item1", "item2"),
                "active", true
            );

            Map<String, Object> actual = Map.of(
                "user", Map.of("name", "Bob", "age", 25),  // Different values
                "items", List.of("item1", "item3"),        // Different item
                "active", false                            // Different boolean
            );

            // Should throw with detailed debug information about nested differences
            AssertionError error = assertThrows(AssertionError.class, () ->
                    Expect.that(actual).shouldMatchWithDebug(expected));

            String errorMessage = error.getMessage();
            assertTrue(errorMessage.contains("Comparison failed"),
                "Error should indicate comparison failure");
            // The error should contain information about the mismatched fields
            assertTrue(errorMessage.length() > 50,
                "Error message should be detailed for complex object comparison");
        }
    }

    @Test
    void testFailureWithDebugInfo() {
        Document expected = Document.parse("{\"name\": \"expected\", \"count\": 42}");
        Document actual = Document.parse("{\"name\": \"actual\", \"count\": 43}");

        assertThrows(AssertionError.class, () ->
                Expect.that(actual).shouldMatch(expected));
    }

    /**
     * Verify real-world MongoDB Java driver pattern tests through entire Expect API pipeline.
     * These tests validate actual MongoDB Java driver output patterns found in documentation examples.
     */
    @Nested
    public class RealWorldPatterns {
        @Test
        @DisplayName("Should handle BulkWriteResult toString() patterns from bulk operations")
        void testBulkWriteResultStringPatterns() {
            // Pattern from BulkWrite.java - BulkWriteResult output formatted as string
            String bulkResultOutput = """
            Result statistics:
            inserted: 2
            updated: 1
            deleted: 1
            """;

            // Should handle multi-line bulk operation results with ellipsis patterns
            String expectedWithEllipsis = """
            Result statistics:
            inserted: ...
            updated: ...
            deleted: ...
            """;

            assertDoesNotThrow(() -> {
                Expect.that(bulkResultOutput)
                        .shouldMatch(expectedWithEllipsis);
            });
        }

        @Test
        @DisplayName("Should handle InsertManyResult getInsertedIds() output patterns")
        void testInsertManyResultIdPatterns() {
            // Pattern from InsertMany.java - InsertManyResult.getInsertedIds() output
            Map<Integer, Object> insertedIds = new LinkedHashMap<>();
            insertedIds.put(0, new ObjectId("507f1f77bcf86cd799439011"));
            insertedIds.put(1, new ObjectId("507f1f77bcf86cd799439012"));

            String expectedOutput = "Inserted document ids: " + insertedIds.toString();

            // Should handle InsertedIds map format with ellipsis
            String expectedWithEllipsis = "Inserted document ids: {...}";

            assertDoesNotThrow(() -> {
                Expect.that(expectedOutput)
                        .shouldMatch(expectedWithEllipsis);
            });
        }

        @Test
        @DisplayName("Should handle Document.toJson() output from find operations")
        void testDocumentToJsonPatterns() {
            // Pattern from Find.java - Document.toJson() output in loops
            List<Document> findResults = Arrays.asList(
                    new Document("title", "Short Circuit 3")
                            .append("imdb", new Document("rating", 7.2).append("votes", 1250)),
                    new Document("title", "The Matrix")
                            .append("imdb", new Document("rating", 8.7).append("votes", 1537329))
            );

            // Convert to JSON format like driver would output
            StringBuilder actualOutput = new StringBuilder();
            for (Document doc : findResults) {
                actualOutput.append(doc.toJson()).append("\n");
            }

            // Should handle toJson() output with ellipsis patterns
            String expectedWithEllipsis = """
            {"title": "...", "imdb": {"rating": ..., "votes": ...}}
            {"title": "...", "imdb": {"rating": ..., "votes": ...}}
            """;

            assertDoesNotThrow(() -> {
                Expect.that(actualOutput.toString().trim())
                        .shouldMatch(expectedWithEllipsis.trim());
            });
        }

        @Test
        @DisplayName("Should handle MongoDB exception messages with embedded data")
        void testMongoExceptionPatterns() {
            // Pattern from driver examples - MongoException with error details
            String exceptionMessage = """
            The bulk write operation failed due to an error: com.mongodb.MongoWriteException:
            Write operation error on server sample-server.abc123.mongodb.net:27017.
            Write error: WriteError{code=11000, message='E11000 duplicate key error collection: sample_mflix.movies index: _id_ dup key: { _id: ObjectId("507f1f77bcf86cd799439011") }', details={}}
            """;

            // Should handle complex exception messages with embedded ObjectId patterns
            String expectedWithEllipsis = """
            The bulk write operation failed due to an error: com.mongodb.MongoWriteException:
            Write operation error on server ....
            Write error: WriteError{code=11000, message='E11000 duplicate key error collection: ... index: _id_ dup key: { _id: ObjectId("...") }', details={}}
            """;

            assertDoesNotThrow(() -> {
                Expect.that(exceptionMessage.trim())
                        .shouldMatch(expectedWithEllipsis.trim());
            });
        }

        @Test
        @DisplayName("Should handle mixed MongoDB data types in driver results")
        void testMixedMongoDataTypePatterns() {
            // Pattern from real driver operations - mixed ObjectId, Date, Decimal128
            ObjectId testId = new ObjectId("507f1f77bcf86cd799439011");
            Date createdDate = new Date(1640995200000L); // 2022-01-01T00:00:00Z
            Decimal128 price = new Decimal128(new BigDecimal("123.45"));

            Document document = new Document("_id", testId)
                    .append("createdAt", createdDate)
                    .append("price", price)
                    .append("category", "electronics")
                    .append("inStock", true);

            List<Document> results = Arrays.asList(document);

            // Should handle mixed MongoDB types with ellipsis patterns
            String expectedWithEllipsis = """
            {"_id": "...", "createdAt": "...", "price": "...", "category": "electronics", "inStock": true}
            """;

            assertDoesNotThrow(() -> {
                Expect.that(results)
                        .shouldMatch(expectedWithEllipsis);
            });
        }

        @Test
        @DisplayName("Should handle driver aggregation pipeline result patterns")
        void testAggregationPipelineResults() {
            // Pattern from aggregation examples - grouped results with statistics
            List<Document> aggregationResults = Arrays.asList(
                    new Document("_id", "electronics").append("totalSales", 150000).append("count", 47),
                    new Document("_id", "books").append("totalSales", 89000).append("count", 23),
                    new Document("_id", "clothing").append("totalSales", 210000).append("count", 68)
            );

            // Should handle aggregation results with ellipsis for dynamic values
            String expectedWithEllipsis = """
            {"_id": "electronics", "totalSales": ..., "count": ...}
            {"_id": "books", "totalSales": ..., "count": ...}
            {"_id": "clothing", "totalSales": ..., "count": ...}
            """;

            assertDoesNotThrow(() -> {
                Expect.that(aggregationResults)
                        // Unordered comparison is the default behavior
                        .shouldMatch(expectedWithEllipsis);
            });
        }

        @Test
        @DisplayName("Should handle cursor iteration patterns with variable results")
        void testCursorIterationPatterns() {
            // Pattern from Find.java - cursor.hasNext() and cursor.next() patterns
            List<Document> cursorResults = Arrays.asList(
                    new Document("title", "Movie A").append("runtime", 120),
                    new Document("title", "Movie B").append("runtime", 95),
                    new Document("title", "Movie C").append("runtime", 87)
            );

            // Should handle variable number of results with ellipsis array patterns
            String expectedWithArrayEllipsis = """
            [
                {"title": "...", "runtime": ...},
                ...
            ]
            """;

            assertDoesNotThrow(() -> {
                Expect.that(cursorResults)
                        .shouldMatch(expectedWithArrayEllipsis);
            });
        }

        @Test
        @DisplayName("Should handle projection and sort result patterns")
        void testProjectionAndSortPatterns() {
            // Pattern from Find.java - results with projections (some fields excluded)
            List<Document> projectionResults = Arrays.asList(
                    new Document("title", "The Matrix").append("imdb", new Document("rating", 8.7)),
                    new Document("title", "Inception").append("imdb", new Document("rating", 8.8)),
                    // Note: _id field excluded by projection, other fields not present
                    new Document("title", "Interstellar").append("imdb", new Document("rating", 8.6))
            );

            // Should handle projected results where only specific fields are present
            String expectedProjectionPattern = """
            {"title": "...", "imdb": {"rating": ...}}
            {"title": "...", "imdb": {"rating": ...}}
            {"title": "...", "imdb": {"rating": ...}}
            """;

            assertDoesNotThrow(() -> {
                Expect.that(projectionResults)
                        .shouldMatch(expectedProjectionPattern);
            });
        }

        @Test
        @DisplayName("Should handle empty result sets and null values")
        void testEmptyAndNullResultPatterns() {
            // Pattern from driver operations - empty results or null values
            List<Document> emptyResults = Arrays.asList();
            Document nullValueDocument = new Document("title", "Test Movie")
                    .append("rating", null)
                    .append("tags", Arrays.asList());

            // Should handle empty arrays
            String expectedEmptyPattern = "[]";
            assertDoesNotThrow(() -> {
                Expect.that(emptyResults)
                        .shouldMatch(expectedEmptyPattern);
            });

            // Should handle null values and empty arrays within documents
            String expectedNullPattern = """
            {"title": "Test Movie", "rating": null, "tags": []}
            """;

            assertDoesNotThrow(() -> {
                Expect.that(Arrays.asList(nullValueDocument))
                        .shouldMatch(expectedNullPattern);
            });
        }

        @Test
        @DisplayName("Should handle connection and error state messages")
        void testConnectionAndErrorPatterns() {
            // Pattern from driver examples - connection status and error handling
            String connectionOutput = """
            Connected to MongoDB cluster: sample-cluster.abc123.mongodb.net
            Database: sample_mflix
            Collection: movies
            """;

            String errorOutput = """
            Unable to insert due to an error: com.mongodb.MongoTimeoutException:
            Timed out after 30000 ms while waiting for a server that matches
            WritableServerSelector. Client view of cluster state is {type=REPLICA_SET, servers=[...]
            """;

            // Should handle connection info with ellipsis for cluster details
            String expectedConnectionPattern = """
            Connected to MongoDB cluster: ...
            Database: sample_mflix
            Collection: movies
            """;

            assertDoesNotThrow(() -> {
                Expect.that(connectionOutput)
                        .shouldMatch(expectedConnectionPattern);
            });

            // Should handle timeout errors with complex nested details
            String expectedErrorPattern = """
            Unable to insert due to an error: com.mongodb.MongoTimeoutException:
            Timed out after 30000 ms while waiting for a server that matches
            WritableServerSelector. Client view of cluster state is {...
            """;

            assertDoesNotThrow(() -> {
                Expect.that(errorOutput)
                        .shouldMatch(expectedErrorPattern);
            });
        }
    }

    @Nested
    @DisplayName("shouldResemble and withSchema API Tests")
    public class ResemblanceValidation {

        @Test
        @DisplayName("Should validate document count matches schema")
        void testCountValidation() {
            List<Document> actual = List.of(
                    new Document("_id", "1").append("title", "Movie A").append("year", 2012),
                    new Document("_id", "2").append("title", "Movie B").append("year", 2012)
            );

            List<Document> expected = List.of(
                    new Document("_id", "3").append("title", "Movie C").append("year", 2012),
                    new Document("_id", "4").append("title", "Movie D").append("year", 2012)
            );

            Schema schema = Schema.builder()
                    .withCount(2)
                    .build();

            // Should pass - both have 2 documents
            assertDoesNotThrow(() ->
                    Expect.that(actual).shouldResemble(expected).withSchema(schema));
        }

        @Test
        @DisplayName("Should fail when document count does not match schema")
        void testCountValidationFailure() {
            List<Document> actual = List.of(
                    new Document("_id", "1").append("title", "Movie A")
            );

            List<Document> expected = List.of(
                    new Document("_id", "2").append("title", "Movie B"),
                    new Document("_id", "3").append("title", "Movie C")
            );

            Schema schema = Schema.builder()
                    .withCount(2)
                    .build();

            AssertionError error = assertThrows(AssertionError.class, () ->
                    Expect.that(actual).shouldResemble(expected).withSchema(schema));

            assertTrue(error.getMessage().contains("actual output has 1 documents, expected 2"));
        }

        @Test
        @DisplayName("Should validate required fields are present in all documents")
        void testRequiredFieldsValidation() {
            List<Document> actual = List.of(
                    new Document("_id", "1").append("title", "Movie A").append("year", 2012),
                    new Document("_id", "2").append("title", "Movie B").append("year", 2013)
            );

            List<Document> expected = List.of(
                    new Document("_id", "3").append("title", "Movie C").append("year", 2014),
                    new Document("_id", "4").append("title", "Movie D").append("year", 2015)
            );

            Schema schema = Schema.builder()
                    .withCount(2)
                    .withRequiredFields("_id", "title", "year")
                    .build();

            // Should pass - all documents have all required fields
            assertDoesNotThrow(() ->
                    Expect.that(actual).shouldResemble(expected).withSchema(schema));
        }

        @Test
        @DisplayName("Should fail when required field is missing")
        void testRequiredFieldsMissing() {
            List<Document> actual = List.of(
                    new Document("_id", "1").append("title", "Movie A")  // missing "year"
            );

            List<Document> expected = List.of(
                    new Document("_id", "2").append("title", "Movie B").append("year", 2012)
            );

            Schema schema = Schema.builder()
                    .withCount(1)
                    .withRequiredFields("_id", "title", "year")
                    .build();

            AssertionError error = assertThrows(AssertionError.class, () ->
                    Expect.that(actual).shouldResemble(expected).withSchema(schema));

            assertTrue(error.getMessage().contains("missing required field 'year'"));
        }

        @Test
        @DisplayName("Should validate field values match in all documents")
        void testFieldValuesValidation() {
            List<Document> actual = List.of(
                    new Document("_id", "1").append("title", "Movie A").append("year", 2012),
                    new Document("_id", "2").append("title", "Movie B").append("year", 2012)
            );

            List<Document> expected = List.of(
                    new Document("_id", "3").append("title", "Movie C").append("year", 2012),
                    new Document("_id", "4").append("title", "Movie D").append("year", 2012)
            );

            Schema schema = Schema.builder()
                    .withCount(2)
                    .withRequiredFields("_id", "title", "year")
                    .withFieldValues(Map.of("year", 2012))
                    .build();

            // Should pass - all documents have year=2012
            assertDoesNotThrow(() ->
                    Expect.that(actual).shouldResemble(expected).withSchema(schema));
        }

        @Test
        @DisplayName("Should fail when field value does not match")
        void testFieldValueMismatch() {
            List<Document> actual = List.of(
                    new Document("_id", "1").append("title", "Movie A").append("year", 2012),
                    new Document("_id", "2").append("title", "Movie B").append("year", 2013)  // wrong year
            );

            List<Document> expected = List.of(
                    new Document("_id", "3").append("title", "Movie C").append("year", 2012),
                    new Document("_id", "4").append("title", "Movie D").append("year", 2012)
            );

            Schema schema = Schema.builder()
                    .withCount(2)
                    .withFieldValues(Map.of("year", 2012))
                    .build();

            AssertionError error = assertThrows(AssertionError.class, () ->
                    Expect.that(actual).shouldResemble(expected).withSchema(schema));

            assertTrue(error.getMessage().contains(".year has value"));
        }

        @Test
        @DisplayName("Should throw error when withIgnoredFields is used with shouldResemble")
        void testMutualExclusivityWithIgnoredFields() {
            List<Document> actual = List.of(
                    new Document("_id", "1").append("title", "Movie A")
            );

            List<Document> expected = List.of(
                    new Document("_id", "2").append("title", "Movie B")
            );

            Schema schema = Schema.builder()
                    .withCount(1)
                    .build();

            IllegalStateException error = assertThrows(IllegalStateException.class, () ->
                    Expect.that(actual)
                            .withIgnoredFields("_id")
                            .shouldResemble(expected)
                            .withSchema(schema));

            assertTrue(error.getMessage().contains("withIgnoredFields()"));
            assertTrue(error.getMessage().contains("not compatible"));
        }

        @Test
        @DisplayName("Should throw error when withOrderedSort is used with shouldResemble")
        void testMutualExclusivityWithOrderedSort() {
            List<Document> actual = List.of(
                    new Document("_id", "1").append("title", "Movie A")
            );

            List<Document> expected = List.of(
                    new Document("_id", "2").append("title", "Movie B")
            );

            Schema schema = Schema.builder()
                    .withCount(1)
                    .build();

            IllegalStateException error = assertThrows(IllegalStateException.class, () ->
                    Expect.that(actual)
                            .withOrderedSort()
                            .shouldResemble(expected)
                            .withSchema(schema));

            assertTrue(error.getMessage().contains("withOrderedSort()"));
            assertTrue(error.getMessage().contains("cannot be used with shouldResemble"));
        }

        @Test
        @DisplayName("Should throw error when withUnorderedSort is used with shouldResemble")
        void testMutualExclusivityWithUnorderedSort() {
            List<Document> actual = List.of(
                    new Document("_id", "1").append("title", "Movie A")
            );

            List<Document> expected = List.of(
                    new Document("_id", "2").append("title", "Movie B")
            );

            Schema schema = Schema.builder()
                    .withCount(1)
                    .build();

            IllegalStateException error = assertThrows(IllegalStateException.class, () ->
                    Expect.that(actual)
                            .withUnorderedSort()
                            .shouldResemble(expected)
                            .withSchema(schema));

            assertTrue(error.getMessage().contains("withUnorderedSort()"));
            assertTrue(error.getMessage().contains("cannot be used with shouldResemble"));
        }

        @Test
        @DisplayName("Should auto-wrap single document actual into list")
        void testSingleDocumentActual() {
            Document actual = new Document("_id", "1").append("title", "Movie A").append("year", 2012);
            List<Document> expected = List.of(
                    new Document("_id", "2").append("title", "Movie B").append("year", 2012)
            );

            Schema schema = Schema.builder()
                    .withCount(1)
                    .withRequiredFields("_id", "title", "year")
                    .withFieldValues(Map.of("year", 2012))
                    .build();

            // Should pass - single document is auto-wrapped into list
            assertDoesNotThrow(() ->
                    Expect.that(actual).shouldResemble(expected).withSchema(schema));
        }

        @Test
        @DisplayName("Should auto-wrap single document expected into list")
        void testSingleDocumentExpected() {
            List<Document> actual = List.of(
                    new Document("_id", "1").append("title", "Movie A").append("year", 2012)
            );
            Document expected = new Document("_id", "2").append("title", "Movie B").append("year", 2012);

            Schema schema = Schema.builder()
                    .withCount(1)
                    .withRequiredFields("_id", "title", "year")
                    .withFieldValues(Map.of("year", 2012))
                    .build();

            // Should pass - single document is auto-wrapped into list
            assertDoesNotThrow(() ->
                    Expect.that(actual).shouldResemble(expected).withSchema(schema));
        }

        @Test
        @DisplayName("Should work with both actual and expected as single documents")
        void testBothSingleDocuments() {
            Document actual = new Document("_id", "1").append("title", "Movie A").append("year", 2012);
            Document expected = new Document("_id", "2").append("title", "Movie B").append("year", 2012);

            Schema schema = Schema.builder()
                    .withCount(1)
                    .withRequiredFields("_id", "title", "year")
                    .withFieldValues(Map.of("year", 2012))
                    .build();

            // Should pass - both single documents are auto-wrapped into lists
            assertDoesNotThrow(() ->
                    Expect.that(actual).shouldResemble(expected).withSchema(schema));
        }

        @Test
        @DisplayName("Should fail with unsupported input type")
        void testUnsupportedInputType() {
            String actual = "not a document";
            List<Document> expected = List.of(
                    new Document("_id", "1").append("title", "Movie A")
            );

            Schema schema = Schema.builder()
                    .withCount(1)
                    .build();

            AssertionError error = assertThrows(AssertionError.class, () ->
                    Expect.that(actual).shouldResemble(expected).withSchema(schema));

            assertTrue(error.getMessage().contains("must be an array, collection, or document"));
        }

        @Test
        @DisplayName("Should handle multiple field value constraints")
        void testMultipleFieldValues() {
            List<Document> actual = List.of(
                    new Document("_id", "1").append("type", "movie").append("year", 2012).append("rating", "PG"),
                    new Document("_id", "2").append("type", "movie").append("year", 2012).append("rating", "PG")
            );

            List<Document> expected = List.of(
                    new Document("_id", "3").append("type", "movie").append("year", 2012).append("rating", "PG"),
                    new Document("_id", "4").append("type", "movie").append("year", 2012).append("rating", "PG")
            );

            Schema schema = Schema.builder()
                    .withCount(2)
                    .withFieldValues(Map.of("type", "movie", "year", 2012, "rating", "PG"))
                    .build();

            assertDoesNotThrow(() ->
                    Expect.that(actual).shouldResemble(expected).withSchema(schema));
        }

        @Test
        @DisplayName("Should validate both expected and actual against schema")
        void testBothExpectedAndActualValidated() {
            List<Document> actual = List.of(
                    new Document("_id", "1").append("title", "Movie A").append("year", 2012)
            );

            // Expected is missing a required field
            List<Document> expected = List.of(
                    new Document("_id", "2").append("title", "Movie B")  // missing "year"
            );

            Schema schema = Schema.builder()
                    .withCount(1)
                    .withRequiredFields("_id", "title", "year")
                    .build();

            AssertionError error = assertThrows(AssertionError.class, () ->
                    Expect.that(actual).shouldResemble(expected).withSchema(schema));

            assertTrue(error.getMessage().contains("expected[0]"));
            assertTrue(error.getMessage().contains("missing required field 'year'"));
        }

        @Test
        @DisplayName("Schema builder should reject negative count")
        void testNegativeCountRejected() {
            assertThrows(IllegalArgumentException.class, () ->
                    Schema.builder().withCount(-1).build());
        }

        @Test
        @DisplayName("withSchema should reject schema without count specified")
        void testCountRequired() {
            List<Document> actual = List.of(
                    new Document("_id", "1").append("title", "Movie A")
            );
            List<Document> expected = List.of(
                    new Document("_id", "2").append("title", "Movie B")
            );

            // Build schema without calling withCount() - count will be -1
            Schema schema = Schema.builder().build();

            IllegalArgumentException error = assertThrows(IllegalArgumentException.class, () ->
                    Expect.that(actual).shouldResemble(expected).withSchema(schema));

            assertTrue(error.getMessage().contains("non-negative count"));
        }

        @Test
        @DisplayName("Should handle empty lists with zero count")
        void testEmptyListsWithZeroCount() {
            List<Document> actual = List.of();
            List<Document> expected = List.of();

            Schema schema = Schema.builder()
                    .withCount(0)
                    .build();

            assertDoesNotThrow(() ->
                    Expect.that(actual).shouldResemble(expected).withSchema(schema));
        }

        @Test
        @DisplayName("Should handle Map objects in addition to Documents")
        void testMapObjects() {
            List<Map<String, Object>> actual = List.of(
                    Map.of("_id", "1", "title", "Movie A", "year", 2012)
            );

            List<Map<String, Object>> expected = List.of(
                    Map.of("_id", "2", "title", "Movie B", "year", 2012)
            );

            Schema schema = Schema.builder()
                    .withCount(1)
                    .withRequiredFields("_id", "title", "year")
                    .withFieldValues(Map.of("year", 2012))
                    .build();

            assertDoesNotThrow(() ->
                    Expect.that(actual).shouldResemble(expected).withSchema(schema));
        }

        @Test
        @DisplayName("Should handle nested field values")
        void testNestedFieldValues() {
            List<Document> actual = List.of(
                    new Document("id", 1).append("metadata",
                            new Document("category", "movie").append("source", "imdb")),
                    new Document("id", 2).append("metadata",
                            new Document("category", "movie").append("source", "imdb"))
            );

            List<Document> expected = List.of(
                    new Document("id", 10).append("metadata",
                            new Document("category", "movie").append("source", "imdb")),
                    new Document("id", 20).append("metadata",
                            new Document("category", "movie").append("source", "imdb"))
            );

            Schema schema = Schema.builder()
                    .withCount(2)
                    .withRequiredFields("id", "metadata")
                    .withFieldValues(Map.of("metadata",
                            new Document("category", "movie").append("source", "imdb")))
                    .build();

            assertDoesNotThrow(() ->
                    Expect.that(actual).shouldResemble(expected).withSchema(schema));
        }

        @Test
        @DisplayName("Should validate Vector Search style results")
        void testVectorSearchScenario() {
            // Simulating Vector Search where specific documents may vary
            List<Document> actual = List.of(
                    new Document("_id", "doc1").append("title", "Inception")
                            .append("genre", "Sci-Fi").append("score", 0.95),
                    new Document("_id", "doc2").append("title", "Interstellar")
                            .append("genre", "Sci-Fi").append("score", 0.88),
                    new Document("_id", "doc3").append("title", "The Dark Knight")
                            .append("genre", "Sci-Fi").append("score", 0.82)
            );

            List<Document> expected = List.of(
                    new Document("_id", "docA").append("title", "The Matrix")
                            .append("genre", "Sci-Fi").append("score", 0.91),
                    new Document("_id", "docB").append("title", "Blade Runner")
                            .append("genre", "Sci-Fi").append("score", 0.85),
                    new Document("_id", "docC").append("title", "Alien")
                            .append("genre", "Sci-Fi").append("score", 0.79)
            );

            Schema schema = Schema.builder()
                    .withCount(3)
                    .withRequiredFields("_id", "title", "genre", "score")
                    .withFieldValues(Map.of("genre", "Sci-Fi"))
                    .build();

            assertDoesNotThrow(() ->
                    Expect.that(actual).shouldResemble(expected).withSchema(schema));
        }

        @Test
        @DisplayName("Should validate nested field paths with dot notation")
        void testNestedFieldPathWithDotNotation() {
            List<Document> actual = List.of(
                    new Document("_id", "1")
                            .append("metadata", new Document("category", "movie")
                                    .append("rating", "PG-13"))
            );

            List<Document> expected = List.of(
                    new Document("_id", "2")
                            .append("metadata", new Document("category", "movie")
                                    .append("rating", "PG-13"))
            );

            Schema schema = Schema.builder()
                    .withCount(1)
                    .withRequiredFields("metadata.category", "metadata.rating")
                    .withFieldValues(Map.of("metadata.category", "movie"))
                    .build();

            assertDoesNotThrow(() ->
                    Expect.that(actual).shouldResemble(expected).withSchema(schema));
        }

        @Test
        @DisplayName("Should validate nested field paths with array index notation")
        void testNestedFieldPathWithArrayIndex() {
            List<Document> actual = List.of(
                    new Document("_id", "1")
                            .append("stages", List.of(
                                    new Document("$cursor", new Document("queryPlanner",
                                            new Document("winningPlan",
                                                    new Document("stage", "CLUSTERED_IXSCAN"))))
                            ))
            );

            List<Document> expected = List.of(
                    new Document("_id", "2")
                            .append("stages", List.of(
                                    new Document("$cursor", new Document("queryPlanner",
                                            new Document("winningPlan",
                                                    new Document("stage", "CLUSTERED_IXSCAN"))))
                            ))
            );

            Schema schema = Schema.builder()
                    .withCount(1)
                    .withRequiredFields("stages[0].$cursor.queryPlanner.winningPlan.stage")
                    .withFieldValues(Map.of("stages[0].$cursor.queryPlanner.winningPlan.stage", "CLUSTERED_IXSCAN"))
                    .build();

            assertDoesNotThrow(() ->
                    Expect.that(actual).shouldResemble(expected).withSchema(schema));
        }

        @Test
        @DisplayName("Should fail when nested field path is missing")
        void testNestedFieldPathMissing() {
            List<Document> actual = List.of(
                    new Document("_id", "1")
                            .append("stages", List.of(
                                    new Document("$cursor", new Document("queryPlanner",
                                            new Document("otherPlan",  // missing "winningPlan"
                                                    new Document("stage", "IXSCAN"))))
                            ))
            );

            List<Document> expected = List.of(
                    new Document("_id", "2")
                            .append("stages", List.of(
                                    new Document("$cursor", new Document("queryPlanner",
                                            new Document("winningPlan",
                                                    new Document("stage", "CLUSTERED_IXSCAN"))))
                            ))
            );

            Schema schema = Schema.builder()
                    .withCount(1)
                    .withRequiredFields("stages[0].$cursor.queryPlanner.winningPlan.stage")
                    .build();

            AssertionError error = assertThrows(AssertionError.class, () ->
                    Expect.that(actual).shouldResemble(expected).withSchema(schema));

            assertTrue(error.getMessage().contains("actual[0]"));
            assertTrue(error.getMessage().contains("missing required field"));
            assertTrue(error.getMessage().contains("stages[0].$cursor.queryPlanner.winningPlan.stage"));
        }

        @Test
        @DisplayName("Should fail when nested field value does not match")
        void testNestedFieldValueMismatch() {
            List<Document> actual = List.of(
                    new Document("_id", "1")
                            .append("stages", List.of(
                                    new Document("$cursor", new Document("queryPlanner",
                                            new Document("winningPlan",
                                                    new Document("stage", "COLLSCAN"))))  // wrong value
                            ))
            );

            List<Document> expected = List.of(
                    new Document("_id", "2")
                            .append("stages", List.of(
                                    new Document("$cursor", new Document("queryPlanner",
                                            new Document("winningPlan",
                                                    new Document("stage", "CLUSTERED_IXSCAN"))))
                            ))
            );

            Schema schema = Schema.builder()
                    .withCount(1)
                    .withFieldValues(Map.of("stages[0].$cursor.queryPlanner.winningPlan.stage", "CLUSTERED_IXSCAN"))
                    .build();

            AssertionError error = assertThrows(AssertionError.class, () ->
                    Expect.that(actual).shouldResemble(expected).withSchema(schema));

            assertTrue(error.getMessage().contains("actual[0]"));
            assertTrue(error.getMessage().contains("has value"));
            assertTrue(error.getMessage().contains("COLLSCAN"));
        }

        @Test
        @DisplayName("Should handle deeply nested paths with multiple array indices")
        void testDeeplyNestedPathWithMultipleArrayIndices() {
            List<Document> actual = List.of(
                    new Document("_id", "1")
                            .append("results", List.of(
                                    new Document("items", List.of(
                                            new Document("name", "item1"),
                                            new Document("name", "item2")
                                    ))
                            ))
            );

            List<Document> expected = List.of(
                    new Document("_id", "2")
                            .append("results", List.of(
                                    new Document("items", List.of(
                                            new Document("name", "itemA"),
                                            new Document("name", "item2")  // must match schema value
                                    ))
                            ))
            );

            Schema schema = Schema.builder()
                    .withCount(1)
                    .withRequiredFields("results[0].items[1].name")
                    .withFieldValues(Map.of("results[0].items[1].name", "item2"))
                    .build();

            assertDoesNotThrow(() ->
                    Expect.that(actual).shouldResemble(expected).withSchema(schema));
        }

        @Test
        @DisplayName("Should fail when array index is out of bounds")
        void testArrayIndexOutOfBounds() {
            List<Document> actual = List.of(
                    new Document("_id", "1")
                            .append("stages", List.of(
                                    new Document("name", "stage1")
                            ))
            );

            List<Document> expected = List.of(
                    new Document("_id", "2")
                            .append("stages", List.of(
                                    new Document("name", "stage1"),
                                    new Document("name", "stage2")
                            ))
            );

            Schema schema = Schema.builder()
                    .withCount(1)
                    .withRequiredFields("stages[5].name")  // index 5 doesn't exist
                    .build();

            AssertionError error = assertThrows(AssertionError.class, () ->
                    Expect.that(actual).shouldResemble(expected).withSchema(schema));

            assertTrue(error.getMessage().contains("missing required field"));
            assertTrue(error.getMessage().contains("stages[5].name"));
        }

        @Test
        @DisplayName("Should load expected from file path for shouldResemble")
        void testShouldResembleWithFilePath() throws Exception {
            List<Document> actual = List.of(
                    new Document("name", "test").append("value", 42)
            );

            // Use a test resource file
            String filePath = "src/test/resources/single-document.json";

            Schema schema = Schema.builder()
                    .withCount(1)
                    .withRequiredFields("name", "value")
                    .withFieldValues(Map.of("value", 42))
                    .build();

            assertDoesNotThrow(() ->
                    Expect.that(actual).shouldResemble(filePath).withSchema(schema));
        }

        @Test
        @DisplayName("Should load expected from Path object for shouldResemble")
        void testShouldResembleWithPathObject() {
            List<Document> actual = List.of(
                    new Document("name", "test").append("value", 42)
            );

            // Use a test resource file as Path object
            java.nio.file.Path filePath = java.nio.file.Path.of("src/test/resources/single-document.json");

            Schema schema = Schema.builder()
                    .withCount(1)
                    .withRequiredFields("name", "value")
                    .withFieldValues(Map.of("value", 42))
                    .build();

            assertDoesNotThrow(() ->
                    Expect.that(actual).shouldResemble(filePath).withSchema(schema));
        }

        @Test
        @DisplayName("Should handle expected JSON with ellipsis patterns for omitted fields")
        void testShouldResembleWithEllipsisPatterns() {
            // Actual document with full structure
            List<Document> actual = List.of(
                    new Document("explainVersion", "1")
                            .append("stages", List.of(
                                    new Document("extraField", "ignored")
                                            .append("$cursor", new Document("extraNested", "also ignored")
                                                    .append("queryPlanner", new Document("namespace", "test.collection")
                                                            .append("winningPlan", new Document("isCached", false)
                                                                    .append("stage", "CLUSTERED_IXSCAN"))))
                            ))
            );

            // Expected with ellipsis patterns (simulating file content with ...)
            String expectedWithEllipsis = """
                    {
                      "explainVersion": "1",
                      "stages": [
                        {
                          ...
                          "$cursor": {
                            ...
                            "queryPlanner": {
                              ...
                              "namespace": "test.collection",
                              "winningPlan": {
                                "isCached": false,
                                "stage": "CLUSTERED_IXSCAN"
                              }
                            }
                          }
                        }
                      ]
                    }
                    """;

            Schema schema = Schema.builder()
                    .withCount(1)
                    .withRequiredFields("stages[0].$cursor.queryPlanner.winningPlan.stage")
                    .withFieldValues(Map.of("stages[0].$cursor.queryPlanner.winningPlan.stage", "CLUSTERED_IXSCAN"))
                    .build();

            assertDoesNotThrow(() ->
                    Expect.that(actual).shouldResemble(expectedWithEllipsis).withSchema(schema));
        }
    }
}
