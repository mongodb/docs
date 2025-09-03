using FluentAssertions;
using MongoDB.Bson;
using NUnit.Framework;

namespace Utilities.Comparison.Tests;

/// <summary>
/// Tests for DateTime normalization ensuring equivalent date formats are properly compared.
///
/// Background:
/// MongoDB Extended JSON supports multiple equivalent datetime formats that should be treated
/// as identical during comparison. These tests verify that timezone variations, precision
/// differences, and format variations don't cause false comparison failures.
///
/// Application Context:
/// MongoDB Extended JSON supports multiple equivalent datetime formats that should be treated
/// as identical during comparison. This test suite ensures the normalization logic handles
/// timezone variations, precision differences, and format variations properly.
/// </summary>
[TestFixture]
public class DateNormalizationTests
{
    /// <summary>
    /// Verifies that functionally equivalent datetime formats are treated as equal during comparison.
    ///
    /// Test Scenarios:
    /// 1. UTC timezone format variations: "Z" vs "+00:00"
    /// 2. Microsecond precision differences: "456" vs "456000"
    /// 3. ISO 8601 format variations that represent the same instant
    ///
    /// Why This Test Exists:
    /// Code examples need timezone format flexibility between expected (manually written)
    /// and actual (MongoDB driver output) datetime strings to ensure reliable validation.
    /// </summary>
    [Test]
    public void DateNormalization_EquivalentFormats_ShouldMatch()
    {
        // Test the specific failing scenarios from our real-world tests

        // Test 1: Z vs +00:00 timezone formats
        var expected1Json = """{ "date": { "$date": "2023-09-04T10:15:30.123Z" } }""";
        var actual1Json = """{ "date": { "$date": "2023-09-04T10:15:30.123+00:00" } }""";

        // Parse JSON strings to BsonDocument so ValueNormalizer can process $date objects
        var expected1 = BsonDocument.Parse(expected1Json);
        var actual1 = BsonDocument.Parse(actual1Json);

        var result1 = ComparisonEngine.Compare(expected1, actual1);

        // Debug output if test fails
        if (!result1.IsSuccess)
        {
            Console.WriteLine($"Test 1 failed. Error: {result1.Error}");
        }

        result1.IsSuccess.Should().BeTrue($"Z and +00:00 should be equivalent UTC formats. Error: {result1.Error}");

        // Test 2: Different microsecond precision
        var expected2Json = """
        { "date": { "$date": "2023-09-04T10:16:30.456Z" } }
        """;
        var actual2Json = """
        { "date": { "$date": "2023-09-04T10:16:30.456000Z" } }
        """;

        // Parse JSON strings to BsonDocument so ValueNormalizer can process $date objects
        var expected2 = BsonDocument.Parse(expected2Json);
        var actual2 = BsonDocument.Parse(actual2Json);

        var result2 = ComparisonEngine.Compare(expected2, actual2);

        if (!result2.IsSuccess)
        {
            Console.WriteLine($"Test 2 failed. Error: {result2.Error}");
        }

        result2.IsSuccess.Should().BeTrue($"Different microsecond precision should normalize to same value. Error: {result2.Error}");
    }

    [Test]
    public void Compare_DeeplyNestedJson_TimeSeriesMetadata_ShouldMatch()
    {
        // Arrange - Testing real-world deeply nested JSON from MongoDB C# Driver documentation
        var expectedJson = TestDataConstants.RealWorldExamples.TimeSeriesMetadata;
        var actualJson = TestDataConstants.RealWorldExamples.TimeSeriesMetadataCompact;

        // Parse JSON strings to BsonDocument for structured comparison
        var expected = BsonDocument.Parse(expectedJson);
        var actual = BsonDocument.Parse(actualJson);

        // Act
        var result = ComparisonEngine.Compare(expected, actual);

        // Assert
        result.IsSuccess.Should().BeTrue("deeply nested JSON should match regardless of formatting");
        result.Error.Should().BeNull();
    }

    [Test]
    public void Compare_DeeplyNestedJson_WithDifferentNestedValue_ShouldNotMatch()
    {
        // Arrange
        var expectedJson = TestDataConstants.RealWorldExamples.TimeSeriesMetadata;
        var actualWithDifferentValueJson = """
            {
               "name": "september2021",
               "type": "timeseries",
               "options": {
                  "timeseries": {
                     "timeField": "temperature",
                     "granularity": "minutes",
                     "bucketMaxSpanSeconds": 3600
                  }
               },
               "info": {
                  "readOnly": false
               }
            }
            """;

        // Parse JSON strings to BsonDocument for detailed field-level error reporting
        var expected = BsonDocument.Parse(expectedJson);
        var actualWithDifferentValue = BsonDocument.Parse(actualWithDifferentValueJson);

        // Act
        var result = ComparisonEngine.Compare(expected, actualWithDifferentValue);

        // Assert
        result.IsSuccess.Should().BeFalse("different nested values should cause mismatch");
        result.Error.Should().NotBeNull();
        result.Error!.ToString().Should().ContainAny("granularity", "seconds", "minutes");
    }

    [Test]
    public void Compare_DeeplyNestedJson_WithMissingNestedProperty_ShouldNotMatch()
    {
        // Arrange
        var expectedJson = TestDataConstants.RealWorldExamples.TimeSeriesMetadata;
        var actualMissingPropertyJson = """
            {
               "name": "september2021",
               "type": "timeseries",
               "options": {
                  "timeseries": {
                     "timeField": "temperature",
                     "granularity": "seconds"
                  }
               },
               "info": {
                  "readOnly": false
               }
            }
            """;

        // Parse JSON strings to BsonDocument for detailed field-level error reporting
        var expected = BsonDocument.Parse(expectedJson);
        var actualMissingProperty = BsonDocument.Parse(actualMissingPropertyJson);

        // Act
        var result = ComparisonEngine.Compare(expected, actualMissingProperty);

        // Assert
        result.IsSuccess.Should().BeFalse("missing nested property should cause mismatch");
        result.Error.Should().NotBeNull();
        result.Error!.ToString().Should().Contain("bucketMaxSpanSeconds");
    }

    [Test]
    public void Compare_DeeplyNestedJson_WithExtraNestedProperty_ShouldNotMatch()
    {
        // Arrange
        var expectedJson = TestDataConstants.RealWorldExamples.TimeSeriesMetadata;
        var actualWithExtraJson = """
            {
               "name": "september2021",
               "type": "timeseries",
               "options": {
                  "timeseries": {
                     "timeField": "temperature",
                     "granularity": "seconds",
                     "bucketMaxSpanSeconds": 3600,
                     "metaField": "device"
                  }
               },
               "info": {
                  "readOnly": false
               }
            }
            """;

        // Parse JSON strings to BsonDocument for detailed field-level error reporting
        var expected = BsonDocument.Parse(expectedJson);
        var actualWithExtra = BsonDocument.Parse(actualWithExtraJson);

        // Act
        var result = ComparisonEngine.Compare(expected, actualWithExtra);

        // Assert
        result.IsSuccess.Should().BeFalse("extra nested property should cause mismatch");
        result.Error.Should().NotBeNull();
        result.Error!.ToString().Should().Contain("metaField");
    }

    [Test]
    public void Compare_MixedDateFormats_ShouldHandleGracefully()
    {
        // Arrange - Test more challenging mixed date format scenarios
        var expectedJson = """
            { "items": [
                { "created": { "$date": "2023-09-04T10:15:30.123Z" } },
                { "created": { "$date": "2023-09-04T10:16:30.456Z" } }
            ]}
            """;
        var actualMixedJson = """
            { "items": [
                { "created": { "$date": "2023-09-04T10:15:30.123+00:00" } },
                { "created": { "$date": "2023-09-04T10:16:30.456000Z" } }
            ]}
            """;

        // Parse JSON strings to BsonDocument so ValueNormalizer can process $date objects
        var expected = BsonDocument.Parse(expectedJson);
        var actualMixed = BsonDocument.Parse(actualMixedJson);

        // Act
        var result = ComparisonEngine.Compare(expected, actualMixed);

        // Assert - This validates comprehensive date format normalization
        result.IsSuccess.Should().BeTrue("equivalent date formats should be normalized to match");
    }

    [Test]
    public void Compare_VeryLargeNumbers_ShouldHandleCorrectly()
    {
        // Arrange - Test large numbers that might cause precision issues
        var expected = """
            { "count": 9223372036854775807, "bigDecimal": { "$numberDecimal": "12345678901234567890.123456789" } }
            """;
        var actual = """
            { "count": 9223372036854775807, "bigDecimal": { "$numberDecimal": "12345678901234567890.123456789" } }
            """;

        // Act
        var result = ComparisonEngine.Compare(expected, actual);

        // Assert
        result.IsSuccess.Should().BeTrue("large numbers should be handled correctly");
    }
}
