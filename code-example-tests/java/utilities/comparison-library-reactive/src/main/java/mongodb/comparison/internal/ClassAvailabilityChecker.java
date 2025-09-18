package mongodb.comparison.internal;

/**
 * Utility class to check if classes are available on the classpath.
 * Used to provide graceful degradation when optional dependencies are missing.
 */
public class ClassAvailabilityChecker {
    private static final boolean PUBLISHER_AVAILABLE = isClassAvailable("org.reactivestreams.Publisher");

    /**
     * Check if reactive streams Publisher is available.
     */
    public static boolean isPublisherAvailable() {
        return PUBLISHER_AVAILABLE;
    }

    /**
     * Check if a class is available on the classpath.
     */
    private static boolean isClassAvailable(String className) {
        try {
            Class.forName(className);
            return true;
        } catch (ClassNotFoundException e) {
            return false;
        }
    }
}
