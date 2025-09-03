using System.Text.Json;
using FluentAssertions;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using NUnit.Framework;
using Utilities.Comparison;

namespace Utilities.Comparison.Tests;

/// <summary>
/// Comprehensive tests for ValueNormalizer ensuring MongoDB type normalization works correctly.
///
/// Test Coverage:
/// - MongoDB-specific types: ObjectId, Decimal128, DateTime, BsonValues
/// - .NET types: primitives, arrays, dictionaries, custom classes/structs/records
/// - JSON types: JsonElement normalization from System.Text.Json
/// - Custom type reflection: BSON attribute handling, property/field mapping
/// - Null handling: nullable reference types, BsonNull conversion
/// - Complex nested structures: recursive normalization
///
/// Why This Matters:
/// ValueNormalizer converts MongoDB driver types to comparable .NET representations.
/// Without correct normalization, comparisons would fail due to type mismatches
/// between expected (parsed from text) and actual (from MongoDB driver) values.
///
/// Key Test Principles:
/// - Type consistency: same input types produce same output types
/// - Null safety: nullable scenarios handled without exceptions
/// - Performance validation: deep nesting doesn't cause stack overflow
/// </summary>
[TestFixture]
public class ValueNormalizerTests
{
    [Test]
    public void Normalize_ObjectId_ReturnsStringRepresentation()
    {
        // Arrange
        var objectId = new ObjectId("507f1f77bcf86cd799439011");

        // Act
        var result = ValueNormalizer.Normalize(objectId);

        // Assert
        result.Should().Be("507f1f77bcf86cd799439011");
    }

    [Test]
    public void Normalize_BsonObjectId_ReturnsStringRepresentation()
    {
        // Arrange
        var bsonObjectId = new BsonObjectId(new ObjectId("507f1f77bcf86cd799439011"));

        // Act
        var result = ValueNormalizer.Normalize(bsonObjectId);

        // Assert
        result.Should().Be("507f1f77bcf86cd799439011");
    }

    [Test]
    public void Normalize_Decimal128_ReturnsStringRepresentation()
    {
        // Arrange
        var decimal128 = Decimal128.Parse("123.45");

        // Act
        var result = ValueNormalizer.Normalize(decimal128);

        // Assert
        result.Should().Be("123.45");
    }

    [Test]
    public void Normalize_BsonDecimal128_ReturnsStringRepresentation()
    {
        // Arrange
        var bsonDecimal128 = new BsonDecimal128(Decimal128.Parse("123.45"));

        // Act
        var result = ValueNormalizer.Normalize(bsonDecimal128);

        // Assert
        result.Should().Be("123.45");
    }

    [Test]
    public void Normalize_DateTime_ReturnsIsoString()
    {
        // Arrange
        var dateTime = new DateTime(2024, 1, 1, 12, 0, 0, DateTimeKind.Utc);

        // Act
        var result = ValueNormalizer.Normalize(dateTime);

        // Assert
        result.Should().Be("2024-01-01T12:00:00.000Z");
    }

    [Test]
    public void Normalize_BsonDateTime_ReturnsIsoString()
    {
        // Arrange
        var bsonDateTime = new BsonDateTime(new DateTime(2024, 1, 1, 12, 0, 0, DateTimeKind.Utc));

        // Act
        var result = ValueNormalizer.Normalize(bsonDateTime);

        // Assert
        result.Should().Be("2024-01-01T12:00:00.000Z");
    }

    [Test]
    public void Normalize_DateTimeOffset_ReturnsIsoString()
    {
        // Arrange
        var dateTimeOffset = new DateTimeOffset(2024, 1, 1, 12, 0, 0, TimeSpan.Zero);

        // Act
        var result = ValueNormalizer.Normalize(dateTimeOffset);

        // Assert
        result.Should().Be("2024-01-01T12:00:00.000Z");
    }

    [Test]
    public void Normalize_Array_ReturnsNormalizedArray()
    {
        // Arrange
        var array = new object[]
        {
            new ObjectId("507f1f77bcf86cd799439011"),
            "test",
            123,
            new DateTime(2024, 1, 1, 12, 0, 0, DateTimeKind.Utc)
        };

        // Act
        var result = ValueNormalizer.Normalize(array);

        // Assert
        result.Should().BeOfType<object[]>();
        var normalizedArray = (object[])result!;
        normalizedArray.Should().HaveCount(4);
        normalizedArray[0].Should().Be("507f1f77bcf86cd799439011");
        normalizedArray[1].Should().Be("test");
        normalizedArray[2].Should().Be(123);
        normalizedArray[3].Should().Be("2024-01-01T12:00:00.000Z");
    }

    [Test]
    public void Normalize_Dictionary_ReturnsNormalizedDictionary()
    {
        // Arrange
        var dict = new Dictionary<string, object>
        {
            { "_id", new ObjectId("507f1f77bcf86cd799439011") },
            { "name", "Alice" },
            { "amount", Decimal128.Parse("123.45") },
            { "created", new DateTime(2024, 1, 1, 12, 0, 0, DateTimeKind.Utc) }
        };

        // Act
        var result = ValueNormalizer.Normalize(dict);

        // Assert
        result.Should().BeOfType<Dictionary<string, object>>();
        var normalizedDict = (Dictionary<string, object>)result!;
        normalizedDict["_id"].Should().Be("507f1f77bcf86cd799439011");
        normalizedDict["name"].Should().Be("Alice");
        normalizedDict["amount"].Should().Be("123.45");
        normalizedDict["created"].Should().Be("2024-01-01T12:00:00.000Z");
    }

    [Test]
    public void Normalize_BsonDocument_ReturnsNormalizedDictionary()
    {
        // Arrange
        var bsonDoc = new BsonDocument
        {
            { "_id", new ObjectId("507f1f77bcf86cd799439011") },
            { "name", "Alice" },
            { "amount", new BsonDecimal128(Decimal128.Parse("123.45")) }
        };

        // Act
        var result = ValueNormalizer.Normalize(bsonDoc);

        // Assert
        result.Should().BeOfType<Dictionary<string, object>>();
        var normalizedDict = (Dictionary<string, object>)result!;
        normalizedDict["_id"].Should().Be("507f1f77bcf86cd799439011");
        normalizedDict["name"].Should().Be("Alice");
        normalizedDict["amount"].Should().Be("123.45");
    }

    [Test]
    public void Normalize_JsonElement_String_ReturnsString()
    {
        // Arrange
        var json = JsonDocument.Parse("\"test\"");
        var element = json.RootElement;

        // Act
        var result = ValueNormalizer.Normalize(element);

        // Assert
        result.Should().Be("test");
    }

    [Test]
    public void Normalize_JsonElement_Number_ReturnsNumber()
    {
        // Arrange
        var json = JsonDocument.Parse("123");
        var element = json.RootElement;

        // Act
        var result = ValueNormalizer.Normalize(element);

        // Assert
        result.Should().Be(123L);
    }

    [Test]
    public void Normalize_JsonElement_Object_ReturnsDictionary()
    {
        // Arrange
        var json = JsonDocument.Parse("""
        {"name": "Alice", "age": 25}
        """);
        var element = json.RootElement;

        // Act
        var result = ValueNormalizer.Normalize(element);

        // Assert
        result.Should().BeOfType<Dictionary<string, object>>();
        var dict = (Dictionary<string, object>)result!;
        dict["name"].Should().Be("Alice");
        dict["age"].Should().Be(25L);
    }

    [Test]
    public void Normalize_JsonElement_Array_ReturnsArray()
    {
        // Arrange
        var json = JsonDocument.Parse("""
        ["Alice", 25, true]
        """);
        var element = json.RootElement;

        // Act
        var result = ValueNormalizer.Normalize(element);

        // Assert
        result.Should().BeOfType<object[]>();
        var array = (object[])result!;
        array.Should().HaveCount(3);
        array[0].Should().Be("Alice");
        array[1].Should().Be(25L);
        array[2].Should().Be(true);
    }

    [Test]
    public void Normalize_Null_ReturnsNull()
    {
        // Act
        var result = ValueNormalizer.Normalize(null);

        // Assert
        result.Should().BeNull();
    }

    [Test]
    public void Normalize_PrimitiveTypes_ReturnUnchanged()
    {
        // Test various primitives
        ValueNormalizer.Normalize("test").Should().Be("test");
        ValueNormalizer.Normalize(123).Should().Be(123);
        ValueNormalizer.Normalize(123.45).Should().Be(123.45);
        ValueNormalizer.Normalize(true).Should().Be(true);
        ValueNormalizer.Normalize(false).Should().Be(false);
    }

    [TestCase("2024-01-01T12:00:00.000Z", "2024-01-01T12:00:00.000Z")]
    [TestCase("2024-01-01T12:00:00Z", "2024-01-01T12:00:00.000Z")]
    [TestCase("2024-01-01T12:00:00.123Z", "2024-01-01T12:00:00.123Z")]
    [TestCase("not-a-date", "not-a-date")]
    [TestCase("", "")]
    public void NormalizeIfDate_ValidatesAndNormalizesDateStrings(string input, string expected)
    {
        // Act
        var result = ValueNormalizer.NormalizeIfDate(input);

        // Assert
        result.Should().Be(expected);
    }

    [Test]
    public void Normalize_NestedStructure_NormalizesRecursively()
    {
        // Arrange
        var complex = new Dictionary<string, object>
        {
            { "users", new object[]
                {
                    new Dictionary<string, object>
                    {
                        { "_id", new ObjectId("507f1f77bcf86cd799439011") },
                        { "name", "Alice" },
                        { "balance", Decimal128.Parse("123.45") },
                        { "created", new DateTime(2024, 1, 1, 12, 0, 0, DateTimeKind.Utc) }
                    },
                    new Dictionary<string, object>
                    {
                        { "_id", new ObjectId("507f1f77bcf86cd799439012") },
                        { "name", "Bob" },
                        { "balance", Decimal128.Parse("678.90") }
                    }
                }
            },
            { "metadata", new Dictionary<string, object>
                {
                    { "total", 2 },
                    { "timestamp", new DateTime(2024, 1, 1, 12, 0, 0, DateTimeKind.Utc) }
                }
            }
        };

        // Act
        var result = ValueNormalizer.Normalize(complex);

        // Assert
        result.Should().BeOfType<Dictionary<string, object>>();
        var normalized = (Dictionary<string, object>)result!;

        // Check users array
        var users = (object[])normalized["users"];
        users.Should().HaveCount(2);

        var user1 = (Dictionary<string, object>)users[0];
        user1["_id"].Should().Be("507f1f77bcf86cd799439011");
        user1["name"].Should().Be("Alice");
        user1["balance"].Should().Be("123.45");
        user1["created"].Should().Be("2024-01-01T12:00:00.000Z");

        var user2 = (Dictionary<string, object>)users[1];
        user2["_id"].Should().Be("507f1f77bcf86cd799439012");
        user2["name"].Should().Be("Bob");
        user2["balance"].Should().Be("678.90");

        // Check metadata
        var metadata = (Dictionary<string, object>)normalized["metadata"];
        metadata["total"].Should().Be(2);
        metadata["timestamp"].Should().Be("2024-01-01T12:00:00.000Z");
    }

    [Test]
    public void Normalize_JsonElementUndefined_ReturnsStringRepresentation()
    {
        // Arrange - create a JsonElement and test its normalization
        var jsonDoc = JsonDocument.Parse("null");
        var jsonElement = jsonDoc.RootElement;

        // Act
        var result = ValueNormalizer.Normalize(jsonElement);

        // Assert
        result.Should().BeNull();
    }

    [Test]
    public void Normalize_JsonElementWithLargeNumber_HandlesCorrectly()
    {
        // Arrange
        var jsonDoc = JsonDocument.Parse("9999999999999999999");
        var jsonElement = jsonDoc.RootElement;

        // Act
        var result = ValueNormalizer.Normalize(jsonElement);

        // Assert - Should handle as either long or double depending on size
        result.Should().NotBeNull();
        (result is long || result is double).Should().BeTrue("Large numbers should be normalized as long or double");
    }

    [Test]
    public void NormalizeIfDate_InvalidDateString_ReturnsOriginalString()
    {
        // Arrange
        var invalidDate = "not-a-date-at-all";

        // Act
        var result = ValueNormalizer.NormalizeIfDate(invalidDate);

        // Assert
        result.Should().Be(invalidDate);
    }

    [Test]
    public void NormalizeIfDate_StringWithoutTSeparator_ReturnsOriginalString()
    {
        // Arrange - valid date format but without T separator
        var dateWithoutT = "2024-01-01 12:00:00";

        // Act
        var result = ValueNormalizer.NormalizeIfDate(dateWithoutT);

        // Assert
        result.Should().Be(dateWithoutT);
    }

    [Test]
    public void Normalize_BsonValueEdgeCases_HandlesCorrectly()
    {
        // Arrange - test various BsonValue types
        var bsonUndefined = BsonUndefined.Value;
        var bsonMinKey = BsonMinKey.Value;
        var bsonMaxKey = BsonMaxKey.Value;

        // Act & Assert - Should not throw, returns some representation
        var undefinedResult = ValueNormalizer.Normalize(bsonUndefined);
        var minKeyResult = ValueNormalizer.Normalize(bsonMinKey);
        var maxKeyResult = ValueNormalizer.Normalize(bsonMaxKey);

        undefinedResult.Should().NotBeNull();
        minKeyResult.Should().NotBeNull();
        maxKeyResult.Should().NotBeNull();
    }

    [Test]
    public void Normalize_DeepNestedStructure_HandlesRecursion()
    {
        // Arrange - create deeply nested structure to test recursion limits
        var deepDict = new Dictionary<string, object>();
        var current = deepDict;

        // Create 50 levels of nesting
        for (int i = 0; i < 50; i++)
        {
            var next = new Dictionary<string, object>();
            current[$"level{i}"] = next;
            current = next;
        }
        current["final"] = "value";

        // Act - should not stack overflow
        var result = ValueNormalizer.Normalize(deepDict);

        // Assert
        result.Should().NotBeNull();
        result.Should().BeOfType<Dictionary<string, object>>();
    }
}

/// <summary>
/// Test classes for custom type normalization
/// </summary>
public class User
{
    [BsonId]
    public ObjectId Id { get; set; }

    [BsonElement("name")]
    public string Name { get; set; } = string.Empty;

    [BsonElement("email")]
    public string Email { get; set; } = string.Empty;

    public int Age { get; set; } // No attribute - uses property name
}

public record Product
{
    [BsonId]
    public string Id { get; init; } = string.Empty;

    [BsonElement("product_name")]
    public string Name { get; init; } = string.Empty;

    public decimal Price { get; init; }
}

public struct Location
{
    [BsonElement("lat")]
    public double Latitude { get; set; }

    [BsonElement("lng")]
    public double Longitude { get; set; }

    public string? Address { get; set; } // Nullable property
}

[TestFixture]
public class CustomTypeNormalizationTests
{
    [Test]
    public void Normalize_ClassWithBsonAttributes_MapsFieldsCorrectly()
    {
        // Arrange
        var user = new User
        {
            Id = ObjectId.GenerateNewId(),
            Name = "John Doe",
            Email = "john@example.com",
            Age = 30
        };

        // Act
        var result = ValueNormalizer.Normalize(user);

        // Assert
        result.Should().BeOfType<Dictionary<string, object>>();
        var dict = (Dictionary<string, object>)result!;

        dict.Should().ContainKey("_id");
        dict.Should().ContainKey("name");
        dict.Should().ContainKey("email");
        dict.Should().ContainKey("Age"); // No attribute, uses property name

        dict["_id"].Should().Be(user.Id.ToString());
        dict["name"].Should().Be("John Doe");
        dict["email"].Should().Be("john@example.com");
        dict["Age"].Should().Be(30);
    }

    [Test]
    public void Normalize_RecordWithBsonElements_NormalizesCorrectly()
    {
        // Arrange
        var product = new Product
        {
            Id = "prod123",
            Name = "Test Product",
            Price = 29.99m
        };

        // Act
        var result = ValueNormalizer.Normalize(product);

        // Assert
        result.Should().BeOfType<Dictionary<string, object>>();
        var dict = (Dictionary<string, object>)result!;

        dict.Should().ContainKey("_id");
        dict.Should().ContainKey("product_name");
        dict.Should().ContainKey("Price");

        dict["_id"].Should().Be("prod123");
        dict["product_name"].Should().Be("Test Product");
        dict["Price"].Should().Be(29.99m);
    }

    [Test]
    public void Normalize_StructWithBsonElements_NormalizesCorrectly()
    {
        // Arrange
        var location = new Location
        {
            Latitude = 40.7128,
            Longitude = -74.0060,
            Address = "New York, NY"
        };

        // Act
        var result = ValueNormalizer.Normalize(location);

        // Assert
        result.Should().BeOfType<Dictionary<string, object>>();
        var dict = (Dictionary<string, object>)result!;

        dict.Should().ContainKey("lat");
        dict.Should().ContainKey("lng");
        dict.Should().ContainKey("Address");

        dict["lat"].Should().Be(40.7128);
        dict["lng"].Should().Be(-74.0060);
        dict["Address"].Should().Be("New York, NY");
    }

    [Test]
    public void Normalize_ClassWithNullProperties_SkipsNullValues()
    {
        // Arrange
        var user = new User
        {
            Id = ObjectId.GenerateNewId(),
            Name = "Jane Doe"
            // Email and Age left as defaults
        };

        // Act
        var result = ValueNormalizer.Normalize(user);

        // Assert
        result.Should().BeOfType<Dictionary<string, object>>();
        var dict = (Dictionary<string, object>)result!;

        dict.Should().ContainKey("_id");
        dict.Should().ContainKey("name");
        dict.Should().ContainKey("Age"); // int has default value 0
        dict.Should().ContainKey("email"); // string has default value ""

        dict["name"].Should().Be("Jane Doe");
        dict["Age"].Should().Be(0);
        dict["email"].Should().Be("");
    }

    [Test]
    public void Normalize_NestedCustomTypes_NormalizesRecursively()
    {
        // Arrange - create nested structure with custom types
        var order = new
        {
            Id = "order123",
            Customer = new User
            {
                Id = ObjectId.GenerateNewId(),
                Name = "Customer Name",
                Email = "customer@test.com",
                Age = 25
            },
            ShippingLocation = new Location
            {
                Latitude = 37.7749,
                Longitude = -122.4194,
                Address = "San Francisco, CA"
            }
        };

        // Act
        var result = ValueNormalizer.Normalize(order);

        // Assert
        result.Should().BeOfType<Dictionary<string, object>>();
        var dict = (Dictionary<string, object>)result!;

        dict.Should().ContainKey("Customer");
        dict.Should().ContainKey("ShippingLocation");

        var customer = dict["Customer"] as Dictionary<string, object>;
        customer.Should().NotBeNull();
        customer!.Should().ContainKey("_id");
        customer.Should().ContainKey("name");

        var location = dict["ShippingLocation"] as Dictionary<string, object>;
        location.Should().NotBeNull();
        location!.Should().ContainKey("lat");
        location.Should().ContainKey("lng");
    }

    [Test]
    public void Normalize_PrimitiveTypes_SkipsCustomTypeNormalization()
    {
        // Arrange & Act & Assert - primitives should not be treated as custom types
        ValueNormalizer.Normalize(42).Should().Be(42);
        ValueNormalizer.Normalize("test").Should().Be("test");
        ValueNormalizer.Normalize(true).Should().Be(true);
        ValueNormalizer.Normalize(3.14).Should().Be(3.14);
        ValueNormalizer.Normalize(DateTime.Now).Should().BeOfType<string>(); // DateTime gets normalized
    }

    [Test]
    public void Normalize_Collections_SkipsCustomTypeNormalization()
    {
        // Arrange
        var list = new List<string> { "a", "b", "c" };
        var array = new[] { 1, 2, 3 };

        // Act & Assert - collections should not be treated as custom types
        var normalizedList = ValueNormalizer.Normalize(list);
        normalizedList.Should().BeOfType<object[]>();

        var normalizedArray = ValueNormalizer.Normalize(array);
        normalizedArray.Should().BeOfType<int[]>(); // int[] stays as int[]
    }

    [Test]
    public void Normalize_BsonTypes_SkipsCustomTypeNormalization()
    {
        // Arrange
        var bsonDoc = new BsonDocument { { "test", "value" } };

        // Act
        var result = ValueNormalizer.Normalize(bsonDoc);

        // Assert - should be handled by existing BSON logic, not custom type logic
        result.Should().BeOfType<Dictionary<string, object>>();
        var dict = (Dictionary<string, object>)result!;
        dict.Should().ContainKey("test");
        dict["test"].Should().Be("value");
    }

    #region MongoDB Integration Edge Cases
    // Tests for critical MongoDB type normalization scenarios that ensure proper comparison behavior

    [Test]
    public void Normalize_Decimal128_AlwaysReturnsString()
    {
        // Critical: Decimal128 must normalize to string for consistent comparison with expected output
        var bsonDecimal = new BsonDecimal128(123.45m);
        var decimal128Value = MongoDB.Bson.Decimal128.Parse("123.45");

        var normalizedBson = ValueNormalizer.Normalize(bsonDecimal);
        var normalizedDecimal128 = ValueNormalizer.Normalize(decimal128Value);

        // Must be string representation, not decimal type
        normalizedBson.Should().Be("123.45");
        normalizedDecimal128.Should().Be("123.45");
        normalizedBson.Should().BeOfType<string>();
        normalizedDecimal128.Should().BeOfType<string>();
    }

    [Test]
    public void Normalize_Null_RemainsActualNull()
    {
        // Critical: null values must remain as actual null for proper comparison logic
        var result = ValueNormalizer.Normalize(null);

        result.Should().BeNull();
        result.Should().NotBe(DBNull.Value);
    }

    [Test]
    public void Normalize_BsonNull_BecomesActualNull()
    {
        // Critical: BsonNull values need to become actual null for comparison
        var bsonNull = BsonNull.Value;
        var result = ValueNormalizer.Normalize(bsonNull);

        result.Should().BeNull();
    }

    [Test]
    public void Normalize_PrimitiveArrayTypes_PreserveExactType()
    {
        // Critical: Primitive arrays must preserve their exact type for comparison
        var intArray = new[] { 1, 2, 3 };
        var stringArray = new[] { "a", "b", "c" };

        var normalizedIntArray = ValueNormalizer.Normalize(intArray);
        var normalizedStringArray = ValueNormalizer.Normalize(stringArray);

        // Types must be preserved for primitive arrays
        normalizedIntArray.Should().BeOfType<int[]>();
        normalizedStringArray.Should().BeOfType<string[]>();
    }

    [Test]
    public void Normalize_MongoDBExtendedJsonPatterns_HandledCorrectly()
    {
        // Critical: MongoDB Extended JSON patterns must normalize correctly for comparison
        var dateDict = new Dictionary<string, object> { { "$date", "2021-12-18T15:55:00Z" } };
        var oidDict = new Dictionary<string, object> { { "$oid", "507f1f77bcf86cd799439011" } };

        var normalizedDate = ValueNormalizer.Normalize(dateDict);
        var normalizedOid = ValueNormalizer.Normalize(oidDict);

        normalizedDate.Should().Be("2021-12-18T15:55:00.000Z");
        normalizedOid.Should().Be("507f1f77bcf86cd799439011");
    }

    [Test]
    public void Normalize_DateFormats_ConsistentOutput()
    {
        // Critical: Date normalization must produce consistent formats regardless of input variation
        var isoDate = "2021-12-18T15:55:00Z";
        var extendedJsonDate = new Dictionary<string, object> { { "$date", "2021-12-18T15:55:00Z" } };
        var dateTimeValue = DateTime.Parse("2021-12-18T15:55:00Z").ToUniversalTime();
        var bsonDateTime = new BsonDateTime(DateTime.Parse("2021-12-18T15:55:00Z").ToUniversalTime());

        var normalizedIso = ValueNormalizer.Normalize(isoDate);
        var normalizedExtended = ValueNormalizer.Normalize(extendedJsonDate);
        var normalizedDateTime = ValueNormalizer.Normalize(dateTimeValue);
        var normalizedBson = ValueNormalizer.Normalize(bsonDateTime);

        // All should produce the same normalized date string
        var expectedFormat = "2021-12-18T15:55:00.000Z";
        normalizedIso.Should().Be(expectedFormat);
        normalizedExtended.Should().Be(expectedFormat);
        normalizedDateTime.Should().Be(expectedFormat);
        normalizedBson.Should().Be(expectedFormat);
    }

    [Test]
    public void Normalize_AllBsonValueTypes_ProduceCorrectTypes()
    {
        // Comprehensive test for all BsonValue normalization behaviors
        var testData = new Dictionary<string, (BsonValue bsonValue, object? expected)>
        {
            { "BsonDecimal128", (new BsonDecimal128(123.45m), "123.45") },
            { "BsonNull", (BsonNull.Value, null) },
            { "BsonDateTime", (new BsonDateTime(DateTime.Parse("2021-12-18T15:55:00Z").ToUniversalTime()), "2021-12-18T15:55:00.000Z") },
            { "BsonObjectId", (new BsonObjectId(ObjectId.Parse("507f1f77bcf86cd799439011")), "507f1f77bcf86cd799439011") },
            { "BsonString", (new BsonString("test"), "test") },
            { "BsonInt32", (new BsonInt32(42), 42) },
            { "BsonInt64", (new BsonInt64(9223372036854775807), 9223372036854775807L) },
            { "BsonDouble", (new BsonDouble(123.45), 123.45) },
            { "BsonBoolean", (BsonBoolean.True, true) }
        };

        foreach (var (testName, (bsonValue, expected)) in testData)
        {
            var result = ValueNormalizer.Normalize(bsonValue);

            if (expected == null)
            {
                result.Should().BeNull($"{testName} should normalize to null");
            }
            else
            {
                result.Should().Be(expected, $"{testName} normalization failed");
            }
        }
    }

    #endregion
}

/// <summary>
/// Tests for MongoDB-specific type normalization edge cases.
/// These tests ensure the normalizer handles MongoDB-specific types correctly.
/// </summary>
[TestFixture]
public class MongoDBTypeEdgeCaseTests
{
    [Test]
    public void Normalize_ExtendedJsonTypes_HandledCorrectly()
    {
        // Arrange - various Extended JSON formats
        var extendedJsonTypes = new Dictionary<string, object>
        {
            { "ObjectId", new Dictionary<string, object> { { "$oid", "507f1f77bcf86cd799439011" } } },
            { "Date", new Dictionary<string, object> { { "$date", "2021-12-18T15:55:00Z" } } },
            { "NumberLong", new Dictionary<string, object> { { "$numberLong", "9223372036854775807" } } },
            { "NumberDecimal", new Dictionary<string, object> { { "$numberDecimal", "123.45" } } },
            { "BinData", new Dictionary<string, object>
                {
                    { "$binary", "SGVsbG8gV29ybGQ=" },
                    { "$type", "00" }
                }
            },
            { "Undefined", new Dictionary<string, object> { { "$undefined", true } } },
            { "MinKey", new Dictionary<string, object> { { "$minKey", 1 } } },
            { "MaxKey", new Dictionary<string, object> { { "$maxKey", 1 } } }
        };

        // Act & Assert - Each should normalize appropriately
        foreach (var kvp in extendedJsonTypes)
        {
            var result = ValueNormalizer.Normalize(kvp.Value);
            result.Should().NotBeNull($"Extended JSON type {kvp.Key} should normalize");
        }
    }

    [Test]
    public void Normalize_InvalidObjectId_HandlesGracefully()
    {
        // Arrange - invalid ObjectId formats
        var invalidObjectIds = new[]
        {
            new Dictionary<string, object> { { "$oid", "invalid" } },
            new Dictionary<string, object> { { "$oid", "123" } }, // Too short
            new Dictionary<string, object> { { "$oid", "507f1f77bcf86cd799439011xyz" } }, // Too long/invalid chars
            new Dictionary<string, object> { { "$oid", "" } }, // Empty
        };

        // Act & Assert - Should handle gracefully without throwing
        foreach (var invalidOid in invalidObjectIds)
        {
            var result = ValueNormalizer.Normalize(invalidOid);
            // Should either normalize to the string value or handle gracefully
            result.Should().NotBeNull("Invalid ObjectId should not cause null result");
        }
    }

    [Test]
    public void Normalize_InvalidDateFormats_HandlesGracefully()
    {
        // Arrange - invalid date formats
        var invalidDates = new IDictionary<string, object?>[]
        {
            new Dictionary<string, object?> { { "$date", "not-a-date" } },
            new Dictionary<string, object?> { { "$date", "2021-13-01" } }, // Invalid month
            new Dictionary<string, object?> { { "$date", "2021-02-30" } }, // Invalid day
            new Dictionary<string, object?> { { "$date", "" } },
            new Dictionary<string, object?> { { "$date", null } },
        };

        // Act & Assert - Should handle gracefully
        foreach (var invalidDate in invalidDates)
        {
            var result = ValueNormalizer.Normalize(invalidDate);
            // Should either normalize to the string value or handle gracefully
            result.Should().NotBeNull("Invalid date should not cause null result");
        }
    }

    [Test]
    public void Normalize_NumberTypesWithInvalidValues_HandlesCorrectly()
    {
        // Arrange - invalid number formats
        var invalidNumbers = new IDictionary<string, object?>[]
        {
            new Dictionary<string, object?> { { "$numberLong", "not-a-number" } },
            new Dictionary<string, object?> { { "$numberLong", "" } },
            new Dictionary<string, object?> { { "$numberDecimal", "invalid-decimal" } },
            new Dictionary<string, object?> { { "$numberDecimal", "123.45.67" } }, // Double decimal
            new Dictionary<string, object?> { { "$numberDecimal", null } },
        };

        // Act & Assert - Should handle without throwing
        foreach (var invalidNumber in invalidNumbers)
        {
            var result = ValueNormalizer.Normalize(invalidNumber);
            result.Should().NotBeNull("Invalid number should not cause null result");
        }
    }

    [Test]
    public void Normalize_BsonValuesWithNullInternalValues_HandlesCorrectly()
    {
        // Test edge cases where BSON values might have null internal values

        // Arrange - BsonString with null value (if possible)
        var bsonNull = BsonNull.Value;
        var bsonUndefined = BsonUndefined.Value;

        // Act
        var resultNull = ValueNormalizer.Normalize(bsonNull);
        var resultUndefined = ValueNormalizer.Normalize(bsonUndefined);

        // Assert
        resultNull.Should().BeNull("BsonNull should normalize to null");
        // BsonUndefined handling depends on implementation
        // result might be null or some other representation
    }

    [Test]
    public void Normalize_DeeplyNestedBsonDocuments_HandlesCorrectly()
    {
        // Arrange - deeply nested BSON structure
        var deepBsonDoc = new BsonDocument
        {
            { "level1", new BsonDocument
                {
                    { "level2", new BsonDocument
                        {
                            { "level3", new BsonDocument
                                {
                                    { "level4", new BsonDocument
                                        {
                                            { "deepValue", "found" }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        };

        // Act
        var result = ValueNormalizer.Normalize(deepBsonDoc);

        // Assert
        result.Should().NotBeNull("Deeply nested BSON should normalize");
        result.Should().BeOfType<Dictionary<string, object>>("BSON document should become dictionary");

        var dict = (Dictionary<string, object>)result!;
        dict.Should().ContainKey("level1");
    }

    [Test]
    public void Normalize_MixedBsonAndRegularTypes_ProducesConsistentResults()
    {
        // Arrange - mix of BSON and regular .NET types that should normalize to the same value
        var regularString = "test value";
        var bsonString = new BsonString("test value");

        var regularInt = 42;
        var bsonInt32 = new BsonInt32(42);

        var regularDouble = 3.14159;
        var bsonDouble = new BsonDouble(3.14159);

        // Act
        var normalizedRegularString = ValueNormalizer.Normalize(regularString);
        var normalizedBsonString = ValueNormalizer.Normalize(bsonString);

        var normalizedRegularInt = ValueNormalizer.Normalize(regularInt);
        var normalizedBsonInt = ValueNormalizer.Normalize(bsonInt32);

        var normalizedRegularDouble = ValueNormalizer.Normalize(regularDouble);
        var normalizedBsonDouble = ValueNormalizer.Normalize(bsonDouble);

        // Assert - equivalent values should normalize to the same result
        normalizedRegularString.Should().Be(normalizedBsonString, "String values should normalize identically");
        normalizedRegularInt.Should().Be(normalizedBsonInt, "Integer values should normalize identically");
        normalizedRegularDouble.Should().Be(normalizedBsonDouble, "Double values should normalize identically");
    }

    [Test]
    public void Normalize_BsonArraysWithMixedTypes_PreservesOrder()
    {
        // Arrange - BSON array with various types
        var bsonArray = new BsonArray
        {
            new BsonString("first"),
            new BsonInt32(42),
            BsonNull.Value,
            new BsonDocument { { "nested", "value" } },
            new BsonBoolean(true)
        };

        // Act
        var result = ValueNormalizer.Normalize(bsonArray);

        // Assert
        result.Should().BeOfType<object[]>("BSON array should normalize to object array");
        var array = (object[])result!;
        array.Should().HaveCount(5, "All elements should be preserved");

        // Order should be preserved
        array[0].Should().Be("first");
        array[1].Should().Be(42);
        array[2].Should().BeNull();
        array[3].Should().BeOfType<Dictionary<string, object>>();
        array[4].Should().Be(true);
    }

    [Test]
    public void Normalize_BsonDocumentsWithSpecialFieldNames_HandlesCorrectly()
    {
        // Arrange - BSON document with field names that might cause issues
        var bsonDoc = new BsonDocument
        {
            { "", "empty field name" }, // Empty field name
            { " ", "space field name" }, // Space field name
            { "field.with.dots", "dotted field" },
            { "field$with$dollars", "dollar field" },
            { "field with spaces", "spaced field" },
            { "field\nwith\nnewlines", "newlined field" },
            { "field\twith\ttabs", "tabbed field" },
            { "UPPERCASE", "upper" },
            { "lowercase", "lower" },
            { "MiXeDcAsE", "mixed" }
        };

        // Act
        var result = ValueNormalizer.Normalize(bsonDoc);

        // Assert
        result.Should().BeOfType<Dictionary<string, object>>("BSON document should normalize to dictionary");
        var dict = (Dictionary<string, object>)result!;

        // All field names should be preserved exactly
        dict.Should().ContainKeys("", " ", "field.with.dots", "field$with$dollars",
                                  "field with spaces", "field\nwith\nnewlines", "field\twith\ttabs",
                                  "UPPERCASE", "lowercase", "MiXeDcAsE");
    }

    #region GridFS Extended JSON Tests

    [Test]
    public void Compare_GridFSMetadata_WithExtendedJson_ShouldMatch()
    {
        // Arrange - Testing real GridFS metadata from MongoDB C# Driver documentation
        var expected = TestDataConstants.RealWorldExamples.GridFSMetadata;
        var actualAlternateFormat = """
            { "_id" : { "$oid" : "64f5a8b2c3d4e5f6a7b8c9d0" }, "length" : 13, "chunkSize" : 261120, "uploadDate" : { "$date" : "2023-09-04T10:15:30.123Z" }, "filename" : "new_file" }
            { "_id" : { "$oid" : "64f5a8b3c3d4e5f6a7b8c9d1" }, "length" : 50, "chunkSize" : 1048576, "uploadDate" : { "$date" : "2023-09-04T10:16:45.456Z" }, "filename" : "my_file" }
            """;

        // Act
        var result = ComparisonEngine.Compare(expected, actualAlternateFormat);

        // Assert
        result.IsSuccess.Should().BeTrue("GridFS metadata with Extended JSON should match");
        result.Error.Should().BeNull();
    }

    [Test]
    public void Compare_GridFSMetadata_WithDifferentObjectId_ShouldNotMatch()
    {
        // Arrange
        var expected = TestDataConstants.RealWorldExamples.GridFSMetadata;
        var actualDifferentId = """
            { "_id" : { "$oid" : "64f5a8b2c3d4e5f6a7b8c9d2" }, "length" : 13, "chunkSize" : 261120, "uploadDate" : { "$date" : "2023-09-04T10:15:30.123Z" }, "filename" : "new_file" }
            { "_id" : { "$oid" : "64f5a8b3c3d4e5f6a7b8c9d1" }, "length" : 50, "chunkSize" : 1048576, "uploadDate" : { "$date" : "2023-09-04T10:16:45.456Z" }, "filename" : "my_file" }
            """;

        // Act
        var result = ComparisonEngine.Compare(expected, actualDifferentId);

        // Assert
        result.IsSuccess.Should().BeFalse("different ObjectId values should cause mismatch");
        result.Error.Should().NotBeNull();
        result.Error!.ToString().Should().ContainAny("64f5a8b2c3d4e5f6a7b8c9d0", "64f5a8b2c3d4e5f6a7b8c9d2");
    }

    [Test]
    public void Compare_GridFSMetadata_WithDifferentDateFormat_ShouldMatch()
    {
        // Arrange - Using GridFS data to test date format flexibility with ValueNormalizer
        var expectedJson = """
            { "_id" : { "$oid" : "64f5a8b2c3d4e5f6a7b8c9d0" }, "uploadDate" : { "$date" : "2023-09-04T10:15:30.123Z" } }
            """;
        var actualDifferentDateFormatJson = """
            { "_id" : { "$oid" : "64f5a8b2c3d4e5f6a7b8c9d0" }, "uploadDate" : { "$date" : "2023-09-04T10:15:30.123+00:00" } }
            """;

        // Parse JSON strings to BsonDocument so ValueNormalizer can process $date objects
        var expected = BsonDocument.Parse(expectedJson);
        var actualDifferentDateFormat = BsonDocument.Parse(actualDifferentDateFormatJson);

        // Act
        var result = ComparisonEngine.Compare(expected, actualDifferentDateFormat);

        // Assert
        result.IsSuccess.Should().BeTrue("equivalent date formats should match through ValueNormalizer");
    }

    #endregion
}
