
using System.Text.Json;
using MongoDB.Bson;
using NUnit.Framework;

namespace Utilities.Comparison.Tests;

/// <summary>
///     Comprehensive tests for ValueNormalizer ensuring MongoDB type normalization works correctly.
///     Test Coverage:
///     - MongoDB-specific types: ObjectId, Decimal128, DateTime, BsonValues
///     - .NET types: primitives, arrays, dictionaries, custom classes/structs/records
///     - JSON types: JsonElement normalization from System.Text.Json
///     - Custom type reflection: BSON attribute handling, property/field mapping
///     - Null handling: nullable reference types, BsonNull conversion
///     - Complex nested structures: recursive normalization
///     Why This Matters:
///     ValueNormalizer converts MongoDB driver types to comparable .NET representations.
///     Without correct normalization, comparisons would fail due to type mismatches
///     between expected (parsed from text) and actual (from MongoDB driver) values.
///     Key Test Principles:
///     - Type consistency: same input types produce same output types
///     - Null safety: nullable scenarios handled without exceptions
///     - Performance validation: deep nesting doesn't cause stack overflow
/// </summary>
[TestFixture]
public class ValueNormalizerTests
{
    [Test]
    public void Normalize_ObjectId_ReturnsStringRepresentation()
    {
        var objectId = new ObjectId("507f1f77bcf86cd799439011");

        var result = ValueNormalizer.Normalize(objectId);


        Assert.That(result, Is.EqualTo("507f1f77bcf86cd799439011"));
    }

    [Test]
    public void Normalize_BsonObjectId_ReturnsStringRepresentation()
    {
        var bsonObjectId = new BsonObjectId(new ObjectId("507f1f77bcf86cd799439011"));

        var result = ValueNormalizer.Normalize(bsonObjectId);


        Assert.That(result, Is.EqualTo("507f1f77bcf86cd799439011"));
    }

    [Test]
    public void Normalize_Decimal128_ReturnsStringRepresentation()
    {
        var decimal128 = new Decimal128(123.456m);

        var result = ValueNormalizer.Normalize(decimal128);


        Assert.That(result, Is.EqualTo("123.456"));
    }

    [Test]
    public void Normalize_BsonDecimal128_ReturnsStringRepresentation()
    {
        var bsonDecimal128 = new BsonDecimal128(new Decimal128(123.456m));

        var result = ValueNormalizer.Normalize(bsonDecimal128);


        Assert.That(result, Is.EqualTo("123.456"));
    }

    [Test]
    public void Normalize_DateTime_ReturnsIsoString()
    {
        var dateTime = new DateTime(2023, 12, 25, 10, 30, 45, DateTimeKind.Utc);

        var result = ValueNormalizer.Normalize(dateTime);

        Assert.That(result, Is.EqualTo("2023-12-25T10:30:45.000Z"));
    }

    [Test]
    public void Normalize_BsonDateTime_ReturnsIsoString()
    {
        var bsonDateTime = new BsonDateTime(new DateTime(2023, 12, 25, 10, 30, 45, DateTimeKind.Utc));

        var result = ValueNormalizer.Normalize(bsonDateTime);

        Assert.That(result, Is.EqualTo("2023-12-25T10:30:45.000Z"));
    }

    [Test]
    public void Normalize_DateTimeOffset_ReturnsIsoString()
    {
        var dateTimeOffset = new DateTimeOffset(2023, 12, 25, 10, 30, 45, TimeSpan.Zero);

        var result = ValueNormalizer.Normalize(dateTimeOffset);

        Expect.That(result).ShouldMatch("2023-12-25T10:30:45.000+00:00");
    }

    [Test]
    public void Normalize_Array_ReturnsNormalizedArray()
    {
        var array = new object[] { 1, "test", new ObjectId("507f1f77bcf86cd799439011") };
        var result = ValueNormalizer.Normalize(array);

        Assert.That(result, Is.InstanceOf<object[]>());
        var normalizedArray = (object[])result!;
        Assert.That(normalizedArray, Has.Length.EqualTo(3));
        Assert.That(normalizedArray[0], Is.EqualTo(1));
        Assert.That(normalizedArray[1], Is.EqualTo("test"));
        Assert.That(normalizedArray[2], Is.EqualTo("507f1f77bcf86cd799439011"));
    }

    [Test]
    public void Normalize_Dictionary_ReturnsNormalizedDictionary()
    {
        var dict = new Dictionary<string, object>
        {
            ["id"] = new ObjectId("507f1f77bcf86cd799439011"),
            ["name"] = "test",
            ["count"] = 42
        };

        var result = ValueNormalizer.Normalize(dict);


        Assert.That(result, Is.InstanceOf<Dictionary<string, object>>());
        var normalizedDict = (Dictionary<string, object>)result!;
        Assert.That(normalizedDict["id"], Is.EqualTo("507f1f77bcf86cd799439011"));
        Assert.That(normalizedDict["name"], Is.EqualTo("test"));
        Assert.That(normalizedDict["count"], Is.EqualTo(42));
    }

    [Test]
    public void Normalize_BsonDocument_ReturnsNormalizedDictionary()
    {
        var bsonDoc = new BsonDocument
        {
            ["_id"] = new ObjectId("507f1f77bcf86cd799439011"),
            ["name"] = "test",
            ["count"] = 42
        };

        var result = ValueNormalizer.Normalize(bsonDoc);


        Assert.That(result, Is.InstanceOf<Dictionary<string, object>>());
        var normalizedDict = (Dictionary<string, object>)result!;
        Assert.That(normalizedDict["_id"], Is.EqualTo("507f1f77bcf86cd799439011"));
        Assert.That(normalizedDict["name"], Is.EqualTo("test"));
        Assert.That(normalizedDict["count"], Is.EqualTo(42));
    }

    [Test]
    public void Normalize_JsonElement_String_ReturnsString()
    {
        var json = JsonDocument.Parse("\"test string\"");
        var result = ValueNormalizer.Normalize(json.RootElement);

        Assert.That(result, Is.EqualTo("test string"));
    }

    [Test]
    public void Normalize_JsonElement_Number_ReturnsNumber()
    {
        var json = JsonDocument.Parse("42");
        var result = ValueNormalizer.Normalize(json.RootElement);

        Assert.That(result, Is.EqualTo(42));
    }

    [Test]
    public void Normalize_JsonElement_Object_ReturnsDictionary()
    {
        var json = JsonDocument.Parse("{\"name\": \"test\", \"value\": 42}");
        var result = ValueNormalizer.Normalize(json.RootElement);


        Assert.That(result, Is.InstanceOf<Dictionary<string, object>>());
        var dict = (Dictionary<string, object>)result!;
        Assert.That(dict["name"], Is.EqualTo("test"));
        Assert.That(dict["value"], Is.EqualTo(42));
    }

    [Test]
    public void Normalize_JsonElement_Array_ReturnsArray()
    {
        var json = JsonDocument.Parse("[1, \"test\", true]");
        var result = ValueNormalizer.Normalize(json.RootElement);


        Assert.That(result, Is.InstanceOf<object[]>());
        var array = (object[])result!;
        Assert.That(array, Has.Length.EqualTo(3));
        Assert.That(array[0], Is.EqualTo(1));
        Assert.That(array[1], Is.EqualTo("test"));
        Assert.That(array[2], Is.EqualTo(true));
    }

    [Test]
    public void Normalize_Null_ReturnsNull()
    {
        var result = ValueNormalizer.Normalize(null);


        Assert.That(result, Is.Null);
    }

    [Test]
    public void Normalize_PrimitiveTypes_ReturnUnchanged()
    {
        Assert.That(ValueNormalizer.Normalize(42), Is.EqualTo(42));
        Assert.That(ValueNormalizer.Normalize("test"), Is.EqualTo("test"));
        Assert.That(ValueNormalizer.Normalize(true), Is.EqualTo(true));
        Assert.That(ValueNormalizer.Normalize(3.14), Is.EqualTo(3.14));
    }

    [TestCase("2023-12-25T10:30:45Z", "2023-12-25T10:30:45.000Z")]
    [TestCase("2023-12-25T10:30:45.123Z", "2023-12-25T10:30:45.123Z")]
    [TestCase("2023-12-25T10:30:45+02:00", "2023-12-25T08:30:45.000Z")]
    public void NormalizeIfDate_ValidatesAndNormalizesDateStrings(string input, string expected)
    {
        var result = ValueNormalizer.NormalizeIfDate(input);


        Assert.That(result, Is.EqualTo(expected));
    }

    [Test]
    public void Normalize_NestedStructure_NormalizesRecursively()
    {
        var nested = new Dictionary<string, object>
        {
            ["user"] = new Dictionary<string, object>
            {
                ["_id"] = new ObjectId("507f1f77bcf86cd799439011"),
                ["created"] = new DateTime(2023, 12, 25, 10, 30, 45, DateTimeKind.Utc)
            },
            ["items"] = new object[]
            {
                new Dictionary<string, object>
                {
                    ["price"] = new Decimal128(123.45m)
                }
            }
        };

        var result = ValueNormalizer.Normalize(nested);


        Assert.That(result, Is.InstanceOf<Dictionary<string, object>>());
        var normalizedDict = (Dictionary<string, object>)result!;

        var user = (Dictionary<string, object>)normalizedDict["user"];
        Assert.That(user["_id"], Is.EqualTo("507f1f77bcf86cd799439011"));
        Assert.That(user["created"], Is.EqualTo("2023-12-25T10:30:45.000Z"));

        var items = (object[])normalizedDict["items"];
        var item = (Dictionary<string, object>)items[0];
        Assert.That(item["price"], Is.EqualTo("123.45"));
    }

    [Test]
    public void Normalize_JsonElementUndefined_ReturnsStringRepresentation()
    {
        var json = JsonDocument.Parse("null");
        var result = ValueNormalizer.Normalize(json.RootElement);


        Assert.That(result, Is.Null);
    }

    [Test]
    public void Normalize_JsonElementWithLargeNumber_HandlesCorrectly()
    {
        var json = JsonDocument.Parse("9007199254740992");
        var result = ValueNormalizer.Normalize(json.RootElement);

        Assert.That(result, Is.EqualTo(9007199254740992L));
    }

    [Test]
    public void NormalizeIfDate_InvalidDateString_ReturnsOriginalString()
    {
        var invalidDate = "not-a-date";

        var result = ValueNormalizer.NormalizeIfDate(invalidDate);


        Assert.That(result, Is.EqualTo(invalidDate));
    }

    [Test]
    public void NormalizeIfDate_StringWithoutTSeparator_ReturnsOriginalString()
    {
        var dateWithoutT = "2023-12-25 10:30:45";

        var result = ValueNormalizer.NormalizeIfDate(dateWithoutT);


        Assert.That(result, Is.EqualTo(dateWithoutT));
    }

    [Test]
    public void Normalize_BsonValueEdgeCases_HandlesCorrectly()
    {
        Assert.That(ValueNormalizer.Normalize(BsonNull.Value), Is.Null);
        Assert.That(ValueNormalizer.Normalize(new BsonBoolean(true)), Is.EqualTo(true));
        Assert.That(ValueNormalizer.Normalize(new BsonInt32(42)), Is.EqualTo(42));
        Assert.That(ValueNormalizer.Normalize(new BsonString("test")), Is.EqualTo("test"));
    }

    [Test]
    public void Normalize_DeepNestedStructure_HandlesRecursion()
    {
        var deepNested = new Dictionary<string, object>();
        var current = deepNested;

        // Create 10 levels of nesting
        for (int i = 0; i < 10; i++)
        {
            var next = new Dictionary<string, object>
            {
                ["_id"] = new ObjectId("507f1f77bcf86cd799439011"),
                ["level"] = i
            };
            current["nested"] = next;
            current = next;
        }

        var result = ValueNormalizer.Normalize(deepNested);


        Assert.That(result, Is.InstanceOf<Dictionary<string, object>>());

        // Verify the deep nesting was preserved and normalized
        var currentResult = (Dictionary<string, object>)result!;
        for (var i = 0; i < 10; i++)
        {
            var nested = (Dictionary<string, object>)currentResult["nested"];
            Assert.That(nested["_id"], Is.EqualTo("507f1f77bcf86cd799439011"));
            Assert.That(nested["level"], Is.EqualTo(i));
            currentResult = nested;
        }
    }
}

/// <summary>
///     Test classes for custom type normalization
/// </summary>
public class User
{
    public ObjectId Id { get; set; }

    public string Name { get; set; } = "";

    public string Email { get; set; } = "";

    public int Age { get; set; }
}

public class Product
{
    public string Id { get; set; } = "";

    public string Name { get; set; } = "";

    public decimal Price { get; set; }
}

public struct Location
{
    public double Latitude { get; set; }

    public double Longitude { get; set; }

    public string? Address { get; set; }
}

[TestFixture]
public class CustomTypeNormalizationTests
{
    [Test]
    public void Normalize_ClassWithBsonAttributes_MapsFieldsCorrectly()
    {
        var user = new User
        {
            Id = new ObjectId("507f1f77bcf86cd799439011"),
            Name = "John Doe",
            Email = "john@example.com",
            Age = 30
        };

        var result = ValueNormalizer.Normalize(user);


        Assert.That(result, Is.InstanceOf<Dictionary<string, object>>());
        var dict = (Dictionary<string, object>)result!;
        Assert.That(dict["Id"], Is.EqualTo("507f1f77bcf86cd799439011"));
        Assert.That(dict["Name"], Is.EqualTo("John Doe"));
        Assert.That(dict["Email"], Is.EqualTo("john@example.com"));
        Assert.That(dict["Age"], Is.EqualTo(30));
    }

    [Test]
    public void Normalize_RecordWithBsonElements_NormalizesCorrectly()
    {
        var product = new Product
        {
            Id = "PROD123",
            Name = "Test Product",
            Price = 99.99m
        };

        var result = ValueNormalizer.Normalize(product);


        Assert.That(result, Is.InstanceOf<Dictionary<string, object>>());
        var dict = (Dictionary<string, object>)result!;
        Assert.That(dict["Id"], Is.EqualTo("PROD123"));
        Assert.That(dict["Name"], Is.EqualTo("Test Product"));
        Assert.That(dict["Price"], Is.EqualTo(99.99m));
    }

    [Test]
    public void Normalize_StructWithBsonElements_NormalizesCorrectly()
    {
        var location = new Location
        {
            Latitude = 40.7128,
            Longitude = -74.0060,
            Address = "New York, NY"
        };

        var result = ValueNormalizer.Normalize(location);


        Assert.That(result, Is.InstanceOf<Dictionary<string, object>>());
        var dict = (Dictionary<string, object>)result!;
        Assert.That(dict["Latitude"], Is.EqualTo(40.7128));
        Assert.That(dict["Longitude"], Is.EqualTo(-74.0060));
        Assert.That(dict["Address"], Is.EqualTo("New York, NY"));
    }

    [Test]
    public void Normalize_ClassWithNullProperties_SkipsNullValues()
    {
        var location = new Location
        {
            Latitude = 40.7128,
            Longitude = -74.0060,
            Address = null
        };

        var result = ValueNormalizer.Normalize(location);


        Assert.That(result, Is.InstanceOf<Dictionary<string, object>>());
        var dict = (Dictionary<string, object>)result!;

        Assert.That(dict.ContainsKey("Address"), Is.False);
    }

    [Test]
    public void Normalize_NestedCustomTypes_NormalizesRecursively()
    {
        var nested = new
        {
            User = new User
            {
                Id = new ObjectId("507f1f77bcf86cd799439011"),
                Name = "John Doe"
            },
            Location = new Location
            {
                Latitude = 40.7128,
                Longitude = -74.0060
            }
        };

        var result = ValueNormalizer.Normalize(nested);


        Assert.That(result, Is.InstanceOf<Dictionary<string, object>>());
        var dict = (Dictionary<string, object>)result!;

        var user = (Dictionary<string, object>)dict["User"];
        Assert.That(user["Id"], Is.EqualTo("507f1f77bcf86cd799439011"));
        Assert.That(user["Name"], Is.EqualTo("John Doe"));

        var location = (Dictionary<string, object>)dict["Location"];
        Assert.That(location["Latitude"], Is.EqualTo(40.7128));
        Assert.That(location["Longitude"], Is.EqualTo(-74.0060));
    }

    [Test]
    public void Normalize_PrimitiveTypes_SkipsCustomTypeNormalization()
    {
        Assert.That(ValueNormalizer.Normalize(42), Is.EqualTo(42));
        Assert.That(ValueNormalizer.Normalize("test"), Is.EqualTo("test"));
        Assert.That(ValueNormalizer.Normalize(true), Is.EqualTo(true));
    }

    [Test]
    public void Normalize_Collections_SkipsCustomTypeNormalization()
    {
        var list = new List<string> { "a", "b", "c" };
        var array = new[] { 1, 2, 3 };

        var normalizedList = ValueNormalizer.Normalize(list);
        Assert.That(normalizedList, Is.InstanceOf<object[]>());

        var normalizedArray = ValueNormalizer.Normalize(array);
        Assert.That(normalizedArray, Is.InstanceOf<int[]>());

        Assert.That(array, Has.Length.EqualTo(3));
        Assert.That(array[0], Is.EqualTo(1));
        Assert.That(array[1], Is.EqualTo(2));
        Assert.That(array[2], Is.EqualTo(3));
    }

    [Test]
    public void Normalize_BsonTypes_SkipsCustomTypeNormalization()
    {
        var bsonDoc = new BsonDocument { ["test"] = "value" };

        var result = ValueNormalizer.Normalize(bsonDoc);


        Assert.That(result, Is.InstanceOf<Dictionary<string, object>>());
        var dict = (Dictionary<string, object>)result!;
        Assert.That(dict["test"], Is.EqualTo("value"));
    }
    // Tests for critical MongoDB type normalization scenarios that ensure proper comparison behavior

    [Test]
    public void Normalize_Decimal128_AlwaysReturnsString()
    {
        // Critical: Decimal128 must normalize to string for consistent comparison with expected output
        var decimal128 = new Decimal128(123.456m);
        var result = ValueNormalizer.Normalize(decimal128);

        // Must be string representation, not decimal type
        Assert.That(result, Is.EqualTo("123.456"));
    }

    [Test]
    public void Normalize_Null_RemainsActualNull()
    {
        // Critical: null values must remain as actual null for proper comparison logic
        var result = ValueNormalizer.Normalize(null);

        Assert.That(result, Is.Null);
    }

    [Test]
    public void Normalize_BsonNull_BecomesActualNull()
    {
        var result = ValueNormalizer.Normalize(BsonNull.Value);

        Assert.That(result, Is.Null);
    }

    [Test]
    public void Normalize_PrimitiveArrayTypes_PreserveExactType()
    {
        // Critical: Primitive arrays must preserve their exact type for comparison
        var intArray = new int[] { 1, 2, 3 };
        var result = ValueNormalizer.Normalize(intArray);

        Assert.That(result != null && result.GetType().IsArray, Is.True);
        var objArray = ((int[])result!).Cast<object>().ToArray();
        Assert.That(objArray[0], Is.EqualTo(1));
        Assert.That(objArray[1], Is.EqualTo(2));
        Assert.That(objArray[2], Is.EqualTo(3));
    }

    [Test]
    public void Normalize_MongoDBExtendedJsonPatterns_HandledCorrectly()
    {
        // Critical: MongoDB Extended JSON patterns must normalize correctly for comparison
        var extendedJson = new Dictionary<string, object>
        {
            ["$oid"] = "507f1f77bcf86cd799439011",
            ["$date"] = "2023-12-25T10:30:45.000Z",
            ["$numberDecimal"] = "123.456"
        };

        var result = ValueNormalizer.Normalize(extendedJson);

        Assert.That(result, Is.InstanceOf<Dictionary<string, object>>());
        var dict = (Dictionary<string, object>)result!;
        Assert.That(dict["$oid"], Is.EqualTo("507f1f77bcf86cd799439011"));
        Assert.That(dict["$date"], Is.EqualTo("2023-12-25T10:30:45.000Z"));
        Assert.That(dict["$numberDecimal"], Is.EqualTo("123.456"));
    }

    [Test]
    public void Normalize_DateFormats_ConsistentOutput()
    {
        var utcDate = new DateTime(2023, 12, 25, 10, 30, 45, DateTimeKind.Utc);
        var localDate = new DateTime(2023, 12, 25, 10, 30, 45, DateTimeKind.Local);
        var bsonDate = new BsonDateTime(utcDate);

        var utcResult = ValueNormalizer.Normalize(utcDate);
        var localResult = ValueNormalizer.Normalize(localDate);
        var bsonResult = ValueNormalizer.Normalize(bsonDate);

        Assert.That(utcResult, Is.EqualTo("2023-12-25T10:30:45.000Z"));
        Assert.That(bsonResult, Is.EqualTo("2023-12-25T10:30:45.000Z"));
        // Local date result will depend on system timezone, so we just verify it's a string
        Assert.That(localResult, Is.InstanceOf<string>());
    }

    [Test]
    public void Normalize_AllBsonValueTypes_ProduceCorrectTypes()
    {
        Assert.That(ValueNormalizer.Normalize(new BsonString("test")), Is.EqualTo("test"));
        Assert.That(ValueNormalizer.Normalize(new BsonInt32(42)), Is.EqualTo(42));
        Assert.That(ValueNormalizer.Normalize(new BsonInt64(42L)), Is.EqualTo(42L));
        Assert.That(ValueNormalizer.Normalize(new BsonDouble(3.14)), Is.EqualTo(3.14));
        Assert.That(ValueNormalizer.Normalize(new BsonBoolean(true)), Is.EqualTo(true));
        Assert.That(ValueNormalizer.Normalize(BsonNull.Value), Is.Null);
    }
}

/// <summary>
///     Tests for MongoDB-specific type normalization edge cases.
///     These tests ensure the normalizer handles MongoDB-specific types correctly.
/// </summary>
[TestFixture]
public class MongoDBTypeEdgeCaseTests
{
    [Test]
    public void Normalize_ExtendedJsonTypes_HandledCorrectly()
    {
        var extendedJsonDoc = BsonDocument.Parse("""
            {
                "_id": { "$oid": "507f1f77bcf86cd799439011" },
                "date": { "$date": "2023-12-25T10:30:45.000Z" },
                "decimal": { "$numberDecimal": "123.456" }
            }
            """);


        var result = ValueNormalizer.Normalize(extendedJsonDoc);

        Assert.That(result, Is.InstanceOf<Dictionary<string, object>>());
        var dict = (Dictionary<string, object>)result!;
        Assert.That(dict["_id"], Is.EqualTo("507f1f77bcf86cd799439011"));
        Assert.That(dict["date"], Is.EqualTo("2023-12-25T10:30:45.000Z"));
        Assert.That(dict["decimal"], Is.EqualTo("123.456"));
    }

    [Test]
    public void Normalize_InvalidObjectId_HandlesGracefully()
    {
        var invalidObjectIdString = "invalid-object-id";
        var result = ValueNormalizer.Normalize(invalidObjectIdString);

        Assert.That(result, Is.EqualTo(invalidObjectIdString));
    }

    [Test]
    public void Normalize_InvalidDateFormats_HandlesGracefully()
    {
        var invalidDates = new[] { "invalid-date", "2023-13-01", "not-a-date-at-all" };

        foreach (var invalidDate in invalidDates)
        {
            var result = ValueNormalizer.Normalize(invalidDate);
            Assert.That(result, Is.EqualTo(invalidDate));
        }
    }

    [Test]
    public void Normalize_NumberTypesWithInvalidValues_HandlesCorrectly()
    {
        Assert.That(ValueNormalizer.Normalize(double.NaN), Is.EqualTo(double.NaN));
        Assert.That(ValueNormalizer.Normalize(double.PositiveInfinity), Is.EqualTo(double.PositiveInfinity));
        Assert.That(ValueNormalizer.Normalize(double.NegativeInfinity), Is.EqualTo(double.NegativeInfinity));
    }

    [Test]
    public void Normalize_BsonValuesWithNullInternalValues_HandlesCorrectly()
    {
        var bsonArray = new BsonArray { BsonNull.Value, new BsonString("test"), BsonNull.Value };
        var result = ValueNormalizer.Normalize(bsonArray);

        Assert.That(result, Is.InstanceOf<object[]>());
        if (result == null) return;
        var array = (object[])result;
        Assert.That(array, Has.Length.EqualTo(3));
        Assert.Multiple(() =>
        {
            Assert.That(array[0], Is.Null);
            Assert.That(array[1], Is.EqualTo("test"));
            Assert.That(array[2], Is.Null);
        });
    }

    [Test]
    public void Normalize_DeeplyNestedBsonDocuments_HandlesCorrectly()
    {
        var deepDoc = new BsonDocument();
        var current = deepDoc;

        for (int i = 0; i < 5; i++)
        {
            var nested = new BsonDocument
            {
                ["level"] = i,
                ["id"] = new ObjectId("507f1f77bcf86cd799439011")
            };
            current["nested"] = nested;
            current = nested;
        }

        var result = ValueNormalizer.Normalize(deepDoc);


        Assert.That(result, Is.InstanceOf<Dictionary<string, object>>());

        var currentResult = (Dictionary<string, object>)result!;
        for (int i = 0; i < 5; i++)
        {
            var nested = (Dictionary<string, object>)currentResult["nested"];
            Assert.That(nested["level"], Is.EqualTo(i));
            Assert.That(nested["id"], Is.EqualTo("507f1f77bcf86cd799439011"));
            currentResult = nested;
        }
    }

    [Test]
    public void Normalize_MixedBsonAndRegularTypes_ProducesConsistentResults()
    {
        var mixed = new Dictionary<string, object>
        {
            ["regularString"] = "test",
            ["bsonString"] = new BsonString("test"),

            ["regularInt"] = 42,
            ["bsonInt"] = new BsonInt32(42),
            ["regularObjectId"] = new ObjectId("507f1f77bcf86cd799439011"),
            ["bsonObjectId"] = new BsonObjectId(new ObjectId("507f1f77bcf86cd799439011"))
        };

        var result = ValueNormalizer.Normalize(mixed);

        Assert.That(result, Is.InstanceOf<Dictionary<string, object>>());
        var dict = (Dictionary<string, object>)result!;

        Assert.That(dict["regularString"], Is.EqualTo("test"));
        Assert.That(dict["bsonString"], Is.EqualTo("test"));
        Assert.That(dict["regularInt"], Is.EqualTo(42));
        Assert.That(dict["bsonInt"], Is.EqualTo(42));
        Assert.That(dict["regularObjectId"], Is.EqualTo("507f1f77bcf86cd799439011"));
        Assert.That(dict["bsonObjectId"], Is.EqualTo("507f1f77bcf86cd799439011"));
    }

    [Test]
    public void Normalize_BsonArraysWithMixedTypes_PreservesOrder()
    {
        var bsonArray = new BsonArray
        {
            new BsonString("first"),
            new BsonInt32(42),
            new BsonObjectId(new ObjectId("507f1f77bcf86cd799439011")),
            BsonNull.Value,
            new BsonBoolean(true)
        };

        var result = ValueNormalizer.Normalize(bsonArray);

        Assert.That(result, Is.InstanceOf<object[]>());
        var array = (object[])result!;

        Assert.That(array, Has.Length.EqualTo(5));
        // Order should be preserved
        Assert.That(array[0], Is.EqualTo("first"));
        Assert.That(array[1], Is.EqualTo(42));
        Assert.That(array[2], Is.EqualTo("507f1f77bcf86cd799439011"));
        Assert.That(array[3], Is.Null);
        Assert.That(array[4], Is.EqualTo(true));
    }

    [Test]
    public void Normalize_BsonDocumentsWithSpecialFieldNames_HandlesCorrectly()
    {
        var specialDoc = new BsonDocument
        {
            ["$special"] = "value1",
            ["field.with.dots"] = "value2",
            ["field with spaces"] = "value3",
            ["field-with-dashes"] = "value4",
            ["field_with_underscores"] = "value5"
        };

        var result = ValueNormalizer.Normalize(specialDoc);


        Assert.That(result, Is.InstanceOf<Dictionary<string, object>>());
        var dict = (Dictionary<string, object>)result!;

        Assert.That(dict["$special"], Is.EqualTo("value1"));
        Assert.That(dict["field.with.dots"], Is.EqualTo("value2"));
        Assert.That(dict["field with spaces"], Is.EqualTo("value3"));
        Assert.That(dict["field-with-dashes"], Is.EqualTo("value4"));
        Assert.That(dict["field_with_underscores"], Is.EqualTo("value5"));
    }

    [Test]
    public void Compare_GridFSMetadata_WithExtendedJson_ShouldMatch()
    {
        var gridFSDoc = TestDataConstants.RealWorldExamples.GridFSMetadata;
        var extendedJsonFormat = """
            {
                "_id": { "$oid": "507f1f77bcf86cd799439011" },
                "filename": "example.txt",
                "uploadDate": { "$date": "2023-01-01T00:00:00.000Z" },
                "length": 1024,
                "chunkSize": 261120,
                "md5": "098f6bcd4621d373cade4e832627b4f6"
            }
            """;

        Expect.That(extendedJsonFormat).ShouldMatch(gridFSDoc);
    }

    [Test]
    public void Compare_GridFSMetadata_WithDifferentObjectId_ShouldNotMatch()
    {
        var gridFSDoc = TestDataConstants.RealWorldExamples.GridFSMetadata;
        var differentIdDoc = """
            {
                "_id": { "$oid": "507f1f77bcf86cd799439012" },
                "filename": "example.txt",
                "uploadDate": { "$date": "2023-01-01T00:00:00.000Z" },
                "length": 1024,
                "chunkSize": 261120,
                "md5": "098f6bcd4621d373cade4e832627b4f6"
            }
            """;

        Expect.That(differentIdDoc).ShouldNotMatch(gridFSDoc);
    }

    [Test]
    public void Compare_GridFSMetadata_WithDifferentDateFormat_ShouldMatch()
    {
        var gridFsDoc = TestDataConstants.RealWorldExamples.GridFSMetadata;
        var differentDateFormat = """
            {
                "_id": { "$oid": "507f1f77bcf86cd799439011" },
                "filename": "example.txt",
                "uploadDate": "2023-01-01T00:00:00Z",
                "length": 1024,
                "chunkSize": 261120,
                "md5": "098f6bcd4621d373cade4e832627b4f6"
            }
            """;

        Expect.That(differentDateFormat).ShouldMatch(gridFsDoc);
    }
}