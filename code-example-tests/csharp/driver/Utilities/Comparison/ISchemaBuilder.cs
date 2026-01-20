namespace Utilities.Comparison;

/// <summary>
///     Interface for schema-based validation builder.
///     This interface is returned by ShouldResemble() and requires WithSchema() to complete validation.
/// </summary>
public interface ISchemaBuilder
{
    /// <summary>
    ///     Validates that both expected and actual outputs conform to the specified schema.
    ///     This is the terminal operation that performs the validation.
    /// </summary>
    /// <param name="schema">Schema validation options specifying count, required fields, and field values</param>
    /// <returns>ComparisonResult indicating success or failure</returns>
    /// <exception cref="ComparisonException">Thrown when validation fails</exception>
    ComparisonResult WithSchema(SchemaValidationOptions schema);

    /// <summary>
    ///     Async version of WithSchema validation.
    /// </summary>
    /// <param name="schema">Schema validation options specifying count, required fields, and field values</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>ComparisonResult indicating success or failure</returns>
    /// <exception cref="ComparisonException">Thrown when validation fails</exception>
    Task<ComparisonResult> WithSchemaAsync(SchemaValidationOptions schema, CancellationToken cancellationToken = default);
}