package mongodb.comparison;

import mongodb.comparison.internal.PublisherWrapper;
import java.time.Duration;

/**
 * Reactive API for validating MongoDB Java Driver output against expected results.
 * This class is separated from the core OutputValidator to avoid reactive dependencies in sync-only projects.
 */
public class OutputValidatorReactive extends OutputValidator {
    public OutputValidatorReactive(Object actualResults) {
        super(actualResults);
    }

    /**
     * Special factory method for Publisher results from Reactive Streams Driver.
     * Automatically collects the Publisher into a List for comparison.
     *
     * @param publisher Publisher from reactive operations (Object to avoid classpath issues)
     * @param timeout Maximum time to wait for collection
     * @return OutputValidator ready for comparison
     */
    public static OutputValidator expectFromPublisher(Object publisher, Duration timeout) {
        // Collect the Publisher immediately and pass the results to the validator
        PublisherWrapper wrapper = new PublisherWrapper(publisher, timeout);
        Object collectedResults = wrapper.collectToList();
        return new OutputValidatorReactive(collectedResults);
    }

    /**
     * Convenience method for Publisher with default 30-second timeout.
     *
     * @param publisher Publisher from reactive operations (Object to avoid classpath issues)
     * @return OutputValidator ready for comparison
     */
    public static OutputValidator expectFromPublisher(Object publisher) {
        return expectFromPublisher(publisher, Duration.ofSeconds(30));
    }
}
