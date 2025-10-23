namespace Utilities.Comparison;

public class ExpectBuilder : IBuilder
{
    private readonly object? _actual;
    private ComparisonOptions _options = ComparisonOptions.Default;

    internal ExpectBuilder(object? actual)
    {
        _actual = actual;
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

    public ComparisonResult ShouldMatch(object? expected)
    {
        ComparisonResult result;
        if (expected is string stringExpected)
        {
            if (EllipsisPatternMatcher.TryMatch(stringExpected, _actual))
            {
                return new ComparisonSuccess();
            }
            if (JsonUtilities.LooksLikeJson(stringExpected))
            {
                var parsedExpected = FileContentsParser.ParseText(stringExpected);
                if (_actual is string stringActual && JsonUtilities.LooksLikeJson(stringActual))
                {
                    var parsedActual = FileContentsParser.ParseText(stringActual);
                    return ComparisonEngine.Compare(parsedExpected, parsedActual, _options);
                }
                return ComparisonEngine.Compare(parsedExpected, _actual, _options);
            }
            return ComparisonEngine.Compare(stringExpected, _actual, _options);
        }

        result = ComparisonEngine.Compare(expected, _actual, _options);
        if (result.IsSuccess) return new ComparisonSuccess();

        var comparisonError = result as ComparisonError;
        throw new ComparisonException($"Expected to match, but did not: {expected} != {_actual}",
            comparisonError);
    }

    /// <summary>
    /// ShouldNotMatch is provided only for internal testing and should
    /// not be used in your unit tests. If you find yourself wanting to
    /// use this method, we strongly advise you to rewrite your test to
    /// check for a positive result.
    /// </summary>
    /// <param name="expected"></param>
    /// <param name="cancellationToken"></param>
    /// <returns></returns>
    public async Task<ComparisonResult> ShouldMatchAsync(object? expected,
    CancellationToken cancellationToken = default)
    {
        cancellationToken.ThrowIfCancellationRequested();

        var result = await ComparisonEngine.CompareAsync(expected, _actual, _options, string.Empty,
            cancellationToken);

        if (result.IsSuccess) return new ComparisonSuccess();

        var comparisonError = result as ComparisonError;
        throw new ComparisonException($"Expected to match, but did not: {expected} != {_actual}",
            comparisonError);
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
}