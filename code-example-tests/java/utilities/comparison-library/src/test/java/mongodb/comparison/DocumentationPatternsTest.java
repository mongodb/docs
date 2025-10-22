package mongodb.comparison;

import com.mongodb.client.result.InsertManyResult;
import com.mongodb.client.result.InsertOneResult;
import com.mongodb.client.result.UpdateResult;
import com.mongodb.client.result.DeleteResult;
import org.bson.Document;
import org.bson.json.JsonMode;
import org.bson.json.JsonWriterSettings;
import org.bson.types.ObjectId;
import org.bson.types.Decimal128;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;

import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.ArrayList;
import java.util.Map;
import java.util.HashMap;
import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.*;

/**
 * MongoDB Java Driver Documentation Pattern Tests.
 *
 * These tests validate patterns specifically found in MongoDB Java driver documentation examples,
 * covering the exact output patterns that technical writers encounter when documenting driver usage.
 *
 * Based on analysis of real examples from:
 * - content/java/current/source/includes/usage-examples/
 * - MongoDB driver result object patterns
 * - Real-world aggregation pipeline outputs
 * - CRUD operation result formats
 */
class DocumentationPatternsTest {

    @Test
    @DisplayName("Should handle aggregation tour patterns from documentation")
    void testAggregationTourDocumentationPatterns() {
        // Pattern from AggTour.java - restaurant data aggregation
        List<Document> aggregationTourResults = Arrays.asList(
            new Document("_id", new ObjectId("507f1f77bcf86cd799439011"))
                .append("name", "Sun Bakery Trattoria")
                .append("contact", new Document()
                    .append("phone", "386-555-0189")
                    .append("email", "SunBakeryTrattoria@example.org")
                    .append("location", Arrays.asList(-74.0056649, 40.7452371)))
                .append("stars", 4)
                .append("categories", Arrays.asList("Pizza", "Pasta", "Italian", "Coffee", "Sandwiches")),

            new Document("_id", new ObjectId("507f1f77bcf86cd799439012"))
                .append("name", "Blue Bagels Grill")
                .append("contact", new Document()
                    .append("phone", "786-555-0102")
                    .append("email", "BlueBagelsGrill@example.com")
                    .append("location", Arrays.asList(-73.92506, 40.8275556)))
                .append("stars", 3)
                .append("categories", Arrays.asList("Bagels", "Cookies", "Sandwiches"))
        );

        String expectedAggregationTourPattern = """
            {"_id": "...", "name": "Sun Bakery Trattoria", "contact": {"phone": "386-555-0189", "email": "SunBakeryTrattoria@example.org", "location": [-74.0056649, 40.7452371]}, "stars": 4, "categories": [...]}
            {"_id": "...", "name": "Blue Bagels Grill", "contact": {"phone": "786-555-0102", "email": "BlueBagelsGrill@example.com", "location": [-73.92506, 40.8275556]}, "stars": 3, "categories": [...]}
            """;

        assertDoesNotThrow(() -> {
            Expect.that(aggregationTourResults)
                 // categories order may vary
                .shouldMatch(expectedAggregationTourPattern);
        });
    }

    @Test
    @DisplayName("Should handle find operation patterns from documentation examples")
    void testFindOperationDocumentationPatterns() {
        // Pattern from Find.java examples
        List<Document> findResults = Arrays.asList(
            new Document("_id", new ObjectId("507f1f77bcf86cd799439020"))
                .append("title", "The Room")
                .append("imdb", new Document("rating", 3.5).append("votes", 25987).append("id", 368226))
                .append("year", 2003)
                .append("type", "movie"),

            new Document("_id", new ObjectId("507f1f77bcf86cd799439021"))
                .append("title", "The Room Where It Happened")
                .append("imdb", new Document("rating", 7.2).append("votes", 1205).append("id", 462345))
                .append("year", 2020)
                .append("type", "documentary")
        );

        // Pattern shows typical projection and sorting results as documented
        String expectedFindPattern = """
            {"_id": "...", "title": "The Room", "imdb": {"rating": 3.5, "votes": 25987, "id": 368226}, "year": 2003, "type": "movie"}
            {"_id": "...", "title": "The Room Where It Happened", "imdb": {"rating": 7.2, "votes": 1205, "id": 462345}, "year": 2020, "type": "documentary"}
            """;

        assertDoesNotThrow(() -> {
            Expect.that(findResults)
                .shouldMatch(expectedFindPattern);
        });

        // Test with projection (common in documentation)
        Document projectedResult = new Document("title", "The Room")
            .append("imdb", new Document("rating", 3.5));

        String expectedProjectionPattern = """
            {"title": "The Room", "imdb": {"rating": 3.5}}
            """;

        assertDoesNotThrow(() -> {
            Expect.that(Arrays.asList(projectedResult))
                .shouldMatch(expectedProjectionPattern);
        });
    }

    @Test
    @DisplayName("Should handle insert operation result patterns from documentation")
    void testInsertOperationDocumentationPatterns() {
        // Pattern from Insert.java - InsertOneResult
        ObjectId insertedId = new ObjectId("507f1f77bcf86cd799439030");
        String insertOneOutput = "Inserted document id: " + insertedId;
        String expectedInsertOnePattern = "Inserted document id: ...";

        assertDoesNotThrow(() -> {
            Expect.that(insertOneOutput)
                
                .shouldMatch(expectedInsertOnePattern);
        });

        // Pattern from Insert.java - InsertManyResult
        List<ObjectId> manyInsertedIds = Arrays.asList(
            new ObjectId("507f1f77bcf86cd799439031"),
            new ObjectId("507f1f77bcf86cd799439032"),
            new ObjectId("507f1f77bcf86cd799439033")
        );

        String insertManyOutput = "Inserted document ids: " + manyInsertedIds;
        String expectedInsertManyPattern = "Inserted document ids: [...]";

        assertDoesNotThrow(() -> {
            Expect.that(insertManyOutput)
                
                .shouldMatch(expectedInsertManyPattern);
        });

        // Pattern for detailed InsertManyResult output
        String detailedInsertManyOutput = "Inserted " + manyInsertedIds.size() + " documents with ids: " + manyInsertedIds;
        String expectedDetailedPattern = "Inserted 3 documents with ids: [...]";

        assertDoesNotThrow(() -> {
            Expect.that(detailedInsertManyOutput)
                
                .shouldMatch(expectedDetailedPattern);
        });
    }

    @Test
    @DisplayName("Should handle update operation result patterns from documentation")
    void testUpdateOperationDocumentationPatterns() {
        // Pattern from Update.java examples
        String updateOneOutput = "Modified document count: 1";
        String expectedUpdateOnePattern = "Modified document count: 1";

        assertDoesNotThrow(() -> {
            Expect.that(updateOneOutput)
                
                .shouldMatch(expectedUpdateOnePattern);
        });

        // Pattern for UpdateResult with matched and modified counts
        String updateResultOutput = "Matched: 3 documents, Modified: 2 documents";
        String expectedUpdateResultPattern = "Matched: 3 documents, Modified: 2 documents";

        assertDoesNotThrow(() -> {
            Expect.that(updateResultOutput)
                
                .shouldMatch(expectedUpdateResultPattern);
        });

        // Pattern for upsert operations
        ObjectId upsertedId = new ObjectId("507f1f77bcf86cd799439040");
        String upsertOutput = "Upserted document id: " + upsertedId + ", Modified: 0 documents";
        String expectedUpsertPattern = "Upserted document id: ..., Modified: 0 documents";

        assertDoesNotThrow(() -> {
            Expect.that(upsertOutput)
                
                .shouldMatch(expectedUpsertPattern);
        });
    }

    @Test
    @DisplayName("Should handle delete operation result patterns from documentation")
    void testDeleteOperationDocumentationPatterns() {
        // Pattern from Delete.java examples
        String deleteOneOutput = "Deleted document count: 1";
        String expectedDeleteOnePattern = "Deleted document count: 1";

        assertDoesNotThrow(() -> {
            Expect.that(deleteOneOutput)
                
                .shouldMatch(expectedDeleteOnePattern);
        });

        // Pattern for DeleteManyResult
        String deleteManyOutput = "Deleted document count: 14";
        String expectedDeleteManyPattern = "Deleted document count: ...";

        assertDoesNotThrow(() -> {
            Expect.that(deleteManyOutput)
                
                .shouldMatch(expectedDeleteManyPattern);
        });

        // Pattern for no matches
        String noDeleteOutput = "No documents matched the query. Deleted document count: 0";
        String expectedNoDeletePattern = "No documents matched the query. Deleted document count: 0";

        assertDoesNotThrow(() -> {
            Expect.that(noDeleteOutput)
                
                .shouldMatch(expectedNoDeletePattern);
        });
    }

    @Test
    @DisplayName("Should handle bulk write operation patterns from documentation")
    void testBulkWriteDocumentationPatterns() {
        // Pattern from BulkWrite.java - comprehensive result output
        String bulkWriteResultOutput = """
            Result statistics:
            inserted: 3
            updated: 2
            deleted: 1
            """;

        String expectedBulkWritePattern = """
            Result statistics:
            inserted: 3
            updated: 2
            deleted: 1
            """;

        assertDoesNotThrow(() -> {
            Expect.that(bulkWriteResultOutput)
                
                .shouldMatch(expectedBulkWritePattern);
        });

        // Pattern for bulk write with errors
        String bulkWriteWithErrorsOutput = """
            The bulk write operation failed due to an error: MongoBulkWriteException
            Successful operations: 5
            Failed operations: 2
            Error details: Duplicate key error on index: _id_
            """;

        String expectedBulkErrorPattern = """
            The bulk write operation failed due to an error: MongoBulkWriteException
            Successful operations: 5
            Failed operations: 2
            Error details: Duplicate key error on index: _id_
            """;

        assertDoesNotThrow(() -> {
            Expect.that(bulkWriteWithErrorsOutput)
                
                .shouldMatch(expectedBulkErrorPattern);
        });
    }

    @Test
    @DisplayName("Should handle count and distinct operation patterns from documentation")
    void testCountAndDistinctDocumentationPatterns() {
        // Pattern from CountDocuments.java
        String countOutput = "Number of documents: 18";
        String expectedCountPattern = "Number of documents: ...";

        assertDoesNotThrow(() -> {
            Expect.that(countOutput)
                
                .shouldMatch(expectedCountPattern);
        });

        // Pattern from Distinct.java
        List<String> distinctResults = Arrays.asList("Italian", "Pizza", "Sandwiches", "Bakery", "Coffee");
        String distinctResultsString = String.join("\n", distinctResults);
        String expectedDistinctPattern = """
            Italian
            Pizza
            Sandwiches
            Bakery
            Coffee
            """;

        assertDoesNotThrow(() -> {
            Expect.that(distinctResultsString)
                 // distinct results order can vary
                .shouldMatch(expectedDistinctPattern);
        });

        // Pattern for distinct with complex values
        List<Document> distinctComplexResults = Arrays.asList(
            new Document("category", "Electronics").append("count", 45),
            new Document("category", "Books").append("count", 23),
            new Document("category", "Clothing").append("count", 67)
        );

        String expectedDistinctComplexPattern = """
            {"category": "Electronics", "count": 45}
            {"category": "Books", "count": 23}
            {"category": "Clothing", "count": 67}
            """;

        assertDoesNotThrow(() -> {
            Expect.that(distinctComplexResults)
                
                .shouldMatch(expectedDistinctComplexPattern);
        });
    }

    @Test
    @DisplayName("Should handle watch/change streams patterns from documentation")
    void testWatchChangeStreamsDocumentationPatterns() {
        // Pattern from Watch.java - change stream documents
        List<Document> changeStreamResults = Arrays.asList(
            new Document("_id", new Document("_data", "8264D9B1F5000000012B0229296E04"))
                .append("operationType", "insert")
                .append("clusterTime", new Date())
                .append("fullDocument", new Document("_id", new ObjectId("507f1f77bcf86cd799439050"))
                    .append("name", "New Restaurant")
                    .append("cuisine", "American"))
                .append("ns", new Document("db", "sample_restaurants").append("coll", "restaurants"))
                .append("documentKey", new Document("_id", new ObjectId("507f1f77bcf86cd799439050"))),

            new Document("_id", new Document("_data", "8264D9B1F5000000022B0229296E04"))
                .append("operationType", "update")
                .append("clusterTime", new Date())
                .append("updateDescription", new Document("updatedFields", new Document("stars", 5))
                    .append("removedFields", Arrays.asList()))
                .append("ns", new Document("db", "sample_restaurants").append("coll", "restaurants"))
                .append("documentKey", new Document("_id", new ObjectId("507f1f77bcf86cd799439051")))
        );

        String expectedChangeStreamPattern = """
            {"_id": {"_data": "..."}, "operationType": "insert", "clusterTime": "...", "fullDocument": {"_id": "...", "name": "New Restaurant", "cuisine": "American"}, "ns": {"db": "sample_restaurants", "coll": "restaurants"}, "documentKey": {"_id": "..."}}
            {"_id": {"_data": "..."}, "operationType": "update", "clusterTime": "...", "updateDescription": {"updatedFields": {"stars": 5}, "removedFields": []}, "ns": {"db": "sample_restaurants", "coll": "restaurants"}, "documentKey": {"_id": "..."}}
            """;

        assertDoesNotThrow(() -> {
            Expect.that(changeStreamResults)
                .shouldMatch(expectedChangeStreamPattern);
        });
    }

    @Test
    @DisplayName("Should handle command execution patterns from documentation")
    void testCommandExecutionDocumentationPatterns() {
        // Pattern from Command.java - database command results
        Document commandResult = new Document("ok", 1.0)
            .append("connectionId", 12345)
            .append("n", 1)
            .append("syncMillis", 0)
            .append("writtenTo", Arrays.asList(
                new Document("name", "primary")
                    .append("host", "mongodb-server-1:27017")
                    .append("electionId", new ObjectId("507f1f77bcf86cd799439060")),
                new Document("name", "secondary")
                    .append("host", "mongodb-server-2:27017")
                    .append("electionId", new ObjectId("507f1f77bcf86cd799439061"))
            ))
            .append("operationTime", new Date());

        String expectedCommandPattern = """
            {"ok": 1.0, "connectionId": ..., "n": 1, "syncMillis": 0, "writtenTo": [{"name": "primary", "host": "mongodb-server-1:27017", "electionId": "..."}, {"name": "secondary", "host": "mongodb-server-2:27017", "electionId": "..."}], "operationTime": "..."}
            """;

        assertDoesNotThrow(() -> {
            Expect.that(Arrays.asList(commandResult))
                .shouldMatch(expectedCommandPattern);
        });

        // Pattern for diagnostic commands
        Document diagnosticResult = new Document("host", "mongodb-server:27017")
            .append("version", "6.0.4")
            .append("process", "mongod")
            .append("pid", 12345)
            .append("uptime", 86400.0)
            .append("uptimeMillis", 86400000L)
            .append("uptimeEstimate", 86400L)
            .append("localTime", new Date())
            .append("ok", 1.0);

        String expectedDiagnosticPattern = """
            {"host": "mongodb-server:27017", "version": "6.0.4", "process": "mongod", "pid": ..., "uptime": ..., "uptimeMillis": ..., "uptimeEstimate": ..., "localTime": "...", "ok": 1.0}
            """;

        assertDoesNotThrow(() -> {
            Expect.that(Arrays.asList(diagnosticResult))
                .shouldMatch(expectedDiagnosticPattern);
        });
    }

    @Test
    @DisplayName("Should handle mixed data type patterns common in documentation")
    void testMixedDataTypeDocumentationPatterns() {
        // Pattern showing all MongoDB data types commonly used in documentation
        Document mixedDataDocument = new Document("_id", new ObjectId("507f1f77bcf86cd799439070"))
            .append("stringField", "Sample text")
            .append("intField", 42)
            .append("longField", 9876543210L)
            .append("doubleField", 3.14159)
            .append("decimalField", new Decimal128(new BigDecimal("123.456789")))
            .append("booleanField", true)
            .append("dateField", new Date())
            .append("nullField", null)
            .append("arrayField", Arrays.asList("item1", "item2", "item3"))
            .append("objectField", new Document("nested", "value").append("count", 5))
            .append("mixedArrayField", Arrays.asList(
                "string",
                42,
                new Date(),
                new Document("type", "embedded")
            ));

        String expectedMixedDataPattern = """
            {"_id": "...", "stringField": "Sample text", "intField": 42, "longField": 9876543210, "doubleField": 3.14159, "decimalField": "...", "booleanField": true, "dateField": "...", "nullField": null, "arrayField": ["item1", "item2", "item3"], "objectField": {"nested": "value", "count": 5}, "mixedArrayField": ["string", 42, "...", {"type": "embedded"}]}
            """;

        assertDoesNotThrow(() -> {
            Expect.that(Arrays.asList(mixedDataDocument))
                .shouldMatch(expectedMixedDataPattern);
        });
    }

    @Test
    @DisplayName("Should handle restaurant data with nested contact information")
    void testNestedDocumentPattern() {
        // Pattern from AggTour.java - complex nested restaurant documents
        List<Document> actualResults = Arrays.asList(
                new Document("name", "Sun Bakery Trattoria")
                        .append("contact", new Document()
                                .append("phone", "386-555-0189")
                                .append("email", "SunBakeryTrattoria@example.org")
                                .append("location", Arrays.asList(-74.0056649, 40.7452371)))
                        .append("stars", 4)
                        .append("categories", Arrays.asList("Pizza", "Pasta", "Italian", "Coffee", "Sandwiches")),

                new Document("name", "Blue Bagels Grill")
                        .append("contact", new Document()
                                .append("phone", "786-555-0102")
                                .append("email", "BlueBagelsGrill@example.com")
                                .append("location", Arrays.asList(-73.92506, 40.8275556)))
                        .append("stars", 3)
                        .append("categories", Arrays.asList("Bagels", "Cookies", "Sandwiches"))
        );

        String expectedContent = """
            {"name": "Sun Bakery Trattoria", "contact": {"phone": "386-555-0189", "email": "SunBakeryTrattoria@example.org", "location": [-74.0056649, 40.7452371]}, "stars": 4, "categories": ["Pizza", "Pasta", "Italian", "Coffee", "Sandwiches"]}
            {"name": "Blue Bagels Grill", "contact": {"phone": "786-555-0102", "email": "BlueBagelsGrill@example.com", "location": [-73.92506, 40.8275556]}, "stars": 3, "categories": ["Bagels", "Cookies", "Sandwiches"]}
            """;

        // Should handle nested documents correctly
        assertDoesNotThrow(() -> {
            Expect.that(actualResults)
                     // categories can be in any order
                    .shouldMatch(expectedContent);
        });
    }

    @Test
    @DisplayName("Should handle mixed MongoDB data types from real examples")
    void testMixedDataTypesPattern() {
        // Pattern from JsonFormats.java - ObjectId, Date, and numeric types
        ObjectId testId = new ObjectId("507f1f77bcf86cd799439013");
        Date testDate = new Date(1640995200000L); // 2022-01-01T00:00:00Z

        List<Document> actualResults = Arrays.asList(
                new Document("_id", testId)
                        .append("createdAt", testDate)
                        .append("myNumber", 36520312L)
                        .append("isActive", true)
                        .append("rating", 4.5)
        );

        // Test with ellipsis patterns for ObjectId and Date (common in documentation)
        String expectedWithEllipsis = """
            {"_id": "...", "createdAt": "...", "myNumber": 36520312, "isActive": true, "rating": 4.5}
            """;

        assertDoesNotThrow(() -> {
            Expect.that(actualResults)
                    .shouldMatch(expectedWithEllipsis);
        });
    }

    @Test
    @DisplayName("Should handle different JSON output modes from JsonFormats.java")
    void testDifferentJsonOutputModes() {
        ObjectId testId = new ObjectId("507f1f77bcf86cd799439013");
        Date testDate = new Date(1640995200000L);

        Document document = new Document("_id", testId)
                .append("createdAt", testDate)
                .append("myNumber", 36520312L);

        // Test different JSON writer settings as seen in real documentation
        JsonWriterSettings extendedSettings = JsonWriterSettings.builder()
                .outputMode(JsonMode.EXTENDED).build();
        JsonWriterSettings relaxedSettings = JsonWriterSettings.builder()
                .outputMode(JsonMode.RELAXED).build();

        String extendedJson = document.toJson(extendedSettings);
        String relaxedJson = document.toJson(relaxedSettings);

        // These should be handled as different but valid representations
        assertNotEquals(extendedJson, relaxedJson);

        // Our library should handle both formats
        List<Document> results = Arrays.asList(document);

        // Should work with ellipsis patterns regardless of JSON mode
        String expectedPattern = """
            {"_id": "...", "createdAt": "...", "myNumber": 36520312}
            """;

        assertDoesNotThrow(() -> {
            Expect.that(results)
                    .shouldMatch(expectedPattern);
        });
    }

    @Test
    @DisplayName("Should handle bulk operation result patterns")
    void testBulkOperationResults() {
        // Pattern from Insert.java - handling InsertManyResult with IDs
        List<Document> documents = Arrays.asList(
                new Document("color", "red").append("qty", 5),
                new Document("color", "purple").append("qty", 10)
        );

        // Simulate what InsertManyResult.getInsertedIds() returns
        List<ObjectId> insertedIds = Arrays.asList(
                new ObjectId("507f1f77bcf86cd799439011"),
                new ObjectId("507f1f77bcf86cd799439012")
        );

        // Common pattern: printing just the IDs
        String expectedIdsOutput = """
            Inserted documents with the following ids: [507f1f77bcf86cd799439011, 507f1f77bcf86cd799439012]
            """;

        // Should handle ObjectId lists with ellipsis
        String expectedWithEllipsis = """
            Inserted documents with the following ids: [...]
            """;

        // Create the actual output string that would be printed (like in real MongoDB documentation)
        String actualOutput = "Inserted documents with the following ids: " + insertedIds.toString();

        assertDoesNotThrow(() -> {
            Expect.that(actualOutput)
                    
                    .shouldMatch(expectedWithEllipsis);
        });
    }

    @Test
    @DisplayName("Should handle aggregation pipeline result patterns")
    void testAggregationResults() {
        // Pattern from AggTour.java - aggregation with grouping
        List<Document> aggregationResults = Arrays.asList(
                new Document("_id", 4).append("count", 2),
                new Document("_id", 3).append("count", 1),
                new Document("_id", 5).append("count", 1)
        );

        String expectedContent = """
            {"_id": 4, "count": 2}
            {"_id": 3, "count": 1}
            {"_id": 5, "count": 1}
            """;

        // Aggregation results often come in different orders
        assertDoesNotThrow(() -> {
            Expect.that(aggregationResults)
                    
                    .shouldMatch(expectedContent);
        });
    }

    @Test
    @DisplayName("Should handle array size variations in query results")
    void testArraySizeVariations() {
        // Pattern from Query.java - documents with arrays of different sizes
        List<Document> queryResults = Arrays.asList(
                new Document("_id", 1).append("vendor", Arrays.asList("A", "E")),
                new Document("_id", 2).append("vendor", Arrays.asList("B", "D", "F")),
                new Document("_id", 6).append("vendor", Arrays.asList("C"))
        );

        // Fix: Use JSON Lines format (one object per line) for multiple documents
        String expectedWithEllipsis = """
            {"_id": 1, "vendor": [...]}
            {"_id": 2, "vendor": [...]}
            {"_id": 6, "vendor": [...]}
            """;

        assertDoesNotThrow(() -> {
            Expect.that(queryResults)
                    .shouldMatch(expectedWithEllipsis);
        });
    }

    @Test
    @DisplayName("Should handle optional fields pattern")
    void testOptionalFieldsPattern() {
        // Pattern from Query.java - some documents have rating, others don't
        List<Document> queryResults = Arrays.asList(
                new Document("_id", 2).append("color", "purple").append("rating", 5),
                new Document("_id", 3).append("color", "blue"), // No rating field
                new Document("_id", 4).append("color", "white").append("rating", 9)
        );

        // Should handle documents with different field sets
        String expectedContent = """
            {"_id": 2, "color": "purple", "rating": 5}
            {"_id": 3, "color": "blue"}
            {"_id": 4, "color": "white", "rating": 9}
            """;

        assertDoesNotThrow(() -> {
            Expect.that(queryResults)
                    .shouldMatch(expectedContent);
        });
    }

    @Test
    @DisplayName("Should handle error output patterns commonly shown in documentation")
    void testDocumentationErrorPatterns() {
        // Pattern for connection errors
        String connectionErrorOutput = """
            Exception in thread "main" com.mongodb.MongoTimeoutException: Timed out after 30000 ms while waiting for a server that matches ReadPreferenceServerSelector{readPreference=primary}
            at com.mongodb.internal.connection.BaseCluster.getServer(BaseCluster.java:105)
            at com.mongodb.client.internal.MongoClientDelegate.getDatabase(MongoClientDelegate.java:91)
            """;

        String expectedConnectionErrorPattern = """
            Exception in thread "main" com.mongodb.MongoTimeoutException: Timed out after 30000 ms while waiting for a server that matches ReadPreferenceServerSelector{readPreference=primary}
            ...
            """;

        assertDoesNotThrow(() -> {
            Expect.that(connectionErrorOutput)
                
                .shouldMatch(expectedConnectionErrorPattern);
        });

        // Pattern for authentication errors
        String authErrorOutput = """
            com.mongodb.MongoSecurityException: Exception authenticating MongoCredential{mechanism=SCRAM-SHA-256, userName='username', source='admin', password=<hidden>, mechanismProperties=<hidden>}
            Caused by: com.mongodb.MongoCommandException: Command failed with error 18 (AuthenticationFailed): 'Authentication failed.'
            """;

        String expectedAuthErrorPattern = """
            com.mongodb.MongoSecurityException: Exception authenticating MongoCredential{mechanism=SCRAM-SHA-256, userName='username', source='admin', password=<hidden>, mechanismProperties=<hidden>}
            Caused by: com.mongodb.MongoCommandException: Command failed with error 18 (AuthenticationFailed): 'Authentication failed.'
            """;

        assertDoesNotThrow(() -> {
            Expect.that(authErrorOutput)
                
                .shouldMatch(expectedAuthErrorPattern);
        });

        // Pattern for duplicate key errors
        String duplicateKeyErrorOutput = """
            com.mongodb.MongoWriteException: E11000 duplicate key error collection: sample_database.users index: _id_ dup key: { _id: ObjectId('507f1f77bcf86cd799439080') }
            """;

        String expectedDuplicateKeyPattern = """
            com.mongodb.MongoWriteException: E11000 duplicate key error collection: sample_database.users index: _id_ dup key: { _id: ObjectId('...') }
            """;

        assertDoesNotThrow(() -> {
            Expect.that(duplicateKeyErrorOutput)
                
                .shouldMatch(expectedDuplicateKeyPattern);
        });
    }

    @Test
    @DisplayName("Should handle error scenarios with partial results")
    void testErrorScenariosWithPartialResults() {
        // Pattern from Insert.java - MongoBulkWriteException with partial success
        List<Integer> partiallyInsertedIds = Arrays.asList(3, 4); // Some succeeded

        String expectedPartialResults = """
            A MongoBulkWriteException occurred, but there are successfully processed documents with the following ids: [3, 4]
            """;

        // Should handle error messages with embedded data
        String expectedWithEllipsis = """
            A MongoBulkWriteException occurred, but there are successfully processed documents with the following ids: [...]
            """;

        assertDoesNotThrow(() -> {
            Expect.that(expectedPartialResults)
                    
                    .shouldMatch(expectedWithEllipsis);
        });
    }

    @Test
    @DisplayName("Should handle POJO result patterns")
    void testPojoResultPatterns() {
        // Pattern from POJO-crud.java - class-based results instead of Documents
        // Note: This would require actual POJO classes in a real test

        // Simulate POJO toString() output that might be documented
        String pojoOutput = """
            [Flower{id=507f1f77bcf86cd799439011, name='daisy', colors=[purple, white], isBlooming=true, height=21.1}, Flower{id=507f1f77bcf86cd799439012, name='peony', colors=[red, green], isBlooming=false, height=19.2}]
            """;

        // Should handle POJO string representations with ellipsis
        String expectedWithEllipsis = """
            [Flower{id=..., name='daisy', colors=[purple, white], isBlooming=true, height=21.1}, Flower{id=..., name='peony', colors=[red, green], isBlooming=false, height=19.2}]
            """;

        assertDoesNotThrow(() -> {
            Expect.that(pojoOutput)
                    
                    .shouldMatch(expectedWithEllipsis);
        });
    }
}
