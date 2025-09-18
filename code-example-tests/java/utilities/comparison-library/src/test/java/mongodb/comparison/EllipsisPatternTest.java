package mongodb.comparison;

import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;

import mongodb.comparison.internal.EllipsisPatternRegistry;
import mongodb.comparison.internal.ArrayComparator;
import mongodb.comparison.internal.StringComparator;
import org.bson.Document;
import org.bson.types.ObjectId;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Date;
import java.util.regex.Pattern;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Test cases for advanced ellipsis pattern handling from comparison spec section 3.2.
 *
 * Based on comparison spec sections:
 * - 3.2.1 Property-Level Ellipsis
 * - 3.2.2 Array-Level Ellipsis
 * - 3.2.3 Object-Level Ellipsis
 * - 2.3 Global Configuration Detection
 */
class EllipsisPatternTest {
    @Nested
    public class Patterns {
        @Test
        @DisplayName("Test basic ellipsis pattern matching")
        void testBasicEllipsisPatterns() {
            // Test simple ellipsis
            assertTrue(EllipsisPatternRegistry.isEllipsisPattern("..."));
            assertTrue(EllipsisPatternRegistry.matchesPattern("...", "anything"));
            assertTrue(EllipsisPatternRegistry.matchesPattern("...", new ObjectId()));
            assertTrue(EllipsisPatternRegistry.matchesPattern("...", new Date()));
            assertTrue(EllipsisPatternRegistry.matchesPattern("...", 42));

            // Test prefix patterns
            assertTrue(EllipsisPatternRegistry.isEllipsisPattern("Error:..."));
            assertTrue(EllipsisPatternRegistry.matchesPattern("Error:...", "Error: Connection timeout"));
            assertFalse(EllipsisPatternRegistry.matchesPattern("Error:...", "Success: All good"));

            // Test suffix patterns
            assertTrue(EllipsisPatternRegistry.isEllipsisPattern("...timeout"));
            assertTrue(EllipsisPatternRegistry.matchesPattern("...timeout", "Connection timeout"));
            assertFalse(EllipsisPatternRegistry.matchesPattern("...timeout", "Connection success"));
        }

        @Test
        @DisplayName("Should detect ellipsis patterns correctly")
        void testEllipsisPatternDetection() {
            String expected = "Inserted documents with ids: [...]";
            String actual = "Inserted documents with ids: [507f1f77bcf86cd799439013, 507f1f77bcf86cd799439014]";

            assertTrue(EllipsisPatternRegistry.isEllipsisPattern(expected),
                    "Should detect ellipsis pattern in expected string");

            assertFalse(EllipsisPatternRegistry.isEllipsisPattern(actual),
                    "Should not detect ellipsis pattern in actual string");

            assertTrue(EllipsisPatternRegistry.matchesPattern(expected, actual),
                    "Expected pattern should match actual string");
        }

        @Test
        @DisplayName("Global ellipsis detection from file content")
        void testGlobalEllipsisFromFile() {
            String expectedContent = """
                    { "name": "Alice", "age": 25 }
                    ...
                    { "status": "active" }
                    """;

            // Actual has additional fields not in expected
            var actual = Map.of(
                    "name", "Alice",
                    "age", 25,
                    "extraField", "should be ignored",
                    "status", "active",
                    "anotherExtra", "also ignored"
            );

            var result = OutputValidator.expect(actual)
                    .toMatchContent(expectedContent);

            // Should succeed because standalone "..." line enables omitted fields mode
            assertTrue(result.isMatch(),
                    "Global ellipsis should enable omitted fields mode");
        }

        @Test
        @DisplayName("Ellipsis pattern error reporting")
        void testEllipsisPatternErrorReporting() {
            var expected = Map.of(
                    "error", "Failed...",
                    "code", 500
            );
            var actual = Map.of(
                    "error", "Success",
                    "code", 200
            );

            var result = OutputValidator.expect(actual).toMatch(expected);
            assertFalse(result.isMatch());

            // Should have specific error about ellipsis pattern mismatch
            assertTrue(result.errors().stream()
                            .anyMatch(e -> e.message().contains("ellipsis pattern") ||
                                    e.message().contains("truncated string")),
                    "Should report ellipsis pattern mismatch specifically");

            // Should include helpful pattern description
            assertTrue(result.errors().stream()
                            .anyMatch(e -> e.expected().contains("Failed...")),
                    "Should include the ellipsis pattern in error");
        }

        @Nested
        public class ArrayPatterns {
            @Test
            @DisplayName("Test array ellipsis patterns")
            void testArrayEllipsisPatterns() {
                // Test array wildcard [...]
                assertTrue(EllipsisPatternRegistry.isEllipsisPattern("[...]"));
                assertTrue(EllipsisPatternRegistry.matchesPattern("[...]", Arrays.asList("A", "B", "C")));
                assertTrue(EllipsisPatternRegistry.matchesPattern("[...]", new String[]{"A", "B"}));

                // Test JSON array with ellipsis content
                assertTrue(EllipsisPatternRegistry.isEllipsisPattern("[\"...\"]"));
                String actualArrayJson = "[\"A\", \"E\"]";
                assertTrue(EllipsisPatternRegistry.matchesPattern("[\"...\"]", actualArrayJson));
            }

            @Test
            @DisplayName("Array ellipsis with mixed elements: [1, '...', 4]")
            void testArrayEllipsisWithMixedElements() {
                // Pattern: [1, "...", 4] should match [1, 2, 3, 4]
                var expected = Arrays.asList(1, "...", 4);
                var actual = Arrays.asList(1, 2, 3, 4);

                var result = OutputValidator.expect(actual).toMatch(expected);
                assertTrue(result.isMatch(), "Ellipsis should cover middle elements");

                // Pattern: ["first", "...", "last"] should match variable middle content
                var expected2 = Arrays.asList("first", "...", "last");
                var actual2 = Arrays.asList("first", "middle1", "middle2", "last");

                var result2 = OutputValidator.expect(actual2).toMatch(expected2);
                assertTrue(result2.isMatch(), "Ellipsis should cover variable middle content");

                // Pattern: [1, "...", 4] should NOT match [1, 5, 4] (wrong ending)
                var actual3 = Arrays.asList(1, 2, 5);
                var result3 = OutputValidator.expect(actual3).toMatch(expected);
                assertFalse(result3.isMatch(), "Should fail when ending element doesn't match");
            }

            @Test
            @DisplayName("Array ellipsis with multiple gaps: [1, '...', 5, '...', 9]")
            void testArrayEllipsisWithMultipleGaps() {
                var expected = Arrays.asList(1, "...", 5, "...", 9);
                var actual = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9);

                var result = OutputValidator.expect(actual).toMatch(expected);
                assertTrue(result.isMatch(), "Multiple ellipsis gaps should work");

                // Should maintain order in ordered comparison
                var actualWrongOrder = Arrays.asList(1, 2, 3, 4, 9, 6, 7, 8, 5);
                var resultWrongOrder = OutputValidator.expect(actualWrongOrder)
                        .withOrderedArrays()
                        .toMatch(expected);
                assertFalse(resultWrongOrder.isMatch(), "Should fail when order is wrong");
            }

            @Test
            @DisplayName("Test array vendor patterns from Query.java examples")
            void testArrayVendorPatterns() {
                // Pattern from Query.java in real MongoDB documentation
                List<Document> actualResults = Arrays.asList(
                        new Document("_id", 1).append("vendor", Arrays.asList("A", "E")),
                        new Document("_id", 2).append("vendor", Arrays.asList("B", "D", "F"))
                );

                String expectedWithArrayEllipsis = """
                        {"_id": 1, "vendor": [...]}
                        {"_id": 2, "vendor": [...]}
                        """;

                ComparisonResult result = OutputValidator.expect(actualResults)
                        .toMatchContent(expectedWithArrayEllipsis);

                if (!result.isMatch()) {
                    System.out.println("=== ARRAY VENDOR PATTERN TEST FAILURE ===");
                    result.printDebugInfo();
                }

                assertTrue(result.isMatch(), "Array vendor patterns should work with ellipsis");
            }

            @Test
            @DisplayName("Test bulk operation result patterns")
            void testBulkOperationResultPatterns() {
                // Pattern from Insert.java - bulk operation ID lists
                String actualOutput = "Inserted documents with the following ids: [507f1f77bcf86cd799439011, 507f1f77bcf86cd799439012]";
                String expectedWithEllipsis = "Inserted documents with the following ids: [...]";

                ComparisonResult result = OutputValidator.expect(actualOutput)
                        .toMatchContent(expectedWithEllipsis);

                if (!result.isMatch()) {
                    System.out.println("=== BULK OPERATION PATTERN TEST FAILURE ===");
                    result.printDebugInfo();
                }

                assertTrue(result.isMatch(), "Bulk operation result patterns should work");
            }

            @Test
            @DisplayName("Array ellipsis with complex objects")
            void testArrayEllipsisWithComplexObjects() {
                var expected = Arrays.asList(
                        Map.of("type", "user", "data", "..."), // Any data acceptable
                        "...", // Any number of middle elements
                        Map.of("type", "summary", "total", "...") // Any total acceptable
                );

                var actual = Arrays.asList(
                        Map.of("type", "user", "data", Map.of("name", "Alice", "age", 25)),
                        Map.of("type", "transaction", "amount", 100),
                        Map.of("type", "transaction", "amount", 200),
                        Map.of("type", "summary", "total", 300)
                );

                var result = OutputValidator.expect(actual).toMatch(expected);
                assertTrue(result.isMatch(), "Complex object ellipsis in arrays should work");
            }
        }

        @Nested
        public class ObjectPatterns {
            @Test
            @DisplayName("Object-level ellipsis pattern: {'...': '...'}")
            void testObjectLevelEllipsisPattern() {
                // Wildcard object pattern should match any object structure
                var expected = Map.of("...", "...");
                var actual = Map.of("any", "fields", "should", "match", "count", 42);

                var result = OutputValidator.expect(actual).toMatch(expected);
                assertTrue(result.isMatch(), "Object ellipsis should match any object structure");

                // Should also work with nested objects
                var actualNested = Map.of(
                        "level1", Map.of(
                                "level2", Map.of("deepValue", "test")
                        ),
                        "otherField", "value"
                );

                var result2 = OutputValidator.expect(actualNested).toMatch(expected);
                assertTrue(result2.isMatch(), "Object ellipsis should match nested structures");
            }

            @Test
            @DisplayName("Test object field ellipsis patterns")
            void testObjectFieldEllipsisPatterns() {
                // Test JSON object with ellipsis field values - the key real-world pattern
                String expectedWithEllipsis = "{\"_id\": \"...\", \"name\": \"test\"}";
                String actualJson = "{\"_id\": \"507f1f77bcf86cd799439013\", \"name\": \"test\"}";

                assertTrue(EllipsisPatternRegistry.isEllipsisPattern(expectedWithEllipsis));

                // Use high-level comparison API for JSON patterns instead of low-level matchesPattern
                ComparisonResult result1 = OutputValidator.expect(actualJson)
                        .toMatchContent(expectedWithEllipsis);
                assertTrue(result1.isMatch(), "JSON pattern with ellipsis should work via high-level API");

                // Test with mixed ellipsis and exact values
                String expectedMixed = "{\"_id\": \"...\", \"name\": \"exact\", \"date\": \"...\"}";
                String actualMixed = "{\"_id\": \"507f1f77bcf86cd799439013\", \"name\": \"exact\", \"date\": \"2023-01-01T12:00:00Z\"}";

                ComparisonResult result2 = OutputValidator.expect(actualMixed)
                        .toMatchContent(expectedMixed);
                assertTrue(result2.isMatch(), "Mixed ellipsis pattern should work via high-level API");

                // Should fail if non-ellipsis fields don't match
                String expectedStrict = "{\"_id\": \"...\", \"name\": \"expected\"}";
                String actualDifferent = "{\"_id\": \"507f1f77bcf86cd799439013\", \"name\": \"different\"}";

                ComparisonResult result3 = OutputValidator.expect(actualDifferent)
                        .toMatchContent(expectedStrict);
                assertFalse(result3.isMatch(), "Non-matching fields should fail via high-level API");
            }

            @Test
            @DisplayName("Ellipsis in nested object fields")
            void testEllipsisInNestedObjectFields() {
                var expected = Map.of(
                        "user", Map.of(
                                "name", "Alice",
                                "id", "...", // Any ID value acceptable
                                "profile", Map.of(
                                        "email", "alice@...", // Any domain acceptable
                                        "lastLogin", "..." // Any timestamp acceptable
                                )
                        ),
                        "timestamp", "..."
                );

                var actual = Map.of(
                        "user", Map.of(
                                "name", "Alice",
                                "id", "user123456",
                                "profile", Map.of(
                                        "email", "alice@example.com",
                                        "lastLogin", "2023-01-01T12:34:56Z"
                                )
                        ),
                        "timestamp", "2023-01-01T15:00:00Z"
                );

                var result = OutputValidator.expect(actual).toMatch(expected);
                assertTrue(result.isMatch(), "Nested ellipsis patterns should work");
            }

            @Test
            @DisplayName("Should handle object field ellipsis patterns")
            void testObjectFieldEllipsis() {
                Map<String, Object> expected = Map.of("type", "user", "data", "...");
                Map<String, Object> actual = Map.of("type", "user", "data", Map.of("name", "Alice"));

                ComparisonResult result = OutputValidator.expect(actual).toMatch(expected);

                assertTrue(result.isMatch(),
                        "Object field ellipsis should work with new functionality. Errors: " + result.errors());
            }

            @Test
            @DisplayName("Should handle JSON object with ellipsis fields")
            void testJsonObjectEllipsis() {
                Map<String, Object> actualObj = Map.of(
                        "_id", "507f1f77bcf86cd799439013",
                        "createdAt", "2021-12-20T11:33:20Z",
                        "myNumber", 36520312L,
                        "isActive", true,
                        "rating", 4.5
                );

                String expectedJson = """
            {"_id": "...", "createdAt": "...", "myNumber": 36520312, "isActive": true, "rating": 4.5}
            """;

                ComparisonResult result = OutputValidator.expect(actualObj).toMatchContent(expectedJson);

                assertTrue(result.isMatch(),
                        "JSON object with ellipsis fields should match. Errors: " + result.errors());
            }
        }

        @Nested
        public class StringPatterns {
            @Test
            @DisplayName("Basic string content comparison should work")
            void testBasicStringComparison() {
                String expected = "Inserted document with id: 507f1f77bcf86cd799439013";
                String actual = "Inserted document with id: 507f1f77bcf86cd799439013";

                ComparisonResult result = OutputValidator.expect(actual)
                        
                        .toMatchContent(expected);

                assertTrue(result.isMatch(), "Basic string comparison should succeed");
            }

            @Test
            @DisplayName("Truncated string patterns with ellipsis")
            void testTruncatedStringPatterns() {
                // Prefix with ellipsis
                var expected1 = "Error: Connection failed...";
                var actual1 = "Error: Connection failed after 30 seconds with timeout";

                var result1 = OutputValidator.expect(actual1).toMatch(expected1);
                assertTrue(result1.isMatch(), "Prefix ellipsis should match");

                // Suffix with ellipsis
                var expected2 = "...operation completed successfully";
                var actual2 = "Background operation completed successfully";

                var result2 = OutputValidator.expect(actual2).toMatch(expected2);
                assertTrue(result2.isMatch(), "Suffix ellipsis should match");

                // Middle ellipsis
                var expected3 = "Error: ... operation failed";
                var actual3 = "Error: Network timeout operation failed";

                var result3 = OutputValidator.expect(actual3).toMatch(expected3);
                assertTrue(result3.isMatch(), "Middle ellipsis should match");

                // Should fail when pattern doesn't match
                var actualWrong = "Success: Operation completed successfully";
                var result4 = OutputValidator.expect(actualWrong).toMatch(expected1);
                assertFalse(result4.isMatch(), "Should fail when prefix doesn't match");
            }

            @Test
            @DisplayName("Test string patterns with embedded ellipsis")
            void testStringPatternsWithEmbeddedEllipsis() {
                // Test console output patterns like those in real MongoDB documentation
                String actualOutput = "Inserted documents with the following ids: [507f1f77bcf86cd799439011, 507f1f77bcf86cd799439012]";
                String expectedPattern = "Inserted documents with the following ids: [...]";

                assertTrue(EllipsisPatternRegistry.isEllipsisPattern(expectedPattern));
                assertTrue(EllipsisPatternRegistry.matchesPattern(expectedPattern, actualOutput));

                // Test bulk write result patterns
                String bulkResultOutput = "AcknowledgedBulkWriteResult{insertedCount=2, matchedCount=2, removedCount=1}";
                String bulkPattern = "AcknowledgedBulkWriteResult{...}";
                assertTrue(EllipsisPatternRegistry.matchesPattern(bulkPattern, bulkResultOutput));

                // Array patterns in strings
                var expected1 = "Inserted documents with ids: [...]";
                var actual1 = "Inserted documents with ids: [507f1f77bcf86cd799439011, 507f1f77bcf86cd799439012]";

                var result1 = OutputValidator.expect(actual1).toMatch(expected1);
                assertTrue(result1.isMatch(), "Array ellipsis in strings should match");

                // Object patterns in strings
                var expected2 = "Query result: {...}";
                var actual2 = "Query result: {name: 'Alice', age: 25, status: 'active'}";

                var result2 = OutputValidator.expect(actual2).toMatch(expected2);
                assertTrue(result2.isMatch(), "Object ellipsis in strings should match");

                // Mixed patterns
                var expected3 = "Processing [...] items with status {...}";
                var actual3 = "Processing [item1, item2, item3] items with status {pending: 2, complete: 1}";

                var result3 = OutputValidator.expect(actual3).toMatch(expected3);
                assertTrue(result3.isMatch(), "Mixed ellipsis patterns should match");
            }

            @Test
            @DisplayName("Test error message patterns with embedded data")
            void testErrorMessagePatterns() {
                // Pattern from exception handling in real MongoDB docs
                String actualErrorMessage = "A MongoBulkWriteException occurred, but there are successfully processed documents with the following ids: [3, 4]";
                String expectedWithEllipsis = "A MongoBulkWriteException occurred, but there are successfully processed documents with the following ids: [...]";

                ComparisonResult result = OutputValidator.expect(actualErrorMessage)
                        .toMatchContent(expectedWithEllipsis);

                if (!result.isMatch()) {
                    System.out.println("=== ERROR MESSAGE PATTERN TEST FAILURE ===");
                    result.printDebugInfo();
                }

                assertTrue(result.isMatch(), "Error message patterns with embedded data should work");
            }

            @Test
            @DisplayName("Should handle string ellipsis patterns through StringComparator")
            void testStringComparatorEllipsisHandling() {
                String expected = "Inserted documents with ids: [...]";
                String actual = "Inserted documents with ids: [507f1f77bcf86cd799439013, 507f1f77bcf86cd799439014]";

                ComparisonOptions options = ComparisonOptions.defaultOptions();
                List<String> errors = StringComparator.compareStrings(expected, actual, options, "root");

                assertTrue(errors.isEmpty(),
                        "StringComparator should handle ellipsis patterns without errors. Errors: " + errors);
            }

            @Test
            @DisplayName("Should handle ellipsis patterns through OutputValidator")
            void testOutputValidatorStringContent() {
                String expected = "Inserted documents with ids: [...]";
                String actual = "Inserted documents with ids: [507f1f77bcf86cd799439013, 507f1f77bcf86cd799439014]";

                ComparisonResult result = OutputValidator.expect(actual)
                        
                        .toMatchContent(expected);

                assertTrue(result.isMatch(),
                        "OutputValidator should handle ellipsis patterns. Errors: " + result.errors());
            }

            @Test
            @DisplayName("Should handle ellipsis patterns through manual STRING_CONTENT options")
            void testManualStringContentOptions() {
                String expected = "Inserted documents with ids: [...]";
                String actual = "Inserted documents with ids: [507f1f77bcf86cd799439013, 507f1f77bcf86cd799439014]";

                // Note: String vs structural comparison is now automatically detected
                ComparisonOptions options = ComparisonOptions.builder()
                        .build();

                // The library should now automatically detect that this is string content
                // and handle ellipsis patterns appropriately

                ComparisonResult result = mongodb.comparison.ComparisonEngine.compare(expected, actual, options);

                assertTrue(result.isMatch(),
                        "Automatic content detection should handle ellipsis patterns in strings. Errors: " + result.errors());
            }

            @Test
            @DisplayName("Should handle various ellipsis string patterns")
            void testVariousEllipsisStringPatterns() {
                // Test different ellipsis patterns that should work
                testEllipsisPattern("Error: ...", "Error: Connection timeout");
                testEllipsisPattern("Result: [...]", "Result: [1, 2, 3]");
                testEllipsisPattern("Status: ... (complete)", "Status: processing (complete)");
                testEllipsisPattern("...", "any content");
                testEllipsisPattern("prefix...", "prefix with suffix");
                testEllipsisPattern("...suffix", "prefix with suffix");
            }

            @Test
            @DisplayName("Should handle complex nested ellipsis patterns")
            void testComplexNestedEllipsisPatterns() {
                String expected = "Result: {status: 'success', data: [...], metadata: {...}}";
                String actual = "Result: {status: 'success', data: [1, 2, 3], metadata: {timestamp: '2023-01-01', version: '1.0'}}";

                ComparisonResult result = OutputValidator.expect(actual)
                        
                        .toMatchContent(expected);

                assertTrue(result.isMatch(),
                        "Complex nested ellipsis patterns should work. Errors: " + result.errors());
            }

            @Test
            @DisplayName("Should handle multi-line ellipsis patterns with proper regex conversion")
            void testMultiLineEllipsisPatterns() {
                String connectionOutput = """
            Connected to MongoDB using reactive streams driver
            Database: sample_restaurants
            Collection: restaurants
            """;

                String expectedPattern = """
            Connected to MongoDB using reactive streams driver
            Database: ...
            Collection: ...
            """;

                ComparisonResult result = OutputValidator.expect(connectionOutput)
                        
                        .toMatchContent(expectedPattern);

                assertTrue(result.isMatch(),
                        "Multi-line ellipsis patterns should work correctly. Errors: " + result.errors());
            }

            @Test
            @DisplayName("Multi-line console output should work")
            void testMultiLineConsoleOutput() {
                String expected = """
            Processing bulk write operation...
            Inserted documents with ids: [...]
            Operation completed successfully
            """;
                String actual = """
            Processing bulk write operation...
            Inserted documents with ids: [507f1f77bcf86cd799439013, 507f1f77bcf86cd799439014]
            Operation completed successfully
            """;

                ComparisonResult result = OutputValidator.expect(actual)
                        
                        .toMatchContent(expected);

                assertTrue(result.isMatch(), "Multi-line console output should work");
            }

            @Test
            @DisplayName("ObjectId patterns in strings should work")
            void testObjectIdPatternsInStrings() {
                String expected = "Found document with _id: ObjectId(\"...\")";
                String actual = "Found document with _id: ObjectId(\"507f1f77bcf86cd799439013\")";

                ComparisonResult result = OutputValidator.expect(actual)
                        
                        .toMatchContent(expected);

                assertTrue(result.isMatch(), "ObjectId patterns should be recognized");
            }

            @Test
            @DisplayName("Mixed text and JSON-like content should work")
            void testMixedTextAndJsonContent() {
                String expected = "Query result: {\"name\": \"...\", \"count\": 42}";
                String actual = "Query result: {\"name\": \"John Doe\", \"count\": 42}";

                ComparisonResult result = OutputValidator.expect(actual)
                        
                        .toMatchContent(expected);

                assertTrue(result.isMatch(), "Mixed text and JSON should work");
            }

            @Test
            @DisplayName("Log messages with timestamps should work")
            void testLogMessagesWithTimestamps() {
                String expected = "2023-09-04T10:30:00 - Operation completed with result: ...";
                String actual = "2023-09-04T10:30:00 - Operation completed with result: BulkWriteResult{acknowledged=true}";

                ComparisonResult result = OutputValidator.expect(actual)
                        
                        .toMatchContent(expected);

                assertTrue(result.isMatch(), "Log messages should work with ellipsis");
            }

            @Test
            @DisplayName("toString() output comparison should work")
            void testToStringOutputComparison() {
                String expected = "BulkWriteResult{acknowledged=true, insertedCount=..., deletedCount=0}";
                String actual = "BulkWriteResult{acknowledged=true, insertedCount=25, deletedCount=0}";

                ComparisonResult result = OutputValidator.expect(actual)
                        
                        .toMatchContent(expected);

                assertTrue(result.isMatch(), "toString() output should support ellipsis");
            }

            @Test
            @DisplayName("Whitespace normalization should work")
            void testWhitespaceNormalization() {
                String expected = "Result:   {\"status\": \"success\"}";
                String actual = "Result: {\"status\": \"success\"}";

                ComparisonResult result = OutputValidator.expect(actual)
                        
                        .toMatchContent(expected);

                assertTrue(result.isMatch(), "Whitespace should be normalized");
            }

            @Test
            @DisplayName("Error messages with embedded data should work")
            void testErrorMessagesWithEmbeddedData() {
                String expected = """
            MongoBulkWriteException occurred
            Successfully processed documents: [...]
            Failed documents: 2
            """;
                String actual = """
            MongoBulkWriteException occurred
            Successfully processed documents: [507f1f77bcf86cd799439013, 507f1f77bcf86cd799439014, 507f1f77bcf86cd799439015]
            Failed documents: 2
            """;

                ComparisonResult result = OutputValidator.expect(actual)
                        
                        .toMatchContent(expected);

                assertTrue(result.isMatch(), "Error messages with embedded data should work");
            }

            @Test
            @DisplayName("String comparison failure should provide helpful error")
            void testStringComparisonFailure() {
                String expected = "Expected result: SUCCESS";
                String actual = "Expected result: FAILURE";

                ComparisonResult result = OutputValidator.expect(actual)
                        
                        .toMatchContent(expected);

                assertFalse(result.isMatch(), "Mismatched strings should fail");

                // Check that the detailed error message contains "String content mismatch"
                boolean hasStringContentMismatchError = result.errors().stream()
                        .anyMatch(error -> error.getDetailedMessage().contains("String content mismatch"));

                assertTrue(hasStringContentMismatchError,
                        "Error should mention string content mismatch");
            }

            @Test
            @DisplayName("Array representation in strings should work")
            void testArrayRepresentationInStrings() {
                String expected = "Categories: [\"Pizza\", \"Italian\", ...]";
                String actual = "Categories: [\"Pizza\", \"Italian\", \"Coffee\", \"Sandwiches\"]";

                ComparisonResult result = OutputValidator.expect(actual)
                        
                        .toMatchContent(expected);

                assertTrue(result.isMatch(), "Array representations should support ellipsis");
            }

            @Test
            @DisplayName("Empty ellipsis should match any content")
            void testEmptyEllipsis() {
                String expected = "...";
                String actual = "Any content here including newlines\nand multiple lines\nwith various data";

                ComparisonResult result = OutputValidator.expect(actual)
                        
                        .toMatchContent(expected);

                assertTrue(result.isMatch(), "Pure ellipsis should match any content");
            }

            @Test
            @DisplayName("Collection toString() methods should be handled")
            void testCollectionToStringMethods() {
                // Test when actual value is a collection that gets converted to string
                java.util.List<String> actualList = java.util.List.of("item1", "item2", "item3");
                String expected = "[item1, item2, ...]";

                ComparisonResult result = OutputValidator.expect(actualList)
                        
                        .toMatchContent(expected);

                assertTrue(result.isMatch(), "Collection objects should be converted to strings properly");
            }

            @Test
            @DisplayName("Document toString() with ellipsis should work")
            void testDocumentToStringWithEllipsis() {
                String expected = "Document{{name=..., active=true}}";
                String actual = "Document{{name=John Doe, active=true}}";

                ComparisonResult result = OutputValidator.expect(actual)
                        
                        .toMatchContent(expected);

                assertTrue(result.isMatch(), "Document toString() format should support ellipsis");
            }

            @Test
            @DisplayName("Reactive streams result toString() should work")
            void testReactiveStreamsResultToString() {
                String expected = "Mono.fromPublisher(...)";
                String actual = "Mono.fromPublisher(reactor.core.publisher.FluxFlatMap@1a2b3c4d)";

                ComparisonResult result = OutputValidator.expect(actual)
                        
                        .toMatchContent(expected);

                assertTrue(result.isMatch(), "Reactive streams toString() should work");
            }

            @Test
            @DisplayName("Convenience assertion methods should work")
            void testConvenienceAssertionMethods() {
                String expected = "Operation result: ...";
                String actual = "Operation result: SUCCESS";

                // Should not throw an exception
                assertDoesNotThrow(() -> {
                    OutputValidator.expect(actual)
                            
                            .assertMatchesContent(expected);
                }, "Assertion should pass for matching content");

                // Should throw for non-matching content
                assertThrows(AssertionError.class, () -> {
                    OutputValidator.expect("Different content")
                            
                            .assertMatchesContent(expected);
                }, "Assertion should fail for non-matching content");
            }
        }

        @Test
        @DisplayName("Should validate multi-line regex conversion logic")
        void testMultiLineRegexConversion() {
            // Test the specific regex conversion that was debugged
            String expected = "Processing [...] items with status {...}";
            String actual = "Processing [item1, item2, item3] items with status {pending: 2, complete: 1}";

            // Test regex conversion manually to ensure it works correctly
            String convertedRegex = convertEllipsisToRegex(expected);
            assertNotNull(convertedRegex, "Regex conversion should not return null");
            assertTrue(convertedRegex.contains(".*"), "Converted regex should contain wildcard patterns");

            // Test with actual Pattern matching
            java.util.regex.Pattern pattern = java.util.regex.Pattern.compile(convertedRegex, java.util.regex.Pattern.DOTALL);
            assertTrue(pattern.matcher(actual).matches(),
                    "Generated regex should match the actual string");

            // Test through OutputValidator
            ComparisonResult result = OutputValidator.expect(actual)
                    
                    .toMatchContent(expected);

            assertTrue(result.isMatch(),
                    "Multi-line regex conversion should work through OutputValidator. Errors: " + result.errors());
        }

        @Test
        @DisplayName("Driver-specific result object patterns")
        void testDriverSpecificResultObjectPatterns() {
            // Test patterns from MongoDB Java driver result objects

            // InsertOneResult pattern
            String insertOneResultPattern = """
            AcknowledgedInsertOneResult{insertedId=507f1f77bcf86cd799439011}
            """;

            // Should match with ellipsis
            String insertOneExpected = """
            AcknowledgedInsertOneResult{insertedId=...}
            """;

            assertDoesNotThrow(() -> OutputValidator.expect(insertOneResultPattern)
                            
                            .assertMatchesContent(insertOneExpected),
                    "Should handle InsertOneResult toString() patterns");

            // InsertManyResult pattern
            String insertManyResultPattern = """
            AcknowledgedInsertManyResult{insertedIds=[0=507f1f77bcf86cd799439011, 1=507f1f77bcf86cd799439012]}
            """;

            String insertManyExpected = """
            AcknowledgedInsertManyResult{insertedIds=[...]}
            """;

            assertDoesNotThrow(() -> OutputValidator.expect(insertManyResultPattern)
                            
                            .assertMatchesContent(insertManyExpected),
                    "Should handle InsertManyResult toString() patterns");

            // UpdateResult pattern
            String updateResultPattern = """
            AcknowledgedUpdateResult{matchedCount=2, modifiedCount=1, upsertedId=null}
            """;

            String updateExpected = """
            AcknowledgedUpdateResult{matchedCount=..., modifiedCount=..., upsertedId=null}
            """;

            assertDoesNotThrow(() -> OutputValidator.expect(updateResultPattern)
                            
                            .assertMatchesContent(updateExpected),
                    "Should handle UpdateResult toString() patterns");
        }


    }

    /**
     * Regression tests for ellipsis pattern matching integration.
     *
     * These tests ensure that the critical ellipsis functionality works end-to-end
     * through the complete OutputValidator pipeline. This functionality can be difficult
     * to debug because of the complex interactions between conditions and code paths. This core
     * set of tests can help us keep an eye out for regressions we've triggered repeatedly.
     *
     * Key test cases:
     * - Simple ellipsis patterns ("...")
     * - JSON field ellipsis ({"_id": "...", "name": "test"})
     * - Array ellipsis patterns ({"tags": [...]})
     * - String embedded ellipsis ("Result: [...]")
     */
    @Nested
    public class IntegrationRegressionTests {
        @Test
        @DisplayName("REGRESSION: Simple ellipsis pattern matching")
        void testSimpleEllipsisPattern() {
            // This was the core pattern failing before the September 2025 fix
            // ExpectedOutputParser was trying to parse "..." as JSON and failing
            var result = OutputValidator.expect("anything")
                    .toMatchContent("...");

            assertTrue(result.isMatch(), "Simple ellipsis should match any content");
        }

        @Test
        @DisplayName("REGRESSION: Ellipsis in JSON field values")
        void testEllipsisInJsonPatterns() {
            // This tests the fix for complex JSON with ellipsis field values
            // The fix ensures these are parsed as JSON then ellipsis-matched at field level
            org.bson.Document actualDoc = org.bson.Document.parse("{\"_id\":\"507f1f77bcf86cd799439013\",\"name\":\"test\"}");

            var result = OutputValidator.expect(actualDoc)
                    .toMatchContent("{\"_id\": \"...\", \"name\": \"test\"}");

            assertTrue(result.isMatch(), "JSON with ellipsis fields should match");
        }

        @Test
        @DisplayName("REGRESSION: Array ellipsis patterns in JSON")
        void testArrayEllipsisInJson() {
            // This tests the fix for array ellipsis patterns [...]
            // The fix normalizes [...] to ["..."] before JSON parsing,
            // then handles ellipsis matching in ArrayComparator
            org.bson.Document actualDoc = new org.bson.Document("_id", 1)
                    .append("tags", java.util.Arrays.asList("red", "blue", "green"));

            var result = OutputValidator.expect(actualDoc)
                    .toMatchContent("{\"_id\": 1, \"tags\": [...]}");

            assertTrue(result.isMatch(), "JSON with array ellipsis should match");
        }

        @Test
        @DisplayName("REGRESSION: String embedded ellipsis patterns")
        void testEllipsisInStringOutput() {
            // This tests ellipsis in string content (not JSON)
            // Common pattern in MongoDB documentation for console output
            String actualOutput = "Inserted documents with ids: [507f1f77bcf86cd799439013, 507f1f77bcf86cd799439014]";

            var result = OutputValidator.expect(actualOutput)
                    .toMatchContent("Inserted documents with ids: [...]");

            assertTrue(result.isMatch(), "String with array ellipsis should match");
        }

        @Test
        @DisplayName("REGRESSION: Regular JSON parsing still works")
        void testRegularJsonStillWorks() {
            // Ensures the ellipsis fix didn't break normal JSON comparison
            org.bson.Document actualDoc = org.bson.Document.parse("{\"name\":\"test\",\"value\":42}");
            String expectedJson = "{\"name\":\"test\",\"value\":42}";

            var result = OutputValidator.expect(actualDoc)
                    .toMatchContent(expectedJson);

            assertTrue(result.isMatch(), "Regular JSON matching should still work");
        }

        @Test
        @DisplayName("REGRESSION: Non-matching content appropriately fails")
        void testNonMatchingContentFails() {
            // Ensures the ellipsis fix didn't make everything match
            String actualOutput = "Some specific content";
            String expectedOutput = "Different specific content";

            var result = OutputValidator.expect(actualOutput)
                    .toMatchContent(expectedOutput);

            assertFalse(result.isMatch(), "Non-matching content should still fail");
        }
    }

    /**
     * Focused tests for the EllipsisPatternRegistry.
     */
    @Nested
    public class PatternRegistry {
        @Test
        void testCoreMatchesMethod() {
            // Global ellipsis
            assertTrue(EllipsisPatternRegistry.matches("...", "anything", "test"));
            assertTrue(EllipsisPatternRegistry.matches("...", 42, "test"));
            assertTrue(EllipsisPatternRegistry.matches("...", null, "test"));

            // String patterns
            assertTrue(EllipsisPatternRegistry.matches("Error:...", "Error: Connection failed", "test"));
            assertTrue(EllipsisPatternRegistry.matches("...failed", "Connection failed", "test"));
            assertTrue(EllipsisPatternRegistry.matches("Error:...failed", "Error: Connection failed", "test"));
            assertFalse(EllipsisPatternRegistry.matches("Error:...", "Success: All good", "test"));

            // Map patterns
            Map<String, Object> expected = Map.of("_id", "...", "name", "Test");
            Map<String, Object> actual = Map.of("_id", "507f1f77bcf86cd799439011", "name", "Test");
            assertTrue(EllipsisPatternRegistry.matches(expected, actual, "test"));

            Map<String, Object> actualDiff = Map.of("_id", "507f1f77bcf86cd799439011", "name", "Different");
            assertFalse(EllipsisPatternRegistry.matches(expected, actualDiff, "test"));

            // Note: Array patterns are now handled directly by ArrayComparator, not EllipsisPatternRegistry
            // The registry only does detection, not matching for arrays

            // Exact equality
            assertTrue(EllipsisPatternRegistry.matches("exact", "exact", "test"));
            assertFalse(EllipsisPatternRegistry.matches("exact", "different", "test"));
        }

        @Test
        void testDetectGlobalEllipsis() {
            assertTrue(EllipsisPatternRegistry.detectGlobalEllipsis("..."));
            assertTrue(EllipsisPatternRegistry.detectGlobalEllipsis("Some text\n...\nMore text"));
            assertTrue(EllipsisPatternRegistry.detectGlobalEllipsis("  ...  "));
            assertFalse(EllipsisPatternRegistry.detectGlobalEllipsis("No ellipsis here"));
            assertFalse(EllipsisPatternRegistry.detectGlobalEllipsis("partial...ellipsis"));
            assertFalse(EllipsisPatternRegistry.detectGlobalEllipsis(""));
            assertFalse(EllipsisPatternRegistry.detectGlobalEllipsis(null));
        }

        @Test
        void testHasEllipsisPatterns() {
            assertTrue(EllipsisPatternRegistry.hasEllipsisPatterns("..."));
            assertTrue(EllipsisPatternRegistry.hasEllipsisPatterns("prefix..."));
            assertTrue(EllipsisPatternRegistry.hasEllipsisPatterns(Map.of("key", "...")));
            assertTrue(EllipsisPatternRegistry.hasEllipsisPatterns(List.of("normal", "...")));
            assertFalse(EllipsisPatternRegistry.hasEllipsisPatterns("normal string"));
            assertFalse(EllipsisPatternRegistry.hasEllipsisPatterns(Map.of("key", "value")));
            assertFalse(EllipsisPatternRegistry.hasEllipsisPatterns(List.of("A", "B")));
            assertFalse(EllipsisPatternRegistry.hasEllipsisPatterns(null));
        }

        @Test
        void testHasStringContentEllipsis() {
            assertTrue(EllipsisPatternRegistry.hasStringContentEllipsis("...", "anything"));
            assertTrue(EllipsisPatternRegistry.hasStringContentEllipsis("prefix...", "prefix and more"));
            assertTrue(EllipsisPatternRegistry.hasStringContentEllipsis("...suffix", "more and suffix"));
            assertFalse(EllipsisPatternRegistry.hasStringContentEllipsis("no ellipsis", "test"));
            assertFalse(EllipsisPatternRegistry.hasStringContentEllipsis("prefix...", "different"));
            assertFalse(EllipsisPatternRegistry.hasStringContentEllipsis(123, "test"));
            assertFalse(EllipsisPatternRegistry.hasStringContentEllipsis("...", null));
        }

        @Test
        void testCompatibilityMethods() {
            // These methods provide backward compatibility for migration
            assertTrue(EllipsisPatternRegistry.isEllipsisPattern("..."));
            assertTrue(EllipsisPatternRegistry.isEllipsisPattern("prefix..."));
            assertFalse(EllipsisPatternRegistry.isEllipsisPattern("normal"));
            assertFalse(EllipsisPatternRegistry.isEllipsisPattern(123));

            assertTrue(EllipsisPatternRegistry.matchesPattern("...", "anything"));
            assertTrue(EllipsisPatternRegistry.matchesPattern("prefix...", "prefix test"));
            assertFalse(EllipsisPatternRegistry.matchesPattern("exact", "different"));
        }
    }

    @Test
    @DisplayName("Should convert ellipsis patterns to correct regex")
    void testEllipsisToRegexConversion() {
        String expected = "Inserted documents with ids: [...]";
        String actual = "Inserted documents with ids: [507f1f77bcf86cd799439013, 507f1f77bcf86cd799439014]";

        // Test the regex conversion logic
        String regex = convertEllipsisToRegex(expected);
        assertEquals("\\QInserted documents with ids: [\\E.*?\\Q]\\E", regex);

        // Test that the regex actually matches
        Pattern pattern = Pattern.compile(regex, Pattern.DOTALL);
        assertTrue(pattern.matcher(actual).matches(),
                "Generated regex should match the actual string");
    }

    // Helper methods for testing individual ellipsis patterns
    private void testEllipsisPattern(String expected, String actual) {
        ComparisonResult result = OutputValidator.expect(actual)
                
                .toMatchContent(expected);

        assertTrue(result.isMatch(),
                String.format("Pattern '%s' should match '%s'. Errors: %s", expected, actual, result.errors()));
    }

    private String convertEllipsisToRegex(String expected) {
        StringBuilder regex = new StringBuilder();
        String remaining = expected;

        while (remaining.contains("...")) {
            int ellipsisIndex = remaining.indexOf("...");

            // Add the part before ellipsis (quoted)
            String beforeEllipsis = remaining.substring(0, ellipsisIndex);
            if (!beforeEllipsis.isEmpty()) {
                regex.append(Pattern.quote(beforeEllipsis));
            }

            // Add the ellipsis replacement
            regex.append(".*?");

            // Continue with the part after ellipsis
            remaining = remaining.substring(ellipsisIndex + 3);
        }

        // Add any remaining part (quoted)
        if (!remaining.isEmpty()) {
            regex.append(Pattern.quote(remaining));
        }

        return regex.toString();
    }
}
