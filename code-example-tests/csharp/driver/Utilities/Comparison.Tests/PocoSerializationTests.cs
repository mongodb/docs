using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using NUnit.Framework;

namespace Utilities.Comparison.Tests;

/// <summary>
///     Tests for POCO (Plain Old CLR Object) serialization and comparison support.
///     Validates how the comparison utility handles various C# types including classes, records,
///     structs, collections, and BSON attribute mappings during serialization and comparison.
/// </summary>
[TestFixture]
public class PocoSerializationTests
{
    private string GetTestOutputPath(string fileName)
    {
        return Path.Combine(Path.GetTempPath(), fileName);
    }

    [Test]
    [Description("Tests that a simple POCO class serialization matches the expected BSON document format")]
    public void ValidateOutput_SimplePocoClass_MatchesExpectedBsonDocument()
    {
        var expectedOutputPath = GetTestOutputPath("simple_poco_expected.txt");
        var expectedContent = """
                              {
                                _id: ObjectId('507f1f77bcf86cd799439011'),
                                name: "John Doe",
                                age: 30,
                                active: true
                              }
                              """;
        File.WriteAllText(expectedOutputPath, expectedContent);

        var actualPoco = new PocoSimplePerson
        {
            Id = new ObjectId("507f1f77bcf86cd799439011"),
            Name = "John Doe",
            Age = 30,
            IsActive = true
        };

        try
        {
            Expect.That(actualPoco).ShouldMatch(expectedOutputPath);
        }
        finally
        {
            File.Delete(expectedOutputPath);
        }
    }


    [Test]
    [Description("Tests that POCO classes with BSON attributes handle proper field mapping during serialization")]
    public void ValidateOutput_PocoWithBsonAttributes_HandlesFieldMapping()
    {
        var expectedOutputPath = GetTestOutputPath("bson_attributes_expected.txt");
        var expectedContent = """
                              {
                                _id: ObjectId('507f1f77bcf86cd799439012'),
                                full_name: "Jane Smith",
                                user_age: 25,
                                created_at: Date('2023-01-15T10:30:00Z'),
                                account_balance: Decimal128('1250.75')
                              }
                              """;
        File.WriteAllText(expectedOutputPath, expectedContent);

        var actualPoco = new UserWithBsonAttributes
        {
            Id = new ObjectId("507f1f77bcf86cd799439012"),
            FullName = "Jane Smith",
            UserAge = 25,
            CreatedAt = new DateTime(2023, 1, 15, 10, 30, 0, DateTimeKind.Utc),
            AccountBalance = Decimal128.Parse("1250.75")
        };

        try
        {
            Expect.That(actualPoco).ShouldMatch(expectedOutputPath);
        }
        finally
        {
            File.Delete(expectedOutputPath);
        }
    }

    [Test]
    [Description("Tests that nested POCO objects handle deep nesting with complex object hierarchies")]
    public void ValidateOutput_NestedPocoObjects_HandlesDeepNesting()
    {
        var expectedOutputPath = GetTestOutputPath("nested_poco_expected.txt");
        var expectedContent = """
                              {
                                _id: ObjectId('507f1f77bcf86cd799439013'),
                                customer: {
                                  name: "Bob Johnson",
                                  email: "bob@example.com"
                                },
                                order_date: Date('2023-02-01T15:45:00Z'),
                                amount: Decimal128('299.99'),
                                items: [
                                  {
                                    name: "Widget A",
                                    quantity: 2,
                                    price: Decimal128('149.995')
                                  }
                                ]
                              }
                              """;
        File.WriteAllText(expectedOutputPath, expectedContent);

        var actualPoco = new ComplexPocoOrder
        {
            Id = new ObjectId("507f1f77bcf86cd799439013"),
            Customer = new PocoCustomer
            {
                Name = "Bob Johnson",
                Email = "bob@example.com"
            },
            OrderDate = new DateTime(2023, 2, 1, 15, 45, 0, DateTimeKind.Utc),
            Amount = Decimal128.Parse("299.99"),
            Items = new List<PocoOrderItem>
            {
                new()
                {
                    Name = "Widget A",
                    Quantity = 2,
                    Price = Decimal128.Parse("149.995")
                }
            }
        };

        try
        {
            Expect.That(actualPoco).ShouldMatch(expectedOutputPath);
        }
        finally
        {
            File.Delete(expectedOutputPath);
        }
    }

    [Test]
    [Description("Tests that C# record types are handled correctly during serialization and comparison")]
    public void ValidateOutput_RecordType_HandlesRecordsCorrectly()
    {
        var expectedOutputPath = GetTestOutputPath("record_poco_expected.txt");
        var expectedContent = """
                              {
                                name: "Premium Widget",
                                price: Decimal128('49.99'),
                                in_stock: true,
                                tags: ["electronics", "gadgets"]
                              }
                              """;
        File.WriteAllText(expectedOutputPath, expectedContent);

        var actualRecord = new ProductRecord(
            "Premium Widget",
            Decimal128.Parse("49.99"),
            true,
            new[] { "electronics", "gadgets" }
        );

        try
        {
            Expect.That(actualRecord).ShouldMatch(expectedOutputPath);
        }
        finally
        {
            File.Delete(expectedOutputPath);
        }
    }

    [Test]
    [Description("Tests that struct value types are properly handled during serialization and comparison")]
    public void ValidateOutput_StructType_HandlesValueTypes()
    {
        var expectedOutputPath = GetTestOutputPath("struct_poco_expected.txt");
        var expectedContent = """
                              {
                                x: 10.5,
                                y: 20.7,
                                z: 5.0
                              }
                              """;
        File.WriteAllText(expectedOutputPath, expectedContent);

        var actualStruct = new Point3D
        {
            X = 10.5,
            Y = 20.7,
            Z = 5.0
        };

        try
        {
            Expect.That(actualStruct).ShouldMatch(expectedOutputPath);
        }
        finally
        {
            File.Delete(expectedOutputPath);
        }
    }

    [Test]
    [Description("Tests that arrays and collections of POCO objects are handled correctly")]
    public void ValidateOutput_PocoArray_HandlesCollections()
    {
        var expectedOutputPath = GetTestOutputPath("poco_array_expected.txt");
        var expectedContent = """
                              [
                                {
                                  _id: ObjectId('507f1f77bcf86cd799439014'),
                                  name: "Alice",
                                  age: 28,
                                  active: true
                                },
                                {
                                  _id: ObjectId('507f1f77bcf86cd799439015'),
                                  name: "Charlie",
                                  age: 32,
                                  active: false
                                }
                              ]
                              """;
        File.WriteAllText(expectedOutputPath, expectedContent);

        var actualArray = new[]
        {
            new PocoSimplePerson
            {
                Id = new ObjectId("507f1f77bcf86cd799439014"),
                Name = "Alice",
                Age = 28,
                IsActive = true
            },
            new PocoSimplePerson
            {
                Id = new ObjectId("507f1f77bcf86cd799439015"),
                Name = "Charlie",
                Age = 32,
                IsActive = false
            }
        };

        try
        {
            Expect.That(actualArray).ShouldMatch(expectedOutputPath);
        }
        finally
        {
            File.Delete(expectedOutputPath);
        }
    }

    [Test]
    [Description("Tests that POCO objects with ignored fields exclude the ignored properties during comparison")]
    public void ValidateOutput_PocoWithIgnoredFields_ExcludesIgnoredProperties()
    {
        var expectedOutputPath = GetTestOutputPath("ignored_fields_expected.txt");
        var expectedContent = """
                              {
                                _id: ObjectId('507f1f77bcf86cd799439016'),
                                first_name: "David",
                                department: "Engineering"
                              }
                              """;
        File.WriteAllText(expectedOutputPath, expectedContent);

        var actualPoco = new PocoEmployee
        {
            Id = new ObjectId("507f1f77bcf86cd799439016"),
            FirstName = "David",
            LastName = "Wilson", // This should be ignored
            Department = "Engineering",
            Salary = 75000, // This should be ignored
            InternalNotes = "Top performer" // This should be ignored
        };

        try
        {
            Expect.That(actualPoco).ShouldMatch(expectedOutputPath);
        }
        finally
        {
            File.Delete(expectedOutputPath);
        }
    }

    [Test]
    [Description("Tests that invalid POCO data properly fails validation when compared to expected output")]
    public void ValidateOutput_InvalidPocoData_FailsValidation()
    {
        var expectedOutputPath = GetTestOutputPath("validation_failure_expected.txt");
        var expectedContent = """
                              {
                                _id: ObjectId('507f1f77bcf86cd799439017'),
                                name: "Expected Name",
                                age: 25,
                                active: true
                              }
                              """;
        File.WriteAllText(expectedOutputPath, expectedContent);

        var actualPoco = new PocoSimplePerson
        {
            Id = new ObjectId("507f1f77bcf86cd799439017"),
            Name = "Different Name", // This should cause validation to fail
            Age = 25,
            IsActive = true
        };

        try
        {
            Expect.That(actualPoco).ShouldNotMatch(expectedOutputPath);
        }
        finally
        {
            File.Delete(expectedOutputPath);
        }
    }
}


public class PocoCustomer
{
    [BsonElement("name")]
    public string Name { get; set; } = string.Empty;

    [BsonElement("email")]
    public string Email { get; set; } = string.Empty;
}


public class PocoEmployee
{
    [BsonId] public ObjectId Id { get; set; }

    [BsonElement("first_name")] public string FirstName { get; set; } = string.Empty;

    [BsonIgnore] public string LastName { get; set; } = string.Empty;

    [BsonElement("department")] public string Department { get; set; } = string.Empty;

    [BsonIgnore] public decimal Salary { get; set; }

    [BsonIgnore] public string InternalNotes { get; set; } = string.Empty;
}

public class ComplexPocoOrder
{
    [BsonId] public ObjectId Id { get; set; }

    [BsonElement("customer")] public PocoCustomer Customer { get; set; } = new();

    [BsonElement("order_date")] public DateTime OrderDate { get; set; }

    [BsonElement("amount")] public Decimal128 Amount { get; set; }

    [BsonElement("items")] public List<PocoOrderItem> Items { get; set; } = new();
}

public class PocoOrderItem
{
    [BsonElement("name")] public string Name { get; set; } = string.Empty;

    [BsonElement("quantity")] public int Quantity { get; set; }

    [BsonElement("price")] public Decimal128 Price { get; set; }
}

public record ProductRecord(
    [property: BsonElement("name")] string Name,
    [property: BsonElement("price")] Decimal128 Price,
    [property: BsonElement("in_stock")] bool InStock,
    [property: BsonElement("tags")] string[] Tags
);

public struct Point3D
{
    [BsonElement("x")] public double X { get; set; }

    [BsonElement("y")] public double Y { get; set; }

    [BsonElement("z")] public double Z { get; set; }
}

public class PocoSimplePerson
{
    [BsonId] public ObjectId Id { get; set; }

    [BsonElement("name")] public string Name { get; set; } = string.Empty;

    [BsonElement("age")] public int Age { get; set; }

    [BsonElement("active")] public bool IsActive { get; set; }
}

public class UserWithBsonAttributes
{
    [BsonId] public ObjectId Id { get; set; }

    [BsonElement("full_name")] public string FullName { get; set; } = string.Empty;

    [BsonElement("user_age")] public int UserAge { get; set; }

    [BsonElement("created_at")] public DateTime CreatedAt { get; set; }

    [BsonElement("account_balance")] public Decimal128 AccountBalance { get; set; }
}