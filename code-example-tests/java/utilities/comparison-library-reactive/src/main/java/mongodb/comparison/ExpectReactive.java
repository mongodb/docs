package mongodb.comparison;

import mongodb.comparison.internal.PublisherWrapper;
import java.time.Duration;

/**
 * Reactive extension of the Expect API for MongoDB Reactive Streams driver.
 * Provides the same simplified fluent interface as the core Expect API while
 * handling Publisher collection automatically.
 *
 * Usage examples:
 * <pre>
 * // Publisher comparison with default timeout
 * ExpectReactive.that(publisher).shouldMatch("expected.json");
 *
 * // Publisher comparison with custom timeout and options
 * ExpectReactive.that(publisher, Duration.ofSeconds(60))
 *     .withIgnoredFields("_id")
 *     .shouldMatch(expectedResults);
 *
 * // Already collected results (same as core API)
 * ExpectReactive.that(collectedResults).shouldMatch(expectedResults);
 * </pre>
 */
public class ExpectReactive {

    /**
     * Start building an expectation for Publisher results with default timeout.
     * Automatically collects the Publisher into a List for comparison.
     *
     * @param publisher Publisher from reactive MongoDB operations
     * @return ExpectBuilder for fluent configuration and comparison
     */
    public static ExpectBuilder that(Object publisher) {
        return that(publisher, Duration.ofSeconds(30));
    }

    /**
     * Start building an expectation for Publisher results with custom timeout.
     * Automatically collects the Publisher into a List for comparison.
     *
     * @param publisher Publisher from reactive MongoDB operations
     * @param timeout Maximum time to wait for Publisher collection
     * @return ExpectBuilder for fluent configuration and comparison
     */
    public static ExpectBuilder that(Object publisher, Duration timeout) {
        // Check if this is actually a Publisher that needs collection
        if (isPublisher(publisher)) {
            PublisherWrapper wrapper = new PublisherWrapper(publisher, timeout);
            Object collectedResults = wrapper.collectToList();
            return new ExpectBuilder(collectedResults);
        }

        // If not a Publisher, treat as already collected results
        return new ExpectBuilder(publisher);
    }

    /**
     * Check if an object is a reactive Publisher.
     * Uses reflection to avoid ClassNotFoundException when reactive streams
     * are not on the classpath.
     */
    private static boolean isPublisher(Object obj) {
        if (obj == null) {
            return false;
        }

        try {
            Class<?> publisherClass = Class.forName("org.reactivestreams.Publisher");
            return publisherClass.isInstance(obj);
        } catch (ClassNotFoundException e) {
            // Reactive streams not available, treat as regular object
            return false;
        }
    }
}
