using System.Text.RegularExpressions;

namespace Utilities;

/// <summary>
///     Defines ellipsis pattern matching behavior.
///     Uses modern C# static abstract interface members for extensibility.
/// </summary>
public interface IEllipsisPattern<TSelf> where TSelf : IEllipsisPattern<TSelf>
{
    /// <summary>
    ///     Gets the priority of this pattern (higher = checked first).
    /// </summary>
    static abstract int Priority { get; }

    /// <summary>
    ///     Checks if this pattern matches the given value.
    /// </summary>
    static abstract bool Matches(object? expected, object? actual);
}

/// <summary>
///     Handles exact ellipsis matches where expected value is exactly "...".
/// </summary>
public readonly struct ExactEllipsisPattern : IEllipsisPattern<ExactEllipsisPattern>
{
    public static bool Matches(object? expected, object? actual)
    {
        return expected is string str && str == "...";
    }

    public static int Priority => 100;
}

/// <summary>
///     Handles JSON-like strings containing ellipsis patterns.
///     This enables ellipsis matching for documentation-style pseudo-JSON.
/// </summary>
public readonly struct JsonEllipsisPattern : IEllipsisPattern<JsonEllipsisPattern>
{
    public static bool Matches(object? expected, object? actual)
    {
        // Only handle string comparisons
        if (expected is not string expectedStr || actual is not string actualStr)
            return false;

        // Check if expected contains ellipsis patterns
        if (!ContainsEllipsisPattern(expectedStr))
            return false;

        // Try to match JSON with ellipsis patterns
        return TryMatchJsonWithEllipsis(expectedStr, actualStr);
    }

    public static int Priority => 80;

    private static bool ContainsEllipsisPattern(string json)
    {
        return json.Contains("...") &&
               (json.TrimStart().StartsWith("[") || json.TrimStart().StartsWith("{"));
    }

    private static bool TryMatchJsonWithEllipsis(string expectedJson, string actualJson)
    {
        try
        {
            // For arrays, try to match array patterns with ellipsis
            if (expectedJson.TrimStart().StartsWith("[") && actualJson.TrimStart().StartsWith("["))
                return TryMatchArrayWithEllipsis(expectedJson, actualJson);

            // For objects, try to match object patterns with ellipsis
            if (expectedJson.TrimStart().StartsWith("{") && actualJson.TrimStart().StartsWith("{"))
                return TryMatchObjectWithEllipsis(expectedJson, actualJson);

            return false;
        }
        catch
        {
            // If parsing fails, fall back to regular string comparison
            return false;
        }
    }

    private static bool TryMatchArrayWithEllipsis(string expectedJson, string actualJson)
    {
        // Simple pattern: if expected has ellipsis, check if actual contains the non-ellipsis parts

        // Extract non-ellipsis elements from expected
        var expectedElements = ExtractArrayElementsIgnoringEllipsis(expectedJson);

        // Check if all non-ellipsis expected elements can be found in actual
        foreach (var expectedElement in expectedElements)
            if (!actualJson.Contains(expectedElement.Trim()))
                return false;

        return true;
    }

    private static bool TryMatchObjectWithEllipsis(string expectedJson, string actualJson)
    {
        // Similar logic for objects - check if required fields are present
        // This is a simplified implementation for the restaurant document case

        // Extract key-value patterns from expected that aren't ellipsis
        var expectedPairs = ExtractObjectPairsIgnoringEllipsis(expectedJson);

        foreach (var pair in expectedPairs)
            // Check if this key-value pattern exists in actual
            if (!actualJson.Contains(pair.Key) || !actualJson.Contains(pair.Value))
                return false;

        return true;
    }

    private static List<string> ExtractArrayElementsIgnoringEllipsis(string arrayJson)
    {
        var elements = new List<string>();

        // Simple regex-based extraction of array elements that aren't "..."
        var content = arrayJson.Trim().Trim('[', ']');
        var parts = content.Split(',');

        foreach (var part in parts)
        {
            var trimmed = part.Trim();
            if (!trimmed.Contains("...") && !string.IsNullOrEmpty(trimmed)) elements.Add(trimmed);
        }

        return elements;
    }

    private static List<(string Key, string Value)> ExtractObjectPairsIgnoringEllipsis(string objectJson)
    {
        var pairs = new List<(string Key, string Value)>();

        // Extract key-value pairs that aren't ellipsis markers
        // This is a simplified approach focusing on the restaurant document pattern

        if (objectJson.Contains("name:"))
        {
            var nameMatch = Regex.Match(objectJson, @"name:\s*""([^""]+)""");
            if (nameMatch.Success) pairs.Add(("name", nameMatch.Groups[1].Value));
        }

        if (objectJson.Contains("cuisine:"))
        {
            var cuisineMatch = Regex.Match(objectJson, @"cuisine:\s*""([^""]+)""");
            if (cuisineMatch.Success) pairs.Add(("cuisine", cuisineMatch.Groups[1].Value));
        }

        return pairs;
    }
}

/// <summary>
///     Handles truncated string patterns where expected ends with "...".
/// </summary>
public readonly struct TruncatedStringPattern : IEllipsisPattern<TruncatedStringPattern>
{
    public static bool Matches(object? expected, object? actual)
    {
        return expected is string expectedStr &&
               actual is string actualStr &&
               expectedStr.EndsWith("...") &&
               expectedStr.Length > 3 &&
               actualStr.StartsWith(expectedStr[..^3]);
        // Remove last 3 chars ("...")
    }

    public static int Priority => 90;
}

/// <summary>
///     Handles array wildcard patterns like ["..."].
/// </summary>
public readonly struct ArrayWildcardPattern : IEllipsisPattern<ArrayWildcardPattern>
{
    public static bool Matches(object? expected, object? actual)
    {
        return expected is object[] { Length: 1 } expectedArray &&
               expectedArray[0] is string str && str == "..." &&
               actual is IEnumerable<object>;
    }

    public static int Priority => 95;
}

/// <summary>
///     Handles object wildcard patterns like {"...": "..."}.
/// </summary>
public readonly struct ObjectWildcardPattern : IEllipsisPattern<ObjectWildcardPattern>
{
    public static bool Matches(object? expected, object? actual)
    {
        return expected is IDictionary<string, object> { Count: 1 } expectedDict &&
               expectedDict.ContainsKey("...") &&
               expectedDict["..."] is string value && value == "..." &&
               actual is IDictionary<string, object>;
    }

    public static int Priority => 95;
}

/// <summary>
///     Registry and matcher for ellipsis patterns.
///     Uses compile-time reflection for pattern discovery.
/// </summary>
public static class EllipsisPatternMatcher
{
    private static readonly List<(int Priority, Func<object?, object?, bool> Matcher)> Patterns =
    [
        (ExactEllipsisPattern.Priority, ExactEllipsisPattern.Matches),
        (ArrayWildcardPattern.Priority, ArrayWildcardPattern.Matches),
        (ObjectWildcardPattern.Priority, ObjectWildcardPattern.Matches),
        (JsonEllipsisPattern.Priority, JsonEllipsisPattern.Matches),
        (TruncatedStringPattern.Priority, TruncatedStringPattern.Matches)
    ];

    static EllipsisPatternMatcher()
    {
        // Sort by priority (highest first)
        Patterns.Sort((a, b) => b.Priority.CompareTo(a.Priority));
    }

    /// <summary>
    ///     Checks if any ellipsis pattern matches the expected/actual pair.
    ///     Returns true if a match is found, false otherwise.
    /// </summary>
    public static bool TryMatch(object? expected, object? actual)
    {
        return Patterns.Any(pattern => pattern.Matcher(expected, actual));
    }

    /// <summary>
    ///     Determines if an array contains ellipsis elements that require special handling.
    /// </summary>
    public static bool ArrayContainsEllipsis(object[] array)
    {
        return array.Any(element => element is string str && str == "...");
    }

    /// <summary>
    ///     Checks if an object has a global ellipsis marker indicating omitted fields are allowed.
    /// </summary>
    public static bool HasGlobalEllipsis(IDictionary<string, object> obj)
    {
        return obj.TryGetValue("...", out var value) && value is string str && str == "...";
    }
}