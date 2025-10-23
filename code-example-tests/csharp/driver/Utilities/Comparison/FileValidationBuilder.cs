namespace Utilities.Comparison;

public sealed class FileValidationBuilder : IBuilder
{
    private readonly string? _filePath;
    private ComparisonOptions _options = ComparisonOptions.Default;

    internal FileValidationBuilder(string? filePath)
    {
        _filePath = filePath;
    }

    public IBuilder WithOrderedSort()
    {
        _options = ComparisonOptions.Ordered;
        return this;
    }
    public IBuilder WithUnorderedSort()
    {
        _options = ComparisonOptions.Unordered;
        return this;
    }
    public IBuilder WithIgnoredFields(params string[] fieldNames)
    {
        _options = ComparisonOptions.IgnoreFields(fieldNames);
        return this;
    }

    /// <summary>
    ///     Validates against an expected output file with custom options.
    /// </summary>
    /// <param name="expectedFilePath">Path to expected output file (relative to examples directory)</param>
    /// <param name="options">Comparison options</param>
    /// <returns>Validation result</returns>
    public ComparisonResult ShouldMatch(object? actualOutput)
    {
        try
        {
            if (_filePath != null)
            {
                var fullPath = ResolveExpectedFilePath(_filePath);
                var parseResult = FileContentsParser.ParseFile(fullPath);
                if (!parseResult.IsSuccess)
                {
                    return new ComparisonError(
                        ($"Failed to parse expected output file: {parseResult.Error}"));
                }

                var result = PerformValidation(parseResult.Data!, actualOutput);
                if (!result.IsSuccess)
                    if (result.Error != null)
                        return new ComparisonError
                            ($"Validation error: {result.Error}");
            }
        }
        catch (Exception ex)
        {
            return new ComparisonError($"Validation error: {ex.Message}");
        }

        return new ComparisonSuccess();
    }

    /// <summary>
    /// ShouldNotMatch is provided only for internal testing and should
    /// not be used in your unit tests. If you find yourself wanting to
    /// use this method, we strongly advise you to rewrite your test to
    /// check for a positive result.
    /// </summary>
    /// <param name="expected"></param>
    /// <returns></returns>
    public ComparisonResult ShouldNotMatch(object? actualOutput)
    {
        var result = ShouldMatch(actualOutput);
        if (result.IsSuccess)
        {
            return new ComparisonError($"Validation error: the two objects match, but were expected not to.");
        }
        return new ComparisonSuccess();
    }

    public async Task<ComparisonResult> ShouldMatchAsync(object? expected, CancellationToken cancellationToken = default)
    {
        cancellationToken.ThrowIfCancellationRequested();
        try
        {
            if (_filePath != null)
            {
                var fullPath = ResolveExpectedFilePath(_filePath);
                var parseResult = await FileContentsParser.ParseFileAsync(fullPath);

                if (!parseResult.IsSuccess)
                    return new ComparisonError($"Failed to parse expected output file: {parseResult.Error}");

                var result = PerformValidation(parseResult.Data!, expected);
                if (!result.IsSuccess)
                    if (result.Error != null)
                        return new ComparisonError($"Validation error: {result.Error}");
            }
        }
        catch (Exception ex)
        {
            return new ComparisonError($"Validation error: {ex.Message}");
        }
        return new ComparisonSuccess();
    }


    /// <summary>
    ///     Core validation logic shared between file and text validation.
    /// </summary>
    public ComparisonResult PerformValidation(List<object> expectedData, object? actualData)
    {
        var (normalizedExpected, normalizedActual) =
            NormalizeForComparison(expectedData, actualData);

        _options = DetermineComparisonOptions(normalizedExpected);
        var comparisonResult = ComparisonEngine.Compare(normalizedExpected, normalizedActual, _options);

        return comparisonResult.IsSuccess
            ? new ComparisonSuccess()
            : new ComparisonError(comparisonResult.Error!.ToString());
    }

    /// <summary>
    ///     Determines final comparison options based on global ellipsis detection.
    /// </summary>
    private ComparisonOptions DetermineComparisonOptions(object normalizedExpected)
    {
        var hasRootGlobalEllipsis = normalizedExpected is IDictionary<string, object> dict &&
                                    EllipsisPatternMatcher.HasGlobalEllipsis(dict);

        return hasRootGlobalEllipsis
            ? _options with { InheritedGlobalEllipsis = true }
            : _options;
    }

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
            actualOutput is IEnumerable<object>)
            return (expectedArray, actualOutput);

        // Otherwise compare as collections
        return (expectedData.ToArray(), actualOutput ?? Array.Empty<object>());
    }
}
