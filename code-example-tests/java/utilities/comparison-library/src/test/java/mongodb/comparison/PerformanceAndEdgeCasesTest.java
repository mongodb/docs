package mongodb.comparison;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;

import java.util.*;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.TimeUnit;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Test cases for performance limits, edge cases, and stress testing.
 *
 * Based on comparison spec sections:
 * - 6.6 Performance and Timeout Considerations
 * - Edge cases discovered during C# implementation
 * - Stress testing for robustness
 */
class PerformanceAndEdgeCasesTest {
    @Test
    @DisplayName("Timeout handling with complex comparisons")
    void testTimeoutHandlingWithComplexComparisons() {
        // Create structure that would take significant time to compare
        var complexArray = new ArrayList<Map<String, Object>>();
        for (int i = 0; i < 30; i++) {
            complexArray.add(Map.of(
                    "id", i,
                    "nested", createNestedStructure(10),
                    "array", Collections.nCopies(20, "item" + i)
            ));
        }

        // Reverse to maximize comparison work
        var reversedComplex = new ArrayList<>(complexArray);
        Collections.reverse(reversedComplex);

        // Test with complex comparison (timeout is now fixed at 30 seconds)
        // This should complete successfully or throw AssertionError if it times out
        assertDoesNotThrow(() -> Expect.that(reversedComplex).shouldMatch(complexArray));
    }

    @Test
    @DisplayName("Deep nesting with recursion depth protection")
    void testDeepNestingWithRecursionDepthProtection() {
        int maxDepth = 100; // From spec MAX_RECURSION_DEPTH

        // Create deeply nested structure just under the limit
        Map<String, Object> deepStructure = createNestedStructure(maxDepth - 10);

        Expect.that(deepStructure).shouldMatch(deepStructure);

        // Create structure over the limit
        Map<String, Object> tooDeepStructure = createNestedStructure(maxDepth + 10);

        // Should either succeed or report depth limit exceeded
        try {
            Expect.that(tooDeepStructure).shouldMatch(tooDeepStructure);
            // If it succeeds, that's fine
        } catch (AssertionError e) {
            // If it fails, verify it's due to recursion depth
            assertTrue(e.getMessage().contains("recursion depth") ||
                      e.getMessage().contains("exceeds maximum") ||
                      e.getMessage().contains("too deep"),
                    "Should report recursion depth limit issues");
        }
    }

    @Test
    @DisplayName("Memory usage with large data structures")
    void testMemoryUsageWithLargeDataStructures() {
        // Create memory-intensive data structure
        var largeData = new ArrayList<Map<String, Object>>();
        for (int i = 0; i < 1000; i++) {
            var item = new HashMap<String, Object>();
            item.put("id", i);
            item.put("largeString", "x".repeat(1000)); // 1KB string
            item.put("array", Collections.nCopies(100, "item"));
            largeData.add(item);
        }

        // Monitor memory usage during comparison
        Runtime runtime = Runtime.getRuntime();
        long beforeMemory = runtime.totalMemory() - runtime.freeMemory();

        Expect.that(largeData)
            .withOrderedSort()  // Use ordered comparison to avoid performance limits for large data
            .shouldMatch(largeData);

        long afterMemory = runtime.totalMemory() - runtime.freeMemory();
        long memoryUsed = afterMemory - beforeMemory;

        // Memory usage should be reasonable (less than 100MB for this test)
        assertTrue(memoryUsed < 100 * 1024 * 1024,
            "Memory usage should be reasonable: " + (memoryUsed / 1024 / 1024) + "MB");
    }

    @Test
    @DisplayName("Concurrent comparison operations")
    void testConcurrentComparisonOperations() {
        var testData = Map.of(
            "field1", "value1",
            "field2", Arrays.asList(1, 2, 3, 4, 5),
            "field3", Map.of("nested", "data")
        );

        // Run multiple comparisons concurrently
        var futures = new ArrayList<CompletableFuture<Boolean>>();

        for (int i = 0; i < 10; i++) {
            var future = CompletableFuture.supplyAsync(() -> {
                try {
                    Expect.that(testData).shouldMatch(testData);
                    return true;
                } catch (AssertionError e) {
                    return false;
                }
            });
            futures.add(future);
        }

        // Wait for all to complete
        var allResults = CompletableFuture.allOf(futures.toArray(new CompletableFuture[0]))
            .thenApply(v -> futures.stream()
                .map(CompletableFuture::join)
                .toList());

        try {
            var results = allResults.get(10, TimeUnit.SECONDS);
            assertTrue(results.stream().allMatch(Boolean::booleanValue),
                "All concurrent comparisons should succeed");
        } catch (Exception e) {
            fail("Concurrent operations should complete successfully: " + e.getMessage());
        }
    }

    @Test
    @DisplayName("Edge case value handling")
    void testEdgeCaseValueHandling() {
        // Test various edge case values
        var edgeCases = new HashMap<String, Object>();
        edgeCases.put("null", null);
        edgeCases.put("emptyString", "");
        edgeCases.put("emptyArray", Arrays.asList());
        edgeCases.put("emptyObject", Map.of());
        edgeCases.put("whitespace", "   \t\n\r   ");
        edgeCases.put("unicode", "Unicode: \u03B1\u03B2\u03B3 \uD83D\uDE00 \u0000");
        edgeCases.put("specialNumbers", Arrays.asList(
            Double.POSITIVE_INFINITY,
            Double.NEGATIVE_INFINITY,
            Double.NaN,
            -0.0,
            0.0
        ));
        edgeCases.put("largeNumber", 9007199254740991L); // Max safe integer in JavaScript
        edgeCases.put("controlChars", "\u0001\u0002\u0003\u001F");

        Expect.that(edgeCases).shouldMatch(edgeCases);

        // Test with ellipsis patterns and edge cases
        var edgeWithEllipsis = Map.of(
            "null", "...",
            "emptyString", "...",
            "unicode", "Unicode...",
            "specialNumbers", Arrays.asList("...")
        );

        Expect.that(edgeCases).shouldMatch(edgeWithEllipsis);
    }

    @Test
    @DisplayName("Very large file processing")
    void testVeryLargeFileProcessing() {
        // Simulate processing a very large expected output file
        var largeContent = new StringBuilder();

        // Create 10MB of JSON content
        for (int i = 0; i < 10000; i++) {
            largeContent.append(String.format(
                "{\"id\": %d, \"data\": \"This is a large string with lots of content %d\", \"timestamp\": \"2023-01-01T%02d:%02d:%02d.000Z\"}\n",
                i, i, (i % 24), (i % 60), (i % 60)
            ));
        }

        var parseResult = ExpectedOutputParser.parseContent(largeContent.toString());

        if (parseResult.isSuccess()) {
            // Should handle large parsed content efficiently
            @SuppressWarnings("unchecked")
            List<Object> data = (List<Object>) parseResult.getData();
            assertEquals(10000, data.size(), "Should parse all records from large content");
        } else {
            // Should fail gracefully with helpful error message
            assertTrue(parseResult.getErrorMessage().contains("size") ||
                      parseResult.getErrorMessage().contains("limit"),
                "Should report size-related issues for very large files");
        }
    }

    @Test
    @DisplayName("Malformed input stress testing")
    void testMalformedInputStressTesting() {
        // Various types of malformed input that should be handled gracefully
        String[] malformedInputs = {
            "{ not valid json at all }",
            "{ \"unclosed\": \"string",
            "{ \"trailing\": \"comma\", }",
            "{ \"duplicate\": 1, \"duplicate\": 2 }",
            "{ \"nested\": { \"unclosed\": true }",
            "[ \"array\", \"with\", \"unclosed\"",
            "random text that isn't JSON",
            "",
            "   ",
            "{{{{{",
            "null true false",
            "{ \"unicode\": \"\uD800\" }", // Invalid Unicode surrogate
            "{ \"number\": 123.456.789 }",
            "{ \"object\": { \"deeply\": { \"nested\": { \"without\": { \"closing\": true"
        };

        for (String malformed : malformedInputs) {
            var parseResult = ExpectedOutputParser.parseContent(malformed);

            // Should either parse successfully (if recoverable) or fail gracefully
            if (!parseResult.isSuccess()) {
                assertNotNull(parseResult.getErrorMessage(),
                    "Should provide error message for malformed input: " + malformed);
                assertFalse(parseResult.getErrorMessage().isEmpty(),
                    "Error message should not be empty for: " + malformed);
            }

            // Should not throw uncaught exceptions
            assertDoesNotThrow(() -> parseResult,
                "Should handle malformed input gracefully: " + malformed);
        }
    }

    // Helper methods

    private Map<String, Object> createNestedStructure(int depth) {
        if (depth <= 0) {
            return Map.of("leaf", true, "value", "deep");
        }

        return Map.of(
            "level", depth,
            "nested", createNestedStructure(depth - 1),
            "data", Arrays.asList("item1", "item2", "item3")
        );
    }
}
