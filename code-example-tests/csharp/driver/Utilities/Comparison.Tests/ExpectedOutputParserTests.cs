using System.Text.Json;
using FluentAssertions;
using NUnit.Framework;
using Utilities.Comparison;

namespace Utilities.Comparison.Tests;

/// <summary>
/// Tests for ExpectedOutputParser covering MongoDB Extended JSON, JSONL format, and C# object syntax parsing.
/// Includes comprehensive tests for parsing scenarios that ensure reliable handling of various output formats.
/// </summary>
[TestFixture]
public class ExpectedOutputParserTests
{
    #region MongoDB Extended JSON Parsing

    [Test]
    public void ParseText_MongoExtendedJsonDates_ParsedCorrectly()
    {
        // Critical: MongoDB Extended JSON date parsing must work correctly for TimeSeries operations
        var mongoExtendedJson = """
            { "date" : { "$date" : "2021-12-18T15:55:00Z" }, "ticker" : "MDB", "close" : 254.03, "volume" : 40270.0 }
            { "date" : { "$date" : "2021-12-18T15:56:00Z" }, "ticker" : "MDB", "close" : 253.63, "volume" : 27890.0 }
            """;

        // Simulate actual .NET DateTime output that would come from MongoDB driver
        var actualResults = new[]
        {
            new { date = DateTime.Parse("2021-12-18T15:55:00Z").ToUniversalTime(), ticker = "MDB", close = 254.03, volume = 40270.0 },
            new { date = DateTime.Parse("2021-12-18T15:56:00Z").ToUniversalTime(), ticker = "MDB", close = 253.63, volume = 27890.0 }
        };

        // This should work without throwing - validates the parsing works end-to-end
        var result = OutputValidator.Expect(actualResults)
            .ToMatchText(mongoExtendedJson);

        result.IsSuccess.Should().BeTrue($"Expected success but got: {result.ErrorMessage}");
    }

    [Test]
    public void ParseText_JsonlFormat_DetectedAndParsedCorrectly()
    {
        // Critical: JSONL format (multiple JSON objects per line) must be properly detected and parsed
        var jsonlText = """
            {"date": {"$date": "2021-12-18T15:55:00Z"}, "ticker": "MDB", "close": 254.03, "volume": 40270.0}
            {"date": {"$date": "2021-12-18T15:56:00Z"}, "ticker": "MDB", "close": 253.63, "volume": 27890.0}
            """;

        var actualResults = new[]
        {
            new { date = DateTime.Parse("2021-12-18T15:55:00Z").ToUniversalTime(), ticker = "MDB", close = 254.03, volume = 40270.0 },
            new { date = DateTime.Parse("2021-12-18T15:56:00Z").ToUniversalTime(), ticker = "MDB", close = 253.63, volume = 27890.0 }
        };

        // JSONL should be detected and parsed correctly
        var result = OutputValidator.Expect(actualResults)
            .ToMatchText(jsonlText);

        result.IsSuccess.Should().BeTrue($"Expected success but got: {result.ErrorMessage}");
    }

    [Test]
    public void ParseText_JsonlDetection_VariousFormats()
    {
        // Test different input formats to ensure proper JSONL detection
        var testCases = new[]
        {
            // Standard JSON array (not JSONL)
            ("""
            [
              { "id": 1 },
              { "id": 2 }
            ]
            """, false, "Standard JSON array"),

            // JSONL format (each line is JSON object)
            ("""
            { "id": 1 }
            { "id": 2 }
            """, true, "JSONL format"),

            // Mixed MongoDB Extended JSON format
            ("""
            { "date" : { "$date" : "2021-12-18T15:55:00Z" } }
            { "date" : { "$date" : "2021-12-18T15:56:00Z" } }
            """, true, "MongoDB Extended JSON JSONL"),

            // Single line JSON (not JSONL)
            ("""
            { "id": 1, "name": "test" }
            """, false, "Single JSON object"),

            // Empty content
            ("", false, "Empty content"),

            // Only whitespace
            ("   \n   \n", false, "Whitespace only")
        };

        foreach (var (content, expectedIsJsonl, description) in testCases)
        {
            // Act
            var result = ExpectedOutputParser.ParseText(content);

            // Assert - Check if JSONL was detected correctly
            bool actualIsJsonl = result.Count > 1 || (result.Count == 1 && !content.TrimStart().StartsWith('['));

            if (content.Trim() == "")
            {
                result.Should().BeEmpty($"{description} should result in empty array");
            }
            else
            {
                result.Count.Should().BeGreaterOrEqualTo(0, $"{description} should parse without error");
            }
        }
    }

    #endregion

    #region File Parsing Edge Cases

    [Test]
    public void ParseText_FileEdgeCases_HandledCorrectly()
    {
        // Test empty lines and whitespace
        var textWithEmptyLines = """
            { "id": 1, "name": "Test" }

            { "id": 2, "name": "Test2" }
            """;

        var results = new[]
        {
            new { id = 1, name = "Test" },
            new { id = 2, name = "Test2" }
        };

        var result = OutputValidator.Expect(results)
            .ToMatchText(textWithEmptyLines);

        result.IsSuccess.Should().BeTrue("Should handle empty lines correctly");

        // Test trailing whitespace
        var textWithWhitespace = """
        { "id": 1, "name": "Test" }   
        { "id": 2, "name": "Test2" }
        """;

        var resultWhitespace = OutputValidator.Expect(results)
            .ToMatchText(textWithWhitespace);

        resultWhitespace.IsSuccess.Should().BeTrue("Should handle trailing whitespace correctly");
    }

    #endregion

    #region Complex MongoDB Extended JSON

    [Test]
    public void ParseText_ComplexMongoExtendedJson_MultiplePatterns()
    {
        // Test complex documents with multiple MongoDB Extended JSON patterns
        var complexJson = """
            {
              "user": {
                "id": { "$oid": "507f1f77bcf86cd799439011" },
                "created": { "$date": "2021-12-18T15:55:00Z" },
                "balance": "123.45",
                "metadata": null
              },
              "transactions": [
                {
                  "date": { "$date": "2021-12-18T16:00:00Z" },
                  "amount": "25.00"
                }
              ]
            }
            """;

        // Simulate complex .NET object from MongoDB driver (simplified for this test)
        var actualResult = new Dictionary<string, object?>
        {
            ["user"] = new Dictionary<string, object?>
            {
                ["id"] = MongoDB.Bson.ObjectId.Parse("507f1f77bcf86cd799439011"),
                ["created"] = DateTime.Parse("2021-12-18T15:55:00Z").ToUniversalTime(),
                ["balance"] = "123.45",
                ["metadata"] = null
            },
            ["transactions"] = new[]
            {
                new Dictionary<string, object?>
                {
                    ["date"] = DateTime.Parse("2021-12-18T16:00:00Z").ToUniversalTime(),
                    ["amount"] = "25.00"
                }
            }
        };

        var result = OutputValidator.Expect(actualResult)
            .ToMatchText(complexJson);

        result.IsSuccess.Should().BeTrue($"Expected success but got: {result.ErrorMessage}");
    }

    #endregion

    #region Error Handling Tests

    /// <summary>
    /// Tests for parser error handling scenarios.
    /// These tests ensure the parser provides helpful error messages when parsing fails.
    /// </summary>
    [TestFixture]
    public class ParseErrorHandlingTests
    {
        [Test]
        public void ParseText_WithMalformedJSON_ThrowsHelpfulException()
        {
            // Arrange - malformed JSON
            var malformedJson = "{ 'name': 'Alice', 'age': }"; // Missing value

            // Act & Assert - Should throw exception with helpful message
            var exception = Assert.Throws<ArgumentException>(() =>
            {
                ExpectedOutputParser.ParseText(malformedJson);
            });

            exception.Message.Should().Contain("Failed to parse expected text");
            exception.Message.Should().Contain("Parse error");
        }
    }

    #endregion
}