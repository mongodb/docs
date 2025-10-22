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
        Expect.that(actualResult)
            .shouldMatch(actualResult);
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
        assertThrows(AssertionError.class, () ->
                Expect.that(actualResult).shouldMatch(expectedResult));

        // Should match when comparing with itself
        Expect.that(actualResult)
            .shouldMatch(actualResult);
    }

    @Test
    @DisplayName("Binary data handling - used in GridFS and file storage")
    void testBinaryDataHandling() {
        var binaryData = new Binary("Hello, World!".getBytes());

        var actualResult = Map.of(
            "fileData", binaryData,
            "checksum", "abc123"
        );

        Expect.that(actualResult)
            .shouldMatch(actualResult);
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

        Expect.that(actualResult)
            .shouldMatch(actualResult);
    }

    @Test
    @DisplayName("Java Pattern/Regex handling in queries")
    void testPatternHandling() {
        var pattern = Pattern.compile("^[A-Z][a-z]+$", Pattern.CASE_INSENSITIVE);

        var actualResult = Map.of(
            "namePattern", pattern,
            "flags", pattern.flags()
        );

        Expect.that(actualResult)
            .shouldMatch(actualResult);
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
        Expect.that(extendedJsonData)
            .shouldMatch(extendedJsonData);
    }

    @Test
    @DisplayName("Numeric type compatibility tests")
    void testNumericTypeCompatibilityEdgeCases() {
        // Test various numeric type combinations that could cause issues

        // Integer vs Double comparison
        var intVal = 42;
        var doubleVal = 42.0;
        Expect.that(intVal).shouldMatch(doubleVal);

        // Float vs Double comparison
        var floatVal = 85.5f;
        var doubleVal2 = 85.5;
        Expect.that(floatVal).shouldMatch(doubleVal2);

        // Long vs Integer comparison
        var longVal = 1000L;
        var intVal2 = 1000;
        Expect.that(longVal).shouldMatch(intVal2);

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

        Expect.that(actualDoc).shouldMatch(expectedDoc);
    }

    @Test
    @DisplayName("Null handling edge cases")
    void testNullHandlingEdgeCases() {
        // Test direct null vs non-null
        assertThrows(AssertionError.class, () ->
                Expect.that("not null").shouldMatch(null));

        // Test map with null value vs non-null value
        var expected = new java.util.HashMap<String, Object>();
        expected.put("nullField", null);
        var actual = Map.of("nullField", "not null");

        assertThrows(AssertionError.class, () ->
                Expect.that(actual).shouldMatch(expected));

        // Test non-null vs null
        var expected3 = Map.of("field", "value");
        var actual3 = new java.util.HashMap<String, Object>();
        actual3.put("field", null);

        assertThrows(AssertionError.class, () ->
                Expect.that(actual3).shouldMatch(expected3));
    }

    @Test
    @DisplayName("String error message validation")
    void testStringErrorMessageValidation() {
        String expected = "This is the expected string";
        String actual = "This is the actual string";

        assertThrows(AssertionError.class, () ->
                Expect.that(actual).shouldMatch(expected));
    }
}
