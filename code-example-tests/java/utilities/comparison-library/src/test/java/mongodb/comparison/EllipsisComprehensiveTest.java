package mongodb.comparison;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Comprehensive test suite to verify all ellipsis pattern handling cases
 * based on investigations from other test utilities (mongosh, C#, Python, Go).
 *
 * Tests the following cases:
 * 1. String truncation with ellipsis
 * 2. Unquoted ellipsis as property values: { _id: ... , count: ... }
 * 3. Mixing property-level and array-level ellipsis: [{ _id: ... }, ...]
 * 4. Mixing property-level and document-level ellipsis with standalone ...
 * 5. Equivalence between quoted and unquoted ellipsis pattern
 */
class EllipsisComprehensiveTest {

    @Nested
    @DisplayName("Case 1: String truncation with ellipsis")
    class StringTruncation {

        @Test
        @DisplayName("Prefix truncation: 'Error: ...'")
        void testPrefixTruncation() {
            String expected = "Error: ...";
            String actual = "Error: Connection timeout after 30 seconds";
            Expect.that(actual).shouldMatch(expected);
        }

        @Test
        @DisplayName("Suffix truncation: '...completed successfully'")
        void testSuffixTruncation() {
            String expected = "...completed successfully";
            String actual = "Background operation completed successfully";
            Expect.that(actual).shouldMatch(expected);
        }

        @Test
        @DisplayName("Middle truncation: 'Error: ... failed'")
        void testMiddleTruncation() {
            String expected = "Error: ... failed";
            String actual = "Error: Network timeout operation failed";
            Expect.that(actual).shouldMatch(expected);
        }

        @Test
        @DisplayName("Array content truncation: 'ids: [...]'")
        void testArrayContentTruncation() {
            String expected = "Inserted documents with ids: [...]";
            String actual = "Inserted documents with ids: [507f1f77bcf86cd799439011, 507f1f77bcf86cd799439012]";
            Expect.that(actual).shouldMatch(expected);
        }
    }

    @Nested
    @DisplayName("Case 2: Unquoted ellipsis as property values")
    class UnquotedEllipsisPropertyValues {

        @Test
        @DisplayName("Unquoted ellipsis in JSON: { _id: ... }")
        void testUnquotedEllipsisInJson() {
            // Test with unquoted ellipsis - should be parsed correctly
            String expected = "{ \"_id\": ... , \"name\": \"Alice\" }";
            var actual = Map.of("_id", "507f1f77bcf86cd799439011", "name", "Alice");

            // This should work if parser handles unquoted ellipsis
            Expect.that(actual).shouldMatch(expected);
        }

        @Test
        @DisplayName("Multiple unquoted ellipsis: { _id: ..., count: ... }")
        void testMultipleUnquotedEllipsis() {
            String expected = "{ \"_id\": ... , \"count\": ... }";
            var actual = Map.of("_id", "group1", "count", 42);

            Expect.that(actual).shouldMatch(expected);
        }
    }

    @Nested
    @DisplayName("Case 3: Mixing property-level and array-level ellipsis")
    class MixedPropertyAndArrayEllipsis {

        @Test
        @DisplayName("Array with property ellipsis and array ellipsis: [{ _id: ... }, ...]")
        void testPropertyEllipsisWithArrayEllipsis() {
            String expected = """
                [
                  { "_id": "..." , "count": "..." },
                  { "_id": "..." , "count": "..." },
                  "..."
                ]
                """;

            var actual = List.of(
                Map.of("_id", "group1", "count", 10),
                Map.of("_id", "group2", "count", 20),
                Map.of("_id", "group3", "count", 30),  // Extra - allowed by "..."
                Map.of("_id", "group4", "count", 40)   // Extra - allowed by "..."
            );

            Expect.that(actual).shouldMatch(expected);
        }

        @Test
        @DisplayName("Array with unquoted property ellipsis: [{ _id: ..., count: ... }, ...]")
        void testUnquotedPropertyEllipsisWithArrayEllipsis() {
            String expected = """
                [
                  { "_id": ... , "count": ... },
                  "..."
                ]
                """;

            var actual = List.of(
                Map.of("_id", "group1", "count", 10),
                Map.of("_id", "group2", "count", 20)
            );

            Expect.that(actual).shouldMatch(expected);
        }
    }

    @Nested
    @DisplayName("Case 4: Mixing property-level and document-level ellipsis")
    class MixedPropertyAndDocumentEllipsis {

        @Test
        @DisplayName("Property ellipsis with standalone ... for extra fields")
        void testPropertyEllipsisWithDocumentEllipsis() {
            String expected = """
                { "_id": "..." , "name": "Carl" }
                ...
                { "status": "active" }
                """;

            var actual = Map.of(
                "_id", "507f1f77bcf86cd799439011",
                "name", "Carl",
                "status", "active",
                "email", "carl@example.com",  // Extra - allowed by "..."
                "age", 30                      // Extra - allowed by "..."
            );

            Expect.that(actual).shouldMatch(expected);
        }

        @Test
        @DisplayName("Unquoted property ellipsis with document ellipsis")
        void testUnquotedPropertyEllipsisWithDocumentEllipsis() {
            String expected = """
                { "_id": ... , "name": "Carl" }
                ...
                """;

            var actual = Map.of(
                "_id", "507f1f77bcf86cd799439011",
                "name", "Carl",
                "extra", "field"  // Extra - allowed by "..."
            );

            Expect.that(actual).shouldMatch(expected);
        }
    }

    @Nested
    @DisplayName("Case 5: Equivalence between quoted and unquoted ellipsis")
    class QuotedVsUnquotedEquivalence {

        @Test
        @DisplayName("Quoted '...' should equal unquoted ... in property values")
        void testQuotedUnquotedEquivalence() {
            var actual = Map.of("_id", "507f1f77bcf86cd799439011", "name", "Alice");

            // Both should work identically
            String quotedPattern = "{ \"_id\": \"...\" , \"name\": \"Alice\" }";
            String unquotedPattern = "{ \"_id\": ... , \"name\": \"Alice\" }";

            Expect.that(actual).shouldMatch(quotedPattern);
            Expect.that(actual).shouldMatch(unquotedPattern);
        }

        @Test
        @DisplayName("Quoted and unquoted should behave the same in arrays")
        void testQuotedUnquotedInArrays() {
            var actual = List.of(
                Map.of("_id", "1", "count", 10),
                Map.of("_id", "2", "count", 20)
            );

            String quotedPattern = """
                [
                  { "_id": "..." , "count": "..." },
                  "..."
                ]
                """;

            String unquotedPattern = """
                [
                  { "_id": ... , "count": ... },
                  "..."
                ]
                """;

            Expect.that(actual).shouldMatch(quotedPattern);
            Expect.that(actual).shouldMatch(unquotedPattern);
        }

        @Test
        @DisplayName("Standalone ... should work quoted or unquoted")
        void testStandaloneEllipsisEquivalence() {
            var actual = Map.of("name", "Alice", "extra", "field");

            // Both patterns should allow extra fields
            String quotedPattern = """
                { "name": "Alice" }
                "..."
                """;

            String unquotedPattern = """
                { "name": "Alice" }
                ...
                """;

            Expect.that(actual).shouldMatch(quotedPattern);
            Expect.that(actual).shouldMatch(unquotedPattern);
        }
    }
}
