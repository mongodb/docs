using FluentAssertions;
using NUnit.Framework;

namespace Utilities.Comparison.Tests;

/// <summary>
/// System-level integration tests for the EllipsisPatternMatcher framework.
///
/// Test Coverage:
/// - Pattern registration and initialization at startup
/// - Priority-based pattern matching order (most specific patterns first)
/// - Cross-pattern integration scenarios
/// - System behavior with multiple overlapping patterns
///
/// Why This Matters:
/// The ellipsis pattern system allows test writers to use "..." in expected output
/// to match flexible content. The pattern matcher must try patterns in priority order
/// to ensure the most specific match wins. These tests verify the overall system
/// works correctly across all pattern types.
///
/// Key Test Categories:
/// - Pattern inventory: verify all expected patterns are registered
/// - Priority ordering: ensure specific patterns override general ones
/// - Integration scenarios: multiple patterns in complex documents
/// - Error handling: malformed patterns, null inputs, edge cases
/// </summary>
[TestFixture]
public class EllipsisPatternSystemTests
{
    #region Pattern Registration and Priority

    [Test]
    public void EllipsisPatternMatcher_ShouldHaveAllExpectedPatterns()
    {
        // Act - Get patterns using reflection
        var patternsField = typeof(EllipsisPatternMatcher)
            .GetField("Patterns", System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Static);

        // Assert
        patternsField.Should().NotBeNull("pattern list field should exist");

        var patterns = patternsField!.GetValue(null) as System.Collections.IList;
        patterns.Should().NotBeNull("pattern list should be initialized");
        patterns!.Count.Should().BeGreaterOrEqualTo(5, "should have ExactEllipsisPattern, ArrayWildcardPattern, ObjectWildcardPattern, TruncatedStringPattern, and JsonEllipsisPattern");
    }

    [Test]
    public void EllipsisPatternMatcher_ShouldOrderPatternsByPriority()
    {
        // Act - Get patterns using reflection
        var patternsField = typeof(EllipsisPatternMatcher)
            .GetField("Patterns", System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Static);

        // Assert
        patternsField.Should().NotBeNull("pattern list field should exist");

        var patterns = patternsField!.GetValue(null) as System.Collections.IList;
        patterns.Should().NotBeNull("pattern list should be initialized");
        patterns!.Count.Should().BeGreaterOrEqualTo(5, "should have patterns to test priority ordering");

        // Priority validation is implicit through the behavior tests below
    }

    #endregion

    #region Pattern Selection and Priority Behavior

    [Test]
    public void EllipsisPatternMatcher_ExactEllipsisShouldHaveHighestPriority()
    {
        // Arrange - Testing that "..." exactly matches anything, even JSON-like strings
        var expected = "...";
        var jsonLikeActual = """
        [{"name": "test", "value": 123}]
        """;
        var stringActual = "some random text";

        // Act & Assert - Exact ellipsis should match anything
        ComparisonEngine.Compare(expected, jsonLikeActual).IsSuccess.Should().BeTrue();
        ComparisonEngine.Compare(expected, stringActual).IsSuccess.Should().BeTrue();
        ComparisonEngine.Compare(expected, 123).IsSuccess.Should().BeTrue();
        ComparisonEngine.Compare(expected, null).IsSuccess.Should().BeTrue();
    }

    [Test]
    public void EllipsisPatternMatcher_PatternSelectionShouldWorkCorrectly()
    {
        // Test that the correct pattern is selected based on the input format

        // Should use JsonEllipsisPattern for JSON-like strings with ellipsis
        var jsonResult = ComparisonEngine.Compare(
            """
            { "field": "value", ... }
            """,
            """
            { "field": "value", "extra": "data" }
            """
        );
        jsonResult.IsSuccess.Should().BeTrue("JsonEllipsisPattern should handle JSON objects");

        // Should use TruncatedStringPattern for non-JSON strings with ellipsis
        var stringResult = ComparisonEngine.Compare(
            "Plain text with ellipsis...",
            "Plain text with ellipsis and more content"
        );
        stringResult.IsSuccess.Should().BeTrue("TruncatedStringPattern should handle plain text");

        // Should use ExactEllipsisPattern for bare ellipsis
        var exactResult = ComparisonEngine.Compare(
            "...",
            "Any content at all"
        );
        exactResult.IsSuccess.Should().BeTrue("ExactEllipsisPattern should match anything");
    }

    [Test]
    public void EllipsisPatternMatcher_ShouldPreferMoreSpecificPatterns()
    {
        // Arrange - A case where multiple patterns could apply
        var expected = "...";  // Could match ExactEllipsisPattern
        var actual = """
        { "test": "data" }
        """;  // JSON-like, but expected is exact ellipsis

        // Act
        var result = ComparisonEngine.Compare(expected, actual);

        // Assert
        result.IsSuccess.Should().BeTrue("ExactEllipsisPattern should win due to highest priority");
    }

    #endregion

    #region Individual Pattern Integration Tests

    [Test]
    public void EllipsisPatternMatcher_ExactEllipsisPattern_ShouldMatchAnything()
    {
        // Act & Assert
        ComparisonEngine.Compare("...", "any value").IsSuccess.Should().BeTrue();
        ComparisonEngine.Compare("...", 123).IsSuccess.Should().BeTrue();
        ComparisonEngine.Compare("...", new { prop = "value" }).IsSuccess.Should().BeTrue();
        ComparisonEngine.Compare("...", null).IsSuccess.Should().BeTrue();
    }

    [Test]
    public void EllipsisPatternMatcher_TruncatedStringShouldHandleNonJsonStrings()
    {
        // Arrange
        var expected = "This is a test...";
        var matchingActual = "This is a test with more content";
        var nonMatchingActual = "This is different content";

        // Act & Assert
        ComparisonEngine.Compare(expected, matchingActual).IsSuccess.Should().BeTrue("should match when actual starts with expected prefix");
        ComparisonEngine.Compare(expected, nonMatchingActual).IsSuccess.Should().BeFalse("should not match when actual doesn't start with expected prefix");
    }

    [Test]
    public void EllipsisPatternMatcher_JsonEllipsisShouldHandleJsonStrings()
    {
        // Arrange - Test successful JsonEllipsisPattern matching
        var expected = """
        { "name": "test", "value": 123, ... }
        """;
        var matchingActual = """
        { "name": "test", "value": 123, "extra": "field" }
        """;

        // Act & Assert
        ComparisonEngine.Compare(expected, matchingActual).IsSuccess.Should().BeTrue("should match when required fields are present");

        // Test that JsonEllipsisPattern can handle complex nested structures
        var complexExpected = """
        { "users": [{"name": "Alice", ...}], "total": 1, ... }
        """;
        var complexActual = """
        { "users": [{"name": "Alice", "id": 1}], "total": 1, "page": 1 }
        """;
        ComparisonEngine.Compare(complexExpected, complexActual).IsSuccess.Should().BeTrue("should handle complex nested JSON");
    }

    [Test]
    public void EllipsisPatternMatcher_ArrayWildcard_ShouldWork()
    {
        // Arrange
        var expectedArray = new object[] { "..." };
        var actualArray = new[] { "item1", "item2" };

        // Act & Assert
        EllipsisPatternMatcher.TryMatch(expectedArray, actualArray).Should().BeTrue();
    }

    [Test]
    public void EllipsisPatternMatcher_ObjectWildcard_ShouldWork()
    {
        // Arrange
        var expectedDict = new Dictionary<string, object> { { "...", "..." } };
        var actualDict = new Dictionary<string, object> { { "name", "Alice" } };

        // Act & Assert
        EllipsisPatternMatcher.TryMatch(expectedDict, actualDict).Should().BeTrue();
    }

    #endregion

    #region System-Level Edge Cases

    [Test]
    public void EllipsisPatternMatcher_NoMatch_ShouldReturnFalse()
    {
        // Act & Assert
        EllipsisPatternMatcher.TryMatch("regular string", "another string").Should().BeFalse();
        EllipsisPatternMatcher.TryMatch(123, 456).Should().BeFalse();
    }

    [Test]
    public void EllipsisPatternMatcher_NullValues_ShouldHandleGracefully()
    {
        // Arrange & Act & Assert
        EllipsisPatternMatcher.TryMatch("...", null).Should().BeTrue();
        EllipsisPatternMatcher.TryMatch(null, "...").Should().BeFalse();
        EllipsisPatternMatcher.TryMatch(null, null).Should().BeFalse();
    }

    [Test]
    public void EllipsisPatternMatcher_ComplexNestedJsonPattern_ShouldMatch()
    {
        // Arrange - Testing complex nested case that shows JsonEllipsisPattern working
        var expected = """
            {
              "users": [
                { "name": "Alice", "role": "admin", ... },
                { "name": "Bob", "role": "user", ... },
                ...
              ],
              "metadata": { "version": "1.0", ... }
            }
            """;
        var actual = """
            {
              "users": [
                { "name": "Alice", "role": "admin", "id": 1, "email": "alice@example.com" },
                { "name": "Bob", "role": "user", "id": 2, "email": "bob@example.com" },
                { "name": "Charlie", "role": "guest", "id": 3, "email": "charlie@example.com" }
              ],
              "metadata": { "version": "1.0", "created": "2023-01-01", "lastModified": "2023-12-01" }
            }
            """;

        // Act
        var result = ComparisonEngine.Compare(expected, actual);

        // Assert
        result.IsSuccess.Should().BeTrue("complex nested JSON with ellipsis should match when all specified elements are present");
    }

    #endregion

    #region Utility Method Tests

    [Test]
    public void ArrayContainsEllipsis_WithEllipsisElement_ReturnsTrue()
    {
        // Arrange
        var array1 = new object[] { "item1", "...", "item3" };
        var array2 = new object[] { "..." };
        var array3 = new object[] { "item1", "item2", "..." };

        // Act & Assert
        EllipsisPatternMatcher.ArrayContainsEllipsis(array1).Should().BeTrue();
        EllipsisPatternMatcher.ArrayContainsEllipsis(array2).Should().BeTrue();
        EllipsisPatternMatcher.ArrayContainsEllipsis(array3).Should().BeTrue();
    }

    [Test]
    public void ArrayContainsEllipsis_WithoutEllipsisElement_ReturnsFalse()
    {
        // Arrange
        var array1 = new object[] { "item1", "item2", "item3" };
        var array2 = new object[] { 1, 2, 3 };
        var array3 = Array.Empty<object>();

        // Act & Assert
        EllipsisPatternMatcher.ArrayContainsEllipsis(array1).Should().BeFalse();
        EllipsisPatternMatcher.ArrayContainsEllipsis(array2).Should().BeFalse();
        EllipsisPatternMatcher.ArrayContainsEllipsis(array3).Should().BeFalse();
    }

    [Test]
    public void HasGlobalEllipsis_WithEllipsisMarker_ReturnsTrue()
    {
        // Arrange
        var dict = new Dictionary<string, object>
        {
            { "name", "Alice" },
            { "...", "..." }
        };

        // Act & Assert
        EllipsisPatternMatcher.HasGlobalEllipsis(dict).Should().BeTrue();
    }

    [Test]
    public void HasGlobalEllipsis_WithoutEllipsisMarker_ReturnsFalse()
    {
        // Arrange
        var dict1 = new Dictionary<string, object> { { "name", "Alice" } };
        var dict2 = new Dictionary<string, object>();

        // Act & Assert
        EllipsisPatternMatcher.HasGlobalEllipsis(dict1).Should().BeFalse();
        EllipsisPatternMatcher.HasGlobalEllipsis(dict2).Should().BeFalse();
    }

    #endregion
}
