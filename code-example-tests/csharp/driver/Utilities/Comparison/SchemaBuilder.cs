namespace Utilities.Comparison;

/// <summary>
/// Builder for schema-based validation. Delegates the actual validation to
/// the language-agnostic comparison kernel so behaviour matches every other
/// driver suite.
/// </summary>
public class SchemaBuilder : ISchemaBuilder
{
    private readonly object? _expected;
    private readonly object? _actual;

    internal SchemaBuilder(object? expected, object? actual)
    {
        _expected = expected;
        _actual = actual;
    }

    /// <inheritdoc />
    public ComparisonResult WithSchema(SchemaValidationOptions schema)
    {
        return WithSchemaAsync(schema).GetAwaiter().GetResult();
    }

    /// <inheritdoc />
    public async Task<ComparisonResult> WithSchemaAsync(
        SchemaValidationOptions schema, CancellationToken cancellationToken = default)
    {
        cancellationToken.ThrowIfCancellationRequested();

        if (schema == null)
            throw new ComparisonException(
                "Schema validation options cannot be null. ShouldResemble() requires " +
                "WithSchema() to be called with valid options.");
        if (schema.Count < 0)
            throw new ComparisonException(
                "Schema validation requires a non-negative Count.");

        ValidateFieldValuesInRequiredFields(schema);

        var expectedContent = await KernelBridge.SerializeExpectedAsync(_expected);
        var actualPayload = KernelBridge.SerializeActual(_actual);

        var fieldValues = new Dictionary<string, object?>(schema.FieldValues.Count);
        foreach (var (key, value) in schema.FieldValues)
            fieldValues[key] = ValueNormalizer.Normalize(value);

        var kernelOptions = new KernelRequestOptions
        {
            Schema = new KernelSchema
            {
                Count = schema.Count,
                RequiredFields = schema.RequiredFields,
                FieldValues = fieldValues,
            },
        };

        var response = await KernelBridge.Shared.CompareAsync(
            expectedContent, actualPayload, kernelOptions, cancellationToken);

        if (response.IsMatch) return new ComparisonSuccess();

        if (!string.IsNullOrEmpty(response.Error))
            throw new ComparisonException($"Schema validation failed: {response.Error}");

        var errorMessage = BuildKernelErrorMessage(response.Errors);
        throw new ComparisonException($"Schema validation failed: {errorMessage}");
    }

    /// <summary>
    /// Validate that every key in <see cref="SchemaValidationOptions.FieldValues"/>
    /// is also listed in <see cref="SchemaValidationOptions.RequiredFields"/>.
    /// </summary>
    private static void ValidateFieldValuesInRequiredFields(SchemaValidationOptions schema)
    {
        if (schema.FieldValues.Count == 0) return;
        var required = new HashSet<string>(schema.RequiredFields);
        var missing = schema.FieldValues.Keys.Where(f => !required.Contains(f)).ToList();
        if (missing.Count > 0)
        {
            throw new ComparisonException(
                $"Schema validation configuration error: FieldValues contains field(s) " +
                $"[{string.Join(", ", missing.Select(f => $"'{f}'"))}] " +
                "that are not in RequiredFields. All fields in FieldValues must also be " +
                "listed in RequiredFields.");
        }
    }

    private static string BuildKernelErrorMessage(List<KernelError>? errors)
    {
        if (errors is not { Count: > 0 }) return "Validation failed";
        return string.Join("\n", errors.Select(e =>
            string.IsNullOrEmpty(e.Path) ? e.Message : $"{e.Path}: {e.Message}"));
    }
}
