using FluentAssertions;
using MongoDB.Bson;
using NUnit.Framework;
using Utilities.Comparison;

namespace Utilities.Comparison.Tests;

/// <summary>
/// Comprehensive tests for MongoDB document syntax parsing including constructors,
/// unquoted keys, single quotes, and ellipsis patterns.
///
/// These tests ensure the ExpectedOutputParser can reliably handle MongoDB shell syntax
/// which is critical for the code example testing framework.
/// </summary>
[TestFixture]
public class MongoDBSyntaxParsingTests
{
    [Test]
    public void ParseContent_ObjectIdConstructor_ParsesCorrectly()
    {
        // Arrange
        var content = """
            {
              _id: ObjectId('507f1f77bcf86cd799439011'),
              name: "Test Document"
            }
            """;

        // Act
        var result = ExpectedOutputParser.ParseContent(content);

        // Assert
        result.IsSuccess.Should().BeTrue();
        result.Data.Should().HaveCount(1);

        var document = (Dictionary<string, object>)result.Data![0];
        document.Should().ContainKey("_id");
        document["_id"].Should().BeOfType<ObjectId>();

        var objectId = (ObjectId)document["_id"];
        objectId.ToString().Should().Be("507f1f77bcf86cd799439011");
    }

    [Test]
    public void ParseContent_Decimal128Constructor_ParsesCorrectly()
    {
        // Arrange
        var content = """
            {
              balance: Decimal128('123.456789'),
              currency: "USD"
            }
            """;

        // Act
        var result = ExpectedOutputParser.ParseContent(content);

        // Assert
        result.IsSuccess.Should().BeTrue();
        result.Data.Should().HaveCount(1);

        var document = (Dictionary<string, object>)result.Data![0];
        document.Should().ContainKey("balance");
        document["balance"].Should().BeOfType<Decimal128>();

        var decimal128 = (Decimal128)document["balance"];
        decimal128.ToString().Should().Be("123.456789");
    }

    [Test]
    public void ParseContent_DateConstructor_ParsesCorrectly()
    {
        // Arrange
        var content = """
            {
              created: Date('2024-01-01T12:30:45.123Z'),
              updated: Date('2024-12-31T23:59:59Z')
            }
            """;

        // Act
        var result = ExpectedOutputParser.ParseContent(content);

        // Assert
        result.IsSuccess.Should().BeTrue();
        result.Data.Should().HaveCount(1);

        var document = (Dictionary<string, object>)result.Data![0];
        document.Should().ContainKey("created");
        document.Should().ContainKey("updated");

        document["created"].Should().BeOfType<DateTime>();
        document["updated"].Should().BeOfType<DateTime>();

        var created = (DateTime)document["created"];
        var updated = (DateTime)document["updated"];

        created.Should().Be(new DateTime(2024, 1, 1, 12, 30, 45, 123, DateTimeKind.Utc));
        updated.Should().Be(new DateTime(2024, 12, 31, 23, 59, 59, DateTimeKind.Utc));
    }

    [Test]
    public void ParseContent_AllMongoConstructorsTogether_ParsesCorrectly()
    {
        // Arrange
        var content = """
            {
              _id: ObjectId('507f1f77bcf86cd799439011'),
              balance: Decimal128('999.99'),
              created: Date('2023-06-15T10:00:00Z'),
              status: "active"
            }
            """;

        // Act
        var result = ExpectedOutputParser.ParseContent(content);

        // Assert
        result.IsSuccess.Should().BeTrue();
        result.Data.Should().HaveCount(1);

        var document = (Dictionary<string, object>)result.Data![0];
        document.Should().HaveCount(4);

        // Verify all types are correctly parsed
        document["_id"].Should().BeOfType<ObjectId>();
        document["balance"].Should().BeOfType<Decimal128>();
        document["created"].Should().BeOfType<DateTime>();
        document["status"].Should().Be("active");

        // Verify values
        ((ObjectId)document["_id"]).ToString().Should().Be("507f1f77bcf86cd799439011");
        ((Decimal128)document["balance"]).ToString().Should().Be("999.99");
        ((DateTime)document["created"]).Should().Be(new DateTime(2023, 6, 15, 10, 0, 0, DateTimeKind.Utc));
    }

    [Test]
    public void ParseContent_NestedObjectsWithMongoConstructors_ParsesCorrectly()
    {
        // Arrange
        var content = """
            {
              user: {
                _id: ObjectId('507f1f77bcf86cd799439011'),
                created: Date('2023-01-01T00:00:00Z')
              },
              account: {
                balance: Decimal128('1000.50'),
                updated: Date('2023-12-31T23:59:59Z')
              }
            }
            """;

        // Act
        var result = ExpectedOutputParser.ParseContent(content);

        // Assert
        result.IsSuccess.Should().BeTrue();
        result.Data.Should().HaveCount(1);

        var document = (Dictionary<string, object>)result.Data![0];
        document.Should().ContainKey("user");
        document.Should().ContainKey("account");

        var user = (Dictionary<string, object>)document["user"];
        var account = (Dictionary<string, object>)document["account"];

        user["_id"].Should().BeOfType<ObjectId>();
        user["created"].Should().BeOfType<DateTime>();
        account["balance"].Should().BeOfType<Decimal128>();
        account["updated"].Should().BeOfType<DateTime>();
    }

    [Test]
    public void ParseContent_ArrayWithMongoConstructors_ParsesCorrectly()
    {
        // Arrange
        var content = """
            [
              {
                _id: ObjectId('507f1f77bcf86cd799439011'),
                amount: Decimal128('100.00')
              },
              {
                _id: ObjectId('507f1f77bcf86cd799439012'),
                amount: Decimal128('200.00')
              }
            ]
            """;

        // Act
        var result = ExpectedOutputParser.ParseContent(content);

        // Assert
        result.IsSuccess.Should().BeTrue();
        result.Data.Should().HaveCount(1);

        // The result contains one array with two documents
        var array = (object[])result.Data![0];
        array.Should().HaveCount(2);

        foreach (var item in array)
        {
            var document = (Dictionary<string, object>)item;
            document["_id"].Should().BeOfType<ObjectId>();
            document["amount"].Should().BeOfType<Decimal128>();
        }
    }

    [Test]
    public void ParseContent_SingleQuotedStrings_ParsesCorrectly()
    {
        // Arrange
        var content = """
            {
              name: 'John O\'Brien',
              description: 'A "complex" string with mixed quotes',
              simple: 'simple string'
            }
            """;

        // Act
        var result = ExpectedOutputParser.ParseContent(content);

        // Assert
        result.IsSuccess.Should().BeTrue();
        result.Data.Should().HaveCount(1);

        var document = (Dictionary<string, object>)result.Data![0];
        document["name"].Should().Be("John O'Brien");
        document["description"].Should().Be("A \"complex\" string with mixed quotes");
        document["simple"].Should().Be("simple string");
    }

    [Test]
    public void ParseContent_UnquotedKeys_ParsesCorrectly()
    {
        // Arrange
        var content = """
            {
              unquoted_key: "value1",
              another-key: "value2",
              key123: "value3",
              _privateKey: "value4",
              $specialKey: "value5"
            }
            """;

        // Act
        var result = ExpectedOutputParser.ParseContent(content);

        // Assert
        result.IsSuccess.Should().BeTrue();
        result.Data.Should().HaveCount(1);

        var document = (Dictionary<string, object>)result.Data![0];
        document.Should().HaveCount(5);
        document.Should().ContainKey("unquoted_key");
        document.Should().ContainKey("another-key");
        document.Should().ContainKey("key123");
        document.Should().ContainKey("_privateKey");
        document.Should().ContainKey("$specialKey");
    }

    [Test]
    public void ParseContent_EllipsisInConstructors_HandlesCorrectly()
    {
        // Arrange
        var content = """
            {
              _id: ObjectId(...),
              balance: Decimal128(...),
              created: Date(...),
              name: "Test"
            }
            """;

        // Act
        var result = ExpectedOutputParser.ParseContent(content);

        // Assert
        result.IsSuccess.Should().BeTrue();
        result.Data.Should().HaveCount(1);

        var document = (Dictionary<string, object>)result.Data![0];

        // Ellipsis in constructors should be preserved as ellipsis strings
        document["_id"].Should().Be("...");
        document["balance"].Should().Be("...");
        document["created"].Should().Be("...");
        document["name"].Should().Be("Test");
    }

    [Test]
    public void ParseContent_ComplexRealWorldExample_ParsesCorrectly()
    {
        // Arrange - realistic MongoDB document with all features
        var content = """
            {
              _id: ObjectId('507f1f77bcf86cd799439011'),
              user: {
                name: 'John Doe',
                email: "john.doe@example.com",
                created: Date('2023-01-15T08:30:00Z')
              },
              orders: [
                {
                  order_id: ObjectId('507f1f77bcf86cd799439012'),
                  amount: Decimal128('299.99'),
                  status: 'completed'
                },
                {
                  order_id: ObjectId('507f1f77bcf86cd799439013'),
                  amount: Decimal128('149.50'),
                  status: 'pending'
                }
              ],
              metadata: {
                version: 1,
                last_updated: Date('2023-12-20T15:45:30Z'),
                tags: ["customer", "premium"]
              }
            }
            """;

        // Act
        var result = ExpectedOutputParser.ParseContent(content);

        // Assert
        result.IsSuccess.Should().BeTrue();
        result.Data.Should().HaveCount(1);

        var document = (Dictionary<string, object>)result.Data![0];

        // Validate root structure
        document.Should().ContainKey("_id");
        document.Should().ContainKey("user");
        document.Should().ContainKey("orders");
        document.Should().ContainKey("metadata");

        // Validate MongoDB types
        document["_id"].Should().BeOfType<ObjectId>();

        // Validate nested user object
        var user = (Dictionary<string, object>)document["user"];
        user["name"].Should().Be("John Doe");
        user["email"].Should().Be("john.doe@example.com");
        user["created"].Should().BeOfType<DateTime>();

        // Validate orders array
        var orders = (object[])document["orders"];
        orders.Should().HaveCount(2);

        foreach (var order in orders)
        {
            var orderDoc = (Dictionary<string, object>)order;
            orderDoc["order_id"].Should().BeOfType<ObjectId>();
            orderDoc["amount"].Should().BeOfType<Decimal128>();
            orderDoc["status"].Should().BeOfType<string>();
        }

        // Validate metadata
        var metadata = (Dictionary<string, object>)document["metadata"];
        metadata["version"].Should().Be(1L); // JSON numbers parse as long
        metadata["last_updated"].Should().BeOfType<DateTime>();

        var tags = (object[])metadata["tags"];
        tags.Should().HaveCount(2);
        tags[0].Should().Be("customer");
        tags[1].Should().Be("premium");
    }

    [Test]
    public void ParseContent_InvalidObjectIdFormat_ReturnsParseError()
    {
        // Arrange
        var content = """
            {
              _id: ObjectId('invalid-objectid-format'),
              name: "Test"
            }
            """;

        // Act
        var result = ExpectedOutputParser.ParseContent(content);

        // Assert
        result.IsSuccess.Should().BeFalse();
        result.Error.Should().Contain("Parse error");
    }

    [Test]
    public void ParseContent_InvalidDecimal128Format_ReturnsParseError()
    {
        // Arrange
        var content = """
            {
              balance: Decimal128('not-a-number'),
              name: "Test"
            }
            """;

        // Act
        var result = ExpectedOutputParser.ParseContent(content);

        // Assert
        result.IsSuccess.Should().BeFalse();
        result.Error.Should().Contain("Parse error");
    }

    [Test]
    public void ParseContent_InvalidDateFormat_ReturnsParseError()
    {
        // Arrange
        var content = """
            {
              created: Date('invalid-date-format'),
              name: "Test"
            }
            """;

        // Act
        var result = ExpectedOutputParser.ParseContent(content);

        // Assert
        result.IsSuccess.Should().BeFalse();
        result.Error.Should().Contain("Parse error");
    }

    [Test]
    public void ParseContent_CommentsInDocument_IgnoresComments()
    {
        // Arrange
        var content = """
            {
              // This is a comment
              _id: ObjectId('507f1f77bcf86cd799439011'),
              /* Multi-line
                 comment */
              name: "Test Document",
              // Another comment
              value: 42
            }
            """;

        // Act
        var result = ExpectedOutputParser.ParseContent(content);

        // Assert
        result.IsSuccess.Should().BeTrue();
        result.Data.Should().HaveCount(1);

        var document = (Dictionary<string, object>)result.Data![0];
        document.Should().HaveCount(3);
        document.Should().ContainKey("_id");
        document.Should().ContainKey("name");
        document.Should().ContainKey("value");

        document["_id"].Should().BeOfType<ObjectId>();
        document["name"].Should().Be("Test Document");
        document["value"].Should().Be(42L);
    }

    [Test]
    public void ParseContent_EdgeCaseObjectIds_HandlesCorrectly()
    {
        // Arrange
        var content = """
            {
              valid_objectid: ObjectId('000000000000000000000000'),
              another_valid: ObjectId('ffffffffffffffffffffffff'),
              mixed_case: ObjectId('AbCdEf1234567890AbCdEf12')
            }
            """;

        // Act
        var result = ExpectedOutputParser.ParseContent(content);

        // Assert
        result.IsSuccess.Should().BeTrue();
        result.Data.Should().HaveCount(1);

        var document = (Dictionary<string, object>)result.Data![0];
        document["valid_objectid"].Should().BeOfType<ObjectId>();
        document["another_valid"].Should().BeOfType<ObjectId>();
        document["mixed_case"].Should().BeOfType<ObjectId>();

        // Verify values are parsed correctly
        ((ObjectId)document["valid_objectid"]).ToString().Should().Be("000000000000000000000000");
        ((ObjectId)document["another_valid"]).ToString().Should().Be("ffffffffffffffffffffffff");
        ((ObjectId)document["mixed_case"]).ToString().Should().Be("abcdef1234567890abcdef12"); // ObjectId normalizes to lowercase
    }

    [Test]
    public void ParseContent_EdgeCaseDecimals_HandlesCorrectly()
    {
        // Arrange
        var content = """
            {
              zero: Decimal128('0'),
              negative: Decimal128('-123.456'),
              scientific: Decimal128('1.23E+10'),
              very_precise: Decimal128('123.123456789012345678901234567890')
            }
            """;

        // Act
        var result = ExpectedOutputParser.ParseContent(content);

        // Assert
        result.IsSuccess.Should().BeTrue();
        result.Data.Should().HaveCount(1);

        var document = (Dictionary<string, object>)result.Data![0];
        document["zero"].Should().BeOfType<Decimal128>();
        document["negative"].Should().BeOfType<Decimal128>();
        document["scientific"].Should().BeOfType<Decimal128>();
        document["very_precise"].Should().BeOfType<Decimal128>();

        // Verify values
        ((Decimal128)document["zero"]).ToString().Should().Be("0");
        ((Decimal128)document["negative"]).ToString().Should().Be("-123.456");
    }

    [Test]
    public void ParseContent_EdgeCaseDates_HandlesCorrectly()
    {
        // Arrange
        var content = """
            {
              unix_epoch: Date('1970-01-01T00:00:00Z'),
              with_milliseconds: Date('2024-01-01T12:30:45.123Z'),
              without_milliseconds: Date('2024-01-01T12:30:45Z'),
              far_future: Date('2099-12-31T23:59:59Z')
            }
            """;

        // Act
        var result = ExpectedOutputParser.ParseContent(content);

        // Assert
        result.IsSuccess.Should().BeTrue();
        result.Data.Should().HaveCount(1);

        var document = (Dictionary<string, object>)result.Data![0];
        document["unix_epoch"].Should().BeOfType<DateTime>();
        document["with_milliseconds"].Should().BeOfType<DateTime>();
        document["without_milliseconds"].Should().BeOfType<DateTime>();
        document["far_future"].Should().BeOfType<DateTime>();

        // Verify specific dates
        ((DateTime)document["unix_epoch"]).Should().Be(new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc));
        ((DateTime)document["with_milliseconds"]).Should().Be(new DateTime(2024, 1, 1, 12, 30, 45, 123, DateTimeKind.Utc));
    }
}
