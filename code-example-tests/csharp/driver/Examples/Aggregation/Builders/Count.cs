using DotNetEnv;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Examples.Aggregation.Builders;

public class CountExample : IDisposable
{
    private readonly IMongoClient _client;
    private readonly IMongoCollection<Movie> _movies;

    public CountExample()
    {
        var uri = Env.GetString("CONNECTION_STRING",
            "Env variable not found. Verify you have a .env file with a valid connection string.");
        _client = new MongoClient(uri);
        _movies = _client.GetDatabase("sample_mflix").GetCollection<Movie>("movies");
    }

    public List<BsonDocument> RunCountPipeline()
    {
        // :snippet-start: count
        var pipeline = new EmptyPipelineDefinition<Movie>()
            .Match(Builders<Movie>.Filter.Eq(m => m.Metacritic, 100))
            .Count();
        // :snippet-end:
        return _movies.Aggregate(pipeline)
            .ToList()
            .Select(r => r.ToBsonDocument())
            .ToList();
    }

    public void Dispose()
    {
        _client.Dispose();
    }
}
