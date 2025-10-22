package mongodb.comparison;

import mongodb.comparison.internal.PublisherWrapper;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.reactivestreams.Publisher;
import org.reactivestreams.Subscriber;
import org.reactivestreams.Subscription;

import java.time.Duration;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Tests for Publisher collection functionality without Project Reactor.
 * Verifies that the pure reactive-streams implementation works correctly.
 */
class PublisherCollectionTest {

    @Test
    @DisplayName("Should collect simple Publisher results")
    void testSimplePublisherCollection() {
        List<String> sourceData = Arrays.asList("item1", "item2", "item3");
        Publisher<String> publisher = createSimplePublisher(sourceData);

        PublisherWrapper wrapper = new PublisherWrapper(publisher, Duration.ofSeconds(5));
        List<Object> results = wrapper.collectToList();

        assertEquals(3, results.size());
        assertEquals("item1", results.get(0));
        assertEquals("item2", results.get(1));
        assertEquals("item3", results.get(2));
    }

    @Test
    @DisplayName("Should handle empty Publisher")
    void testEmptyPublisher() {
        Publisher<String> emptyPublisher = createSimplePublisher(Arrays.asList());

        PublisherWrapper wrapper = new PublisherWrapper(emptyPublisher, Duration.ofSeconds(5));
        List<Object> results = wrapper.collectToList();

        assertTrue(results.isEmpty());
    }

    @Test
    @DisplayName("Should handle Publisher with single item")
    void testSingleItemPublisher() {
        Publisher<String> singleItemPublisher = createSimplePublisher(Arrays.asList("single"));

        PublisherWrapper wrapper = new PublisherWrapper(singleItemPublisher, Duration.ofSeconds(5));
        List<Object> results = wrapper.collectToList();

        assertEquals(1, results.size());
        assertEquals("single", results.get(0));
    }

    @Test
    @DisplayName("Should handle Publisher errors")
    void testPublisherError() {
        Publisher<String> errorPublisher = createErrorPublisher("Test error");

        PublisherWrapper wrapper = new PublisherWrapper(errorPublisher, Duration.ofSeconds(5));

        RuntimeException exception = assertThrows(RuntimeException.class, wrapper::collectToList);
        assertTrue(exception.getMessage().contains("Failed to collect Publisher results"));
        assertTrue(exception.getCause().getMessage().contains("Test error"));
    }

    @Test
    @DisplayName("Should work with ExpectReactive")
    void testIntegrationWithExpectReactive() {
        List<String> sourceData = Arrays.asList("test1", "test2");
        Publisher<String> publisher = createSimplePublisher(sourceData);

        // This should work without Project Reactor using the new ExpectReactive API
        ExpectReactive.that(publisher).shouldMatch(Arrays.asList("test1", "test2"));
    }

    @Test
    @DisplayName("Should check Publisher availability correctly")
    void testPublisherAvailabilityCheck() {
        // Since we have reactive-streams on the classpath, this should return true
        assertTrue(PublisherWrapper.isPublisherAvailable());
    }

    // Helper method to create a simple Publisher without Project Reactor
    private Publisher<String> createSimplePublisher(List<String> items) {
        return new Publisher<String>() {
            @Override
            public void subscribe(Subscriber<? super String> subscriber) {
                subscriber.onSubscribe(new Subscription() {
                    private final AtomicInteger index = new AtomicInteger(0);
                    private volatile boolean cancelled = false;

                    @Override
                    public void request(long n) {
                        if (cancelled) return;

                        try {
                            while (index.get() < items.size() && n > 0) {
                                if (cancelled) return;
                                subscriber.onNext(items.get(index.getAndIncrement()));
                                n--;
                            }

                            if (index.get() >= items.size() && !cancelled) {
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

    // Helper method to create an error Publisher
    private Publisher<String> createErrorPublisher(String errorMessage) {
        return new Publisher<String>() {
            @Override
            public void subscribe(Subscriber<? super String> subscriber) {
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
