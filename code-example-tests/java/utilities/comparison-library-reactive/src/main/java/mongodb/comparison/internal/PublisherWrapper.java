package mongodb.comparison.internal;

import org.reactivestreams.Publisher;
import org.reactivestreams.Subscriber;
import org.reactivestreams.Subscription;

import java.time.Duration;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.TimeUnit;

/**
 * Internal wrapper for handling Publisher conversion.
 * This class handles the reactive-to-collection conversion internally,
 * so the rest of our comparison logic doesn't need to know about reactive streams.
 */
public class PublisherWrapper {
    private final Publisher<?> publisher;
    private final Duration timeout;

    public PublisherWrapper(Publisher<?> publisher, Duration timeout) {
        this.publisher = publisher;
        this.timeout = timeout;
    }

    /**
     * Constructor that accepts an Object and casts it to Publisher.
     * Used when working with reflection to avoid ClassNotFoundException.
     */
    @SuppressWarnings("unchecked")
    public PublisherWrapper(Object publisherObject, Duration timeout) {
        this.publisher = (Publisher<?>) publisherObject;
        this.timeout = timeout;
    }

    /**
     * Convert the Publisher to a List for comparison.
     * This method will be called internally by the comparison engine.
     * Uses pure reactive-streams API without Project Reactor.
     */
    public List<Object> collectToList() {
        try {
            CompletableFuture<List<Object>> future = new CompletableFuture<>();
            List<Object> results = new ArrayList<>();

            publisher.subscribe(new Subscriber<Object>() {
                private Subscription subscription;

                @Override
                public void onSubscribe(Subscription s) {
                    this.subscription = s;
                    s.request(Long.MAX_VALUE); // Request all items
                }

                @Override
                public void onNext(Object item) {
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
     * Check if reactive streams Publisher is available on the classpath.
     * Note: Project Reactor is no longer required for this library.
     */
    public static boolean isPublisherAvailable() {
        try {
            Class.forName("org.reactivestreams.Publisher");
            return true;
        } catch (ClassNotFoundException e) {
            return false;
        }
    }
}
