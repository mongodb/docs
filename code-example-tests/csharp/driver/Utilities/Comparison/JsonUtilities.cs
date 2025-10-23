using System.Text.Json;

namespace Utilities.Comparison;

public class JsonUtilities
{

    /// <summary>
    /// Checks if a string looks like JSON based on common JSON patterns
    /// </summary>
    /// <param name="input">The string to check</param>
    /// <returns>True if the string appears to be JSON, false otherwise</returns>
    public static bool LooksLikeJson(string? input)
    {
        if (string.IsNullOrWhiteSpace(input))
            return false;

        var trimmed = input.Trim();

        // Check for basic JSON structure patterns
        return (trimmed.StartsWith('{') && trimmed.EndsWith('}')) ||
               (trimmed.StartsWith('[') && trimmed.EndsWith(']')) ||
               (trimmed.StartsWith('"') && trimmed.EndsWith('"') && trimmed.Length > 1) ||
               trimmed.Equals("true", StringComparison.OrdinalIgnoreCase) ||
               trimmed.Equals("false", StringComparison.OrdinalIgnoreCase) ||
               trimmed.Equals("null", StringComparison.OrdinalIgnoreCase) ||
               IsNumericJson(trimmed);
    }

    /// <summary>
    /// Checks if a string is valid JSON by attempting to parse it
    /// </summary>
    /// <param name="input">The string to check</param>
    /// <returns>True if the string is valid JSON, false otherwise</returns>
    public static bool IsValidJson(string? input)
    {
        if (string.IsNullOrWhiteSpace(input))
            return false;

        try
        {
            JsonDocument.Parse(input);
            return true;
        }
        catch (JsonException)
        {
            return false;
        }
        catch
        {
            return false;
        }
    }

    /// <summary>
    /// Attempts to determine the JSON type of a string that looks like JSON
    /// </summary>
    /// <param name="input">The string to analyze</param>
    /// <returns>The detected JSON type or null if not JSON-like</returns>
    public static JsonValueKind? GetJsonType(string? input)
    {
        if (!LooksLikeJson(input))
            return null;

        var trimmed = input!.Trim();

        if (trimmed.StartsWith('{') && trimmed.EndsWith('}'))
            return JsonValueKind.Object;

        if (trimmed.StartsWith('[') && trimmed.EndsWith(']'))
            return JsonValueKind.Array;

        if (trimmed.StartsWith('"') && trimmed.EndsWith('"'))
            return JsonValueKind.String;

        if (trimmed.Equals("true", StringComparison.OrdinalIgnoreCase) ||
            trimmed.Equals("false", StringComparison.OrdinalIgnoreCase))
            return JsonValueKind.True; // or False, but we return True to indicate boolean

        if (trimmed.Equals("null", StringComparison.OrdinalIgnoreCase))
            return JsonValueKind.Null;

        if (IsNumericJson(trimmed))
            return JsonValueKind.Number;

        return null;
    }

    private static bool IsNumericJson(string input)
    {
        return decimal.TryParse(input, out _) ||
               double.TryParse(input, out _) ||
               long.TryParse(input, out _);
    }

}