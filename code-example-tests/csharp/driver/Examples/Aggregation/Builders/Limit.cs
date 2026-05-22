using DotNetEnv;
using MongoDB.Driver;

namespace Examples.Aggregation.Builders;

public class LimitExample
{
    private readonly string _uri = Env.GetString("CONNECTION_STRING",
        "Set your CONNECTION_STRING in the .env file");

    public List<Movie> RunLimitPipeline()
    {
        // :snippet-start: limit
        var pipeline = new EmptyPipelineDefinition<Movie>()
            .Sort(Builders<Movie>.Sort.Ascending(m => m.Title))
            .Limit(5);
        // :snippet-end:
        using var client = new MongoClient(_uri);
        var collection = client
            .GetDatabase("sample_mflix")
            .GetCollection<Movie>("movies");
        return collection.Aggregate(pipeline).ToList();
    }
}
