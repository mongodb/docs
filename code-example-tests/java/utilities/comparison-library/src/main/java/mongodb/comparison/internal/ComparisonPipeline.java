package mongodb.comparison.internal;

import mongodb.comparison.ComparisonOptions;
import mongodb.comparison.ComparisonError;
import mongodb.comparison.ComparisonResult;

import java.util.List;

/**
 * Core comparison pipeline implementing 7-step comparison process.
 * Provides clean separation of concerns with centralized pipeline orchestration.
 *
 * Pipeline Steps:
 * 1. Early exit for identical references
 * 2. Global ellipsis pattern handling
 * 3. Value normalization
 * 4. Primitive value comparison
 * 5. Array comparison (with ellipsis support)
 * 6. Array vs non-array mismatches
 * 7. Object/document comparison
 */
public class ComparisonPipeline {

    private final Object expected;
    private final Object actual;
    private final ComparisonOptions options;
    private final String path;
    private final int depth;

    private ComparisonPipeline(Object expected, Object actual, ComparisonOptions options, String path, int depth) {
        this.expected = expected;
        this.actual = actual;
        this.options = options;
        this.path = path;
        this.depth = depth;
    }

    public static ComparisonPipeline create(Object expected, Object actual, ComparisonOptions options, String path) {
        return new ComparisonPipeline(expected, actual, options, path, 0);
    }

    /**
     * Create pipeline instance with specific depth for recursive calls.
     */
    public static ComparisonPipeline create(Object expected, Object actual, ComparisonOptions options, String path, int depth) {
        return new ComparisonPipeline(expected, actual, options, path, depth);
    }

    /**
     * Execute the 7-step comparison pipeline.
     */
    public ComparisonResult execute() {
        try {
            // Step 0: Check recursion depth to prevent stack overflow
            if (depth > options.maxRecursionDepth()) {
                return ComparisonResult.failure(List.of(ErrorFactory.createError(
                    path,
                    expected,
                    actual,
                    "Maximum recursion depth exceeded (" + options.maxRecursionDepth() + ")"
                )));
            }

            // Step 1: Early exit for identical references
            if (expected == actual) {
                return ComparisonResult.success();
            }

            // Step 2: Check if expected contains global ellipsis patterns
            if (EllipsisPatternRegistry.matches(expected, actual, path)) {
                return ComparisonResult.success();
            }
            if (expected == null || actual == null) {
                if (expected == null && actual == null) {
                    return ComparisonResult.success();
                }
                return ComparisonResult.failure(List.of(ErrorFactory.createNullMismatch(path, expected, actual)));
            }

            // Step 3: Normalize values using unified ValueNormalizer
            Object normalizedExpected = ValueNormalizer.normalize(expected);
            Object normalizedActual = ValueNormalizer.normalize(actual);

            // Step 4: Handle primitive comparison
            if (PrimitiveComparator.isPrimitive(normalizedExpected) || PrimitiveComparator.isPrimitive(normalizedActual)) {
                return PrimitiveComparator.compare(normalizedExpected, normalizedActual, options, path);
            }

            // Step 5: Handle array comparison
            if (normalizedExpected instanceof List<?> expectedList && normalizedActual instanceof List<?> actualList) {
                return ArrayComparator.compare(expectedList, actualList, options, path, depth);
            }

            // Step 6: Handle array vs non-array mismatches
            if (normalizedExpected instanceof List<?> || normalizedActual instanceof List<?>) {
                return ComparisonResult.failure(List.of(
                    ErrorFactory.createTypeMismatch(path, normalizedExpected, normalizedActual)
                ));
            }

            // Step 7: Handle objects/documents
            List<ComparisonError> errors = ObjectComparator.compareObjectsWithLimits(
                normalizedExpected, normalizedActual, options, path, depth);
            if (errors.isEmpty()) {
                return ComparisonResult.success();
            } else {
                return ComparisonResult.failure(errors);
            }

        } catch (Exception e) {
            return ComparisonResult.failure(List.of(new ComparisonError(
                path,
                safeToString(expected),
                safeToString(actual),
                "Comparison failed with exception: " + e.getMessage()
            )));
        }
    }

    private static String safeToString(Object obj) {
        if (obj == null) return "null";
        try {
            return obj.toString();
        } catch (Exception e) {
            return obj.getClass().getSimpleName() + "@" + System.identityHashCode(obj);
        }
    }
}
