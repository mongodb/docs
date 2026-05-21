using DotNetEnv;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;
using MongoDB.Driver.GeoJsonObjectModel;

namespace Examples.Aggregation.Builders;

// :snippet-start: theater-class
[BsonIgnoreExtraElements]
public class Theater
{
    [BsonId]
    public ObjectId Id { get; set; }

    [BsonElement("theaterId")]
    public int TheaterId { get; set; }

    [BsonElement("location")]
    public TheaterLocation Location { get; set; } = null!;

    [BsonElement("distance")]
    public double? Distance { get; set; }
}

[BsonIgnoreExtraElements]
public class TheaterLocation
{
    [BsonElement("address")]
    public TheaterAddress Address { get; set; } = null!;
}

[BsonIgnoreExtraElements]
public class TheaterAddress
{
    [BsonElement("city")]
    public string? City { get; set; }

    [BsonElement("state")]
    public string? State { get; set; }
}
// :snippet-end:

public class GeoNearExample
{
    private readonly string _uri = Env.GetString("CONNECTION_STRING",
        "Set your CONNECTION_STRING in the .env file");

    public List<Theater> RunGeoNearPipeline()
    {
        var client = new MongoClient(_uri);
        var collection = client
            .GetDatabase("sample_mflix")
            .GetCollection<Theater>("theaters");

        // :snippet-start: geo-near
        var pipeline = new EmptyPipelineDefinition<Theater>()
            .GeoNear(
                GeoJson.Point(GeoJson.Geographic(-74.1, 40.95)),
                new GeoNearOptions<Theater, Theater>
                {
                    DistanceField = "distance",
                    MaxDistance = 8000,
                    Key = "location.geo",
                    Query = Builders<Theater>.Filter.Eq(
                        t => t.Location.Address.State, "NJ"),
                });
        // :snippet-end:
        var results = collection.Aggregate(pipeline).ToList();
        client.Dispose();
        return results;
    }

    public List<Theater> RunGeoNearMinPipeline()
    {
        var client = new MongoClient(_uri);
        var collection = client
            .GetDatabase("sample_mflix")
            .GetCollection<Theater>("theaters");

        // :snippet-start: geo-near-min
        var pipeline = new EmptyPipelineDefinition<Theater>()
            .GeoNear(
                GeoJson.Point(GeoJson.Geographic(-74.1, 40.95)),
                new GeoNearOptions<Theater, Theater>
                {
                    DistanceField = "distance",
                    MinDistance = 8000,
                    Key = "location.geo",
                    Query = Builders<Theater>.Filter.Eq(
                        t => t.Location.Address.State, "NJ"),
                })
            .Limit(4);
        // :snippet-end:
        var results = collection.Aggregate(pipeline).ToList();
        client.Dispose();
        return results;
    }
}
