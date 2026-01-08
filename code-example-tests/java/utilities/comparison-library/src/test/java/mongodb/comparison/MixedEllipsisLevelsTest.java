package mongodb.comparison;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Tests to verify Java handles mixing property-level and document-level ellipsis.
 * This feature was added to mongosh in commit 67d16af07bc and C# in commit ddd298d9877ab.
 *
 * These tests verify that Java already handles this correctly.
 */
class MixedEllipsisLevelsTest {

    @Test
    @DisplayName("Property-level ellipsis with document-level ellipsis - should parse and match")
    void testPropertyEllipsisWithDocumentEllipsis() {
        // This pattern has:
        // 1. Property-level ellipsis: { "_id": "..." } - matches any value for _id
        // 2. Document-level ellipsis: standalone "..." - allows extra fields in all objects
        // NOTE: The parser merges multiple documents with "..." into a single document
        String expectedContent = """
                { "_id": "..." , "name": "Carl" }
                ...
                { "status": "active" }
                """;

        // Actual output with extra fields that should be allowed by document-level ellipsis
        // NOTE: Since the parser merges documents, the actual should be a single Map
        var actualOutput = Map.of(
            "_id", "507f1f77bcf86cd799439011",
            "name", "Carl",
            "status", "active",
            "email", "carl@example.com",  // Extra field - allowed by "..."
            "age", 30,                     // Extra field - allowed by "..."
            "lastLogin", "2024-01-01"      // Extra field - allowed by "..."
        );

        // This should match because:
        // 1. "_id": "..." matches any value for _id
        // 2. Standalone "..." allows extra fields (email, age, lastLogin)
        Expect.that(actualOutput).shouldMatch(expectedContent);
    }

    @Test
    @DisplayName("Property-level ellipsis only (no document-level) - should NOT allow extra fields")
    void testPropertyEllipsisOnly() {
        String expectedContent = "{ \"_id\": \"...\" , \"name\": \"Carl\" }";

        var actualWithExtraFields = Map.of(
            "_id", "507f1f77bcf86cd799439011",
            "name", "Carl",
            "email", "carl@example.com"  // Extra field - NOT allowed without "..."
        );

        // Without standalone "...", extra fields should cause a mismatch
        assertThrows(AssertionError.class, () ->
            Expect.that(actualWithExtraFields).shouldMatch(expectedContent)
        );
    }

    @Test
    @DisplayName("Document-level ellipsis only (no property-level) - should allow extra fields")
    void testDocumentEllipsisOnly() {
        // NOTE: The parser merges multiple documents with "..." into a single document
        String expectedContent = """
                { "name": "Carl" }
                ...
                { "status": "active" }
                """;

        // NOTE: Since the parser merges documents, the actual should be a single Map
        var actualOutput = Map.of(
            "name", "Carl",
            "status", "active",
            "email", "carl@example.com",  // Extra field - allowed by "..."
            "age", 30,                     // Extra field - allowed by "..."
            "lastLogin", "2024-01-01"      // Extra field - allowed by "..."
        );

        Expect.that(actualOutput).shouldMatch(expectedContent);
    }

    @Test
    @DisplayName("Mixed ellipsis in arrays - property ellipsis with array ellipsis")
    void testMixedEllipsisInArray() {
        String expectedContent = """
                [
                  { "_id": "..." , "count": "..." },
                  { "_id": "..." , "count": "..." },
                  "..."
                ]
                """;

        var actualOutput = List.of(
            Map.of("_id", "group1", "count", 10),
            Map.of("_id", "group2", "count", 20),
            Map.of("_id", "group3", "count", 30),  // Extra element - allowed by "..."
            Map.of("_id", "group4", "count", 40)   // Extra element - allowed by "..."
        );

        Expect.that(actualOutput).shouldMatch(expectedContent);
    }

    @Test
    @DisplayName("Nested objects with mixed ellipsis levels")
    void testNestedObjectsWithMixedEllipsis() {
        String expectedContent = """
                {
                  "user": {
                    "_id": "...",
                    "name": "Alice"
                  },
                  "timestamp": "..."
                }
                ...
                """;

        var actualOutput = Map.of(
            "user", Map.of(
                "_id", "user123",
                "name", "Alice",
                "email", "alice@example.com"  // Extra field in nested object
            ),
            "timestamp", "2024-01-01T12:00:00Z",
            "requestId", "req-456",            // Extra field at top level - allowed by "..."
            "source", "api"                    // Extra field at top level - allowed by "..."
        );

        Expect.that(actualOutput).shouldMatch(expectedContent);
    }
}

