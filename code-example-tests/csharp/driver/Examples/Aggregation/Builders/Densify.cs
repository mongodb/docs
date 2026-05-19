using DotNetEnv;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;

namespace Examples.Aggregation.Builders;

// :snippet-start: weather-class
[BsonIgnoreExtraElements]
public class Weather
{
    [BsonId]
    public ObjectId Id { get; set; }

    [BsonElement("position")]
    public Point Position { get; set; } = null!;

    [BsonElement("ts")]
    public DateTime Timestamp { get; set; }
}

public class Point
{
    [BsonElement("type")]
    public string Type { get; set; } = null!;

    [BsonElement("coordinates")]
    public double[] Coordinates { get; set; } = null!;
}
// :snippet-end:

public class DensifyExample
{
    private readonly string _uri = Env.GetString("CONNECTION_STRING",
        "Set your CONNECTION_STRING in the .env file");
    private MongoClient _client = null!;
    private IMongoCollection<Weather> _collection = null!;

    public List<Weather> RunDensifyPipeline()
    {
        _client = new MongoClient(_uri);
        _collection = _client
            .GetDatabase("sample_weatherdata")
            .GetCollection<Weather>("data");

        // :snippet-start: densify
        var matchFilter = Builders<Weather>.Filter.Eq(
            w => w.Position.Coordinates,
            new double[] { -47.9, 47.6 });

        var densifyTimeRange = new DensifyDateTimeRange(
            new DensifyLowerUpperDateTimeBounds(
                lowerBound: new DateTime(1984, 3, 5, 13, 0, 0, DateTimeKind.Utc),
                upperBound: new DateTime(1984, 3, 5, 14, 0, 0, DateTimeKind.Utc)
            ),
            step: 15,
            unit: DensifyDateTimeUnit.Minutes
        );

        var pipeline = new EmptyPipelineDefinition<Weather>()
            .Match(matchFilter)
            .Densify(
                field: w => w.Timestamp,
                range: densifyTimeRange,
                partitionByFields: [w => w.Position.Coordinates]);
        // :snippet-end:
        var results = _collection.Aggregate(pipeline).ToList(); // :remove:
        _client.Dispose(); // :remove:
        return results; // :remove:
    }
}
