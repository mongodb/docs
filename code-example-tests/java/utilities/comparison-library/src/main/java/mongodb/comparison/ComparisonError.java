package mongodb.comparison;

/**
 * Represents a single comparison error with detailed information.
 * Uses Java 21 record for immutable data structure.
 */
public record ComparisonError(
    String path,
    String expected,
    String actual,
    String message
) {
    public String getDetailedMessage() {
        return "Comparison failed at path '%s':\n  Expected: %s\n  Actual: %s\n  Reason: %s"
            .formatted(path, expected, actual, message);
    }
}
