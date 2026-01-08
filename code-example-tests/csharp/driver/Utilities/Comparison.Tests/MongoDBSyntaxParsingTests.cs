using MongoDB.Bson;
using NUnit.Framework;

namespace Utilities.Comparison.Tests;

/// <summary>
///     Comprehensive tests for MongoDB document syntax parsing including constructors,
///     unquoted keys, single quotes, and ellipsis patterns.
///     These tests ensure the FileContentsParser can reliably handle MongoDB shell syntax
///     which is critical for the code example testing framework.
/// </summary>
[TestFixture]
public class MongoDBSyntaxParsingTests
{
    [Test]
    [Description("Tests that ObjectId constructor syntax is parsed correctly into ObjectId instances")]
    public void ParseContent_ObjectIdConstructor_ParsesCorrectly()
    {
        var content = """
                      {
                        _id: ObjectId('507f1f77bcf86cd799439011'),
                        name: "Test Document"
                      }
                      """;

        var result = FileContentsParser.ParseContent(content);


        Assert.That(result.Data != null && result.Data.Count == 1);

        var document = (Dictionary<string, object>)result.Data![0];
        Assert.That(document.ContainsKey("_id") == true);
        Assert.That(document["_id"] is ObjectId);

        var objectId = (ObjectId)document["_id"];
        Assert.That(objectId.ToString() == "507f1f77bcf86cd799439011");
    }

    [Test]
    [Description("Tests that Decimal128 constructor syntax is parsed correctly into Decimal128 instances")]
    public void ParseContent_Decimal128Constructor_ParsesCorrectly()
    {
        var content = """
                      {
                        balance: Decimal128('123.456789'),
                        currency: "USD"
                      }
                      """;

        var result = FileContentsParser.ParseContent(content);


        Assert.That(result.Data, Has.Count.EqualTo(1));

        var document = (Dictionary<string, object>)result.Data![0];
        Assert.That(document, Contains.Key("balance"));
        Assert.That(document["balance"], Is.TypeOf<Decimal128>());

        var decimal128 = (Decimal128)document["balance"];
        Assert.That(decimal128.ToString(), Is.EqualTo("123.456789"));
    }

    [Test]
    [Description("Tests that Date constructor syntax is parsed correctly into DateTime instances")]
    public void ParseContent_DateConstructor_ParsesCorrectly()
    {
        var content = """
                      {
                        created: Date('2024-01-01T12:30:45.123Z'),
                        updated: Date('2024-12-31T23:59:59Z')
                      }
                      """;

        var result = FileContentsParser.ParseContent(content);


        Assert.That(result.Data, Has.Count.EqualTo(1));

        var document = (Dictionary<string, object>)result.Data![0];
        Assert.That(document, Contains.Key("created"));
        Assert.That(document, Contains.Key("updated"));

        Assert.That(document["created"], Is.TypeOf<DateTime>());
        Assert.That(document["updated"], Is.TypeOf<DateTime>());

        var created = (DateTime)document["created"];
        var updated = (DateTime)document["updated"];

        Assert.That(created, Is.EqualTo(new DateTime(2024, 1, 1, 12, 30, 45, 123, DateTimeKind.Utc)));
        Assert.That(updated, Is.EqualTo(new DateTime(2024, 12, 31, 23, 59, 59, DateTimeKind.Utc)));
    }

    [Test]
    [Description("Tests that all MongoDB constructors used together are parsed correctly")]
    public void ParseContent_AllMongoConstructorsTogether_ParsesCorrectly()
    {
        var content = """
                      {
                        _id: ObjectId('507f1f77bcf86cd799439011'),
                        balance: Decimal128('999.99'),
                        created: Date('2023-06-15T10:00:00Z'),
                        status: "active"
                      }
                      """;

        var result = FileContentsParser.ParseContent(content);


        Assert.That(result.Data, Has.Count.EqualTo(1));

        var document = (Dictionary<string, object>)result.Data![0];
        Assert.That(document, Has.Count.EqualTo(4));

        // Verify all types are correctly parsed
        Assert.That(document["_id"], Is.TypeOf<ObjectId>());
        Assert.That(document["balance"], Is.TypeOf<Decimal128>());
        Assert.That(document["created"], Is.TypeOf<DateTime>());
        Assert.That(document["status"], Is.EqualTo("active"));

        // Verify values
        Assert.That(((ObjectId)document["_id"]).ToString(), Is.EqualTo("507f1f77bcf86cd799439011"));
        Assert.That(((Decimal128)document["balance"]).ToString(), Is.EqualTo("999.99"));
        Assert.That(((DateTime)document["created"]), Is.EqualTo(new DateTime(2023, 6, 15, 10, 0, 0, DateTimeKind.Utc)));
    }

    [Test]
    [Description("Tests that nested objects with MongoDB constructors are parsed correctly")]
    public void ParseContent_NestedObjectsWithMongoConstructors_ParsesCorrectly()
    {
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

        var result = FileContentsParser.ParseContent(content);


        Assert.That(result.Data, Has.Count.EqualTo(1));

        var document = (Dictionary<string, object>)result.Data![0];
        Assert.That(document, Contains.Key("user"));
        Assert.That(document, Contains.Key("account"));

        var user = (Dictionary<string, object>)document["user"];
        var account = (Dictionary<string, object>)document["account"];

        Assert.That(user["_id"], Is.TypeOf<ObjectId>());
        Assert.That(user["created"], Is.TypeOf<DateTime>());
        Assert.That(account["balance"], Is.TypeOf<Decimal128>());
        Assert.That(account["updated"], Is.TypeOf<DateTime>());
    }

    [Test]
    [Description("Tests that arrays containing MongoDB constructors are parsed correctly")]
    public void ParseContent_ArrayWithMongoConstructors_ParsesCorrectly()
    {
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

        var result = FileContentsParser.ParseContent(content);

        // Arrays are unpacked, so we expect 2 documents
        Assert.That(result.Data, Has.Count.EqualTo(2));

        // Each item should be a document with ObjectId and Decimal128
        foreach (var item in result.Data!)
        {
            var document = (Dictionary<string, object>)item;
            Assert.That(document["_id"], Is.TypeOf<ObjectId>());
            Assert.That(document["amount"], Is.TypeOf<Decimal128>());
        }
    }

    [Test]
    [Description("Tests that single-quoted strings with escape characters are parsed correctly")]
    public void ParseContent_SingleQuotedStrings_ParsesCorrectly()
    {
        var content = """
                      {
                        name: 'John O\'Brien',
                        description: 'A "complex" string with mixed quotes',
                        simple: 'simple string'
                      }
                      """;

        var result = FileContentsParser.ParseContent(content);


        Assert.That(result.Data, Has.Count.EqualTo(1));

        var document = (Dictionary<string, object>)result.Data![0];
        Assert.That(document["name"], Is.EqualTo("John O'Brien"));
        Assert.That(document["description"], Is.EqualTo("A \"complex\" string with mixed quotes"));
        Assert.That(document["simple"], Is.EqualTo("simple string"));
    }

    [Test]
    [Description("Tests that unquoted keys with various naming patterns are parsed correctly")]
    public void ParseContent_UnquotedKeys_ParsesCorrectly()
    {
        var content = """
                      {
                        unquoted_key: "value1",
                        another-key: "value2",
                        key123: "value3",
                        _privateKey: "value4",
                        $specialKey: "value5"
                      }
                      """;

        var result = FileContentsParser.ParseContent(content);


        Assert.That(result.Data, Has.Count.EqualTo(1));

        var document = (Dictionary<string, object>)result.Data![0];
        Assert.That(document, Has.Count.EqualTo(5));
        Assert.That(document, Contains.Key("unquoted_key"));
        Assert.That(document, Contains.Key("another-key"));
        Assert.That(document, Contains.Key("key123"));
        Assert.That(document, Contains.Key("_privateKey"));
        Assert.That(document, Contains.Key("$specialKey"));
    }

    [Test]
    [Description("Tests that ellipsis patterns in MongoDB constructors are handled correctly")]
    public void ParseContent_EllipsisInConstructors_HandlesCorrectly()
    {
        var content = """
                      {
                        _id: ObjectId(...),
                        balance: Decimal128(...),
                        created: Date(...),
                        name: "Test"
                      }
                      """;

        var result = FileContentsParser.ParseContent(content);


        Assert.That(result.Data, Has.Count.EqualTo(1));

        var document = (Dictionary<string, object>)result.Data![0];

        // Ellipsis in constructors should be preserved as ellipsis strings
        Assert.That(document["_id"], Is.EqualTo("..."));
        Assert.That(document["balance"], Is.EqualTo("..."));
        Assert.That(document["created"], Is.EqualTo("..."));
        Assert.That(document["name"], Is.EqualTo("Test"));
    }

    [Test]
    [Description("Tests that complex real-world examples with all MongoDB syntax patterns are parsed correctly")]
    public void ParseContent_ComplexRealWorldExample_ParsesCorrectly()
    {
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

        var result = FileContentsParser.ParseContent(content);


        Assert.That(result.Data, Has.Count.EqualTo(1));

        var document = (Dictionary<string, object>)result.Data![0];

        // Validate root structure
        Assert.That(document, Contains.Key("_id"));
        Assert.That(document, Contains.Key("user"));
        Assert.That(document, Contains.Key("orders"));
        Assert.That(document, Contains.Key("metadata"));

        // Validate MongoDB types
        Assert.That(document["_id"], Is.TypeOf<ObjectId>());

        // Validate nested user object
        var user = (Dictionary<string, object>)document["user"];
        Assert.That(user["name"], Is.EqualTo("John Doe"));
        Assert.That(user["email"], Is.EqualTo("john.doe@example.com"));
        Assert.That(user["created"], Is.TypeOf<DateTime>());

        // Validate orders array
        var orders = (object[])document["orders"];
        Assert.That(orders, Has.Length.EqualTo(2));

        foreach (var order in orders)
        {
            var orderDoc = (Dictionary<string, object>)order;
            Assert.That(orderDoc["order_id"], Is.TypeOf<ObjectId>());
            Assert.That(orderDoc["amount"], Is.TypeOf<Decimal128>());
            Assert.That(orderDoc["status"], Is.TypeOf<string>());
        }

        // Validate metadata
        var metadata = (Dictionary<string, object>)document["metadata"];
        Assert.That(metadata["version"], Is.EqualTo(1L)); // JSON numbers parse as long
        Assert.That(metadata["last_updated"], Is.TypeOf<DateTime>());

        var tags = (object[])metadata["tags"];
        Assert.That(tags, Has.Length.EqualTo(2));
        Assert.That(tags[0], Is.EqualTo("customer"));
        Assert.That(tags[1], Is.EqualTo("premium"));
    }

    [Test]
    [Description("Tests that invalid ObjectId format returns appropriate parse error")]
    public void ParseContent_InvalidObjectIdFormat_ReturnsParseError()
    {
        var content = """
                      {
                        _id: ObjectId('invalid-objectid-format'),
                        name: "Test"
                      }
                      """;

        var result = FileContentsParser.ParseContent(content);


        Assert.That(result.IsSuccess, Is.False);
        Assert.That(result.Error, Does.Contain("Parse error"));
    }

    [Test]
    [Description("Tests that invalid Decimal128 format returns appropriate parse error")]
    public void ParseContent_InvalidDecimal128Format_ReturnsParseError()
    {
        var content = """
                      {
                        balance: Decimal128('not-a-number'),
                        name: "Test"
                      }
                      """;

        var result = FileContentsParser.ParseContent(content);


        Assert.That(result.IsSuccess, Is.False);
        Assert.That(result.Error, Does.Contain("Parse error"));
    }

    [Test]
    [Description("Tests that invalid Date format returns appropriate parse error")]
    public void ParseContent_InvalidDateFormat_ReturnsParseError()
    {
        var content = """
                      {
                        created: Date('invalid-date-format'),
                        name: "Test"
                      }
                      """;

        var result = FileContentsParser.ParseContent(content);


        Assert.That(result.IsSuccess, Is.False);
        Assert.That(result.Error, Does.Contain("Parse error"));
    }

    [Test]
    [Description("Tests that comments in document are ignored during parsing")]
    public void ParseContent_CommentsInDocument_IgnoresComments()
    {
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

        var result = FileContentsParser.ParseContent(content);


        Assert.That(result.Data, Has.Count.EqualTo(1));

        var document = (Dictionary<string, object>)result.Data![0];
        Assert.That(document, Has.Count.EqualTo(3));
        Assert.That(document, Contains.Key("_id"));
        Assert.That(document, Contains.Key("name"));
        Assert.That(document, Contains.Key("value"));

        Assert.That(document["_id"], Is.TypeOf<ObjectId>());
        Assert.That(document["name"], Is.EqualTo("Test Document"));
        Assert.That(document["value"], Is.EqualTo(42L));
    }

    [Test]
    [Description("Tests that edge case ObjectIds are handled correctly")]
    public void ParseContent_EdgeCaseObjectIds_HandlesCorrectly()
    {
        var content = """
                      {
                        valid_objectid: ObjectId('000000000000000000000000'),
                        another_valid: ObjectId('ffffffffffffffffffffffff'),
                        mixed_case: ObjectId('AbCdEf1234567890AbCdEf12')
                      }
                      """;

        var result = FileContentsParser.ParseContent(content);


        Assert.That(result.Data, Has.Count.EqualTo(1));

        var document = (Dictionary<string, object>)result.Data![0];
        Assert.That(document["valid_objectid"], Is.TypeOf<ObjectId>());
        Assert.That(document["another_valid"], Is.TypeOf<ObjectId>());
        Assert.That(document["mixed_case"], Is.TypeOf<ObjectId>());

        // Verify values are parsed correctly
        Assert.That(((ObjectId)document["valid_objectid"]).ToString(), Is.EqualTo("000000000000000000000000"));
        Assert.That(((ObjectId)document["another_valid"]).ToString(), Is.EqualTo("ffffffffffffffffffffffff"));
        Assert.That(((ObjectId)document["mixed_case"]).ToString(), Is.EqualTo("abcdef1234567890abcdef12")); // ObjectId normalizes to lowercase
    }

    [Test]
    [Description("Tests that edge case Decimal128 values are handled correctly")]
    public void ParseContent_EdgeCaseDecimals_HandlesCorrectly()
    {
        var content = """
                      {
                        zero: Decimal128('0'),
                        negative: Decimal128('-123.456'),
                        scientific: Decimal128('1.23E+10'),
                        very_precise: Decimal128('123.123456789012345678901234567890')
                      }
                      """;

        var result = FileContentsParser.ParseContent(content);


        Assert.That(result.Data, Has.Count.EqualTo(1));

        var document = (Dictionary<string, object>)result.Data![0];
        Assert.That(document["zero"], Is.TypeOf<Decimal128>());
        Assert.That(document["negative"], Is.TypeOf<Decimal128>());
        Assert.That(document["scientific"], Is.TypeOf<Decimal128>());
        Assert.That(document["very_precise"], Is.TypeOf<Decimal128>());

        // Verify values
        Assert.That(((Decimal128)document["zero"]).ToString(), Is.EqualTo("0"));
        Assert.That(((Decimal128)document["negative"]).ToString(), Is.EqualTo("-123.456"));
    }

    [Test]
    [Description("Tests that edge case Date values are handled correctly")]
    public void ParseContent_EdgeCaseDates_HandlesCorrectly()
    {
        var content = """
                      {
                        unix_epoch: Date('1970-01-01T00:00:00Z'),
                        with_milliseconds: Date('2024-01-01T12:30:45.123Z'),
                        without_milliseconds: Date('2024-01-01T12:30:45Z'),
                        far_future: Date('2099-12-31T23:59:59Z')
                      }
                      """;

        var result = FileContentsParser.ParseContent(content);


        Assert.That(result.Data, Has.Count.EqualTo(1));

        var document = (Dictionary<string, object>)result.Data![0];
        Assert.That(document["unix_epoch"], Is.TypeOf<DateTime>());
        Assert.That(document["with_milliseconds"], Is.TypeOf<DateTime>());
        Assert.That(document["without_milliseconds"], Is.TypeOf<DateTime>());
        Assert.That(document["far_future"], Is.TypeOf<DateTime>());

        // Verify specific dates
        Assert.That(((DateTime)document["unix_epoch"]), Is.EqualTo(new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc)));
        Assert.That(((DateTime)document["with_milliseconds"]), Is.EqualTo(new DateTime(2024, 1, 1, 12, 30, 45, 123, DateTimeKind.Utc)));
    }
}