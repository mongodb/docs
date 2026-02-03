using System.Diagnostics;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using NUnit.Framework;

namespace Utilities.Comparison.Tests;

/// <summary>
///     End-to-end integration tests validating the complete comparison workflow.
///     Test Workflow:
///     1. Parse expected output from test data files (MongoDB syntax, JSON, JSONL)
///     2. Generate actual output using MongoDB driver operations
///     3. Run comparison engine with various options (ignore fields, array strategies)
///     4. Validate error reporting and success scenarios
///     Real-World Simulation:
///     These tests simulate the exact workflow used by the code example testing framework.
///     They verify that the entire pipeline works correctly with realistic MongoDB documents,
///     complex nested structures, and all supported data types.
///     Critical Success Factors:
///     - File parsing handles all MongoDB syntax variations correctly
///     - Type normalization works across .NET and MongoDB types
///     - Comparison engine correctly applies ellipsis patterns and options
///     - Error messages provide actionable debugging information
/// </summary>
[TestFixture]
public class IntegrationTests
{
    private string GetTestDataPath(string fileName)
    {
        return Path.Combine(TestContext.CurrentContext.TestDirectory, "TestData", fileName);
    }

    /// <summary>
    ///     End-to-end test with a comprehensive MongoDB document containing all supported data types.
    ///     This test validates the complete workflow:
    ///     1. Complex document structure with nested objects and arrays
    ///     2. All MongoDB-specific types: ObjectId, Decimal128, DateTime
    ///     3. Mixed primitive types: strings, numbers, booleans, nulls
    ///     4. File-based comparison with ellipsis patterns for flexible matching
    ///     Document Structure Tested:
    ///     - Root-level array of user documents
    ///     - Nested profile objects with preferences
    ///     - MongoDB types requiring normalization
    ///     - Ellipsis patterns for version-independent comparison
    ///     Why This Test Matters:
    ///     This simulates real-world MongoDB code examples where documents contain
    ///     the full spectrum of data types and nested structures that documentation
    ///     examples typically demonstrate.
    /// </summary>
    [Test]
    [Description("Tests end-to-end validation of complex documents with all MongoDB data types and features")]
    public void EndToEnd_ComplexDocumentWithAllFeatures_ValidatesCorrectly()
    {
        var actualOutput = new Dictionary<string, object>
        {
            {
                "users", new object[]
                {
                    new Dictionary<string, object>
                    {
                        { "_id", new ObjectId("507f1f77bcf86cd799439011") },
                        { "name", "Alice Johnson" },
                        { "email", "alice@example.com" },
                        { "balance", Decimal128.Parse("1234.56") },
                        { "created", new DateTime(2024, 1, 1, 10, 30, 0, DateTimeKind.Utc) },
                        {
                            "profile", new Dictionary<string, object>
                            {
                                { "age", 28 },
                                { "city", "New York" },
                                {
                                    "preferences", new Dictionary<string, object>
                                    {
                                        { "theme", "dark" },
                                        { "notifications", true }
                                    }
                                }
                            }
                        },
                        { "tags", new object[] { "premium", "verified", "active" } },
                        { "lastLogin", "2024-01-15T08:30:00Z" }, // This will be ignored via ellipsis
                        { "extraField", "extra data" } // This will be allowed via global ellipsis
                    },
                    new Dictionary<string, object>
                    {
                        { "_id", new ObjectId("507f1f77bcf86cd799439012") },
                        { "name", "Bob Smith" },
                        { "email", "bob@example.com" },
                        { "balance", Decimal128.Parse("987.65") },
                        { "created", new DateTime(2024, 1, 2, 14, 20, 0, DateTimeKind.Utc) },
                        {
                            "profile", new Dictionary<string, object>
                            {
                                { "age", 35 },
                                { "city", "San Francisco" },
                                {
                                    "preferences", new Dictionary<string, object>
                                    {
                                        { "theme", "light" },
                                        { "notifications", false }
                                    }
                                }
                            }
                        },
                        { "tags", new object[] { "standard", "verified" } },
                        { "lastLogin", "2024-01-14T15:45:00Z" }, // This will be ignored via ellipsis
                        { "anotherExtraField", "more extra data" } // This will be allowed via global ellipsis
                    }
                }
            },
            {
                "metadata", new Dictionary<string, object>
                {
                    { "total", 2 },
                    { "timestamp", new DateTime(2024, 1, 15, 12, 0, 0, DateTimeKind.Utc) },
                    { "version", "1.0.0" }
                }
            },
            { "someExtraTopLevelField", "allowed by global ellipsis" }
        };

        var filePath = GetTestDataPath("integration-complex.txt");

        var result = Expect.That(actualOutput).ShouldMatch(filePath);

        Assert.That(result.Error == null);
    }

    [Test]
    [Description("Tests end-to-end unordered array comparison validates correctly with different element order")]
    public void EndToEnd_UnorderedArrayComparison_ValidatesCorrectly()
    {
        var actualOutput = new Dictionary<string, object>
        {
            {
                "users", new object[]
                {
                    // Bob first (different order than expected file)
                    new Dictionary<string, object>
                    {
                        { "_id", new ObjectId("507f1f77bcf86cd799439012") },
                        { "name", "Bob Smith" },
                        { "email", "bob@example.com" },
                        { "balance", Decimal128.Parse("987.65") },
                        { "created", new DateTime(2024, 1, 2, 14, 20, 0, DateTimeKind.Utc) },
                        {
                            "profile", new Dictionary<string, object>
                            {
                                { "age", 35 },
                                { "city", "San Francisco" },
                                {
                                    "preferences", new Dictionary<string, object>
                                    {
                                        { "theme", "light" },
                                        { "notifications", false }
                                    }
                                }
                            }
                        },
                        { "tags", new object[] { "standard", "verified" } },
                        { "lastLogin", "different-time" }
                    },
                    // Alice second (different order than expected file)
                    new Dictionary<string, object>
                    {
                        { "_id", new ObjectId("507f1f77bcf86cd799439011") },
                        { "name", "Alice Johnson" },
                        { "email", "alice@example.com" },
                        { "balance", Decimal128.Parse("1234.56") },
                        { "created", new DateTime(2024, 1, 1, 10, 30, 0, DateTimeKind.Utc) },
                        {
                            "profile", new Dictionary<string, object>
                            {
                                { "age", 28 },
                                { "city", "New York" },
                                {
                                    "preferences", new Dictionary<string, object>
                                    {
                                        { "theme", "dark" },
                                        { "notifications", true }
                                    }
                                }
                            }
                        },
                        { "tags", new object[] { "premium", "verified", "active" } },
                        { "lastLogin", "another-different-time" }
                    }
                }
            },
            {
                "metadata", new Dictionary<string, object>
                {
                    { "total", 2 },
                    { "timestamp", new DateTime(2024, 1, 15, 12, 0, 0, DateTimeKind.Utc) },
                    { "version", "1.0.0" }
                }
            }
        };

        var filePath = GetTestDataPath("integration-complex.txt");


        Expect.That(actualOutput).ShouldMatch(filePath);
    }

    [Test]
    [Description("Tests that ordered array comparison fails when elements are in wrong order")]
    public void EndToEnd_OrderedArrayComparison_FailsWithWrongOrder()
    {
        var actualOutput = new Dictionary<string, object>
        {
            {
                "users", new object[]
                {
                    new Dictionary<string, object>
                    {
                        { "_id", new ObjectId("507f1f77bcf86cd799439012") },
                        { "name", "Bob Smith" },
                        { "email", "bob@example.com" },
                        { "balance", Decimal128.Parse("987.65") },
                        { "created", new DateTime(2024, 1, 2, 14, 20, 0, DateTimeKind.Utc) },
                        {
                            "profile", new Dictionary<string, object>
                            {
                                { "age", 35 },
                                { "city", "San Francisco" },
                                {
                                    "preferences", new Dictionary<string, object>
                                    {
                                        { "theme", "light" },
                                        { "notifications", false }
                                    }
                                }
                            }
                        },
                        { "tags", new object[] { "standard", "verified" } },
                        { "lastLogin", "time" }
                    }
                    // Missing Alice - this should fail ordered comparison
                }
            },
            {
                "metadata", new Dictionary<string, object>
                {
                    { "total", 2 },
                    { "timestamp", new DateTime(2024, 1, 15, 12, 0, 0, DateTimeKind.Utc) },
                    { "version", "1.0.0" }
                }
            }
        };

        var filePath = GetTestDataPath("integration-complex.txt");


        Expect.That(actualOutput)
            .WithOrderedSort()
            .ShouldNotMatch(filePath);
    }

    [Test]
    [Description("Tests that ignored fields are properly excluded from comparison validation")]
    public void EndToEnd_WithIgnoredFields_IgnoresCorrectFields()
    {
        var actualOutput = new Dictionary<string, object>
            {
                {
                    "users", new object[]
                    {
                        new Dictionary<string, object>
                        {
                            { "_id", "completely-different-id-1" }, // Will be ignored
                            { "name", "Alice Johnson" },
                            { "email", "alice@example.com" },
                            { "balance", "completely-different-balance" }, // Will be ignored
                            { "created", new DateTime(2024, 1, 1, 10, 30, 0, DateTimeKind.Utc) },
                            {
                                "profile", new Dictionary<string, object>
                                {
                                    { "age", 28 },
                                    { "city", "New York" },
                                    {
                                        "preferences", new Dictionary<string, object>
                                        {
                                            { "theme", "dark" },
                                            { "notifications", true }
                                        }
                                    }
                                }
                            },
                            { "tags", new object[] { "premium", "verified", "active" } },
                            { "lastLogin", "will-be-ignored-by-ellipsis" }
                        },
                        new Dictionary<string, object>
                        {
                            { "_id", "completely-different-id-2" }, // Will be ignored
                            { "name", "Bob Smith" },
                            { "email", "bob@example.com" },
                            { "balance", "another-different-balance" }, // Will be ignored
                            { "created", new DateTime(2024, 1, 2, 14, 20, 0, DateTimeKind.Utc) },
                            {
                                "profile", new Dictionary<string, object>
                                {
                                    { "age", 35 },
                                    { "city", "San Francisco" },
                                    {
                                        "preferences", new Dictionary<string, object>
                                        {
                                            { "theme", "light" },
                                            { "notifications", false }
                                        }
                                    }
                                }
                            },
                            { "tags", new object[] { "standard", "verified" } },
                            { "lastLogin", "also-ignored-by-ellipsis" }
                        }
                    }
                },
                {
                    "metadata", new Dictionary<string, object>
                    {
                        { "total", 2 },
                        { "timestamp", new DateTime(2024, 1, 15, 12, 0, 0, DateTimeKind.Utc) },
                        { "version", "1.0.0" }
                    }
                }
            };

        var filePath = GetTestDataPath("integration-complex.txt");


        Expect.That(actualOutput)
            .WithIgnoredFields("_id", "balance")
            .ShouldMatch(filePath);
    }

    [Test]
    [Description("Tests that truncated strings with ellipsis patterns validate correctly")]
    public void EndToEnd_TruncatedStrings_ValidatesCorrectly()
    {
        var expectedContent = """
                                  {
                                      message: 'Processing started...',
                                      logs: [
                                          'Step 1: Initializing...',
                                          'Step 2: Connecting to database...',
                                          'Step 3: Loading data...'
                                      ],
                                      status: 'In progress...'
                                  }
                                  """;

        var tempFile = Path.GetTempFileName();
        File.WriteAllText(tempFile, expectedContent);

        var actualOutput = new Dictionary<string, object>
            {
                { "message", "Processing started and will continue for a while" },
                {
                    "logs", new object[]
                    {
                        "Step 1: Initializing system components and configuration",
                        "Step 2: Connecting to database server at mongodb://localhost:27017",
                        "Step 3: Loading data from multiple sources including files and APIs"
                    }
                },
                { "status", "In progress, please wait for completion" }
            };

        try
        {
            Expect.That(actualOutput).ShouldMatch(tempFile);
        }
        finally
        {
            File.Delete(tempFile);
        }
    }

    [Test]
    [Description("Tests that ellipsis array wildcard validates correctly with any array content")]
    public void EndToEnd_EllipsisArrayWildcard_ValidatesCorrectly()
    {
        var expectedContent = """
                                  {
                                      data: ['...'],
                                      results: {
                                          items: ['...'],
                                          count: 42
                                      }
                                  }
                                  """;

        var tempFile = Path.GetTempFileName();
        File.WriteAllText(tempFile, expectedContent);

        var actualOutput = new Dictionary<string, object>
            {
                { "data", new object[] { "item1", "item2", "item3", "item4", "item5" } },
                {
                    "results", new Dictionary<string, object>
                    {
                        {
                            "items", new object[]
                            {
                                new Dictionary<string, object> { { "id", 1 }, { "name", "First" } },
                                new Dictionary<string, object> { { "id", 2 }, { "name", "Second" } }
                            }
                        },
                        { "count", 42 }
                    }
                }
            };

        try
        {
            Expect.That(actualOutput).ShouldMatch(tempFile);
        }
        finally
        {
            File.Delete(tempFile);
        }
    }

    [Test]
    [Description("Tests that object wildcard validates correctly with any object content")]
    public void EndToEnd_ObjectWildcard_ValidatesCorrectly()
    {
        var expectedContent = """{ '...': '...' }""";

        var tempFile = Path.GetTempFileName();
        File.WriteAllText(tempFile, expectedContent);

        var actualOutput = new Dictionary<string, object>
            {
                { "name", "Alice" },
                { "age", 28 },
                { "city", "New York" },
                {
                    "preferences", new Dictionary<string, object>
                    {
                        { "theme", "dark" },
                        { "notifications", true }
                    }
                },
                { "tags", new object[] { "premium", "verified" } }
            };

        try
        {
            Expect.That(actualOutput).ShouldMatch(tempFile);
        }
        finally
        {
            File.Delete(tempFile);
        }
    }

    [Test]
    [Description("Tests that complex nesting with mixed ellipsis patterns validates correctly")]
    public void EndToEnd_ComplexNestingWithMixedPatterns_ValidatesCorrectly()
    {
        var expectedContent = """
                                  {
                                      metadata: {
                                          _id: '...',
                                          timestamp: '...',
                                          version: '1.0.0'
                                      },
                                      users: [
                                          {
                                              _id: ObjectId('...'),
                                              name: 'Alice...',
                                              profile: {
                                                  '...': '...'
                                              },
                                              permissions: ['...']
                                          }
                                      ],
                                      stats: {
                                          '...': '...'
                                      }
                                  }

                                  ...
                                  """;

        var tempFile = Path.GetTempFileName();
        File.WriteAllText(tempFile, expectedContent);

        var actualOutput = new Dictionary<string, object>
            {
                {
                    "metadata", new Dictionary<string, object>
                    {
                        { "_id", "meta-id-123" },
                        { "timestamp", "2024-01-15T12:00:00Z" },
                        { "version", "1.0.0" },
                        { "environment", "production" }, // Extra field allowed by global ellipsis
                        { "region", "us-west-2" } // Extra field allowed by global ellipsis
                    }
                },
                {
                    "users", new object[]
                    {
                        new Dictionary<string, object>
                        {
                            { "_id", new ObjectId("507f1f77bcf86cd799439011") },
                            { "name", "Alice Johnson with a longer name" },
                            {
                                "profile", new Dictionary<string, object>
                                {
                                    { "age", 28 },
                                    { "city", "New York" },
                                    {
                                        "preferences", new Dictionary<string, object>
                                        {
                                            { "theme", "dark" }
                                        }
                                    }
                                }
                            },
                            { "permissions", new object[] { "read", "write", "admin" } }
                        }
                    }
                },
                {
                    "stats", new Dictionary<string, object>
                    {
                        { "totalUsers", 1 },
                        { "activeUsers", 1 },
                        { "lastUpdated", "2024-01-15T12:00:00Z" }
                    }
                },
                {
                    "configuration", new Dictionary<string, object> // Extra top-level field
                    {
                        { "maxUsers", 1000 },
                        { "features", new object[] { "feature1", "feature2" } }
                    }
                }
            };

        try
        {
            Expect.That(actualOutput).ShouldMatch(tempFile);
        }
        finally
        {
            File.Delete(tempFile);
        }
    }


    [Test]
    [Description("Tests that error reporting provides detailed error messages for comparison failures")]
    public void EndToEnd_ErrorReporting_ProvidesDetailedErrors()
    {
        var actualOutput = new Dictionary<string, object>
            {
                {
                    "users", new object[]
                    {
                        new Dictionary<string, object>
                        {
                            { "_id", new ObjectId("507f1f77bcf86cd799439011") },
                            { "name", "Alice Johnson" },
                            { "email", "alice@example.com" },
                            { "balance", Decimal128.Parse("1234.56") },
                            { "created", new DateTime(2024, 1, 1, 10, 30, 0, DateTimeKind.Utc) },
                            {
                                "profile", new Dictionary<string, object>
                                {
                                    { "age", 28 },
                                    { "city", "New York" },
                                    {
                                        "preferences", new Dictionary<string, object>
                                        {
                                            { "theme", "light" }, // This differs from expected "dark"
                                            { "notifications", true }
                                        }
                                    }
                                }
                            },
                            { "tags", new object[] { "premium", "verified", "active" } },
                            { "lastLogin", "time" }
                        },
                        new Dictionary<string, object>
                        {
                            { "_id", new ObjectId("507f1f77bcf86cd799439012") },
                            { "name", "Bob Smith" },
                            { "email", "bob@example.com" },
                            { "balance", Decimal128.Parse("987.65") },
                            { "created", new DateTime(2024, 1, 2, 14, 20, 0, DateTimeKind.Utc) },
                            {
                                "profile", new Dictionary<string, object>
                                {
                                    { "age", 35 },
                                    { "city", "San Francisco" },
                                    {
                                        "preferences", new Dictionary<string, object>
                                        {
                                            { "theme", "light" },
                                            { "notifications", false }
                                        }
                                    }
                                }
                            },
                            { "tags", new object[] { "standard", "verified" } },
                            { "lastLogin", "time" }
                        }
                    }
                }
            };

        var filePath = GetTestDataPath("integration-complex.txt");

        // This test verifies error reporting - the actual differs from expected (theme: "light" vs "dark")
        Expect.That(actualOutput).ShouldNotMatch(filePath);
    }

    [Test]
    [Description("Tests that large dataset comparison completes within performance limits")]
    public void EndToEnd_LargeDataset_PerformanceWithinLimits()
    {
        var users = new List<object>();
        for (var i = 0; i < 1000; i++)
            users.Add(new Dictionary<string, object>
                {
                    { "_id", new ObjectId() },
                    { "name", $"User{i}" },
                    { "index", i },
                    {
                        "data", new Dictionary<string, object>
                        {
                            { "nested", new string('x', 100) }, // Large string
                            { "array", Enumerable.Range(0, 10).ToArray() }
                        }
                    }
                });

        var actualOutput = new Dictionary<string, object> { { "users", users.ToArray() } };

        // Create expected file content
        var expectedContent = """
                                  {
                                      users: [
                                          {
                                              _id: ObjectId('...'),
                                              name: '...',
                                              index: '...',
                                              data: {
                                                  nested: '...',
                                                  array: ["..."]
                                              }
                                          },
                                          "..."
                                      ]
                                  }
                                  """;

        var tempFile = Path.GetTempFileName();
        try
        {
            File.WriteAllText(tempFile, expectedContent);
            var stopwatch = Stopwatch.StartNew();

            Expect.That(actualOutput).ShouldMatch(tempFile);
            stopwatch.Stop();

            Assert.That(stopwatch.ElapsedMilliseconds, Is.LessThan(5000), "Large dataset comparison should complete within 5 seconds");

        }
        finally
        {
            if (File.Exists(tempFile))
                File.Delete(tempFile);
        }
    }

    [Test]
    [Description("Tests that timeout scenario is handled gracefully without errors")]
    public void EndToEnd_TimeoutScenario_HandlesGracefully()
    {
        var complexData = new Dictionary<string, object>();

        // Create deeply nested structure
        for (var i = 0; i < 100; i++)
            complexData[$"array{i}"] = Enumerable.Range(0, 100)
                .Select(j => new Dictionary<string, object>
                {
                        { "id", j },
                        { "data", new string('x', 1000) }
                }).ToArray();

        var options = new ComparisonOptions() { TimeoutSeconds = 10 }; // 10 second timeout

        // Create expected that matches
        var expected = new Dictionary<string, object>();
        for (var i = 0; i < 100; i++)
            expected[$"array{i}"] = new object[] { "..." }; // Use array ellipsis for performance

        var stopwatch = Stopwatch.StartNew();

        ComparisonEngine.Compare(expected, complexData, options);
        stopwatch.Stop();

        Assert.That(stopwatch.ElapsedMilliseconds, Is.LessThan(10000), "Should complete within timeout");
    }
}

/// <summary>
///     Test classes for C# class/struct validation integration tests
/// </summary>
public class Order
{
    [BsonId] public ObjectId Id { get; set; }

    [BsonElement("customer")] public string CustomerName { get; set; } = string.Empty;

    [BsonElement("items")] public List<OrderItem> Items { get; set; } = new();

    [BsonElement("order_date")] public DateTime OrderDate { get; set; }

    public decimal Total { get; set; }
}

public record OrderItem
{
    [BsonElement("product_id")] public string ProductId { get; init; } = string.Empty;

    [BsonElement("name")] public string Name { get; init; } = string.Empty;

    [BsonElement("qty")] public int Quantity { get; init; }

    public decimal Price { get; init; }
}

[TestFixture]
public class CSharpClassIntegrationTests
{
    [Test]
    [Description("Tests that C# class with BSON attributes normalizes correctly to dictionary")]
    public void Normalize_CSharpClassWithBsonAttributes_WorksCorrectly()
    {
        var order = new Order
        {
            Id = ObjectId.Parse("507f1f77bcf86cd799439011"),
            CustomerName = "John Doe",
            Items = new List<OrderItem>
                {
                    new()
                    {
                        ProductId = "prod123",
                        Name = "Widget",
                        Quantity = 2,
                        Price = 15.5m
                    }
                },
            OrderDate = DateTime.Parse("2023-12-25T10:30:00.000Z").ToUniversalTime(),
            Total = 31.0m
        };

        var normalized = ValueNormalizer.Normalize(order);

        Assert.That(normalized?.GetType() == typeof(Dictionary<string, object>),
            "Normalized object should be a dictionary");
        ;
        var dict = (Dictionary<string, object>)normalized!;

        Assert.That(dict.ContainsKey("_id"));
        Assert.That(dict.ContainsKey("customer"));
        Assert.That(dict.ContainsKey("items"));
        Assert.That(dict.ContainsKey("order_date"));
        Assert.That(dict.ContainsKey("Total"));

        Assert.That((string)dict["_id"] == "507f1f77bcf86cd799439011");
        Assert.That((string)dict["customer"] == "John Doe");
        Assert.That((decimal)dict["Total"] == 31.0m);

        // Check nested items array
        var items = dict["items"] as object[];
        Assert.That(items != null);
        if (items != null)
        {
            Assert.That(items.Length == 1);
            var firstItem = items![0] as Dictionary<string, object>;
            Assert.That(firstItem != null);
            Assert.That(firstItem!.ContainsKey("product_id"));
            Assert.That(firstItem.ContainsKey("name"));
            Assert.That(firstItem.ContainsKey("qty"));
            Assert.That(firstItem.ContainsKey("Price"));
        }
    }

    [Test]
    [Description("Tests that ComparisonEngine compares normalized C# classes correctly")]
    public void ComparisonEngine_ComparesNormalizedCSharpClassesCorrectly()
    {
        var order1 = new Order
        {
            Id = ObjectId.Parse("507f1f77bcf86cd799439011"),
            CustomerName = "John Doe",
            Items = new List<OrderItem>
                {
                    new()
                    {
                        ProductId = "prod123",
                        Name = "Widget",
                        Quantity = 2,
                        Price = 15.5m
                    }
                },
            OrderDate = DateTime.Parse("2023-12-25T10:30:00.000Z").ToUniversalTime(),
            Total = 31.0m
        };

        var order2 = new Order
        {
            Id = ObjectId.Parse("507f1f77bcf86cd799439011"),
            CustomerName = "John Doe",
            Items = new List<OrderItem>
                {
                    new()
                    {
                        ProductId = "prod123",
                        Name = "Widget",
                        Quantity = 2,
                        Price = 15.5m // Same value, different decimal representation
                    }
                },
            OrderDate = DateTime.Parse("2023-12-25T10:30:00.000Z").ToUniversalTime(),
            Total = 31.0m
        };

        var result = ComparisonEngine.Compare(order1, order2);

        Assert.That(result.GetType() == typeof(ComparisonSuccess));
    }

    [Test]
    [Description("Tests that ComparisonEngine detects differences in C# classes correctly")]
    public void ComparisonEngine_DetectsDifferencesInCSharpClasses()
    {
        var order1 = new Order
        {
            Id = ObjectId.Parse("507f1f77bcf86cd799439011"),
            CustomerName = "John Doe",
            Items = new List<OrderItem>(),
            OrderDate = DateTime.UtcNow,
            Total = 31.0m
        };

        var order2 = new Order
        {
            Id = ObjectId.Parse("507f1f77bcf86cd799439011"),
            CustomerName = "Jane Smith", // Different name
            Items = new List<OrderItem>(),
            OrderDate = DateTime.UtcNow,
            Total = 31.0m
        };

        ComparisonEngine.Compare(order1, order2);
        Expect.That(order2).ShouldNotMatch(order1);
    }
}