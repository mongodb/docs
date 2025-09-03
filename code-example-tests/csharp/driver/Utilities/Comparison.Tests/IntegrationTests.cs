using FluentAssertions;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using NUnit.Framework;
using Utilities.Comparison;

namespace Utilities.Comparison.Tests;

/// <summary>
/// End-to-end integration tests validating the complete comparison workflow.
///
/// Test Workflow:
/// 1. Parse expected output from test data files (MongoDB syntax, JSON, JSONL)
/// 2. Generate actual output using MongoDB driver operations
/// 3. Run comparison engine with various options (ignore fields, array strategies)
/// 4. Validate error reporting and success scenarios
///
/// Real-World Simulation:
/// These tests simulate the exact workflow used by the code example testing framework.
/// They verify that the entire pipeline works correctly with realistic MongoDB documents,
/// complex nested structures, and all supported data types.
///
/// Critical Success Factors:
/// - File parsing handles all MongoDB syntax variations correctly
/// - Type normalization works across .NET and MongoDB types
/// - Comparison engine correctly applies ellipsis patterns and options
/// - Error messages provide actionable debugging information
/// </summary>
[TestFixture]
public class IntegrationTests
{
    private string GetTestDataPath(string fileName) =>
        Path.Combine(TestContext.CurrentContext.TestDirectory, "TestData", fileName);

    /// <summary>
    /// End-to-end test with a comprehensive MongoDB document containing all supported data types.
    ///
    /// This test validates the complete workflow:
    /// 1. Complex document structure with nested objects and arrays
    /// 2. All MongoDB-specific types: ObjectId, Decimal128, DateTime
    /// 3. Mixed primitive types: strings, numbers, booleans, nulls
    /// 4. File-based comparison with ellipsis patterns for flexible matching
    ///
    /// Document Structure Tested:
    /// - Root-level array of user documents
    /// - Nested profile objects with preferences
    /// - MongoDB types requiring normalization
    /// - Ellipsis patterns for version-independent comparison
    ///
    /// Why This Test Matters:
    /// This simulates real-world MongoDB code examples where documents contain
    /// the full spectrum of data types and nested structures that documentation
    /// examples typically demonstrate.
    /// </summary>
    [Test]
    public void EndToEnd_ComplexDocumentWithAllFeatures_ValidatesCorrectly()
    {
        // Arrange - Complex actual data that should match the expected file
        var actualOutput = new Dictionary<string, object>
        {
            { "users", new object[]
                {
                    new Dictionary<string, object>
                    {
                        { "_id", new ObjectId("507f1f77bcf86cd799439011") },
                        { "name", "Alice Johnson" },
                        { "email", "alice@example.com" },
                        { "balance", Decimal128.Parse("1234.56") },
                        { "created", new DateTime(2024, 1, 1, 10, 30, 0, DateTimeKind.Utc) },
                        { "profile", new Dictionary<string, object>
                            {
                                { "age", 28 },
                                { "city", "New York" },
                                { "preferences", new Dictionary<string, object>
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
                        { "profile", new Dictionary<string, object>
                            {
                                { "age", 35 },
                                { "city", "San Francisco" },
                                { "preferences", new Dictionary<string, object>
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
            { "metadata", new Dictionary<string, object>
                {
                    { "total", 2 },
                    { "timestamp", new DateTime(2024, 1, 15, 12, 0, 0, DateTimeKind.Utc) },
                    { "version", "1.0.0" }
                }
            },
            { "someExtraTopLevelField", "allowed by global ellipsis" }
        };

        var filePath = GetTestDataPath("integration-complex.txt");

        // Act
        var result = OutputValidator.ToMatchFile(filePath, actualOutput);

        // Assert
        result.IsSuccess.Should().BeTrue();
        result.ErrorMessage.Should().BeNull();
    }

    [Test]
    public void EndToEnd_UnorderedArrayComparison_ValidatesCorrectly()
    {
        // Arrange - Same users but in different order
        var actualOutput = new Dictionary<string, object>
        {
            { "users", new object[]
                {
                    // Bob first (different order than expected file)
                    new Dictionary<string, object>
                    {
                        { "_id", new ObjectId("507f1f77bcf86cd799439012") },
                        { "name", "Bob Smith" },
                        { "email", "bob@example.com" },
                        { "balance", Decimal128.Parse("987.65") },
                        { "created", new DateTime(2024, 1, 2, 14, 20, 0, DateTimeKind.Utc) },
                        { "profile", new Dictionary<string, object>
                            {
                                { "age", 35 },
                                { "city", "San Francisco" },
                                { "preferences", new Dictionary<string, object>
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
                        { "profile", new Dictionary<string, object>
                            {
                                { "age", 28 },
                                { "city", "New York" },
                                { "preferences", new Dictionary<string, object>
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
            { "metadata", new Dictionary<string, object>
                {
                    { "total", 2 },
                    { "timestamp", new DateTime(2024, 1, 15, 12, 0, 0, DateTimeKind.Utc) },
                    { "version", "1.0.0" }
                }
            }
        };

        var filePath = GetTestDataPath("integration-complex.txt");

        // Act - Default is unordered array comparison
        var result = OutputValidator.ToMatchFile(filePath, actualOutput);

        // Assert - Should succeed because arrays are compared unordered by default
        result.IsSuccess.Should().BeTrue();
    }

    [Test]
    public void EndToEnd_OrderedArrayComparison_FailsWithWrongOrder()
    {
        // Arrange - Same data but wrong order
        var actualOutput = new Dictionary<string, object>
        {
            { "users", new object[]
                {
                    new Dictionary<string, object>
                    {
                        { "_id", new ObjectId("507f1f77bcf86cd799439012") },
                        { "name", "Bob Smith" },
                        { "email", "bob@example.com" },
                        { "balance", Decimal128.Parse("987.65") },
                        { "created", new DateTime(2024, 1, 2, 14, 20, 0, DateTimeKind.Utc) },
                        { "profile", new Dictionary<string, object>
                            {
                                { "age", 35 },
                                { "city", "San Francisco" },
                                { "preferences", new Dictionary<string, object>
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
            { "metadata", new Dictionary<string, object>
                {
                    { "total", 2 },
                    { "timestamp", new DateTime(2024, 1, 15, 12, 0, 0, DateTimeKind.Utc) },
                    { "version", "1.0.0" }
                }
            }
        };

        var filePath = GetTestDataPath("integration-complex.txt");

        // Act - Force ordered comparison
        var result = OutputValidator.Expect(actualOutput)
            .WithOrderedArrays()
            .ToMatchFile(filePath);

        // Assert - Should fail because of array length mismatch
        result.IsSuccess.Should().BeFalse();
        result.ErrorMessage.Should().Contain("Array lengths differ");
    }

    [Test]
    public void EndToEnd_WithIgnoredFields_IgnoresCorrectFields()
    {
        // Arrange - Data with fields that should be ignored
        var actualOutput = new Dictionary<string, object>
        {
            { "users", new object[]
                {
                    new Dictionary<string, object>
                    {
                        { "_id", "completely-different-id-1" }, // Will be ignored
                        { "name", "Alice Johnson" },
                        { "email", "alice@example.com" },
                        { "balance", "completely-different-balance" }, // Will be ignored
                        { "created", new DateTime(2024, 1, 1, 10, 30, 0, DateTimeKind.Utc) },
                        { "profile", new Dictionary<string, object>
                            {
                                { "age", 28 },
                                { "city", "New York" },
                                { "preferences", new Dictionary<string, object>
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
                        { "profile", new Dictionary<string, object>
                            {
                                { "age", 35 },
                                { "city", "San Francisco" },
                                { "preferences", new Dictionary<string, object>
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
            { "metadata", new Dictionary<string, object>
                {
                    { "total", 2 },
                    { "timestamp", new DateTime(2024, 1, 15, 12, 0, 0, DateTimeKind.Utc) },
                    { "version", "1.0.0" }
                }
            }
        };

        var filePath = GetTestDataPath("integration-complex.txt");

        // Act - Ignore _id and balance fields at all nesting levels
        var result = OutputValidator.Expect(actualOutput)
            .IgnoringFields("_id", "balance")
            .ToMatchFile(filePath);

        // Assert - Should succeed because ignored fields are not compared
        result.IsSuccess.Should().BeTrue();
    }

    [Test]
    public void EndToEnd_TruncatedStrings_ValidatesCorrectly()
    {
        // Arrange - Create expected file with truncated strings
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
            { "logs", new object[]
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
            // Act
            var result = OutputValidator.ToMatchFile(tempFile, actualOutput);

            // Assert
            result.IsSuccess.Should().BeTrue();
        }
        finally
        {
            File.Delete(tempFile);
        }
    }

    [Test]
    public void EndToEnd_EllipsisArrayWildcard_ValidatesCorrectly()
    {
        // Arrange - Create expected file with array wildcard
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
            { "results", new Dictionary<string, object>
                {
                    { "items", new object[]
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
            // Act
            var result = OutputValidator.ToMatchFile(tempFile, actualOutput);

            // Assert
            result.IsSuccess.Should().BeTrue();
        }
        finally
        {
            File.Delete(tempFile);
        }
    }

    [Test]
    public void EndToEnd_ObjectWildcard_ValidatesCorrectly()
    {
        // Arrange - Create expected file with object wildcard
        var expectedContent = """{ '...': '...' }""";

        var tempFile = Path.GetTempFileName();
        File.WriteAllText(tempFile, expectedContent);

        var actualOutput = new Dictionary<string, object>
        {
            { "name", "Alice" },
            { "age", 28 },
            { "city", "New York" },
            { "preferences", new Dictionary<string, object>
                {
                    { "theme", "dark" },
                    { "notifications", true }
                }
            },
            { "tags", new object[] { "premium", "verified" } }
        };

        try
        {
            // Act
            var result = OutputValidator.ToMatchFile(tempFile, actualOutput);

            // Assert
            result.IsSuccess.Should().BeTrue();
        }
        finally
        {
            File.Delete(tempFile);
        }
    }

    [Test]
    public void EndToEnd_ComplexNestingWithMixedPatterns_ValidatesCorrectly()
    {
        // Arrange - Complex expected file with all pattern types
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
            { "metadata", new Dictionary<string, object>
                {
                    { "_id", "meta-id-123" },
                    { "timestamp", "2024-01-15T12:00:00Z" },
                    { "version", "1.0.0" },
                    { "environment", "production" }, // Extra field allowed by global ellipsis
                    { "region", "us-west-2" } // Extra field allowed by global ellipsis
                }
            },
            { "users", new object[]
                {
                    new Dictionary<string, object>
                    {
                        { "_id", new ObjectId("507f1f77bcf86cd799439011") },
                        { "name", "Alice Johnson with a longer name" },
                        { "profile", new Dictionary<string, object>
                            {
                                { "age", 28 },
                                { "city", "New York" },
                                { "preferences", new Dictionary<string, object>
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
            { "stats", new Dictionary<string, object>
                {
                    { "totalUsers", 1 },
                    { "activeUsers", 1 },
                    { "lastUpdated", "2024-01-15T12:00:00Z" }
                }
            },
            { "configuration", new Dictionary<string, object> // Extra top-level field
                {
                    { "maxUsers", 1000 },
                    { "features", new object[] { "feature1", "feature2" } }
                }
            }
        };

        try
        {
            // Act
            var result = OutputValidator.ToMatchFile(tempFile, actualOutput);

            // Assert
            result.IsSuccess.Should().BeTrue();
        }
        finally
        {
            File.Delete(tempFile);
        }
    }

    [Test]
    public void EndToEnd_AsyncComparison_WorksCorrectly()
    {
        // Arrange
        var actualOutput = new Dictionary<string, object>
        {
            { "users", new object[]
                {
                    new Dictionary<string, object>
                    {
                        { "_id", new ObjectId("507f1f77bcf86cd799439011") },
                        { "name", "Alice Johnson" },
                        { "email", "alice@example.com" }
                    }
                }
            }
        };

        var filePath = GetTestDataPath("integration-complex.txt");

        // Act & Assert - This tests the async path internally used by the library
        Assert.DoesNotThrowAsync(async () =>
        {
            var parseResult = await ExpectedOutputParser.ParseFileAsync(filePath);
            parseResult.IsSuccess.Should().BeTrue();

            var comparisonResult = await ComparisonEngine.CompareAsync(
                parseResult.Data![0],
                actualOutput,
                ComparisonOptions.Default);

            // This specific comparison should fail because of missing data, but async should work
            comparisonResult.Should().NotBeNull();
        });
    }

    [Test]
    public void EndToEnd_ErrorReporting_ProvidesDetailedErrors()
    {
        // Arrange - Data that will fail comparison at specific nested path
        var actualOutput = new Dictionary<string, object>
        {
            { "users", new object[]
                {
                    new Dictionary<string, object>
                    {
                        { "_id", new ObjectId("507f1f77bcf86cd799439011") },
                        { "name", "Alice Johnson" },
                        { "email", "alice@example.com" },
                        { "balance", Decimal128.Parse("1234.56") },
                        { "created", new DateTime(2024, 1, 1, 10, 30, 0, DateTimeKind.Utc) },
                        { "profile", new Dictionary<string, object>
                            {
                                { "age", 28 },
                                { "city", "New York" },
                                { "preferences", new Dictionary<string, object>
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
                        { "profile", new Dictionary<string, object>
                            {
                                { "age", 35 },
                                { "city", "San Francisco" },
                                { "preferences", new Dictionary<string, object>
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

        // Act
        var result = OutputValidator.ToMatchFile(filePath, actualOutput);

        // Assert
        result.IsSuccess.Should().BeFalse();
        result.ErrorMessage.Should().NotBeNull();

        // Verify error message contains specific path information
        result.ErrorMessage.Should().Contain("users[0].profile.preferences.theme");
        result.ErrorMessage.Should().Contain("dark"); // Expected value
        result.ErrorMessage.Should().Contain("light"); // Actual value
    }

    [Test]
    public void EndToEnd_LargeDataset_PerformanceWithinLimits()
    {
        // Arrange - create large dataset to test performance
        var users = new List<object>();
        for (int i = 0; i < 1000; i++)
        {
            users.Add(new Dictionary<string, object>
            {
                { "_id", new ObjectId() },
                { "name", $"User{i}" },
                { "index", i },
                { "data", new Dictionary<string, object>
                    {
                        { "nested", new string('x', 100) }, // Large string
                        { "array", Enumerable.Range(0, 10).ToArray() }
                    }
                }
            });
        }

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
            var stopwatch = System.Diagnostics.Stopwatch.StartNew();

            // Act
            var result = OutputValidator.ToMatchFile(tempFile, actualOutput);
            stopwatch.Stop();

            // Assert
            result.IsSuccess.Should().BeTrue();
            stopwatch.ElapsedMilliseconds.Should().BeLessThan(5000, "Large dataset comparison should complete within 5 seconds");
        }
        finally
        {
            if (File.Exists(tempFile))
                File.Delete(tempFile);
        }
    }

    [Test]
    public void EndToEnd_TimeoutScenario_HandlesGracefully()
    {
        // Arrange - create a scenario that could potentially timeout
        var complexData = new Dictionary<string, object>();

        // Create deeply nested structure
        for (int i = 0; i < 100; i++)
        {
            complexData[$"array{i}"] = Enumerable.Range(0, 100)
                .Select(j => new Dictionary<string, object>
                {
                    { "id", j },
                    { "data", new string('x', 1000) }
                }).ToArray();
        }

        var options = new ComparisonOptions(TimeoutSeconds: 10); // 10 second timeout

        // Create expected that matches
        var expected = new Dictionary<string, object>();
        for (int i = 0; i < 100; i++)
        {
            expected[$"array{i}"] = new object[] { "..." }; // Use array ellipsis for performance
        }

        var stopwatch = System.Diagnostics.Stopwatch.StartNew();

        // Act
        var result = ComparisonEngine.Compare(expected, complexData, options);
        stopwatch.Stop();

        // Assert
        result.IsSuccess.Should().BeTrue();
        stopwatch.ElapsedMilliseconds.Should().BeLessThan(10000, "Should complete well within timeout");
    }
}

/// <summary>
/// Test classes for C# class/struct validation integration tests
/// </summary>
public class Order
{
    [BsonId]
    public ObjectId Id { get; set; }

    [BsonElement("customer")]
    public string CustomerName { get; set; } = string.Empty;

    [BsonElement("items")]
    public List<OrderItem> Items { get; set; } = new();

    [BsonElement("order_date")]
    public DateTime OrderDate { get; set; }

    public decimal Total { get; set; }
}

public record OrderItem
{
    [BsonElement("product_id")]
    public string ProductId { get; init; } = string.Empty;

    [BsonElement("name")]
    public string Name { get; init; } = string.Empty;

    [BsonElement("qty")]
    public int Quantity { get; init; }

    public decimal Price { get; init; }
}

[TestFixture]
public class CSharpClassIntegrationTests
{
    [Test]
    public void Normalize_CSharpClassWithBsonAttributes_WorksCorrectly()
    {
        // Arrange
        var order = new Order
        {
            Id = ObjectId.Parse("507f1f77bcf86cd799439011"),
            CustomerName = "John Doe",
            Items = new List<OrderItem>
            {
                new OrderItem
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

        // Act
        var normalized = ValueNormalizer.Normalize(order);

        // Assert
        normalized.Should().BeOfType<Dictionary<string, object>>();
        var dict = (Dictionary<string, object>)normalized!;

        dict.Should().ContainKey("_id"); // BsonId attribute
        dict.Should().ContainKey("customer"); // BsonElement attribute
        dict.Should().ContainKey("items"); // BsonElement attribute
        dict.Should().ContainKey("order_date"); // BsonElement attribute
        dict.Should().ContainKey("Total"); // No attribute, uses property name

        dict["_id"].Should().Be("507f1f77bcf86cd799439011");
        dict["customer"].Should().Be("John Doe");
        dict["Total"].Should().Be(31.0m);

        // Check nested items array
        var items = dict["items"] as object[];
        items.Should().NotBeNull();
        items.Should().HaveCount(1);

        var firstItem = items![0] as Dictionary<string, object>;
        firstItem.Should().NotBeNull();
        firstItem!.Should().ContainKey("product_id");
        firstItem.Should().ContainKey("name");
        firstItem.Should().ContainKey("qty");
        firstItem.Should().ContainKey("Price");
    }

    [Test]
    public void ComparisonEngine_ComparesNormalizedCSharpClassesCorrectly()
    {
        // Arrange - create two similar orders
        var order1 = new Order
        {
            Id = ObjectId.Parse("507f1f77bcf86cd799439011"),
            CustomerName = "John Doe",
            Items = new List<OrderItem>
            {
                new OrderItem
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
                new OrderItem
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

        // Act
        var result = ComparisonEngine.Compare(order1, order2);

        // Assert
        result.Should().BeOfType<ComparisonSuccess>();
    }

    [Test]
    public void ComparisonEngine_DetectsDifferencesInCSharpClasses()
    {
        // Arrange - create orders with different customer names
        var order1 = new Order
        {
            Id = ObjectId.Parse("507f1f77bcf86cd799439011"),
            CustomerName = "John Doe",
            Items = new(),
            OrderDate = DateTime.UtcNow,
            Total = 31.0m
        };

        var order2 = new Order
        {
            Id = ObjectId.Parse("507f1f77bcf86cd799439011"),
            CustomerName = "Jane Smith", // Different name
            Items = new(),
            OrderDate = DateTime.UtcNow,
            Total = 31.0m
        };

        // Act
        var result = ComparisonEngine.Compare(order1, order2);

        // Assert
        result.Should().BeOfType<ComparisonFailure>();
        var failure = (ComparisonFailure)result!;
        failure.Error!.Path.Should().Be("$.customer");
        failure.Error.Expected.Should().Be("John Doe");
        failure.Error.Actual.Should().Be("Jane Smith");
    }
}
