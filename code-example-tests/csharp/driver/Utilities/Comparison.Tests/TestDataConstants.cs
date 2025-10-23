using MongoDB.Bson;

namespace Utilities.Comparison.Tests;

/// <summary>
///     Centralized test data constants to avoid duplication across test files.
///     This reduces the maintenance burden and ensures consistency in test scenarios.
/// </summary>
public static class TestDataConstants
{
    /// <summary>
    ///     Common TimeSeries test data used across multiple test scenarios.
    ///     Represents a realistic MongoDB time-series collection output format.
    /// </summary>
    public static class TimeSeries
    {
        // MongoDB Extended JSON format (as stored in expected output files)
        public const string ExtendedJsonFormat = """
                                                 { "date" : { "$date" : "2021-12-18T15:55:00Z" }, "ticker" : "MDB", "close" : 254.03, "volume" : 40270.0 }
                                                 { "date" : { "$date" : "2021-12-18T15:56:00Z" }, "ticker" : "MDB", "close" : 253.63, "volume" : 27890.0 }
                                                 { "date" : { "$date" : "2021-12-18T15:57:00Z" }, "ticker" : "MDB", "close" : 253.62, "volume" : 40182.0 }
                                                 """;

        // JSONL format (single-line JSON objects)
        public const string JsonlFormat = """
                                          {"date": {"$date": "2021-12-18T15:55:00Z"}, "ticker": "MDB", "close": 254.03, "volume": 40270.0}
                                          {"date": {"$date": "2021-12-18T15:56:00Z"}, "ticker": "MDB", "close": 253.63, "volume": 27890.0}
                                          """;

        // Actual .NET objects as returned by MongoDB C# driver
        public static readonly object[] ActualResults = new object[]
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
            },
            new
            {
                date = DateTime.Parse("2021-12-18T15:57:00Z").ToUniversalTime(), ticker = "MDB", close = 253.62,
                volume = 40182.0
            }
        };

        // BsonDocument format for testing normalization
        public static readonly BsonDocument[] BsonResults = new[]
        {
            new BsonDocument
            {
                { "date", new BsonDateTime(DateTime.Parse("2021-12-18T15:55:00Z").ToUniversalTime()) },
                { "ticker", "MDB" },
                { "close", new BsonDouble(254.03) },
                { "volume", new BsonDouble(40270.0) }
            },
            new BsonDocument
            {
                { "date", new BsonDateTime(DateTime.Parse("2021-12-18T15:56:00Z").ToUniversalTime()) },
                { "ticker", "MDB" },
                { "close", new BsonDouble(253.63) },
                { "volume", new BsonDouble(27890.0) }
            }
        };
    }

    /// <summary>
    ///     Standard MongoDB Extended JSON type examples for testing normalization.
    ///     These represent the common patterns found in MongoDB output files.
    /// </summary>
    public static class ExtendedJsonTypes
    {
        public static readonly Dictionary<string, object> ObjectId = new()
        {
            { "$oid", "507f1f77bcf86cd799439011" }
        };

        public static readonly Dictionary<string, object> DateTime = new()
        {
            { "$date", "2021-12-18T15:55:00Z" }
        };

        public static readonly Dictionary<string, object> NumberLong = new()
        {
            { "$numberLong", "9223372036854775807" }
        };

        public static readonly Dictionary<string, object> NumberDecimal = new()
        {
            { "$numberDecimal", "123.45" }
        };

        public static readonly Dictionary<string, object> BinaryData = new()
        {
            { "$binary", "SGVsbG8gV29ybGQ=" },
            { "$type", "00" }
        };

        // Invalid formats for error testing
        public static readonly Dictionary<string, object> InvalidObjectId = new()
        {
            { "$oid", "invalid-objectid-format" }
        };

        public static readonly Dictionary<string, object> InvalidDate = new()
        {
            { "$date", "not-a-date" }
        };
    }

    /// <summary>
    ///     Numeric test data for type compatibility testing.
    ///     Tests the nuanced numeric type handling requirements.
    /// </summary>
    public static class NumericTypes
    {
        // Same logical value in different numeric types
        public static readonly object[] SameValue = new object[]
        {
            42, // int
            42L, // long  
            42.0, // double
            42.0f, // float
            42m // decimal
        };

        // Edge cases for precision handling - avoid values that cause overflow
        public static readonly (object expected, object actual, bool shouldMatch)[] PrecisionTestCases =
            new (object, object, bool)[]
            {
                (42, 42.0, true), // int vs double - should match
                (42.0, 42, true), // double vs int - should match  
                (42.1, 42, false), // different values - should not match
                (1e10, (decimal)1e10, true), // Large but safe numbers
                (999999999L, 999999999.0, true) // Large long vs double that won't overflow
            };
    }

    /// <summary>
    ///     Complex object structures for testing deep nesting and edge cases.
    ///     Used to verify performance and correctness under realistic scenarios.
    /// </summary>
    public static class ComplexObjects
    {
        public static readonly Dictionary<string, object?> DeepNested = new()
        {
            {
                "level1", new Dictionary<string, object?>
                {
                    {
                        "level2", new Dictionary<string, object?>
                        {
                            {
                                "level3", new Dictionary<string, object?>
                                {
                                    {
                                        "level4", new Dictionary<string, object?>
                                        {
                                            { "deepValue", "found" },
                                            { "array", new object[] { 1, 2, 3 } },
                                            { "nullField", null }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        };

        public static readonly object?[] MixedTypeArray = new object?[]
        {
            "string",
            42,
            true,
            null,
            new { nested = "object" },
            new[] { 1, 2, 3 }
        };
    }

    /// <summary>
    ///     Real-world documentation examples for testing realistic MongoDB C# Driver output patterns.
    ///     Based on actual examples found in the official MongoDB C# Driver documentation.
    /// </summary>
    public static class RealWorldExamples
    {
        /// <summary>
        ///     Multi-line string list pattern as seen in Distinct() operations.
        ///     Example from: content/csharp/current/source/crud/query/distinct.txt
        /// </summary>
        public const string BoroughList = """
                                          Bronx
                                          Brooklyn
                                          Manhattan
                                          Missing
                                          Queens
                                          Staten Island
                                          """;

        /// <summary>
        ///     Time series collection metadata - deeply nested JSON structure.
        ///     Example from: content/csharp/current/source/time-series.txt
        ///     This represents the most complex nested JSON pattern in the documentation.
        /// </summary>
        public const string TimeSeriesMetadata = """
                                                 {
                                                    "name": "september2021",
                                                    "type": "timeseries",
                                                    "options": {
                                                       "timeseries": {
                                                          "timeField": "temperature",
                                                          "granularity": "seconds",
                                                          "bucketMaxSpanSeconds": 3600
                                                       }
                                                    },
                                                    "info": {
                                                       "readOnly": false
                                                    }
                                                 }
                                                 """;

        /// <summary>
        ///     GridFS metadata with Extended JSON ObjectId and Date patterns.
        ///     Example from: content/csharp/current/source/crud/gridfs.txt
        /// </summary>
        public const string GridFSMetadata = """
                                             { "_id" : { "$oid" : "64f5a8b2c3d4e5f6a7b8c9d0" }, "length" : 13, "chunkSize" : 261120, "uploadDate" : { "$date" : "2023-09-04T10:15:30.123Z" }, "filename" : "new_file" }
                                             { "_id" : { "$oid" : "64f5a8b3c3d4e5f6a7b8c9d1" }, "length" : 50, "chunkSize" : 1048576, "uploadDate" : { "$date" : "2023-09-04T10:16:45.456Z" }, "filename" : "my_file" }
                                             """;

        /// <summary>
        ///     Restaurant documents with ellipsis patterns from documentation examples.
        ///     Example from: content/csharp/current/source/reference/quick-reference.txt
        /// </summary>
        public const string RestaurantDocuments = """
                                                  [
                                                    { name: "Como Pizza", cuisine: "Pizza", ... },
                                                    { name: "New York Pizza Suprema", cuisine: "Pizza", ... },
                                                    ...
                                                  ]
                                                  """;

        /// <summary>
        ///     Alternative formatting variants that should match the canonical forms.
        ///     These test formatting tolerance and normalization capabilities.
        /// </summary>
        public const string BoroughListAlternateFormat = """
                                                         Bronx
                                                         Brooklyn
                                                         Manhattan
                                                         Missing
                                                         Queens
                                                         Staten Island
                                                         """;

        public const string TimeSeriesMetadataCompact = """
                                                        {"name":"september2021","type":"timeseries","options":{"timeseries":{"timeField":"temperature","granularity":"seconds","bucketMaxSpanSeconds":3600}},"info":{"readOnly":false}}
                                                        """;

        /// <summary>
        ///     Search index creation output as seen in Atlas Search documentation.
        ///     Example from: content/csharp/current/source/indexes/search-indexes.txt
        /// </summary>
        public const string SearchIndexOutput = """
                                                Created Atlas Search index:
                                                "example_index"
                                                """;
    }
}