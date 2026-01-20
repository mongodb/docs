namespace Utilities.Comparison;

/// <summary>
///     Configuration options for schema-based validation.
///     Used with ShouldResemble() to validate that documents match an expected schema
///     rather than exact values.
/// </summary>
public class SchemaValidationOptions
{
    /// <summary>
    ///     The expected number of documents in the result set.
    /// </summary>
    public int Count { get; set; }

    /// <summary>
    ///     Field names that must exist in every document.
    ///     Fields are checked for presence only - values are not validated
    ///     unless also specified in FieldValues.
    /// </summary>
    public string[] RequiredFields { get; set; } = Array.Empty<string>();

    /// <summary>
    ///     Key/value pairs that must match in every document.
    ///     All documents must contain these fields with exactly these values.
    /// </summary>
    public Dictionary<string, object?> FieldValues { get; set; } = new();

    /// <summary>
    ///     Creates a new SchemaValidationOptions with default values.
    /// </summary>
    public SchemaValidationOptions()
    {
    }

    /// <summary>
    ///     Creates a new SchemaValidationOptions with the specified count.
    /// </summary>
    /// <param name="count">Expected number of documents</param>
    public SchemaValidationOptions(int count)
    {
        Count = count;
    }

    /// <summary>
    ///     Creates a new SchemaValidationOptions with full configuration.
    /// </summary>
    /// <param name="count">Expected number of documents</param>
    /// <param name="requiredFields">Fields that must exist in every document</param>
    /// <param name="fieldValues">Key/value pairs that must match in every document</param>
    public SchemaValidationOptions(int count, string[] requiredFields, Dictionary<string, object?> fieldValues)
    {
        Count = count;
        RequiredFields = requiredFields ?? Array.Empty<string>();
        FieldValues = fieldValues ?? new Dictionary<string, object?>();
    }
}