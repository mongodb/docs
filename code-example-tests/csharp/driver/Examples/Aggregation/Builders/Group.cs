using DotNetEnv;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Serializers;
using MongoDB.Driver;
using MongoDB.Driver.Linq;

namespace Examples.Aggregation.Builders;

public class GroupExample : IDisposable
{
    private readonly IMongoClient _client;
    private readonly IMongoCollection<Movie> _movies;

    public GroupExample()
    {
        var uri = Env.GetString("CONNECTION_STRING",
            "Env variable not found. Verify you have a .env file with a valid connection string.");
        _client = new MongoClient(uri);
        _movies = _client.GetDatabase("sample_mflix").GetCollection<Movie>("movies");
    }

    public List<BsonDocument> RunGroupPipeline()
    {
        // :snippet-start: group
        var pipeline = new EmptyPipelineDefinition<Movie>()
            .Group(
                id: m => m.Rated,
                group: g => new
                {
                    Rating = g.Key,
                    TotalRuntime = g.Sum(m => m.Runtime),
                    MedianRuntime = g.Select(m => m.Runtime).Median(),
                    NinetiethPercentileRuntime =
                        g.Select(m => m.Runtime).Percentile(new[] { 0.9 })
                }
            );
        // :snippet-end:
        var bsonPipeline = pipeline.As(BsonDocumentSerializer.Instance);
        return _movies.Aggregate(bsonPipeline).ToList();
    }

    public void Dispose()
    {
        _client.Dispose();
    }
}
