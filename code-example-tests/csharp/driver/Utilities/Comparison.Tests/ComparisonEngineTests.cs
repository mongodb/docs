using System.Collections.Immutable;
using FluentAssertions;
using MongoDB.Bson;
using NUnit.Framework;
using Utilities.Comparison;

namespace Utilities.Comparison.Tests;

/// <summary>
/// Comprehensive tests for ComparisonEngine covering all comparison scenarios.
/// 
/// Test Organization:
/// - Basic comparison tests (primitives, null handling)
/// - MongoDB type normalization and comparison
/// - Array comparison strategies (ordered/unordered/hybrid)  
/// - Object comparison with ellipsis patterns
/// - Field ignoring capabilities
/// - Error handling and edge cases
/// - Async operations and timeout handling
/// 
/// Why This Matters:
/// ComparisonEngine is the core of the validation system. These tests ensure that
/// all MongoDB document comparison scenarios work correctly, from simple primitives
/// to complex nested structures with special MongoDB types.
/// 
/// Key Test Patterns:
/// - "ReturnsSuccess/ReturnsFailure" - Clear expected outcomes
/// - Path validation in error messages - Ensures precise error location
/// - Mixed type scenarios - Real-world MongoDB document structures
/// </summary>
[TestFixture]
public class ComparisonEngineTests
{
    [Test]
    public void Compare_IdenticalPrimitives_ReturnsSuccess()
    {
        // Act & Assert
        ComparisonEngine.Compare("test", "test").IsSuccess.Should().BeTrue();
        ComparisonEngine.Compare(123, 123).IsSuccess.Should().BeTrue();
        ComparisonEngine.Compare(true, true).IsSuccess.Should().BeTrue();
        ComparisonEngine.Compare(null, null).IsSuccess.Should().BeTrue();
    }

    [Test]
    public void Compare_DifferentPrimitives_ReturnsFailure()
    {
        // Act
        var result = ComparisonEngine.Compare("test", "different");

        // Assert
        result.IsSuccess.Should().BeFalse();
        result.Error.Should().NotBeNull();
        result.Error!.Message.Should().Contain("Primitive values do not match");
        result.Error.Expected.Should().Be("test");
        result.Error.Actual.Should().Be("different");
        result.Error.Path.Should().Be("$");
    }

    [Test]
    public void Compare_NullVsNonNull_ReturnsFailure()
    {
        // Act
        var result = ComparisonEngine.Compare(null, "not null");

        // Assert
        result.IsSuccess.Should().BeFalse();
        result.Error!.Message.Should().Contain("One value is null while the other is not");
    }

    [Test]
    public void Compare_ExactEllipsis_ReturnsSuccess()
    {
        // Act & Assert
        ComparisonEngine.Compare("...", "anything").IsSuccess.Should().BeTrue();
        ComparisonEngine.Compare("...", null).IsSuccess.Should().BeTrue();
        ComparisonEngine.Compare("...", 123).IsSuccess.Should().BeTrue();
        ComparisonEngine.Compare("...", new { prop = "value" }).IsSuccess.Should().BeTrue();
    }

    [Test]
    public void Compare_TruncatedString_ReturnsSuccess()
    {
        // Act & Assert
        ComparisonEngine.Compare("Hello...", "Hello World").IsSuccess.Should().BeTrue();
        ComparisonEngine.Compare("Error: Connection...", "Error: Connection failed after 3 retries").IsSuccess.Should().BeTrue();
    }

    [Test]
    public void Compare_TruncatedStringMismatch_ReturnsFailure()
    {
        // Act
        var result = ComparisonEngine.Compare("Hello...", "Hi World");

        // Assert
        result.IsSuccess.Should().BeFalse();
    }

    [TestFixture]
    public class MongoTypeComparisonTests
    {
        [Test]
        public void Compare_ObjectIdToString_ReturnsSuccess()
        {
            // Arrange
            var objectId = new ObjectId("507f1f77bcf86cd799439011");
            var stringId = "507f1f77bcf86cd799439011";

            // Act
            var result = ComparisonEngine.Compare(objectId, stringId);

            // Assert
            result.IsSuccess.Should().BeTrue();
        }

        [Test]
        public void Compare_Decimal128ToString_ReturnsSuccess()
        {
            // Arrange
            var decimal128 = Decimal128.Parse("123.45");
            var stringDecimal = "123.45";

            // Act
            var result = ComparisonEngine.Compare(decimal128, stringDecimal);

            // Assert
            result.IsSuccess.Should().BeTrue();
        }

        [Test]
        public void Compare_DateTimeToString_ReturnsSuccess()
        {
            // Arrange
            var dateTime = new DateTime(2024, 1, 1, 12, 0, 0, DateTimeKind.Utc);
            var isoString = "2024-01-01T12:00:00.000Z";

            // Act
            var result = ComparisonEngine.Compare(dateTime, isoString);

            // Assert
            result.IsSuccess.Should().BeTrue();
        }

        [Test]
        public void Compare_BsonTypes_ReturnsSuccess()
        {
            // Arrange
            var bsonObjectId = new BsonObjectId(new ObjectId("507f1f77bcf86cd799439011"));
            var stringId = "507f1f77bcf86cd799439011";

            // Act
            var result = ComparisonEngine.Compare(bsonObjectId, stringId);

            // Assert
            result.IsSuccess.Should().BeTrue();
        }
    }

    [TestFixture]
    public class ArrayComparisonTests
    {
        [Test]
        public void Compare_IdenticalArraysOrdered_ReturnsSuccess()
        {
            // Arrange
            var array1 = new object[] { "a", "b", "c" };
            var array2 = new object[] { "a", "b", "c" };
            var options = ComparisonOptions.Ordered;

            // Act
            var result = ComparisonEngine.Compare(array1, array2, options);

            // Assert
            result.IsSuccess.Should().BeTrue();
        }

        [Test]
        public void Compare_DifferentOrderArraysOrdered_ReturnsFailure()
        {
            // Arrange
            var array1 = new object[] { "a", "b", "c" };
            var array2 = new object[] { "a", "c", "b" };
            var options = ComparisonOptions.Ordered;

            // Act
            var result = ComparisonEngine.Compare(array1, array2, options);

            // Assert
            result.IsSuccess.Should().BeFalse();
            result.Error!.Path.Should().Be("$[1]");
        }

        [Test]
        public void Compare_DifferentOrderArraysUnordered_ReturnsSuccess()
        {
            // Arrange
            var array1 = new object[] { "a", "b", "c" };
            var array2 = new object[] { "c", "a", "b" };
            var options = new ComparisonOptions(ArrayMode: ArrayComparisonMode.Unordered);

            // Act
            var result = ComparisonEngine.Compare(array1, array2, options);

            // Assert
            result.IsSuccess.Should().BeTrue();
        }

        [Test]
        public void Compare_ArraysWithDifferentLengths_ReturnsFailure()
        {
            // Arrange
            var array1 = new object[] { "a", "b" };
            var array2 = new object[] { "a", "b", "c" };

            // Act
            var result = ComparisonEngine.Compare(array1, array2);

            // Assert
            result.IsSuccess.Should().BeFalse();
            result.Error!.Message.Should().Contain("Array lengths differ");
            result.Error.Expected.Should().Be("Array[2]");
            result.Error.Actual.Should().Be("Array[3]");
        }

        [Test]
        public void Compare_ComplexObjectArraysUnordered_ReturnsSuccess()
        {
            // Arrange
            var array1 = new object[]
            {
                new Dictionary<string, object> { { "id", 1 }, { "name", "Alice" } },
                new Dictionary<string, object> { { "id", 2 }, { "name", "Bob" } }
            };
            var array2 = new object[]
            {
                new Dictionary<string, object> { { "id", 2 }, { "name", "Bob" } },
                new Dictionary<string, object> { { "id", 1 }, { "name", "Alice" } }
            };

            // Act (default is unordered)
            var result = ComparisonEngine.Compare(array1, array2);

            // Assert
            result.IsSuccess.Should().BeTrue();
        }

        [Test]
        public void Compare_UnorderedArrayNoMatch_ReturnsFailure()
        {
            // Arrange
            var array1 = new object[] { "a", "b", "c" };
            var array2 = new object[] { "a", "b", "d" }; // 'c' vs 'd'

            // Act
            var result = ComparisonEngine.Compare(array1, array2);

            // Assert
            result.IsSuccess.Should().BeFalse();
            result.Error!.Message.Should().Contain("Primitive values do not match");
            result.Error!.Expected.Should().Be("c");
            result.Error!.Actual.Should().Be("d");
        }

        [Test]
        public void Compare_ArrayWildcard_ReturnsSuccess()
        {
            // Arrange
            var expectedArray = new object[] { "..." };
            var actualArray = new object[] { "any", "content", "here" };

            // Act
            var result = ComparisonEngine.Compare(expectedArray, actualArray);

            // Assert
            result.IsSuccess.Should().BeTrue();
        }
    }

    [TestFixture]
    public class ObjectComparisonTests
    {
        [Test]
        public void Compare_IdenticalObjects_ReturnsSuccess()
        {
            // Arrange
            var obj1 = new Dictionary<string, object>
            {
                { "name", "Alice" },
                { "age", 25 },
                { "active", true }
            };
            var obj2 = new Dictionary<string, object>
            {
                { "name", "Alice" },
                { "age", 25 },
                { "active", true }
            };

            // Act
            var result = ComparisonEngine.Compare(obj1, obj2);

            // Assert
            result.IsSuccess.Should().BeTrue();
        }

        [Test]
        public void Compare_DifferentPropertyValues_ReturnsFailure()
        {
            // Arrange
            var obj1 = new Dictionary<string, object> { { "name", "Alice" } };
            var obj2 = new Dictionary<string, object> { { "name", "Bob" } };

            // Act
            var result = ComparisonEngine.Compare(obj1, obj2);

            // Assert
            result.IsSuccess.Should().BeFalse();
            result.Error!.Path.Should().Be("$.name");
            result.Error.Expected.Should().Be("Alice");
            result.Error.Actual.Should().Be("Bob");
        }

        [Test]
        public void Compare_MissingProperty_ReturnsFailure()
        {
            // Arrange
            var obj1 = new Dictionary<string, object> { { "name", "Alice" }, { "age", 25 } };
            var obj2 = new Dictionary<string, object> { { "name", "Alice" } }; // missing age

            // Act
            var result = ComparisonEngine.Compare(obj1, obj2);

            // Assert
            result.IsSuccess.Should().BeFalse();
            result.Error!.Path.Should().Be("$.age");
            result.Error.Message.Should().Contain("Expected property is missing from actual object");
        }

        [Test]
        public void Compare_ExtraPropertyWithoutEllipsis_ReturnsFailure()
        {
            // Arrange
            var obj1 = new Dictionary<string, object> { { "name", "Alice" } };
            var obj2 = new Dictionary<string, object> { { "name", "Alice" }, { "age", 25 } }; // extra property

            // Act
            var result = ComparisonEngine.Compare(obj1, obj2);

            // Assert
            result.IsSuccess.Should().BeFalse();
            result.Error!.Message.Should().Contain("Actual object contains unexpected properties");
            result.Error.Actual.Should().Contain("age");
        }

        [Test]
        public void Compare_ExtraPropertyWithGlobalEllipsis_ReturnsSuccess()
        {
            // Arrange
            var obj1 = new Dictionary<string, object>
            {
                { "name", "Alice" },
                { "...", "..." } // Global ellipsis marker
            };
            var obj2 = new Dictionary<string, object>
            {
                { "name", "Alice" },
                { "age", 25 },
                { "city", "New York" }
            };

            // Act
            var result = ComparisonEngine.Compare(obj1, obj2);

            // Assert
            result.IsSuccess.Should().BeTrue();
        }

        [Test]
        public void Compare_PropertyLevelEllipsis_ReturnsSuccess()
        {
            // Arrange
            var obj1 = new Dictionary<string, object>
            {
                { "name", "Alice" },
                { "_id", "..." }, // Property-level ellipsis
                { "timestamp", "..." }
            };
            var obj2 = new Dictionary<string, object>
            {
                { "name", "Alice" },
                { "_id", "507f1f77bcf86cd799439011" },
                { "timestamp", "2024-01-01T12:00:00.000Z" }
            };

            // Act
            var result = ComparisonEngine.Compare(obj1, obj2);

            // Assert
            result.IsSuccess.Should().BeTrue();
        }

        [Test]
        public void Compare_ObjectWildcard_ReturnsSuccess()
        {
            // Arrange
            var obj1 = new Dictionary<string, object> { { "...", "..." } };
            var obj2 = new Dictionary<string, object>
            {
                { "name", "Alice" },
                { "age", 25 },
                { "active", true }
            };

            // Act
            var result = ComparisonEngine.Compare(obj1, obj2);

            // Assert
            result.IsSuccess.Should().BeTrue();
        }

        [Test]
        public void Compare_NestedObjects_ReturnsSuccess()
        {
            // Arrange
            var obj1 = new Dictionary<string, object>
            {
                { "user", new Dictionary<string, object>
                    {
                        { "profile", new Dictionary<string, object>
                            {
                                { "name", "Alice" },
                                { "settings", new Dictionary<string, object>
                                    {
                                        { "theme", "dark" }
                                    }
                                }
                            }
                        }
                    }
                }
            };
            var obj2 = new Dictionary<string, object>
            {
                { "user", new Dictionary<string, object>
                    {
                        { "profile", new Dictionary<string, object>
                            {
                                { "name", "Alice" },
                                { "settings", new Dictionary<string, object>
                                    {
                                        { "theme", "dark" }
                                    }
                                }
                            }
                        }
                    }
                }
            };

            // Act
            var result = ComparisonEngine.Compare(obj1, obj2);

            // Assert
            result.IsSuccess.Should().BeTrue();
        }

        [Test]
        public void Compare_NestedObjectMismatch_ReturnsFailureWithCorrectPath()
        {
            // Arrange
            var obj1 = new Dictionary<string, object>
            {
                { "user", new Dictionary<string, object>
                    {
                        { "profile", new Dictionary<string, object>
                            {
                                { "name", "Alice" }
                            }
                        }
                    }
                }
            };
            var obj2 = new Dictionary<string, object>
            {
                { "user", new Dictionary<string, object>
                    {
                        { "profile", new Dictionary<string, object>
                            {
                                { "name", "Bob" } // Different name
                            }
                        }
                    }
                }
            };

            // Act
            var result = ComparisonEngine.Compare(obj1, obj2);

            // Assert
            result.IsSuccess.Should().BeFalse();
            result.Error!.Path.Should().Be("$.user.profile.name");
        }
    }

    [TestFixture]
    public class IgnoreFieldsTests
    {
        [Test]
        public void Compare_WithIgnoredFields_IgnoresSpecifiedFields()
        {
            // Arrange
            var obj1 = new Dictionary<string, object>
            {
                { "name", "Alice" },
                { "_id", "507f1f77bcf86cd799439011" },
                { "timestamp", "2024-01-01T12:00:00.000Z" }
            };
            var obj2 = new Dictionary<string, object>
            {
                { "name", "Alice" },
                { "_id", "different-id" }, // Different but ignored
                { "timestamp", "different-time" } // Different but ignored
            };
            var options = new ComparisonOptions(
                IgnoredFields: ImmutableHashSet.Create("_id", "timestamp"));

            // Act
            var result = ComparisonEngine.Compare(obj1, obj2, options);

            // Assert
            result.IsSuccess.Should().BeTrue();
        }

        [Test]
        public void Compare_WithIgnoredFields_StillValidatesNonIgnoredFields()
        {
            // Arrange
            var obj1 = new Dictionary<string, object>
            {
                { "name", "Alice" },
                { "_id", "507f1f77bcf86cd799439011" }
            };
            var obj2 = new Dictionary<string, object>
            {
                { "name", "Bob" }, // This should still cause failure
                { "_id", "different-id" } // This is ignored
            };
            var options = new ComparisonOptions(IgnoredFields: ImmutableHashSet.Create("_id"));

            // Act
            var result = ComparisonEngine.Compare(obj1, obj2, options);

            // Assert
            result.IsSuccess.Should().BeFalse();
            result.Error!.Path.Should().Be("$.name");
        }

        [Test]
        public void Compare_IgnoredFieldsInNestedObjects_IgnoresCorrectly()
        {
            // Arrange
            var obj1 = new Dictionary<string, object>
            {
                { "users", new object[]
                    {
                        new Dictionary<string, object>
                        {
                            { "name", "Alice" },
                            { "_id", "id1" },
                            { "createdAt", "time1" }
                        },
                        new Dictionary<string, object>
                        {
                            { "name", "Bob" },
                            { "_id", "id2" },
                            { "createdAt", "time2" }
                        }
                    }
                }
            };
            var obj2 = new Dictionary<string, object>
            {
                { "users", new object[]
                    {
                        new Dictionary<string, object>
                        {
                            { "name", "Bob" }, // Different order
                            { "_id", "different-id2" }, // Ignored
                            { "createdAt", "different-time2" } // Ignored
                        },
                        new Dictionary<string, object>
                        {
                            { "name", "Alice" }, // Different order
                            { "_id", "different-id1" }, // Ignored
                            { "createdAt", "different-time1" } // Ignored
                        }
                    }
                }
            };
            var options = new ComparisonOptions(
                ArrayMode: ArrayComparisonMode.Unordered,
                IgnoredFields: ImmutableHashSet.Create("_id", "createdAt"));

            // Act
            var result = ComparisonEngine.Compare(obj1, obj2, options);

            // Assert
            result.IsSuccess.Should().BeTrue();
        }
    }

    [TestFixture]
    public class TypeMismatchTests
    {
        [Test]
        public void Compare_ArrayVsObject_ReturnsFailure()
        {
            // Arrange
            var array = new object[] { "item1", "item2" };
            var obj = new Dictionary<string, object> { { "key", "value" } };

            // Act
            var result = ComparisonEngine.Compare(array, obj);

            // Assert
            result.IsSuccess.Should().BeFalse();
            result.Error!.Message.Should().Contain("Type mismatch");
        }

        [Test]
        public void Compare_ObjectVsArray_ReturnsFailure()
        {
            // Arrange
            var obj = new Dictionary<string, object> { { "key", "value" } };
            var array = new object[] { "item1", "item2" };

            // Act
            var result = ComparisonEngine.Compare(obj, array);

            // Assert
            result.IsSuccess.Should().BeFalse();
            result.Error!.Message.Should().Contain("Type mismatch");
        }

        [Test]
        public void Compare_StringVsNumber_ReturnsFailure()
        {
            // Act
            var result = ComparisonEngine.Compare("123", 123);

            // Assert
            result.IsSuccess.Should().BeFalse();
            result.Error!.Message.Should().Contain("Type mismatch");
        }
    }

    [TestFixture]
    public class AsyncTests
    {
        [Test]
        public async Task CompareAsync_BasicComparison_ReturnsCorrectResult()
        {
            // Arrange
            var obj1 = new Dictionary<string, object> { { "name", "Alice" } };
            var obj2 = new Dictionary<string, object> { { "name", "Alice" } };

            // Act
            var result = await ComparisonEngine.CompareAsync(obj1, obj2);

            // Assert
            result.IsSuccess.Should().BeTrue();
        }

        [Test]
        public async Task CompareAsync_WithTimeout_CompletesWithinTimeout()
        {
            // Arrange
            var obj1 = new Dictionary<string, object> { { "name", "Alice" } };
            var obj2 = new Dictionary<string, object> { { "name", "Alice" } };
            var options = new ComparisonOptions(TimeoutSeconds: 1);

            // Act
            var stopwatch = System.Diagnostics.Stopwatch.StartNew();
            var result = await ComparisonEngine.CompareAsync(obj1, obj2, options);
            stopwatch.Stop();

            // Assert
            result.IsSuccess.Should().BeTrue();
            stopwatch.ElapsedMilliseconds.Should().BeLessThan(1000); // Should complete well before timeout
        }

        [Test]
        public void CompareAsync_WithCancellation_ThrowsOperationCanceledException()
        {
            // Arrange
            var obj1 = new Dictionary<string, object> { { "name", "Alice" } };
            var obj2 = new Dictionary<string, object> { { "name", "Alice" } };
            using var cts = new CancellationTokenSource();
            cts.Cancel(); // Cancel immediately

            // Act & Assert
            Assert.ThrowsAsync<OperationCanceledException>(async () =>
                await ComparisonEngine.CompareAsync(obj1, obj2, cancellationToken: cts.Token));
        }
    }

    /// <summary>
    /// Tests for hybrid array strategy with mixed primitive and object types.
    /// </summary>
    [TestFixture]
    public class HybridArrayStrategyTests
    {
        [Test]
        public void Compare_MixedArrayWithMatchingPrimitivesAndObjects_ReturnsSuccess()
        {
            // Arrange - mixed array with primitives and objects
            var expected = new object[]
            {
                1, 2, "hello",
                new Dictionary<string, object> { { "name", "Alice" }, { "age", 25 } },
                new Dictionary<string, object> { { "name", "Bob" }, { "age", 30 } }
            };

            var actual = new object[]
            {
                new Dictionary<string, object> { { "age", 30 }, { "name", "Bob" } }, // Different order in object
                "hello", 2, 1, // Different order for primitives
                new Dictionary<string, object> { { "age", 25 }, { "name", "Alice" } } // Different order in object
            };

            // Act
            var result = ComparisonEngine.Compare(expected, actual);

            // Assert
            result.IsSuccess.Should().BeTrue();
        }

        [Test]
        public void Compare_MixedArrayWithDifferentPrimitiveFrequency_ReturnsFailure()
        {
            // Arrange - different primitive frequencies
            var expected = new object[]
            {
                1, 1, 2, "hello",
                new Dictionary<string, object> { { "name", "Alice" } }
            };

            var actual = new object[]
            {
                1, 2, 2, "hello", // 1 appears once, 2 appears twice (different from expected)
                new Dictionary<string, object> { { "name", "Alice" } }
            };

            // Act
            var result = ComparisonEngine.Compare(expected, actual);

            // Assert
            result.IsSuccess.Should().BeFalse();
            result.Error!.Message.Should().Contain("Primitive elements frequency mismatch");
        }

        [Test]
        public void Compare_MixedArrayWithMatchingObjectsDifferentPrimitives_ReturnsFailure()
        {
            // Arrange - objects match but primitives don't
            var expected = new object[]
            {
                1, 2, "hello",
                new Dictionary<string, object> { { "name", "Alice" } }
            };

            var actual = new object[]
            {
                1, 3, "hello", // 3 instead of 2
                new Dictionary<string, object> { { "name", "Alice" } }
            };

            // Act
            var result = ComparisonEngine.Compare(expected, actual);

            // Assert
            result.IsSuccess.Should().BeFalse();
            result.Error!.Message.Should().Contain("Primitive elements frequency mismatch");
        }

        [Test]
        public void Compare_PurelyPrimitiveArray_UsesFrequencyStrategy()
        {
            // Arrange - purely primitive array
            var expected = new object[] { 1, 2, 3, 1, "hello", "world", "hello" };
            var actual = new object[] { "hello", 1, "world", 3, "hello", 2, 1 };

            // Act
            var result = ComparisonEngine.Compare(expected, actual);

            // Assert
            result.IsSuccess.Should().BeTrue();
        }

        [Test]
        public void Compare_PurelyObjectArray_UsesBacktrackingStrategy()
        {
            // Arrange - purely object array
            var expected = new object[]
            {
                new Dictionary<string, object> { { "name", "Alice" }, { "age", 25 } },
                new Dictionary<string, object> { { "name", "Bob" }, { "age", 30 } }
            };

            var actual = new object[]
            {
                new Dictionary<string, object> { { "age", 30 }, { "name", "Bob" } },
                new Dictionary<string, object> { { "age", 25 }, { "name", "Alice" } }
            };

            // Act
            var result = ComparisonEngine.Compare(expected, actual);

            // Assert
            result.IsSuccess.Should().BeTrue();
        }

        [Test]
        public void Compare_MixedArrayWithNullValues_HandlesNullsCorrectly()
        {
            // Arrange - mixed array with null values
            var expected = new object[]
            {
                1, null!, "hello",
                new Dictionary<string, object> { { "name", "Alice" } }
            };

            var actual = new object[]
            {
                new Dictionary<string, object> { { "name", "Alice" } },
                "hello", null!, 1
            };

            // Act
            var result = ComparisonEngine.Compare(expected, actual);

            // Assert
            result.IsSuccess.Should().BeTrue();
        }

        [Test]
        public void Compare_EmptyArrays_ReturnsSuccess()
        {
            // Arrange
            var expected = new object[0];
            var actual = new object[0];

            // Act
            var result = ComparisonEngine.Compare(expected, actual);

            // Assert
            result.IsSuccess.Should().BeTrue();
        }

        [Test]
        public void Compare_MixedArrayWithDuplicatePrimitives_HandlesFrequencyCorrectly()
        {
            // Arrange - test frequency counting with duplicates
            var expected = new object[]
            {
                "test", "test", "test", 1, 1,
                new Dictionary<string, object> { { "id", 1 } }
            };

            var actual = new object[]
            {
                1, new Dictionary<string, object> { { "id", 1 } },
                "test", 1, "test", "test"
            };

            // Act
            var result = ComparisonEngine.Compare(expected, actual);

            // Assert
            result.IsSuccess.Should().BeTrue();
        }

        [Test]
        public void Compare_RealWorldMixedArray_DemonstratesHybridStrategy()
        {
            // Arrange - real-world scenario with mixed types in different order
            var expected = new object[]
            {
                1, "hello", 2,
                new Dictionary<string, object> { { "name", "Alice" }, { "age", 25 } },
                "world",
                new Dictionary<string, object> { { "name", "Bob" }, { "age", 30 } },
                1  // Duplicate primitive
            };

            var actual = new object[]
            {
                // Objects in different order
                new Dictionary<string, object> { { "age", 30 }, { "name", "Bob" } },
                new Dictionary<string, object> { { "age", 25 }, { "name", "Alice" } },
                
                // Primitives in different order but same frequency
                "world", 2, "hello", 1, 1
            };

            // Act
            var result = ComparisonEngine.Compare(expected, actual);

            // Assert
            result.IsSuccess.Should().BeTrue("Hybrid strategy should handle mixed arrays with different ordering");
        }
    }

    /// <summary>
    /// Tests for error conditions and edge cases.
    /// </summary>
    [TestFixture]
    public class ComparisonEngineErrorTests
    {
        [Test]
        public void Compare_InvalidArrayComparisonMode_ThrowsArgumentOutOfRangeException()
        {
            // Arrange - create invalid enum value
            var invalidMode = (ArrayComparisonMode)999;
            var options = new ComparisonOptions(ArrayMode: invalidMode);
            var expected = new object[] { 1, 2, 3 };
            var actual = new object[] { 1, 2, 3 };

            // Act & Assert
            Assert.ThrowsAsync<ArgumentOutOfRangeException>(async () =>
                await ComparisonEngine.CompareAsync(expected, actual, options));
        }

        [Test]
        public void Compare_InvalidArrayComparisonMode_Synchronous_ThrowsArgumentOutOfRangeException()
        {
            // Arrange - create invalid enum value  
            var invalidMode = (ArrayComparisonMode)(-1);
            var options = new ComparisonOptions(ArrayMode: invalidMode);
            var expected = new object[] { "a", "b" };
            var actual = new object[] { "a", "b" };

            // Act & Assert
            Assert.Throws<ArgumentOutOfRangeException>(() =>
                ComparisonEngine.Compare(expected, actual, options));
        }

        [Test]
        public async Task CompareAsync_ExtremelyLongTimeout_CompletesSuccessfully()
        {
            // Arrange - test with very long timeout to ensure no overflow issues
            var options = new ComparisonOptions(TimeoutSeconds: int.MaxValue / 1000); // Avoid overflow
            var expected = new Dictionary<string, object> { { "test", "value" } };
            var actual = new Dictionary<string, object> { { "test", "value" } };

            // Act
            var result = await ComparisonEngine.CompareAsync(expected, actual, options);

            // Assert
            result.IsSuccess.Should().BeTrue();
        }

        [Test]
        public void Compare_CancellationTokenAlreadyCancelled_ThrowsOperationCanceledException()
        {
            // Arrange
            using var cts = new CancellationTokenSource();
            cts.Cancel(); // Cancel before starting
            var expected = new Dictionary<string, object> { { "test", "value" } };
            var actual = new Dictionary<string, object> { { "test", "value" } };

            // Act & Assert
            Assert.ThrowsAsync<OperationCanceledException>(async () =>
                await ComparisonEngine.CompareAsync(expected, actual, cancellationToken: cts.Token));
        }
    }

    /// <summary>
    /// Tests for performance edge cases that could cause issues in production.
    /// These tests ensure the comparison engine handles extreme scenarios gracefully.
    /// </summary>
    [TestFixture]
    public class PerformanceTests
    {
        [Test]
        public void Compare_VeryDeepNesting_DoesNotStackOverflow()
        {
            // Arrange - create extremely deeply nested structure
            var depth = 500; // Deep enough to potentially cause issues
            var deepDict1 = CreateDeeplyNestedDictionary(depth, "value1");
            var deepDict2 = CreateDeeplyNestedDictionary(depth, "value1"); // Same value

            // Act & Assert - Should not stack overflow or timeout
            var result = ComparisonEngine.Compare(deepDict1, deepDict2);
            result.IsSuccess.Should().BeTrue("Deep nesting should not prevent comparison");
        }

        [Test]
        public void Compare_VeryLargeArrays_CompletesWithinReasonableTime()
        {
            // Arrange - create very large arrays
            var size = 10000;
            var array1 = Enumerable.Range(0, size).Cast<object>().ToArray();
            var array2 = Enumerable.Range(0, size).Cast<object>().ToArray();

            var stopwatch = System.Diagnostics.Stopwatch.StartNew();

            // Act
            var result = ComparisonEngine.Compare(array1, array2);
            stopwatch.Stop();

            // Assert
            result.IsSuccess.Should().BeTrue();
            stopwatch.ElapsedMilliseconds.Should().BeLessThan(5000, "Large array comparison should complete within 5 seconds");
        }

        [Test]
        public void Compare_ManySmallObjects_HandlesMemoryEfficiently()
        {
            // Arrange - create many small objects to test memory usage patterns
            var objects1 = Enumerable.Range(0, 1000)
                .Select(i => new Dictionary<string, object>
                {
                    { "id", i },
                    { "name", $"Item{i}" },
                    { "value", i * 2 }
                })
                .ToArray();

            var objects2 = Enumerable.Range(0, 1000)
                .Select(i => new Dictionary<string, object>
                {
                    { "id", i },
                    { "name", $"Item{i}" },
                    { "value", i * 2 }
                })
                .ToArray();

            // Act
            var result = ComparisonEngine.Compare(objects1, objects2);

            // Assert
            result.IsSuccess.Should().BeTrue("Should handle many small objects efficiently");
        }

        [Test]
        public void Compare_DocumentsWithCircularReferences_HandlesGracefully()
        {
            // Note: This test verifies that we don't create circular references during normalization
            // MongoDB documents can't have circular references, but our .NET objects might

            // Arrange - create objects that could theoretically have circular references
            var dict1 = new Dictionary<string, object>
            {
                { "name", "parent" },
                { "children", new object[]
                    {
                        new Dictionary<string, object> { { "name", "child1" }, { "parent", "parent" } },
                        new Dictionary<string, object> { { "name", "child2" }, { "parent", "parent" } }
                    }
                }
            };

            var dict2 = new Dictionary<string, object>
            {
                { "name", "parent" },
                { "children", new object[]
                    {
                        new Dictionary<string, object> { { "name", "child1" }, { "parent", "parent" } },
                        new Dictionary<string, object> { { "name", "child2" }, { "parent", "parent" } }
                    }
                }
            };

            // Act - Should complete without infinite recursion
            var result = ComparisonEngine.Compare(dict1, dict2);

            // Assert
            result.IsSuccess.Should().BeTrue();
        }

        [Test]
        public void Compare_ExtremelyLongStrings_HandlesCorrectly()
        {
            // Arrange - very long strings that might cause issues
            var longString1 = new string('A', 100000); // 100K characters
            var longString2 = new string('A', 100000); // Same content
            var longString3 = new string('B', 100000); // Different content

            // Act & Assert - Same long strings should match
            var result1 = ComparisonEngine.Compare(longString1, longString2);
            result1.IsSuccess.Should().BeTrue();

            // Different long strings should not match (but not crash)
            var result2 = ComparisonEngine.Compare(longString1, longString3);
            result2.IsSuccess.Should().BeFalse();
        }

        [Test]
        public void Compare_EmptyCollections_HandlesCorrectly()
        {
            // Arrange - various empty collections
            var emptyArray1 = new object[0];
            var emptyArray2 = new object[0];
            var emptyDict1 = new Dictionary<string, object>();
            var emptyDict2 = new Dictionary<string, object>();

            // Act & Assert - Empty collections should match
            var arrayResult = ComparisonEngine.Compare(emptyArray1, emptyArray2);
            arrayResult.IsSuccess.Should().BeTrue("Empty arrays should match");

            var dictResult = ComparisonEngine.Compare(emptyDict1, emptyDict2);
            dictResult.IsSuccess.Should().BeTrue("Empty dictionaries should match");

            // Empty array vs empty dict should fail gracefully
            var mixedResult = ComparisonEngine.Compare(emptyArray1, emptyDict1);
            mixedResult.IsSuccess.Should().BeFalse("Empty array vs empty dict should fail");
            mixedResult.Error!.Message.Should().Contain("Type mismatch");
        }

        [Test]
        public void Compare_UnicodeAndSpecialCharacters_HandlesCorrectly()
        {
            // Arrange - various Unicode and special characters
            var unicodeData1 = new Dictionary<string, object>
            {
                { "emoji", "🚀🎉😀" },
                { "chinese", "你好世界" },
                { "arabic", "مرحبا بالعالم" },
                { "special", "!@#$%^&*()_+-=[]{}|;':\",./<>?" },
                { "whitespace", "line1\nline2\tindented  spaced" }
            };

            var unicodeData2 = new Dictionary<string, object>
            {
                { "emoji", "🚀🎉😀" },
                { "chinese", "你好世界" },
                { "arabic", "مرحبا بالعالم" },
                { "special", "!@#$%^&*()_+-=[]{}|;':\",./<>?" },
                { "whitespace", "line1\nline2\tindented  spaced" }
            };

            // Act
            var result = ComparisonEngine.Compare(unicodeData1, unicodeData2);

            // Assert
            result.IsSuccess.Should().BeTrue("Unicode and special characters should be handled correctly");
        }

        [Test]
        public void ComparisonEngine_ConcurrentUsage_IsThreadSafe()
        {
            // Arrange - data for concurrent comparison
            var testData = Enumerable.Range(0, 100)
                .Select(i => new
                {
                    Expected = new Dictionary<string, object> { { "id", i }, { "value", $"test{i}" } },
                    Actual = new Dictionary<string, object> { { "id", i }, { "value", $"test{i}" } }
                })
                .ToArray();

            var results = new bool[testData.Length];

            // Act - run many comparisons concurrently
            Parallel.For(0, testData.Length, i =>
            {
                var result = ComparisonEngine.Compare(testData[i].Expected, testData[i].Actual);
                results[i] = result.IsSuccess;
            });

            // Assert - all comparisons should succeed
            results.Should().AllBeEquivalentTo(true, "All concurrent comparisons should succeed");
        }

        [Test]
        public async Task ComparisonEngine_AsyncConcurrentUsage_CompletesSuccessfully()
        {
            // Arrange - multiple async comparison tasks
            var tasks = Enumerable.Range(0, 50)
                .Select(async i =>
                {
                    var expected = new Dictionary<string, object> { { "id", i }, { "name", $"Item{i}" } };
                    var actual = new Dictionary<string, object> { { "id", i }, { "name", $"Item{i}" } };

                    return await ComparisonEngine.CompareAsync(expected, actual);
                })
                .ToArray();

            // Act
            var results = await Task.WhenAll(tasks);

            // Assert - all async comparisons should succeed
            results.Should().AllSatisfy(result => result.IsSuccess.Should().BeTrue());
        }

        private static Dictionary<string, object> CreateDeeplyNestedDictionary(int depth, string leafValue)
        {
            if (depth == 0)
            {
                return new Dictionary<string, object> { { "leaf", leafValue } };
            }

            return new Dictionary<string, object>
            {
                { "nested", CreateDeeplyNestedDictionary(depth - 1, leafValue) },
                { "level", depth }
            };
        }
    }

    #region Multi-line String Comparison Tests

    [Test]
    public void Compare_MultiLineStringList_BoroughList_ShouldMatch()
    {
        // Arrange - Testing real-world pattern from MongoDB C# Driver documentation
        var expected = TestDataConstants.RealWorldExamples.BoroughList;
        var actual = TestDataConstants.RealWorldExamples.BoroughListAlternateFormat;

        // Act
        var result = ComparisonEngine.Compare(expected, actual);

        // Assert
        result.IsSuccess.Should().BeTrue("multi-line string lists with identical content should match");
        result.Error.Should().BeNull();
    }

    [Test]
    public void Compare_MultiLineStringList_WithExtraWhitespace_ShouldMatch()
    {
        // Arrange
        var expected = TestDataConstants.RealWorldExamples.BoroughList;
        var actualWithWhitespace = """
            Bronx  
            Brooklyn
            Manhattan   
            Missing
            Queens
            Staten Island   
            """;

        // Act
        var result = ComparisonEngine.Compare(expected, actualWithWhitespace);

        // Assert
        result.IsSuccess.Should().BeTrue("trailing whitespace should be normalized and ignored");
    }

    [Test]
    public void Compare_MultiLineStringList_WithDifferentOrder_ShouldNotMatch()
    {
        // Arrange
        var expected = TestDataConstants.RealWorldExamples.BoroughList;
        var actualDifferentOrder = """
            Brooklyn
            Bronx
            Manhattan
            Missing
            Queens
            Staten Island
            """;

        // Act
        var result = ComparisonEngine.Compare(expected, actualDifferentOrder);

        // Assert
        result.IsSuccess.Should().BeFalse("different order should not match for line-by-line comparison");
        result.Error.Should().NotBeNull();
        result.Error!.ToString().Should().Contain("Bronx");
    }

    [Test]
    public void Compare_MultiLineStringList_WithMissingItems_ShouldNotMatch()
    {
        // Arrange
        var expected = TestDataConstants.RealWorldExamples.BoroughList;
        var actualMissing = """
            Bronx
            Brooklyn
            Manhattan
            Queens
            Staten Island
            """;

        // Act
        var result = ComparisonEngine.Compare(expected, actualMissing);

        // Assert
        result.IsSuccess.Should().BeFalse("missing items should cause mismatch");
        result.Error.Should().NotBeNull();
        result.Error!.ToString().Should().Contain("Missing");
    }

    [Test]
    public void Compare_StringWithJsonContent_ShouldNotParseNestedJson()
    {
        // Arrange - Test that string fields containing JSON are treated as strings, not parsed
        var expected = """
            { "metadata": "{\\"nested\\": \\"json\\", \\"value\\": 123}" }
            """;
        var actual = """
            { "metadata": "{\\"nested\\": \\"json\\", \\"value\\": 123}" }
            """;

        // Act
        var result = ComparisonEngine.Compare(expected, actual);

        // Assert
        result.IsSuccess.Should().BeTrue("string fields containing JSON should be compared as strings");
    }

    [Test]
    public void Compare_UnicodeAndSpecialCharacters_ShouldMatch()
    {
        // Arrange - Test Unicode characters and special strings that might appear in real data
        var expected = """
            { "name": "Café München", "emoji": "🍕", "special": "line1\nline2\ttab", "unicode": "测试数据" }
            """;
        var actual = """
            { "name": "Café München", "emoji": "🍕", "special": "line1\nline2\ttab", "unicode": "测试数据" }
            """;

        // Act
        var result = ComparisonEngine.Compare(expected, actual);

        // Assert
        result.IsSuccess.Should().BeTrue("Unicode and special characters should be handled correctly");
    }

    [Test]
    public void Compare_LargeDataset_ShouldCompleteInReasonableTime()
    {
        // Arrange - Create a larger borough list (simulating a large distinct result)
        var largeBoroughList = string.Join("\n",
            Enumerable.Range(0, 1000)
                      .Select(i => $"Borough_{i:D4}")
                      .ToArray());

        var stopwatch = System.Diagnostics.Stopwatch.StartNew();

        // Act
        var result = ComparisonEngine.Compare(largeBoroughList, largeBoroughList);
        stopwatch.Stop();

        // Assert
        result.IsSuccess.Should().BeTrue();
        stopwatch.ElapsedMilliseconds.Should().BeLessThan(5000, "large datasets should complete within reasonable time");
    }

    [Test]
    public void Compare_DeepNesting_ShouldCompleteInReasonableTime()
    {
        // Arrange - Create deeply nested JSON structure
        var deeplyNested = new System.Text.StringBuilder();
        deeplyNested.Append("{");
        for (int i = 0; i < 50; i++)
        {
            deeplyNested.Append($"\"level{i}\": {{");
        }
        deeplyNested.Append("\"value\": \"deep\"");
        for (int i = 0; i < 50; i++)
        {
            deeplyNested.Append("}");
        }
        deeplyNested.Append("}");

        var deepJson = deeplyNested.ToString();
        var stopwatch = System.Diagnostics.Stopwatch.StartNew();

        // Act
        var result = ComparisonEngine.Compare(deepJson, deepJson);
        stopwatch.Stop();

        // Assert
        result.IsSuccess.Should().BeTrue();
        stopwatch.ElapsedMilliseconds.Should().BeLessThan(3000, "deeply nested structures should complete within reasonable time");
    }

    #endregion

    #region Error Handling and Edge Cases

    [Test]
    public void Compare_WithNullInput_ShouldHandleGracefully()
    {
        // Act & Assert
        var result1 = ComparisonEngine.Compare(null, TestDataConstants.RealWorldExamples.BoroughList);
        result1.IsSuccess.Should().BeFalse();
        result1.Error.Should().NotBeNull();

        var result2 = ComparisonEngine.Compare(TestDataConstants.RealWorldExamples.TimeSeriesMetadata, null);
        result2.IsSuccess.Should().BeFalse();
        result2.Error.Should().NotBeNull();
    }

    [Test]
    public void Compare_WithEmptyInput_ShouldHandleGracefully()
    {
        // Act & Assert
        var result1 = ComparisonEngine.Compare("", TestDataConstants.RealWorldExamples.BoroughList);
        result1.IsSuccess.Should().BeFalse();

        var result2 = ComparisonEngine.Compare(TestDataConstants.RealWorldExamples.TimeSeriesMetadata, "");
        result2.IsSuccess.Should().BeFalse();
    }

    [Test]
    public void Compare_WithMalformedJson_ShouldHandleGracefully()
    {
        // Arrange
        var expected = TestDataConstants.RealWorldExamples.TimeSeriesMetadata;
        var malformedJson = """
            {
               "name": "september2021",
               "type": "timeseries",
               "options": {
                  "timeseries": {
                     "timeField": "temperature"
               }
            """; // Missing closing braces

        // Act
        var result = ComparisonEngine.Compare(expected, malformedJson);

        // Assert
        result.IsSuccess.Should().BeFalse("malformed JSON should be handled gracefully");
        result.Error.Should().NotBeNull();
    }

    #endregion
}
