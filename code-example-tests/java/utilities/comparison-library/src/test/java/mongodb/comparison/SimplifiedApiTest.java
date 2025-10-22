package mongodb.comparison;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import static org.junit.jupiter.api.Assertions.*;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

/**
 * Test cases demonstrating the ComparisonOptions API.
 * Shows that technical writers only need to configure comparison type and ignored fields.
 */
class SimplifiedApiTest {

    @Test
    @DisplayName("API - only comparison type and ignored fields")
    void testSimplifiedApiBasicUsage() {
        List<Map<String, Object>> actual = Arrays.asList(
            Map.of("_id", "507f1f77bcf86cd799439011", "name", "Alice", "age", 30),
            Map.of("_id", "507f1f77bcf86cd799439012", "name", "Bob", "age", 25)
        );

        List<Map<String, Object>> expected = Arrays.asList(
            Map.of("_id", "507f1f77bcf86cd799439012", "name", "Bob", "age", 25),
            Map.of("_id", "507f1f77bcf86cd799439011", "name", "Alice", "age", 30)
        );

        // Simple API - only the essential options
        Expect.that(actual)
            .withIgnoredFields("_id")
            .shouldMatch(expected);
    }

    @Test
    @DisplayName("API - performance settings work automatically behind the scenes")
    void testPerformanceSettingsAreAutomatic() {
        // Test that the API handles performance settings automatically
        // Technical writers don't need to configure timeouts, array limits, etc.

        // Large dataset that would require good performance settings
        List<Map<String, Object>> actual = Arrays.asList(
            Map.of("_id", "507f1f77bcf86cd799439011", "name", "Alice", "data", Arrays.asList(1, 2, 3, 4, 5)),
            Map.of("_id", "507f1f77bcf86cd799439012", "name", "Bob", "data", Arrays.asList(6, 7, 8, 9, 10))
        );

        List<Map<String, Object>> expected = Arrays.asList(
            Map.of("_id", "507f1f77bcf86cd799439012", "name", "Bob", "data", Arrays.asList(6, 7, 8, 9, 10)),
            Map.of("_id", "507f1f77bcf86cd799439011", "name", "Alice", "data", Arrays.asList(1, 2, 3, 4, 5))
        );

        // Should work without any performance configuration
        Expect.that(actual)
            .withIgnoredFields("_id")
            .shouldMatch(expected);
    }

    @Test
    @DisplayName("API - only essential configuration options")
    void testCleanApiUsage() {
        List<Map<String, Object>> actual = Arrays.asList(
            Map.of("name", "Alice", "age", 30)
        );

        // Clean, simple API with only essential options
        Expect.that(actual)
            .shouldMatch(actual);
    }

    @Test
    @DisplayName("Builder pattern with only essential options")
    void testBuilderWithEssentialOptions() {
        // Test the clean builder pattern with ordered comparison
        List<Map<String, Object>> actual = Arrays.asList(
            Map.of("timestamp", "2023-01-01T10:00:00Z", "name", "Alice", "value", 100),
            Map.of("timestamp", "2023-01-01T11:00:00Z", "name", "Bob", "value", 200)
        );

        List<Map<String, Object>> expected = Arrays.asList(
            Map.of("timestamp", "2023-01-01T12:00:00Z", "name", "Alice", "value", 100),
            Map.of("timestamp", "2023-01-01T13:00:00Z", "name", "Bob", "value", 200)
        );

        // Test ordered comparison with ignored timestamp field
        Expect.that(actual)
            .withOrderedSort()
            .withIgnoredFields("timestamp")
            .shouldMatch(expected);
    }
}
