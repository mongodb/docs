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
        //test passes
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
        public void Compare_ObjectIdToString()
        {
            var objectId = new ObjectId("507f1f77bcf86cd799439011");
            var stringId = "507f1f77bcf86cd799439011";

            Expect.That(objectId).ShouldMatch(stringId);
        }

        [Test]
        public void Compare_Decimal128ToString()
        {
            var decimal128 = Decimal128.Parse("123.45");
            var stringDecimal = "123.45";

            Expect.That(decimal128).ShouldMatch(stringDecimal);
        }

        [Test]
        public void Compare_DateTimeToString()
        {
            var dateTime = new DateTime(2024, 1, 1, 12, 0, 0, DateTimeKind.Utc);
            var isoString = "2024-01-01T12:00:00.000Z";

            Expect.That(dateTime).ShouldMatch(isoString);
        }

        [Test]
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
        public void Compare_DifferentOrderArraysOrdered()
        {
            var actualArray = new object[] { "a", "b", "c" };
            var expectedArray = new object[] { "a", "c", "b" };
            var options = ComparisonOptions.Ordered;
            Expect.That(actualArray).WithOrderedSort().ShouldNotMatch(expectedArray);
        }

        [Test]
        public void Compare_DifferentOrderArraysUnordered()
        {
            var actualArray = new object[] { "a", "b", "c" };
            var expectedArray = new object[] { "c", "a", "b" };

            Expect.That(actualArray).WithUnorderedSort().ShouldMatch(expectedArray);
        }

        [Test]
        public void Compare_ArraysWithDifferentLengths()
        {
            var actualArray = new object[] { "a", "b" };
            var expectedArray = new object[] { "a", "b", "c" };

            Expect.That(actualArray).ShouldNotMatch(expectedArray);
        }

        [Test]
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
        public void Compare_UnorderedArrayNoMatch()
        {
            var actualArray = new object[] { "a", "b", "c" };
            var expectedArray = new object[] { "a", "b", "d" }; // 'c' vs 'd'

            Expect.That(actualArray).ShouldNotMatch(expectedArray);
        }

        [Test]
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
        public void Compare_DifferentPropertyValues()
        {
            var expected = new Dictionary<string, object> { { "name", "Alice" } };
            var actual = new Dictionary<string, object> { { "name", "Bob" } };

            Expect.That(expected).ShouldNotMatch(actual);

        }

        [Test]
        public void Compare_MissingProperty()
        {
            var expected = new Dictionary<string, object> { { "name", "Alice" }, { "age", 25 } };
            var actual = new Dictionary<string, object> { { "name", "Alice" } }; // missing age

            Expect.That(actual).ShouldNotMatch(expected);
        }

        [Test]
        public void Compare_ExtraPropertyWithoutEllipsis()
        {
            var expected = new Dictionary<string, object> { { "name", "Alice" } };
            var actual = new Dictionary<string, object> { { "name", "Alice" }, { "age", 25 } }; // extra property

            Expect.That(actual).ShouldNotMatch(expected);
        }

        [Test]
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
            Expect.That(expected).ShouldNotMatch(actual);
        }
    }

    [TestFixture]
    public class IgnoreFieldsTests
    {
        [Test]
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

            Expect.That(expected).WithIgnoredFields("_id", "timestamp").ShouldMatch(actual);
        }

        [Test]
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

            Expect.That(expected).WithIgnoredFields("_id").ShouldNotMatch(actual);

        }

        [Test]
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
            Expect.That(expected)
                .WithUnorderedSort()
                .WithIgnoredFields("_id", "createdAt").ShouldMatch(actual);
        }
    }

    [TestFixture]
    public class TypeMismatchTests
    {
        [Test]
        public void Compare_ArrayVsObject()
        {
            var array = new object[] { "item1", "item2" };
            var obj = new Dictionary<string, object> { { "key", "value" } };

            var result = Expect.That(array).ShouldNotMatch(obj);
        }

        [Test]
        public void Compare_ObjectVsArray()
        {
            var obj = new Dictionary<string, object> { { "key", "value" } };
            var array = new object[] { "item1", "item2" };

            var result = Expect.That(obj).ShouldNotMatch(array);
        }

        [Test]
        public void Compare_StringVsNumber()
        {
            var result = Expect.That("123").ShouldNotMatch(123);
        }
    }

    [TestFixture]
    public class AsyncTests
    {
        [Test]
        public async Task CompareAsync_BasicComparison_ReturnsCorrectResult()
        {
            var expected = new Dictionary<string, object> { { "name", "Alice" } };
            var actual = new Dictionary<string, object> { { "name", "Alice" } };

            await Expect.That(expected).ShouldMatchAsync(actual);
        }

        [Test]
        public async Task CompareAsync_WithTimeout_CompletesWithinTimeout()
        {
            var expected = new Dictionary<string, object> { { "name", "Alice" } };
            var actual = new Dictionary<string, object> { { "name", "Alice" } };

            var stopwatch = Stopwatch.StartNew();
            await Expect.That(expected).ShouldMatchAsync(actual);
            stopwatch.Stop();

            Assert.That(stopwatch.ElapsedMilliseconds, Is.LessThan(1000)); // Should complete well before timeout;
        }

        [Test]
        public void CompareAsync_WithCancellation_ThrowsOperationCanceledException()
        {
            var expected = new Dictionary<string, object> { { "name", "Alice" } };
            var actual = new Dictionary<string, object> { { "name", "Alice" } };
            using var cts = new CancellationTokenSource();
            cts.Cancel(); // Cancel immediately

            Assert.ThrowsAsync<OperationCanceledException>(async () =>
                await Expect.That(expected).ShouldMatchAsync(actual, cts.Token));
        }
    }

    /// <summary>
    ///     Tests for hybrid array strategy with mixed primitive and object types.
    /// </summary>
    [TestFixture]
    public class HybridArrayStrategyTests
    {
        [Test]
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
        public void Compare_PurelyPrimitiveArray_UsesFrequencyStrategy()
        {
            var actual = new object[] { 1, 2, 3, 1, "hello", "world", "hello" };
            var expected = new object[] { "hello", 1, "world", 3, "hello", 2, 1 };

            Expect.That(actual).ShouldMatch(expected);
        }

        [Test]
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
        public void Compare_EmptyArrays()
        {
            var expected = new object[0];
            var actual = new object[0];

            Expect.That(actual).ShouldMatch(expected);
        }

        [Test]
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
        public void Compare_CancellationTokenAlreadyCancelled_ThrowsOperationCanceledException()
        {
            using var cts = new CancellationTokenSource();
            cts.Cancel(); // Cancel before starting
            var expected = new Dictionary<string, object> { { "test", "value" } };
            var actual = new Dictionary<string, object> { { "test", "value" } };

            Assert.ThrowsAsync<OperationCanceledException>(async () =>
                await Expect.That(expected).ShouldMatchAsync(actual, cts.Token));
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
                var result = Expect.That(testData[i].Expected).ShouldMatch(testData[i].Actual);
                results[i] = result.IsSuccess;
            });

            Assert.That(results.All(result => result), "All comparisons should succeed"); ;
        }

        [Test]
        public async Task ComparisonEngine_AsyncConcurrentUsage_CompletesSuccessfully()
        {
            var tasks = Enumerable.Range(0, 50)
                .Select(async i =>
                {
                    var expected = new Dictionary<string, object> { { "id", i }, { "name", $"Item{i}" } };
                    var actual = new Dictionary<string, object> { { "id", i }, { "name", $"Item{i}" } };

                    return await Expect.That(expected).ShouldMatchAsync(actual);
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
    public void Compare_MultiLineStringList_BoroughList_ShouldMatch()
    {
        var expected = TestDataConstants.RealWorldExamples.BoroughList;
        var actual = TestDataConstants.RealWorldExamples.BoroughListAlternateFormat;

        var result = Expect.That(actual).ShouldMatch(expected);

        Assert.That(result.IsSuccess, Is.True);
        Assert.That(result.Error, Is.Null);
    }

    [Test]
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

        var result = Expect.That(expected).ShouldMatch(actualWithWhitespace);

        Assert.That(result.IsSuccess, Is.True);
    }

    [Test]
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
    public void Compare_WithEmptyInput_ShouldHandleGracefully()
    {
        var result1 = Expect.That("").ShouldNotMatch(TestDataConstants.RealWorldExamples.BoroughList);

        Assert.That(result1.IsSuccess, Is.True);

        var result2 = Expect.That(TestDataConstants.RealWorldExamples.TimeSeriesMetadata)
            .ShouldNotMatch("");
        Assert.That(result2.IsSuccess, Is.True);
    }

    [Test]
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
}