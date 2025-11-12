package mongodb.comparison;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.bson.Document;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Test Path object handling and single object vs single-element list scenarios.
 */
public class PathHandlingTest {

    @Nested
    @DisplayName("Path Object Handling")
    class PathObjectHandling {

        @Test
        @DisplayName("Should handle Path objects as file paths")
        void testPathObjectHandling() {
            // Create a Path object pointing to a test file
            Path testPath = Paths.get("src/test/resources/single-document.json");
            
            // Create actual data that should match the file content
            Document actualDoc = Document.parse("{\"name\": \"test\", \"value\": 42}");
            List<Document> actualList = List.of(actualDoc);
            
            // This should work without throwing "Type mismatch: expected UnixPath but got Array"
            assertDoesNotThrow(() -> {
                Expect.that(actualList).shouldMatch(testPath);
            });
        }

        @Test
        @DisplayName("Should handle Path objects with string conversion")
        void testPathStringConversion() {
            // Test that Path objects are properly converted to strings for file loading
            Path testPath = Paths.get("src/test/resources/single-document.json");
            String testPathString = testPath.toString();
            
            Document actualDoc = Document.parse("{\"name\": \"test\", \"value\": 42}");
            List<Document> actualList = List.of(actualDoc);
            
            // Both should work the same way
            assertDoesNotThrow(() -> {
                Expect.that(actualList).shouldMatch(testPath);
            });
            
            assertDoesNotThrow(() -> {
                Expect.that(actualList).shouldMatch(testPathString);
            });
        }
    }

    @Nested
    @DisplayName("Single Object vs Single-Element List")
    class SingleObjectVsSingleElementList {

        @Test
        @DisplayName("Should handle single object expected vs single-element list actual")
        void testSingleObjectVsSingleElementList() {
            // Expected: single object
            Document expectedDoc = Document.parse("{\"name\": \"test\", \"value\": 42}");
            
            // Actual: single-element list (common pattern from MongoDB queries)
            Document actualDoc = Document.parse("{\"name\": \"test\", \"value\": 42}");
            List<Document> actualList = List.of(actualDoc);
            
            // This should work - the comparison engine should extract the single element
            assertDoesNotThrow(() -> {
                Expect.that(actualList).shouldMatch(expectedDoc);
            });
        }

        @Test
        @DisplayName("Should handle single-element list expected vs single object actual")
        void testSingleElementListVsSingleObject() {
            // Expected: single-element list
            Document expectedDoc = Document.parse("{\"name\": \"test\", \"value\": 42}");
            List<Document> expectedList = List.of(expectedDoc);
            
            // Actual: single object
            Document actualDoc = Document.parse("{\"name\": \"test\", \"value\": 42}");
            
            // This should also work - the comparison engine should extract the single element
            assertDoesNotThrow(() -> {
                Expect.that(actualDoc).shouldMatch(expectedList);
            });
        }

        @Test
        @DisplayName("Should not extract elements from multi-element lists")
        void testMultiElementListsNotExtracted() {
            // Expected: multi-element list
            Document doc1 = Document.parse("{\"name\": \"test1\", \"value\": 42}");
            Document doc2 = Document.parse("{\"name\": \"test2\", \"value\": 43}");
            List<Document> expectedList = List.of(doc1, doc2);
            
            // Actual: single object
            Document actualDoc = Document.parse("{\"name\": \"test1\", \"value\": 42}");
            
            // This should fail - we don't extract from multi-element lists
            assertThrows(AssertionError.class, () -> {
                Expect.that(actualDoc).shouldMatch(expectedList);
            });
        }

        @Test
        @DisplayName("Should handle empty lists correctly")
        void testEmptyLists() {
            List<Document> emptyList = List.of();
            
            // Empty list vs empty list should work
            assertDoesNotThrow(() -> {
                Expect.that(emptyList).shouldMatch(List.of());
            });
            
            // Empty list vs null should fail
            assertThrows(AssertionError.class, () -> {
                Expect.that(emptyList).shouldMatch(null);
            });
        }
    }

    @Nested
    @DisplayName("Regression Tests")
    class RegressionTests {

        @Test
        @DisplayName("Should maintain existing behavior for normal comparisons")
        void testNormalComparisonsUnchanged() {
            // Test that normal object-to-object comparisons still work
            Document expected = Document.parse("{\"name\": \"test\", \"value\": 42}");
            Document actual = Document.parse("{\"name\": \"test\", \"value\": 42}");
            
            assertDoesNotThrow(() -> {
                Expect.that(actual).shouldMatch(expected);
            });
            
            // Test that normal list-to-list comparisons still work
            List<Document> expectedList = List.of(
                Document.parse("{\"name\": \"test1\", \"value\": 42}"),
                Document.parse("{\"name\": \"test2\", \"value\": 43}")
            );
            List<Document> actualList = List.of(
                Document.parse("{\"name\": \"test1\", \"value\": 42}"),
                Document.parse("{\"name\": \"test2\", \"value\": 43}")
            );
            
            assertDoesNotThrow(() -> {
                Expect.that(actualList).shouldMatch(expectedList);
            });
        }

        @Test
        @DisplayName("Should handle nested lists correctly")
        void testNestedListsNotAffected() {
            // Test that nested lists are not affected by the single-element extraction logic
            List<List<Document>> expectedNested = List.of(
                List.of(Document.parse("{\"name\": \"test1\", \"value\": 42}"))
            );
            List<List<Document>> actualNested = List.of(
                List.of(Document.parse("{\"name\": \"test1\", \"value\": 42}"))
            );
            
            assertDoesNotThrow(() -> {
                Expect.that(actualNested).shouldMatch(expectedNested);
            });
        }
    }
}
