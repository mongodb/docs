using System.Text.RegularExpressions;

namespace Utilities;

public static class PathUtilities
{
    /// <summary>
    /// Checks if a string looks like a file path based on common path patterns and characters
    /// </summary>
    /// <param name="input">The string to check</param>
    /// <returns>True if the string appears to be a file path, false otherwise</returns>
    public static bool LooksLikeFilePath(string? input)
    {
        if (string.IsNullOrWhiteSpace(input))
            return false;


        // Check for drive letters (Windows)
        if (Regex.IsMatch(input, @"^[A-Za-z]:"))
            return true;

        // Check for file extensions (non-numeric only to exclude timestamps)
        if (Regex.IsMatch(input, @"\.[A-Za-z][A-Za-z0-9]*$"))
            return true;

        // Check for relative path indicators
        if (input.StartsWith("./") || input.StartsWith("../") ||
            input.StartsWith(".\\") || input.StartsWith("..\\"))
            return true;

        // Check for absolute path indicators (Unix-like)
        if (input.StartsWith("/") || input.StartsWith("~"))
            return true;

        // Check for UNC paths (Windows)
        if (input.StartsWith("\\\\"))
            return true;

        return false;
    }
}