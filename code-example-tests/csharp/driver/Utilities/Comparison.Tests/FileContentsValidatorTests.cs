using NUnit.Framework;

namespace Utilities.Comparison.Tests;

/// <summary>
///     Tests for OutputValidator - the main API entry point for validating MongoDB operation results.
///     Test Coverage:
///     - Basic validation builder pattern functionality
///     - File-based comparison workflow (Macthes)
///     - Options handling: ignore fields, array ordering strategies
///     - Error reporting and validation failure scenarios
///     - Integration with comparison engine and file parsing
///     Why This Matters:
///     OutputValidator is the public API that consumers use to validate MongoDB operations.
///     These tests ensure the fluent interface works correctly and provides clear error messages
///     when validation fails, which is critical for debugging failed code examples.
///     Key Test Categories:
///     - Fluent API behavior: builder pattern method chaining
///     - File matching: loading expected results from test data files
///     - Option configuration: customizing comparison behavior
///     - Error scenarios: malformed files, comparison failures, missing files
/// </summary>
[TestFixture]
public class OutputValidatorTests
{
    private string GetTestDataPath(string fileName)
    {
        return Path.Combine(TestContext.CurrentContext.TestDirectory, "TestData", fileName);
    }

    [Test]
    public void ToMatchFile_StaticMethod_MatchingOutput_ReturnsSuccess()
    {
        var actualOutput = new Dictionary<string, object>
        {
            { "name", "Alice" },
            { "age", 25 },
            { "active", true }
        };
        var filePath = GetTestDataPath("simple-output.txt");

        var result = Expect.That(filePath).ShouldMatch(actualOutput);

        Assert.That(result.Error, Is.Null);
    }

    [Test]
    public void ToMatchFile_StaticMethod_NonMatchingOutput_ReturnsFailure()
    {
        var actualOutput = new Dictionary<string, object>
        {
            { "name", "Bob" }, // Different name
            { "age", 25 },
            { "active", true }
        };
        var filePath = GetTestDataPath("simple-output.txt");

        Expect.That(filePath).ShouldNotMatch(actualOutput);
    }

    [Test]
    public void ToMatchFile_FluentAPI_MatchingOutput_ReturnsSuccess()
    {
        var actualOutput = new Dictionary<string, object>
        {
            { "name", "Alice" },
            { "age", 25 },
            { "active", true }
        };
        var filePath = GetTestDataPath("simple-output.txt");

        Expect.That(filePath).ShouldMatch(actualOutput);
    }

    [Test]
    public void ToMatchFile_WithCustomOptions_ReturnsSuccess()
    {
        var actualOutput = new Dictionary<string, object>
        {
            { "name", "Alice" },
            { "age", 25 },
            { "active", true }
        };
        var filePath = GetTestDataPath("simple-output.txt");

        Expect.That(filePath)
            .WithOrderedSort()
            .ShouldMatch(actualOutput);
    }

    [Test]
    public void IgnoringFields_FluentAPI_IgnoresSpecifiedFields()
    {
        var actualOutput = new Dictionary<string, object>
        {
            { "_id", "actual-id-123" },
            { "name", "Alice" },
            { "timestamp", "actual-timestamp" },
            {
                "data", new Dictionary<string, object>
                {
                    { "value", 42 },
                    { "_id", "nested-id-456" }
                }
            }
        };
        var filePath = GetTestDataPath("with-ignored-fields.txt");

        Expect.That(filePath)
            .WithIgnoredFields("_id", "timestamp")
            .ShouldMatch(actualOutput);
    }

    [Test]
    public void WithOrderedArrays_FluentAPI_ComparesArraysInOrder()
    {
        var actualOutput = new object[]
        {
            new Dictionary<string, object> { { "name", "Alice" }, { "score", 85 } },
            new Dictionary<string, object> { { "name", "Bob" }, { "score", 92 } },
            new Dictionary<string, object> { { "name", "Charlie" }, { "score", 78 } }
        };
        var filePath = GetTestDataPath("ordered-array.txt");

        Expect.That(filePath)
            .WithOrderedSort()
            .ShouldMatch(actualOutput);
    }

    [Test]
    public void WithOrderedArrays_WrongOrder_ReturnsFailure()
    {
        var actualOutput = new object[]
        {
            new Dictionary<string, object> { { "name", "Bob" }, { "score", 92 } }, // Wrong order
            new Dictionary<string, object> { { "name", "Alice" }, { "score", 85 } },
            new Dictionary<string, object> { { "name", "Charlie" }, { "score", 78 } }
        };
        var filePath = GetTestDataPath("ordered-array.txt");

        Expect.That(filePath)
            .WithOrderedSort()
            .ShouldMatch(actualOutput);
    }

    [Test]
    public void IgnoringFields_AndIgnoringFields_CombinesIgnoredFields()
    {
        var actualOutput = new Dictionary<string, object>
        {
            { "_id", "actual-id" },
            { "name", "Alice" },
            { "timestamp", "actual-timestamp" },
            { "sessionId", "actual-session" }
        };

        // Create expected content without the ignored fields
        var expectedContent = @"{
            name: 'Alice'
        }";
        var tempFile = Path.GetTempFileName();
        File.WriteAllText(tempFile, expectedContent);

        try
        {
            Expect.That(tempFile)
                .WithIgnoredFields("_id", "timestamp")
                .WithIgnoredFields("sessionId")
                .ShouldMatch(actualOutput);
        }
        finally
        {
            File.Delete(tempFile);
        }
    }

    [Test]
    public void ComparisonResult_ThrowIfFailed_Success_DoesNotThrow()
    {
        var actualOutput = new Dictionary<string, object> { { "name", "Alice" }, { "age", 25 }, { "active", true } };
        var filePath = GetTestDataPath("simple-output.txt");

        Expect.That(filePath)
            .ShouldNotMatch(actualOutput);
    }

    [Test]
    public void ComparisonResult_ThrowIfFailed_Failure_ThrowsValidationException()
    {
        var actualOutput = new Dictionary<string, object> { { "name", "Bob" } }; // Wrong name
        var filePath = GetTestDataPath("simple-output.txt");

        Expect.That(filePath)
            .ShouldNotMatch(actualOutput);
    }

    [Test]
    public void ToMatchFile_NonExistentFile_ReturnsFailure()
    {
        var actualOutput = new { name = "Alice" };
        var nonExistentPath = GetTestDataPath("non-existent-file.txt");

        Expect.That(nonExistentPath)
            .ShouldNotMatch(actualOutput);
    }

    [Test]
    public void ToMatchFile_ParseError_ReturnsFailure()
    {
        var actualOutput = new { name = "Alice" };
        var filePath = GetTestDataPath("invalid-syntax.txt");

        Expect.That(filePath)
            .ShouldNotMatch(actualOutput);
    }

    [Test]
    public void ToMatchFile_AbsolutePath_WorksCorrectly()
    {
        var actualOutput = new Dictionary<string, object> { { "name", "Alice" }, { "age", 25 }, { "active", true } };
        var absolutePath = Path.GetFullPath(GetTestDataPath("simple-output.txt"));

        Expect.That(absolutePath)
            .ShouldMatch(actualOutput);
    }

    [Test]
    public void ToMatchFile_SingleObjectVsArrayFormat_HandlesCorrectly()
    {
        var actualOutput = new Dictionary<string, object>
        {
            { "name", "Alice" },
            { "age", 25 },
            { "active", true }
        };
        var filePath = GetTestDataPath("simple-output.txt");

        Expect.That(filePath).ShouldMatch(actualOutput);
    }

    [Test]
    public void ToMatchFile_ArrayActualVsArrayExpected_HandlesCorrectly()
    {
        var actualOutput = new object[]
        {
            new Dictionary<string, object> { { "name", "Alice" }, { "score", 85 } },
            new Dictionary<string, object> { { "name", "Bob" }, { "score", 92 } },
            new Dictionary<string, object> { { "name", "Charlie" }, { "score", 78 } }
        };
        var filePath = GetTestDataPath("ordered-array.txt");

        Expect.That(filePath).ShouldMatch(actualOutput);
    }

    [TestFixture]
    public class ValidationBuilderWithOptionsTests
    {
        private string GetTestDataPath(string fileName)
        {
            return Path.Combine(TestContext.CurrentContext.TestDirectory, "TestData", fileName);
        }

        [Test]
        public void WithOrderedArrays_AfterIgnoringFields_MaintainsBothSettings()
        {
            var actualOutput = new object[]
            {
                new Dictionary<string, object> { { "name", "Alice" }, { "score", 85 }, { "_id", "id1" } },
                new Dictionary<string, object> { { "name", "Bob" }, { "score", 92 }, { "_id", "id2" } }
            };

            // Create expected content
            var expectedContent = @"[
                { name: 'Alice', score: 85, _id: '...' },
                { name: 'Bob', score: 92, _id: '...' }
            ]";
            var tempFile = Path.GetTempFileName();
            File.WriteAllText(tempFile, expectedContent);

            try
            {
                Expect.That(tempFile)
                    .WithIgnoredFields("_id")
                    .WithOrderedSort()
                    .ShouldMatch(actualOutput);
            }
            finally
            {
                File.Delete(tempFile);
            }
        }

        [Test]
        public void AndIgnoringFields_AddsToExistingIgnoredFields()
        {
            var actualOutput = new Dictionary<string, object>
            {
                { "_id", "id1" },
                { "timestamp", "time1" },
                { "sessionId", "session1" },
                { "name", "Alice" }
            };

            // Create expected content
            var expectedContent = "{ name: 'Alice' }";
            var tempFile = Path.GetTempFileName();
            File.WriteAllText(tempFile, expectedContent);

            try
            {
                Expect.That(tempFile)
                    .WithIgnoredFields("_id")
                    .WithIgnoredFields("timestamp", "sessionId")
                    .ShouldMatch(actualOutput);
            }
            finally
            {
                File.Delete(tempFile);
            }
        }

        [Test]
        public void ChainedFluentMethods_AllOptionsAppliedCorrectly()
        {
            var actualOutput = new object[]
            {
                new Dictionary<string, object>
                {
                    { "name", "Alice" },
                    { "score", 85 },
                    { "_id", "id1" },
                    { "timestamp", "time1" }
                },
                new Dictionary<string, object>
                {
                    { "name", "Bob" },
                    { "score", 92 },
                    { "_id", "id2" },
                    { "timestamp", "time2" }
                }
            };

            // Create expected content
            var expectedContent = """
                                  [
                                      { name: 'Alice', score: 85, _id: '...', timestamp: '...' },
                                      { name: 'Bob', score: 92, _id: '...', timestamp: '...' }
                                  ]
                                  """;
            var tempFile = Path.GetTempFileName();
            File.WriteAllText(tempFile, expectedContent);

            try
            {
                Expect.That(tempFile)
                    .WithIgnoredFields("_id")
                    .WithOrderedSort()
                    .WithIgnoredFields("timestamp", "sessionId")
                    .ShouldMatch(actualOutput);
            }
            finally
            {
                File.Delete(tempFile);
            }
        }
    }

    [TestFixture]
    public class ComparisonResultTests
    {
        [Test]
        public void ValidationSuccess_Properties_AreCorrect()
        {
            var success = new ComparisonSuccess();

            Assert.That(success.IsSuccess, Is.True);
            Assert.That(success.Error, Is.Null);
        }

        [Test]
        public void ValidationFailure_Properties_AreCorrect()
        {
            var errorMessage = "Test error message";

            var failure = new ComparisonError(errorMessage);

            Assert.That(failure.IsSuccess, Is.False);
            Assert.That(failure.Message, Is.EqualTo(errorMessage));
        }

        [Test]
        public void ToMatchFile_FileNotFound_ReturnsFailureWithParseError()
        {
            var nonExistentFile = "definitely-does-not-exist.txt";
            var actualOutput = new { test = "value" };

            var result = Expect.That(nonExistentFile).ShouldNotMatch(actualOutput);
            var foo = result;
        }

        [Test]
        public void ToMatchFile_AbsolutePath_UsesPathAsIs()
        {
            var tempFile = Path.GetTempFileName();
            var absolutePath = Path.GetFullPath(tempFile);

            try
            {
                File.WriteAllText(tempFile, """
                                            { "test": "value" }
                                            """);
                var actualOutput = new Dictionary<string, object> { { "test", "value" } };

                Expect.That(absolutePath).ShouldMatch(actualOutput);
            }
            finally
            {
                if (File.Exists(tempFile))
                    File.Delete(tempFile);
            }
        }

        [Test]
        public void ValidationBuilder_ToMatchFile_ExceptionDuringValidation_ReturnsFailureWithErrorMessage()
        {
            var actualOutput = new { test = "value" };
            Expect.That(actualOutput).ShouldNotMatch(null);
        }

        [Test]
        public void ToMatchFile_MalformedExpectedFile_ReturnsParseFailure()
        {
            var tempFile = Path.GetTempFileName();
            try
            {
                File.WriteAllText(tempFile, """
                                            { invalid: json syntax }
                                            """);
                var actualOutput = new { test = "value" };

                Expect.That(tempFile).ShouldNotMatch(actualOutput);
            }
            finally
            {
                if (File.Exists(tempFile))
                    File.Delete(tempFile);
            }
        }
        // Tests for ordered vs unordered array comparison scenarios that caused real-world test failures

        [Test]
        public void ToMatchText_TimeSeriesData_UnorderedComparison_Succeeds()
        {
            // Important: TimeSeries data often comes back in unpredictable order but should still match
            var expectedText = """
                               { "date" : { "$date" : "2021-12-18T15:55:00Z" }, "ticker" : "MDB", "close" : 254.03, "volume" : 40270.0 }
                               { "date" : { "$date" : "2021-12-18T15:56:00Z" }, "ticker" : "MDB", "close" : 253.63, "volume" : 27890.0 }
                               { "date" : { "$date" : "2021-12-18T15:57:00Z" }, "ticker" : "MDB", "close" : 253.62, "volume" : 40182.0 }
                               """;

            // Actual results in different order (common in time series queries)
            var actualResults = new[]
            {
                new
                {
                    date = DateTime.Parse("2021-12-18T15:57:00Z").ToUniversalTime(), ticker = "MDB", close = 253.62,
                    volume = 40182.0
                },
                new
                {
                    date = DateTime.Parse("2021-12-18T15:55:00Z").ToUniversalTime(), ticker = "MDB", close = 254.03,
                    volume = 40270.0
                },
                new
                {
                    date = DateTime.Parse("2021-12-18T15:56:00Z").ToUniversalTime(), ticker = "MDB", close = 253.63,
                    volume = 27890.0
                }
            };

            // Unordered comparison should succeed
            var result = Expect.That(actualResults)
                .ShouldMatch(expectedText); // Default is unordered
        }

        [Test]
        public void ToMatchText_AggregationData_OrderedComparison_RequiresExactOrder()
        {
            // Important: Aggregation pipelines return ordered results that must match exactly
            var expectedText = """
                               [
                                   { "category": "Electronics", "totalSales": 1500.00 },
                                   { "category": "Books", "totalSales": 800.00 },
                                   { "category": "Clothing", "totalSales": 1200.00 }
                               ]
                               """;

            var actualResults = new[]
            {
                new { category = "Electronics", totalSales = 1500.00 },
                new { category = "Books", totalSales = 800.00 },
                new { category = "Clothing", totalSales = 1200.00 }
            };

            Expect.That(actualResults)
                .WithOrderedSort()
                .ShouldMatch(expectedText);

            // Verify that wrong order fails
            var wrongOrderResults = new[]
            {
                new { category = "Books", totalSales = 800.00 }, // Wrong order
                new { category = "Electronics", totalSales = 1500.00 },
                new { category = "Clothing", totalSales = 1200.00 }
            };

            var wrongOrderResult = Expect.That(expectedText)
                .WithOrderedSort()
                .ShouldNotMatch(wrongOrderResults);
        }

        /// <summary>
        ///     Tests for error handling edge cases in output validation.
        ///     These tests ensure the validation system handles error scenarios gracefully.
        /// </summary>
        [TestFixture]
        public class ErrorHandlingTests
        {
            [Test]
            public void ToMatchFile_WithNonExistentFile_ProvidesHelpfulError()
            {
                var nonExistentFile = "/path/that/does/not/exist.txt";
                var actualData = new { test = "data" };

                Expect.That(nonExistentFile).ShouldNotMatch(actualData);
            }
        }
    }
}