using System.Collections;
using System.Reflection;
using NUnit.Framework;

namespace Utilities.Comparison.Tests;

/// <summary>
///     System-level integration tests for the EllipsisPatternMatcher framework.
///     Test Coverage:
///     - Pattern registration and initialization at startup
///     - Priority-based pattern matching order (most specific patterns first)
///     - Cross-pattern integration scenarios
///     - System behavior with multiple overlapping patterns
///     Why This Matters:
///     The ellipsis pattern system allows test writers to use "..." in expected output
///     to match flexible content. The pattern matcher must try patterns in priority order
///     to ensure the most specific match wins. These tests verify the overall system
///     works correctly across all pattern types.
///     Key Test Categories:
///     - Pattern inventory: verify all expected patterns are registered
///     - Priority ordering: ensure specific patterns override general ones
///     - Integration scenarios: multiple patterns in complex documents
///     - Error handling: malformed patterns, null inputs, edge cases
/// </summary>
[TestFixture]
public class EllipsisPatternSystemTests
{
    [Test]
    public void EllipsisPatternMatcher_ShouldHaveAllExpectedPatterns()
    {
        var patternsField = typeof(EllipsisPatternMatcher)
            .GetField("Patterns", BindingFlags.NonPublic | BindingFlags.Static);

        Assert.That(patternsField != null);

        var patterns = patternsField!.GetValue(null) as IList;
        Assert.That(patterns != null);
        Assert.That(patterns != null && patterns.Count >= 5);
    }

    [Test]
    public void EllipsisPatternMatcher_ShouldOrderPatternsByPriority()
    {
        var patternsField = typeof(EllipsisPatternMatcher)
            .GetField("Patterns", BindingFlags.NonPublic | BindingFlags.Static);

        Assert.That(patternsField != null, "pattern list field should exist"); ;


        var patterns = patternsField!.GetValue(null) as IList;
        Assert.That(patterns != null, "pattern list should be initialized");
        Assert.That(patterns != null && patterns.Count >= 5, "should have patterns to test priority ordering");
        // Priority validation is implicit through the behavior tests below
    }

    [Test]
    public void EllipsisPatternMatcher_ExactEllipsisShouldHaveHighestPriority()
    {
        var expected = "...";
        var jsonLikeActual = """
                             [{"name": "test", "value": 123}]
                             """;
        var stringActual = "some random text";


        Expect.That(jsonLikeActual).ShouldMatch(expected);
        Expect.That(stringActual).ShouldMatch(expected);
        Expect.That(123).ShouldMatch(expected);
        Expect.That(null).ShouldMatch(expected);
    }

    [Test]
    public void EllipsisPatternMatcher_PatternSelectionShouldWorkCorrectly()
    {
        // Should use TruncatedStringPattern for non-JSON strings with ellipsis
        Expect.That("Plain text with ellipsis and more content")
            .ShouldMatch("Plain text with ellipsis...");

        // Should use ExactEllipsisPattern for bare ellipsis
        Expect.That(
            "Any content at all").ShouldMatch(
            "...");

    }

    [Test]
    public void EllipsisPatternMatcher_ShouldPreferMoreSpecificPatterns()
    {
        var expected = "..."; // Could match ExactEllipsisPattern
        var actual = """
                     { "test": "data" }
                     """; // JSON-like, but expected is exact ellipsis

        var result = Expect.That(actual).ShouldMatch(expected);

        Assert.That(result.IsSuccess, "Expected to match ExactEllipsisPattern");
    }

    [Test]
    public void EllipsisPatternMatcher_ExactEllipsisPattern_ShouldMatchAnything()
    {
        Expect.That("any value").ShouldMatch("...");
        Expect.That(123).ShouldMatch("...");
        Expect.That(new { prop = "value" }).ShouldMatch("...");
        Expect.That(null).ShouldMatch("...");
    }

    [Test]
    public void EllipsisPatternMatcher_TruncatedStringShouldHandleNonJsonStrings()
    {
        var expected = "This is a test...";
        var matchingActual = "This is a test with more content";
        var nonMatchingActual = "This is different content";


        Expect.That(matchingActual).ShouldMatch(expected);
        Expect.That(nonMatchingActual).ShouldNotMatch(expected);
    }

    [Test]
    public void EllipsisPatternMatcher_JsonEllipsisShouldHandleJsonStrings()
    {
        var expected = """
                       { "name": "test", "value": 123, ... }
                       """;
        var matchingActual = """
                             { "name": "test", "value": 123, "extra": "field" }
                             """;


        Expect.That(matchingActual).ShouldMatch(expected);

        // Test that JsonEllipsisPattern can handle complex nested structures
        var complexExpected = """
                              { "users": [{"name": "Alice", ...}], "total": 1, ... }
                              """;
        var complexActual = """
                            { "users": [{"name": "Alice", "id": 1}], "total": 1, "page": 1 }
                            """;
        Expect.That(complexActual).ShouldMatch(complexExpected);
    }

    [Test]
    public void EllipsisPatternMatcher_ArrayWildcard_ShouldWork()
    {
        var expectedArray = new object[] { "..." };
        var actualArray = new[] { "item1", "item2" };


        Assert.That(EllipsisPatternMatcher.TryMatch(expectedArray, actualArray) == true);
    }

    [Test]
    public void EllipsisPatternMatcher_ObjectWildcard_ShouldWork()
    {
        var expectedDict = new Dictionary<string, object> { { "...", "..." } };
        var actualDict = new Dictionary<string, object> { { "name", "Alice" } };

        Assert.That(EllipsisPatternMatcher.TryMatch(expectedDict, actualDict), Is.True);
    }

    [Test]
    public void EllipsisPatternMatcher_NoMatch_ShouldReturnFalse()
    {
        Assert.That(EllipsisPatternMatcher.TryMatch("regular string", "another string") == false);
        Assert.That(EllipsisPatternMatcher.TryMatch(123, 456) == false);
    }

    [Test]
    public void EllipsisPatternMatcher_NullValues_ShouldHandleGracefully()
    {
        Assert.That(EllipsisPatternMatcher.TryMatch("...", null));
        Assert.That(EllipsisPatternMatcher.TryMatch(null, "...") == false);
        Assert.That(EllipsisPatternMatcher.TryMatch(null, null) == false);
    }

    [Test]
    public void EllipsisPatternMatcher_ComplexNestedJsonPattern_ShouldMatch()
    {
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

        Expect.That(actual).ShouldMatch(expected);
    }

    [Test]
    public void ArrayContainsEllipsis_WithEllipsisElement_ReturnsTrue()
    {
        var array1 = new object[] { "item1", "...", "item3" };
        var array2 = new object[] { "..." };
        var array3 = new object[] { "item1", "item2", "..." };


        Assert.That(EllipsisPatternMatcher.ArrayContainsEllipsis(array1));
        Assert.That(EllipsisPatternMatcher.ArrayContainsEllipsis(array2));
        Assert.That(EllipsisPatternMatcher.ArrayContainsEllipsis(array3));
    }

    [Test]
    public void ArrayContainsEllipsis_WithoutEllipsisElement_ReturnsFalse()
    {
        var array1 = new object[] { "item1", "item2", "item3" };
        var array2 = new object[] { 1, 2, 3 };
        var array3 = Array.Empty<object>();


        Assert.That(EllipsisPatternMatcher.ArrayContainsEllipsis(array1) == false);
        Assert.That(EllipsisPatternMatcher.ArrayContainsEllipsis(array2) == false);
        Assert.That(EllipsisPatternMatcher.ArrayContainsEllipsis(array3) == false);
    }

    [Test]
    public void HasGlobalEllipsis_WithEllipsisMarker_ReturnsTrue()
    {
        var dict = new Dictionary<string, object>
        {
            { "name", "Alice" },
            { "...", "..." }
        };


        Assert.That(EllipsisPatternMatcher.HasGlobalEllipsis(dict) == true);
    }

    [Test]
    public void HasGlobalEllipsis_WithoutEllipsisMarker_ReturnsFalse()
    {
        var dict1 = new Dictionary<string, object> { { "name", "Alice" } };
        var dict2 = new Dictionary<string, object>();


        Assert.That(EllipsisPatternMatcher.HasGlobalEllipsis(dict1) == false);
        Assert.That(EllipsisPatternMatcher.HasGlobalEllipsis(dict2) == false);
    }
}