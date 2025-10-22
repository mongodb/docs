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
}
