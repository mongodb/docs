package mongodb.comparison.internal;

import mongodb.comparison.ComparisonOptions;
import mongodb.comparison.ComparisonError;
import mongodb.comparison.ComparisonResult;
import mongodb.comparison.ComparisonType;
import mongodb.comparison.ContentAnalyzer;

import java.util.ArrayList;
import java.util.List;

/**
 * Intelligent array comparison with automatic strategy selection.
 * Uses ContentAnalyzer to determine the best comparison approach based on content.
 *
 * Handles:
 * - Ordered vs unordered comparison strategies
 * - Automatic strategy selection (set-based, hybrid, backtracking)
 * - Ellipsis pattern support via EllipsisPatternRegistry
 * - Recursive element comparison via ComparisonPipeline
 * - Performance limits for complex comparisons
 * - Element-level path tracking
 */
public class ArrayComparator {

    /**
     * Compare two arrays using intelligent strategy selection.
     */
    public static ComparisonResult compare(List<?> expected, List<?> actual,
                                         ComparisonOptions options, String path, int depth) {

                // For ORDERED comparison, check for ellipsis patterns first
        if (options.comparisonType() == ComparisonType.ORDERED) {
            // If expected contains ellipsis patterns, use ellipsis comparison
            if (containsArrayEllipsis(expected)) {
                return compareWithEllipsis(expected, actual, options, path, depth);
            }
            return compareOrdered(expected, actual, options, path, depth);
        }

        // For UNORDERED comparison, intelligently select the best strategy
        if (options.comparisonType() == ComparisonType.UNORDERED) {
            // If expected contains ellipsis patterns, use ellipsis comparison regardless of other strategies
            if (containsArrayEllipsis(expected)) {
                return compareWithEllipsis(expected, actual, options, path, depth);
            }

            // Use ContentAnalyzer to determine the best strategy
            ContentAnalyzer.ArrayComparisonStrategy strategy =
                ContentAnalyzer.determineArrayStrategy(expected, actual);

            return switch (strategy) {
                case SET_BASED -> compareSetBased(expected, actual, options, path, depth);
                case HYBRID -> compareHybrid(expected, actual, options, path, depth);
                case BACKTRACKING -> compareBacktracking(expected, actual, options, path, depth);
            };
        }

        // Default to ordered comparison
        return compareOrdered(expected, actual, options, path, depth);
    }

    /**
     * Compare arrays with ellipsis pattern support.
     * Enhanced array matching with gaps and ordered sequence support.
     * Handles patterns like [1, "...", 4] and [1, "...", 5, "...", 9]
     */
    public static ComparisonResult compareWithEllipsis(List<?> expected, List<?> actual,
                                                       ComparisonOptions options, String path, int depth) {

        if (expected == null || actual == null) {
            return expected == actual ? ComparisonResult.success() :
                   ComparisonResult.failure(List.of(ErrorFactory.createNullMismatch(path, expected, actual)));
        }

        // Special case: if expected is just ["..."], matches any array
        if (expected.size() == 1 && "...".equals(expected.get(0))) {
            return ComparisonResult.success();
        }

        // Find all ellipsis positions in expected
        List<Integer> ellipsisPositions = new ArrayList<>();
        for (int i = 0; i < expected.size(); i++) {
            if ("...".equals(expected.get(i))) {
                ellipsisPositions.add(i);
            }
        }

        // If no ellipsis found, fall back to intelligent strategy selection
        if (ellipsisPositions.isEmpty()) {
            return compare(expected, actual, options, path, depth);
        }

        // Split expected into segments between ellipsis markers
        List<List<Object>> segments = new ArrayList<>();
        int start = 0;

        for (int ellipsisPos : ellipsisPositions) {
            if (ellipsisPos > start) {
                segments.add(new ArrayList<>(expected.subList(start, ellipsisPos)));
            } else {
                segments.add(new ArrayList<>()); // Empty segment
            }
            start = ellipsisPos + 1;
        }

        // Add final segment after last ellipsis
        if (start < expected.size()) {
            segments.add(new ArrayList<>(expected.subList(start, expected.size())));
        } else {
            segments.add(new ArrayList<>()); // Empty final segment
        }

        // Match segments based on comparison type
        if (options.isUnorderedComparison()) {
            return matchSegmentsUnordered(segments, new ArrayList<>(actual), options, path, depth);
        } else {
            return matchSegmentsInOrder(segments, new ArrayList<>(actual), options, path, depth);
        }
    }

    /**
     * Compare arrays in order (position matters).
     */
    private static ComparisonResult compareOrdered(List<?> expected, List<?> actual,
                                                  ComparisonOptions options, String path, int depth) {

        // Size check first
        if (expected.size() != actual.size()) {
            return ComparisonResult.failure(List.of(
                ErrorFactory.createOrderedArraySizeMismatch(path, expected.size(), actual.size())
            ));
        }

        // Compare elements at each position
        List<ComparisonError> errors = new ArrayList<>();
        for (int i = 0; i < expected.size(); i++) {
            String elementPath = path + "[" + i + "]";
            Object expectedElement = expected.get(i);
            Object actualElement = actual.get(i);

            // Recursive comparison via ComparisonPipeline with depth tracking
            ComparisonResult elementResult = ComparisonPipeline.create(
                expectedElement, actualElement, options, elementPath, depth + 1).execute();

            if (!elementResult.isMatch()) {
                // Add context that this is an ordered comparison
                for (ComparisonError error : elementResult.errors()) {
                    ComparisonError enhancedError = new ComparisonError(
                        error.path(),
                        error.expected(),
                        error.actual(),
                        error.message() + " (ordered array comparison at index " + i + ")"
                    );
                    errors.add(enhancedError);
                }
            }
        }

        return errors.isEmpty()
            ? ComparisonResult.success()
            : ComparisonResult.failure(errors);
    }

    /**
     * Safe string conversion for error messages.
     */
    private static String safeToString(Object obj) {
        if (obj == null) return "null";
        try {
            return obj.toString();
        } catch (Exception e) {
            return obj.getClass().getSimpleName() + "@" + System.identityHashCode(obj);
        }
    }

    /**
     * Match segments against actual array, allowing gaps between segments.
     * This implements the complex array gap matching from the original EllipsisHandler.
     */
    private static ComparisonResult matchSegmentsInOrder(List<List<Object>> segments,
                                                        List<?> actual,
                                                        ComparisonOptions options,
                                                        String path,
                                                        int depth) {
        if (segments.isEmpty()) {
            return ComparisonResult.success();
        }

        int actualIndex = 0;
        List<ComparisonError> errors = new ArrayList<>();

        for (int segmentIndex = 0; segmentIndex < segments.size(); segmentIndex++) {
            List<Object> segment = segments.get(segmentIndex);

            // Empty segments are allowed (represent pure ellipsis gaps)
            if (segment.isEmpty()) {
                continue;
            }

            // Find where this segment matches in the remaining actual array
            boolean segmentFound = false;

            for (int searchStart = actualIndex; searchStart <= actual.size() - segment.size(); searchStart++) {
                boolean segmentMatches = true;
                List<ComparisonError> segmentErrors = new ArrayList<>();

                for (int i = 0; i < segment.size(); i++) {
                    String elementPath = path + "[" + (searchStart + i) + "]";
                    Object expectedElement = segment.get(i);
                    Object actualElement = actual.get(searchStart + i);

                    // Use ellipsis-aware comparison via ComparisonPipeline
                    ComparisonResult elementResult = ComparisonPipeline.create(
                        expectedElement, actualElement, options, elementPath, depth + 1).execute();

                    if (!elementResult.isMatch()) {
                        segmentMatches = false;
                        segmentErrors.addAll(elementResult.errors());
                        break;
                    }
                }

                if (segmentMatches) {
                    actualIndex = searchStart + segment.size();
                    segmentFound = true;
                    break;
                }
            }

            if (!segmentFound) {
                errors.add(new ComparisonError(
                    path + ".segment[" + segmentIndex + "]",
                    safeToString(segment),
                    "not found in actual array",
                    "Array segment not found in expected position or order"
                ));
                return ComparisonResult.failure(errors);
            }
        }

        return ComparisonResult.success();
    }

    /**
     * Match segments in unordered mode. Elements within each segment can be in any order,
     * but the segments themselves must still appear in the specified relative order.
     * This is essentially a relaxed version of ordered matching where segments allow
     * internal reordering and elements can be skipped between segments.
     */
    private static ComparisonResult matchSegmentsUnordered(List<List<Object>> segments,
                                                          List<Object> actualMutable,
                                                          ComparisonOptions options,
                                                          String path, int depth) {
        List<ComparisonError> errors = new ArrayList<>();
        int currentActualIndex = 0;

        // Process each segment in order (but allow unordered matching within segments)
        for (int segmentIndex = 0; segmentIndex < segments.size(); segmentIndex++) {
            List<Object> segment = segments.get(segmentIndex);

            // Skip empty segments
            if (segment.isEmpty()) {
                continue;
            }

            // For unordered arrays, try to match the segment elements starting from current position
            // but allow them to be in any order within the segment
            List<Integer> matchedIndices = new ArrayList<>();

            for (Object expectedElement : segment) {
                boolean elementFound = false;

                // Look for this element from current position onwards
                for (int j = currentActualIndex; j < actualMutable.size(); j++) {
                    if (matchedIndices.contains(j)) {
                        continue; // This element already matched another in this segment
                    }

                    Object actualElement = actualMutable.get(j);
                    String elementPath = path + "[segment" + segmentIndex + "][" + expectedElement + "]";

                    ComparisonResult elementResult = ComparisonPipeline.create(
                        expectedElement, actualElement, options, elementPath, depth + 1
                    ).execute();

                    if (elementResult.isMatch()) {
                        matchedIndices.add(j);
                        elementFound = true;
                        break;
                    }
                }

                if (!elementFound) {
                    errors.add(ErrorFactory.createError(
                        path + "[segment" + segmentIndex + "]",
                        expectedElement,
                        "not found in actual array from position " + currentActualIndex,
                        "Array segment element not found in unordered comparison"
                    ));
                }
            }

            // Update current position to after the last matched element in this segment
            if (!matchedIndices.isEmpty()) {
                currentActualIndex = matchedIndices.stream().max(Integer::compareTo).orElse(currentActualIndex) + 1;
            }
        }

        if (!errors.isEmpty()) {
            return ComparisonResult.failure(errors);
        }

        return ComparisonResult.success();
    }

    /**
     * Check if the expected array contains ellipsis elements ("...").
     */
    private static boolean containsArrayEllipsis(List<?> expected) {
        if (expected == null) {
            return false;
        }

        return expected.stream()
            .anyMatch(item -> "...".equals(item));
    }

    /**
     * Compare arrays using set-based frequency counting strategy.
     * Optimized for large arrays of primitive values.
     */
    private static ComparisonResult compareSetBased(List<?> expected, List<?> actual,
                                                   ComparisonOptions options, String path, int depth) {
        if (expected.size() != actual.size()) {
            // Check if either array contains circular references for better error messages
            String expectedStr = ComparisonResult.safeValueToString(expected);
            String actualStr = ComparisonResult.safeValueToString(actual);

            String message = "Array lengths differ";
            if (expectedStr.contains("CIRCULAR_REFERENCE") || actualStr.contains("CIRCULAR_REFERENCE")) {
                message = "Array lengths differ - circular reference detected in data structure";
            }

            return ComparisonResult.failure(List.of(new ComparisonError(
                path,
                expectedStr,
                actualStr,
                message
            )));
        }

        // Create frequency maps for both arrays
        var expectedFreq = new java.util.HashMap<String, Integer>();
        var actualFreq = new java.util.HashMap<String, Integer>();

        for (Object item : expected) {
            String key = safeToString(item);
            expectedFreq.merge(key, 1, Integer::sum);
        }

        for (Object item : actual) {
            String key = safeToString(item);
            actualFreq.merge(key, 1, Integer::sum);
        }

        // Compare frequency maps
        if (!expectedFreq.equals(actualFreq)) {
            var errors = new ArrayList<ComparisonError>();
            for (var entry : expectedFreq.entrySet()) {
                String key = entry.getKey();
                int expectedCount = entry.getValue();
                int actualCount = actualFreq.getOrDefault(key, 0);

                if (expectedCount != actualCount) {
                    errors.add(new ComparisonError(
                        path + "[frequency:" + key + "]",
                        "count=" + expectedCount,
                        "count=" + actualCount,
                        "Element frequency mismatch"
                    ));
                }
            }

            for (var entry : actualFreq.entrySet()) {
                String key = entry.getKey();
                if (!expectedFreq.containsKey(key)) {
                    errors.add(new ComparisonError(
                        path + "[unexpected:" + key + "]",
                        "not present",
                        "count=" + entry.getValue(),
                        "Unexpected element in actual array"
                    ));
                }
            }

            return ComparisonResult.failure(errors);
        }

        return ComparisonResult.success();
    }

    /**
     * Compare arrays using hybrid strategy for mixed primitive/object arrays.
     * Uses frequency counting for primitives, backtracking for complex objects.
     */
    private static ComparisonResult compareHybrid(List<?> expected, List<?> actual,
                                                 ComparisonOptions options, String path, int depth) {
        if (expected.size() != actual.size()) {
            // Check if either array contains circular references for better error messages
            String expectedStr = ComparisonResult.safeValueToString(expected);
            String actualStr = ComparisonResult.safeValueToString(actual);

            String message = "Array lengths differ";
            if (expectedStr.contains("CIRCULAR_REFERENCE") || actualStr.contains("CIRCULAR_REFERENCE")) {
                message = "Array lengths differ - circular reference detected in data structure";
            }

            return ComparisonResult.failure(List.of(new ComparisonError(
                path,
                expectedStr,
                actualStr,
                message
            )));
        }

        // Separate primitives from complex objects
        var expectedPrimitives = new ArrayList<Object>();
        var expectedObjects = new ArrayList<Object>();
        var actualPrimitives = new ArrayList<Object>();
        var actualObjects = new ArrayList<Object>();

        for (Object item : expected) {
            if (isPrimitive(item)) {
                expectedPrimitives.add(item);
            } else {
                expectedObjects.add(item);
            }
        }

        for (Object item : actual) {
            if (isPrimitive(item)) {
                actualPrimitives.add(item);
            } else {
                actualObjects.add(item);
            }
        }

        var errors = new ArrayList<ComparisonError>();

        // Check if original arrays contain circular references for enhanced error reporting
        String expectedStr = ComparisonResult.safeValueToString(expected);
        String actualStr = ComparisonResult.safeValueToString(actual);
        boolean hasCircularReference = expectedStr.contains("CIRCULAR_REFERENCE") || actualStr.contains("CIRCULAR_REFERENCE");

        // Use set-based comparison for primitives
        var primitivesResult = compareSetBased(expectedPrimitives, actualPrimitives, options, path + ".primitives", depth);
        if (!primitivesResult.isMatch()) {
            for (ComparisonError error : primitivesResult.errors()) {
                if (hasCircularReference && error.message().equals("Array lengths differ")) {
                    // Enhance the error message to mention circular reference detection
                    errors.add(new ComparisonError(
                        error.path(),
                        error.expected(),
                        error.actual(),
                        "Array lengths differ - circular reference detected in original data structure"
                    ));
                } else {
                    errors.add(error);
                }
            }
        }

        // Use backtracking for complex objects
        var objectsResult = compareBacktracking(expectedObjects, actualObjects, options, path + ".objects", depth);
        if (!objectsResult.isMatch()) {
            for (ComparisonError error : objectsResult.errors()) {
                if (hasCircularReference && error.message().equals("Array lengths differ")) {
                    // Enhance the error message to mention circular reference detection
                    errors.add(new ComparisonError(
                        error.path(),
                        error.expected(),
                        error.actual(),
                        "Array lengths differ - circular reference detected in original data structure"
                    ));
                } else {
                    errors.add(error);
                }
            }
        }

        return errors.isEmpty() ? ComparisonResult.success() : ComparisonResult.failure(errors);
    }

    /**
     * Compare arrays using backtracking algorithm for optimal element matching.
     * Best for complex object arrays requiring sophisticated matching.
     * Enhanced with ellipsis pattern support.
     */
    private static ComparisonResult compareBacktracking(List<?> expected, List<?> actual,
                                                       ComparisonOptions options, String path, int depth) {

        // Handle ellipsis patterns in backtracking mode
        if (containsArrayEllipsis(expected)) {
            return compareBacktrackingWithEllipsis(expected, actual, options, path, depth);
        }

        if (expected.size() != actual.size()) {
            return ComparisonResult.failure(List.of(new ComparisonError(
                path,
                ComparisonResult.safeValueToString(expected),
                ComparisonResult.safeValueToString(actual),
                "Array lengths differ"
            )));
        }

        // Check performance limits
        if (expected.size() > options.maxArraySizeForBacktracking()) {
            var errors = new ArrayList<ComparisonError>();
            errors.add(new ComparisonError(
                path + ".size",
                "≤" + options.maxArraySizeForBacktracking(),
                String.valueOf(expected.size()),
                "Array too large for backtracking comparison (size limit: " + options.maxArraySizeForBacktracking() + "). " +
                "Consider using SET_BASED strategy or increasing maxArraySizeForBacktracking limit."
            ));
            return ComparisonResult.failure(errors);
        }

        // Start timeout tracking
        long startTime = System.currentTimeMillis();
        long timeoutMs = options.timeoutSeconds() * 1000L;

        // Use backtracking to find optimal assignment
        var assignment = findOptimalAssignment(expected, actual, options, path, depth, startTime, timeoutMs);

        // Check for timeout
        if (System.currentTimeMillis() - startTime > timeoutMs) {
            var errors = new ArrayList<ComparisonError>();
            errors.add(new ComparisonError(
                path + ".timeout",
                "completion within " + options.timeoutSeconds() + "s",
                "timeout after " + options.timeoutSeconds() + "s",
                "Backtracking comparison timed out. Consider using a simpler strategy like SET_BASED or " +
                "increasing the timeout limit. Complex object matching can be computationally expensive."
            ));
            return ComparisonResult.failure(errors);
        }

        if (assignment == null) {
            // Provide more detailed error information by checking why no assignment was found
            var detailedErrors = new ArrayList<ComparisonError>();

            // Try to find specific reasons why elements couldn't match
            for (int i = 0; i < expected.size(); i++) {
                Object expectedElement = expected.get(i);
                boolean foundMatch = false;

                for (int j = 0; j < actual.size(); j++) {
                    Object actualElement = actual.get(j);

                    // Quick comparison to see if they could potentially match
                    ComparisonResult elementResult = ComparisonPipeline.create(
                        expectedElement, actualElement, options, path + "[" + i + "]", depth + 1).execute();

                    if (elementResult.isMatch()) {
                        foundMatch = true;
                        break;
                    }
                }

                if (!foundMatch) {
                    detailedErrors.add(new ComparisonError(
                        path + "[" + i + "]",
                        safeToString(expectedElement),
                        "no matching element found in actual array",
                        "no matching element found for this expected element in unordered array comparison"
                    ));
                }
            }

            // If we found specific element errors, use those; otherwise fall back to general error
            if (!detailedErrors.isEmpty()) {
                return ComparisonResult.failure(detailedErrors);
            } else {
                return ComparisonResult.failure(List.of(new ComparisonError(
                    path,
                    "backtracking assignment",
                    "no valid assignment found",
                    "No matching assignment found for complex objects using backtracking strategy. " +
                    "The backtracking algorithm could not find a way to match all expected elements " +
                    "with actual elements in the unordered array comparison."
                )));
            }
        }

        // Validate the assignment by comparing each pair
        var errors = new ArrayList<ComparisonError>();
        for (int i = 0; i < expected.size(); i++) {
            int actualIndex = assignment[i];
            var elementResult = ComparisonPipeline.create(
                expected.get(i),
                actual.get(actualIndex),
                options,
                path + "[" + i + "]",
                depth + 1
            ).execute();

            if (!elementResult.isMatch()) {
                // Add strategy context to element errors
                for (var error : elementResult.errors()) {
                    errors.add(new ComparisonError(
                        error.path(),
                        error.expected(),
                        error.actual(),
                        error.message() + " (using backtracking strategy for unordered array comparison)"
                    ));
                }
            }
        }

        // If we have element-level errors, add a summary error explaining the strategy
        if (!errors.isEmpty()) {
            errors.add(0, new ComparisonError(
                path + ".strategy",
                "successful element match",
                "element match failures",
                "Backtracking strategy found assignments but individual element comparisons failed. " +
                "This unordered array comparison strategy attempts to find the optimal matching " +
                "between expected and actual array elements."
            ));
        }

        return errors.isEmpty() ? ComparisonResult.success() : ComparisonResult.failure(errors);
    }

    /**
     * Find optimal assignment of expected elements to actual elements using backtracking.
     * Returns array where assignment[i] = j means expected[i] matches actual[j].
     */
    private static int[] findOptimalAssignment(List<?> expected, List<?> actual,
                                             ComparisonOptions options, String path, int depth,
                                             long startTime, long timeoutMs) {
        int n = expected.size();
        if (n != actual.size()) {
            return null;
        }

        // Create compatibility matrix
        boolean[][] compatible = new boolean[n][n];
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                // Check timeout during compatibility matrix creation
                if (System.currentTimeMillis() - startTime > timeoutMs) {
                    return null; // Timeout
                }

                var result = ComparisonPipeline.create(
                    expected.get(i),
                    actual.get(j),
                    options,
                    path + "[" + i + "→" + j + "]",
                    depth + 1
                ).execute();
                compatible[i][j] = result.isMatch();
            }
        }

        // Use backtracking to find valid assignment
        int[] assignment = new int[n];
        boolean[] used = new boolean[n];

        if (backtrack(0, assignment, used, compatible, startTime, timeoutMs)) {
            return assignment;
        }

        return null;
    }

    /**
     * Recursive backtracking to find valid assignment with timeout support.
     */
    private static boolean backtrack(int expectedIndex, int[] assignment, boolean[] used,
                                   boolean[][] compatible, long startTime, long timeoutMs) {
        // Check timeout
        if (System.currentTimeMillis() - startTime > timeoutMs) {
            return false; // Timeout
        }

        if (expectedIndex == assignment.length) {
            return true; // All elements assigned
        }

        for (int actualIndex = 0; actualIndex < used.length; actualIndex++) {
            if (!used[actualIndex] && compatible[expectedIndex][actualIndex]) {
                assignment[expectedIndex] = actualIndex;
                used[actualIndex] = true;

                if (backtrack(expectedIndex + 1, assignment, used, compatible, startTime, timeoutMs)) {
                    return true;
                }

                // Backtrack
                used[actualIndex] = false;
            }
        }

        return false;
    }

    /**
     * Check if a value is a primitive type.
     */
    private static boolean isPrimitive(Object value) {
        if (value == null) {
            return true;
        }

        return value instanceof String ||
               value instanceof Number ||
               value instanceof Boolean ||
               value instanceof Character;
    }

    /**
     * Compare arrays using backtracking algorithm with ellipsis pattern support.
     * Handles cases where expected array contains ellipsis patterns like:
     * [Map.of("id", 1, "data", "..."), Map.of("id", 2, "status", "active"), "..."]
     */
    private static ComparisonResult compareBacktrackingWithEllipsis(List<?> expected, List<?> actual,
                                                                   ComparisonOptions options, String path, int depth) {
        // Find ellipsis positions
        List<Integer> ellipsisPositions = new ArrayList<>();
        List<Object> nonEllipsisExpected = new ArrayList<>();

        for (int i = 0; i < expected.size(); i++) {
            if ("...".equals(expected.get(i))) {
                ellipsisPositions.add(i);
            } else {
                nonEllipsisExpected.add(expected.get(i));
            }
        }

        // Special case: if expected is just ["..."], matches any array
        if (expected.size() == 1 && ellipsisPositions.size() == 1) {
            return ComparisonResult.success();
        }

        // If actual array is smaller than non-ellipsis elements, it can't match
        if (actual.size() < nonEllipsisExpected.size()) {
            return ComparisonResult.failure(List.of(new ComparisonError(
                path + ".ellipsis",
                "at least " + nonEllipsisExpected.size() + " elements",
                actual.size() + " elements",
                "Actual array too small to contain all required elements with ellipsis pattern"
            )));
        }

        // Use backtracking to find assignment for non-ellipsis elements
        // Start timeout tracking
        long startTime = System.currentTimeMillis();
        long timeoutMs = options.timeoutSeconds() * 1000L;

        var assignment = findOptimalAssignmentForEllipsis(nonEllipsisExpected, actual, options, path, depth, startTime, timeoutMs);

        // Check for timeout
        if (System.currentTimeMillis() - startTime > timeoutMs) {
            var errors = new ArrayList<ComparisonError>();
            errors.add(new ComparisonError(
                path + ".timeout",
                "completion within " + options.timeoutSeconds() + "s",
                "timeout after " + options.timeoutSeconds() + "s",
                "Backtracking ellipsis comparison timed out. Consider simplifying the pattern."
            ));
            return ComparisonResult.failure(errors);
        }

        if (assignment == null) {
            return ComparisonResult.failure(List.of(new ComparisonError(
                path + ".ellipsis",
                "backtracking assignment for ellipsis pattern",
                "no valid assignment found",
                "No matching assignment found for required elements in ellipsis pattern"
            )));
        }

        // Validate the assignment by comparing each pair
        var errors = new ArrayList<ComparisonError>();
        for (int i = 0; i < nonEllipsisExpected.size(); i++) {
            int actualIndex = assignment[i];
            var elementResult = ComparisonPipeline.create(
                nonEllipsisExpected.get(i),
                actual.get(actualIndex),
                options,
                path + "[" + i + "→" + actualIndex + "]",
                depth + 1
            ).execute();

            if (!elementResult.isMatch()) {
                errors.addAll(elementResult.errors());
            }
        }

        return errors.isEmpty() ? ComparisonResult.success() : ComparisonResult.failure(errors);
    }

    /**
     * Find optimal assignment for ellipsis patterns where not all actual elements need to be matched.
     * This allows actual array to be larger than expected when ellipsis is present.
     */
    private static int[] findOptimalAssignmentForEllipsis(List<Object> expectedNonEllipsis, List<?> actual,
                                                         ComparisonOptions options, String path, int depth,
                                                         long startTime, long timeoutMs) {
        int expectedSize = expectedNonEllipsis.size();
        int actualSize = actual.size();

        if (expectedSize == 0) {
            return new int[0]; // No elements to assign
        }

        if (expectedSize > actualSize) {
            return null; // Impossible to assign
        }

        // Create compatibility matrix for non-ellipsis elements vs all actual elements
        boolean[][] compatible = new boolean[expectedSize][actualSize];
        for (int i = 0; i < expectedSize; i++) {
            for (int j = 0; j < actualSize; j++) {
                // Check timeout during compatibility matrix creation
                if (System.currentTimeMillis() - startTime > timeoutMs) {
                    return null; // Timeout
                }

                var result = ComparisonPipeline.create(
                    expectedNonEllipsis.get(i),
                    actual.get(j),
                    options,
                    path + "[" + i + "→" + j + "]",
                    depth + 1
                ).execute();
                compatible[i][j] = result.isMatch();
            }
        }

        // Use backtracking to find valid assignment (allowing some actual elements to be unmatched)
        int[] assignment = new int[expectedSize];
        boolean[] used = new boolean[actualSize];

        if (backtrackEllipsis(0, assignment, used, compatible, startTime, timeoutMs)) {
            return assignment;
        }

        return null;
    }

    /**
     * Recursive backtracking for ellipsis patterns where some actual elements can remain unmatched.
     */
    private static boolean backtrackEllipsis(int expectedIndex, int[] assignment, boolean[] used,
                                           boolean[][] compatible, long startTime, long timeoutMs) {
        // Check timeout
        if (System.currentTimeMillis() - startTime > timeoutMs) {
            return false; // Timeout
        }

        if (expectedIndex == assignment.length) {
            return true; // All expected elements assigned
        }

        for (int actualIndex = 0; actualIndex < used.length; actualIndex++) {
            if (!used[actualIndex] && compatible[expectedIndex][actualIndex]) {
                assignment[expectedIndex] = actualIndex;
                used[actualIndex] = true;

                if (backtrackEllipsis(expectedIndex + 1, assignment, used, compatible, startTime, timeoutMs)) {
                    return true;
                }

                // Backtrack
                used[actualIndex] = false;
            }
        }

        return false;
    }
}
