using System.Text;
using System.Text.Json;
using System.Text.RegularExpressions;
using MongoDB.Bson;

namespace Utilities;

/// <summary>
///     Parses expected output files containing MongoDB document syntax.
///     Handles MongoDB constructors, single quotes, unquoted keys, and ellipsis patterns.
/// </summary>
public static partial class FileContentsParser
{
    [GeneratedRegex(@"((?<=^|\s|{|,)\$?[a-zA-Z_][\w\-]*)\s*:", RegexOptions.Compiled | RegexOptions.Multiline)]
    private static partial Regex UnquotedKeyRegex();

    [GeneratedRegex(@":\s*([0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}\.?[0-9]*Z?)\b", RegexOptions.Compiled)]
    private static partial Regex UnquotedDateRegex();

    [GeneratedRegex(@"ObjectId\((['""]([^'""]+)['""]|\.\.\.)\)", RegexOptions.Compiled)]
    private static partial Regex ObjectIdRegex();

    [GeneratedRegex(@"Decimal128\((['""]([^'""]+)['""]|\.\.\.)\)", RegexOptions.Compiled)]
    private static partial Regex Decimal128Regex();

    [GeneratedRegex(@"Date\((['""]([^'""]+)['""]|\.\.\.)\)", RegexOptions.Compiled)]
    private static partial Regex DateRegex();

    [GeneratedRegex(@"^\s*\.\.\.\s*$", RegexOptions.Compiled | RegexOptions.Multiline)]
    private static partial Regex StandaloneEllipsisRegex();

    [GeneratedRegex(@"{\s*([a-zA-Z_]\w*\s*=\s*[^,}]*(?:\s*,\s*[a-zA-Z_]\w*\s*=\s*[^,}]*)*)\s*}", RegexOptions.Compiled)]
    private static partial Regex CSharpObjectRegex();

    /// <summary>
    ///     Parses an expected output file and returns the parsed documents.
    /// </summary>
    /// <param name="filePath">Path to the expected output file</param>
    /// <returns>Parse result containing success flag and data or error</returns>
    public static async Task<ParseResult> ParseFileAsync(string filePath)
    {
        try
        {
            if (!File.Exists(filePath)) return ParseResult.Failure($"Expected output file not found: {filePath}");

            var content = await File.ReadAllTextAsync(filePath);
            return ParseContent(content);
        }
        catch (Exception ex)
        {
            return ParseResult.Failure($"Error reading file {filePath}: {ex.Message}");
        }
    }

    /// <summary>
    ///     Synchronous version of ParseFileAsync.
    /// </summary>
    public static ParseResult ParseFile(string filePath)
    {
        return ParseFileAsync(filePath).GetAwaiter().GetResult();
    }

    /// <summary>
    ///     Parses expected output content directly from a text string.
    /// </summary>
    /// <param name="text">Expected output text content</param>
    /// <returns>List of parsed objects</returns>
    public static List<object> ParseText(string text)
    {
        var parseResult = ParseContent(text);
        if (!parseResult.IsSuccess)
            throw new ArgumentException($"Failed to parse expected text: {parseResult.Error}", nameof(text));
        return parseResult.Data ?? new List<object>();
    }

    /// <summary>
    ///     Parses expected output content directly from a string.
    /// </summary>
    public static ParseResult ParseContent(string content)
    {
        try
        {
            var hasGlobalEllipsis = StandaloneEllipsisRegex().IsMatch(content);
            var processedBlocks = PreprocessContent(content);
            var results = new List<object>();

            foreach (var block in processedBlocks)
            {
                if (string.IsNullOrWhiteSpace(block))
                    continue;

                // Handle standalone ellipsis
                if (block.Trim() == "...")
                    continue; // Skip standalone ellipsis blocks - they're just markers

                var parsed = ParseBlock(block);

                // Add global ellipsis marker if detected
                if (hasGlobalEllipsis && parsed is IDictionary<string, object> dict) dict["..."] = "...";

                results.Add(parsed);
            }

            return ParseResult.Success(results);
        }
        catch (Exception ex)
        {
            return ParseResult.Failure($"Parse error: {ex.Message}");
        }
    }

    /// <summary>
    ///     Preprocesses file content into individual document blocks.
    /// </summary>
    private static List<string> PreprocessContent(string content)
    {
        var cleanContent = RemoveComments(content);

        // Try different parsing strategies in order of specificity
        if (TryParseSingleDocument(cleanContent, out var singleDocument))
            return [singleDocument];

        if (TryParseJsonLines(cleanContent, out var jsonLines))
            return jsonLines;

        return ParseMultiBlockContent(cleanContent);
    }

    /// <summary>
    ///     Attempts to parse content as a single JSON document (array or object).
    /// </summary>
    private static bool TryParseSingleDocument(string content, out string document)
    {
        var trimmed = content.Trim();
        if (trimmed.StartsWith('[') && trimmed.EndsWith(']'))
        {
            document = NormalizeSyntax(trimmed);
            return true;
        }

        document = string.Empty;
        return false;
    }

    /// <summary>
    ///     Attempts to parse content as JSONL (JSON Lines) format.
    /// </summary>
    private static bool TryParseJsonLines(string content, out List<string> jsonLines)
    {
        var lines = content.Split(['\n', '\r'], StringSplitOptions.RemoveEmptyEntries);
        var nonEmptyLines = lines.Where(l => !string.IsNullOrWhiteSpace(l)).ToArray();

        jsonLines = new List<string>();

        // Check if this looks like JSONL format
        if (nonEmptyLines.Length <= 1 ||
            !nonEmptyLines.All(line => line.Trim().StartsWith('{') && line.Trim().EndsWith('}')))
            return false;

        foreach (var line in nonEmptyLines)
        {
            var lineTrimmed = line.Trim();
            if (!string.IsNullOrEmpty(lineTrimmed))
            {
                var processedLine = ProcessSingleLine(lineTrimmed);
                jsonLines.Add(processedLine);
            }
        }

        return true;
    }

    /// <summary>
    ///     Processes a single line, handling both C# object syntax and JSON syntax.
    /// </summary>
    private static string ProcessSingleLine(string line)
    {
        return CSharpObjectRegex().IsMatch(line)
            ? ConvertCSharpObjectToJson(line)
            : NormalizeSyntax(line);
    }

    /// <summary>
    ///     Parses content as multiple blocks separated by blank lines.
    /// </summary>
    private static List<string> ParseMultiBlockContent(string content)
    {
        var blocks = content.Split(["\n\n", "\r\n\r\n"], StringSplitOptions.RemoveEmptyEntries);
        var processedBlocks = new List<string>();

        foreach (var block in blocks)
        {
            var blockTrimmed = block.Trim();
            if (string.IsNullOrEmpty(blockTrimmed))
                continue;

            var processedBlock = blockTrimmed == "..."
                ? blockTrimmed // Keep standalone ellipsis as-is
                : NormalizeSyntax(blockTrimmed);

            processedBlocks.Add(processedBlock);
        }

        return processedBlocks;
    }

    /// <summary>
    ///     Removes both single-line and multi-line comments from content.
    ///     Essential because expected output files may contain explanatory comments that should not affect parsing.
    /// </summary>
    private static string RemoveComments(string content)
    {
        var result = new StringBuilder();
        var context = new CommentParsingContext();

        for (var i = 0; i < content.Length; i++)
        {
            var currentChar = content[i];
            var nextChar = i + 1 < content.Length ? content[i + 1] : '\0';

            i = ProcessCharacterForCommentRemoval(content, i, currentChar, nextChar, result, context);
        }

        return result.ToString();
    }

    /// <summary>
    ///     Processes a single character during comment removal, handling quotes and comments.
    /// </summary>
    private static int ProcessCharacterForCommentRemoval(
        string content,
        int currentIndex,
        char currentChar,
        char nextChar,
        StringBuilder result,
        CommentParsingContext context)
    {
        // Handle escaped characters
        if (context.IsEscaped)
        {
            result.Append(currentChar);
            context.IsEscaped = false;
            return currentIndex;
        }

        // Handle escape sequences
        if (currentChar == '\\' && context.IsInString)
        {
            result.Append(currentChar);
            context.IsEscaped = true;
            return currentIndex;
        }

        // Handle quote toggles
        if (HandleQuoteToggles(currentChar, result, context))
            return currentIndex;

        // If inside a string, just append
        if (context.IsInString)
        {
            result.Append(currentChar);
            return currentIndex;
        }

        // Handle comments when not in strings
        return HandleCommentsOutsideStrings(content, currentIndex, currentChar, nextChar, result);
    }

    /// <summary>
    ///     Handles quote character processing and state tracking.
    /// </summary>
    private static bool HandleQuoteToggles(char currentChar, StringBuilder result, CommentParsingContext context)
    {
        if (currentChar == '"' && !context.InSingleQuote)
        {
            result.Append(currentChar);
            context.InDoubleQuote = !context.InDoubleQuote;
            return true;
        }

        if (currentChar == '\'' && !context.InDoubleQuote)
        {
            result.Append(currentChar);
            context.InSingleQuote = !context.InSingleQuote;
            return true;
        }

        return false;
    }

    /// <summary>
    ///     Handles comment detection and removal when not inside string literals.
    /// </summary>
    private static int HandleCommentsOutsideStrings(
        string content,
        int currentIndex,
        char currentChar,
        char nextChar,
        StringBuilder result)
    {
        // Single-line comment
        if (currentChar == '/' && nextChar == '/') return SkipToEndOfLine(content, currentIndex, result);

        // Multi-line comment
        if (currentChar == '/' && nextChar == '*') return SkipMultiLineComment(content, currentIndex);

        // Regular character - just append
        result.Append(currentChar);
        return currentIndex;
    }

    /// <summary>
    ///     Skips to the end of a single-line comment, preserving the newline.
    /// </summary>
    private static int SkipToEndOfLine(string content, int startIndex, StringBuilder result)
    {
        var i = startIndex;
        while (i < content.Length && content[i] != '\n' && content[i] != '\r')
            i++;

        // Keep the newline
        if (i < content.Length)
        {
            result.Append(content[i]);
            i++;
        }

        return i - 1; // Subtract 1 because main loop will increment
    }

    /// <summary>
    ///     Skips past a multi-line comment block.
    /// </summary>
    private static int SkipMultiLineComment(string content, int startIndex)
    {
        var i = startIndex + 2; // Skip /*

        while (i + 1 < content.Length && !(content[i] == '*' && content[i + 1] == '/'))
            i++;

        if (i + 1 < content.Length)
            i += 2; // Skip */

        return i - 1; // Subtract 1 because main loop will increment
    }

    /// <summary>
    ///     Normalizes MongoDB document syntax to valid JSON.
    /// </summary>
    private static string NormalizeSyntax(string mongoSyntax)
    {
        var result = mongoSyntax;

        // Transform MongoDB-specific syntax to JSON in logical order
        result = TransformMongoDBConstructors(result);
        result = ConvertSingleQuotes(result);
        result = QuoteUnquotedIdentifiers(result);

        return result;
    }

    /// <summary>
    ///     Transforms MongoDB constructor functions (ObjectId, Decimal128, Date) to JSON strings.
    /// </summary>
    private static string TransformMongoDBConstructors(string content)
    {
        var result = content;

        result = TransformObjectIdConstructors(result);
        result = TransformDecimal128Constructors(result);
        result = TransformDateConstructors(result);

        return result;
    }

    /// <summary>
    ///     Transforms ObjectId(...) constructors to JSON strings.
    /// </summary>
    private static string TransformObjectIdConstructors(string content)
    {
        return ObjectIdRegex().Replace(content, match =>
        {
            var matchContent = match.Groups[1].Value;
            if (matchContent == "...")
                return "\"ObjectId(...)\"";

            var innerContent = match.Groups[2].Success
                ? match.Groups[2].Value
                : matchContent.Trim('"', '\'');
            return $"\"ObjectId({innerContent})\"";
        });
    }

    /// <summary>
    ///     Transforms Decimal128(...) constructors to JSON strings.
    /// </summary>
    private static string TransformDecimal128Constructors(string content)
    {
        return Decimal128Regex().Replace(content, match =>
        {
            var matchContent = match.Groups[1].Value;
            if (matchContent == "...")
                return "\"Decimal128(...)\"";

            var innerContent = match.Groups[2].Success
                ? match.Groups[2].Value
                : matchContent.Trim('"', '\'');
            return $"\"Decimal128({innerContent})\"";
        });
    }

    /// <summary>
    ///     Transforms Date(...) constructors to JSON strings.
    /// </summary>
    private static string TransformDateConstructors(string content)
    {
        return DateRegex().Replace(content, match =>
        {
            var matchContent = match.Groups[1].Value;
            if (matchContent == "...")
                return "\"Date(...)\"";

            var innerContent = match.Groups[2].Success
                ? match.Groups[2].Value
                : matchContent.Trim('"', '\'');
            return $"\"Date({innerContent})\"";
        });
    }

    /// <summary>
    ///     Adds quotes around unquoted JSON identifiers (keys and date values).
    /// </summary>
    private static string QuoteUnquotedIdentifiers(string content)
    {
        var result = content;

        // Quote unquoted keys
        result = UnquotedKeyRegex().Replace(result, "\"$1\":");

        // Quote unquoted date strings
        result = UnquotedDateRegex().Replace(result, ": \"$1\"");

        return result;
    }

    /// <summary>
    ///     Converts single quotes to double quotes while preserving string content.
    /// </summary>
    private static string ConvertSingleQuotes(string input)
    {
        var result = new StringBuilder(input.Length * 2);
        var quoteContext = new QuoteConversionContext();

        for (var i = 0; i < input.Length; i++)
        {
            var additionalCharsProcessed = ProcessCharacterForQuoteConversion(input, i, result, quoteContext);
            i += additionalCharsProcessed; // Skip additional characters that were processed
        }

        return result.ToString();
    }

    /// <summary>
    ///     Processes a single character during quote conversion.
    ///     Returns the number of additional characters processed (0 for single character, 1 for escape sequences).
    /// </summary>
    private static int ProcessCharacterForQuoteConversion(
        string input,
        int currentIndex,
        StringBuilder result,
        QuoteConversionContext context)
    {
        var currentChar = input[currentIndex];

        // Handle escape sequences
        if (currentChar == '\\' && currentIndex + 1 < input.Length)
            return HandleEscapeSequence(input, currentIndex, result, context);

        // Handle quote characters
        if (HandleQuoteCharacter(currentChar, result, context))
            return 0; // Only processed current character

        // Handle regular characters with special handling inside converted strings
        HandleRegularCharacter(currentChar, result, context);
        return 0; // Only processed current character
    }

    /// <summary>
    ///     Handles escape sequence processing during quote conversion.
    ///     Returns the number of additional characters processed beyond the current one.
    /// </summary>
    private static int HandleEscapeSequence(
        string input,
        int currentIndex,
        StringBuilder result,
        QuoteConversionContext context)
    {
        var nextChar = input[currentIndex + 1];

        if (context.InSingleQuote)
        {
            HandleEscapeInSingleQuote(nextChar, result);
            return 1; // Processed current character (\) and next character
        }

        if (context.InDoubleQuote)
        {
            // Preserve escapes in double quotes
            result.Append('\\');
            result.Append(nextChar);
        }
        else
        {
            // Default: append both characters
            result.Append('\\');
            result.Append(nextChar);
        }

        return 1; // Processed current character (\) and next character
    }

    /// <summary>
    ///     Handles escape sequences specifically within single quotes being converted.
    /// </summary>
    private static void HandleEscapeInSingleQuote(char escapedChar, StringBuilder result)
    {
        switch (escapedChar)
        {
            case '\'':
                result.Append('\''); // Keep as single quote in content
                break;
            case '"':
                result.Append('\\');
                result.Append('"'); // Escape double quotes inside converted strings
                break;
            default:
                result.Append('\\');
                result.Append(escapedChar);
                break;
        }
    }

    /// <summary>
    ///     Handles quote character processing and state transitions.
    /// </summary>
    private static bool HandleQuoteCharacter(char currentChar, StringBuilder result, QuoteConversionContext context)
    {
        if (currentChar == '"' && !context.InSingleQuote)
        {
            result.Append(currentChar);
            context.InDoubleQuote = !context.InDoubleQuote;
            return true;
        }

        if (currentChar == '\'' && !context.InDoubleQuote)
        {
            result.Append('"'); // Convert single quote to double quote
            context.InSingleQuote = !context.InSingleQuote;
            return true;
        }

        return false;
    }

    /// <summary>
    ///     Handles regular characters, with special processing for double quotes inside converted strings.
    /// </summary>
    private static void HandleRegularCharacter(char currentChar, StringBuilder result, QuoteConversionContext context)
    {
        if (context.InSingleQuote && currentChar == '"')
        {
            // Escape double quotes inside strings being converted from single quotes
            result.Append('\\');
            result.Append('"');
        }
        else
        {
            result.Append(currentChar);
        }
    }

    /// <summary>
    ///     Parses a single normalized document block into an object.
    /// </summary>
    private static object ParseBlock(string normalizedBlock)
    {
        // Parse as JSON first
        var jsonElement = JsonSerializer.Deserialize<JsonElement>(normalizedBlock);

        // Convert to object and process MongoDB constructors
        var obj = ConvertJsonElement(jsonElement);
        return ProcessMongoConstructors(obj, normalizedBlock);
    }

    /// <summary>
    ///     Converts JsonElement to a standard object structure.
    /// </summary>
    private static object ConvertJsonElement(JsonElement element)
    {
        return element.ValueKind switch
        {
            JsonValueKind.String => element.GetString()!,
            JsonValueKind.Number when element.TryGetInt64(out var longValue) => longValue,
            JsonValueKind.Number when element.TryGetDouble(out var doubleValue) => doubleValue,
            JsonValueKind.True => true,
            JsonValueKind.False => false,
            JsonValueKind.Null => null!,
            JsonValueKind.Array => element.EnumerateArray().Select(ConvertJsonElement).ToArray(),
            JsonValueKind.Object => element.EnumerateObject()
                .ToDictionary(prop => prop.Name, prop => ConvertJsonElement(prop.Value)),
            _ => element.ToString()!
        };
    }

    /// <summary>
    ///     Processes MongoDB constructor syntax in the original text and applies to parsed objects.
    /// </summary>
    private static object ProcessMongoConstructors(object obj, string originalText)
    {
        return obj switch
        {
            Dictionary<string, object> dict => ProcessObjectConstructors(dict, originalText),
            object[] array => array.Select(item => ProcessMongoConstructors(item, originalText)).ToArray(),
            string str => ProcessStringConstructor(str, originalText),
            _ => obj
        };
    }

    /// <summary>
    ///     Processes constructors in object properties.
    /// </summary>
    private static Dictionary<string, object> ProcessObjectConstructors(Dictionary<string, object> dict,
        string originalText)
    {
        var result = new Dictionary<string, object>();

        foreach (var (key, value) in dict) result[key] = ProcessMongoConstructors(value, originalText);

        return result;
    }

    /// <summary>
    ///     Processes MongoDB constructors in string values.
    /// </summary>
    private static object ProcessStringConstructor(string value, string originalText)
    {
        // Check if this is a MongoDB constructor string
        if (value.StartsWith("ObjectId(") && value.EndsWith(")"))
        {
            var idValue = value.Substring(9, value.Length - 10);
            // Handle ellipsis pattern in ObjectId
            if (idValue == "...") return "..."; // Return as ellipsis marker
            return new ObjectId(idValue);
        }

        if (value.StartsWith("Decimal128(") && value.EndsWith(")"))
        {
            var decimalValue = value.Substring(11, value.Length - 12);
            // Handle ellipsis pattern in Decimal128
            if (decimalValue == "...") return "..."; // Return as ellipsis marker
            return Decimal128.Parse(decimalValue);
        }

        if (value.StartsWith("Date(") && value.EndsWith(")"))
        {
            var dateValue = value.Substring(5, value.Length - 6);
            // Handle ellipsis pattern in Date
            if (dateValue == "...") return "..."; // Return as ellipsis marker
            // Parse as UTC DateTime - handle Z suffix specifically
            if (dateValue.EndsWith('Z')) return DateTime.Parse(dateValue).ToUniversalTime();
            return DateTime.Parse(dateValue);
        }

        return value;
    }

    /// <summary>
    ///     Converts C# object syntax to JSON format.
    ///     Example: "{ ProductId = abc123, Product = Test, TotalValue = 100, Quantity = 1 }"
    ///     becomes: "{ \"ProductId\": \"abc123\", \"Product\": \"Test\", \"TotalValue\": 100, \"Quantity\": 1 }"
    /// </summary>
    private static string ConvertCSharpObjectToJson(string csharpObject)
    {
        try
        {
            var inner = ExtractObjectContent(csharpObject);
            var properties = ParseObjectProperties(inner);
            return AssembleJsonObject(properties);
        }
        catch
        {
            // If conversion fails, return original
            return csharpObject;
        }
    }

    /// <summary>
    ///     Extracts the inner content from a C# object literal (removes outer braces).
    /// </summary>
    private static string ExtractObjectContent(string csharpObject)
    {
        return csharpObject.Trim().TrimStart('{').TrimEnd('}').Trim();
    }

    /// <summary>
    ///     Parses C# object properties into JSON key-value format.
    /// </summary>
    private static List<string> ParseObjectProperties(string inner)
    {
        var properties = new List<string>();
        var parts = inner.Split(',');

        foreach (var part in parts)
        {
            var trimmedPart = part.Trim();
            var equalIndex = trimmedPart.IndexOf('=');

            if (equalIndex > 0)
            {
                var key = trimmedPart[..equalIndex].Trim();
                var value = trimmedPart[(equalIndex + 1)..].Trim();

                var quotedKey = $"\"{key}\"";
                var quotedValue = FormatJsonValue(value);

                properties.Add($"{quotedKey}: {quotedValue}");
            }
        }

        return properties;
    }

    /// <summary>
    ///     Formats a value appropriately for JSON (adds quotes for strings, leaves numbers/booleans/null as-is).
    /// </summary>
    private static string FormatJsonValue(string value)
    {
        // Numeric, boolean, or null values don't need quotes
        if (decimal.TryParse(value, out _) || int.TryParse(value, out _) ||
            bool.TryParse(value, out _) || value == "null")
            return value;

        // String values need quotes (remove existing quotes if any)
        var cleanValue = value.Trim('"', '\'');
        return $"\"{cleanValue}\"";
    }

    /// <summary>
    ///     Assembles the final JSON object from formatted properties.
    /// </summary>
    private static string AssembleJsonObject(List<string> properties)
    {
        return "{ " + string.Join(", ", properties) + " }";
    }

    /// <summary>
    ///     Tracks parsing context during comment removal.
    /// </summary>
    private class CommentParsingContext
    {
        public bool InSingleQuote { get; set; }
        public bool InDoubleQuote { get; set; }
        public bool IsEscaped { get; set; }

        public bool IsInString => InSingleQuote || InDoubleQuote;
    }

    /// <summary>
    ///     Tracks quote context during conversion.
    /// </summary>
    private class QuoteConversionContext
    {
        public bool InSingleQuote { get; set; }
        public bool InDoubleQuote { get; set; }
    }
}

/// <summary>
///     Result of parsing an expected output file.
///     Uses discriminated union pattern for clean error handling.
/// </summary>
public abstract record ParseResult
{
    public abstract bool IsSuccess { get; }
    public abstract List<object>? Data { get; }
    public abstract string? Error { get; }

    public static ParseResult Success(List<object> data)
    {
        return new ParseSuccess(data);
    }

    public static ParseResult Failure(string error)
    {
        return new ParseFailure(error);
    }
}

public sealed record ParseSuccess : ParseResult
{
    public ParseSuccess(List<object> data)
    {
        Data = data;
    }

    public override bool IsSuccess => true;
    public override List<object> Data { get; }
    public override string? Error => null;
}

public sealed record ParseFailure : ParseResult
{
    public ParseFailure(string error)
    {
        Error = error;
    }

    public override bool IsSuccess => false;
    public override List<object>? Data => null;
    public override string Error { get; }
}