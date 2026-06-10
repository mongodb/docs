namespace Utilities.Comparison;

/// <summary>
/// Fluent comparison builder for MongoDB code-example tests. Every comparison
/// is delegated to the language-agnostic comparison kernel (a native Go
/// binary under tools/comparison-kernel/bin/) so behaviour stays consistent
/// across all driver test suites.
/// </summary>
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
            _options.IgnoredFields.Add(fieldName);
        return this;
    }

    public ComparisonResult ShouldMatch(object? expected)
    {
        return ShouldMatchAsync(expected).GetAwaiter().GetResult();
    }

    /// <summary>
    /// Initiate schema-based validation. Mutually exclusive with
    /// <see cref="ShouldMatch"/>, <see cref="WithIgnoredFields"/>, and the
    /// sort APIs.
    /// </summary>
    public ISchemaBuilder ShouldResemble(object? expected)
    {
        return ShouldResembleAsync(expected).GetAwaiter().GetResult();
    }

    public Task<ISchemaBuilder> ShouldResembleAsync(
        object? expected, CancellationToken cancellationToken = default)
    {
        cancellationToken.ThrowIfCancellationRequested();

        if (_shouldMatchCalled)
            throw new ComparisonException(
                "ShouldResemble() cannot be called after ShouldMatch(). These methods are mutually exclusive.");
        if (_options.IgnoredFields.Count > 0)
            throw new ComparisonException(
                "WithIgnoredFields() cannot be used with ShouldResemble(). " +
                "ShouldResemble() with WithSchema() does not support ignored fields.");
        if (_sortApiCalled)
            throw new ComparisonException(
                "WithOrderedSort() and WithUnorderedSort() cannot be used with ShouldResemble(). " +
                "ShouldResemble() with WithSchema() does not support sort options.");

        _shouldResembleCalled = true;
        return Task.FromResult<ISchemaBuilder>(new SchemaBuilder(expected, _actual));
    }

    /// <summary>
    /// Execute the comparison against the expected value via the comparison
    /// kernel. The expected argument can be a file-path string, a JSON-shaped
    /// string, or any structured value (Document, Dictionary, IEnumerable,
    /// primitive). The bridge serialises it appropriately.
    /// </summary>
    public async Task<ComparisonResult> ShouldMatchAsync(
        object? expected, CancellationToken cancellationToken = default)
    {
        cancellationToken.ThrowIfCancellationRequested();
        await Task.Yield();
        cancellationToken.ThrowIfCancellationRequested();

        if (_shouldResembleCalled)
            throw new ComparisonException(
                "ShouldMatch() cannot be called after ShouldResemble(). These methods are mutually exclusive.");

        _shouldMatchCalled = true;

        var expectedContent = await KernelBridge.SerializeExpectedAsync(expected);
        var actualPayload = KernelBridge.SerializeActual(_actual);

        var kernelOptions = new KernelRequestOptions
        {
            ComparisonType = _options.ArrayMode == ArrayComparisonMode.Ordered ? "ordered" : null,
            IgnoreFieldValues = _options.IgnoredFields.Count > 0 ? _options.IgnoredFields : null,
        };

        var response = await KernelBridge.Shared.CompareAsync(
            expectedContent, actualPayload, kernelOptions, cancellationToken);

        if (response.IsMatch) return new ComparisonSuccess();

        if (!string.IsNullOrEmpty(response.Error))
            throw new ComparisonException($"Kernel error: {response.Error}");

        var errorMessage = BuildKernelErrorMessage(response.Errors);
        var firstError = response.Errors?.FirstOrDefault();
        var details = firstError != null
            ? new ComparisonError(
                firstError.Path ?? "",
                firstError.Expected ?? "",
                firstError.Actual ?? "",
                firstError.Message)
            : new ComparisonError(errorMessage);

        throw new ComparisonException($"Validation error: {errorMessage}", details);
    }

    private static string BuildKernelErrorMessage(List<KernelError>? errors)
    {
        if (errors is not { Count: > 0 }) return "Comparison failed";
        return string.Join("\n", errors.Select(e =>
            string.IsNullOrEmpty(e.Path) ? e.Message : $"{e.Path}: {e.Message}"));
    }
}
