package mongodb.comparison;

import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;

import java.util.Arrays;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;

import mongodb.comparison.internal.ArrayComparator;

import static org.junit.jupiter.api.Assertions.*;

class ArrayComparisonTest {

    /**
     * Test cases for array comparison strategies from comparison spec section 3.3.
     *
     * Based on comparison spec sections:
     * - 3.3.1 Strategy Selection Algorithm
     * - 3.3.2 Ordered Array Comparison
     * - 3.3.3 Backtracking Algorithm (for complex objects)
     * - 3.3.4 Hybrid Strategy (mixed primitive/object arrays)
     */
    @Nested
    public class ComparisonStrategies {
        @Test
        @DisplayName("Backtracking algorithm for complex unordered objects")
        void testBacktrackingForComplexObjects() {
            // Complex nested objects that require backtracking to match
            var expected = Arrays.asList(
                    Map.of(
                            "id", 1,
                            "data", Map.of("nested", "value1", "count", 10),
                            "tags", Arrays.asList("important", "user")
                    ),
                    Map.of(
                            "id", 2,
                            "data", Map.of("nested", "value2", "count", 20),
                            "tags", Arrays.asList("system", "automated")
                    ),
                    Map.of(
                            "id", 3,
                            "data", Map.of("nested", "value3", "count", 15),
                            "tags", Arrays.asList("manual", "review")
                    )
            );

            // Same objects in different order
            var actual = Arrays.asList(
                    Map.of(
                            "id", 3,
                            "data", Map.of("nested", "value3", "count", 15),
                            "tags", Arrays.asList("manual", "review")
                    ),
                    Map.of(
                            "id", 1,
                            "data", Map.of("nested", "value1", "count", 10),
                            "tags", Arrays.asList("important", "user")
                    ),
                    Map.of(
                            "id", 2,
                            "data", Map.of("nested", "value2", "count", 20),
                            "tags", Arrays.asList("system", "automated")
                    )
            );

            var result = OutputValidator.expect(actual)
                    .withUnorderedArrays()  // Library will automatically choose backtracking strategy
                    .toMatch(expected);

            assertTrue(result.isMatch(), "Unordered comparison should automatically choose the optimal strategy (backtracking) for complex objects");
        }

        @Test
        @DisplayName("Hybrid strategy for mixed primitive/object arrays")
        void testHybridStrategyMixedArrays() {
            // Array with mixed primitives and objects
            var expected = Arrays.asList(
                    "string1", "string2",  // primitives
                    42, 84,                // primitives
                    true, false,           // primitives
                    Map.of("complex", "object1", "value", 1),  // object
                    Map.of("complex", "object2", "value", 2)   // object
            );

            // Same elements in different order
            var actual = Arrays.asList(
                    84, 42,                        // primitives in different order
                    false, true,                   // primitives in different order
                    "string2", "string1",          // primitives in different order
                    Map.of("complex", "object2", "value", 2),  // objects in different order
                    Map.of("complex", "object1", "value", 1)
            );

            var result = OutputValidator.expect(actual)
                    .withUnorderedArrays()  // Library will automatically choose hybrid strategy
                    .toMatch(expected);

            assertTrue(result.isMatch(),
                    "Unordered comparison should automatically choose the optimal strategy (hybrid) for mixed content");
        }

        @Test
        @DisplayName("Frequency-based comparison for primitive arrays")
        void testFrequencyBasedComparisonForPrimitives() {
            // Large array of primitives where backtracking would be expensive
            var expected = Arrays.asList(
                    1, 2, 3, 4, 5, 1, 2, 3, 4, 5,  // repeated primitives
                    "a", "b", "c", "a", "b", "c",
                    true, false, true, false
            );

            // Same elements with different order
            var actual = Arrays.asList(
                    5, 4, 3, 2, 1, 5, 4, 3, 2, 1,  // reversed order
                    "c", "b", "a", "c", "b", "a",   // different order
                    false, true, false, true         // different order
            );

            var result = OutputValidator.expect(actual)
                    .withUnorderedArrays()  // Library will automatically choose set-based strategy
                    .toMatch(expected);

            assertTrue(result.isMatch(),
                    "Unordered comparison should automatically choose the optimal strategy (set-based) for large primitive arrays");
        }

        @Test
        @DisplayName("Strategy selection based on array content analysis")
        void testStrategySelectionBasedOnContent() {
            // Test that appropriate strategy is selected based on content

            // 1. Large array should use frequency-based for performance
            var largePrimitiveArray = java.util.Collections.nCopies(100, "item");
            var largePrimitiveArrayShuffled = new java.util.ArrayList<>(largePrimitiveArray);
            java.util.Collections.shuffle(largePrimitiveArrayShuffled);

            long startTime = System.currentTimeMillis();
            var result1 = OutputValidator.expect(largePrimitiveArrayShuffled)
                    .withUnorderedArrays()
                    .toMatch(largePrimitiveArray);
            long elapsedTime = System.currentTimeMillis() - startTime;

            assertTrue(result1.isMatch());
            assertTrue(elapsedTime < 1000, "Large primitive array should be handled efficiently");

            // 2. Mixed content should use hybrid strategy
            var mixedArray = Arrays.asList(
                    1, 2, 3,  // primitives
                    Map.of("key", "value1"),  // object
                    Map.of("key", "value2")   // object
            );
            var mixedArrayReordered = Arrays.asList(
                    Map.of("key", "value2"),
                    3, 2, 1,
                    Map.of("key", "value1")
            );

            var result2 = OutputValidator.expect(mixedArrayReordered)
                    .withUnorderedArrays()
                    .toMatch(mixedArray);

            assertTrue(result2.isMatch(), "Mixed arrays should use hybrid strategy");

            // 3. Complex objects should use backtracking
            var complexObjects = Arrays.asList(
                    Map.of("nested", Map.of("deep", "value1")),
                    Map.of("nested", Map.of("deep", "value2"))
            );
            var complexObjectsReordered = Arrays.asList(
                    Map.of("nested", Map.of("deep", "value2")),
                    Map.of("nested", Map.of("deep", "value1"))
            );

            var result3 = OutputValidator.expect(complexObjectsReordered)
                    .withUnorderedArrays()
                    .toMatch(complexObjects);

            assertTrue(result3.isMatch(), "Complex objects should use backtracking");
        }

        @Test
        @DisplayName("Performance limits and fallback strategies")
        void testPerformanceLimitsAndFallbacks() {
            // Create array that exceeds backtracking size limit
            int largeSize = 60; // Exceeds MAX_ARRAY_SIZE_FOR_BACKTRACKING = 50
            var largeComplexArray = new java.util.ArrayList<Map<String, Object>>();

            for (int i = 0; i < largeSize; i++) {
                largeComplexArray.add(Map.of(
                        "id", i,
                        "data", Map.of("value", "item" + i)
                ));
            }

            // Reverse the array
            var reversedLargeArray = new java.util.ArrayList<>(largeComplexArray);
            java.util.Collections.reverse(reversedLargeArray);

            // Should fall back to frequency-based comparison or report limit exceeded
            var result = OutputValidator.expect(reversedLargeArray)
                    .withUnorderedArrays()
                    .toMatch(largeComplexArray);

            // Should either succeed with fallback strategy or fail with helpful error
            if (!result.isMatch()) {
                assertTrue(result.errors().stream()
                                .anyMatch(e -> e.message().contains("size limit") ||
                                        e.message().contains("complexity")),
                        "Should report performance limit issues");
            }
        }

        @Test
        @DisplayName("Array comparison with nested ellipsis patterns")
        void testArrayComparisonWithNestedEllipsis() {
            var expected = Arrays.asList(
                    Map.of("id", 1, "data", "..."), // Any data acceptable
                    Map.of("id", 2, "status", "active"),
                    "..." // Additional elements allowed
            );

            var actual = Arrays.asList(
                    Map.of("id", 2, "status", "active"),
                    Map.of("id", 1, "data", Map.of("complex", "structure")),
                    Map.of("id", 3, "extra", "field"),
                    Map.of("id", 4, "another", "element")
            );

            var result = OutputValidator.expect(actual)
                    .withUnorderedArrays()  // Library will automatically choose backtracking strategy
                    .toMatch(expected);

            assertTrue(result.isMatch(),
                    "Should handle ellipsis patterns within unordered array comparison using automatic strategy selection");
        }
    }

    /**
     * Tests to confirm useful reporting of array comparison-related failures.
     */
    @Nested
    public class Reporting {
        @Test
        @DisplayName("Array comparison error reporting with strategy information")
        void testArrayComparisonErrorReportingWithStrategy() {
            var expected = Arrays.asList(
                    Map.of("id", 1, "value", "expected1"),
                    Map.of("id", 2, "value", "expected2")
            );

            var actual = Arrays.asList(
                    Map.of("id", 1, "value", "actual1"),   // Different value
                    Map.of("id", 3, "value", "actual3")    // Different id
            );

            var result = OutputValidator.expect(actual)
                    .withUnorderedArrays()  // Library will automatically choose backtracking strategy
                    .toMatch(expected);

            assertFalse(result.isMatch());

            // Should include information about which strategy was used
            assertTrue(result.errors().stream()
                            .anyMatch(e -> e.message().contains("unordered") ||
                                    e.message().contains("strategy") ||
                                    e.message().contains("unordered")),
                    "Should report which comparison strategy was used");

            // Should provide helpful suggestions
            assertTrue(result.errors().stream()
                            .anyMatch(e -> e.message().contains("element") &&
                                    e.message().contains("match")),
                    "Should explain that no matching element was found");
        }

        @Test
        @DisplayName("Ordered array comparison should mention index-based comparison in error messages")
        void testOrderedArrayComparisonErrorContext() {
            var expected = Arrays.asList(
                    Map.of("id", 1, "value", "expected1"),
                    Map.of("id", 2, "value", "expected2"),
                    Map.of("id", 3, "value", "expected3")
            );

            var actual = Arrays.asList(
                    Map.of("id", 1, "value", "actual1"),   // Different value
                    Map.of("id", 4, "value", "actual4"),   // Different id
                    Map.of("id", 5, "value", "actual5")    // Different id
            );

            var result = OutputValidator.expect(actual)
                    .withOrderedArrays()
                    .toMatch(expected);

            assertFalse(result.isMatch(), "Different arrays should not match");
            assertFalse(result.errors().isEmpty(), "Should have comparison errors");

            // At least one error should mention index-based comparison
            boolean hasIndexContext = result.errors().stream()
                    .anyMatch(e -> e.message().contains("index") || e.message().contains("ordered"));

            assertTrue(hasIndexContext,
                    "Ordered array comparison should mention index-based context in error messages. Got: " +
                            result.errors().stream().map(e -> e.message()).toList());
        }

        @Test
        @DisplayName("Unordered array comparison should mention matching strategy in error messages")
        void testUnorderedArrayComparisonErrorContext() {
            var expected = Arrays.asList(
                    Map.of("id", 1, "value", "expected1"),
                    Map.of("id", 2, "value", "expected2"),
                    Map.of("id", 3, "value", "expected3")
            );

            var actual = Arrays.asList(
                    Map.of("id", 1, "value", "actual1"),   // Different value
                    Map.of("id", 4, "value", "actual4"),   // Different id
                    Map.of("id", 5, "value", "actual5")    // Different id
            );

            var result = OutputValidator.expect(actual)
                    .withUnorderedArrays()
                    .toMatch(expected);

            assertFalse(result.isMatch(), "Different arrays should not match");
            assertFalse(result.errors().isEmpty(), "Should have comparison errors");

            // Should mention unordered matching strategy
            boolean hasMatchingContext = result.errors().stream()
                    .anyMatch(e -> e.message().contains("unordered") || e.message().contains("matching"));

            assertTrue(hasMatchingContext,
                    "Unordered array comparison should mention matching strategy in error messages. Got: " +
                            result.errors().stream().map(e -> e.message()).toList());

            // Should explain why elements didn't match
            boolean hasElementExplanation = result.errors().stream()
                    .anyMatch(e -> e.message().contains("no matching element") || e.message().contains("not found"));

            assertTrue(hasElementExplanation,
                    "Should explain why elements didn't match in unordered comparison. Got: " +
                            result.errors().stream().map(e -> e.message()).toList());
        }

        @Test
        @DisplayName("Array size mismatch should indicate comparison strategy")
        void testArraySizeMismatchWithStrategy() {
            var expected = Arrays.asList("a", "b", "c");
            var actual = Arrays.asList("a", "b");

            // Test ordered comparison size mismatch
            var orderedResult = OutputValidator.expect(actual)
                    .withOrderedArrays()
                    .toMatch(expected);

            assertFalse(orderedResult.isMatch(), "Different sizes should not match");

            boolean hasOrderedSizeContext = orderedResult.errors().stream()
                    .anyMatch(e -> e.message().contains("Array sizes don't match") &&
                            (e.message().contains("ordered") || e.message().contains("comparison")));

            assertTrue(hasOrderedSizeContext,
                    "Ordered array size mismatch should mention strategy context");
        }
    }

    /**
     * Tests for array ellipsis gap matching functionality.
     * Verifies complex ellipsis patterns like [1, "...", 4] and [1, "...", 5, "...", 9].
     */
    @Nested
    public class ArrayElipsisPatterns {
        @Test
        void testSimpleArrayEllipsis() {
            var expected = List.of("...");
            var actual = List.of("anything", "goes", "here");

            var result = ArrayComparator.compare(expected, actual,
                    ComparisonOptions.defaultOptions(), "", 0);

            assertTrue(result.isMatch(), "Simple ellipsis [...] should match any array");
        }

        @Test
        void testSingleGapPattern() {
            var expected = List.of(1, "...", 4);
            var actual = List.of(1, 2, 3, 4);

            var result = ArrayComparator.compare(expected, actual,
                    ComparisonOptions.defaultOptions(), "", 0);

            assertTrue(result.isMatch(), "Pattern [1, ..., 4] should match [1, 2, 3, 4]");
        }

        @Test
        void testSingleGapPatternWithLargerGap() {
            var expected = List.of("first", "...", "last");
            var actual = List.of("first", "middle1", "middle2", "middle3", "last");

            var result = ArrayComparator.compare(expected, actual,
                    ComparisonOptions.defaultOptions(), "", 0);

            assertTrue(result.isMatch(), "Pattern [first, ..., last] should match array with multiple middle elements");
        }

        @Test
        void testMultipleGapPattern() {
            var expected = List.of(1, "...", 5, "...", 9);
            var actual = List.of(1, 2, 3, 4, 5, 6, 7, 8, 9);

            var result = ArrayComparator.compare(expected, actual,
                    ComparisonOptions.defaultOptions(), "", 0);

            assertTrue(result.isMatch(), "Pattern [1, ..., 5, ..., 9] should match [1, 2, 3, 4, 5, 6, 7, 8, 9]");
        }

        @Test
        void testStartingEllipsis() {
            var expected = List.of("...", "end");
            var actual = List.of("start", "middle", "end");

            var result = ArrayComparator.compare(expected, actual,
                    ComparisonOptions.defaultOptions(), "", 0);

            assertTrue(result.isMatch(), "Pattern [..., end] should match any array ending with 'end'");
        }

        @Test
        void testEndingEllipsis() {
            var expected = List.of("start", "...");
            var actual = List.of("start", "middle", "end");

            var result = ArrayComparator.compare(expected, actual,
                    ComparisonOptions.defaultOptions(), "", 0);

            assertTrue(result.isMatch(), "Pattern [start, ...] should match any array starting with 'start'");
        }

        @Test
        void testEmptySegments() {
            var expected = List.of("...", "...", "target");
            var actual = List.of("anything", "target");

            var result = ArrayComparator.compare(expected, actual,
                    ComparisonOptions.defaultOptions(), "", 0);

            assertTrue(result.isMatch(), "Multiple consecutive ellipsis should work with empty segments");
        }

        @Test
        void testMismatchedGapPattern() {
            var expected = List.of(1, "...", 5);
            var actual = List.of(1, 2, 3, 4); // Missing 5

            var result = ArrayComparator.compare(expected, actual,
                    ComparisonOptions.defaultOptions(), "", 0);

            assertFalse(result.isMatch(), "Pattern [1, ..., 5] should not match [1, 2, 3, 4] (missing 5)");
        }

        @Test
        void testOutOfOrderGapPattern() {
            var expected = List.of(1, "...", 3, "...", 2); // 3 before 2
            var actual = List.of(1, 2, 3, 4, 5);

            var result = ArrayComparator.compare(expected, actual,
                    ComparisonOptions.defaultOptions(), "", 0);

            assertFalse(result.isMatch(), "Pattern [1, ..., 3, ..., 2] should not match ordered array (3 before 2)");
        }

        @Test
        void testRegularArrayWithoutEllipsis() {
            var expected = List.of(1, 2, 3);
            var actual = List.of(1, 2, 3);

            var result = ArrayComparator.compare(expected, actual,
                    ComparisonOptions.defaultOptions(), "", 0);

            assertTrue(result.isMatch(), "Regular arrays without ellipsis should still work");
        }

        @Test
        void testComplexObjectsInGapPattern() {
            var doc1 = java.util.Map.of("_id", 1, "name", "first");
            var doc2 = java.util.Map.of("_id", 2, "name", "middle");
            var doc3 = java.util.Map.of("_id", 3, "name", "last");

            var expected = List.of(doc1, "...", doc3);
            var actual = List.of(doc1, doc2, doc3);

            var result = ArrayComparator.compare(expected, actual,
                    ComparisonOptions.defaultOptions(), "", 0);

            assertTrue(result.isMatch(), "Gap patterns should work with complex objects");
        }
    }

    @Nested
    public class Performance {
        @Test
        @DisplayName("Timeout handling in complex array comparisons")
        void testTimeoutHandlingInComplexArrayComparisons() {
            // Create pathologically complex comparison that would timeout
            var complexExpected = new java.util.ArrayList<Map<String, Object>>();
            var complexActual = new java.util.ArrayList<Map<String, Object>>();

            // Create arrays that would require expensive backtracking
            for (int i = 0; i < 20; i++) {
                complexExpected.add(Map.of(
                        "id", i,
                        "data", Map.of("nested", Map.of("deep", "value" + i))
                ));
                // Add in reverse order to force maximum backtracking
                complexActual.add(0, Map.of(
                        "id", i,
                        "data", Map.of("nested", Map.of("deep", "value" + i))
                ));
            }

            var result = OutputValidator.expect(complexActual)
                    .withUnorderedArrays()  // Library will automatically choose backtracking strategy
                    .toMatch(complexExpected);

            if (!result.isMatch()) {
                assertTrue(result.errors().stream()
                                .anyMatch(e -> e.message().contains("timeout")),
                        "Should report timeout in array comparison");

                assertTrue(result.errors().stream()
                                .anyMatch(e -> e.message().contains("Consider") ||
                                        e.message().contains("suggest")),
                        "Should provide suggestions for timeout issues");
            }
        }

        @Test
        @DisplayName("Large array performance with size limits")
        void testLargeArrayPerformanceWithSizeLimits() {
            // Test performance with arrays approaching the backtracking limit
            int maxBacktrackingSize = 50; // From spec MAX_ARRAY_SIZE_FOR_BACKTRACKING

            // Create array just under the limit
            var largeArray = new ArrayList<Map<String, Object>>();
            for (int i = 0; i < maxBacktrackingSize - 5; i++) {
                largeArray.add(Map.of(
                        "id", i,
                        "data", Map.of("value", "item" + i, "index", i)
                ));
            }

            // Reverse the array to force maximum backtracking work
            var reversedArray = new ArrayList<>(largeArray);
            Collections.reverse(reversedArray);

            long startTime = System.currentTimeMillis();
            var result = OutputValidator.expect(reversedArray)
                    .withUnorderedArrays()
                    .toMatch(largeArray);
            long elapsed = System.currentTimeMillis() - startTime;

            assertTrue(result.isMatch(), "Large array comparison should succeed");
            assertTrue(elapsed < 5000, "Should complete within reasonable time (5 seconds)");

            // Test array over the limit
            var oversizedArray = new ArrayList<Map<String, Object>>();
            for (int i = 0; i < maxBacktrackingSize + 10; i++) {
                oversizedArray.add(Map.of("id", i, "data", "value" + i));
            }

            var reversedOversized = new ArrayList<>(oversizedArray);
            Collections.reverse(reversedOversized);

            var oversizedResult = OutputValidator.expect(reversedOversized)
                    .withUnorderedArrays()
                    .toMatch(oversizedArray);

            // Should either succeed with fallback strategy or report size limit
            if (!oversizedResult.isMatch()) {
                assertTrue(oversizedResult.errors().stream()
                                .anyMatch(e -> e.message().contains("size limit") ||
                                        e.message().contains("performance")),
                        "Should report size limit exceeded");
            }
        }
    }
}
