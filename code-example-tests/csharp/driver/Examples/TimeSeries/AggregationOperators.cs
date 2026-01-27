using Examples.TimeSeries.QuickStart;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Examples.TimeSeries;

public class AggregationOperators
{
    private static IMongoDatabase? _db;
    private static IMongoCollection<Stocks>? _stocks;
    private const string CollectionName = "dowJonesSymbolData";

    public static async Task<List<BsonDocument>> RunAveragePricePipeline()
    {
        LoadSampleData();
        // :snippet-start: avg-monthly-price
        var pipeline = new BsonDocument[]
        {
            new("$group",
                new BsonDocument
                {
                    {
                        "_id",
                        new BsonDocument
                        {
                            {
                                "firstDayOfMonth",
                                new BsonDocument("$dateTrunc",
                                    new BsonDocument
                                    {
                                        { "date", "$date" },
                                        { "unit", "month" }
                                    })
                            },
                            { "symbol", "$symbol" }
                        }
                    },
                    {
                        "avgMonthClose", new BsonDocument("$avg", "$close")
                    }
                })
        };
        var pipelineDefinition = PipelineDefinition<Stocks, BsonDocument>.Create(pipeline);
        var result = await _stocks?.Aggregate(pipelineDefinition).ToListAsync()!;
        // :snippet-end:
        return result;
    }

    public static async Task<List<BsonDocument>> RunRollingAveragePipeline()
    {
        LoadSampleData();
        // :snippet-start: rolling-average
        var pipeline = new BsonDocument[]
        {
            new("$setWindowFields",
                new BsonDocument
                {
                    { "partitionBy", new BsonDocument("symbol", "$symbol") },
                    { "sortBy", new BsonDocument("date", 1) },
                    { "output", new BsonDocument("averageMonthClosingPrice",
                        new BsonDocument
                        {
                            { "$avg", "$close" },
                            { "window", new BsonDocument
                                {
                                    { "range", new BsonArray { -1, "current" } },
                                    { "unit", "month" }
                                }
                            }
                        })
                    }
                })
        };

        var pipelineDefinition = PipelineDefinition<Stocks, BsonDocument>.Create(pipeline);
        var result = await _stocks?.Aggregate(pipelineDefinition).ToListAsync()!;
        // :snippet-end:
        return result;
    }

    private static void LoadSampleData()
    {
        var uri = DotNetEnv.Env.GetString("CONNECTION_STRING",
            "Env variable not found. Verify you have a .env file with a valid connection string.");
        var client = new MongoClient(uri);
        _db = client.GetDatabase("timeseries_db");

        if (_db.GetCollection<Stocks>(CollectionName) != null) _db.DropCollection(CollectionName);

        var timeSeriesOptions = new TimeSeriesOptions(
            timeField: "date",
            metaField: "Symbol",
            bucketMaxSpanSeconds: 3600,
            bucketRoundingSeconds: 3600
        );

        var options = new CreateCollectionOptions
        {
            TimeSeriesOptions = timeSeriesOptions
        };

        _db.CreateCollection(CollectionName, options);
        _stocks = _db.GetCollection<Stocks>(CollectionName);

        _stocks.InsertMany(new List<Stocks>
        {
            // :snippet-start: stocks-schema
            new Stocks()
            {
                Symbol = "MDB",
                Date = DateTime.Parse("2021-12-18T15:59:00Z"),
                Close = 252.47,
                Volume = 55046.0
            }
            // :snippet-end:
            ,
            new Stocks()
            {
                Symbol = "MDB",
                Date = DateTime.Parse("2021-12-18T15:58:00Z"),
                Close = 252.94,
                Volume = 44042.0
            },
            new Stocks()
            {
                Symbol = "GOOG",
                Date = DateTime.Parse("2021-12-18T15:57:00Z"),
                Close = 253.62,
                Volume = 40182.0
            },
            new Stocks()
            {
                Symbol = "MSFT",
                Date = DateTime.Parse("2021-12-18T15:56:00Z"),
                Close = 253.63,
                Volume = 27890.0
            },
            new Stocks()
            {
                Symbol = "MSFT",
                Date = DateTime.Parse("2021-12-18T15:55:00Z"),
                Close = 254.03,
                Volume = 40270.0
            }
        });
    }

    public static void Cleanup()
    {
        _db?.DropCollection(CollectionName);
    }
}