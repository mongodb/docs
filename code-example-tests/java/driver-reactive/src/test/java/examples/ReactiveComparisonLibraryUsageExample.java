package examples;

import mongodb.comparison.Expect;
import mongodb.comparison.ExpectReactive;
import utils.TestDataLoader;
import org.bson.Document;
import org.junit.jupiter.api.Test;
import org.reactivestreams.Publisher;
import org.reactivestreams.Subscriber;
import org.reactivestreams.Subscription;

import java.time.Duration;
import java.util.Arrays;
import java.util.List;

/**
 * Example test demonstrating the comparison library with reactive Publishers.
 * Shows how the same API works for both sync and reactive scenarios.
 */
class ReactiveComparisonLibraryUsageExample {

    @Test
    void exampleBasicPublisherUsage() {
        // Simulate Publisher results from MongoDB Reactive Streams driver
        Publisher<Document> publisher = createSimplePublisher(Arrays.asList(
            Document.parse("{\"name\": \"Alice\", \"age\": 30, \"city\": \"New York\"}"),
            Document.parse("{\"name\": \"Bob\", \"age\": 25, \"city\": \"Los Angeles\"}")
        ));

        // Expected results as actual data objects
        List<Document> expectedResults = Arrays.asList(
            Document.parse("{\"name\": \"Alice\", \"age\": 30, \"city\": \"New York\"}"),
            Document.parse("{\"name\": \"Bob\", \"age\": 25, \"city\": \"Los Angeles\"}")
        );

        // Simple validation using utility method with actual data
        List<Document> actualResults = TestDataLoader.collectPublisherResults(publisher);
        Expect.that(actualResults).shouldMatch(expectedResults);

        // Or with full control using the ExpectReactive API
        ExpectReactive.that(publisher)
            .withIgnoredFields("_id")                // Ignore dynamic fields
            .shouldMatch(expectedResults);
    }

    @Test
    void examplePublisherWithTimeout() {
        // For long-running operations, specify custom timeout
        Publisher<Document> slowPublisher = createSlowPublisher();

        // Expected results as actual data objects
        List<Document> expectedResults = Arrays.asList(
            Document.parse("{\"name\": \"Slow\", \"value\": 789}")
        );

        ExpectReactive.that(slowPublisher, Duration.ofMinutes(2))
            .shouldMatch(expectedResults);
    }

    @Test
    void exampleManualCollection() {
        // Sometimes you need more control over Publisher collection
        Publisher<Document> publisher = createPublisher();

        // Manually collect results first
        List<Document> results = TestDataLoader.collectPublisherResults(
            publisher, Duration.ofSeconds(30));

        // Expected results as actual data objects
        List<Document> expectedResults = Arrays.asList(
            Document.parse("{\"name\": \"Alice\", \"value\": 123}"),
            Document.parse("{\"name\": \"Bob\", \"value\": 456}")
        );

        // Then validate using standard API
        Expect.that(results)
            .withIgnoredFields("_id", "timestamp")
            .shouldMatch(expectedResults);
    }

    @Test
    void exampleEmptyPublisher() {
        // Handle empty Publishers
        Publisher<Document> emptyPublisher = createSimplePublisher(Arrays.asList());

        ExpectReactive.that(emptyPublisher)
            .shouldMatch(List.of()); // Should match empty list
    }

    @Test
    void examplePublisherError() {
        // Handle Publisher that might emit errors
        Publisher<Document> errorPublisher = createErrorPublisher("Test error");

        // Expected results as actual data objects (won't be reached due to error)
        List<Document> expectedResults = Arrays.asList(
            Document.parse("{\"name\": \"Alice\", \"value\": 123}")
        );

        try {
            ExpectReactive.that(errorPublisher)
                .shouldMatch(expectedResults);
        } catch (RuntimeException e) {
            // Expected - Publisher collection will fail
            assert e.getMessage().contains("Failed to collect Publisher results");
        }
    }

    @Test
    void exampleStreamingComparison() {
        // Large result sets with streaming (using smaller set for test)
        Publisher<Document> largeResultSet = createLargeResultSet(3);

        // Expected results as actual data objects (first 3 items)
        List<Document> expectedResults = Arrays.asList(
            Document.parse("{\"id\": 1, \"data\": \"item1\"}"),
            Document.parse("{\"id\": 2, \"data\": \"item2\"}"),
            Document.parse("{\"id\": 3, \"data\": \"item3\"}")
        );

        ExpectReactive.that(largeResultSet, Duration.ofMinutes(5))
            .withIgnoredFields("_id")
            .shouldMatch(expectedResults);
    }

    @Test
    void exampleUtilityMethods() {
        Publisher<Document> publisher = createPublisher();

        // Expected results as actual data objects
        List<Document> expectedResults = Arrays.asList(
            Document.parse("{\"name\": \"Alice\", \"value\": 123}"),
            Document.parse("{\"name\": \"Bob\", \"value\": 456}")
        );

        // Various utility methods for common scenarios using actual data
        List<Document> actualResults = TestDataLoader.collectPublisherResults(publisher);
        Expect.that(actualResults).shouldMatch(expectedResults);

        // With custom timeout
        List<Document> actualResultsWithTimeout = TestDataLoader.collectPublisherResults(publisher, Duration.ofMinutes(1));
        Expect.that(actualResultsWithTimeout).shouldMatch(expectedResults);

        // With ignored fields
        Expect.that(actualResults).withIgnoredFields("_id", "timestamp").shouldMatch(expectedResults);

        // Ordered validation
        Expect.that(actualResults).withOrderedSort().shouldMatch(expectedResults);

        // With debug output
        Expect.that(actualResults).shouldMatchWithDebug(expectedResults);
    }

    @Test
    void exampleCrossDriverCompatibility() {
        // Results from reactive driver
        Publisher<Document> reactiveResults = createPublisher();
        List<Document> collectedResults = TestDataLoader.collectPublisherResults(reactiveResults);

        // Results from sync driver (simulated)
        List<Document> syncResults = List.of(
            Document.parse("{\"name\": \"Alice\", \"value\": 123}"),
            Document.parse("{\"name\": \"Bob\", \"value\": 456}")
        );

        // Expected results as actual data objects
        List<Document> expectedResults = Arrays.asList(
            Document.parse("{\"name\": \"Alice\", \"value\": 123}"),
            Document.parse("{\"name\": \"Bob\", \"value\": 456}")
        );

        // Both should validate against the same expected data
        Expect.that(collectedResults)
            .shouldMatch(expectedResults);

        Expect.that(syncResults)
            .shouldMatch(expectedResults);
    }

    // Helper methods to simulate reactive MongoDB operations without Project Reactor
    private Publisher<Document> createPublisher() {
        return createSimplePublisher(Arrays.asList(
            Document.parse("{\"name\": \"Alice\", \"value\": 123}"),
            Document.parse("{\"name\": \"Bob\", \"value\": 456}")
        ));
    }

    private Publisher<Document> createSlowPublisher() {
        // Note: Without Project Reactor, we can't easily simulate delays
        // This is just a simple publisher for demonstration
        return createSimplePublisher(Arrays.asList(
            Document.parse("{\"name\": \"Slow\", \"value\": 789}")
        ));
    }

    private Publisher<Document> createLargeResultSet(int count) {
        List<Document> documents = new java.util.ArrayList<>();
        for (int i = 1; i <= count; i++) {
            documents.add(Document.parse("{\"id\": " + i + ", \"data\": \"item" + i + "\"}"));
        }
        return createSimplePublisher(documents);
    }

    // Pure reactive-streams Publisher implementation
    private Publisher<Document> createSimplePublisher(List<Document> documents) {
        return new Publisher<Document>() {
            @Override
            public void subscribe(Subscriber<? super Document> subscriber) {
                subscriber.onSubscribe(new Subscription() {
                    private int index = 0;
                    private volatile boolean cancelled = false;

                    @Override
                    public void request(long n) {
                        if (cancelled) return;

                        try {
                            while (index < documents.size() && n > 0) {
                                if (cancelled) return;
                                subscriber.onNext(documents.get(index++));
                                n--;
                            }

                            if (index >= documents.size() && !cancelled) {
                                subscriber.onComplete();
                            }
                        } catch (Exception e) {
                            if (!cancelled) {
                                subscriber.onError(e);
                            }
                        }
                    }

                    @Override
                    public void cancel() {
                        cancelled = true;
                    }
                });
            }
        };
    }

    // Error Publisher implementation
    private Publisher<Document> createErrorPublisher(String errorMessage) {
        return new Publisher<Document>() {
            @Override
            public void subscribe(Subscriber<? super Document> subscriber) {
                subscriber.onSubscribe(new Subscription() {
                    @Override
                    public void request(long n) {
                        subscriber.onError(new RuntimeException(errorMessage));
                    }

                    @Override
                    public void cancel() {
                        // No-op
                    }
                });
            }
        };
    }
}
