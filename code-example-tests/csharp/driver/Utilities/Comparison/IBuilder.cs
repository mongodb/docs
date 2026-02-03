namespace Utilities.Comparison;

public interface IBuilder
{
    ComparisonResult ShouldMatch(object? expected);
    Task<ComparisonResult> ShouldMatchAsync(object? expected, CancellationToken cancellationToken = default);

    /// <summary>
    ///     Initiates schema-based validation where results may vary but must conform to a defined schema.
    ///     This is mutually exclusive with ShouldMatch() - use one or the other.
    ///     Requires WithSchema() to be called to complete validation.
    ///     If expected is a file path, the file will be loaded and parsed.
    /// </summary>
    /// <param name="expected">The expected output to validate against the schema (can be a file path)</param>
    /// <returns>ISchemaBuilder that requires WithSchema() to complete validation</returns>
    /// <remarks>
    ///     Use this when MongoDB results may vary (e.g., Vector Search) but you know:
    ///     - The expected count of documents
    ///     - Required fields that must exist
    ///     - Specific field values that must match
    /// </remarks>
    ISchemaBuilder ShouldResemble(object? expected);

    /// <summary>
    ///     Async version of ShouldResemble. Initiates schema-based validation where results may vary
    ///     but must conform to a defined schema. This is mutually exclusive with ShouldMatch() - use one or the other.
    ///     Requires WithSchema() to be called to complete validation.
    ///     If expected is a file path, the file will be loaded and parsed.
    /// </summary>
    /// <param name="expected">The expected output to validate against the schema (can be a file path)</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>ISchemaBuilder that requires WithSchema() to complete validation</returns>
    Task<ISchemaBuilder> ShouldResembleAsync(object? expected, CancellationToken cancellationToken = default);

    IBuilder WithOrderedSort();
    IBuilder WithUnorderedSort();
    IBuilder WithIgnoredFields(params string[] fieldNames);

    /// <summary>
    /// ShouldNotMatch is provided only for internal testing and should
    /// not be used in your unit tests. If you find yourself wanting to
    /// use this method, we strongly advise you to rewrite your test to
    /// check for a positive result.
    /// </summary>
    /// <param name="expected"></param>
    /// <returns></returns>
    ComparisonResult ShouldNotMatch(object? expected);
}