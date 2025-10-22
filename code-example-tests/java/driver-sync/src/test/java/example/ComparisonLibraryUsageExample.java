package examples;

import mongodb.comparison.Expect;
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

        // Or with full control using the new Expect API
        Expect.that(actualResults)
            // Unordered comparison is the default behavior
            .withIgnoredFields("_id")                // Ignore dynamic fields
            .shouldMatch("expected-results.txt"); // Throw on mismatch
    }

    @Test
    void exampleOrderedComparison() {
        // Results that must maintain specific order (e.g., sorted queries)
        List<Document> sortedResults = List.of(
            Document.parse("{\"name\": \"Alice\", \"score\": 95}"),
            Document.parse("{\"name\": \"Bob\", \"score\": 87}"),
            Document.parse("{\"name\": \"Charlie\", \"score\": 92}")
        );

        Expect.that(sortedResults)
            .withOrderedSort()                  // Order matters
            .shouldMatch("sorted-expected.txt");
    }

    @Test
    void exampleDebugOutput() {
        // When tests fail, detailed debug information is included in the AssertionError
        List<Document> results = List.of(
            Document.parse("{\"name\": \"Alice\", \"age\": 30}")
        );

        // The shouldMatch method throws an AssertionError with detailed debug info on mismatch
        try {
            Expect.that(results).shouldMatch("expected-results.txt");
        } catch (AssertionError e) {
            // Debug information is automatically included in the assertion error message
            System.out.println("Comparison failed with details:");
            System.out.println(e.getMessage());
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

        Expect.that(actualResults)
            .shouldMatch(expectedResults);
    }

    @Test
    void exampleComplexConfiguration() {
        List<Document> results = getComplexQueryResults();

        Expect.that(results)
            // Unordered comparison is the default behavior
            .withIgnoredFields("_id", "timestamp", "version")  // Skip dynamic fields
            .shouldMatchWithDebug("complex-expected.txt");  // Debug on failure
    }

    private List<Document> getComplexQueryResults() {
        return List.of(
            Document.parse("{\"id\": 1, \"data\": {\"nested\": \"value\"}, \"tags\": [\"a\", \"b\"]}"),
            Document.parse("{\"id\": 2, \"data\": {\"nested\": \"other\"}, \"tags\": [\"c\", \"d\"]}")
        );
    }
}
