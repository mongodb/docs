using System.Collections;
using System.Globalization;
using System.Reflection;
using System.Text.Json;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Utilities.Comparison;

/// <summary>
///     Normalizes MongoDB-specific types and values for consistent comparison.
///     Uses modern C# pattern matching and switch expressions.
/// </summary>
public static class ValueNormalizer
{
    /// <summary>
    ///     Normalizes a value to a consistent format for comparison.
    /// </summary>
    public static object? Normalize(object? value)
    {
        return value switch
        {
            // Handle null
            null => null,

            // DateTime types - normalize to ISO string format
            DateTime dt => dt.ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ss.fffZ"),
            DateTimeOffset dto => dto.ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ss.fffZ"),

            // MongoDB types - handle specific types first
            Decimal128 dec => dec.ToString(),
            ObjectId objectId => objectId.ToString(),

            // BSON types - convert to standard types (specific types first)
            BsonDocument doc => doc.ToDictionary(element => element.Name, element => Normalize(element.Value)),
            BsonArray array => array.Select(Normalize).ToArray(),
            BsonDateTime bsonDt => bsonDt.ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ss.fffZ"),
            BsonValue bsonValue => NormalizeBsonValue(bsonValue),

            // Collections - normalize each element (preserve specific array types for primitives)
            int[] intArray => intArray, // Preserve int[] type
            string[] stringArray => stringArray, // Preserve string[] type  
            Array array => array.Cast<object?>().Select(Normalize).ToArray(),
            IEnumerable<object> enumerable => enumerable.Select(Normalize).ToArray(),

            // Dictionaries - check for MongoDB Extended JSON patterns first, then normalize
            IDictionary<string, object> dict => NormalizeDictionary(dict),

            // JSON elements
            JsonElement element => NormalizeJsonElement(element),

            // Custom C# types (POCOs)
            var customType when IsCustomType(customType) => NormalizeCustomType(customType),

            // Primitive types and strings
            string str => NormalizeString(str), // Handle both date normalization and whitespace
            _ => value
        };
    }

    /// <summary>
    ///     Handles normalization of JsonElement values from parsed JSON.
    /// </summary>
    private static object NormalizeJsonElement(JsonElement element)
    {
        return element.ValueKind switch
        {
            JsonValueKind.String => element.GetString()!,
            JsonValueKind.Number when element.TryGetInt64(out var longValue) => longValue,
            JsonValueKind.Number when element.TryGetDouble(out var doubleValue) => doubleValue,
            JsonValueKind.True => true,
            JsonValueKind.False => false,
            JsonValueKind.Null => null!,
            JsonValueKind.Array => element.EnumerateArray().Select(NormalizeJsonElement).ToArray(),
            JsonValueKind.Object => element.EnumerateObject()
                .ToDictionary(prop => prop.Name, prop => NormalizeJsonElement(prop.Value)),
            _ => element.ToString()!
        };
    }

    /// <summary>
    ///     Normalizes a dictionary, handling MongoDB Extended JSON patterns.
    /// </summary>
    private static object NormalizeDictionary(IDictionary<string, object> dict)
    {
        // Check for MongoDB Extended JSON date pattern: { "$date": "2021-12-18T15:55:00Z" }
        if (dict.Count == 1 && dict.TryGetValue("$date", out var dateValue) && dateValue is string dateStr)
            if (TryParseIsoDate(dateStr, out var parsedDate))
                return parsedDate.ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ss.fffZ");

        // Check for MongoDB Extended JSON ObjectId pattern: { "$oid": "507f1f77bcf86cd799439011" }
        if (dict.Count == 1 && dict.TryGetValue("$oid", out var oidValue) && oidValue is string oidStr) return oidStr;

        // For regular dictionaries, normalize each key/value pair
        return dict.ToDictionary(kvp => kvp.Key, kvp => Normalize(kvp.Value));
    }

    /// <summary>
    ///     Normalizes a string by checking for date patterns and normalizing whitespace.
    ///     First attempts date normalization, then applies whitespace normalization for general strings.
    /// </summary>
    private static string NormalizeString(string value)
    {
        // First, check if this is a date format
        if (TryParseIsoDate(value, out var dateTime))
            return dateTime.ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ss.fffZ");

        // For non-date strings, normalize whitespace by trimming each line
        // This handles multi-line strings like the BoroughList test case
        if (value.Contains('\n') || value.Contains('\r'))
        {
            // Multi-line string - trim each line but preserve line breaks
            var lines = value.Split(new[] { '\r', '\n' }, StringSplitOptions.None);
            var trimmedLines = lines.Select(line => line.TrimEnd());
            return string.Join("\n", trimmedLines).TrimEnd('\n', '\r');
        }

        // Single-line string - just trim trailing whitespace
        return value.TrimEnd();
    }

    /// <summary>
    ///     Legacy method for backward compatibility. Use NormalizeString instead.
    /// </summary>
    public static string NormalizeIfDate(string value)
    {
        if (TryParseIsoDate(value, out var dateTime))
            return dateTime.ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ss.fffZ");
        return value;
    }

    /// <summary>
    ///     Normalizes a BsonValue to a standard .NET type or null.
    ///     Returns null for BsonType.Null values, otherwise returns appropriate .NET equivalents.
    /// </summary>
    private static object? NormalizeBsonValue(BsonValue bsonValue)
    {
        return bsonValue.BsonType switch
        {
            BsonType.Double => bsonValue.ToDouble(),
            BsonType.String => bsonValue.ToString() ?? string.Empty,
            BsonType.Document => bsonValue.ToBsonDocument()
                .ToDictionary(element => element.Name, element => Normalize(element.Value)),
            BsonType.Array => bsonValue.AsBsonArray.Select(Normalize).ToArray(),
            BsonType.Binary => bsonValue.AsByteArray,
            BsonType.ObjectId => bsonValue.AsObjectId.ToString(),
            BsonType.Boolean => bsonValue.ToBoolean(),
            BsonType.DateTime => bsonValue.ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ss.fffZ"),
            BsonType.Null => null,
            BsonType.Int32 => bsonValue.ToInt32(),
            BsonType.Int64 => bsonValue.ToInt64(),
            BsonType.Decimal128 => bsonValue.AsDecimal128.ToString(),
            _ => bsonValue.ToString() ?? string.Empty
        };
    }

    /// <summary>
    ///     Attempts to parse a string as an ISO 8601 date with improved timezone handling.
    ///     Supports multiple MongoDB Extended JSON date formats:
    ///     - "2023-09-04T10:15:30.123Z" (UTC with Z)
    ///     - "2023-09-04T10:15:30.123+00:00" (UTC with explicit offset)
    ///     - "2023-09-04T10:16:30.456000Z" (UTC with microseconds)
    /// </summary>
    private static bool TryParseIsoDate(string value, out DateTime dateTime)
    {
        dateTime = default;

        // Must contain 'T' to be ISO 8601 format
        if (!value.Contains('T'))
            return false;

        // Try parsing with DateTimeOffset first for better timezone handling
        if (DateTimeOffset.TryParse(value, null, DateTimeStyles.RoundtripKind, out var dateTimeOffset))
        {
            dateTime = dateTimeOffset.UtcDateTime;
            return true;
        }

        // Fallback to DateTime parsing
        if (DateTime.TryParse(value, null, DateTimeStyles.RoundtripKind, out dateTime))
        {
            // Ensure we normalize to UTC for consistent comparison
            if (dateTime.Kind == DateTimeKind.Unspecified)
                // Assume UTC if no timezone info (common in MongoDB outputs)
                dateTime = DateTime.SpecifyKind(dateTime, DateTimeKind.Utc);
            else if (dateTime.Kind == DateTimeKind.Local) dateTime = dateTime.ToUniversalTime();
            return true;
        }

        return false;
    }

    /// <summary>
    ///     Determines if a value is a custom C# type that should be normalized.
    ///     Excludes primitives, collections, and framework types.
    /// </summary>
    private static bool IsCustomType(object? value)
    {
        if (value is null) return false;

        var type = value.GetType();

        // Skip primitives and common framework types
        if (type.IsPrimitive || type.IsEnum || type == typeof(string) ||
            type == typeof(decimal) || type == typeof(DateTime) || type == typeof(DateTimeOffset) ||
            type == typeof(Guid) || type == typeof(TimeSpan))
            return false;

        // Skip collections, dictionaries, and arrays
        if (typeof(IEnumerable).IsAssignableFrom(type) && type != typeof(string))
            return false;

        // Skip BSON and MongoDB types (already handled)
        if (type.Namespace?.StartsWith("MongoDB.Bson") == true)
            return false;

        // Skip System.Text.Json types (already handled)  
        if (type == typeof(JsonElement))
            return false;

        // This is likely a custom class, struct, or record
        return true;
    }

    /// <summary>
    ///     Normalizes custom types to dictionaries by extracting properties and fields.
    ///     The resulting dictionary may contain null values for properties/fields that are null.
    /// </summary>
    private static object NormalizeCustomType(object value)
    {
        var type = value.GetType();
        var result = new Dictionary<string, object?>();

        NormalizeTypeProperties(value, type, result);
        NormalizeTypeFields(value, type, result);

        return result;
    }

    /// <summary>
    ///     Normalizes public properties of a type, respecting BSON attributes.
    ///     Skips null property values and adds normalized values to the result dictionary.
    /// </summary>
    private static void NormalizeTypeProperties(object value, Type type, Dictionary<string, object?> result)
    {
        var properties = GetBsonEligibleProperties(type);

        foreach (var property in properties)
        {
            var propertyValue = property.GetValue(value);
            if (propertyValue is null) continue;

            var fieldName = GetBsonFieldName(property);
            result[fieldName] = Normalize(propertyValue);
        }
    }

    /// <summary>
    ///     Normalizes public fields of a type, avoiding duplication with properties.
    ///     Skips null field values and adds normalized values to the result dictionary.
    /// </summary>
    private static void NormalizeTypeFields(object value, Type type, Dictionary<string, object?> result)
    {
        var fields = GetBsonEligibleFields(type);

        foreach (var field in fields)
        {
            var fieldValue = field.GetValue(value);
            if (fieldValue is null) continue;

            var fieldName = GetBsonFieldName(field);

            // Only add if not already added by property
            if (!result.ContainsKey(fieldName)) result[fieldName] = Normalize(fieldValue);
        }
    }

    /// <summary>
    ///     Gets properties eligible for BSON serialization.
    /// </summary>
    private static PropertyInfo[] GetBsonEligibleProperties(Type type)
    {
        return type.GetProperties(BindingFlags.Public | BindingFlags.Instance)
            .Where(p => p.CanRead && !HasBsonIgnoreAttribute(p))
            .ToArray();
    }

    /// <summary>
    ///     Gets fields eligible for BSON serialization.
    /// </summary>
    private static FieldInfo[] GetBsonEligibleFields(Type type)
    {
        return type.GetFields(BindingFlags.Public | BindingFlags.Instance)
            .Where(f => !HasBsonIgnoreAttribute(f))
            .ToArray();
    }

    /// <summary>
    ///     Checks if a member has the BsonIgnore attribute.
    /// </summary>
    private static bool HasBsonIgnoreAttribute(MemberInfo member)
    {
        return member.GetCustomAttributes(typeof(BsonIgnoreAttribute), false).Any();
    }

    /// <summary>
    ///     Normalizes decimal values to consistent string representation.
    ///     Removes trailing zeros for consistent comparison.
    /// </summary>
    private static string NormalizeDecimal(decimal value)
    {
        // Convert to string and remove trailing zeros
        return value.ToString("0.##############");
    }

    /// <summary>
    ///     Gets the BSON field name for a property or field, respecting BsonElement attributes.
    /// </summary>
    private static string GetBsonFieldName(MemberInfo member)
    {
        // Check for BsonElement attribute first
        var bsonElement = member.GetCustomAttribute<BsonElementAttribute>();
        if (bsonElement != null && !string.IsNullOrEmpty(bsonElement.ElementName)) return bsonElement.ElementName;

        // Check for BsonId attribute (maps to "_id")
        if (member.GetCustomAttribute<BsonIdAttribute>() != null) return "_id";

        // Use the member name as fallback
        return member.Name;
    }
}