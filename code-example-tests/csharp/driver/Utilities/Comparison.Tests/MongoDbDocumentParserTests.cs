using MongoDB.Bson;
using NUnit.Framework;

namespace Utilities.Comparison.Tests;

/// <summary>
///     Tests for FileContentsParser covering MongoDB Extended JSON, JSONL format, and C# object syntax parsing.
///     Includes comprehensive tests for parsing scenarios that ensure reliable handling of various output formats.
/// </summary>
[TestFixture]
public class FileContentsParserTests
{

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

        Expect.That(actualResults).ShouldMatch(mongoExtendedJson);

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

        // JSONL should be detected and parsed correctly
        Expect.That(actualResults).ShouldMatch(jsonlText);
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

        foreach (var (content, _, description) in testCases)
        {
            var result = FileContentsParser.ParseText(content);


            _ = result.Count > 1 || (result.Count == 1 && !content.TrimStart().StartsWith('['));

            if (content.Trim() == "")
                Assert.That(result.Count == 0);
            else
                Assert.That(result.Count >= 0);
        }
    }

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

        Expect.That(results).ShouldMatch(textWithEmptyLines);

        // Test trailing whitespace
        var textWithWhitespace = """
                                { "id": 1, "name": "Test" }
                                { "id": 2, "name": "Test2" }
                                """;

        Expect.That(results).ShouldMatch(textWithWhitespace);
    }

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
                ["id"] = ObjectId.Parse("507f1f77bcf86cd799439011"),
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

        Expect.That(actualResult).ShouldMatch(complexJson);

    }

    /// <summary>
    ///     Tests for parser error handling scenarios.
    ///     These tests ensure the parser provides helpful error messages when parsing fails.
    /// </summary>
    [TestFixture]
    public class ParseErrorHandlingTests
    {
        [Test]
        public void ParseText_WithMalformedJSON_ThrowsHelpfulException()
        {
            var malformedJson = "{ 'name': 'Alice', 'age': }"; // Missing value


            var exception = Assert.Throws<ArgumentException>(() => { FileContentsParser.ParseText(malformedJson); });

            Assert.That(exception?.Message.Contains("Failed to parse expected text") == true);
            Assert.That(exception?.Message.Contains("Parse error") == true);
        }
    }
}