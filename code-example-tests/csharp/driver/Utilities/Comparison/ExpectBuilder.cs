using MongoDB.Bson;

namespace Utilities.Comparison;

public class ExpectBuilder : IBuilder
{
    private readonly object? _actual;
    private ComparisonOptions _options;
    private bool _shouldMatchCalled;
    private bool _shouldResembleCalled;
    private bool _sortApiCalled;

    internal ExpectBuilder(object? actual)
    {
        _options = new ComparisonOptions();
        _actual = actual;
    }

    public IBuilder WithOrderedSort()
    {
        _sortApiCalled = true;
        _options.ArrayMode = ArrayComparisonMode.Ordered;

        return this;
    }
    public IBuilder WithUnorderedSort()
    {
        _sortApiCalled = true;
        _options.ArrayMode = ArrayComparisonMode.Unordered;

        return this;
    }
    public IBuilder WithIgnoredFields(params string[] fieldNames)
    {
        foreach (var fieldName in fieldNames)
        {
            _options.IgnoredFields.Add(fieldName);
        }
        return this;
    }

    public ComparisonResult ShouldMatch(object? expected)
    {
        return ShouldMatchAsync(expected).GetAwaiter().GetResult();
    }

    /// <summary>
    ///     Initiates schema-based validation where results may vary but must conform to a defined schema.
    ///     This is mutually exclusive with ShouldMatch(), WithIgnoredFields(), and sort APIs.
    ///     If expected is a file path, the file will be loaded and parsed.
    /// </summary>
    /// <param name="expected">The expected output to validate against the schema (can be a file path)</param>
    /// <returns>ISchemaBuilder that requires WithSchema() to complete validation</returns>
    /// <exception cref="ComparisonException">
    ///     Thrown if WithIgnoredFields(), WithOrderedSort(), or WithUnorderedSort() was called,
    ///     or if ShouldMatch() was already called.
    /// </exception>
    public ISchemaBuilder ShouldResemble(object? expected)
    {
        return ShouldResembleAsync(expected).GetAwaiter().GetResult();
    }

    /// <summary>
    ///     Async version of ShouldResemble. Initiates schema-based validation where results may vary
    ///     but must conform to a defined schema. This is mutually exclusive with ShouldMatch(),
    ///     WithIgnoredFields(), and sort APIs. If expected is a file path, the file will be loaded and parsed.
    /// </summary>
    /// <param name="expected">The expected output to validate against the schema (can be a file path)</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>ISchemaBuilder that requires WithSchema() to complete validation</returns>
    /// <exception cref="ComparisonException">
    ///     Thrown if WithIgnoredFields(), WithOrderedSort(), or WithUnorderedSort() was called,
    ///     or if ShouldMatch() was already called.
    /// </exception>
    public async Task<ISchemaBuilder> ShouldResembleAsync(object? expected, CancellationToken cancellationToken = default)
    {
        cancellationToken.ThrowIfCancellationRequested();

        if (_shouldMatchCalled)
        {
            throw new ComparisonException(
                "ShouldResemble() cannot be called after ShouldMatch(). These methods are mutually exclusive.");
        }

        if (_options.IgnoredFields.Count > 0)
        {
            throw new ComparisonException(
                "WithIgnoredFields() cannot be used with ShouldResemble(). " +
                "ShouldResemble() with WithSchema() does not support ignored fields.");
        }

        if (_sortApiCalled)
        {
            throw new ComparisonException(
                "WithOrderedSort() and WithUnorderedSort() cannot be used with ShouldResemble(). " +
                "ShouldResemble() with WithSchema() does not support sort options.");
        }

        _shouldResembleCalled = true;

        // Check if expected is a file path - if so, load and parse the file
        if (expected is string stringExpected && PathUtilities.LooksLikeFilePath(stringExpected))
        {
            var parsedExpected = await LoadAndParseFileAsync(stringExpected);
            return new SchemaBuilder(parsedExpected, _actual);
        }

        return new SchemaBuilder(expected, _actual);
    }

    /// <summary>
    /// Loads and parses a file, returning the parsed content.
    /// </summary>
    private async Task<object?> LoadAndParseFileAsync(string filePath)
    {
        var fullPath = ResolveExpectedFilePath(filePath);

        if (!File.Exists(fullPath))
        {
            throw new ComparisonException($"Expected output file not found: {filePath}");
        }

        var parseResult = await FileContentsParser.ParseFileAsync(fullPath);
        if (!parseResult.IsSuccess)
        {
            throw new ComparisonException($"Failed to parse expected output file: {parseResult.Error}");
        }

        return parseResult.Data;
    }

    /// <summary>
    /// Execute the comparison against the expected value.
    /// This method automatically detects the content type and selects the
    /// appropriate comparison strategy:
    /// - File paths: Loads and parses the file content
    /// - Strings with ellipsis: Uses pattern matching
    /// - JSON strings: Parses and compares structurally
    /// - Objects/Arrays: Direct structural comparison
    /// </summary>
    /// <param name="expected">The expected value (file path, string, object, etc.)</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>Comparison result</returns>
    /// <exception cref="ComparisonException">Thrown if comparison fails or methods are called in wrong order</exception>
    public async Task<ComparisonResult> ShouldMatchAsync(object? expected,
    CancellationToken cancellationToken = default)
    {
        cancellationToken.ThrowIfCancellationRequested();

        if (_shouldResembleCalled)
        {
            throw new ComparisonException(
                "ShouldMatch() cannot be called after ShouldResemble(). These methods are mutually exclusive.");
        }

        _shouldMatchCalled = true;

        // Check if expected is a file path - if so, load and parse the file
        if (expected is string stringExpected && PathUtilities.LooksLikeFilePath(stringExpected))
        {
            return await CompareWithExpectedFileAsync(stringExpected);
        }

        // Handle other string types (ellipsis patterns, JSON, plain strings)
        if (expected is string strExpected)
        {
            if (EllipsisPatternMatcher.TryMatch(strExpected, _actual))
            {
                return new ComparisonSuccess();
            }
            if (JsonUtilities.LooksLikeJson(strExpected))
            {
                var parsedExpected = FileContentsParser.ParseText(strExpected);
                if (_actual is string stringActual && JsonUtilities.LooksLikeJson(stringActual))
                {
                    var parsedActual = FileContentsParser.ParseText(stringActual);
                    return await ComparisonEngine.CompareAsync(parsedExpected, parsedActual, _options);
                }
                return await ComparisonEngine.CompareAsync(parsedExpected, _actual, _options);
            }
            return await ComparisonEngine.CompareAsync(strExpected, _actual, _options);
        }

        var result = await ComparisonEngine.CompareAsync(expected, _actual, _options);
        if (result.IsSuccess) return new ComparisonSuccess();

        var comparisonError = result as ComparisonError;
        throw new ComparisonException($"Expected to match, but did not: {expected} != {_actual}",
            comparisonError);
    }

    /// <summary>
    /// Handles comparison when the expected value is a file path.
    /// Loads, parses, and compares the file contents against the actual value.
    /// </summary>
    private async Task<ComparisonResult> CompareWithExpectedFileAsync(string expectedFilePath)
    {
        var fullPath = ResolveExpectedFilePath(expectedFilePath);

        if (!File.Exists(fullPath))
        {
            throw new ComparisonException($"Expected output file not found: {expectedFilePath}");
        }

        var parseResult = await FileContentsParser.ParseFileAsync(fullPath);
        if (!parseResult.IsSuccess)
        {
            throw new ComparisonException($"Failed to parse expected output file: {parseResult.Error}");
        }

        var (normalizedExpected, normalizedActual) = NormalizeForComparison(parseResult.Data!, _actual);

        // Check for global ellipsis pattern
        var finalOptions = DetermineComparisonOptions(normalizedExpected);

        var result = await ComparisonEngine.CompareAsync(normalizedExpected, normalizedActual, finalOptions);
        if (result.IsSuccess) return new ComparisonSuccess();

        var comparisonError = result as ComparisonError;
        throw new ComparisonException($"Validation error: {comparisonError?.Message}", comparisonError);
    }

    /// <summary>
    /// ShouldNotMatch is provided only for internal testing and should
    /// not be used in your unit tests. If you find yourself wanting to
    /// use this method, we strongly advise you to rewrite your test to
    /// check for a positive result.
    /// </summary>
    /// <param name="expected"></param>
    /// <returns></returns>
    public ComparisonResult ShouldNotMatch(object? expected)
    {
        var result = ComparisonEngine.Compare(expected, _actual, _options);
        if (!result.IsSuccess) // A failure here is a success. "War is peace, freedom is slavery, ignorance is strength"
        {
            return new ComparisonSuccess();
        }

        throw new ComparisonException($"Expected to not match, but did match: {expected} != {_actual}");
    }

    /// <summary>
    /// Resolves a relative expected file path to an absolute path.
    /// Searches common locations for expected output files.
    /// </summary>
    private static string ResolveExpectedFilePath(string expectedFilePath)
    {
        // If absolute path, use as-is
        if (Path.IsPathRooted(expectedFilePath))
            return expectedFilePath;

        // Look for examples directory relative to current directory or test assembly
        var currentDir = Directory.GetCurrentDirectory();
        var possiblePaths = new[]
        {
            Path.Combine(currentDir, "..", "examples", expectedFilePath),
            Path.Combine(currentDir, "examples", expectedFilePath),
            Path.Combine(currentDir, "..", "..", "examples", expectedFilePath),
            expectedFilePath // Fallback to original path
        };

        return possiblePaths.FirstOrDefault(File.Exists) ?? expectedFilePath;
    }

    /// <summary>
    /// Normalizes expected and actual data for comparison.
    /// Handles single vs multiple document scenarios.
    /// </summary>
    private static (object Expected, object Actual) NormalizeForComparison(List<object> expectedData,
        object? actualOutput)
    {
        // If expected has single item and actual is not array, compare as single objects
        if (expectedData.Count == 1 && actualOutput is not IEnumerable<object>)
            return (expectedData[0], actualOutput ?? new object());

        // If expected has single item that is an array and actual is also an array,
        // unwrap the expected to compare arrays directly
        if (expectedData.Count == 1 &&
            expectedData[0] is IEnumerable<object> expectedArray &&
            (actualOutput is IEnumerable<object> || actualOutput is IEnumerable<BsonDocument>))
            return (expectedArray, actualOutput);

        // Otherwise compare as collections
        return (expectedData.ToArray(), actualOutput ?? Array.Empty<object>());
    }

    /// <summary>
    /// Determines final comparison options based on global ellipsis detection.
    /// </summary>
    private ComparisonOptions DetermineComparisonOptions(object normalizedExpected)
    {
        var hasRootGlobalEllipsis = normalizedExpected is IDictionary<string, object> dict &&
                                    EllipsisPatternMatcher.HasGlobalEllipsis(dict);

        return hasRootGlobalEllipsis
            ? _options with { InheritedGlobalEllipsis = true }
            : _options;
    }
}