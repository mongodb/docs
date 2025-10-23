//	:replace-start: {
//	  "terms": {
//      "_db": "db",
//	    "_stocks": "stocks"
//	  }
//	}

using DotNetEnv;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Examples.TimeSeries.QuickStart;

public class Tutorial
{
    private IMongoDatabase? _db;
    private IMongoCollection<Stocks>? _stocks;

    public void LoadSampleData()
    {
        var uri = Env.GetString("CONNECTION_STRING",
            "Env variable not found. Verify you have a .env file with a valid connection string.");
        var client = new MongoClient(uri);
        _db = client.GetDatabase("timeseries_db");
        // :snippet-start: access-db
        // :uncomment-start:
        // var db = client.GetDatabase("timeseries_db");
        // :uncomment-end:
        // :snippet-end:
        // :snippet-start: collection-options
        var timeSeriesOptions = new TimeSeriesOptions(
            timeField: "date",
            metaField: "ticker",
            TimeSeriesGranularity.Seconds
        );

        var options = new CreateCollectionOptions
        {
            TimeSeriesOptions = timeSeriesOptions
        };
        // :snippet-end:
        // :snippet-start: create-collection
        _db.CreateCollection("stocks", options);
        // :snippet-end:
        _stocks = _db.GetCollection<Stocks>("stocks");
        // :snippet-start: load-sample-data
        // :uncomment-start:
        //var stocks = db.GetCollection<Stocks>("stocks");
        // :uncomment-end:

        _stocks.InsertMany(new List<Stocks>
        {
            new Stocks()
            {
                Ticker = "MDB",
                Date = DateTime.Parse("2021-12-18T15:59:00Z"),
                Close = 252.47,
                Volume = 55046.0
            },
            new Stocks()
            {
                Ticker = "MDB",
                Date = DateTime.Parse("2021-12-18T15:58:00Z"),
                Close = 252.94,
                Volume = 44042.0
            },
            new Stocks()
            {
                Ticker = "MDB",
                Date = DateTime.Parse("2021-12-18T15:57:00Z"),
                Close = 253.62,
                Volume = 40182.0
            },
            new Stocks()
            {
                Ticker = "MDB",
                Date = DateTime.Parse("2021-12-18T15:56:00Z"),
                Close = 253.63,
                Volume = 27890.0
            },
            new Stocks()
            {
                Ticker = "MDB",
                Date = DateTime.Parse("2021-12-18T15:55:00Z"),
                Close = 254.03,
                Volume = 40270.0
            }
        });
        // :snippet-end:
    }

    public List<BsonDocument> RunMetaFieldQuery()
    {
        if (_db == null || _stocks == null)
            throw new InvalidOperationException("You must call LoadSampleData before performing aggregation.");
        // :snippet-start: metafield-query
        var query = new BsonDocument("ticker", "MDB");

        var metaFieldResults = _stocks.Find(query)
            .Project(Builders<Stocks>.Projection.Exclude("_id"))
            .ToEnumerable();

        var documents = new List<BsonDocument>(); // :remove:
        foreach (var document in metaFieldResults)
        {
            Console.WriteLine(document.ToJson());
            documents.Add(document); // :remove:
        }

        // :snippet-end:
        return documents;
    }

    public List<BsonDocument> RunTimeFieldQuery()
    {
        if (_db == null || _stocks == null)
            throw new InvalidOperationException("You must call LoadSampleData before performing aggregation.");
        // :snippet-start: timefield-query
        // Initialize date range
        var startTime = DateTime.Parse("2021-12-18T15:50:00Z");
        var endTime = DateTime.Parse("2021-12-18T15:56:00Z");

        // Define the query filter
        var query = new BsonDocument("$and", new BsonArray
        {
            new BsonDocument("date", new BsonDocument("$gte", startTime)),
            new BsonDocument("date", new BsonDocument("$lte", endTime))
        });

        var metaFieldResults = _stocks.Find(query)
            .Project(Builders<Stocks>.Projection.Exclude("_id"))
            .ToEnumerable();

        var documents = new List<BsonDocument>(); // :remove:
        foreach (var document in metaFieldResults)
        {
            Console.WriteLine(document.ToJson());
            documents.Add(document); // :remove:
        }

        // :snippet-end:
        return documents;
    }
}
// :replace-end: