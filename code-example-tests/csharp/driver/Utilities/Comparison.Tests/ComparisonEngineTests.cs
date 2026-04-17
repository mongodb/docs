using System.Collections.Immutable;
using System.Diagnostics;
using System.Text;
using MongoDB.Bson;
using NUnit.Framework;

namespace Utilities.Comparison.Tests;

[TestFixture]
public class ComparisonEngineTests
{
    [Description("Verifies that comparing two identical primitive values returns a successful comparison result")]
    [Test]
    public void Compare_IdenticalPrimitives()
    {
        Expect.That("test").ShouldMatch("test");
        Expect.That(123).ShouldMatch(123);
        Expect.That(true).ShouldMatch(true);
        Expect.That(null).ShouldMatch(null);
    }

    [Description("Verifies that comparing two different primitive values returns a failure comparison result")]
    [Test]
    public void Compare_DifferentPrimitives()
    {
        Expect.That("test").ShouldNotMatch("different");
    }

    [Description("Verifies that comparing a null value against a non-null value returns a failure result")]
    [Test]
    public void Compare_NullVsNonNull()
    {
        Expect.That("not null").ShouldNotMatch(null);
    }

    [Description("Verifies that comparing values with an exact ellipsis pattern returns a successful result")]
    [Test]
    public void Compare_ExactEllipsis()
    {
        Expect.That("anything").ShouldMatch("...");
        Expect.That(null).ShouldMatch("...");
        Expect.That(123).ShouldMatch("...");
        Expect.That(new { prop = "value" }).ShouldMatch("...");
    }

    [Description("Verifies that comparing a truncated string matches successfully")]
    [Test]
    public void Compare_TruncatedString()
    {
        Expect.That("Hello World").ShouldMatch("Hello ...");
        Expect.That("Error: Connection failed after 3 retries").ShouldMatch("Error: Connection...");
    }

    [Description("Verifies that comparing a truncated string with content mismatch returns a failure result")]
    [Test]
    public void Compare_TruncatedStringMismatch()
    {
        Expect.That("Hello...").ShouldNotMatch("Hi World");
    }

    [TestFixture]
    public class MongoTypeComparisonTests
    {
        [Test]
        [Description("Tests that ObjectId values are compared correctly against their string representations")]
        public void Compare_ObjectIdToString()
        {
            var objectId = new ObjectId("507f1f77bcf86cd799439011");
            var stringId = "507f1f77bcf86cd799439011";

            Expect.That(objectId).ShouldMatch(stringId);
        }

        [Test]
        [Description("Tests that Decimal128 values are compared correctly against their string representations")]
        public void Compare_Decimal128ToString()
        {
            var decimal128 = Decimal128.Parse("123.45");
            var stringDecimal = "123.45";

            Expect.That(decimal128).ShouldMatch(stringDecimal);
        }

        [Test]
        [Description("Tests that DateTime values are compared correctly against their ISO string representations")]
        public void Compare_DateTimeToString()
        {
            var dateTime = new DateTime(2024, 1, 1, 12, 0, 0, DateTimeKind.Utc);
            var isoString = "2024-01-01T12:00:00.000Z";

            Expect.That(dateTime).ShouldMatch(isoString);
        }

        [Test]
        [Description("Tests that BsonObjectId values are compared correctly against their string representations")]
        public void Compare_BsonTypes()
        {
            var bsonObjectId = new BsonObjectId(new ObjectId("507f1f77bcf86cd799439011"));
            var stringId = "507f1f77bcf86cd799439011";

            Expect.That(bsonObjectId).ShouldMatch(stringId);
        }
    }

    [TestFixture]
    public class ArrayComparisonTests
    {
        [Test]
        [Description("Tests that identical arrays with ordered comparison match correctly")]
        public void Compare_IdenticalArraysOrdered()
        {
            var actualArray = new object[] { "a", "b", "c" };
            var expectedArray = new object[] { "a", "b", "c" };

            Expect.That(actualArray)
                .WithOrderedSort()
                .WithIgnoredFields("_id", "name")
                .ShouldMatch(expectedArray);
        }

        [Test]
        [Description("Tests that arrays with different order fail ordered comparison")]
        public void Compare_DifferentOrderArraysOrdered()
        {
            var actualArray = new object[] { "a", "b", "c" };
            var expectedArray = new object[] { "a", "c", "b" };
            var options = ComparisonOptions.Ordered;
            Expect.That(actualArray).WithOrderedSort().ShouldNotMatch(expectedArray);
        }

        [Test]
        [Description("Tests that arrays with different order pass unordered comparison")]
        public void Compare_DifferentOrderArraysUnordered()
        {
            var actualArray = new object[] { "a", "b", "c" };
            var expectedArray = new object[] { "c", "a", "b" };

            Expect.That(actualArray).WithUnorderedSort().ShouldMatch(expectedArray);
        }

        [Test]
        [Description("Tests that arrays with different lengths fail comparison")]
        public void Compare_ArraysWithDifferentLengths()
        {
            var actualArray = new object[] { "a", "b" };
            var expectedArray = new object[] { "a", "b", "c" };

            Expect.That(actualArray).ShouldNotMatch(expectedArray);
        }

        [Test]
        [Description("Tests that complex object arrays are compared correctly in unordered mode")]
        public void Compare_ComplexObjectArraysUnordered()
        {
            var actualArray = new object[]
            {
                new Dictionary<string, object> { { "id", 1 }, { "name", "Alice" } },
                new Dictionary<string, object> { { "id", 2 }, { "name", "Bob" } }
            };
            var expectedArray = new object[]
            {
                new Dictionary<string, object> { { "id", 2 }, { "name", "Bob" } },
                new Dictionary<string, object> { { "id", 1 }, { "name", "Alice" } }
            };


            Expect.That(actualArray).ShouldMatch(expectedArray);
        }

        [Test]
        [Description("Tests that unordered arrays with different values fail comparison")]
        public void Compare_UnorderedArrayNoMatch()
        {
            var actualArray = new object[] { "a", "b", "c" };
            var expectedArray = new object[] { "a", "b", "d" }; // 'c' vs 'd'

            Expect.That(actualArray).ShouldNotMatch(expectedArray);
        }

        [Test]
        [Description("Tests that array wildcard pattern matches arrays with any content")]
        public void Compare_ArrayWildcard()
        {
            var expectedArray = new object[] { "..." };
            var actualArray = new object[] { "any", "content", "here" };

            Expect.That(actualArray).ShouldMatch(expectedArray);
        }
    }

    [TestFixture]
    public class ObjectComparisonTests
    {
        [Test]
        [Description("Tests that identical objects with matching properties and values compare successfully")]
        public void Compare_IdenticalObjects()
        {
            var expected = new Dictionary<string, object>
            {
                { "name", "Alice" },
                { "age", 25 },
                { "active", true }
            };
            var actual = new Dictionary<string, object>
            {
                { "name", "Alice" },
                { "age", 25 },
                { "active", true }
            };

            Expect.That(actual).ShouldMatch(expected);
        }

        [Test]
        [Description("Tests that objects with different property values fail comparison")]
        public void Compare_DifferentPropertyValues()
        {
            var expected = new Dictionary<string, object> { { "name", "Alice" } };
            var actual = new Dictionary<string, object> { { "name", "Bob" } };

            Expect.That(actual).ShouldNotMatch(expected);

        }

        [Test]
        [Description("Tests that objects with missing properties fail comparison")]
        public void Compare_MissingProperty()
        {
            var expected = new Dictionary<string, object> { { "name", "Alice" }, { "age", 25 } };
            var actual = new Dictionary<string, object> { { "name", "Alice" } }; // missing age

            Expect.That(actual).ShouldNotMatch(expected);
        }

        [Test]
        [Description("Tests that objects with extra properties fail comparison when no ellipsis is present")]
        public void Compare_ExtraPropertyWithoutEllipsis()
        {
            var expected = new Dictionary<string, object> { { "name", "Alice" } };
            var actual = new Dictionary<string, object> { { "name", "Alice" }, { "age", 25 } }; // extra property

            Expect.That(actual).ShouldNotMatch(expected);
        }

        [Test]
        [Description("Tests that objects with extra properties pass comparison when global ellipsis marker is present")]
        public void Compare_ExtraPropertyWithGlobalEllipsis()
        {
            var expected = new Dictionary<string, object>
            {
                { "name", "Alice" },
                { "...", "..." } // Global ellipsis marker
            };
            var actual = new Dictionary<string, object>
            {
                { "name", "Alice" },
                { "age", 25 },
                { "city", "New York" }
            };

            Expect.That(actual).ShouldMatch(expected);
        }

        [Test]
        [Description("Tests that property-level ellipsis patterns match any value for specific properties")]
        public void Compare_PropertyLevelEllipsis()
        {
            var expected = new Dictionary<string, object>
            {
                { "name", "Alice" },
                { "_id", "..." }, // Property-level ellipsis
                { "timestamp", "..." }
            };
            var actual = new Dictionary<string, object>
            {
                { "name", "Alice" },
                { "_id", "507f1f77bcf86cd799439011" },
                { "timestamp", "2024-01-01T12:00:00.000Z" }
            };

            Expect.That(actual).ShouldMatch(expected);
        }

        [Test]
        [Description("Tests that object wildcard pattern matches any object with any properties")]
        public void Compare_ObjectWildcard()
        {
            var expected = new Dictionary<string, object> { { "...", "..." } };
            var actual = new Dictionary<string, object>
            {
                { "name", "Alice" },
                { "age", 25 },
                { "active", true }
            };

            Expect.That(actual).ShouldMatch(expected);
        }

        [Test]
        [Description("Tests that nested objects are compared correctly with deep property matching")]
        public void Compare_NestedObjects()
        {
            var expected = new Dictionary<string, object>
            {
                {
                    "user", new Dictionary<string, object>
                    {
                        {
                            "profile", new Dictionary<string, object>
                            {
                                { "name", "Alice" },
                                {
                                    "settings", new Dictionary<string, object>
                                    {
                                        { "theme", "dark" }
                                    }
                                }
                            }
                        }
                    }
                }
            };
            var actual = new Dictionary<string, object>
            {
                {
                    "user", new Dictionary<string, object>
                    {
                        {
                            "profile", new Dictionary<string, object>
                            {
                                { "name", "Alice" },
                                {
                                    "settings", new Dictionary<string, object>
                                    {
                                        { "theme", "dark" }
                                    }
                                }
                            }
                        }
                    }
                }
            };

            Expect.That(actual).ShouldMatch(expected);
        }

        [Test]
        [Description("Tests that nested object mismatch returns failure with correct path information")]
        public void Compare_NestedObjectMismatch_ReturnsFailureWithCorrectPath()
        {
            var expected = new Dictionary<string, object>
            {
                {
                    "user", new Dictionary<string, object>
                    {
                        {
                            "profile", new Dictionary<string, object>
                            {
                                { "name", "Alice" }
                            }
                        }
                    }
                }
            };
            var actual = new Dictionary<string, object>
            {
                {
                    "user", new Dictionary<string, object>
                    {
                        {
                            "profile", new Dictionary<string, object>
                            {
                                { "name", "Bob" } // Different name
                            }
                        }
                    }
                }
            };
            Expect.That(actual).ShouldNotMatch(expected);
        }
    }

    [TestFixture]
    public class IgnoreFieldsTests
    {
        [Test]
        [Description("Tests that WithIgnoredFields correctly ignores specified fields during comparison")]
        public void Compare_WithIgnoredFields_IgnoresSpecifiedFields()
        {
            var expected = new Dictionary<string, object>
            {
                { "name", "Alice" },
                { "_id", "507f1f77bcf86cd799439011" },
                { "timestamp", "2024-01-01T12:00:00.000Z" }
            };
            var actual = new Dictionary<string, object>
            {
                { "name", "Alice" },
                { "_id", "different-id" }, // Different but ignored
                { "timestamp", "different-time" } // Different but ignored
            };

            Expect.That(actual).WithIgnoredFields("_id", "timestamp").ShouldMatch(expected);
        }

        [Test]
        [Description("Tests that WithIgnoredFields still validates non-ignored fields correctly")]
        public void Compare_WithIgnoredFields_StillValidatesNonIgnoredFields()
        {
            var expected = new Dictionary<string, object>
            {
                { "name", "Alice" },
                { "_id", "507f1f77bcf86cd799439011" }
            };
            var actual = new Dictionary<string, object>
            {
                { "name", "Bob" }, // This should still cause failure
                { "_id", "different-id" } // This is ignored
            };

            Expect.That(actual).WithIgnoredFields("_id").ShouldNotMatch(expected);

        }

        [Test]
        [Description("Tests that ignored fields in nested objects are correctly ignored during comparison")]
        public void Compare_IgnoredFieldsInNestedObjects_IgnoresCorrectly()
        {
            var expected = new Dictionary<string, object>
            {
                {
                    "users", new object[]
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
            var actual = new Dictionary<string, object>
            {
                {
                    "users", new object[]
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
            Expect.That(actual)
                .WithUnorderedSort()
                .WithIgnoredFields("_id", "createdAt").ShouldMatch(expected);
        }
    }

    [TestFixture]
    public class TypeMismatchTests
    {
        [Test]
        [Description("Tests that comparing an array against an object returns failure")]
        public void Compare_ArrayVsObject()
        {
            var array = new object[] { "item1", "item2" };
            var obj = new Dictionary<string, object> { { "key", "value" } };

            var result = Expect.That(array).ShouldNotMatch(obj);
        }

        [Test]
        [Description("Tests that comparing an object against an array returns failure")]
        public void Compare_ObjectVsArray()
        {
            var obj = new Dictionary<string, object> { { "key", "value" } };
            var array = new object[] { "item1", "item2" };

            var result = Expect.That(obj).ShouldNotMatch(array);
        }

        [Test]
        [Description("Tests that comparing a string against a number returns failure")]
        public void Compare_StringVsNumber()
        {
            var result = Expect.That("123").ShouldNotMatch(123);
        }
    }

    [TestFixture]
    public class AsyncTests
    {
        [Test]
        [Description("Tests that CompareAsync performs basic comparison correctly and returns expected result")]
        public async Task CompareAsync_BasicComparison_ReturnsCorrectResult()
        {
            var expected = new Dictionary<string, object> { { "name", "Alice" } };
            var actual = new Dictionary<string, object> { { "name", "Alice" } };

            await Expect.That(actual).ShouldMatchAsync(expected);
        }

        [Test]
        [Description("Tests that CompareAsync completes within reasonable timeout period")]
        public async Task CompareAsync_WithTimeout_CompletesWithinTimeout()
        {
            var expected = new Dictionary<string, object> { { "name", "Alice" } };
            var actual = new Dictionary<string, object> { { "name", "Alice" } };

            var stopwatch = Stopwatch.StartNew();
            await Expect.That(actual).ShouldMatchAsync(expected);
            stopwatch.Stop();

            Assert.That(stopwatch.ElapsedMilliseconds, Is.LessThan(1000)); // Should complete well before timeout;
        }

        [Test]
        [Description("Tests that CompareAsync throws OperationCanceledException when cancellation token is cancelled")]
        public void CompareAsync_WithCancellation_ThrowsOperationCanceledException()
        {
            var expected = new Dictionary<string, object> { { "name", "Alice" } };
            var actual = new Dictionary<string, object> { { "name", "Alice" } };
            using var cts = new CancellationTokenSource();
            cts.Cancel(); // Cancel immediately

            Assert.ThrowsAsync<OperationCanceledException>(async () =>
                await Expect.That(actual).ShouldMatchAsync(expected, cts.Token));
        }
    }

    /// <summary>
    ///     Tests for hybrid array strategy with mixed primitive and object types.
    /// </summary>
    [TestFixture]
    public class HybridArrayStrategyTests
    {
        [Test]
        [Description("Tests that mixed arrays with matching primitives and objects compare successfully using hybrid strategy")]
        public void Compare_MixedArrayWithMatchingPrimitivesAndObjects()
        {
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

            Expect.That(actual).ShouldMatch(expected);
        }

        [Test]
        [Description("Tests that mixed arrays with different primitive frequency fail comparison")]
        public void Compare_MixedArrayWithDifferentPrimitiveFrequency()
        {
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

            Expect.That(actual).ShouldNotMatch(expected);
        }

        [Test]
        [Description("Tests that mixed arrays with matching objects but different primitives fail comparison")]
        public void Compare_MixedArrayWithMatchingObjectsDifferentPrimitives()
        {
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

            Expect.That(actual).ShouldNotMatch(expected);
        }

        [Test]
        [Description("Tests that purely primitive arrays use frequency-based comparison strategy")]
        public void Compare_PurelyPrimitiveArray_UsesFrequencyStrategy()
        {
            var actual = new object[] { 1, 2, 3, 1, "hello", "world", "hello" };
            var expected = new object[] { "hello", 1, "world", 3, "hello", 2, 1 };

            Expect.That(actual).ShouldMatch(expected);
        }

        [Test]
        [Description("Tests that purely object arrays use backtracking comparison strategy")]
        public void Compare_PurelyObjectArray_UsesBacktrackingStrategy()
        {
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

            Expect.That(actual).ShouldMatch(expected);
        }

        [Test]
        [Description("Tests that mixed arrays with null values handle nulls correctly during comparison")]
        public void Compare_MixedArrayWithNullValues_HandlesNullsCorrectly()
        {
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

            Expect.That(actual).ShouldMatch(expected);
        }

        [Test]
        [Description("Tests that empty arrays compare successfully")]
        public void Compare_EmptyArrays()
        {
            var expected = new object[0];
            var actual = new object[0];

            Expect.That(actual).ShouldMatch(expected);
        }

        [Test]
        [Description("Tests that mixed arrays with duplicate primitives handle frequency counting correctly")]
        public void Compare_MixedArrayWithDuplicatePrimitives_HandlesFrequencyCorrectly()
        {
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

            Expect.That(actual).ShouldMatch(expected);
        }

        [Test]
        [Description("Tests that real-world mixed arrays demonstrate hybrid comparison strategy correctly")]
        public void Compare_RealWorldMixedArray_DemonstratesHybridStrategy()
        {
            var expected = new object[]
            {
                1, "hello", 2,
                new Dictionary<string, object> { { "name", "Alice" }, { "age", 25 } },
                "world",
                new Dictionary<string, object> { { "name", "Bob" }, { "age", 30 } },
                1 // Duplicate primitive
            };

            var actual = new object[]
            {
                // Objects in different order
                new Dictionary<string, object> { { "age", 30 }, { "name", "Bob" } },
                new Dictionary<string, object> { { "age", 25 }, { "name", "Alice" } },

                // Primitives in different order but same frequency
                "world", 2, "hello", 1, 1
            };

            var result = Expect.That(actual).ShouldMatch(expected);

            Assert.That(result.IsSuccess, Is.True);
        }
    }

    /// <summary>
    ///     Tests for error conditions and edge cases.
    /// </summary>
    [TestFixture]
    public class ComparisonEngineErrorTests
    {
        [Test]
        [Description("Tests that comparison throws OperationCanceledException when cancellation token is already cancelled")]
        public void Compare_CancellationTokenAlreadyCancelled_ThrowsOperationCanceledException()
        {
            using var cts = new CancellationTokenSource();
            cts.Cancel(); // Cancel before starting
            var expected = new Dictionary<string, object> { { "test", "value" } };
            var actual = new Dictionary<string, object> { { "test", "value" } };

            Assert.ThrowsAsync<OperationCanceledException>(async () =>
                await Expect.That(actual).ShouldMatchAsync(expected, cts.Token));
        }
    }

    /// <summary>
    ///     Tests for performance edge cases that could cause issues in production.
    ///     These tests ensure the comparison engine handles extreme scenarios gracefully.
    /// </summary>
    [TestFixture]
    public class PerformanceTests
    {
        [Test]
        [Description("Tests that very deep nesting does not cause stack overflow")]
        public void Compare_VeryDeepNesting_DoesNotStackOverflow()
        {
            var depth = 500; // Deep enough to potentially cause issues
            var deepDict1 = CreateDeeplyNestedDictionary(depth, "value1");
            var deepDict2 = CreateDeeplyNestedDictionary(depth, "value1"); // Same value

            var result = Expect.That(deepDict1).ShouldMatch(deepDict2);
            Assert.That(result.IsSuccess, Is.True);
            ;
        }

        [Test]
        [Description("Tests that very large arrays complete comparison within reasonable time")]
        public void Compare_VeryLargeArrays_CompletesWithinReasonableTime()
        {
            var size = 10000;
            var actualArray = Enumerable.Range(0, size).Cast<object>().ToArray();
            var expectedArray = Enumerable.Range(0, size).Cast<object>().ToArray();

            var stopwatch = Stopwatch.StartNew();

            Expect.That(actualArray).ShouldMatch(expectedArray);
            stopwatch.Stop();

            Assert.That(stopwatch.ElapsedMilliseconds, Is.LessThan(5000)); // Should complete well before timeout;
        }

        [Test]
        [Description("Tests that many small objects are handled memory efficiently during comparison")]
        public void Compare_ManySmallObjects_HandlesMemoryEfficiently()
        {
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

            var result = Expect.That(objects1).ShouldMatch(objects2);

            Assert.That(result.IsSuccess, Is.True);

        }

        [Test]
        [Description("Tests that documents with circular reference patterns are handled gracefully")]
        public void Compare_DocumentsWithCircularReferences_HandlesGracefully()
        {
            // Note: This test verifies that we don't create circular references during normalization
            // MongoDB documents can't have circular references, but our .NET objects might

            var dict1 = new Dictionary<string, object>
            {
                { "name", "parent" },
                {
                    "children", new object[]
                    {
                        new Dictionary<string, object> { { "name", "child1" }, { "parent", "parent" } },
                        new Dictionary<string, object> { { "name", "child2" }, { "parent", "parent" } }
                    }
                }
            };

            var dict2 = new Dictionary<string, object>
            {
                { "name", "parent" },
                {
                    "children", new object[]
                    {
                        new Dictionary<string, object> { { "name", "child1" }, { "parent", "parent" } },
                        new Dictionary<string, object> { { "name", "child2" }, { "parent", "parent" } }
                    }
                }
            };

            Expect.That(dict1).ShouldMatch(dict2);
        }

        [Test]
        [Description("Tests that extremely long strings are handled correctly without performance issues")]
        public void Compare_ExtremelyLongStrings_HandlesCorrectly()
        {
            var longString1 = new string('A', 100000); // 100K characters
            var longString2 = new string('A', 100000); // Same content
            var differentLongString3 = new string('B', 100000); // Different content

            Expect.That(longString1).ShouldMatch(longString2);

            // Different long strings should not match (but not crash)
            Expect.That(longString1).ShouldNotMatch(differentLongString3);
        }

        [Test]
        [Description("Tests that empty collections are handled correctly during comparison")]
        public void Compare_EmptyCollections_HandlesCorrectly()
        {
            var emptyActualArray = new object[0];
            var emptyExpectedArray = new object[0];
            var emptyActualDict1 = new Dictionary<string, object>();
            var emptyExpectedDict2 = new Dictionary<string, object>();

            var arrayResult = Expect.That(emptyActualArray).ShouldMatch(emptyExpectedArray);
            Assert.That(arrayResult.IsSuccess, Is.True);

            var dictResult = Expect.That(emptyActualDict1).ShouldMatch(emptyExpectedDict2);
            Expect.That(dictResult.IsSuccess).ShouldMatch(true);

            Expect.That(emptyActualArray).ShouldNotMatch(emptyExpectedDict2);
        }

        [Test]
        [Description("Tests that Unicode and special characters are handled correctly during comparison")]
        public void Compare_UnicodeAndSpecialCharacters_HandlesCorrectly()
        {
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

            var result = Expect.That(unicodeData1).ShouldMatch(unicodeData2);

            Assert.That(result.IsSuccess);
        }

        [Test]
        [Description("Tests that ComparisonEngine is thread-safe during concurrent usage")]
        public void ComparisonEngine_ConcurrentUsage_IsThreadSafe()
        {
            var testData = Enumerable.Range(0, 100)
                .Select(i => new
                {
                    Expected = new Dictionary<string, object> { { "id", i }, { "value", $"test{i}" } },
                    Actual = new Dictionary<string, object> { { "id", i }, { "value", $"test{i}" } }
                })
                .ToArray();

            var results = new bool[testData.Length];

            Parallel.For(0, testData.Length, i =>
            {
                var result = Expect.That(testData[i].Actual).ShouldMatch(testData[i].Expected);
                results[i] = result.IsSuccess;
            });

            Assert.That(results.All(result => result), "All comparisons should succeed"); ;
        }

        [Test]
        [Description("Tests that ComparisonEngine completes async concurrent usage successfully")]
        public async Task ComparisonEngine_AsyncConcurrentUsage_CompletesSuccessfully()
        {
            var tasks = Enumerable.Range(0, 50)
                .Select(async i =>
                {
                    var expected = new Dictionary<string, object> { { "id", i }, { "name", $"Item{i}" } };
                    var actual = new Dictionary<string, object> { { "id", i }, { "name", $"Item{i}" } };

                    return await Expect.That(actual).ShouldMatchAsync(expected);
                })
                .ToArray();

            var results = await Task.WhenAll(tasks);

            Assert.That(results.All(result => result.IsSuccess), "All concurrent comparisons should succeed"); ;
        }

        private static Dictionary<string, object> CreateDeeplyNestedDictionary(int depth, string leafValue)
        {
            if (depth == 0) return new Dictionary<string, object> { { "leaf", leafValue } };

            return new Dictionary<string, object>
            {
                { "nested", CreateDeeplyNestedDictionary(depth - 1, leafValue) },
                { "level", depth }
            };
        }
    }

    [Test]
    [Description("Tests that multi-line string list comparison matches borough list with alternate format")]
    public void Compare_MultiLineStringList_BoroughList_ShouldMatch()
    {
        var expected = TestDataConstants.RealWorldExamples.BoroughList;
        var actual = TestDataConstants.RealWorldExamples.BoroughListAlternateFormat;

        var result = Expect.That(actual).ShouldMatch(expected);

        Assert.That(result.IsSuccess, Is.True);
        Assert.That(result.Error, Is.Null);
    }

    [Test]
    [Description("Tests that multi-line string list with extra whitespace matches expected list")]
    public void Compare_MultiLineStringList_WithExtraWhitespace_ShouldMatch()
    {
        var expected = TestDataConstants.RealWorldExamples.BoroughList;
        var actualWithWhitespace = """
                                   Bronx
                                   Brooklyn
                                   Manhattan
                                   Missing
                                   Queens
                                   Staten Island
                                   """;

        var result = Expect.That(actualWithWhitespace).ShouldMatch(expected);

        Assert.That(result.IsSuccess, Is.True);
    }

    [Test]
    [Description("Tests that multi-line string list with different order does not match")]
    public void Compare_MultiLineStringList_WithDifferentOrder_ShouldNotMatch()
    {
        var expected = TestDataConstants.RealWorldExamples.BoroughList;
        var actualDifferentOrder = """
                                   Brooklyn
                                   Bronx
                                   Manhattan
                                   Missing
                                   Queens
                                   Staten Island
                                   """;

        Expect.That(actualDifferentOrder).ShouldNotMatch(expected);
    }

    [Test]
    [Description("Tests that multi-line string list with missing items does not match")]
    public void Compare_MultiLineStringList_WithMissingItems_ShouldNotMatch()
    {
        var expected = TestDataConstants.RealWorldExamples.BoroughList;
        var actualMissing = """
                            Bronx
                            Brooklyn
                            Manhattan
                            Queens
                            Staten Island
                            """;

        Expect.That(actualMissing).ShouldNotMatch(expected);
    }

    [Test]
    [Description("Tests that string with JSON content should not parse nested JSON")]
    public void Compare_StringWithJsonContent_ShouldNotParseNestedJson()
    {
        var expected = """
                       { "metadata": {"nested": "json", "value": 123} }
                       """;
        var actual = """
                     { "metadata": {"nested": "json", "value": 123} }
                     """;

        var result = Expect.That(actual).ShouldMatch(expected);

        Assert.That(result.IsSuccess, Is.True);
    }

    [Test]
    [Description("Tests that Unicode and special characters match correctly")]
    public void Compare_UnicodeAndSpecialCharacters_ShouldMatch()
    {
        var expected = """
                       { "name": "Café München", "emoji": "🍕", "special": "line1\nline2\ttab", "unicode": "测试数据" }
                       """;
        var actual = """
                     { "name": "Café München", "emoji": "🍕", "special": "line1\nline2\ttab", "unicode": "测试数据" }
                     """;

        var result = Expect.That(actual).ShouldMatch(expected);
    }

    [Test]
    [Description("Tests that large dataset comparison completes in reasonable time")]
    public void Compare_LargeDataset_ShouldCompleteInReasonableTime()
    {
        var largeBoroughList = string.Join("\n",
            Enumerable.Range(0, 1000)
                .Select(i => $"Borough_{i:D4}")
                .ToArray());

        var stopwatch = Stopwatch.StartNew();

        Expect.That(largeBoroughList).ShouldMatch(largeBoroughList);
        stopwatch.Stop();

        Assert.That(stopwatch.ElapsedMilliseconds, Is.LessThan(5000)); // Should complete well before timeout;
    }

    [Test]
    [Description("Tests that deep nesting comparison completes in reasonable time")]
    public void Compare_DeepNesting_ShouldCompleteInReasonableTime()
    {
        var deeplyNested = new StringBuilder();
        deeplyNested.Append("{");
        for (var i = 0; i < 50; i++) deeplyNested.Append($"\"level{i}\": {{");

        deeplyNested.Append("\"value\": \"deep\"");
        for (var i = 0; i < 50; i++) deeplyNested.Append("}");

        deeplyNested.Append("}");

        var deepJson = deeplyNested.ToString();
        var stopwatch = Stopwatch.StartNew();

        Expect.That(deepJson).ShouldMatch(deepJson);
        stopwatch.Stop();

        Assert.That(stopwatch.ElapsedMilliseconds, Is.LessThan(5000)); // Should complete well before timeout;
    }

    [Test]
    [Description("Tests that comparison with null input is handled gracefully")]
    public void Compare_WithNullInput_ShouldHandleGracefully()
    {
        var result1 = Expect.That(null)
            .ShouldNotMatch(TestDataConstants.RealWorldExamples.BoroughList);

        Assert.That(result1.IsSuccess, Is.True);

        var result2 = Expect.That(null)
            .ShouldNotMatch(TestDataConstants.RealWorldExamples.TimeSeriesMetadata);

        Assert.That(result2.IsSuccess, Is.True); ;
    }

    [Test]
    [Description("Tests that comparison with empty input is handled gracefully")]
    public void Compare_WithEmptyInput_ShouldHandleGracefully()
    {
        var result1 = Expect.That("").ShouldNotMatch(TestDataConstants.RealWorldExamples.BoroughList);

        Assert.That(result1.IsSuccess, Is.True);

        var result2 = Expect.That(TestDataConstants.RealWorldExamples.TimeSeriesMetadata)
            .ShouldNotMatch("");
        Assert.That(result2.IsSuccess, Is.True);
    }

    [Test]
    [Description("Tests that comparison with malformed JSON is handled gracefully")]
    public void Compare_WithMalformedJson_ShouldHandleGracefully()
    {
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

        Expect.That(expected).ShouldNotMatch(malformedJson);
    }

    /// <summary>
    ///     Tests for numeric type compatibility across different numeric types.
    /// </summary>
    [TestFixture]
    public class NumericTypeCompatibilityTests
    {
        [Test]
        [Description("Tests that int and double with same value match")]
        public void Compare_IntVsDouble_SameValue_ShouldMatch()
        {
            int intValue = 42;
            double doubleValue = 42.0;

            Expect.That(intValue).ShouldMatch(doubleValue);
        }

        [Test]
        [Description("Tests that int and decimal with same value match")]
        public void Compare_IntVsDecimal_SameValue_ShouldMatch()
        {
            int intValue = 100;
            decimal decimalValue = 100m;

            Expect.That(intValue).ShouldMatch(decimalValue);
        }

        [Test]
        [Description("Tests that float and double with same value match")]
        public void Compare_FloatVsDouble_SameValue_ShouldMatch()
        {
            float floatValue = 3.14f;
            double doubleValue = 3.14;

            Expect.That(floatValue).ShouldMatch(doubleValue);
        }

        [Test]
        [Description("Tests that long and int with same value match")]
        public void Compare_LongVsInt_SameValue_ShouldMatch()
        {
            long longValue = 500L;
            int intValue = 500;

            Expect.That(longValue).ShouldMatch(intValue);
        }

        [Test]
        [Description("Tests that unsigned and signed integers with same value match")]
        public void Compare_UnsignedVsSigned_SameValue_ShouldMatch()
        {
            uint uintValue = 255u;
            int intValue = 255;

            Expect.That(uintValue).ShouldMatch(intValue);
        }

        [Test]
        [Description("Tests that byte and int with same value match")]
        public void Compare_ByteVsInt_SameValue_ShouldMatch()
        {
            byte byteValue = 10;
            int intValue = 10;

            Expect.That(byteValue).ShouldMatch(intValue);
        }

        [Test]
        [Description("Tests that short and int with same value match")]
        public void Compare_ShortVsInt_SameValue_ShouldMatch()
        {
            short shortValue = 1000;
            int intValue = 1000;

            Expect.That(shortValue).ShouldMatch(intValue);
        }

        [Test]
        [Description("Tests that different numeric values don't match even with compatible types")]
        public void Compare_DifferentNumericValues_ShouldNotMatch()
        {
            int intValue = 42;
            double doubleValue = 42.5;

            Expect.That(intValue).ShouldNotMatch(doubleValue);
        }

        [Test]
        [Description("Tests that very large numbers are compared correctly")]
        public void Compare_VeryLargeNumbers_ShouldCompareCorrectly()
        {
            long largeValue1 = long.MaxValue;
            long largeValue2 = long.MaxValue;

            Expect.That(largeValue1).ShouldMatch(largeValue2);
        }

        [Test]
        [Description("Tests that very small decimal values are compared correctly")]
        public void Compare_VerySmallDecimals_ShouldCompareCorrectly()
        {
            decimal small1 = 0.000001m;
            decimal small2 = 0.000001m;

            Expect.That(small1).ShouldMatch(small2);
        }

        [Test]
        [Description("Tests that negative numbers are compared correctly across types")]
        public void Compare_NegativeNumbers_ShouldCompareCorrectly()
        {
            int intValue = -50;
            double doubleValue = -50.0;

            Expect.That(intValue).ShouldMatch(doubleValue);
        }

        [Test]
        [Description("Tests that zero values match across different numeric types")]
        public void Compare_ZeroValues_ShouldMatch()
        {
            int zero1 = 0;
            double zero2 = 0.0;
            decimal zero3 = 0m;

            Expect.That(zero1).ShouldMatch(zero2);
            Expect.That(zero2).ShouldMatch(zero3);
            Expect.That(zero1).ShouldMatch(zero3);
        }
    }

    /// <summary>
    ///     Tests for DateTime and DateTimeOffset comparisons.
    /// </summary>
    [TestFixture]
    public class DateTimeComparisonTests
    {
        [Test]
        [Description("Tests that identical DateTime values match")]
        public void Compare_IdenticalDateTimes_ShouldMatch()
        {
            var date1 = new DateTime(2024, 6, 15, 10, 30, 0, DateTimeKind.Utc);
            var date2 = new DateTime(2024, 6, 15, 10, 30, 0, DateTimeKind.Utc);

            Expect.That(date1).ShouldMatch(date2);
        }

        [Test]
        [Description("Tests that DateTimeOffset values are compared correctly")]
        public void Compare_DateTimeOffset_ShouldMatch()
        {
            var offset1 = new DateTimeOffset(2024, 6, 15, 10, 30, 0, TimeSpan.Zero);
            var offset2 = new DateTimeOffset(2024, 6, 15, 10, 30, 0, TimeSpan.Zero);

            Expect.That(offset1).ShouldMatch(offset2);
        }

        [Test]
        [Description("Tests that different DateTime values don't match")]
        public void Compare_DifferentDateTimes_ShouldNotMatch()
        {
            var date1 = new DateTime(2024, 6, 15, 10, 30, 0);
            var date2 = new DateTime(2024, 6, 15, 10, 31, 0);

            Expect.That(date1).ShouldNotMatch(date2);
        }
    }

    /// <summary>
    ///     Tests for Guid comparisons.
    /// </summary>
    [TestFixture]
    public class GuidComparisonTests
    {
        [Test]
        [Description("Tests that identical Guid values match")]
        public void Compare_IdenticalGuids_ShouldMatch()
        {
            var guid = Guid.Parse("12345678-1234-1234-1234-123456789012");
            var guid2 = Guid.Parse("12345678-1234-1234-1234-123456789012");

            Expect.That(guid).ShouldMatch(guid2);
        }

        [Test]
        [Description("Tests that different Guid values don't match")]
        public void Compare_DifferentGuids_ShouldNotMatch()
        {
            var guid1 = Guid.NewGuid();
            var guid2 = Guid.NewGuid();

            Expect.That(guid1).ShouldNotMatch(guid2);
        }

        [Test]
        [Description("Tests that Guid matches its string representation")]
        public void Compare_GuidVsString_ShouldMatch()
        {
            var guid = Guid.Parse("12345678-1234-1234-1234-123456789012");
            var guidString = "12345678-1234-1234-1234-123456789012";

            Expect.That(guid).ShouldMatch(guidString);
        }
    }

    /// <summary>
    ///     Tests for array ellipsis edge cases.
    /// </summary>
    [TestFixture]
    public class ArrayEllipsisEdgeCaseTests
    {
        [Test]
        [Description("Tests that ellipsis at the beginning of array matches correctly")]
        public void Compare_EllipsisAtBeginning_ShouldMatch()
        {
            var expected = new object[] { "...", "b", "c" };
            var actual = new object[] { "x", "y", "z", "b", "c" };

            Expect.That(actual).WithOrderedSort().ShouldMatch(expected);
        }

        [Test]
        [Description("Tests that ellipsis in the middle of array matches correctly")]
        public void Compare_EllipsisInMiddle_ShouldMatch()
        {
            var expected = new object[] { "a", "...", "c" };
            var actual = new object[] { "a", "b1", "b2", "b3", "c" };

            Expect.That(actual).WithOrderedSort().ShouldMatch(expected);
        }

        [Test]
        [Description("Tests that ellipsis at the end of array matches correctly")]
        public void Compare_EllipsisAtEnd_ShouldMatch()
        {
            var expected = new object[] { "a", "b", "..." };
            var actual = new object[] { "a", "b", "c", "d", "e" };

            Expect.That(actual).WithOrderedSort().ShouldMatch(expected);
        }

        [Test]
        [Description("Tests that multiple ellipsis elements in array match correctly")]
        public void Compare_MultipleEllipsis_ShouldMatch()
        {
            var expected = new object[] { "a", "...", "c", "...", "e" };
            var actual = new object[] { "a", "b1", "b2", "c", "d1", "d2", "e" };

            Expect.That(actual).WithOrderedSort().ShouldMatch(expected);
        }

        [Test]
        [Description("Tests that ellipsis can match zero elements")]
        public void Compare_EllipsisMatchesZeroElements_ShouldMatch()
        {
            var expected = new object[] { "a", "...", "b" };
            var actual = new object[] { "a", "b" };

            Expect.That(actual).WithOrderedSort().ShouldMatch(expected);
        }

        [Test]
        [Description("Tests that array with only ellipsis matches any array")]
        public void Compare_OnlyEllipsis_ShouldMatchAnyArray()
        {
            var expected = new object[] { "..." };
            var actual = new object[] { "a", "b", "c", 1, 2, 3 };

            Expect.That(actual).ShouldMatch(expected);
        }

        [Test]
        [Description("Tests that empty array with ellipsis pattern matches empty array")]
        public void Compare_EmptyArrayWithEllipsis_ShouldMatchEmpty()
        {
            var expected = new object[] { "..." };
            var actual = Array.Empty<object>();

            Expect.That(actual).ShouldMatch(expected);
        }
    }

    /// <summary>
    ///     Tests for timeout handling in comparisons.
    /// </summary>
    [TestFixture]
    public class TimeoutTests
    {
        [Test]
        [Description("Tests that custom timeout setting is respected")]
        public void Compare_WithCustomTimeout_ShouldRespectTimeout()
        {
            var options = new ComparisonOptions { TimeoutSeconds = 60 };
            var expected = new Dictionary<string, object> { { "name", "test" } };
            var actual = new Dictionary<string, object> { { "name", "test" } };

            var result = ComparisonEngine.Compare(expected, actual, options);

            Assert.That(result.IsSuccess, Is.True);
        }

        [Test]
        [Description("Tests that very short timeout doesn't cause immediate failure for simple comparisons")]
        public void Compare_WithVeryShortTimeout_SimpleComparison_ShouldComplete()
        {
            var options = new ComparisonOptions { TimeoutSeconds = 1 };
            var expected = "test";
            var actual = "test";

            var result = ComparisonEngine.Compare(expected, actual, options);

            Assert.That(result.IsSuccess, Is.True);
        }
    }

    /// <summary>
    ///     Tests for error message quality and path information.
    /// </summary>
    [TestFixture]
    public class ErrorMessageTests
    {
        [Test]
        [Description("Tests that error message contains correct path for nested object mismatch")]
        public void Compare_NestedMismatch_ErrorContainsCorrectPath()
        {
            var expected = new Dictionary<string, object>
            {
                {
                    "user", new Dictionary<string, object>
                    {
                        { "profile", new Dictionary<string, object> { { "name", "Alice" } } }
                    }
                }
            };
            var actual = new Dictionary<string, object>
            {
                {
                    "user", new Dictionary<string, object>
                    {
                        { "profile", new Dictionary<string, object> { { "name", "Bob" } } }
                    }
                }
            };

            var result = ComparisonEngine.Compare(expected, actual);

            Assert.That(result.IsSuccess, Is.False);
            if (result is ComparisonError error)
            {
                Assert.That(error.Path, Does.Contain("user"));
                Assert.That(error.Path, Does.Contain("profile"));
                Assert.That(error.Path, Does.Contain("name"));
            }
        }

        [Test]
        [Description("Tests that error message for missing property is clear")]
        public void Compare_MissingProperty_ErrorMessageIsClear()
        {
            var expected = new Dictionary<string, object> { { "name", "Alice" }, { "age", 25 } };
            var actual = new Dictionary<string, object> { { "name", "Alice" } };

            var result = ComparisonEngine.Compare(expected, actual);

            Assert.That(result.IsSuccess, Is.False);
            if (result is ComparisonError error)
            {
                Assert.That(error.Message, Does.Contain("missing"));
            }
        }

        [Test]
        [Description("Tests that error message for extra property is clear")]
        public void Compare_ExtraProperty_ErrorMessageIsClear()
        {
            var expected = new Dictionary<string, object> { { "name", "Alice" } };
            var actual = new Dictionary<string, object> { { "name", "Alice" }, { "age", 25 } };

            var result = ComparisonEngine.Compare(expected, actual);

            Assert.That(result.IsSuccess, Is.False);
            if (result is ComparisonError error)
            {
                Assert.That(error.Message, Does.Contain("Extra").Or.Contains("unexpected"));
            }
        }

        [Test]
        [Description("Tests that error message for array length mismatch is clear")]
        public void Compare_ArrayLengthMismatch_ErrorMessageIsClear()
        {
            var expected = new object[] { "a", "b" };
            var actual = new object[] { "a", "b", "c" };

            var result = ComparisonEngine.Compare(expected, actual);

            Assert.That(result.IsSuccess, Is.False);
            if (result is ComparisonError error)
            {
                Assert.That(error.Message, Does.Contain("length").IgnoreCase);
            }
        }
    }

    /// <summary>
    ///     Tests for ExpectBuilder API validation and state management.
    /// </summary>
    [TestFixture]
    public class ExpectBuilderApiTests
    {
        [Test]
        [Description("Tests that calling ShouldMatch twice works correctly")]
        public void ExpectBuilder_ShouldMatchTwice_ShouldWork()
        {
            var actual = new Dictionary<string, object> { { "name", "test" } };
            var expected = new Dictionary<string, object> { { "name", "test" } };

            var result1 = Expect.That(actual).ShouldMatch(expected);
            var result2 = Expect.That(actual).ShouldMatch(expected);

            Assert.That(result1.IsSuccess, Is.True);
            Assert.That(result2.IsSuccess, Is.True);
        }

        [Test]
        [Description("Tests that WithOrderedSort can be called before ShouldMatch")]
        public void ExpectBuilder_WithOrderedSortBeforeShouldMatch_ShouldWork()
        {
            var actual = new object[] { "a", "b", "c" };
            var expected = new object[] { "a", "b", "c" };

            var result = Expect.That(actual).WithOrderedSort().ShouldMatch(expected);

            Assert.That(result.IsSuccess, Is.True);
        }

        [Test]
        [Description("Tests that WithUnorderedSort can be called before ShouldMatch")]
        public void ExpectBuilder_WithUnorderedSortBeforeShouldMatch_ShouldWork()
        {
            var actual = new object[] { "c", "a", "b" };
            var expected = new object[] { "a", "b", "c" };

            var result = Expect.That(actual).WithUnorderedSort().ShouldMatch(expected);

            Assert.That(result.IsSuccess, Is.True);
        }

        [Test]
        [Description("Tests that WithIgnoredFields can be called before ShouldMatch")]
        public void ExpectBuilder_WithIgnoredFieldsBeforeShouldMatch_ShouldWork()
        {
            var actual = new Dictionary<string, object> { { "name", "test" }, { "_id", "123" } };
            var expected = new Dictionary<string, object> { { "name", "test" }, { "_id", "456" } };

            var result = Expect.That(actual).WithIgnoredFields("_id").ShouldMatch(expected);

            Assert.That(result.IsSuccess, Is.True);
        }

        [Test]
        [Description("Tests that multiple configuration methods can be chained")]
        public void ExpectBuilder_MultipleChainedMethods_ShouldWork()
        {
            var actual = new object[]
            {
                new Dictionary<string, object> { { "name", "Bob" }, { "_id", "2" } },
                new Dictionary<string, object> { { "name", "Alice" }, { "_id", "1" } }
            };
            var expected = new object[]
            {
                new Dictionary<string, object> { { "name", "Alice" }, { "_id", "999" } },
                new Dictionary<string, object> { { "name", "Bob" }, { "_id", "888" } }
            };

            var result = Expect.That(actual)
                .WithUnorderedSort()
                .WithIgnoredFields("_id")
                .ShouldMatch(expected);

            Assert.That(result.IsSuccess, Is.True);
        }
    }

    /// <summary>
    ///     Tests for ordered array comparison with special cases.
    /// </summary>
    [TestFixture]
    public class OrderedArraySpecialCaseTests
    {
        [Test]
        [Description("Tests that ordered comparison with single element works")]
        public void Compare_OrderedSingleElement_ShouldMatch()
        {
            var actual = new object[] { "only" };
            var expected = new object[] { "only" };

            Expect.That(actual).WithOrderedSort().ShouldMatch(expected);
        }

        [Test]
        [Description("Tests that ordered comparison with duplicates works")]
        public void Compare_OrderedWithDuplicates_ShouldMatch()
        {
            var actual = new object[] { "a", "a", "b", "b" };
            var expected = new object[] { "a", "a", "b", "b" };

            Expect.That(actual).WithOrderedSort().ShouldMatch(expected);
        }

        [Test]
        [Description("Tests that ordered comparison with duplicates in different order fails")]
        public void Compare_OrderedWithDuplicatesDifferentOrder_ShouldNotMatch()
        {
            var actual = new object[] { "a", "b", "a", "b" };
            var expected = new object[] { "a", "a", "b", "b" };

            Expect.That(actual).WithOrderedSort().ShouldNotMatch(expected);
        }
    }

    /// <summary>
    ///     Tests for ignored fields edge cases.
    /// </summary>
    [TestFixture]
    public class IgnoredFieldsEdgeCaseTests
    {
        [Test]
        [Description("Tests that ignoring non-existent field doesn't cause errors")]
        public void Compare_IgnoreNonExistentField_ShouldWork()
        {
            var actual = new Dictionary<string, object> { { "name", "test" } };
            var expected = new Dictionary<string, object> { { "name", "test" } };

            var result = Expect.That(actual).WithIgnoredFields("nonExistent").ShouldMatch(expected);

            Assert.That(result.IsSuccess, Is.True);
        }

        [Test]
        [Description("Tests that ignored field names are case-sensitive")]
        public void Compare_IgnoredFieldsCaseSensitive_ShouldValidateDifferentCase()
        {
            var actual = new Dictionary<string, object> { { "Name", "test" }, { "name", "test2" } };
            var expected = new Dictionary<string, object> { { "Name", "different" }, { "name", "test2" } };

            // Ignoring "name" (lowercase) should not ignore "Name" (uppercase)
            var result = Expect.That(actual).WithIgnoredFields("name").ShouldNotMatch(expected);

            Assert.That(result.IsSuccess, Is.True);
        }

        [Test]
        [Description("Tests that multiple ignored fields can be specified")]
        public void Compare_MultipleIgnoredFields_ShouldIgnoreAll()
        {
            var actual = new Dictionary<string, object>
            {
                { "name", "test" },
                { "_id", "123" },
                { "createdAt", "2024-01-01" },
                { "updatedAt", "2024-01-02" }
            };
            var expected = new Dictionary<string, object>
            {
                { "name", "test" },
                { "_id", "999" },
                { "createdAt", "2024-02-01" },
                { "updatedAt", "2024-02-02" }
            };

            var result = Expect.That(actual)
                .WithIgnoredFields("_id", "createdAt", "updatedAt")
                .ShouldMatch(expected);

            Assert.That(result.IsSuccess, Is.True);
        }

        [Test]
        [Description("Tests that ignored fields work in arrays of objects")]
        public void Compare_IgnoredFieldsInArrays_ShouldIgnoreInAllElements()
        {
            var actual = new object[]
            {
                new Dictionary<string, object> { { "name", "Alice" }, { "_id", "1" } },
                new Dictionary<string, object> { { "name", "Bob" }, { "_id", "2" } }
            };
            var expected = new object[]
            {
                new Dictionary<string, object> { { "name", "Alice" }, { "_id", "999" } },
                new Dictionary<string, object> { { "name", "Bob" }, { "_id", "888" } }
            };

            var result = Expect.That(actual)
                .WithOrderedSort()
                .WithIgnoredFields("_id")
                .ShouldMatch(expected);

            Assert.That(result.IsSuccess, Is.True);
        }
    }

    /// <summary>
    ///     Tests for string pattern matching edge cases.
    /// </summary>
    [TestFixture]
    public class StringPatternEdgeCaseTests
    {
        [Test]
        [Description("Tests that string containing ellipsis in the middle is treated as literal")]
        public void Compare_StringWithEllipsisInMiddle_ShouldTreatAsLiteral()
        {
            var actual = "before...after";
            var expected = "before...after";

            Expect.That(actual).ShouldMatch(expected);
        }

        [Test]
        [Description("Tests that truncated pattern with only ellipsis doesn't match")]
        public void Compare_OnlyEllipsisAsString_ShouldMatchAnything()
        {
            var actual = "anything";
            var expected = "...";

            Expect.That(actual).ShouldMatch(expected);
        }

        [Test]
        [Description("Tests that empty string with truncated pattern works")]
        public void Compare_EmptyStringVsTruncatedPattern_ShouldNotMatch()
        {
            var actual = "";
            var expected = "test...";

            Expect.That(actual).ShouldNotMatch(expected);
        }

        [Test]
        [Description("Tests that truncated pattern must match prefix exactly")]
        public void Compare_TruncatedPatternCaseSensitive_ShouldNotMatch()
        {
            var actual = "hello world";
            var expected = "Hello..."; // Different case

            Expect.That(actual).ShouldNotMatch(expected);
        }

        [Test]
        [Description("Tests that multiple dots but not exactly three are treated as literal")]
        public void Compare_MultipleDots_ShouldTreatAsLiteral()
        {
            var actual = "test...."; // 4 dots
            var expected = "test...."; // 4 dots

            Expect.That(actual).ShouldMatch(expected);
        }

        [Test]
        [Description("Tests that string ending with exactly three dots but with text before matches truncated pattern")]
        public void Compare_ValidTruncatedPattern_ShouldMatch()
        {
            var actual = "This is a long message that gets truncated";
            var expected = "This is a long...";

            Expect.That(actual).ShouldMatch(expected);
        }
    }

    /// <summary>
    ///     Tests for property order independence in objects.
    /// </summary>
    [TestFixture]
    public class PropertyOrderTests
    {
        [Test]
        [Description("Tests that property order doesn't matter in objects")]
        public void Compare_DifferentPropertyOrder_ShouldMatch()
        {
            var actual = new Dictionary<string, object>
            {
                { "name", "Alice" },
                { "age", 25 },
                { "city", "NYC" }
            };
            var expected = new Dictionary<string, object>
            {
                { "city", "NYC" },
                { "name", "Alice" },
                { "age", 25 }
            };

            Expect.That(actual).ShouldMatch(expected);
        }

        [Test]
        [Description("Tests that property order doesn't matter in nested objects")]
        public void Compare_DifferentPropertyOrderNested_ShouldMatch()
        {
            var actual = new Dictionary<string, object>
            {
                {
                    "user", new Dictionary<string, object>
                    {
                        { "name", "Alice" },
                        { "age", 25 }
                    }
                }
            };
            var expected = new Dictionary<string, object>
            {
                {
                    "user", new Dictionary<string, object>
                    {
                        { "age", 25 },
                        { "name", "Alice" }
                    }
                }
            };

            Expect.That(actual).ShouldMatch(expected);
        }
    }

    /// <summary>
    ///     Tests for mixed type edge cases.
    /// </summary>
    [TestFixture]
    public class MixedTypeEdgeCaseTests
    {
        [Test]
        [Description("Tests that array with null and objects compares correctly")]
        public void Compare_ArrayWithNullAndObjects_ShouldCompareCorrectly()
        {
            var actual = new object?[]
            {
                null,
                new Dictionary<string, object> { { "name", "test" } },
                null
            };
            var expected = new object?[]
            {
                null,
                new Dictionary<string, object> { { "name", "test" } },
                null
            };

            Expect.That(actual).WithOrderedSort().ShouldMatch(expected);
        }

        [Test]
        [Description("Tests that array with mixed numeric types compares correctly")]
        public void Compare_ArrayWithMixedNumericTypes_ShouldCompareCorrectly()
        {
            var actual = new object[] { 1, 2.0, 3L, 4.0f };
            var expected = new object[] { 1.0, 2, 3.0, 4L };

            Expect.That(actual).ShouldMatch(expected);
        }

        [Test]
        [Description("Tests that array with all primitive types works")]
        public void Compare_ArrayWithAllPrimitiveTypes_ShouldWork()
        {
            var actual = new object[] { "string", 123, true, 45.6, null! };
            var expected = new object[] { 123, null!, "string", 45.6, true };

            Expect.That(actual).ShouldMatch(expected);
        }
    }

    /// <summary>
    ///     Tests for global ellipsis inheritance in nested structures.
    /// </summary>
    [TestFixture]
    public class GlobalEllipsisInheritanceTests
    {
        [Test]
        [Description("Tests that global ellipsis propagates to nested objects")]
        public void Compare_GlobalEllipsisInNestedObjects_ShouldPropagate()
        {
            var expected = new Dictionary<string, object>
            {
                {
                    "user", new Dictionary<string, object>
                    {
                        { "name", "Alice" }
                    }
                },
                { "...", "..." }
            };
            var actual = new Dictionary<string, object>
            {
                {
                    "user", new Dictionary<string, object>
                    {
                        { "name", "Alice" },
                        { "extra", "field" } // Should be allowed due to global ellipsis
                    }
                },
                { "otherField", "value" }
            };

            Expect.That(actual).ShouldMatch(expected);
        }

        [Test]
        [Description("Tests that global ellipsis doesn't affect required fields")]
        public void Compare_GlobalEllipsisStillValidatesRequiredFields_ShouldFail()
        {
            var expected = new Dictionary<string, object>
            {
                { "name", "Alice" },
                { "age", 25 },
                { "...", "..." }
            };
            var actual = new Dictionary<string, object>
            {
                { "name", "Bob" }, // Different value - should fail
                { "age", 25 },
                { "city", "NYC" }
            };

            Expect.That(actual).ShouldNotMatch(expected);
        }

        [Test]
        [Description("Tests that global ellipsis combined with ignored fields works")]
        public void Compare_GlobalEllipsisWithIgnoredFields_ShouldWork()
        {
            var expected = new Dictionary<string, object>
            {
                { "name", "Alice" },
                { "_id", "123" },
                { "...", "..." }
            };
            var actual = new Dictionary<string, object>
            {
                { "name", "Alice" },
                { "_id", "999" },
                { "extra1", "field1" },
                { "extra2", "field2" }
            };

            var result = Expect.That(actual)
                .WithIgnoredFields("_id")
                .ShouldMatch(expected);

            Assert.That(result.IsSuccess, Is.True);
        }
    }

    /// <summary>
    ///     Tests for JSON parsing and string-to-object comparisons.
    /// </summary>
    [TestFixture]
    public class JsonParsingTests
    {
        [Test]
        [Description("Tests that JSON strings with different formatting match")]
        public void Compare_JsonDifferentFormatting_ShouldMatch()
        {
            var actual = """{"name":"Alice","age":25}""";
            var expected = """
                           {
                             "name": "Alice",
                             "age": 25
                           }
                           """;

            Expect.That(actual).ShouldMatch(expected);
        }

        [Test]
        [Description("Tests that JSON string matches object")]
        public void Compare_JsonStringVsObject_ShouldMatch()
        {
            var actual = new Dictionary<string, object> { { "name", "Alice" }, { "age", 25 } };
            var expected = """{"name": "Alice", "age": 25}""";

            Expect.That(actual).ShouldMatch(expected);
        }

        [Test]
        [Description("Tests that nested JSON is parsed correctly")]
        public void Compare_NestedJson_ShouldParseCorrectly()
        {
            var actual = """
                         {
                           "user": {
                             "profile": {
                               "name": "Alice"
                             }
                           }
                         }
                         """;
            var expected = new Dictionary<string, object>
            {
                {
                    "user", new Dictionary<string, object>
                    {
                        {
                            "profile", new Dictionary<string, object>
                            {
                                { "name", "Alice" }
                            }
                        }
                    }
                }
            };

            Expect.That(actual).ShouldMatch(expected);
        }

        [Test]
        [Description("Tests that JSON with special characters is handled correctly")]
        public void Compare_JsonWithSpecialCharacters_ShouldHandle()
        {
            var actual = """{"message": "Line1\nLine2\tTabbed"}""";
            var expected = new Dictionary<string, object> { { "message", "Line1\nLine2\tTabbed" } };

            Expect.That(actual).ShouldMatch(expected);
        }

        [Test]
        [Description("Tests that JSON array is parsed correctly")]
        public void Compare_JsonArray_ShouldParse()
        {
            var actual = """["a", "b", "c"]""";
            var expected = new object[] { "a", "b", "c" };

            Expect.That(actual).ShouldMatch(expected);
        }
    }

    /// <summary>
    ///     Tests for additional BSON type comparisons.
    /// </summary>
    [TestFixture]
    public class AdditionalBsonTypeTests
    {
        [Test]
        [Description("Tests that BsonDocument can be compared")]
        public void Compare_BsonDocument_ShouldCompare()
        {
            var bsonDoc1 = new BsonDocument { { "name", "Alice" }, { "age", 25 } };
            var bsonDoc2 = new BsonDocument { { "name", "Alice" }, { "age", 25 } };

            Expect.That(bsonDoc1).ShouldMatch(bsonDoc2);
        }

        [Test]
        [Description("Tests that BsonArray can be compared")]
        public void Compare_BsonArray_ShouldCompare()
        {
            var bsonArray1 = new BsonArray { "a", "b", "c" };
            var bsonArray2 = new BsonArray { "a", "b", "c" };

            Expect.That(bsonArray1).ShouldMatch(bsonArray2);
        }

        [Test]
        [Description("Tests that BsonString matches regular string")]
        public void Compare_BsonStringVsString_ShouldMatch()
        {
            var bsonString = new BsonString("test");
            var regularString = "test";

            Expect.That(bsonString).ShouldMatch(regularString);
        }

        [Test]
        [Description("Tests that BsonInt32 matches regular int")]
        public void Compare_BsonInt32VsInt_ShouldMatch()
        {
            var bsonInt = new BsonInt32(42);
            var regularInt = 42;

            Expect.That(bsonInt).ShouldMatch(regularInt);
        }

        [Test]
        [Description("Tests that BsonBoolean matches regular bool")]
        public void Compare_BsonBooleanVsBool_ShouldMatch()
        {
            var bsonBool = new BsonBoolean(true);
            var regularBool = true;

            Expect.That(bsonBool).ShouldMatch(regularBool);
        }

        [Test]
        [Description("Tests that BsonNull matches null")]
        public void Compare_BsonNullVsNull_ShouldMatch()
        {
            var bsonNull = BsonNull.Value;
            object? regularNull = null;

            Expect.That(bsonNull).ShouldMatch(regularNull);
        }
    }

    /// <summary>
    ///     Tests for async operation edge cases.
    /// </summary>
    [TestFixture]
    public class AsyncEdgeCaseTests
    {
        [Test]
        [Description("Tests that multiple async operations can run concurrently without interference")]
        public async Task CompareAsync_MultipleConcurrentOperations_NoInterference()
        {
            var tasks = new List<Task<ComparisonResult>>();

            for (int i = 0; i < 10; i++)
            {
                var index = i;
                tasks.Add(Task.Run(async () =>
                {
                    var expected = new Dictionary<string, object> { { "id", index }, { "value", $"test{index}" } };
                    var actual = new Dictionary<string, object> { { "id", index }, { "value", $"test{index}" } };
                    return await Expect.That(actual).ShouldMatchAsync(expected);
                }));
            }

            var results = await Task.WhenAll(tasks);

            Assert.That(results.All(r => r.IsSuccess), Is.True);
        }

        [Test]
        [Description("Tests that cancellation during async comparison works correctly")]
        public async Task CompareAsync_CancellationDuringOperation_ShouldThrow()
        {
            using var cts = new CancellationTokenSource();
            var expected = new Dictionary<string, object> { { "name", "test" } };
            var actual = new Dictionary<string, object> { { "name", "test" } };

            var task = Expect.That(actual).ShouldMatchAsync(expected, cts.Token);
            cts.Cancel();

            try
            {
                await task;
                Assert.Fail("Expected OperationCanceledException");
            }
            catch (OperationCanceledException)
            {
                // Expected
                Assert.Pass();
            }
        }

        [Test]
        [Description("Tests that async comparison with large data completes successfully")]
        public async Task CompareAsync_LargeData_ShouldComplete()
        {
            var largeArray = Enumerable.Range(0, 1000)
                .Select(i => new Dictionary<string, object> { { "id", i }, { "value", $"item{i}" } })
                .Cast<object>()
                .ToArray();

            var result = await Expect.That(largeArray).ShouldMatchAsync(largeArray);

            Assert.That(result.IsSuccess, Is.True);
        }
    }

    /// <summary>
    ///     Tests for numeric precision and edge cases.
    /// </summary>
    [TestFixture]
    public class NumericPrecisionTests
    {
        [Test]
        [Description("Tests that decimal precision is maintained in comparisons")]
        public void Compare_DecimalPrecision_ShouldMaintain()
        {
            decimal value1 = 0.123456789012345678901234567890m;
            decimal value2 = 0.123456789012345678901234567890m;

            Expect.That(value1).ShouldMatch(value2);
        }

        [Test]
        [Description("Tests that very small differences in decimals are detected")]
        public void Compare_SmallDecimalDifference_ShouldDetect()
        {
            decimal value1 = 0.1234567890123456789m;
            decimal value2 = 0.1234567890123456788m; // Different in last digit

            Expect.That(value1).ShouldNotMatch(value2);
        }

        [Test]
        [Description("Tests that negative zero equals positive zero")]
        public void Compare_NegativeZeroVsPositiveZero_ShouldMatch()
        {
            double negativeZero = -0.0;
            double positiveZero = 0.0;

            Expect.That(negativeZero).ShouldMatch(positiveZero);
        }

        [Test]
        [Description("Tests that max values for different types compare correctly")]
        public void Compare_MaxValues_ShouldCompareCorrectly()
        {
            int maxInt = int.MaxValue;
            long maxIntAsLong = int.MaxValue;

            Expect.That(maxInt).ShouldMatch(maxIntAsLong);
        }

        [Test]
        [Description("Tests that min values for different types compare correctly")]
        public void Compare_MinValues_ShouldCompareCorrectly()
        {
            int minInt = int.MinValue;
            long minIntAsLong = int.MinValue;

            Expect.That(minInt).ShouldMatch(minIntAsLong);
        }
    }

    /// <summary>
    ///     Tests for ComparisonException handling.
    /// </summary>
    [TestFixture]
    public class ComparisonExceptionTests
    {
        [Test]
        [Description("Tests that ComparisonException can be created with message")]
        public void ComparisonException_WithMessage_ShouldCreate()
        {
            var exception = new ComparisonException("Test message");

            Assert.That(exception.Message, Is.EqualTo("Test message"));
        }

        [Test]
        [Description("Tests that ComparisonException can be created with details")]
        public void ComparisonException_WithDetails_ShouldCreate()
        {
            var error = new ComparisonError("$.path", "expected", "actual", "Test error");
            var exception = new ComparisonException("Test message", error);

            Assert.That(exception.Message, Is.EqualTo("Test message"));
            Assert.That(exception.Details, Is.EqualTo(error));
        }

        [Test]
        [Description("Tests that ComparisonException default constructor works")]
        public void ComparisonException_DefaultConstructor_ShouldWork()
        {
            var exception = new ComparisonException();

            Assert.That(exception, Is.Not.Null);
        }
    }

    /// <summary>
    ///     Tests for type mismatch scenarios.
    /// </summary>
    [TestFixture]
    public class TypeMismatchValidationTests
    {
        [Test]
        [Description("Tests that bool vs string returns type mismatch")]
        public void Compare_BoolVsString_ShouldReturnTypeMismatch()
        {
            var result = Expect.That(true).ShouldNotMatch("true");

            Assert.That(result.IsSuccess, Is.True);
        }

        [Test]
        [Description("Tests that number vs string returns type mismatch")]
        public void Compare_NumberVsString_ShouldReturnTypeMismatch()
        {
            var result = Expect.That(123).ShouldNotMatch("123");

            Assert.That(result.IsSuccess, Is.True);
        }

        [Test]
        [Description("Tests that null vs empty string are different")]
        public void Compare_NullVsEmptyString_ShouldBeDifferent()
        {
            var result = Expect.That(null).ShouldNotMatch("");

            Assert.That(result.IsSuccess, Is.True);
        }

        [Test]
        [Description("Tests that array vs primitive returns type mismatch")]
        public void Compare_ArrayVsPrimitive_ShouldReturnTypeMismatch()
        {
            var array = new object[] { "test" };
            var primitive = "test";

            var result = Expect.That(array).ShouldNotMatch(primitive);

            Assert.That(result.IsSuccess, Is.True);
        }

        [Test]
        [Description("Tests that object vs primitive returns type mismatch")]
        public void Compare_ObjectVsPrimitive_ShouldReturnTypeMismatch()
        {
            var obj = new Dictionary<string, object> { { "key", "value" } };
            var primitive = "value";

            var result = Expect.That(obj).ShouldNotMatch(primitive);

            Assert.That(result.IsSuccess, Is.True);
        }

        [Test]
        [Description("Tests that DateTime vs string with different format fails")]
        public void Compare_DateTimeVsWrongFormatString_ShouldFail()
        {
            var dateTime = new DateTime(2024, 1, 1, 12, 0, 0, DateTimeKind.Utc);
            var wrongFormat = "2024-01-01"; // Missing time

            var result = Expect.That(dateTime).ShouldNotMatch(wrongFormat);

            Assert.That(result.IsSuccess, Is.True);
        }
    }

    /// <summary>
    ///     Tests for collection type compatibility.
    /// </summary>
    [TestFixture]
    public class CollectionTypeTests
    {
        [Test]
        [Description("Tests that List matches array with same elements")]
        public void Compare_ListVsArray_ShouldMatch()
        {
            var list = new List<object> { "a", "b", "c" };
            var array = new object[] { "a", "b", "c" };

            Expect.That(list).ShouldMatch(array);
        }

        [Test]
        [Description("Tests that IEnumerable matches array")]
        public void Compare_IEnumerableVsArray_ShouldMatch()
        {
            IEnumerable<object> enumerable = new List<object> { 1, 2, 3 };
            var array = new object[] { 1, 2, 3 };

            Expect.That(enumerable).ShouldMatch(array);
        }

        [Test]
        [Description("Tests that array of int matches object array")]
        public void Compare_IntArrayVsObjectArray_ShouldMatch()
        {
            var intArray = new int[] { 1, 2, 3 };
            var objectArray = new object[] { 1, 2, 3 };

            Expect.That(intArray).ShouldMatch(objectArray);
        }

        [Test]
        [Description("Tests that string array matches object array")]
        public void Compare_StringArrayVsObjectArray_ShouldMatch()
        {
            var stringArray = new string[] { "a", "b", "c" };
            var objectArray = new object[] { "a", "b", "c" };

            Expect.That(stringArray).ShouldMatch(objectArray);
        }
    }

    /// <summary>
    ///     Tests for edge cases with special values.
    /// </summary>
    [TestFixture]
    public class SpecialValueTests
    {
        [Test]
        [Description("Tests that whitespace-only strings are compared correctly")]
        public void Compare_WhitespaceStrings_ShouldCompare()
        {
            var whitespace1 = "   ";
            var whitespace2 = "   ";

            Expect.That(whitespace1).ShouldMatch(whitespace2);
        }

        [Test]
        [Description("Tests that different whitespace patterns don't match")]
        public void Compare_DifferentWhitespace_ShouldNotMatch()
        {
            var spaces = "   ";
            var tabs = "\t\t\t";

            Expect.That(spaces).ShouldNotMatch(tabs);
        }

        [Test]
        [Description("Tests that newline characters are preserved")]
        public void Compare_NewlineCharacters_ShouldPreserve()
        {
            var withNewlines1 = "line1\nline2\nline3";
            var withNewlines2 = "line1\nline2\nline3";

            Expect.That(withNewlines1).ShouldMatch(withNewlines2);
        }

        [Test]
        [Description("Tests that carriage return and newline are different")]
        public void Compare_CRvsLF_ShouldBeDifferent()
        {
            var cr = "line1\rline2";
            var lf = "line1\nline2";

            Expect.That(cr).ShouldNotMatch(lf);
        }

        [Test]
        [Description("Tests that empty objects match")]
        public void Compare_EmptyObjects_ShouldMatch()
        {
            var empty1 = new Dictionary<string, object>();
            var empty2 = new Dictionary<string, object>();

            Expect.That(empty1).ShouldMatch(empty2);
        }

        [Test]
        [Description("Tests that empty object vs object with ellipsis matches")]
        public void Compare_EmptyObjectVsEllipsisObject_ShouldMatch()
        {
            var empty = new Dictionary<string, object>();
            var withEllipsis = new Dictionary<string, object> { { "...", "..." } };

            Expect.That(empty).ShouldMatch(withEllipsis);
        }
    }

    /// <summary>
    ///     Tests for ComparisonResult types and their properties.
    /// </summary>
    [TestFixture]
    public class ComparisonResultTests
    {
        [Test]
        [Description("Tests that ComparisonSuccess has IsSuccess true")]
        public void ComparisonSuccess_IsSuccess_ShouldBeTrue()
        {
            var success = new ComparisonSuccess();

            Assert.That(success.IsSuccess, Is.True);
        }

        [Test]
        [Description("Tests that ComparisonError has IsSuccess false")]
        public void ComparisonError_IsSuccess_ShouldBeFalse()
        {
            var error = new ComparisonError("$.path", "expected", "actual", "message");

            Assert.That(error.IsSuccess, Is.False);
        }

        [Test]
        [Description("Tests that ComparisonError stores all properties correctly")]
        public void ComparisonError_Properties_ShouldStore()
        {
            var error = new ComparisonError("$.user.name", "Alice", "Bob", "Name mismatch");

            Assert.That(error.Path, Is.EqualTo("$.user.name"));
            Assert.That(error.Expected, Is.EqualTo("Alice"));
            Assert.That(error.Actual, Is.EqualTo("Bob"));
            Assert.That(error.Message, Is.EqualTo("Name mismatch"));
        }
    }

    /// <summary>
    ///     Tests for nested array and object combinations.
    /// </summary>
    [TestFixture]
    public class NestedStructureTests
    {
        [Test]
        [Description("Tests that deeply nested arrays are compared correctly")]
        public void Compare_DeeplyNestedArrays_ShouldCompare()
        {
            var actual = new object[]
            {
                new object[]
                {
                    new object[] { 1, 2, 3 }
                }
            };
            var expected = new object[]
            {
                new object[]
                {
                    new object[] { 1, 2, 3 }
                }
            };

            Expect.That(actual).ShouldMatch(expected);
        }

        [Test]
        [Description("Tests that arrays of objects with arrays are compared correctly")]
        public void Compare_ArraysOfObjectsWithArrays_ShouldCompare()
        {
            var actual = new object[]
            {
                new Dictionary<string, object>
                {
                    { "tags", new object[] { "tag1", "tag2" } }
                }
            };
            var expected = new object[]
            {
                new Dictionary<string, object>
                {
                    { "tags", new object[] { "tag1", "tag2" } }
                }
            };

            Expect.That(actual).ShouldMatch(expected);
        }

        [Test]
        [Description("Tests that object with nested array with objects compares correctly")]
        public void Compare_ObjectWithNestedArrayWithObjects_ShouldCompare()
        {
            var actual = new Dictionary<string, object>
            {
                {
                    "users", new object[]
                    {
                        new Dictionary<string, object> { { "name", "Alice" } },
                        new Dictionary<string, object> { { "name", "Bob" } }
                    }
                }
            };
            var expected = new Dictionary<string, object>
            {
                {
                    "users", new object[]
                    {
                        new Dictionary<string, object> { { "name", "Alice" } },
                        new Dictionary<string, object> { { "name", "Bob" } }
                    }
                }
            };

            Expect.That(actual).WithOrderedSort().ShouldMatch(expected);
        }
    }

    /// <summary>
    ///     Tests for array comparison strategy selection.
    /// </summary>
    [TestFixture]
    public class ArrayComparisonStrategyTests
    {
        [Test]
        [Description("Tests that purely primitive arrays use frequency-based comparison in unordered mode")]
        public void Compare_PurelyPrimitiveArrayUnordered_UsesFrequency()
        {
            var actual = new object[] { 1, 2, 3, 1, 2 };
            var expected = new object[] { 2, 1, 1, 3, 2 };

            Expect.That(actual).ShouldMatch(expected);
        }

        [Test]
        [Description("Tests that purely object arrays use backtracking in unordered mode")]
        public void Compare_PurelyObjectArrayUnordered_UsesBacktracking()
        {
            var actual = new object[]
            {
                new Dictionary<string, object> { { "id", 1 } },
                new Dictionary<string, object> { { "id", 2 } }
            };
            var expected = new object[]
            {
                new Dictionary<string, object> { { "id", 2 } },
                new Dictionary<string, object> { { "id", 1 } }
            };

            Expect.That(actual).ShouldMatch(expected);
        }

        [Test]
        [Description("Tests that mixed arrays use hybrid strategy")]
        public void Compare_MixedArray_UsesHybridStrategy()
        {
            var actual = new object[]
            {
                new Dictionary<string, object> { { "id", 1 } },
                "primitive",
                123
            };
            var expected = new object[]
            {
                123,
                new Dictionary<string, object> { { "id", 1 } },
                "primitive"
            };

            Expect.That(actual).ShouldMatch(expected);
        }

        [Test]
        [Description("Tests that ordered mode doesn't use frequency or backtracking")]
        public void Compare_OrderedMode_UsesSequentialComparison()
        {
            var actual = new object[] { 1, 2, 3 };
            var expected = new object[] { 1, 2, 3 };

            Expect.That(actual).WithOrderedSort().ShouldMatch(expected);
        }
    }

    /// <summary>
    ///     Tests for ellipsis pattern priority and matching.
    /// </summary>
    [TestFixture]
    public class EllipsisPatternPriorityTests
    {
        [Test]
        [Description("Tests that exact ellipsis has highest priority")]
        public void Compare_ExactEllipsis_HighestPriority()
        {
            var actual = new Dictionary<string, object> { { "complex", "value" } };
            var expected = "...";

            Expect.That(actual).ShouldMatch(expected);
        }

        [Test]
        [Description("Tests that array wildcard matches any enumerable")]
        public void Compare_ArrayWildcard_MatchesEnumerable()
        {
            var actualList = new List<string> { "a", "b", "c" };
            var expected = new object[] { "..." };

            Expect.That(actualList).ShouldMatch(expected);
        }

        [Test]
        [Description("Tests that object wildcard matches any dictionary")]
        public void Compare_ObjectWildcard_MatchesDictionary()
        {
            var actual = new Dictionary<string, object>
            {
                { "field1", "value1" },
                { "field2", "value2" }
            };
            var expected = new Dictionary<string, object> { { "...", "..." } };

            Expect.That(actual).ShouldMatch(expected);
        }

        [Test]
        [Description("Tests that truncated string pattern works correctly")]
        public void Compare_TruncatedPattern_MatchesPrefix()
        {
            var actual = "This is a very long message that continues";
            var expected = "This is a very long...";

            Expect.That(actual).ShouldMatch(expected);
        }

        [Test]
        [Description("Tests that property-level ellipsis works in objects")]
        public void Compare_PropertyLevelEllipsis_MatchesAnyValue()
        {
            var actual = new Dictionary<string, object>
            {
                { "name", "Alice" },
                { "_id", "507f1f77bcf86cd799439011" },
                { "timestamp", 1234567890 }
            };
            var expected = new Dictionary<string, object>
            {
                { "name", "Alice" },
                { "_id", "..." },
                { "timestamp", "..." }
            };

            Expect.That(actual).ShouldMatch(expected);
        }
    }

    /// <summary>
    ///     Tests for ShouldNotMatch helper validation.
    /// </summary>
    [TestFixture]
    public class ShouldNotMatchTests
    {
        [Test]
        [Description("Tests that ShouldNotMatch succeeds when values differ")]
        public void ShouldNotMatch_DifferentValues_ShouldSucceed()
        {
            var result = Expect.That("Alice").ShouldNotMatch("Bob");

            Assert.That(result.IsSuccess, Is.True);
        }

        [Test]
        [Description("Tests that ShouldNotMatch fails when values match")]
        public void ShouldNotMatch_SameValues_ShouldFail()
        {
            var result = Expect.That("Alice").ShouldNotMatch("Alice");

            Assert.That(result.IsSuccess, Is.False);
        }

        [Test]
        [Description("Tests that ShouldNotMatch works with complex objects")]
        public void ShouldNotMatch_ComplexObjects_ShouldWork()
        {
            var actual = new Dictionary<string, object> { { "name", "Alice" } };
            var expected = new Dictionary<string, object> { { "name", "Bob" } };

            var result = Expect.That(actual).ShouldNotMatch(expected);

            Assert.That(result.IsSuccess, Is.True);
        }
    }

    /// <summary>
    ///     Tests for edge cases in backtracking algorithm.
    /// </summary>
    [TestFixture]
    public class BacktrackingAlgorithmTests
    {
        [Test]
        [Description("Tests that backtracking finds correct match when first attempt fails")]
        public void Compare_BacktrackingRequired_ShouldFindMatch()
        {
            var actual = new object[]
            {
                new Dictionary<string, object> { { "id", 1 }, { "type", "A" } },
                new Dictionary<string, object> { { "id", 1 }, { "type", "B" } }
            };
            var expected = new object[]
            {
                new Dictionary<string, object> { { "id", 1 }, { "type", "B" } },
                new Dictionary<string, object> { { "id", 1 }, { "type", "A" } }
            };

            Expect.That(actual).ShouldMatch(expected);
        }

        [Test]
        [Description("Tests that backtracking handles multiple similar objects")]
        public void Compare_MultipleSimilarObjects_BacktrackingWorks()
        {
            var actual = new object[]
            {
                new Dictionary<string, object> { { "name", "test" }, { "value", 1 } },
                new Dictionary<string, object> { { "name", "test" }, { "value", 2 } },
                new Dictionary<string, object> { { "name", "test" }, { "value", 3 } }
            };
            var expected = new object[]
            {
                new Dictionary<string, object> { { "name", "test" }, { "value", 3 } },
                new Dictionary<string, object> { { "name", "test" }, { "value", 1 } },
                new Dictionary<string, object> { { "name", "test" }, { "value", 2 } }
            };

            Expect.That(actual).ShouldMatch(expected);
        }
    }

    /// <summary>
    ///     Tests for boolean value comparisons.
    /// </summary>
    [TestFixture]
    public class BooleanComparisonTests
    {
        [Test]
        [Description("Tests that true matches true")]
        public void Compare_TrueVsTrue_ShouldMatch()
        {
            Expect.That(true).ShouldMatch(true);
        }

        [Test]
        [Description("Tests that false matches false")]
        public void Compare_FalseVsFalse_ShouldMatch()
        {
            Expect.That(false).ShouldMatch(false);
        }

        [Test]
        [Description("Tests that true vs false don't match")]
        public void Compare_TrueVsFalse_ShouldNotMatch()
        {
            Expect.That(true).ShouldNotMatch(false);
        }

        [Test]
        [Description("Tests that boolean in object compares correctly")]
        public void Compare_BooleanInObject_ShouldCompare()
        {
            var actual = new Dictionary<string, object> { { "active", true } };
            var expected = new Dictionary<string, object> { { "active", true } };

            Expect.That(actual).ShouldMatch(expected);
        }

        [Test]
        [Description("Tests that boolean in array compares correctly")]
        public void Compare_BooleanInArray_ShouldCompare()
        {
            var actual = new object[] { true, false, true };
            var expected = new object[] { true, false, true };

            Expect.That(actual).WithOrderedSort().ShouldMatch(expected);
        }
    }

    /// <summary>
    ///     Tests for frequency counting in primitive arrays.
    /// </summary>
    [TestFixture]
    public class FrequencyCountingTests
    {
        [Test]
        [Description("Tests that frequency counting detects missing duplicates")]
        public void Compare_MissingDuplicates_ShouldDetect()
        {
            var actual = new object[] { "a", "b", "c" };
            var expected = new object[] { "a", "a", "b", "c" }; // Extra "a"

            Expect.That(actual).ShouldNotMatch(expected);
        }

        [Test]
        [Description("Tests that frequency counting detects extra duplicates")]
        public void Compare_ExtraDuplicates_ShouldDetect()
        {
            var actual = new object[] { "a", "a", "a", "b" };
            var expected = new object[] { "a", "a", "b" }; // One less "a"

            Expect.That(actual).ShouldNotMatch(expected);
        }

        [Test]
        [Description("Tests that frequency counting handles complex duplicates")]
        public void Compare_ComplexDuplicates_ShouldHandle()
        {
            var actual = new object[] { 1, 2, 2, 3, 3, 3 };
            var expected = new object[] { 3, 1, 3, 2, 3, 2 };

            Expect.That(actual).ShouldMatch(expected);
        }

        [Test]
        [Description("Tests that frequency counting works with null values")]
        public void Compare_FrequencyWithNulls_ShouldWork()
        {
            var actual = new object?[] { "a", null, "b", null };
            var expected = new object?[] { null, "b", null, "a" };

            Expect.That(actual).ShouldMatch(expected);
        }
    }

    /// <summary>
    ///     Tests for path construction in error messages.
    /// </summary>
    [TestFixture]
    public class PathConstructionTests
    {
        [Test]
        [Description("Tests that path includes array index")]
        public void Compare_ArrayElementMismatch_PathIncludesIndex()
        {
            var actual = new object[] { "a", "b", "c" };
            var expected = new object[] { "a", "x", "c" };

            var result = ComparisonEngine.Compare(expected, actual);

            Assert.That(result.IsSuccess, Is.False);
            if (result is ComparisonError error)
            {
                Assert.That(error.Path, Does.Contain("["));
            }
        }

        [Test]
        [Description("Tests that path includes property names")]
        public void Compare_PropertyMismatch_PathIncludesProperty()
        {
            var actual = new Dictionary<string, object>
            {
                { "user", new Dictionary<string, object> { { "name", "Alice" } } }
            };
            var expected = new Dictionary<string, object>
            {
                { "user", new Dictionary<string, object> { { "name", "Bob" } } }
            };

            var result = ComparisonEngine.Compare(expected, actual);

            Assert.That(result.IsSuccess, Is.False);
            if (result is ComparisonError error)
            {
                Assert.That(error.Path, Does.Contain("user"));
                Assert.That(error.Path, Does.Contain("name"));
            }
        }

        [Test]
        [Description("Tests that root path is $")]
        public void Compare_RootLevelMismatch_PathIsDollar()
        {
            var result = ComparisonEngine.Compare("expected", "actual");

            Assert.That(result.IsSuccess, Is.False);
            if (result is ComparisonError error)
            {
                Assert.That(error.Path, Is.EqualTo("$"));
            }
        }
    }

    /// <summary>
    ///     Tests for edge cases with array subsequence matching.
    /// </summary>
    [TestFixture]
    public class ArraySubsequenceTests
    {
        [Test]
        [Description("Tests that ellipsis can consume entire array")]
        public void Compare_EllipsisConsumesAll_ShouldMatch()
        {
            var actual = new object[] { "a", "b", "c", "d", "e" };
            var expected = new object[] { "..." };

            Expect.That(actual).WithOrderedSort().ShouldMatch(expected);
        }

        [Test]
        [Description("Tests that pattern before and after ellipsis must match")]
        public void Compare_PatternAroundEllipsis_MustMatch()
        {
            var actual = new object[] { "start", "middle1", "middle2", "end" };
            var expected = new object[] { "start", "...", "end" };

            Expect.That(actual).WithOrderedSort().ShouldMatch(expected);
        }

        [Test]
        [Description("Tests that mismatched pattern before ellipsis fails")]
        public void Compare_MismatchedPatternBeforeEllipsis_ShouldFail()
        {
            var actual = new object[] { "wrong", "middle", "end" };
            var expected = new object[] { "start", "...", "end" };

            Expect.That(actual).WithOrderedSort().ShouldNotMatch(expected);
        }

        [Test]
        [Description("Tests that mismatched pattern after ellipsis fails")]
        public void Compare_MismatchedPatternAfterEllipsis_ShouldFail()
        {
            var actual = new object[] { "start", "middle", "wrong" };
            var expected = new object[] { "start", "...", "end" };

            Expect.That(actual).WithOrderedSort().ShouldNotMatch(expected);
        }
    }

    /// <summary>
    ///     Tests for ComparisonOptions default values and behavior.
    /// </summary>
    [TestFixture]
    public class ComparisonOptionsTests
    {
        [Test]
        [Description("Tests that default options have unordered array mode")]
        public void ComparisonOptions_Default_IsUnordered()
        {
            var options = ComparisonOptions.Default;

            Assert.That(options.ArrayMode, Is.EqualTo(ArrayComparisonMode.Unordered));
        }

        [Test]
        [Description("Tests that Ordered options have ordered array mode")]
        public void ComparisonOptions_Ordered_IsOrdered()
        {
            var options = ComparisonOptions.Ordered;

            Assert.That(options.ArrayMode, Is.EqualTo(ArrayComparisonMode.Ordered));
        }

        [Test]
        [Description("Tests that Unordered options have unordered array mode")]
        public void ComparisonOptions_Unordered_IsUnordered()
        {
            var options = ComparisonOptions.Unordered;

            Assert.That(options.ArrayMode, Is.EqualTo(ArrayComparisonMode.Unordered));
        }

        [Test]
        [Description("Tests that IgnoreFields creates options with ignored fields")]
        public void ComparisonOptions_IgnoreFields_SetsIgnoredFields()
        {
            var options = ComparisonOptions.IgnoreFields("_id", "timestamp");

            Assert.That(options.IgnoredFields, Contains.Item("_id"));
            Assert.That(options.IgnoredFields, Contains.Item("timestamp"));
        }

        [Test]
        [Description("Tests that default timeout is 30 seconds")]
        public void ComparisonOptions_Default_TimeoutIs30Seconds()
        {
            var options = ComparisonOptions.Default;

            Assert.That(options.TimeoutSeconds, Is.EqualTo(30));
        }

        [Test]
        [Description("Tests that InheritedGlobalEllipsis defaults to false")]
        public void ComparisonOptions_Default_InheritedGlobalEllipsisFalse()
        {
            var options = ComparisonOptions.Default;

            Assert.That(options.InheritedGlobalEllipsis, Is.False);
        }
    }

    /// <summary>
    ///     Tests for case sensitivity in string comparisons.
    /// </summary>
    [TestFixture]
    public class CaseSensitivityTests
    {
        [Test]
        [Description("Tests that string comparison is case-sensitive")]
        public void Compare_DifferentCase_ShouldNotMatch()
        {
            Expect.That("Test").ShouldNotMatch("test");
        }

        [Test]
        [Description("Tests that property names are case-sensitive")]
        public void Compare_DifferentCasePropertyName_ShouldFail()
        {
            var actual = new Dictionary<string, object> { { "Name", "Alice" } };
            var expected = new Dictionary<string, object> { { "name", "Alice" } };

            Expect.That(actual).ShouldNotMatch(expected);
        }

        [Test]
        [Description("Tests that array string elements are case-sensitive")]
        public void Compare_ArrayCaseSensitive_ShouldNotMatch()
        {
            var actual = new object[] { "ABC", "def" };
            var expected = new object[] { "abc", "def" };

            Expect.That(actual).ShouldNotMatch(expected);
        }
    }

    /// <summary>
    ///     Tests for scenarios with all null values.
    /// </summary>
    [TestFixture]
    public class AllNullTests
    {
        [Test]
        [Description("Tests that array of all nulls matches")]
        public void Compare_ArrayOfNulls_ShouldMatch()
        {
            var actual = new object?[] { null, null, null };
            var expected = new object?[] { null, null, null };

            Expect.That(actual).WithOrderedSort().ShouldMatch(expected);
        }

        [Test]
        [Description("Tests that object with all null values matches")]
        public void Compare_ObjectWithNullValues_ShouldMatch()
        {
            var actual = new Dictionary<string, object?> { { "a", null }, { "b", null } };
            var expected = new Dictionary<string, object?> { { "a", null }, { "b", null } };

            Expect.That(actual).ShouldMatch(expected);
        }
    }
}