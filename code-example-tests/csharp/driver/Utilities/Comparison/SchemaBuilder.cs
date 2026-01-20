using System.Collections;

namespace Utilities.Comparison;

/// <summary>
///     Builder for schema-based validation.
///     Validates that both expected and actual outputs conform to a specified schema
///     rather than requiring exact matches.
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
    public async Task<ComparisonResult> WithSchemaAsync(SchemaValidationOptions schema, CancellationToken cancellationToken = default)
    {
        cancellationToken.ThrowIfCancellationRequested();

        if (schema == null)
        {
            throw new ComparisonException("Schema validation options cannot be null. ShouldResemble() requires WithSchema() to be called with valid options.");
        }

        // Validate that all FieldValues keys are also in RequiredFields
        ValidateFieldValuesInRequiredFields(schema);

        // Normalize both expected and actual to arrays of documents
        var expectedDocs = NormalizeToDocumentArray(_expected);
        var actualDocs = NormalizeToDocumentArray(_actual);

        // Validate count for both expected and actual
        ValidateCount(expectedDocs, "expected", schema.Count);
        ValidateCount(actualDocs, "actual", schema.Count);

        // Validate schema for expected documents
        ValidateDocumentsAgainstSchema(expectedDocs, "expected", schema);

        // Validate schema for actual documents
        ValidateDocumentsAgainstSchema(actualDocs, "actual", schema);

        return await Task.FromResult(new ComparisonSuccess());
    }

    /// <summary>
    ///     Validates that all fields in FieldValues are also present in RequiredFields.
    /// </summary>
    private static void ValidateFieldValuesInRequiredFields(SchemaValidationOptions schema)
    {
        if (schema.FieldValues.Count == 0)
            return;

        var requiredFieldsSet = new HashSet<string>(schema.RequiredFields);
        var missingFields = schema.FieldValues.Keys
            .Where(fieldName => !requiredFieldsSet.Contains(fieldName))
            .ToList();

        if (missingFields.Count > 0)
        {
            throw new ComparisonException(
                $"Schema validation configuration error: FieldValues contains field(s) [{string.Join(", ", missingFields.Select(f => $"'{f}'"))}] " +
                $"that are not in RequiredFields. All fields in FieldValues must also be listed in RequiredFields.");
        }
    }

    /// <summary>
    ///     Normalizes various input types to an array of dictionaries for schema validation.
    /// </summary>
    private static Dictionary<string, object?>[] NormalizeToDocumentArray(object? value)
    {
        if (value == null)
            return Array.Empty<Dictionary<string, object?>>();

        // Already a dictionary array
        if (value is Dictionary<string, object?>[] dictArray)
            return dictArray;

        // Single dictionary
        if (value is Dictionary<string, object?> singleDict)
            return new[] { singleDict };

        // IDictionary<string, object> (covers most dictionary types)
        if (value is IDictionary<string, object> genericDict)
            return new[] { genericDict.ToDictionary(kvp => kvp.Key, kvp => (object?)kvp.Value) };

        // IEnumerable of dictionaries
        if (value is IEnumerable<Dictionary<string, object?>> dictEnumerable)
            return dictEnumerable.ToArray();

        if (value is IEnumerable<IDictionary<string, object>> genericDictEnumerable)
            return genericDictEnumerable
                .Select(d => d.ToDictionary(kvp => kvp.Key, kvp => (object?)kvp.Value))
                .ToArray();

        // Normalize using ValueNormalizer and try again
        var normalized = ValueNormalizer.Normalize(value);

        if (normalized is Dictionary<string, object?> normalizedDict)
            return new[] { normalizedDict };

        if (normalized is Dictionary<string, object> normalizedGenericDict)
            return new[] { normalizedGenericDict.ToDictionary(kvp => kvp.Key, kvp => (object?)kvp.Value) };

        // Handle arrays of normalized objects
        if (normalized is object?[] normalizedArray)
        {
            var result = new List<Dictionary<string, object?>>();
            foreach (var item in normalizedArray)
            {
                if (item is Dictionary<string, object?> itemDict)
                    result.Add(itemDict);
                else if (item is Dictionary<string, object> itemGenericDict)
                    result.Add(itemGenericDict.ToDictionary(kvp => kvp.Key, kvp => (object?)kvp.Value));
                else if (item is IDictionary<string, object> itemIDict)
                    result.Add(itemIDict.ToDictionary(kvp => kvp.Key, kvp => (object?)kvp.Value));
                else
                    throw new ComparisonException($"Schema validation requires documents (dictionaries), but found element of type: {item?.GetType().Name ?? "null"}");
            }
            return result.ToArray();
        }

        // Handle IEnumerable (non-generic) 
        if (value is IEnumerable enumerable)
        {
            var result = new List<Dictionary<string, object?>>();
            foreach (var item in enumerable)
            {
                var normalizedItem = ValueNormalizer.Normalize(item);
                if (normalizedItem is Dictionary<string, object?> itemDict)
                    result.Add(itemDict);
                else if (normalizedItem is Dictionary<string, object> itemGenericDict)
                    result.Add(itemGenericDict.ToDictionary(kvp => kvp.Key, kvp => (object?)kvp.Value));
                else if (normalizedItem is IDictionary<string, object> itemIDict)
                    result.Add(itemIDict.ToDictionary(kvp => kvp.Key, kvp => (object?)kvp.Value));
                else
                    throw new ComparisonException($"Schema validation requires documents (dictionaries), but found element of type: {normalizedItem?.GetType().Name ?? "null"}");
            }
            return result.ToArray();
        }

        throw new ComparisonException($"Schema validation requires an array of documents, but received: {value.GetType().Name}");
    }

    /// <summary>
    ///     Validates that the document count matches the expected count.
    /// </summary>
    private static void ValidateCount(Dictionary<string, object?>[] docs, string source, int expectedCount)
    {
        if (docs.Length != expectedCount)
        {
            throw new ComparisonException(
                $"Schema validation failed: {source} has {docs.Length} document(s), but schema requires {expectedCount}.");
        }
    }

    /// <summary>
    ///     Validates all documents against the schema requirements.
    /// </summary>
    private static void ValidateDocumentsAgainstSchema(Dictionary<string, object?>[] docs, string source, SchemaValidationOptions schema)
    {
        for (var i = 0; i < docs.Length; i++)
        {
            var doc = docs[i];
            var docPath = $"{source}[{i}]";

            // Check required fields exist
            foreach (var requiredField in schema.RequiredFields)
            {
                if (!doc.ContainsKey(requiredField))
                {
                    throw new ComparisonException(
                        $"Schema validation failed at {docPath}: Missing required field '{requiredField}'.");
                }
            }

            // Check field values match
            foreach (var (fieldName, expectedValue) in schema.FieldValues)
            {
                if (!doc.ContainsKey(fieldName))
                {
                    throw new ComparisonException(
                        $"Schema validation failed at {docPath}: Missing field '{fieldName}' which is required by fieldValues.");
                }

                var actualValue = doc[fieldName];
                if (!ValuesAreEqual(expectedValue, actualValue))
                {
                    throw new ComparisonException(
                        $"Schema validation failed at {docPath}: Field '{fieldName}' has value '{FormatValue(actualValue)}', but schema requires '{FormatValue(expectedValue)}'.");
                }
            }
        }
    }

    /// <summary>
    ///     Compares two values for equality, handling null and type normalization.
    /// </summary>
    private static bool ValuesAreEqual(object? expected, object? actual)
    {
        if (expected == null && actual == null)
            return true;

        if (expected == null || actual == null)
            return false;

        // Normalize both values for comparison
        var normalizedExpected = ValueNormalizer.Normalize(expected);
        var normalizedActual = ValueNormalizer.Normalize(actual);

        if (normalizedExpected == null && normalizedActual == null)
            return true;

        if (normalizedExpected == null || normalizedActual == null)
            return false;

        // Handle numeric type comparisons (int, long, double, etc.)
        if (IsNumeric(normalizedExpected) && IsNumeric(normalizedActual))
        {
            return Convert.ToDouble(normalizedExpected).Equals(Convert.ToDouble(normalizedActual));
        }

        return normalizedExpected.Equals(normalizedActual);
    }

    /// <summary>
    ///     Checks if a value is a numeric type.
    /// </summary>
    private static bool IsNumeric(object value)
    {
        return value is sbyte or byte or short or ushort or int or uint or long or ulong or float or double or decimal;
    }

    /// <summary>
    ///     Formats a value for display in error messages.
    /// </summary>
    private static string FormatValue(object? value)
    {
        if (value == null)
            return "null";

        if (value is string str)
            return $"\"{str}\"";

        return value.ToString() ?? "null";
    }
}