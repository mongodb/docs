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
    /// </summary>
    /// <param name="expected">The expected output to validate against the schema</param>
    /// <returns>ISchemaBuilder that requires WithSchema() to complete validation</returns>
    /// <exception cref="ComparisonException">
    ///     Thrown if WithIgnoredFields(), WithOrderedSort(), or WithUnorderedSort() was called,
    ///     or if ShouldMatch() was already called.
    /// </exception>
    public ISchemaBuilder ShouldResemble(object? expected)
    {
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
        return new SchemaBuilder(expected, _actual);
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

        if (_shouldResembleCalled)
        {
            throw new ComparisonException(
                "ShouldMatch() cannot be called after ShouldResemble(). These methods are mutually exclusive.");
        }

        _shouldMatchCalled = true;

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
                    return await ComparisonEngine.CompareAsync(parsedExpected, parsedActual, _options);
                }
                return await ComparisonEngine.CompareAsync(parsedExpected, _actual, _options);
            }
            return await ComparisonEngine.CompareAsync(stringExpected, _actual, _options);
        }

        result = await ComparisonEngine.CompareAsync(expected, _actual, _options);
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