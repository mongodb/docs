package mongodb.comparison;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

import java.util.Map;
import java.util.List;

/**
 * Test to verify the ComparisonType approach works correctly.
 */
public class ComparisonTypeTest {

    @Test
    public void testAutomaticStringDetection() {
        // Test that string vs string with ellipsis works
        String expected = "Hello ... world";
        String actual = "Hello wonderful world";

        var result = ComparisonStrategy.compare(expected, actual,
            ComparisonOptions.defaultOptions());

        assertTrue(result.isMatch(),
            "String comparison with ellipsis should work automatically");
    }

    @Test
    public void testAutomaticStructuralDetection() {
        // Test that object vs object works
        Map<String, Object> expected = Map.of("id", 1, "name", "test");
        Map<String, Object> actual = Map.of("id", 1, "name", "test");

        var result = ComparisonStrategy.compare(expected, actual,
            ComparisonOptions.defaultOptions());

        assertTrue(result.isMatch(),
            "Structural comparison should work automatically for objects");
    }

    @Test
    public void testAutomaticArrayStrategySelection() {
        // Test that unordered arrays automatically choose the right strategy
        List<String> expected = List.of("a", "b", "c");
        List<String> actual = List.of("c", "a", "b");

        Expect.that(actual)
            .shouldMatch(expected);
    }

    @Test
    public void testOrderedArrays() {
        // Test ordered arrays
        List<String> expected = List.of("a", "b", "c");
        List<String> actual = List.of("a", "b", "c");

        Expect.that(actual)
            .withOrderedSort()
            .shouldMatch(expected);
    }
}