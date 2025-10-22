package mongodb.comparison;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Core comparison engine.
 * Package-private - internal implementation detail for the Expect API.
 */
class ComparisonEngine {

    /**
     * Compare expected and actual values with the given options.
     */
    public static ComparisonResult compare(Object expected, Object actual, ComparisonOptions options) {
        long startTime = System.currentTimeMillis();

        // Track memory usage
        Runtime runtime = Runtime.getRuntime();
        long beforeMemory = runtime.totalMemory() - runtime.freeMemory();

        try {
            // Pre-comparison performance checks
            var performanceCheck = checkPerformanceLimits(expected, actual, options);
            if (!performanceCheck.isMatch()) {
                return performanceCheck;
            }

            // Apply circular reference normalization FIRST to prevent stack overflows
            // This must be done before any other processing that might traverse the object tree
            Object circularNormalizedExpected = MongoTypeNormalizer.normalizeValue(expected);
            Object circularNormalizedActual = MongoTypeNormalizer.normalizeValue(actual);

            // No reactive normalization in core library
            Object normalizedExpected = circularNormalizedExpected;
            Object normalizedActual = circularNormalizedActual;

            // Use the ComparisonStrategy system for comparison handling
            ComparisonResult result = ComparisonStrategy.compare(
                normalizedExpected, normalizedActual, options);

            // Convert ComparisonResult back to error list for compatibility with existing performance checks
            var errors = result.errors();

            // Check if we exceeded timeout
            long elapsed = System.currentTimeMillis() - startTime;
            if (elapsed > options.timeoutSeconds() * 1000L) {
                var errorBuilder = ErrorContextBuilder.create("Comparison timed out")
                    .withTimeoutContext(options.timeoutSeconds(), "comparison")
                    .withContext("elapsedTimeMs", elapsed)
                    .withContext("dataComplexity", estimateComplexity(normalizedExpected, normalizedActual));

                return errorBuilder.buildResult();
            }

            // Check memory usage
            long afterMemory = runtime.totalMemory() - runtime.freeMemory();
            long memoryUsed = afterMemory - beforeMemory;

            // Report excessive memory usage (>100MB for comparison)
            if (memoryUsed > 100 * 1024 * 1024) {
                var errorBuilder = ErrorContextBuilder.create("Comparison used excessive memory")
                    .withContext("memoryUsedMB", memoryUsed / 1024 / 1024)
                    .withPerformanceContext((int)(memoryUsed / 1024 / 1024), "memory_usage")
                    .withSuggestion("Consider reducing data size or simplifying comparison");

                // Add as warning, but don't fail the comparison
                errors.add(new mongodb.comparison.ComparisonError(
                    "performance",
                    "Memory usage warning",
                    memoryUsed / 1024 / 1024 + "MB",
                    errorBuilder.build().message()
                ));
            }

            if (errors.isEmpty()) {
                return ComparisonResult.success();
            } else {
                return ComparisonResult.failure(errors);
            }

        } catch (StackOverflowError e) {
            var errorBuilder = ErrorContextBuilder.create("Comparison failed with stack overflow")
                .withContext("exceptionType", e.getClass().getSimpleName())
                .withPerformanceContext(options.maxRecursionDepth(), "recursion_depth")
                .withSuggestion("Reduce data nesting depth or increase recursion limits")
                .withSuggestion("Check for circular references in data structures");

            return errorBuilder.buildResult();
        } catch (OutOfMemoryError e) {
            var errorBuilder = ErrorContextBuilder.create("Comparison failed with out of memory")
                .withContext("exceptionType", e.getClass().getSimpleName())
                .withPerformanceContext(0, "memory_limit")
                .withSuggestion("Reduce data size or increase JVM memory limits")
                .withSuggestion("Consider using streaming comparison for large datasets");

            return errorBuilder.buildResult();
        } catch (RuntimeException e) {
            // Handle circular reference exceptions specifically
            if (e.getMessage() != null && e.getMessage().contains("circular reference")) {
                var errorBuilder = ErrorContextBuilder.create("Circular reference detected")
                    .withContext("exceptionType", e.getClass().getSimpleName())
                    .withContext("exceptionMessage", e.getMessage())
                    .withPerformanceContext(options.maxRecursionDepth(), "circular_reference")
                    .withSuggestion("Remove circular references from data structures")
                    .withSuggestion("Use object references or IDs instead of embedding objects");

                return errorBuilder.buildResult();
            }

            // Handle other runtime exceptions
            var errorBuilder = ErrorContextBuilder.create("Comparison failed with exception: " + e.getMessage())
                .withContext("exceptionType", e.getClass().getSimpleName())
                .withContext("stackTrace", getStackTraceString(e))
                .withSuggestion("Check data structures for invalid formats or corruption")
                .withSuggestion("Verify that all data is properly serializable");

            return errorBuilder.buildResult();
        } catch (Exception e) {
            var errorBuilder = ErrorContextBuilder.create("Comparison failed with exception: " + e.getMessage())
                .withContext("exceptionType", e.getClass().getSimpleName())
                .withContext("stackTrace", getStackTraceString(e))
                .withSuggestion("Check data structures for circular references or invalid formats")
                .withSuggestion("Verify that all data is properly serializable");

            return errorBuilder.buildResult();
        }
    }

    /**
     * Compare actual results with expected output from a file.
     */
    public static ComparisonResult compareWithFile(Object actual, String expectedFilePath, ComparisonOptions options) {
        var parseResult = ExpectedOutputParser.parseFile(expectedFilePath);
        if (!parseResult.isSuccess()) {
            var errorBuilder = ErrorContextBuilder.create("Failed to parse expected file")
                .withContext("filePath", expectedFilePath)
                .withContext("parseError", parseResult.getErrorMessage())
                .withParsingContext(parseResult.getErrorMessage(), "file_parsing")
                .withSuggestion("Check if file exists and is readable")
                .withSuggestion("Verify file format (JSON, JSONL, Extended JSON)");

            return errorBuilder.buildResult();
        }

        return compare(parseResult.getData(), actual, options);
    }

    /**
     * Compare actual results with expected content provided as a string.
    * Uses HYBRID comparison for better JSON ellipsis handling.
     */
    public static ComparisonResult compareWithContent(Object actual, String expectedContent, ComparisonOptions options) {
        // Use ComparisonStrategy to handle all ellipsis patterns (including JSON with ellipsis)
        // This ensures that ContentAnalyzer and StringComparisonStrategy are used correctly
        return compare(expectedContent, actual, options);
    }

    /**
     * Check if expected content looks like structured data (JSON, arrays, objects).
     * This helps determine whether to use structural comparison for better ellipsis handling.
     */
    private static boolean looksLikeStructuredData(String content) {
        if (content == null || content.trim().isEmpty()) {
            return false;
        }

        String trimmed = content.trim();

        // Don't treat simple ellipsis patterns as structured data
        if (trimmed.contains("...")) {
            return false;  // Let string comparison handle ellipsis patterns
        }

        // Check for JSON object or array syntax
        return (trimmed.startsWith("{") && trimmed.contains(":")) ||
               (trimmed.startsWith("[") && trimmed.contains(",")) ||
               trimmed.startsWith("[{") ||  // JSON array of objects
               (trimmed.contains("\"...\"") && (trimmed.contains("{") || trimmed.contains("[")));
    }

    /**
     * Normalize actual data for cross-format comparison with expected data.
     * This handles the key issue where MongoDB driver returns List<Document> with one element
     * but the expected content is written as a single JSON object.
     */
    private static Object normalizeActualForCrossFormatComparison(Object actual, Object expected) {
        // Handle the case where actual is a single-element List and expected is a single object
        if (actual instanceof List<?> actualList &&
            !actualList.isEmpty() &&
            actualList.size() == 1 &&
            !(expected instanceof List)) {

            // Extract the single element for comparison with the single expected object
            return actualList.get(0);
        }

        // For all other cases, return actual as-is
        return actual;
    }

    /**
     * Simple comparison with default options.
     */
    public static ComparisonResult compare(Object expected, Object actual) {
        return compare(expected, actual, ComparisonOptions.defaultOptions());
    }

    /**
     * Simple file comparison with default options.
     */
    public static ComparisonResult compareWithFile(Object actual, String expectedFilePath) {
        return compareWithFile(actual, expectedFilePath, ComparisonOptions.defaultOptions());
    }

    /**
     * Estimate complexity of data structures for error reporting.
     */
    private static Map<String, Object> estimateComplexity(Object expected, Object actual) {
        Map<String, Object> complexity = new HashMap<>();

        complexity.put("expectedDepth", calculateDepth(expected, 0));
        complexity.put("actualDepth", calculateDepth(actual, 0));
        complexity.put("expectedSize", calculateSize(expected));
        complexity.put("actualSize", calculateSize(actual));

        return complexity;
    }

    /**
     * Check performance limits before starting comparison.
     * Implements spec section 6.6 - Performance and Timeout Considerations.
     */
    private static ComparisonResult checkPerformanceLimits(Object expected, Object actual, ComparisonOptions options) {
        // Check data structure depth - but allow circular references to be handled by comparison logic
        int expectedDepth = calculateDepthWithCircularDetection(expected, 0, new java.util.IdentityHashMap<>());
        int actualDepth = calculateDepthWithCircularDetection(actual, 0, new java.util.IdentityHashMap<>());

        // Only fail if the depth is exceeded AND there are no circular references
        // (circular references should be handled by the comparison logic, not failed here)
        boolean hasExpectedCircular = hasCircularReference(expected);
        boolean hasActualCircular = hasCircularReference(actual);

        if ((expectedDepth > options.maxRecursionDepth() || actualDepth > options.maxRecursionDepth()) &&
            !hasExpectedCircular && !hasActualCircular) {
            var errorBuilder = ErrorContextBuilder.create("Data structure exceeds maximum recursion depth")
                .withPerformanceContext(Math.max(expectedDepth, actualDepth), "recursion_depth")
                .withContext("expectedDepth", expectedDepth)
                .withContext("actualDepth", actualDepth)
                .withContext("maxAllowed", options.maxRecursionDepth())
                .withSuggestion("Increase maxRecursionDepth setting if deeper nesting is expected")
                .withSuggestion("Flatten data structures to reduce nesting depth")
                .withSuggestion("Check for circular references that might cause infinite recursion");

            return errorBuilder.buildResult();
        }

        // Check array sizes for potentially complex unordered strategies
        int expectedSize = calculateSize(expected);
        int actualSize = calculateSize(actual);

        if ((expectedSize > 10000 || actualSize > 10000) &&
            options.comparisonType() == ComparisonType.UNORDERED) {
            var errorBuilder = ErrorContextBuilder.create("Data structure too large for complex unordered comparison")
                .withPerformanceContext(Math.max(expectedSize, actualSize), "array_size")
                .withContext("expectedSize", expectedSize)
                .withContext("actualSize", actualSize)
                .withContext("recommendedStrategy", "ORDERED or reduce data size")
                .withSuggestion("Use ORDERED comparison for better performance with large arrays")
                .withSuggestion("Consider filtering or sampling large datasets");

            return errorBuilder.buildResult();
        }

        // Check for potential circular references in structure
        // Note: Don't fail immediately - just warn if circular refs are detected
        // The actual comparison logic should handle circular references gracefully
        if (hasExpectedCircular || hasActualCircular) {
            // Just log the detection - don't fail the comparison here
            // The comparison logic should handle these gracefully
            // This is informational for debugging purposes
        }

        return ComparisonResult.success();
    }

    /**
     * Calculate depth with circular reference detection to avoid infinite loops.
     */
    private static int calculateDepthWithCircularDetection(Object obj, int currentDepth, java.util.IdentityHashMap<Object, Boolean> visited) {
        if (obj == null || isPrimitiveType(obj) || currentDepth > 200) { // Hard limit to prevent infinite recursion
            return currentDepth;
        }

        // Check for circular reference
        if (visited.containsKey(obj)) {
            return currentDepth; // Stop here if we've seen this object before
        }

        visited.put(obj, Boolean.TRUE);

        try {
            return switch (obj) {
                case Map<?, ?> map -> {
                    int maxDepth = currentDepth;
                    for (Object value : map.values()) {
                        maxDepth = Math.max(maxDepth, calculateDepthWithCircularDetection(value, currentDepth + 1, visited));
                    }
                    yield maxDepth;
                }
                case List<?> list -> {
                    int maxDepth = currentDepth;
                    for (Object item : list) {
                        maxDepth = Math.max(maxDepth, calculateDepthWithCircularDetection(item, currentDepth + 1, visited));
                    }
                    yield maxDepth;
                }
                default -> currentDepth;
            };
        } finally {
            visited.remove(obj);
        }
    }

    /**
     * Detect circular references in object structure.
     * Uses a traversal with visited set to detect cycles.
     */
    private static boolean hasCircularReference(Object obj) {
        return hasCircularReference(obj, new java.util.IdentityHashMap<>());
    }

    private static boolean hasCircularReference(Object obj, java.util.IdentityHashMap<Object, Boolean> visited) {
        if (obj == null || isPrimitiveType(obj)) {
            return false;
        }

        // Check if we've seen this exact object instance before
        if (visited.containsKey(obj)) {
            return true;
        }

        visited.put(obj, Boolean.TRUE);

        try {
            return switch (obj) {
                case Map<?, ?> map -> {
                    for (Object value : map.values()) {
                        if (hasCircularReference(value, visited)) {
                            yield true;
                        }
                    }
                    yield false;
                }
                case List<?> list -> {
                    for (Object item : list) {
                        if (hasCircularReference(item, visited)) {
                            yield true;
                        }
                    }
                    yield false;
                }
                default -> false; // For other object types, assume no circular ref
            };
        } finally {
            visited.remove(obj);
        }
    }

    /**
     * Check if an object is a primitive type that can't have circular references.
     */
    private static boolean isPrimitiveType(Object obj) {
        return obj instanceof String || obj instanceof Number || obj instanceof Boolean;
    }

    /**
     * Calculate depth of nested data structure with protection against infinite recursion.
     */
    private static int calculateDepth(Object obj, int currentDepth) {
        if (obj == null || currentDepth > 200) { // Prevent infinite recursion with hard limit
            return currentDepth;
        }

        return switch (obj) {
            case Map<?, ?> map -> {
                int maxDepth = currentDepth;
                for (Object value : map.values()) {
                    maxDepth = Math.max(maxDepth, calculateDepth(value, currentDepth + 1));
                }
                yield maxDepth;
            }
            case List<?> list -> {
                int maxDepth = currentDepth;
                for (Object item : list) {
                    maxDepth = Math.max(maxDepth, calculateDepth(item, currentDepth + 1));
                }
                yield maxDepth;
            }
            default -> currentDepth;
        };
    }

    /**
     * Calculate approximate size of data structure with protection against infinite loops.
     */
    private static int calculateSize(Object obj) {
        return calculateSize(obj, new java.util.IdentityHashMap<>());
    }

    private static int calculateSize(Object obj, java.util.IdentityHashMap<Object, Boolean> visited) {
        if (obj == null || isPrimitiveType(obj)) {
            return 1;
        }

        // Prevent infinite loops in circular structures
        if (visited.containsKey(obj)) {
            return 0; // Don't count already visited objects
        }

        visited.put(obj, Boolean.TRUE);

        try {
            return switch (obj) {
                case Map<?, ?> map -> {
                    int size = map.size();
                    for (Object value : map.values()) {
                        size += calculateSize(value, visited);
                    }
                    yield size;
                }
                case List<?> list -> {
                    int size = list.size();
                    for (Object item : list) {
                        size += calculateSize(item, visited);
                    }
                    yield size;
                }
                default -> 1;
            };
        } finally {
            visited.remove(obj);
        }
    }

    /**
     * Get stack trace as string for error reporting.
     */
    private static String getStackTraceString(Exception e) {
        var writer = new java.io.StringWriter();
        var printWriter = new java.io.PrintWriter(writer);
        e.printStackTrace(printWriter);
        String stackTrace = writer.toString();

        // Truncate very long stack traces
        if (stackTrace.length() > 1000) {
            return stackTrace.substring(0, 997) + "...";
        }
        return stackTrace;
    }
}
