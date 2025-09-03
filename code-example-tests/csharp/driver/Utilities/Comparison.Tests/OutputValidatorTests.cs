using FluentAssertions;
using NUnit.Framework;
using Utilities.Comparison;

namespace Utilities.Comparison.Tests;

/// <summary>
/// Tests for OutputValidator - the main API entry point for validating MongoDB operation results.
///
/// Test Coverage:
/// - Basic validation builder pattern functionality
/// - File-based comparison workflow (ToMatchFile)
/// - Options handling: ignore fields, array ordering strategies
/// - Error reporting and validation failure scenarios
/// - Integration with comparison engine and file parsing
///
/// Why This Matters:
/// OutputValidator is the public API that consumers use to validate MongoDB operations.
/// These tests ensure the fluent interface works correctly and provides clear error messages
/// when validation fails, which is critical for debugging failed code examples.
///
/// Key Test Categories:
/// - Fluent API behavior: builder pattern method chaining
/// - File matching: loading expected results from test data files
/// - Option configuration: customizing comparison behavior
/// - Error scenarios: malformed files, comparison failures, missing files
/// </summary>
[TestFixture]
public class OutputValidatorTests
{
    private string GetTestDataPath(string fileName) =>
        Path.Combine(TestContext.CurrentContext.TestDirectory, "TestData", fileName);

    [Test]
    public void Expect_BasicValidation_ReturnsValidationBuilder()
    {
        // Arrange
        var actualOutput = new { name = "Alice" };

        // Act
        var builder = OutputValidator.Expect(actualOutput);

        // Assert
        builder.Should().NotBeNull();
        builder.Should().BeOfType<ValidationBuilder>();
    }

    [Test]
    public void ToMatchFile_StaticMethod_MatchingOutput_ReturnsSuccess()
    {
        // Arrange
        var actualOutput = new Dictionary<string, object>
        {
            { "name", "Alice" },
            { "age", 25 },
            { "active", true }
        };
        var filePath = GetTestDataPath("simple-output.txt");

        // Act
        var result = OutputValidator.ToMatchFile(filePath, actualOutput);

        // Assert
        result.IsSuccess.Should().BeTrue();
        result.ErrorMessage.Should().BeNull();
    }

    [Test]
    public void ToMatchFile_StaticMethod_NonMatchingOutput_ReturnsFailure()
    {
        // Arrange
        var actualOutput = new Dictionary<string, object>
        {
            { "name", "Bob" }, // Different name
            { "age", 25 },
            { "active", true }
        };
        var filePath = GetTestDataPath("simple-output.txt");

        // Act
        var result = OutputValidator.ToMatchFile(filePath, actualOutput);

        // Assert
        result.IsSuccess.Should().BeFalse();
        result.ErrorMessage.Should().NotBeNull();
        result.ErrorMessage.Should().Contain("name");
    }

    [Test]
    public void ToMatchFile_FluentAPI_MatchingOutput_ReturnsSuccess()
    {
        // Arrange
        var actualOutput = new Dictionary<string, object>
        {
            { "name", "Alice" },
            { "age", 25 },
            { "active", true }
        };
        var filePath = GetTestDataPath("simple-output.txt");

        // Act
        var result = OutputValidator.Expect(actualOutput).ToMatchFile(filePath);

        // Assert
        result.IsSuccess.Should().BeTrue();
    }

    [Test]
    public void ToMatchFile_WithCustomOptions_ReturnsSuccess()
    {
        // Arrange
        var actualOutput = new Dictionary<string, object>
        {
            { "name", "Alice" },
            { "age", 25 },
            { "active", true }
        };
        var filePath = GetTestDataPath("simple-output.txt");
        var options = ComparisonOptions.Ordered;

        // Act
        var result = OutputValidator.ToMatchFile(filePath, actualOutput, options);

        // Assert
        result.IsSuccess.Should().BeTrue();
    }

    [Test]
    public void IgnoringFields_FluentAPI_IgnoresSpecifiedFields()
    {
        // Arrange
        var actualOutput = new Dictionary<string, object>
        {
            { "_id", "actual-id-123" },
            { "name", "Alice" },
            { "timestamp", "actual-timestamp" },
            { "data", new Dictionary<string, object>
                {
                    { "value", 42 },
                    { "_id", "nested-id-456" }
                }
            }
        };
        var filePath = GetTestDataPath("with-ignored-fields.txt");

        // Act
        var result = OutputValidator.Expect(actualOutput)
            .IgnoringFields("_id", "timestamp")
            .ToMatchFile(filePath);

        // Assert
        result.IsSuccess.Should().BeTrue();
    }

    [Test]
    public void WithOrderedArrays_FluentAPI_ComparesArraysInOrder()
    {
        // Arrange
        var actualOutput = new object[]
        {
            new Dictionary<string, object> { { "name", "Alice" }, { "score", 85 } },
            new Dictionary<string, object> { { "name", "Bob" }, { "score", 92 } },
            new Dictionary<string, object> { { "name", "Charlie" }, { "score", 78 } }
        };
        var filePath = GetTestDataPath("ordered-array.txt");

        // Act
        var result = OutputValidator.Expect(actualOutput)
            .WithOrderedArrays()
            .ToMatchFile(filePath);

        // Assert
        result.IsSuccess.Should().BeTrue();
    }

    [Test]
    public void WithOrderedArrays_WrongOrder_ReturnsFailure()
    {
        // Arrange
        var actualOutput = new object[]
        {
            new Dictionary<string, object> { { "name", "Bob" }, { "score", 92 } }, // Wrong order
            new Dictionary<string, object> { { "name", "Alice" }, { "score", 85 } },
            new Dictionary<string, object> { { "name", "Charlie" }, { "score", 78 } }
        };
        var filePath = GetTestDataPath("ordered-array.txt");

        // Act
        var result = OutputValidator.Expect(actualOutput)
            .WithOrderedArrays()
            .ToMatchFile(filePath);

        // Assert
        result.IsSuccess.Should().BeFalse();
        result.ErrorMessage.Should().Contain("$[0]"); // Error in first element
    }

    [Test]
    public void IgnoringFields_AndIgnoringFields_CombinesIgnoredFields()
    {
        // Arrange
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
            // Act
            var result = OutputValidator.Expect(actualOutput)
                .IgnoringFields("_id", "timestamp")
                .AndIgnoringFields("sessionId") // Add more ignored fields
                .ToMatchFile(tempFile);

            // Assert
            result.IsSuccess.Should().BeTrue();
        }
        finally
        {
            File.Delete(tempFile);
        }
    }

    [Test]
    public void ValidationResult_ThrowIfFailed_Success_DoesNotThrow()
    {
        // Arrange
        var actualOutput = new Dictionary<string, object> { { "name", "Alice" }, { "age", 25 }, { "active", true } };
        var filePath = GetTestDataPath("simple-output.txt");

        // Act
        var result = OutputValidator.ToMatchFile(filePath, actualOutput);

        // Assert
        Assert.DoesNotThrow(() => result.ThrowIfFailed());
    }

    [Test]
    public void ValidationResult_ThrowIfFailed_Failure_ThrowsValidationException()
    {
        // Arrange
        var actualOutput = new Dictionary<string, object> { { "name", "Bob" } }; // Wrong name
        var filePath = GetTestDataPath("simple-output.txt");

        // Act
        var result = OutputValidator.ToMatchFile(filePath, actualOutput);

        // Assert
        var exception = Assert.Throws<ValidationException>(() => result.ThrowIfFailed());
        exception!.Message.Should().NotBeNullOrEmpty();
    }

    [Test]
    public void ToMatchFile_NonExistentFile_ReturnsFailure()
    {
        // Arrange
        var actualOutput = new { name = "Alice" };
        var nonExistentPath = GetTestDataPath("non-existent-file.txt");

        // Act
        var result = OutputValidator.Expect(actualOutput).ToMatchFile(nonExistentPath);

        // Assert
        result.IsSuccess.Should().BeFalse();
        result.ErrorMessage.Should().Contain("Failed to parse expected output file");
    }

    [Test]
    public void ToMatchFile_ParseError_ReturnsFailure()
    {
        // Arrange
        var actualOutput = new { name = "Alice" };
        var filePath = GetTestDataPath("invalid-syntax.txt");

        // Act
        var result = OutputValidator.Expect(actualOutput).ToMatchFile(filePath);

        // Assert
        result.IsSuccess.Should().BeFalse();
        result.ErrorMessage.Should().Contain("Failed to parse expected output file");
    }

    [Test]
    public void ToMatchFile_AbsolutePath_WorksCorrectly()
    {
        // Arrange
        var actualOutput = new Dictionary<string, object> { { "name", "Alice" }, { "age", 25 }, { "active", true } };
        var absolutePath = Path.GetFullPath(GetTestDataPath("simple-output.txt"));

        // Act
        var result = OutputValidator.Expect(actualOutput).ToMatchFile(absolutePath);

        // Assert
        result.IsSuccess.Should().BeTrue();
    }

    [Test]
    public void ToMatchFile_SingleObjectVsArrayFormat_HandlesCorrectly()
    {
        // Arrange - single object actual vs single object expected
        var actualOutput = new Dictionary<string, object>
        {
            { "name", "Alice" },
            { "age", 25 },
            { "active", true }
        };
        var filePath = GetTestDataPath("simple-output.txt");

        // Act
        var result = OutputValidator.ToMatchFile(filePath, actualOutput);

        // Assert
        result.IsSuccess.Should().BeTrue();
    }

    [Test]
    public void ToMatchFile_ArrayActualVsArrayExpected_HandlesCorrectly()
    {
        // Arrange - array actual vs array expected
        var actualOutput = new object[]
        {
            new Dictionary<string, object> { { "name", "Alice" }, { "score", 85 } },
            new Dictionary<string, object> { { "name", "Bob" }, { "score", 92 } },
            new Dictionary<string, object> { { "name", "Charlie" }, { "score", 78 } }
        };
        var filePath = GetTestDataPath("ordered-array.txt");

        // Act
        var result = OutputValidator.ToMatchFile(filePath, actualOutput);

        // Assert
        result.IsSuccess.Should().BeTrue();
    }

    [TestFixture]
    public class ValidationBuilderWithOptionsTests
    {
        private string GetTestDataPath(string fileName) =>
            Path.Combine(TestContext.CurrentContext.TestDirectory, "TestData", fileName);

        [Test]
        public void WithOrderedArrays_AfterIgnoringFields_MaintainsBothSettings()
        {
            // Arrange
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
                // Act
                var result = OutputValidator.Expect(actualOutput)
                    .IgnoringFields("_id")
                    .WithOrderedArrays()
                    .ToMatchFile(tempFile);

                // Assert
                result.IsSuccess.Should().BeTrue();
            }
            finally
            {
                File.Delete(tempFile);
            }
        }

        [Test]
        public void AndIgnoringFields_AddsToExistingIgnoredFields()
        {
            // Arrange
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
                // Act
                var result = OutputValidator.Expect(actualOutput)
                    .IgnoringFields("_id")
                    .AndIgnoringFields("timestamp", "sessionId")
                    .ToMatchFile(tempFile);

                // Assert
                result.IsSuccess.Should().BeTrue();
            }
            finally
            {
                File.Delete(tempFile);
            }
        }

        [Test]
        public void ChainedFluentMethods_AllOptionsAppliedCorrectly()
        {
            // Arrange - ordered array with ignored fields
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
                // Act - chain multiple fluent methods
                var result = OutputValidator.Expect(actualOutput)
                    .IgnoringFields("_id")           // First ignore some fields
                    .WithOrderedArrays()             // Set ordered comparison
                    .AndIgnoringFields("timestamp")  // Add more ignored fields
                    .ToMatchFile(tempFile);

                // Assert
                result.IsSuccess.Should().BeTrue();
            }
            finally
            {
                File.Delete(tempFile);
            }
        }
    }

    [TestFixture]
    public class ValidationResultTests
    {
        [Test]
        public void ValidationSuccess_Properties_AreCorrect()
        {
            // Arrange & Act
            var success = ValidationResult.Success();

            // Assert
            success.IsSuccess.Should().BeTrue();
            success.ErrorMessage.Should().BeNull();
        }

        [Test]
        public void ValidationFailure_Properties_AreCorrect()
        {
            // Arrange
            var errorMessage = "Test error message";

            // Act
            var failure = ValidationResult.Failure(errorMessage);

            // Assert
            failure.IsSuccess.Should().BeFalse();
            failure.ErrorMessage.Should().Be(errorMessage);
        }

        [Test]
        public void ValidationException_Constructor_SetsMessage()
        {
            // Arrange
            var message = "Test validation error";

            // Act
            var exception = new ValidationException(message);

            // Assert
            exception.Message.Should().Be(message);
        }

        [Test]
        public void ValidationException_ConstructorWithInnerException_SetsMessageAndInnerException()
        {
            // Arrange
            var message = "Test validation error";
            var innerException = new ArgumentException("Inner error");

            // Act
            var exception = new ValidationException(message, innerException);

            // Assert
            exception.Message.Should().Be(message);
            exception.InnerException.Should().Be(innerException);
        }

        [Test]
        public void ToMatchFile_FileNotFound_ReturnsFailureWithParseError()
        {
            // Arrange
            var nonExistentFile = "definitely-does-not-exist.txt";
            var actualOutput = new { test = "value" };

            // Act
            var result = OutputValidator.ToMatchFile(nonExistentFile, actualOutput);

            // Assert
            result.IsSuccess.Should().BeFalse();
            result.ErrorMessage.Should().Contain("Failed to parse expected output file");
            result.ErrorMessage.Should().Contain("Expected output file not found");
        }

        [Test]
        public void ToMatchFile_AbsolutePath_UsesPathAsIs()
        {
            // Arrange - create a temp file with absolute path
            var tempFile = Path.GetTempFileName();
            var absolutePath = Path.GetFullPath(tempFile);

            try
            {
                File.WriteAllText(tempFile, """
                { "test": "value" }
                """);
                var actualOutput = new Dictionary<string, object> { { "test", "value" } };

                // Act
                var result = OutputValidator.ToMatchFile(absolutePath, actualOutput);

                // Assert
                result.IsSuccess.Should().BeTrue();
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
            // Arrange - pass null expected file path to trigger an exception
            var actualOutput = new { test = "value" };

            // Act
            var result = OutputValidator.Expect(actualOutput).ToMatchFile(null!);

            // Assert
            result.IsSuccess.Should().BeFalse();
            result.ErrorMessage.Should().Contain("Validation error");
        }

        [Test]
        public void ToMatchFile_MalformedExpectedFile_ReturnsParseFailure()
        {
            // Arrange - create temp file with invalid content
            var tempFile = Path.GetTempFileName();
            try
            {
                File.WriteAllText(tempFile, """
                { invalid: json syntax }
                """);
                var actualOutput = new { test = "value" };

                // Act
                var result = OutputValidator.ToMatchFile(tempFile, actualOutput);

                // Assert
                result.IsSuccess.Should().BeFalse();
                result.ErrorMessage.Should().Contain("Failed to parse expected output file");
            }
            finally
            {
                if (File.Exists(tempFile))
                    File.Delete(tempFile);
            }
        }

        #region Array Comparison Strategy Tests
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
            new { date = DateTime.Parse("2021-12-18T15:57:00Z").ToUniversalTime(), ticker = "MDB", close = 253.62, volume = 40182.0 },
            new { date = DateTime.Parse("2021-12-18T15:55:00Z").ToUniversalTime(), ticker = "MDB", close = 254.03, volume = 40270.0 },
            new { date = DateTime.Parse("2021-12-18T15:56:00Z").ToUniversalTime(), ticker = "MDB", close = 253.63, volume = 27890.0 }
        };

            // Unordered comparison should succeed
            var result = OutputValidator.Expect(actualResults)
                .ToMatchText(expectedText); // Default is unordered

            result.IsSuccess.Should().BeTrue($"Expected success but got: {result.ErrorMessage}");
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

            // Ordered comparison should succeed
            var result = OutputValidator.Expect(actualResults)
                .WithOrderedArrays()
                .ToMatchText(expectedText);

            result.IsSuccess.Should().BeTrue($"Expected success but got: {result.ErrorMessage}");

            // Verify that wrong order fails
            var wrongOrderResults = new[]
            {
            new { category = "Books", totalSales = 800.00 }, // Wrong order
            new { category = "Electronics", totalSales = 1500.00 },
            new { category = "Clothing", totalSales = 1200.00 }
        };

            var wrongOrderResult = OutputValidator.Expect(wrongOrderResults)
                .WithOrderedArrays()
                .ToMatchText(expectedText);

            wrongOrderResult.IsSuccess.Should().BeFalse("Wrong order should fail with ordered arrays");
        }

        #endregion

        /// <summary>
        /// Tests for error handling edge cases in output validation.
        /// These tests ensure the validation system handles error scenarios gracefully.
        /// </summary>
        [TestFixture]
        public class ErrorHandlingTests
        {
            [Test]
            public void ToMatchFile_WithNonExistentFile_ProvidesHelpfulError()
            {
                // Arrange
                var nonExistentFile = "/path/that/does/not/exist.txt";
                var actualData = new { test = "data" };

                // Act
                var result = OutputValidator.ToMatchFile(nonExistentFile, actualData);

                // Assert
                result.IsSuccess.Should().BeFalse();
                result.ErrorMessage.Should().NotBeNull();
                result.ErrorMessage.Should().Contain("file");
                result.ErrorMessage.Should().Contain(nonExistentFile);
            }
        }
    }
}
