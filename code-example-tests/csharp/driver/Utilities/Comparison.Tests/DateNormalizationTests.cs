using MongoDB.Bson;
using NUnit.Framework;

namespace Utilities.Comparison.Tests;

/// <summary>
///     Tests for DateTime normalization ensuring equivalent date formats are properly compared.
///     Background:
///     MongoDB Extended JSON supports multiple equivalent datetime formats that should be treated
///     as identical during comparison. These tests verify that timezone variations, precision
///     differences, and format variations don't cause false comparison failures.
///     Application Context:
///     MongoDB Extended JSON supports multiple equivalent datetime formats that should be treated
///     as identical during comparison. This test suite ensures the normalization logic handles
///     timezone variations, precision differences, and format variations properly.
/// </summary>
[TestFixture]
public class DateNormalizationTests
{
    /// <summary>
    ///     Verifies that functionally equivalent datetime formats are treated as equal during comparison.
    ///     Test Scenarios:
    ///     1. UTC timezone format variations: "Z" vs "+00:00"
    ///     2. Microsecond precision differences: "456" vs "456000"
    ///     3. ISO 8601 format variations that represent the same instant
    ///     Why This Test Exists:
    ///     Code examples need timezone format flexibility between expected (manually written)
    ///     and actual (MongoDB driver output) datetime strings to ensure reliable validation.
    /// </summary>
    [Test]
    [Description("Tests that functionally equivalent datetime formats are treated as equal during comparison")]
    public void DateNormalization_EquivalentFormats_ShouldMatch()
    {
        // Test the specific failing scenarios from our real-world tests

        // Test 1: Z vs +00:00 timezone formats
        var expected1Json = """{ "date": { "$date": "2023-09-04T10:15:30.123Z" } }""";
        var actual1Json = """{ "date": { "$date": "2023-09-04T10:15:30.123+00:00" } }""";

        // Parse JSON strings to BsonDocument so ValueNormalizer can process $date objects
        var expected1 = BsonDocument.Parse(expected1Json);
        var actual1 = BsonDocument.Parse(actual1Json);

        var result1 = Expect.That(expected1).ShouldMatch(actual1);

        // Debug output if test fails
        if (!result1.IsSuccess) Console.WriteLine($"Test 1 failed. Error: {result1.Error}");

        Assert.That(result1.IsSuccess, Is.True, $"Z and +00:00 should be equivalent UTC formats. Error: {result1.Error}");

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

        var result2 = Expect.That(expected2).ShouldMatch(actual2);

        if (!result2.IsSuccess) Console.WriteLine($"Test 2 failed. Error: {result2.Error}");
        Assert.That(result2.IsSuccess, Is.True, $"Different microsecond precision should normalize to same value. Error: {result2.Error}");
    }

    [Test]
    [Description("Tests that deeply nested JSON structures match correctly regardless of formatting")]
    public void Compare_DeeplyNestedJson_TimeSeriesMetadata_ShouldMatch()
    {
        var expectedJson = TestDataConstants.RealWorldExamples.TimeSeriesMetadata;
        var actualJson = TestDataConstants.RealWorldExamples.TimeSeriesMetadataCompact;

        // Parse JSON strings to BsonDocument for structured comparison
        var expected = BsonDocument.Parse(expectedJson);
        var actual = BsonDocument.Parse(actualJson);

        var result = Expect.That(expected).ShouldMatch(actual);

        Assert.That(result.IsSuccess, Is.True, $"Deeply nested JSON should match regardless of formatting. Error: {result.Error}");
        Assert.That(result.Error, Is.Null, $"Deeply nested JSON should match regardless of formatting. Error: {result.Error}");
    }

    [Test]
    [Description("Tests that deeply nested JSON with different values should not match")]
    public void Compare_DeeplyNestedJson_WithDifferentNestedValue_ShouldNotMatch()
    {
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

        Expect.That(actualWithDifferentValue).ShouldNotMatch(expected);
    }

    [Test]
    [Description("Tests that deeply nested JSON with missing properties should not match")]
    public void Compare_DeeplyNestedJson_WithMissingNestedProperty_ShouldNotMatch()
    {
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

        Expect.That(expected).ShouldNotMatch(actualMissingProperty);
    }

    [Test]
    [Description("Tests that deeply nested JSON with extra properties should not match")]
    public void Compare_DeeplyNestedJson_WithExtraNestedProperty_ShouldNotMatch()
    {
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

        var result = Expect.That(expected).ShouldNotMatch(actualWithExtra);
    }

    [Test]
    [Description("Tests that mixed date formats in arrays are handled gracefully")]
    public void Compare_MixedDateFormats_ShouldHandleGracefully()
    {
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

        var result = Expect.That(actualMixed).ShouldMatch(expected);

        Assert.That(result.IsSuccess, Is.True, "equivalent date formats should be normalized to match");
    }

    [Test]
    [Description("Tests that very large numbers are handled correctly during comparison")]
    public void Compare_VeryLargeNumbers_ShouldHandleCorrectly()
    {
        var expected = """
                       { "count": 9223372036854775807, "bigDecimal": { "$numberDecimal": "12345678901234567890.123456789" } }
                       """;
        var actual = """
                     { "count": 9223372036854775807, "bigDecimal": { "$numberDecimal": "12345678901234567890.123456789" } }
                     """;

        var result = Expect.That(actual).ShouldMatch(expected);

        Assert.That(result.IsSuccess, Is.True, "large numbers should be handled correctly");
    }
}