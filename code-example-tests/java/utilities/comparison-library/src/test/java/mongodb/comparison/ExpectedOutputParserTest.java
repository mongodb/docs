package mongodb.comparison;

import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Tests for ExpectedOutputParser functionality.
 * Tests parsing of MongoDB document syntax and various file formats.
 */
class ExpectedOutputParserTest {

    @Test
    void testSimpleJsonParsing() {
        var content = """
            { "name": "John", "age": 30, "active": true }
            """;

        var result = ExpectedOutputParser.parseContent(content);

        assertTrue(result.isSuccess());
        assertTrue(result.getData() instanceof Map);

        @SuppressWarnings("unchecked")
        var data = (Map<String, Object>) result.getData();
        assertEquals("John", data.get("name"));
        assertEquals(30, data.get("age"));
        assertEquals(true, data.get("active"));
    }

    @Test
    void testJsonLinesParsing() {
        var content = """
            { "id": 1, "name": "Alice" }
            { "id": 2, "name": "Bob" }
            { "id": 3, "name": "Charlie" }
            """;

        var result = ExpectedOutputParser.parseContent(content);

        assertTrue(result.isSuccess());
        assertTrue(result.getData() instanceof List);

        @SuppressWarnings("unchecked")
        var data = (List<Object>) result.getData();
        assertEquals(3, data.size());

        @SuppressWarnings("unchecked")
        var first = (Map<String, Object>) data.get(0);
        assertEquals(1, first.get("id"));
        assertEquals("Alice", first.get("name"));
    }

    @Test
    void testJsonArrayParsing() {
        var content = """
            [
              { "name": "first", "value": 1 },
              { "name": "second", "value": 2 }
            ]
            """;

        var result = ExpectedOutputParser.parseContent(content);

        assertTrue(result.isSuccess());
        assertTrue(result.getData() instanceof List);

        @SuppressWarnings("unchecked")
        var data = (List<Object>) result.getData();
        assertEquals(2, data.size());
    }

    @Test
    void testMongoSyntaxNormalization() {
        var content = """
            { name: 'John', _id: ObjectId('507f1f77bcf86cd799439011'), created: Date('2023-01-01T00:00:00Z') }
            """;

        var result = ExpectedOutputParser.parseContent(content);

        assertTrue(result.isSuccess());
        assertTrue(result.getData() instanceof Map);

        @SuppressWarnings("unchecked")
        var data = (Map<String, Object>) result.getData();
        assertEquals("John", data.get("name"));
        assertEquals("507f1f77bcf86cd799439011", data.get("_id"));
        assertEquals("2023-01-01T00:00:00Z", data.get("created"));
    }

    @Test
    void testEmptyContent() {
        var result = ExpectedOutputParser.parseContent("");

        assertTrue(result.isSuccess());
        assertTrue(result.getData() instanceof List);

        @SuppressWarnings("unchecked")
        var data = (List<Object>) result.getData();
        assertTrue(data.isEmpty());
    }

    @Test
    void testWhitespaceOnlyContent() {
        var result = ExpectedOutputParser.parseContent("   \n\t  \n  ");

        assertTrue(result.isSuccess());
        assertTrue(result.getData() instanceof List);

        @SuppressWarnings("unchecked")
        var data = (List<Object>) result.getData();
        assertTrue(data.isEmpty());
    }

    @Test
    void testFileParsingSuccess() {
        var result = ExpectedOutputParser.parseFile("test-data/simple-output.txt");

        assertTrue(result.isSuccess());
        assertTrue(result.getData() instanceof Map);

        @SuppressWarnings("unchecked")
        var data = (Map<String, Object>) result.getData();
        assertEquals("Alice", data.get("name"));
    }

    @Test
    void testFileParsingNotFound() {
        var result = ExpectedOutputParser.parseFile("non-existent-file.txt");

        assertFalse(result.isSuccess());
        assertNotNull(result.getErrorMessage());
        assertTrue(result.getErrorMessage().contains("File not found"));
    }

    @Test
    void testComplexNestedStructure() {
        var content = """
            {
              user: {
                _id: ObjectId('507f1f77bcf86cd799439011'),
                profile: {
                  name: 'Alice Johnson',
                  settings: {
                    notifications: true,
                    theme: 'dark'
                  }
                },
                tags: ['admin', 'power-user']
              }
            }
            """;

        var result = ExpectedOutputParser.parseContent(content);

        assertTrue(result.isSuccess());
        assertTrue(result.getData() instanceof Map);

        @SuppressWarnings("unchecked")
        var data = (Map<String, Object>) result.getData();
        @SuppressWarnings("unchecked")
        var user = (Map<String, Object>) data.get("user");
        @SuppressWarnings("unchecked")
        var profile = (Map<String, Object>) user.get("profile");

        assertEquals("507f1f77bcf86cd799439011", user.get("_id"));
        assertEquals("Alice Johnson", profile.get("name"));
    }

    @Test
    void testMixedQuotesNormalization() {
        var content = """
            { "name": 'John', 'status': "active", type: 'user' }
            """;

        var result = ExpectedOutputParser.parseContent(content);

        assertTrue(result.isSuccess());
        assertTrue(result.getData() instanceof Map);

        @SuppressWarnings("unchecked")
        var data = (Map<String, Object>) result.getData();
        assertEquals("John", data.get("name"));
        assertEquals("active", data.get("status"));
        assertEquals("user", data.get("type"));
    }

    @Test
    void testExtendedJsonFormat() {
        var content = """
            { "date": { "$date": "2021-12-18T15:55:00Z" }, "objectId": { "$oid": "507f1f77bcf86cd799439011" } }
            """;

        var result = ExpectedOutputParser.parseContent(content);

        assertTrue(result.isSuccess());
        assertTrue(result.getData() instanceof Map);

        // Note: Extended JSON normalization should be handled by the parser
        @SuppressWarnings("unchecked")
        var data = (Map<String, Object>) result.getData();
        assertNotNull(data.get("date"));
        assertNotNull(data.get("objectId"));
    }

    @Test
    void testJsonLinesWithExtendedJsonFormat() {
        // REGRESSION TEST: JSONL format detection should take priority over Extended JSON detection
        // This was failing before the fix where Extended JSON markers were preventing JSONL detection
        var content = """
            { "date": { "$date": "2021-12-18T15:55:00Z" }, "ticker": "MDB", "close": 254.03, "volume": 40270.0 }
            { "date": { "$date": "2021-12-18T15:56:00Z" }, "ticker": "MDB", "close": 253.63, "volume": 27890.0 }
            { "date": { "$date": "2021-12-18T15:57:00Z" }, "ticker": "MDB", "close": 253.62, "volume": 40182.0 }
            """;

        var result = ExpectedOutputParser.parseContent(content);

        assertTrue(result.isSuccess(), "JSONL with Extended JSON should parse successfully");
        assertTrue(result.getData() instanceof List, "Should be parsed as List (JSONL) not Map (single Extended JSON)");

        @SuppressWarnings("unchecked")
        var data = (List<Object>) result.getData();
        assertEquals(3, data.size(), "Should parse all 3 JSONL objects");

        // Verify first object contains Extended JSON date structure
        @SuppressWarnings("unchecked")
        var firstObject = (Map<String, Object>) data.get(0);
        assertTrue(firstObject.containsKey("date"), "Should contain date field");
        assertTrue(firstObject.containsKey("ticker"), "Should contain ticker field");
        assertEquals("MDB", firstObject.get("ticker"));
    }

    @Test
    void testStandaloneEllipsisAtFieldLevelIndicatesOmittedFields() {
        // Writer scenario: using `...` at the end of a document to indicate more fields are omitted
        // This pattern should be converted to `"...": "..."` for the comparison engine
        var content = """
            {
                "nErrors": 0,
                "ok": 1,
                ...
            }
            """;

        var result = ExpectedOutputParser.parseContent(content);

        assertTrue(result.isSuccess(), "Should successfully parse document with standalone ellipsis");
        assertTrue(result.getData() instanceof Map, "Should be parsed as a Map");

        @SuppressWarnings("unchecked")
        var data = (Map<String, Object>) result.getData();
        assertEquals(0, data.get("nErrors"), "Should contain nErrors field");
        assertEquals(1, data.get("ok"), "Should contain ok field");
        assertTrue(data.containsKey("..."), "Should contain ellipsis marker for omitted fields");
    }
}
