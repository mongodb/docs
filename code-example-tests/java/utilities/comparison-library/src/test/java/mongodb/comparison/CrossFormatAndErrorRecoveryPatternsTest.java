package mongodb.comparison;

import org.bson.Document;
import org.bson.types.ObjectId;
import org.bson.types.Decimal128;
import org.bson.json.JsonMode;
import org.bson.json.JsonWriterSettings;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Tests for cross-format MongoDB driver patterns and error recovery scenarios.
 * These tests identify implementation gaps in handling different JSON formats and error conditions.
 */
class CrossFormatAndErrorRecoveryPatternsTest {

    @Test
    @DisplayName("Should handle Extended JSON vs Relaxed JSON format differences")
    void testExtendedVsRelaxedJsonFormats() {
        // Real driver pattern - same document in different JSON formats
        ObjectId testId = new ObjectId("507f1f77bcf86cd799439011");
        Date testDate = new Date(1640995200000L);
        Decimal128 price = new Decimal128(new BigDecimal("299.99"));

        Document document = new Document("_id", testId)
            .append("createdAt", testDate)
            .append("price", price)
            .append("active", true);

        // Extended JSON format (with $oid, $date, $numberDecimal)
        JsonWriterSettings extendedSettings = JsonWriterSettings.builder()
            .outputMode(JsonMode.EXTENDED)
            .build();

        // Relaxed JSON format (simplified representations)
        JsonWriterSettings relaxedSettings = JsonWriterSettings.builder()
            .outputMode(JsonMode.RELAXED)
            .build();

        String extendedJson = document.toJson(extendedSettings);
        String relaxedJson = document.toJson(relaxedSettings);

        // Both formats should match the same ellipsis pattern
        String expectedPattern = """
            {"_id": "...", "createdAt": "...", "price": "...", "active": true}
            """;

        assertDoesNotThrow(() -> {
            Expect.that(extendedJson)
                
                .shouldMatch(expectedPattern);
        }, "Extended JSON format should match ellipsis pattern");

        assertDoesNotThrow(() -> {
            Expect.that(relaxedJson)
                
                .shouldMatch(expectedPattern);
        }, "Relaxed JSON format should match ellipsis pattern");
    }

    @Test
    @DisplayName("Should handle Document toString() vs JSON format differences")
    void testDocumentToStringVsJsonFormats() {
        // Real driver pattern - Document.toString() vs Document.toJson()
        Document document = new Document("_id", new ObjectId("507f1f77bcf86cd799439011"))
            .append("name", "Test Restaurant")
            .append("rating", 4.5)
            .append("tags", Arrays.asList("casual", "family-friendly"));

        String documentToString = document.toString();
        String documentToJson = document.toJson();

        // The same ellipsis pattern should work for both formats
        String expectedPattern = """
            {"_id": "...", "name": "Test Restaurant", "rating": 4.5, "tags": ["casual", "family-friendly"]}
            """;

        // This tests format normalization
        assertDoesNotThrow(() -> {
            Expect.that(documentToJson)
                
                .shouldMatch(expectedPattern);
        }, "Document.toJson() should match pattern");

        // This may fail due to Document.toString() format differences
        assertDoesNotThrow(() -> {
            Expect.that(documentToString)
                
                .shouldMatch(expectedPattern);
        }, "Document.toString() should also match pattern after normalization");
    }

    @Test
    @DisplayName("Should handle List<Document> toString() format vs JSON array")
    void testDocumentListFormatDifferences() {
        // Real driver pattern - List<Document> toString() vs JSON array format
        List<Document> documents = Arrays.asList(
            new Document("_id", new ObjectId("507f1f77bcf86cd799439011"))
                .append("name", "Restaurant A"),
            new Document("_id", new ObjectId("507f1f77bcf86cd799439012"))
                .append("name", "Restaurant B")
        );

        String listToString = documents.toString();

        // JSON array format expectation
        String expectedJsonArrayPattern = """
            [
                {"_id": "...", "name": "Restaurant A"},
                {"_id": "...", "name": "Restaurant B"}
            ]
            """;

        // JSON Lines format expectation
        String expectedJsonLinesPattern = """
            {"_id": "...", "name": "Restaurant A"}
            {"_id": "...", "name": "Restaurant B"}
            """;

        // This tests format normalization capabilities
        assertDoesNotThrow(() -> {
            Expect.that(documents)
                .shouldMatch(expectedJsonLinesPattern);
        }, "List<Document> should match JSON Lines pattern");

        // This may reveal implementation gaps in toString() format handling
        assertDoesNotThrow(() -> {
            Expect.that(listToString)
                
                .shouldMatch(expectedJsonArrayPattern);
        }, "List<Document>.toString() should match JSON array pattern after normalization");
    }

    @Test
    @DisplayName("Should handle malformed JSON with error recovery")
    void testMalformedJsonErrorRecovery() {
        // Real driver patterns - malformed or incomplete JSON output
        String malformedJson = """
            {"_id": ObjectId("507f1f77bcf86cd799439011"), "name": "Test", "date": ISODate("2022-01-01T00:00:00Z")
            """; // Missing closing brace

        String expectedPattern = """
            {"_id": "...", "name": "Test", "date": "..."}
            """;

        // This tests error recovery and parsing robustness
        try {
            Expect.that(malformedJson)
                
                .shouldMatch(expectedPattern);
        } catch (AssertionError e) {
            // Document the error for implementation improvement
            System.err.println("Error recovery needed for malformed JSON: " + e.getMessage());
            // For now, we expect this might fail, indicating implementation gap
            assertTrue(e.getMessage().contains("parsing") || e.getMessage().contains("format"),
                "Should provide helpful parsing error message");
        }
    }

    @Test
    @DisplayName("Should handle POJO class toString() vs JSON serialization")
    void testPojoToStringVsJsonSerialization() {
        // Real driver pattern - POJO objects with custom toString()
        String pojoToString = """
            Restaurant{id=507f1f77bcf86cd799439011, name='MongoDB Cafe', cuisine='American', rating=4.5, active=true}
            """;

        String jsonSerialization = """
            {"id": "507f1f77bcf86cd799439011", "name": "MongoDB Cafe", "cuisine": "American", "rating": 4.5, "active": true}
            """;

        // The same logical pattern should match both representations
        String expectedPattern = """
            {"id": "...", "name": "MongoDB Cafe", "cuisine": "American", "rating": 4.5, "active": true}
            """;

        assertDoesNotThrow(() -> {
            Expect.that(jsonSerialization)
                
                .shouldMatch(expectedPattern);
        }, "JSON serialization should match pattern");

        // This tests POJO toString() format normalization
        assertDoesNotThrow(() -> {
            Expect.that(pojoToString)
                
                .shouldMatch(expectedPattern);
        }, "POJO toString() should match pattern after normalization");
    }

    @Test
    @DisplayName("Should handle mixed precision numeric types")
    void testMixedNumericTypePrecision() {
        // Real driver pattern - numeric precision variations
        Document document1 = new Document("price", 299.99); // double
        Document document2 = new Document("price", 299); // int
        Document document3 = new Document("price", new Decimal128(new BigDecimal("299.99"))); // Decimal128

        // All should match the same ellipsis pattern despite different numeric types
        String expectedPattern = """
            {"price": ...}
            """;

        assertDoesNotThrow(() -> {
            Expect.that(Arrays.asList(document1))
                .shouldMatch(expectedPattern);
        }, "Double precision should match pattern");

        assertDoesNotThrow(() -> {
            Expect.that(Arrays.asList(document2))
                .shouldMatch(expectedPattern);
        }, "Integer should match pattern");

        assertDoesNotThrow(() -> {
            Expect.that(Arrays.asList(document3))
                .shouldMatch(expectedPattern);
        }, "Decimal128 should match pattern");
    }

    @Test
    @DisplayName("Should handle driver timeout and connection error patterns")
    void testDriverErrorPatternRecovery() {
        // Real driver error patterns from documentation
        String connectionTimeoutError = """
            Exception in thread "main" com.mongodb.MongoTimeoutException:
            Timed out after 30000 ms while waiting for a server that matches WritableServerSelector.
            Client view of cluster state is {type=REPLICA_SET, servers=[
                {address=cluster0-shard-00-00.abc123.mongodb.net:27017, type=REPLICA_SET_SECONDARY, state=CONNECTED},
                {address=cluster0-shard-00-01.abc123.mongodb.net:27017, type=REPLICA_SET_PRIMARY, state=CONNECTED},
                {address=cluster0-shard-00-02.abc123.mongodb.net:27017, type=REPLICA_SET_SECONDARY, state=CONNECTED}
            ]}
            """;

        String authenticationError = """
            Exception in thread "main" com.mongodb.MongoSecurityException:
            Exception authenticating MongoCredential{mechanism=SCRAM-SHA-256, userName='testuser', source='admin', password=<hidden>, mechanismProperties=<hidden>}
            """;

        // Should handle complex error messages with ellipsis
        String expectedTimeoutPattern = """
            Exception in thread "main" com.mongodb.MongoTimeoutException:
            Timed out after 30000 ms while waiting for a server that matches WritableServerSelector.
            Client view of cluster state is {...}
            """;

        String expectedAuthPattern = """
            Exception in thread "main" com.mongodb.MongoSecurityException:
            Exception authenticating MongoCredential{mechanism=SCRAM-SHA-256, userName='testuser', source='admin', password=<hidden>, mechanismProperties=<hidden>}
            """;

        assertDoesNotThrow(() -> {
            Expect.that(connectionTimeoutError)
                
                .shouldMatch(expectedTimeoutPattern);
        }, "Connection timeout errors should match pattern");

        assertDoesNotThrow(() -> {
            Expect.that(authenticationError)
                
                .shouldMatch(expectedAuthPattern);
        }, "Authentication errors should match pattern");
    }

    @Test
    @DisplayName("Should handle Unicode and special characters in MongoDB data")
    void testUnicodeAndSpecialCharacterPatterns() {
        // Real driver pattern - MongoDB data with Unicode and special characters
        Document unicodeDocument = new Document("_id", new ObjectId("507f1f77bcf86cd799439011"))
            .append("name", "Café München") // Unicode characters
            .append("description", "A restaurant with \"special\" quotes and 'mixed quotes'")
            .append("emoji", "🍕🍝") // Emoji characters
            .append("currency", "€"); // Currency symbol

        String expectedPattern = """
            {"_id": "...", "name": "Café München", "description": "A restaurant with \"special\" quotes and 'mixed quotes'", "emoji": "🍕🍝", "currency": "€"}
            """;

        System.out.println("=== UNICODE TEST DEBUG ===");
        System.out.println("Actual Document: " + unicodeDocument);
        System.out.println("Expected Pattern: " + expectedPattern.trim());

        // Let's test the comparison engine directly
        System.out.println("\n=== DIRECT COMPARISON ENGINE TEST ===");
        try {
            ComparisonResult directResult = mongodb.comparison.ComparisonEngine.compareWithContent(
                unicodeDocument, expectedPattern.trim(), ComparisonOptions.defaultOptions());
            System.out.println("Direct comparison result: " + directResult.isMatch());
            if (!directResult.isMatch()) {
                System.out.println("Direct comparison summary: " + directResult.summary());
                System.out.println("Direct comparison errors: " + directResult.errors().size());
                if (!directResult.errors().isEmpty()) {
                    var firstError = directResult.errors().get(0);
                    System.out.println("First error path: " + firstError.path());
                    System.out.println("First error message: " + firstError.message());
                }
            }
        } catch (Exception e) {
            System.out.println("Direct comparison error: " + e.getMessage());
            e.printStackTrace();
        }

        // Try with STRING_CONTENT mode explicitly
        System.out.println("\n=== AUTOMATIC CONTENT DETECTION TEST ===");
        try {
            // The library now automatically detects content type - no need to specify STRING_CONTENT
            ComparisonOptions options = ComparisonOptions.builder()
                .build();
            ComparisonResult result = mongodb.comparison.ComparisonEngine.compareWithContent(
                unicodeDocument, expectedPattern.trim(), options);
            System.out.println("Automatic detection result: " + result.isMatch());
            if (!result.isMatch()) {
                System.out.println("Automatic detection summary: " + result.summary());
            }
        } catch (Exception e) {
            System.out.println("String content error: " + e.getMessage());
            e.printStackTrace();
        }

        // Let's use the same normalization that the comparison engine uses
        System.out.println("\n=== NORMALIZATION DEBUG ===");
        try {
            Object normalizedActual = mongodb.comparison.internal.ValueNormalizer.normalize(unicodeDocument);
            Object normalizedExpected = mongodb.comparison.internal.ValueNormalizer.normalize(expectedPattern.trim());

            System.out.println("Normalized Actual: " + normalizedActual);
            System.out.println("Normalized Expected: " + normalizedExpected);
            System.out.println("Normalized Actual Type: " + (normalizedActual != null ? normalizedActual.getClass().getName() : "null"));
            System.out.println("Normalized Expected Type: " + (normalizedExpected != null ? normalizedExpected.getClass().getName() : "null"));

            if (normalizedActual != null && normalizedExpected != null) {
                System.out.println("Normalized values equal: " + normalizedActual.equals(normalizedExpected));
            }

            // Let's test the ellipsis pattern matching directly
            if (normalizedExpected instanceof java.util.Map && normalizedActual instanceof java.util.Map) {
                java.util.Map<?,?> expectedMap = (java.util.Map<?,?>) normalizedExpected;
                java.util.Map<?,?> actualMap = (java.util.Map<?,?>) normalizedActual;

                System.out.println("\n=== MAP FIELD ANALYSIS ===");
                for (java.util.Map.Entry<?,?> entry : expectedMap.entrySet()) {
                    Object key = entry.getKey();
                    Object expectedValue = entry.getValue();
                    Object actualValue = actualMap.get(key);

                    System.out.printf("Field '%s': expected='%s' (%s), actual='%s' (%s)%n",
                        key, expectedValue, expectedValue != null ? expectedValue.getClass().getSimpleName() : "null",
                        actualValue, actualValue != null ? actualValue.getClass().getSimpleName() : "null");

                    // Test ellipsis matching for this field
                    if ("...".equals(expectedValue)) {
                        System.out.printf("  -> Field '%s' has ellipsis pattern, should match anything%n", key);
                    } else {
                        System.out.printf("  -> Field '%s' exact match: %s%n", key, java.util.Objects.equals(expectedValue, actualValue));

                        // If it's the description field, do detailed character analysis
                        if ("description".equals(key) && expectedValue instanceof String && actualValue instanceof String) {
                            String expStr = (String) expectedValue;
                            String actStr = (String) actualValue;
                            System.out.println("    DETAILED CHARACTER ANALYSIS:");
                            System.out.println("    Expected length: " + expStr.length());
                            System.out.println("    Actual length: " + actStr.length());

                            int maxLen = Math.max(expStr.length(), actStr.length());
                            boolean foundDiff = false;
                            for (int i = 0; i < maxLen; i++) {
                                char expChar = i < expStr.length() ? expStr.charAt(i) : '?';
                                char actChar = i < actStr.length() ? actStr.charAt(i) : '?';
                                if (expChar != actChar) {
                                    System.out.printf("    CHAR DIFF at pos %d: expected='%c' (U+%04X) vs actual='%c' (U+%04X)%n",
                                        i, expChar, (int)expChar, actChar, (int)actChar);
                                    foundDiff = true;
                                    if (foundDiff) break; // Show first difference only
                                }
                            }
                            if (!foundDiff) {
                                System.out.println("    No character differences found!");
                            }
                        }
                    }
                }

                // Test the full ellipsis pattern matching
                boolean ellipsisMatches = mongodb.comparison.internal.EllipsisPatternRegistry.matches(normalizedExpected, normalizedActual, "");
                System.out.println("\nEllipsis pattern matches: " + ellipsisMatches);
            }
        } catch (Exception e) {
            System.out.println("Normalization error: " + e.getMessage());
            e.printStackTrace();
        }

        try {
            Expect.that(unicodeDocument)
                .shouldMatch(expectedPattern);
            System.out.println("Unicode test PASSED");
        } catch (AssertionError e) {
            System.out.println("Unicode test FAILED: " + e.getMessage());
            throw e;
        }
    }
}
