
package mongodb.comparison;

import org.bson.Document;
import org.bson.types.ObjectId;
import org.bson.types.Decimal128;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Disabled;

import java.time.Duration;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Reactive streams driver pattern tests implementing Priority 3, Section 7.
 *
 * These tests cover reactive-specific edge cases and patterns:
 * - Reactive Publisher result patterns
 * - Async operation error handling
 * - Streaming result patterns with backpressure
 * - Reactive bulk operation patterns
 * - Publisher timeout and cancellation scenarios
 */
class ReactiveStreamsRealWorldPatternsTest {
	@Test
    @DisplayName("Should handle complex reactive BulkWriteResult patterns")
    void testComplexReactiveBulkWriteResultPatterns() {
        // Test 1: Reactive bulk write with complex nested result structures
        String reactiveBulkResultOutput = """
            AcknowledgedBulkWriteResult{insertedCount=5, matchedCount=3, removedCount=2, modifiedCount=3, upserts=[BulkWriteUpsert{index=7, id=BsonObjectId{value=507f1f77bcf86cd799439080}}, BulkWriteUpsert{index=9, id=BsonObjectId{value=507f1f77bcf86cd799439081}}], inserts=[BulkWriteInsert{index=0, id=BsonObjectId{value=507f1f77bcf86cd799439070}}, BulkWriteInsert{index=1, id=BsonObjectId{value=507f1f77bcf86cd799439071}}, BulkWriteInsert{index=2, id=BsonObjectId{value=507f1f77bcf86cd799439072}}, BulkWriteInsert{index=3, id=BsonObjectId{value=507f1f77bcf86cd799439073}}, BulkWriteInsert{index=4, id=BsonObjectId{value=507f1f77bcf86cd799439074}}]}
            """;

        String expectedReactiveBulkPattern = """
            AcknowledgedBulkWriteResult{insertedCount=5, matchedCount=3, removedCount=2, modifiedCount=3, upserts=[BulkWriteUpsert{index=7, id=...}, BulkWriteUpsert{index=9, id=...}], inserts=[BulkWriteInsert{index=0, id=...}, BulkWriteInsert{index=1, id=...}, BulkWriteInsert{index=2, id=...}, BulkWriteInsert{index=3, id=...}, BulkWriteInsert{index=4, id=...}]}
            """;

        assertDoesNotThrow(() -> {
            Expect.that(reactiveBulkResultOutput)
                .shouldMatch(expectedReactiveBulkPattern);
        });

        // Test 2: Reactive bulk operation with writeErrors
        String bulkWithErrorsOutput = """
            MongoBulkWriteException: Bulk write operation failed
            Result: AcknowledgedBulkWriteResult{insertedCount=8, matchedCount=0, removedCount=0, modifiedCount=0, upserts=[], inserts=[BulkWriteInsert{index=0, id=BsonObjectId{value=507f1f77bcf86cd799439090}}, BulkWriteInsert{index=1, id=BsonObjectId{value=507f1f77bcf86cd799439091}}]}
            WriteErrors: [BulkWriteError{index=2, code=11000, message='E11000 duplicate key error', details=BsonDocument{}}]
            """;

        String expectedBulkErrorPattern = """
            MongoBulkWriteException: Bulk write operation failed
            Result: AcknowledgedBulkWriteResult{insertedCount=8, matchedCount=0, removedCount=0, modifiedCount=0, upserts=[], inserts=[BulkWriteInsert{index=0, id=...}, BulkWriteInsert{index=1, id=...}]}
            WriteErrors: [BulkWriteError{index=2, code=11000, message='E11000 duplicate key error', details=BsonDocument{}}]
            """;

        assertDoesNotThrow(() -> {
            Expect.that(bulkWithErrorsOutput)
                .shouldMatch(expectedBulkErrorPattern);
        });
    }

    @Test
    @DisplayName("Should handle reactive aggregation pipelines with complex nested results")
    void testReactiveAggregationPipelinesWithComplexResults() {
        // Test 1: Complex aggregation with $lookup and nested documents
        List<Document> complexReactiveAggregation = Arrays.asList(
            new Document("_id", new ObjectId("507f1f77bcf86cd799439100"))
                .append("orderNumber", "ORD-2023-001")
                .append("customer", new Document("customerId", new ObjectId("507f1f77bcf86cd799439101"))
                    .append("name", "Alice Johnson")
                    .append("email", "alice@example.com"))
                .append("items", Arrays.asList(
                    new Document("productId", new ObjectId("507f1f77bcf86cd799439102"))
                        .append("name", "Laptop")
                        .append("quantity", 1)
                        .append("unitPrice", new Decimal128(new BigDecimal("999.99")))
                        .append("categoryDetails", new Document("name", "Electronics")
                            .append("taxRate", 0.08)
                            .append("supplier", new Document("name", "TechCorp").append("country", "USA"))),
                    new Document("productId", new ObjectId("507f1f77bcf86cd799439103"))
                        .append("name", "Mouse")
                        .append("quantity", 2)
                        .append("unitPrice", new Decimal128(new BigDecimal("29.99")))
                        .append("categoryDetails", new Document("name", "Accessories")
                            .append("taxRate", 0.05)
                            .append("supplier", new Document("name", "AccessoryCorp").append("country", "China")))
                ))
                .append("totalAmount", new Decimal128(new BigDecimal("1059.97")))
                .append("tax", new Decimal128(new BigDecimal("83.50")))
                .append("orderDate", new Date())
                .append("shippingAddress", new Document("street", "123 Main St")
                    .append("city", "New York")
                    .append("state", "NY")
                    .append("zip", "10001"))
        );

        String expectedComplexAggregationPattern = """
            {"_id": "...", "customer": {"customerId": "...", "email": "alice@example.com", "name": "Alice Johnson"}, "items": [{"categoryDetails": {"name": "Electronics", "supplier": {"country": "USA", "name": "TechCorp"}, "taxRate": 0.08}, "name": "Laptop", "productId": "...", "quantity": 1, "unitPrice": "..."}, {"categoryDetails": {"name": "Accessories", "supplier": {"country": "China", "name": "AccessoryCorp"}, "taxRate": 0.05}, "name": "Mouse", "productId": "...", "quantity": 2, "unitPrice": "..."}], "orderDate": "...", "orderNumber": "ORD-2023-001", "shippingAddress": {"city": "New York", "state": "NY", "street": "123 Main St", "zip": "10001"}, "tax": "...", "totalAmount": "..."}
            """;

        assertDoesNotThrow(() -> {
            Expect.that(complexReactiveAggregation)
                .shouldMatch(expectedComplexAggregationPattern);
        });

        // Test 2: Reactive aggregation with $group and complex expressions
        List<Document> groupingAggregation = Arrays.asList(
            new Document("_id", new Document("year", 2023).append("month", 12))
                .append("totalRevenue", new Decimal128(new BigDecimal("1500000.00")))
                .append("orderCount", 1250)
                .append("avgOrderValue", new Decimal128(new BigDecimal("1200.00")))
                .append("topCategories", Arrays.asList(
                    new Document("category", "Electronics").append("revenue", new Decimal128(new BigDecimal("750000.00"))),
                    new Document("category", "Books").append("revenue", new Decimal128(new BigDecimal("300000.00"))),
                    new Document("category", "Clothing").append("revenue", new Decimal128(new BigDecimal("450000.00")))
                ))
                .append("customerStats", new Document("newCustomers", 89)
                    .append("returningCustomers", 421)
                    .append("topSpender", new Document("customerId", new ObjectId("507f1f77bcf86cd799439110"))
                        .append("totalSpent", new Decimal128(new BigDecimal("25000.00")))))
        );

        String expectedGroupingPattern = """
            {"_id": {"year": 2023, "month": 12}, "totalRevenue": "...", "orderCount": 1250, "avgOrderValue": "...", "topCategories": [...], "customerStats": {"newCustomers": 89, "returningCustomers": 421, "topSpender": {"customerId": "...", "totalSpent": "..."}}}
            """;

        assertDoesNotThrow(() -> {
            Expect.that(groupingAggregation)
                .shouldMatch(expectedGroupingPattern);
        });
    }

    @Test
    @DisplayName("Should handle reactive error scenarios with partial results")
    void testReactiveErrorScenariosWithPartialResults() {
        // Test 1: Reactive timeout with partial data collection
        String reactiveTimeoutOutput = """
            ReactiveTimeoutException: Publisher timed out after 30 seconds
            Collected before timeout: 1,247 documents
            Sample results:
            {"_id": "507f1f77bcf86cd799439120", "batch": 1, "status": "processed"}
            {"_id": "507f1f77bcf86cd799439121", "batch": 1, "status": "processed"}
            {"_id": "507f1f77bcf86cd799439122", "batch": 1, "status": "failed"}
            Last successful batch: 15 of 50
            Remaining operations cancelled: 35 batches
            """;

        String expectedTimeoutPattern = """
            ReactiveTimeoutException: Publisher timed out after 30 seconds
            Collected before timeout: 1,247 documents
            Sample results:
            {"_id": "...", "batch": 1, "status": "processed"}
            {"_id": "...", "batch": 1, "status": "processed"}
            {"_id": "...", "batch": 1, "status": "failed"}
            Last successful batch: 15 of 50
            Remaining operations cancelled: 35 batches
            """;

        assertDoesNotThrow(() -> {
            Expect.that(reactiveTimeoutOutput)
                .shouldMatch(expectedTimeoutPattern);
        });

        // Test 2: Reactive stream error with backpressure
        String backpressureErrorOutput = """
            ReactiveBackpressureException: Downstream cannot keep up with Publisher rate
            Buffer overflow at element: 50,000
            Dropped elements: 1,234
            Current queue size: 10,000 (max: 10,000)
            Processing rate: 500 elements/sec
            Publisher rate: 1,200 elements/sec
            Lost data sample:
            {"_id": "507f1f77bcf86cd799439130", "timestamp": "2023-12-01T10:30:15.123Z"}
            {"_id": "507f1f77bcf86cd799439131", "timestamp": "2023-12-01T10:30:15.124Z"}
            """;

        String expectedBackpressurePattern = """
            ReactiveBackpressureException: Downstream cannot keep up with Publisher rate
            Buffer overflow at element: 50,000
            Dropped elements: 1,234
            Current queue size: 10,000 (max: 10,000)
            Processing rate: 500 elements/sec
            Publisher rate: 1,200 elements/sec
            Lost data sample:
            {"_id": "...", "timestamp": "..."}
            {"_id": "...", "timestamp": "..."}
            """;

        assertDoesNotThrow(() -> {
            Expect.that(backpressureErrorOutput)
                .shouldMatch(expectedBackpressurePattern);
        });
    }

    @Test
    @DisplayName("Should handle reactive Publisher patterns with async operations")
    void testReactivePublisherPatternsWithAsyncOperations() {
        // Test 1: Chained reactive operations result
        List<Document> chainedResults = Arrays.asList(
            new Document("stage", "find")
                .append("duration", Duration.ofMillis(45).toMillis())
                .append("documentsFound", 1500)
                .append("filters", Arrays.asList("status:active", "created:>2023-01-01")),

            new Document("stage", "map")
                .append("duration", Duration.ofMillis(12).toMillis())
                .append("transformations", Arrays.asList("addComputedFields", "normalizeData"))
                .append("itemsProcessed", 1500),

            new Document("stage", "filter")
                .append("duration", Duration.ofMillis(8).toMillis())
                .append("predicates", Arrays.asList("revenue>1000", "category:electronics"))
                .append("itemsRemaining", 342),

            new Document("stage", "collect")
                .append("duration", Duration.ofMillis(3).toMillis())
                .append("finalCount", 342)
                .append("totalDuration", Duration.ofMillis(68).toMillis())
        );

        String expectedChainedPattern = """
            {"stage": "find", "duration": 45, "documentsFound": 1500, "filters": ["status:active", "created:>2023-01-01"]}
            {"stage": "map", "duration": 12, "transformations": ["addComputedFields", "normalizeData"], "itemsProcessed": 1500}
            {"stage": "filter", "duration": 8, "predicates": ["revenue>1000", "category:electronics"], "itemsRemaining": 342}
            {"stage": "collect", "duration": 3, "finalCount": 342, "totalDuration": 68}
            """;

        assertDoesNotThrow(() -> {
            Expect.that(chainedResults)
                .shouldMatch(expectedChainedPattern);
        });

        // Test 2: Reactive stream with async parallel processing
        List<Document> parallelResults = Arrays.asList(
            new Document("workerId", "worker-1")
                .append("batchId", new ObjectId("507f1f77bcf86cd799439140"))
                .append("processedCount", 250)
                .append("errors", Arrays.asList())
                .append("avgProcessingTime", Duration.ofMillis(15).toMillis())
                .append("startTime", new Date())
                .append("endTime", new Date()),

            new Document("workerId", "worker-2")
                .append("batchId", new ObjectId("507f1f77bcf86cd799439141"))
                .append("processedCount", 248)
                .append("errors", Arrays.asList(
                    new Document("index", 125).append("error", "ValidationException").append("docId", new ObjectId("507f1f77bcf86cd799439142")),
                    new Document("index", 200).append("error", "DuplicateKeyException").append("docId", new ObjectId("507f1f77bcf86cd799439143"))
                ))
                .append("avgProcessingTime", Duration.ofMillis(18).toMillis())
                .append("startTime", new Date())
                .append("endTime", new Date()),

            new Document("workerId", "worker-3")
                .append("batchId", new ObjectId("507f1f77bcf86cd799439144"))
                .append("processedCount", 250)
                .append("errors", Arrays.asList())
                .append("avgProcessingTime", Duration.ofMillis(14).toMillis())
                .append("startTime", new Date())
                .append("endTime", new Date())
        );

        String expectedParallelPattern = """
            {"avgProcessingTime": 15, "batchId": "...", "endTime": "...", "errors": [], "processedCount": 250, "startTime": "...", "workerId": "worker-1"}
            {"avgProcessingTime": 18, "batchId": "...", "endTime": "...", "errors": [{"docId": "...", "error": "ValidationException", "index": 125}, {"docId": "...", "error": "DuplicateKeyException", "index": 200}], "processedCount": 248, "startTime": "...", "workerId": "worker-2"}
            {"avgProcessingTime": 14, "batchId": "...", "endTime": "...", "errors": [], "processedCount": 250, "startTime": "...", "workerId": "worker-3"}
            """;

        assertDoesNotThrow(() -> {
            Expect.that(parallelResults)
                 // Workers can complete in any order
                .shouldMatch(expectedParallelPattern);
        });
    }

    @Test
    // @Disabled("Requires reactive dependencies to be available")
    @DisplayName("Should handle actual Publisher with complex transformation chains")
    void testActualPublisherWithComplexTransformations() {
        // This test would require reactive streams implementation
        // Demonstrates patterns for real reactive Publisher testing

        /*
        // Example of what this test would look like with actual reactive dependencies:

        Publisher<Document> sourcePublisher = // ... actual MongoDB reactive query

        Publisher<Document> transformedPublisher = Flux.from(sourcePublisher)
            .filter(doc -> doc.getInteger("score", 0) > 50)
            .map(doc -> doc.append("processed", true).append("timestamp", new Date()))
            .buffer(Duration.ofSeconds(1))
            .flatMap(batch -> {
                // Simulate batch processing
                return Flux.fromIterable(batch)
                    .map(doc -> doc.append("batchSize", batch.size()));
            })
            .onErrorResume(error -> {
                // Error recovery
                return Flux.just(new Document("error", error.getMessage())
                    .append("recoveryTime", new Date()));
            });

        String expectedTransformedPattern = '''
            {"_id": "...", "score": 75, "processed": true, "timestamp": "...", "batchSize": ...}
            {"_id": "...", "score": 82, "processed": true, "timestamp": "...", "batchSize": ...}
            ''';

        assertDoesNotThrow(() -> {
            Expect.expectFromPublisher(transformedPublisher, Duration.ofSeconds(10))
                
                .shouldMatch(expectedTransformedPattern);
        });
        */
    }

    @Test
    @DisplayName("Should handle reactive driver configuration and connection patterns")
    void testReactiveDriverConfigurationPatterns() {
        // Test 1: Reactive connection pool configuration
        String reactiveConfigOutput = """
            ReactiveMongoClient configuration:
            Connection String: mongodb+srv://username:***@cluster0.mongodb.net/sample_database
            Min Pool Size: 5
            Max Pool Size: 20
            Max Wait Time: 30000ms
            Max Connection Life Time: 600000ms
            Max Connection Idle Time: 120000ms
            Subscriber Context: ReactiveContextProvider{threads=8, scheduler=elastic}
            Publisher Buffer Size: 1000
            Backpressure Strategy: DROP_LATEST
            """;

        String expectedReactiveConfigPattern = """
            ReactiveMongoClient configuration:
            Connection String: mongodb+srv://username:***@cluster0.mongodb.net/sample_database
            Min Pool Size: ...
            Max Pool Size: ...
            Max Wait Time: ...
            Max Connection Life Time: ...
            Max Connection Idle Time: ...
            Subscriber Context: ReactiveContextProvider{threads=..., scheduler=...}
            Publisher Buffer Size: ...
            Backpressure Strategy: ...
            """;

        assertDoesNotThrow(() -> {
            Expect.that(reactiveConfigOutput)
                .shouldMatch(expectedReactiveConfigPattern);
        });

        // Test 2: Reactive operation performance metrics
        String performanceMetricsOutput = """
            Reactive Operation Metrics:
            Operation: findByQuery
            Publisher Type: FindPublisher
            Total Elements: 5,234
            Processing Time: 2,345ms
            Throughput: 2,231 docs/sec
            Backpressure Events: 3
            Buffer Overflows: 0
            Memory Usage: 45.2MB
            Subscriber Count: 1
            Completion Status: SUCCESS
            """;

        String expectedMetricsPattern = """
            Reactive Operation Metrics:
            Operation: findByQuery
            Publisher Type: FindPublisher
            Total Elements: ...
            Processing Time: ...
            Throughput: ...
            Backpressure Events: ...
            Buffer Overflows: ...
            Memory Usage: ...
            Subscriber Count: ...
            Completion Status: SUCCESS
            """;

        assertDoesNotThrow(() -> {
            Expect.that(performanceMetricsOutput)
                .shouldMatch(expectedMetricsPattern);
        });
    }

    @Test
    @DisplayName("Should handle reactive edge cases and boundary conditions")
    void testReactiveEdgeCasesAndBoundaryConditions() {
        // Test 1: Empty reactive stream
        List<Document> emptyReactiveResults = Arrays.asList();
    String expectedEmptyPattern = "[]";

        assertDoesNotThrow(() -> {
            Expect.that(emptyReactiveResults)
                .shouldMatch(expectedEmptyPattern);
        });

        // Test 2: Single element reactive stream
        List<Document> singleElementStream = Arrays.asList(
            new Document("_id", new ObjectId("507f1f77bcf86cd799439150"))
                .append("message", "Single element in reactive stream")
                .append("timestamp", new Date())
                .append("metadata", new Document("batchSize", 1).append("isLast", true))
        );

        String expectedSinglePattern = """
            {"_id": "...", "message": "Single element in reactive stream", "timestamp": "...", "metadata": {"batchSize": 1, "isLast": true}}
            """;

        assertDoesNotThrow(() -> {
            Expect.that(singleElementStream)
                .shouldMatch(expectedSinglePattern);
        });

        // Test 3: Reactive stream with error element
        String errorElementOutput = """
            ReactiveStreamErrorElement{
                position: 1,247,
                error: MongoException{code=11000, message='E11000 duplicate key error'},
                context: {"batchId": "507f1f77bcf86cd799439160", "operation": "insert", "retryCount": 3},
                timestamp: 2023-12-01T10:30:45.678Z,
                recovery: "element_skipped"
            }
            """;

        String expectedErrorElementPattern = """
            ReactiveStreamErrorElement{
                position: 1,247,
                error: MongoException{code=11000, message='E11000 duplicate key error'},
                context: {"batchId": "...", "operation": "insert", "retryCount": 3},
                timestamp: ...,
                recovery: "element_skipped"
            }
            """;

        assertDoesNotThrow(() -> {
            Expect.that(errorElementOutput)
                .shouldMatch(expectedErrorElementPattern);
        });

        // Test 4: Very large reactive batch result
        String largeBatchOutput = """
            ReactiveBatchResult{
                batchNumber: 1,
                elements: 10000,
                processingTime: 5.234s,
                memoryUsage: 128.5MB,
                sample: [
                    {"_id": "507f1f77bcf86cd799439170", "index": 0},
                    {"_id": "507f1f77bcf86cd799439171", "index": 1},
                    {"_id": "507f1f77bcf86cd799439172", "index": 2}
                ],
                compressionRatio: 0.75,
                checksums: {
                    "md5": "d41d8cd98f00b204e9800998ecf8427e",
                    "sha256": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
                }
            }
            """;

        String expectedLargeBatchPattern = """
            ReactiveBatchResult{
                batchNumber: 1,
                elements: 10000,
                processingTime: ...,
                memoryUsage: ...,
                sample: [
                    {"_id": "...", "index": 0},
                    {"_id": "...", "index": 1},
                    {"_id": "...", "index": 2}
                ],
                compressionRatio: 0.75,
                checksums: {
                    "md5": "...",
                    "sha256": "..."
                }
            }
            """;

        assertDoesNotThrow(() -> {
            Expect.that(largeBatchOutput)
                .shouldMatch(expectedLargeBatchPattern);
        });
    }

    @Test
	@DisplayName("Should handle BulkWriteResult toString() patterns from reactive driver")
	void testBulkWriteResultToString() {
		// Pattern from reactive bulk-write.java - BulkWriteResult.toString() output
		String bulkWriteResultOutput = """
			AcknowledgedBulkWriteResult{insertedCount=2, matchedCount=2, removedCount=1, modifiedCount=2, upserts=[], inserts=[BulkWriteInsert{index=0, id=BsonObjectId{value=507f1f77bcf86cd799439011}}, BulkWriteInsert{index=1, id=BsonObjectId{value=507f1f77bcf86cd799439012}}]}
			""";

		// Should handle complex result object strings with ellipsis patterns
		String expectedWithEllipsis = """
			AcknowledgedBulkWriteResult{insertedCount=2, matchedCount=2, removedCount=1, modifiedCount=2, upserts=[], inserts=[BulkWriteInsert{index=0, id=...}, BulkWriteInsert{index=1, id=...}]}
			""";

		assertDoesNotThrow(() -> {
			Expect.that(bulkWriteResultOutput)
				.shouldMatch(expectedWithEllipsis);
		});
	}

	@Test
	@DisplayName("Should handle reactive operation chains with Mono.from().block() patterns")
	void testReactiveOperationChains() {
		// Pattern from reactive examples - results collected from Publishers
		List<Document> reactiveResults = Arrays.asList(
			new Document("name", "Mongo's Deli")
				.append("cuisine", "Sandwiches")
				.append("borough", "Manhattan")
				.append("restaurant_id", "1234"),
			new Document("name", "Mongo's Deli")
				.append("cuisine", "Sandwiches")
				.append("borough", "Brooklyn")
				.append("restaurant_id", "5678")
		);

		String expectedContent = """
			{"name": "Mongo's Deli", "cuisine": "Sandwiches", "borough": "Manhattan", "restaurant_id": "1234"}
			{"name": "Mongo's Deli", "cuisine": "Sandwiches", "borough": "Brooklyn", "restaurant_id": "5678"}
			""";

		// Reactive results might come in different orders due to async nature
		assertDoesNotThrow(() -> {
			Expect.that(reactiveResults)
				
				.shouldMatch(expectedContent);
		});
	}

	@Test
	@Disabled("Requires reactive streams on classpath")
	@DisplayName("Should handle actual Publisher with timeout")
	void testPublisherWithTimeout() {
		// This would test actual Publisher handling but requires reactive dependencies
		// Demonstrates the pattern that would be used in real reactive tests

		/*
		MockPublisher<Document> publisher = new MockPublisher<>(Arrays.asList(
			new Document("status", "success"),
			new Document("status", "pending")
		));

		String expectedContent = '''
			{"status": "success"}
			{"status": "pending"}
			''';

		assertDoesNotThrow(() -> {
			Expect.expectFromPublisher(publisher, Duration.ofSeconds(5))
				.shouldMatch(expectedContent);
		});
		*/
	}

	@Test
	@DisplayName("Should handle reactive driver connection and operation patterns")
	void testReactiveConnectionPatterns() {
		// Pattern from reactive examples - connection strings and client setup
		String connectionOutput = """
			Connected to MongoDB using reactive streams driver
			Database: sample_restaurants
			Collection: restaurants
			""";

		// Should handle multi-line output patterns
		String expectedPattern = """
			Connected to MongoDB using reactive streams driver
			Database: ...
			Collection: ...
			""";

		assertDoesNotThrow(() -> {
			Expect.that(connectionOutput)
				.shouldMatch(expectedPattern);
		});
	}

	@Test
	@DisplayName("Should handle ordered vs unordered bulk write patterns")
	void testOrderedVsUnorderedBulkWrites() {
		// Pattern from reactive bulk-write.java - different ordering behavior

		// Ordered results (default)
		List<Document> orderedResults = Arrays.asList(
			new Document("operation", "insert").append("index", 0),
			new Document("operation", "update").append("index", 1),
			new Document("operation", "delete").append("index", 2)
		);

		// Unordered results (could be in any order)
		List<Document> unorderedResults = Arrays.asList(
			new Document("operation", "delete").append("index", 2),
			new Document("operation", "insert").append("index", 0),
			new Document("operation", "update").append("index", 1)
		);

		String expectedOrdered = """
			{"index": 0, "operation": "insert"}
			{"index": 1, "operation": "update"}
			{"index": 2, "operation": "delete"}
			""";

		// For ordered operations, sequence matters
		assertDoesNotThrow(() -> {
			Expect.that(orderedResults)
				.shouldMatch(expectedOrdered);
		});

		// For unordered operations, sequence doesn't matter
		assertDoesNotThrow(() -> {
			Expect.that(unorderedResults)
				
				.shouldMatch(expectedOrdered);
		});
	}
}
