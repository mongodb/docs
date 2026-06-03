using DotNetEnv;
using MongoDB.Driver;

namespace Examples.Aggregation.Builders;

public class SkipExample
{
    private readonly string _uri = Env.GetString("CONNECTION_STRING",
        "Set your CONNECTION_STRING in the .env file");

    public List<Movie> RunSkipPipeline()
    {
        // :snippet-start: skip
        var pipeline = new EmptyPipelineDefinition<Movie>()
            .Sort(Builders<Movie>.Sort
                .Ascending(m => m.Title)
                .Ascending(m => m.Id))
            .Skip(5)
            .Limit(5);
        // :snippet-end:
        using var client = new MongoClient(_uri);
        var collection = client
            .GetDatabase("sample_mflix")
            .GetCollection<Movie>("movies");
        return collection.Aggregate(pipeline).ToList();
    }
}
