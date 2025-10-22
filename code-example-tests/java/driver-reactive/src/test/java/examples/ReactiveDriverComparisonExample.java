package examples;

import com.mongodb.reactivestreams.client.MongoClient;
import com.mongodb.reactivestreams.client.MongoClients;
import com.mongodb.reactivestreams.client.MongoCollection;
import com.mongodb.reactivestreams.client.MongoDatabase;
import mongodb.comparison.Expect;
import org.bson.Document;
import org.bson.types.ObjectId;
import org.reactivestreams.Publisher;
import org.reactivestreams.Subscriber;
import org.reactivestreams.Subscription;

import java.time.Duration;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.TimeUnit;

/**
 * Example demonstrating how to use the MongoDB Comparison Library
 * with the reactive MongoDB Java driver.
 */
public class ReactiveDriverComparisonExample {

    public static void main(String[] args) {
        // Example 1: Compare simple reactive query results
        demonstrateSimpleReactiveQuery();

        // Example 2: Compare reactive aggregation results
        demonstrateReactiveAggregation();

        // Example 3: Compare reactive Publishers directly
        demonstratePublisherComparison();

        // Example 4: Real MongoDB reactive example
        demonstrateWithRealReactiveMongoDB();
    }

    private static void demonstrateSimpleReactiveQuery() {
        System.out.println("=== Simple Reactive Query Comparison ===");

        // Simulate reactive query results
        Publisher<Document> queryResults = createSimplePublisher(Arrays.asList(
            new Document("name", "Alice").append("age", 30),
            new Document("name", "Bob").append("age", 25)
        ));

        // Convert to List for comparison using pure reactive-streams
        List<Map<String, Object>> actualData = collectAndTransform(queryResults, doc -> Map.<String, Object>of(
            "name", doc.getString("name"),
            "age", doc.getInteger("age")
        ), Duration.ofSeconds(5));

        // Create expected data as proper objects (not JSON strings)
        List<Map<String, Object>> expectedData = List.of(
            Map.of("name", "Alice", "age", 30),
            Map.of("name", "Bob", "age", 25)
        );

        try {
            Expect.that(actualData).shouldMatch(expectedData);
            System.out.println("✓ Reactive query results match expected output");
        } catch (AssertionError e) {
            System.out.println("✗ Reactive query comparison failed");
            System.out.println(e.getMessage());
        }
    }

    private static void demonstrateReactiveAggregation() {
        System.out.println("\n=== Reactive Aggregation Pipeline Comparison ===");

        // Simulate reactive aggregation results
        Publisher<Map<String, Object>> aggregationResults = createMapPublisher(Arrays.asList(
            Map.of("_id", "active", "count", 15),
            Map.of("_id", "inactive", "count", 8)
        ));

        List<Map<String, Object>> actualData = collectMapResults(aggregationResults, Duration.ofSeconds(5));

        // Create expected data as proper objects (not JSON strings)
        List<Map<String, Object>> expectedData = List.of(
            Map.of("_id", "active", "count", 15),
            Map.of("_id", "inactive", "count", 8)
        );

        try {
            Expect.that(actualData).shouldMatch(expectedData);
            System.out.println("✓ Reactive aggregation results match expected output");
        } catch (AssertionError e) {
            System.out.println("✗ Reactive aggregation comparison failed");
            System.out.println(e.getMessage());
        }
    }

    private static void demonstratePublisherComparison() {
        System.out.println("\n=== Direct Publisher Comparison ===");

        // Create a Publisher directly
        Publisher<Map<String, Object>> publisher = createMapPublisher(Arrays.asList(
            Map.of("_id", new ObjectId("507f1f77bcf86cd799439011"), "name", "John"),
            Map.of("_id", new ObjectId("507f1f77bcf86cd799439012"), "name", "Jane")
        ));

        // Create expected data as proper objects (not JSON strings)
        List<Map<String, Object>> expectedData = List.of(
            Map.of("_id", new ObjectId("507f1f77bcf86cd799439011"), "name", "John"),
            Map.of("_id", new ObjectId("507f1f77bcf86cd799439012"), "name", "Jane")
        );

        // The comparison library can handle Publishers directly
        try {
            Expect.that(publisher).shouldMatch(expectedData);
            System.out.println("✓ Publisher results match expected output");
        } catch (AssertionError e) {
            System.out.println("✗ Publisher comparison failed");
            System.out.println(e.getMessage());
        }
    }

    /**
     * Example of using the comparison library in a real reactive MongoDB context.
     * This method would connect to an actual MongoDB instance.
     */
    public static void demonstrateWithRealReactiveMongoDB() {
        System.out.println("\n=== Real Reactive MongoDB Example ===");

        // Since we don't have a real MongoDB connection for this demo,
        // let's simulate what the reactive query would look like
        Publisher<Map<String, Object>> simulatedResults = createMapPublisher(Arrays.asList(
            Map.of("_id", new ObjectId("507f1f77bcf86cd799439011"), "name", "Alice", "age", 30),
            Map.of("_id", new ObjectId("507f1f77bcf86cd799439012"), "name", "Bob", "age", 25)
        ));

        // Create expected data as proper objects
        List<Map<String, Object>> expectedData = List.of(
            Map.of("_id", new ObjectId("507f1f77bcf86cd799439011"), "name", "Alice", "age", 30),
            Map.of("_id", new ObjectId("507f1f77bcf86cd799439012"), "name", "Bob", "age", 25)
        );

        // Compare reactive results
        try {
            Expect.that(simulatedResults).shouldMatch(expectedData);
            System.out.println("✓ Reactive MongoDB simulation results match expected output");
        } catch (AssertionError e) {
            System.out.println("✗ Reactive MongoDB simulation comparison failed");
            System.out.println(e.getMessage());
        }

        System.out.println("\nNote: For real MongoDB usage, you would:");
        System.out.println("1. Connect to MongoDB: MongoClients.create(\"mongodb://localhost:27017\")");
        System.out.println("2. Get collection: database.getCollection(\"users\")");
        System.out.println("3. Execute reactive query: collection.find()");
        System.out.println("4. Use Expect.that(publisher).shouldMatch(expectedData)");
    }

    // Helper methods for pure reactive-streams implementation
    private static Publisher<Document> createSimplePublisher(List<Document> documents) {
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

    private static Publisher<Map<String, Object>> createMapPublisher(List<Map<String, Object>> maps) {
        return new Publisher<Map<String, Object>>() {
            @Override
            public void subscribe(Subscriber<? super Map<String, Object>> subscriber) {
                subscriber.onSubscribe(new Subscription() {
                    private int index = 0;
                    private volatile boolean cancelled = false;

                    @Override
                    public void request(long n) {
                        if (cancelled) return;

                        try {
                            while (index < maps.size() && n > 0) {
                                if (cancelled) return;
                                subscriber.onNext(maps.get(index++));
                                n--;
                            }

                            if (index >= maps.size() && !cancelled) {
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

    @FunctionalInterface
    private interface DocumentTransformer {
        Map<String, Object> transform(Document doc);
    }

    private static List<Map<String, Object>> collectAndTransform(Publisher<Document> publisher,
                                                                DocumentTransformer transformer,
                                                                Duration timeout) {
        try {
            CompletableFuture<List<Map<String, Object>>> future = new CompletableFuture<>();
            List<Map<String, Object>> results = new ArrayList<>();

            publisher.subscribe(new Subscriber<Document>() {
                private Subscription subscription;

                @Override
                public void onSubscribe(Subscription s) {
                    this.subscription = s;
                    s.request(Long.MAX_VALUE);
                }

                @Override
                public void onNext(Document item) {
                    results.add(transformer.transform(item));
                }

                @Override
                public void onError(Throwable t) {
                    future.completeExceptionally(t);
                }

                @Override
                public void onComplete() {
                    future.complete(results);
                }
            });

            return future.get(timeout.toMillis(), TimeUnit.MILLISECONDS);
        } catch (Exception e) {
            throw new RuntimeException("Failed to collect Publisher results: " + e.getMessage(), e);
        }
    }

    private static List<Map<String, Object>> collectMapResults(Publisher<Map<String, Object>> publisher, Duration timeout) {
        try {
            CompletableFuture<List<Map<String, Object>>> future = new CompletableFuture<>();
            List<Map<String, Object>> results = new ArrayList<>();

            publisher.subscribe(new Subscriber<Map<String, Object>>() {
                private Subscription subscription;

                @Override
                public void onSubscribe(Subscription s) {
                    this.subscription = s;
                    s.request(Long.MAX_VALUE);
                }

                @Override
                public void onNext(Map<String, Object> item) {
                    results.add(item);
                }

                @Override
                public void onError(Throwable t) {
                    future.completeExceptionally(t);
                }

                @Override
                public void onComplete() {
                    future.complete(results);
                }
            });

            return future.get(timeout.toMillis(), TimeUnit.MILLISECONDS);
        } catch (Exception e) {
            throw new RuntimeException("Failed to collect Publisher results: " + e.getMessage(), e);
        }
    }
}
