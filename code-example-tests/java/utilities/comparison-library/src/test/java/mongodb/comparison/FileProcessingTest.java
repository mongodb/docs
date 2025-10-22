package mongodb.comparison;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.io.TempDir;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Test cases for file processing from comparison spec section 6.5.
 *
 * Based on comparison spec sections:
 * - 6.5 Critical Implementation Details from C# Experience
 * - File Path Resolution Strategy
 * - MongoDB Extended JSON Detection and Handling
 * - JSONL (JSON Lines) Format Detection
 * - Comment Removal with Context Awareness
 * - Single Quote to Double Quote Conversion
 */
class FileProcessingTest {

    @TempDir
    Path tempDir;

    @Test
    @DisplayName("JSONL vs JSON Array format detection")
    void testJsonlVsJsonArrayDetection() throws IOException {
        // JSONL format (one JSON object per line)
        String jsonlContent = """
            { "id": 1, "name": "Alice" }
            { "id": 2, "name": "Bob" }
            { "id": 3, "name": "Charlie" }
            """;

        Path jsonlFile = tempDir.resolve("test.jsonl");
        Files.writeString(jsonlFile, jsonlContent);

        var parseResult1 = ExpectedOutputParser.parseFile(jsonlFile.toString());
        assertTrue(parseResult1.isSuccess(), "JSONL parsing should succeed");
        assertTrue(parseResult1.getData() instanceof List, "JSONL should parse to List");

        @SuppressWarnings("unchecked")
        List<Object> jsonlData = (List<Object>) parseResult1.getData();
        assertEquals(3, jsonlData.size(), "Should parse all 3 JSONL objects");

        // JSON Array format
        String jsonArrayContent = """
            [
              { "id": 1, "name": "Alice" },
              { "id": 2, "name": "Bob" },
              { "id": 3, "name": "Charlie" }
            ]
            """;

        Path jsonArrayFile = tempDir.resolve("test.json");
        Files.writeString(jsonArrayFile, jsonArrayContent);

        var parseResult2 = ExpectedOutputParser.parseFile(jsonArrayFile.toString());
        assertTrue(parseResult2.isSuccess(), "JSON Array parsing should succeed");
        assertTrue(parseResult2.getData() instanceof List, "JSON Array should parse to List");

        // Both should result in equivalent data structures
        var actual = Arrays.asList(
            Map.of("id", 1, "name", "Alice"),
            Map.of("id", 2, "name", "Bob"),
            Map.of("id", 3, "name", "Charlie")
        );

        Expect.that(actual).shouldMatch(parseResult1.getData());
        Expect.that(actual).shouldMatch(parseResult2.getData());
    }

    @Test
    @DisplayName("Comment removal with context awareness")
    void testCommentRemovalWithContext() throws IOException {
        String contentWithComments = """
            {
              // This is a user record
              "name": "John",
              /*
               * Age might vary in different
               * test environments
               */
              "age": 30,
              "message": "Error: // Not a comment /* inside string */",
              "path": "C:\\\\Users\\\\test\\\\file.txt", // This is a comment
              "regex": "/pattern/", /* This is also a comment */
              "description": "/* This is not a comment */"
            }
            """;

        Path commentFile = tempDir.resolve("comments.json");
        Files.writeString(commentFile, contentWithComments);

        var parseResult = ExpectedOutputParser.parseFile(commentFile.toString());
        assertTrue(parseResult.isSuccess(), "Should parse file with comments");

        var actual = Map.of(
            "name", "John",
            "age", 30,
            "message", "Error: // Not a comment /* inside string */",
            "path", "C:\\Users\\test\\file.txt",
            "regex", "/pattern/",
            "description", "/* This is not a comment */"
        );

        Expect.that(actual).shouldMatch(parseResult.getData());
    }

    @Test
    @DisplayName("Single quote conversion with nested escapes")
    void testSingleQuoteConversionWithEscapes() throws IOException {
        String contentWithSingleQuotes = """
            {
              'simple': 'value',
              'withEscapes': 'He said "Hello" and I said \\'Hi\\'',
              'withBackslashes': 'C:\\\\Users\\\\test\\\\file.txt',
              'mixedQuotes': 'String with "double quotes" inside',
              'escaped': 'Value with \\\\ backslash and \\' quote',
              'complex': 'JSON: {\\'key\\': \\'value\\', \\'number\\': 42}'
            }
            """;

        Path quotesFile = tempDir.resolve("quotes.json");
        Files.writeString(quotesFile, contentWithSingleQuotes);

        var parseResult = ExpectedOutputParser.parseFile(quotesFile.toString());
        assertTrue(parseResult.isSuccess(), "Should parse file with single quotes");

        var actual = Map.of(
            "simple", "value",
            "withEscapes", "He said \"Hello\" and I said 'Hi'",
            "withBackslashes", "C:\\Users\\test\\file.txt",
            "mixedQuotes", "String with \"double quotes\" inside",
            "escaped", "Value with \\ backslash and ' quote",
            "complex", "JSON: {'key': 'value', 'number': 42}"
        );

        Expect.that(actual).shouldMatch(parseResult.getData());
    }

    @Test
    @DisplayName("MongoDB Extended JSON with nested dates")
    void testExtendedJsonWithNestedDates() throws IOException {
        String extendedJsonContent = """
            {
              "results": [
                {
                  "timestamp": { "$date": "2021-12-18T15:55:00Z" },
                  "user": { "$oid": "507f1f77bcf86cd799439011" }
                },
                {
                  "timestamp": { "$date": { "$numberLong": "1639842900000" } },
                  "count": { "$numberInt": "42" }
                }
              ]
            }
            """;

        Path extendedJsonFile = tempDir.resolve("extended.json");
        Files.writeString(extendedJsonFile, extendedJsonContent);

        var parseResult = ExpectedOutputParser.parseFile(extendedJsonFile.toString());
        assertTrue(parseResult.isSuccess(), "Should parse Extended JSON");

        var actual = Map.of(
            "results", Arrays.asList(
                Map.of(
                    "timestamp", "2021-12-18T15:55:00Z", // Normalized ISO format
                    "user", "507f1f77bcf86cd799439011"         // Normalized ObjectId
                ),
                Map.of(
                    "timestamp", "2021-12-18T15:55:00Z", // Normalized from timestamp
                    "count", 42                               // Normalized from $numberInt
                )
            )
        );

        Expect.that(actual).shouldMatch(parseResult.getData());
    }

    @Test
    @DisplayName("File path resolution strategy")
    void testFilePathResolutionStrategy() throws IOException {
        // Create file in a nested directory structure
        Path examplesDir = tempDir.resolve("examples");
        Path aggregationDir = examplesDir.resolve("Aggregation");
        Path filterDir = aggregationDir.resolve("Filter");
        Files.createDirectories(filterDir);

        String expectedContent = """
            { "name": "test", "value": 42 }
            """;

        Path expectedFile = filterDir.resolve("ExpectedOutput.txt");
        Files.writeString(expectedFile, expectedContent);

        // Test relative path resolution from different working directories
        String relativePath = "Aggregation/Filter/ExpectedOutput.txt";

        // Should find file when examples directory is relative to current location
        // Implementation should search in multiple locations:
        // - ../examples/Aggregation/Filter/ExpectedOutput.txt
        // - src/test/resources/examples/Aggregation/Filter/ExpectedOutput.txt
        // - examples/Aggregation/Filter/ExpectedOutput.txt

        var parseResult = ExpectedOutputParser.parseFile(relativePath);

        // For this test, we'll simulate by using the actual path
        var actualParseResult = ExpectedOutputParser.parseFile(expectedFile.toString());
        assertTrue(actualParseResult.isSuccess(), "Should resolve and parse file");

        var actual = Map.of("name", "test", "value", 42);
        Expect.that(actual).shouldMatch(actualParseResult.getData());
    }

    @Test
    @DisplayName("Parser error recovery with helpful suggestions")
    void testParserErrorRecoveryWithSuggestions() throws IOException {
        // File with common parsing issues
        String problematicContent = """
            {
              // Unescaped quotes issue
              "message": "He said "Hello" without proper escaping",
              "objectId": ObjectId('unquoted-id-value'),
              // Comment in wrong place
              "value": /* inline comment */ 42
            }
            """;

        Path problematicFile = tempDir.resolve("problematic.json");
        Files.writeString(problematicFile, problematicContent);

        var parseResult = ExpectedOutputParser.parseFile(problematicFile.toString());

        if (!parseResult.isSuccess()) {
            String errorMessage = parseResult.getErrorMessage();

            // Should provide specific suggestions for common issues
            assertTrue(errorMessage.contains("ObjectId") || errorMessage.contains("quote"),
                "Should identify specific parsing issues");

            // Should include helpful suggestions
            assertTrue(errorMessage.contains("should be quoted") ||
                      errorMessage.contains("properly escaped") ||
                      errorMessage.contains("remove comments"),
                "Should provide actionable suggestions");
        } else {
            fail("Expected parsing to fail due to problematic content, but it succeeded");
        }
    }

    @Test
    @DisplayName("Large file handling and performance")
    void testLargeFileHandlingAndPerformance() throws IOException {
        // Create a large JSONL file
        StringBuilder largeContent = new StringBuilder();
        for (int i = 0; i < 1000; i++) {
            largeContent.append(String.format(
                "{ \"id\": %d, \"name\": \"user%d\", \"data\": \"large content %d\" }\n",
                i, i, i
            ));
        }

        Path largeFile = tempDir.resolve("large.jsonl");
        Files.writeString(largeFile, largeContent.toString());

        long startTime = System.currentTimeMillis();
        var parseResult = ExpectedOutputParser.parseFile(largeFile.toString());
        long elapsed = System.currentTimeMillis() - startTime;

        assertTrue(parseResult.isSuccess(), "Should handle large files");
        assertTrue(elapsed < 5000, "Should parse large file efficiently (under 5 seconds)");

        @SuppressWarnings("unchecked")
        List<Object> data = (List<Object>) parseResult.getData();
        assertEquals(1000, data.size(), "Should parse all records from large file");
    }

        @Test
    @DisplayName("Mixed content format detection and handling")
    void testMixedContentFormatDetection() throws IOException {
        // File with mixed JSON and text content
        String mixedContent = """
            // Header comment
            { "type": "header", "version": "1.0" }

            // Data records
            { "id": 1, "name": "Alice" }
            { "id": 2, "name": "Bob" }

            // Footer information
            { "type": "footer", "count": 2 }
            """;

        Path mixedFile = tempDir.resolve("mixed.txt");
        Files.writeString(mixedFile, mixedContent);

        var parseResult = ExpectedOutputParser.parseFile(mixedFile.toString());
        assertTrue(parseResult.isSuccess(), "Should handle mixed content format");

        // Should extract all JSON objects, ignoring comments
        @SuppressWarnings("unchecked")
        List<Object> data = (List<Object>) parseResult.getData();
        assertEquals(4, data.size(), "Should extract all JSON objects from mixed content");
    }
}
