package examples;

import mongodb.comparison.OutputValidator;
import org.bson.Document;
import org.junit.jupiter.api.Test;

import java.util.List;

/**
 * Example test demonstrating the new comparison library API.
 * This shows how technical writers can use the library in practice.
 */
class ComparisonLibraryUsageExample {

    @Test
    void exampleBasicUsage() {
        // Simulate query results from MongoDB driver
        List<Document> actualResults = List.of(
            Document.parse("{\"name\": \"Alice\", \"age\": 30, \"city\": \"New York\"}"),
            Document.parse("{\"name\": \"Bob\", \"age\": 25, \"city\": \"Los Angeles\"}")
        );

        // Or with full control using the OutputValidator API
        OutputValidator.expect(actualResults)
            .withUnorderedArrays()              // Results can be in any order
            .withIgnoredFields("_id")           // Ignore dynamic fields
            .toMatchFile("expected-results.txt")
            .assertSuccess();                   // Throw on mismatch
    }

    @Test
    void exampleOrderedComparison() {
        // Results that must maintain specific order (e.g., sorted queries)
        List<Document> sortedResults = List.of(
            Document.parse("{\"name\": \"Alice\", \"score\": 95}"),
            Document.parse("{\"name\": \"Bob\", \"score\": 87}"),
            Document.parse("{\"name\": \"Charlie\", \"score\": 92}")
        );

        OutputValidator.expect(sortedResults)
            .withOrderedArrays()                // Order matters
            .assertMatchesFile("sorted-expected.txt");
    }

    @Test
    void exampleDebugOutput() {
        // When tests fail, get detailed debug information
        List<Document> results = List.of(
            Document.parse("{\"name\": \"Alice\", \"age\": 30}")
        );

        var comparisonResult = OutputValidator.expect(results)
            .toMatchFile("expected-results.txt");

        if (!comparisonResult.isMatch()) {
            // Print detailed comparison info to help diagnose issues
            comparisonResult.printDebugInfo();

            // Or use enhanced assertion that prints debug info automatically
            // comparisonResult.assertSuccessWithDebug();
        }
    }

    @Test
    void exampleDirectComparison() {
        // Compare against expected data directly (not from file)
        List<Document> actualResults = List.of(
            Document.parse("{\"status\": \"active\", \"count\": 42}")
        );

        List<Document> expectedResults = List.of(
            Document.parse("{\"status\": \"active\", \"count\": 42}")
        );

        OutputValidator.expect(actualResults)
            .assertMatches(expectedResults);
    }

    @Test
    void exampleComplexConfiguration() {
        List<Document> results = getComplexQueryResults();

        OutputValidator.expect(results)
            .withUnorderedArrays()              // Flexible array ordering
            .withIgnoredFields("_id", "timestamp", "version")  // Skip dynamic fields
            .assertMatchesFileWithDebug("complex-expected.txt");  // Debug on failure
    }

    private List<Document> getComplexQueryResults() {
        return List.of(
            Document.parse("{\"id\": 1, \"data\": {\"nested\": \"value\"}, \"tags\": [\"a\", \"b\"]}"),
            Document.parse("{\"id\": 2, \"data\": {\"nested\": \"other\"}, \"tags\": [\"c\", \"d\"]}")
        );
    }
}
