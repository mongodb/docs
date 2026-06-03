using DotNetEnv;
using MongoDB.Driver;

namespace Examples.Aggregation.Builders;

public class OutExample : IDisposable
{
    private readonly IMongoClient _client;
    private readonly IMongoCollection<Movie> _movieCollection;

    public OutExample()
    {
        var uri = Env.GetString("CONNECTION_STRING",
            "Set your CONNECTION_STRING in the .env file");
        _client = new MongoClient(uri);
        _movieCollection = _client
            .GetDatabase("sample_mflix")
            .GetCollection<Movie>("movies");
    }

    public List<Movie> RunOutPipeline()
    {
        // :snippet-start: out
        var outCollection = _client
            .GetDatabase("sample_mflix")
            .GetCollection<Movie>("top_movies");

        var pipeline = new EmptyPipelineDefinition<Movie>()
            .Match(Builders<Movie>.Filter.Eq(m => m.Metacritic, 100))
            .Sort(Builders<Movie>.Sort.Ascending(m => m.Title))
            .Out(outCollection);
        // :snippet-end:
        _movieCollection.Aggregate(pipeline).ToList();
        return outCollection.Find(FilterDefinition<Movie>.Empty)
            .Sort(Builders<Movie>.Sort.Ascending(m => m.Title))
            .ToList();
    }

    public void Dispose()
    {
        _client.GetDatabase("sample_mflix").DropCollection("top_movies");
        _client.Dispose();
    }
}
