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
        ComparisonResult result = OutputValidator.expect(actual)
            .withUnorderedArrays()
            .withIgnoredFields("_id")
            .toMatch(expected);

        assertTrue(result.isMatch(), "Should match with unordered comparison and ignored _id fields");
    }

    @Test
    @DisplayName("API - performance settings are automatically applied")
    void testPerformanceSettingsAreAutomatic() {
        // Create ComparisonOptions directly to verify defaults
        ComparisonOptions options = ComparisonOptions.builder()
            .withComparisonType(ComparisonType.UNORDERED)
            .withIgnoredFields("_id")
            .build();

        // Verify that performance settings are automatically set to sensible defaults
        assertEquals(30, options.timeoutSeconds(), "Timeout should be 30 seconds by default");
        assertEquals(50, options.maxArraySizeForBacktracking(), "Array size limit should be 50 by default");
        assertEquals(100, options.maxRecursionDepth(), "Recursion depth should be 100 by default");
        assertEquals(30, options.reactiveTimeout().getSeconds(), "Reactive timeout should be 30 seconds by default");
    }

    @Test
    @DisplayName("API - only essential configuration options")
    void testCleanApiUsage() {
        List<Map<String, Object>> actual = Arrays.asList(
            Map.of("name", "Alice", "age", 30)
        );

        // Clean, simple API with only essential options
        ComparisonResult result = OutputValidator.expect(actual)
            .withUnorderedArrays()
            .toMatch(actual);

        assertTrue(result.isMatch(), "Clean API should work perfectly");
    }

    @Test
    @DisplayName("Builder pattern with only essential options")
    void testBuilderWithEssentialOptions() {
        // Test the clean builder pattern
        ComparisonOptions options = ComparisonOptions.builder()
            .withComparisonType(ComparisonType.ORDERED)
            .withIgnoredFields("timestamp")
            .build();

        // Verify that the essential settings are applied
        assertEquals(ComparisonType.ORDERED, options.comparisonType());
        assertEquals(List.of("timestamp"), options.ignoreFieldValues());

        // Performance settings should use sensible defaults
        assertEquals(30, options.timeoutSeconds());
        assertEquals(50, options.maxArraySizeForBacktracking());
        assertEquals(100, options.maxRecursionDepth());
    }
}
