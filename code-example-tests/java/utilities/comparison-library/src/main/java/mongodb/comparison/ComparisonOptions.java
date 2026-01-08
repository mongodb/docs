package mongodb.comparison;

import java.time.Duration;
import java.util.List;

/**
 * Configuration options for comparison operations.
 * Minimal API for technical writers with sensible defaults for performance settings.
 */
public record ComparisonOptions(
    ComparisonType comparisonType,
    List<String> ignoreFieldValues,
    boolean inheritedGlobalEllipsis  // Internal flag for recursive ellipsis inheritance
) {

    // Internal performance limits - not configurable by end users
    // These provide sensible defaults based on spec section 6.6
    public static final int DEFAULT_MAX_ARRAY_SIZE_FOR_BACKTRACKING = 50;
    public static final int DEFAULT_MAX_RECURSION_DEPTH = 100;
    public static final int DEFAULT_TIMEOUT_SECONDS = 30;

    // Internal methods to access the fixed performance settings
    public int timeoutSeconds() {
        return DEFAULT_TIMEOUT_SECONDS;
    }

    public Duration reactiveTimeout() {
        return Duration.ofSeconds(DEFAULT_TIMEOUT_SECONDS);
    }

    public int maxArraySizeForBacktracking() {
        return DEFAULT_MAX_ARRAY_SIZE_FOR_BACKTRACKING;
    }

    public int maxRecursionDepth() {
        return DEFAULT_MAX_RECURSION_DEPTH;
    }

    public static Builder builder() {
        return new Builder();
    }

    public static ComparisonOptions defaultOptions() {
        return builder().build();
    }

    // Helper methods for the strategy system
    public boolean isUnorderedComparison() {
        return comparisonType == ComparisonType.UNORDERED;
    }

    /**
     * Create a new ComparisonOptions with inheritedGlobalEllipsis set to true.
     * This is used internally when recursing into nested objects that should inherit
     * the global ellipsis setting from their parent.
     */
    public ComparisonOptions withInheritedGlobalEllipsis(boolean inherited) {
        return new ComparisonOptions(comparisonType, ignoreFieldValues, inherited);
    }

    public static class Builder {
        private ComparisonType comparisonType = ComparisonType.UNORDERED;
        private List<String> ignoreFieldValues = List.of();
        private boolean inheritedGlobalEllipsis = false;

        public Builder withComparisonType(ComparisonType type) {
            this.comparisonType = type;
            return this;
        }

        public Builder withOrderedArrays() {
            this.comparisonType = ComparisonType.ORDERED;
            return this;
        }

        public Builder withUnorderedArrays() {
            this.comparisonType = ComparisonType.UNORDERED;
            return this;
        }

        public Builder withUnorderedComparison() {
            this.comparisonType = ComparisonType.UNORDERED;
            return this;
        }

        public Builder withIgnoredFields(String... fields) {
            this.ignoreFieldValues = List.of(fields);
            return this;
        }

        // Internal method - not exposed to end users
        Builder withInheritedGlobalEllipsis(boolean inherited) {
            this.inheritedGlobalEllipsis = inherited;
            return this;
        }

        public ComparisonOptions build() {
            return new ComparisonOptions(
                comparisonType,
                ignoreFieldValues,
                inheritedGlobalEllipsis
            );
        }
    }
}
