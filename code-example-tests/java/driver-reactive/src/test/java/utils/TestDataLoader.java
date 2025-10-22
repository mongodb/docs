package utils;

import mongodb.comparison.Expect;
import mongodb.comparison.ExpectReactive;
import org.bson.Document;
import org.reactivestreams.Publisher;
import org.reactivestreams.Subscriber;
import org.reactivestreams.Subscription;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.Duration;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.TimeUnit;

/**
 * Simple utilities for loading test data files in Reactive Streams Driver tests.
 * For result validation, use the shared comparison library directly.
 */
public class TestDataLoader {

    /**
     * Loads MongoDB Documents from a file containing JSON lines.
     * Each line should contain a valid JSON document.
     *
     * @param filePath Path to the file to read
     * @return List of Documents read from the file
     * @throws RuntimeException if file cannot be read or parsed
     */
    public static List<Document> loadDocumentsFromFile(String filePath) {
        Path path = Path.of(filePath);
        if (!Files.exists(path)) {
            throw new RuntimeException(
                String.format("File not found: '%s'", filePath));
        }

        try {
            List<String> lines = Files.readAllLines(path);
            List<Document> documents = new ArrayList<>();

            for (String line : lines) {
                line = line.trim();
                if (!line.isEmpty() && !line.startsWith("//")) { // Skip empty lines and comments
                    documents.add(Document.parse(line));
                }
            }
            return documents;
        } catch (IOException e) {
            throw new RuntimeException(String.format(
                "Failed to read file: '%s'", filePath), e);
        }
    }

    /**
     * Collects Publisher results and validates against expected file.
     * Uses unordered comparison by default with 30-second timeout.
     *
     * @param expectedFilePath Path to expected results file
     * @param actualPublisher Publisher of actual results
     * @throws AssertionError if validation fails
     */
    public static void validatePublisherResultsFromFile(String expectedFilePath, Publisher<Document> actualPublisher) {
        ExpectReactive.that(actualPublisher)
            .shouldMatch(expectedFilePath);
    }

    /**
     * Convenience method for ordered Publisher result validation.
     *
     * @param expectedFilePath Path to expected results file
     * @param actualPublisher Publisher of actual results
     * @throws AssertionError if validation fails
     */
    public static void validateOrderedPublisherResultsFromFile(String expectedFilePath, Publisher<Document> actualPublisher) {
        ExpectReactive.that(actualPublisher)
            .shouldMatch(expectedFilePath);
    }

    /**
     * Convenience method with custom timeout for Publisher validation.
     *
     * @param expectedFilePath Path to expected results file
     * @param actualPublisher Publisher of actual results
     * @param timeout Timeout for collecting Publisher results
     * @throws AssertionError if validation fails
     */
    public static void validatePublisherResultsFromFile(String expectedFilePath, Publisher<Document> actualPublisher, Duration timeout) {
        ExpectReactive.that(actualPublisher, timeout)
            .shouldMatch(expectedFilePath);
    }

    /**
     * Convenience method with ignored fields for Publisher validation.
     *
     * @param expectedFilePath Path to expected results file
     * @param actualPublisher Publisher of actual results
     * @param ignoredFields Fields to ignore during comparison (e.g., "_id")
     * @throws AssertionError if validation fails
     */
    public static void validatePublisherResultsFromFile(String expectedFilePath, Publisher<Document> actualPublisher, String... ignoredFields) {
        ExpectReactive.that(actualPublisher)
            .withIgnoredFields(ignoredFields)
            .shouldMatch(expectedFilePath);
    }

    /**
     * Enhanced validation that prints debug information on failure.
     *
     * @param expectedFilePath Path to expected results file
     * @param actualPublisher Publisher of actual results
     * @throws AssertionError if validation fails (with debug output)
     */
    public static void validatePublisherResultsFromFileWithDebug(String expectedFilePath, Publisher<Document> actualPublisher) {
        ExpectReactive.that(actualPublisher)
            .shouldMatchWithDebug(expectedFilePath);
    }

    /**
     * Manual collection of Publisher results with custom timeout.
     * Useful when you need more control over the collection process.
     *
     * @param publisher Publisher to collect
     * @param timeout Timeout for collection
     * @return List of collected results
     */
    public static List<Document> collectPublisherResults(Publisher<Document> publisher, Duration timeout) {
        try {
            CompletableFuture<List<Document>> future = new CompletableFuture<>();
            List<Document> results = new ArrayList<>();

            publisher.subscribe(new Subscriber<Document>() {
                private Subscription subscription;

                @Override
                public void onSubscribe(Subscription s) {
                    this.subscription = s;
                    s.request(Long.MAX_VALUE); // Request all items
                }

                @Override
                public void onNext(Document item) {
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

    /**
     * Manual collection of Publisher results with default 30-second timeout.
     *
     * @param publisher Publisher to collect
     * @return List of collected results
     */
    public static List<Document> collectPublisherResults(Publisher<Document> publisher) {
        return collectPublisherResults(publisher, Duration.ofSeconds(30));
    }

    /**
     * Convenience method for validating manually collected results.
     *
     * @param expectedFilePath Path to expected results file
     * @param actualResults Collected results to validate
     * @throws AssertionError if validation fails
     */
    public static void validateResultsFromFile(String expectedFilePath, List<Document> actualResults) {
        Expect.that(actualResults)
            .shouldMatch(expectedFilePath);
    }

    /**
     * Convenience method for ordered result validation.
     *
     * @param expectedFilePath Path to expected results file
     * @param actualResults Collected results to validate
     * @throws AssertionError if validation fails
     */
    public static void validateOrderedResultsFromFile(String expectedFilePath, List<Document> actualResults) {
        Expect.that(actualResults)
            .withOrderedSort()
            .shouldMatch(expectedFilePath);
    }
}
