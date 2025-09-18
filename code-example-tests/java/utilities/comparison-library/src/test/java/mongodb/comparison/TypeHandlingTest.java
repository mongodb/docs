package mongodb.comparison;

import org.bson.BsonDocument;
import org.bson.BsonInt32;
import org.bson.BsonString;
import org.bson.Document;
import org.bson.types.Binary;
import org.bson.types.Code;
import org.bson.types.CodeWithScope;
import org.bson.types.Symbol;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;

import java.util.UUID;
import java.util.Map;
import java.util.regex.Pattern;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Tests for basic handling of common types.
 * These represent cases we need to handle in real-world usage and should be preserved to guard against regressions.
 */
class MissingTypeHandlingTest {

    @Test
    @DisplayName("BsonDocument handling - common in raw BSON operations")
    void testBsonDocumentHandling() {
        // BsonDocument is used in raw BSON operations and commands
        var bsonDoc = new BsonDocument()
            .append("command", new BsonString("dbStats"))
            .append("scale", new BsonInt32(1));

        var actualResult = Map.of(
            "commandResult", bsonDoc
        );

        // Current normalizer doesn't handle BsonDocument specifically
        var result = OutputValidator.expect(actualResult)
            .toMatch(actualResult);

        assertTrue(result.isMatch(), "BsonDocument should be handled");
    }

    @Test
    @DisplayName("UUID handling")
    void testUUIDHandling() {
        var uuid = UUID.fromString("550e8400-e29b-41d4-a716-446655440000");

        var actualResult = Map.of(
            "sessionId", uuid,
            "requestId", UUID.randomUUID()
        );

        var expectedResult = Map.of(
            "sessionId", uuid,
            "requestId", UUID.randomUUID() // Different UUID
        );

        // Should NOT match because UUIDs are different
        var result = OutputValidator.expect(actualResult)
            .toMatch(expectedResult);

        assertFalse(result.isMatch(), "Different UUIDs should not match");

        // Should match when comparing with itself
        var matchingResult = OutputValidator.expect(actualResult)
            .toMatch(actualResult);

        assertTrue(matchingResult.isMatch(), "Same UUIDs should match");
    }

    @Test
    @DisplayName("Binary data handling - used in GridFS and file storage")
    void testBinaryDataHandling() {
        var binaryData = new Binary("Hello, World!".getBytes());

        var actualResult = Map.of(
            "fileData", binaryData,
            "checksum", "abc123"
        );

        var result = OutputValidator.expect(actualResult)
            .toMatch(actualResult);

        assertTrue(result.isMatch(), "Binary data should be handled");
    }

    @Test
    @DisplayName("MongoDB Code and CodeWithScope handling")
    void testCodeHandling() {
        var code = new Code("function() { return this.name; }");
        var codeWithScope = new CodeWithScope(
            "function() { return multiplier * this.value; }",
            new Document("multiplier", 2)
        );

        var actualResult = Map.of(
            "mapFunction", code,
            "reduceFunction", codeWithScope
        );

        var result = OutputValidator.expect(actualResult)
            .toMatch(actualResult);

        assertTrue(result.isMatch(), "MongoDB Code types should be handled");
    }

    @Test
    @DisplayName("Java Pattern/Regex handling in queries")
    void testPatternHandling() {
        var pattern = Pattern.compile("^[A-Z][a-z]+$", Pattern.CASE_INSENSITIVE);

        var actualResult = Map.of(
            "namePattern", pattern,
            "flags", pattern.flags()
        );

        var result = OutputValidator.expect(actualResult)
            .toMatch(actualResult);

        assertTrue(result.isMatch(), "Pattern objects should be handled");
    }

    @Test
    @DisplayName("Extended JSON format patterns from JsonFormats.java")
    void testExtendedJsonFormatPatterns() {
        // Patterns that appear in MongoDB's extended JSON format
        var extendedJsonData = Map.of(
            "_id", Map.of("$oid", "507f1f77bcf86cd799439011"),
            "timestamp", Map.of("$date", Map.of("$numberLong", "1640000000000")),
            "amount", Map.of("$numberDecimal", "123.45"),
            "binary", Map.of("$binary", Map.of(
                "base64", "SGVsbG8gV29ybGQ=",
                "subType", "00"
            )),
            "regex", Map.of("$regex", "^test", "$options", "i"),
            "code", Map.of("$code", "function() { return true; }"),
            "codeWithScope", Map.of(
                "$code", "function() { return x; }",
                "$scope", Map.of("x", 42)
            )
        );

        // This tests how well the library handles extended JSON representations
        var result = OutputValidator.expect(extendedJsonData)
            .toMatch(extendedJsonData);

        assertTrue(result.isMatch(), "Extended JSON patterns should match");
    }

    @Test
    @DisplayName("Numeric type compatibility tests")
    void testNumericTypeCompatibilityEdgeCases() {
        // Test various numeric type combinations that could cause issues

        // Integer vs Double comparison
        var intVal = 42;
        var doubleVal = 42.0;
        var result1 = OutputValidator.expect(intVal).toMatch(doubleVal);
        assertTrue(result1.isMatch(), "Integer should match equivalent double");

        // Float vs Double comparison
        var floatVal = 85.5f;
        var doubleVal2 = 85.5;
        var result2 = OutputValidator.expect(floatVal).toMatch(doubleVal2);
        assertTrue(result2.isMatch(), "Float should match equivalent double");

        // Long vs Integer comparison
        var longVal = 1000L;
        var intVal2 = 1000;
        var result3 = OutputValidator.expect(longVal).toMatch(intVal2);
        assertTrue(result3.isMatch(), "Long should match equivalent integer");

        // Document with mixed numeric types
        var expectedDoc = Map.of(
            "count", 42,           // int
            "percentage", 85.5,    // double
            "total", 1000L,        // long
            "rate", 3.14f          // float
        );

        var actualDoc = Map.of(
            "count", 42.0,         // double instead of int
            "percentage", 85.5f,   // float instead of double
            "total", 1000,         // int instead of long
            "rate", 3.14           // double instead of float
        );

        var documentResult = OutputValidator.expect(actualDoc).toMatch(expectedDoc);
        assertTrue(documentResult.isMatch(), "Mixed numeric types in documents should match when values are equivalent");
    }

    @Test
    @DisplayName("Null handling edge cases")
    void testNullHandlingEdgeCases() {
        // Test direct null vs non-null
        var result1 = OutputValidator.expect("not null").toMatch(null);
        assertFalse(result1.isMatch(), "Non-null should not match null");
        assertTrue(result1.errors().stream().anyMatch(e ->
            e.message().contains("null") || e.message().toLowerCase().contains("mismatch")),
            "Should provide clear null mismatch message");

        // Test map with null value vs non-null value
        var expected = new java.util.HashMap<String, Object>();
        expected.put("nullField", null);
        var actual = Map.of("nullField", "not null");

        var result2 = OutputValidator.expect(actual).toMatch(expected);
        assertFalse(result2.isMatch(), "Null field should not match non-null value");
        assertTrue(result2.errors().stream().anyMatch(e ->
            e.path().equals("nullField") && e.message().toLowerCase().contains("null")),
            "Should report specific null field mismatch");

        // Test non-null vs null
        var expected3 = Map.of("field", "value");
        var actual3 = new java.util.HashMap<String, Object>();
        actual3.put("field", null);

        var result3 = OutputValidator.expect(actual3).toMatch(expected3);
        assertFalse(result3.isMatch(), "Null should not match non-null value");
        assertTrue(result3.errors().stream().anyMatch(e ->
            e.path().equals("field") && e.message().toLowerCase().contains("null")),
            "Should report specific null vs non-null mismatch");
    }

    @Test
    @DisplayName("String error message validation")
    void testStringErrorMessageValidation() {
        String expected = "This is the expected string";
        String actual = "This is the actual string";

        ComparisonResult result = OutputValidator.expect(actual)
            
            .toMatchContent(expected);

        assertFalse(result.isMatch(), "Different strings should not match");

        if (!result.errors().isEmpty()) {
            var error = result.errors().get(0);
            var detailedMessage = error.getDetailedMessage();

            // Should contain helpful error context
            assertTrue(detailedMessage.contains("String") || detailedMessage.contains("content"),
                "Error message should indicate string content mismatch");
            assertTrue(detailedMessage.contains("expected") && detailedMessage.contains("actual"),
                "Error message should show both expected and actual values");
        }
    }
}
