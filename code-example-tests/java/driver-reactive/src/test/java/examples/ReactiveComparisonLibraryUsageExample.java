package examples;

import mongodb.comparison.OutputValidator;
import mongodb.comparison.OutputValidatorReactive;
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

        // Simple validation using utility method
        TestDataLoader.validatePublisherResultsFromFile("expected-results.txt", publisher);

        // Or with full control using the OutputValidator API
        OutputValidatorReactive.expectFromPublisher(publisher)
            .withUnorderedArrays()              // Results can be in any order
            .withIgnoredFields("_id")           // Ignore dynamic fields
            .assertMatchesFile("expected-results.txt");
    }

    @Test
    void examplePublisherWithTimeout() {
        // For long-running operations, specify custom timeout
        Publisher<Document> slowPublisher = createSlowPublisher();

        OutputValidatorReactive.expectFromPublisher(slowPublisher, Duration.ofMinutes(2))
            .withUnorderedArrays()
            .assertMatchesFile("expected-results.txt");
    }

    @Test
    void exampleManualCollection() {
        // Sometimes you need more control over Publisher collection
        Publisher<Document> publisher = createPublisher();

        // Manually collect results first
        List<Document> results = TestDataLoader.collectPublisherResults(
            publisher, Duration.ofSeconds(30));

        // Then validate using standard API
        OutputValidator.expect(results)
            .withIgnoredFields("_id", "timestamp")
            .assertMatchesFile("expected-results.txt");
    }

    @Test
    void exampleEmptyPublisher() {
        // Handle empty Publishers
        Publisher<Document> emptyPublisher = createSimplePublisher(Arrays.asList());

        OutputValidatorReactive.expectFromPublisher(emptyPublisher)
            .assertMatches(List.of()); // Should match empty list
    }

    @Test
    void examplePublisherError() {
        // Handle Publisher that might emit errors
        Publisher<Document> errorPublisher = createErrorPublisher("Test error");

        try {
            OutputValidatorReactive.expectFromPublisher(errorPublisher)
                .assertMatchesFile("expected-results.txt");
        } catch (RuntimeException e) {
            // Expected - Publisher collection will fail
            assert e.getMessage().contains("Failed to collect Publisher results");
        }
    }

    @Test
    void exampleStreamingComparison() {
        // Large result sets with streaming
        Publisher<Document> largeResultSet = createLargeResultSet(1000);

        OutputValidatorReactive.expectFromPublisher(largeResultSet, Duration.ofMinutes(5))
            .withUnorderedArrays()
            .withIgnoredFields("_id")
            .assertMatchesFile("large-expected-results.txt");
    }

    @Test
    void exampleUtilityMethods() {
        Publisher<Document> publisher = createPublisher();

        // Various utility methods for common scenarios
        TestDataLoader.validatePublisherResultsFromFile("expected.txt", publisher);
        
        // With custom timeout
        TestDataLoader.validatePublisherResultsFromFile("expected.txt", publisher, Duration.ofMinutes(1));
        
        // With ignored fields
        TestDataLoader.validatePublisherResultsFromFile("expected.txt", publisher, "_id", "timestamp");
        
        // Ordered validation
        TestDataLoader.validateOrderedPublisherResultsFromFile("sorted-expected.txt", publisher);
        
        // With debug output
        TestDataLoader.validatePublisherResultsFromFileWithDebug("expected.txt", publisher);
    }

    @Test
    void exampleCrossDriverCompatibility() {
        // Results from reactive driver
        Publisher<Document> reactiveResults = createPublisher();
        List<Document> collectedResults = TestDataLoader.collectPublisherResults(reactiveResults);

        // Results from sync driver (simulated)
        List<Document> syncResults = List.of(
            Document.parse("{\"name\": \"Alice\", \"age\": 30}"),
            Document.parse("{\"name\": \"Bob\", \"age\": 25}")
        );

        // Both should validate against the same expected file
        OutputValidator.expect(collectedResults)
            .withUnorderedArrays()
            .assertMatchesFile("cross-driver-expected.txt");

        OutputValidator.expect(syncResults)
            .withUnorderedArrays()
            .assertMatchesFile("cross-driver-expected.txt");
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
