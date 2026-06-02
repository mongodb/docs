using DotNetEnv;
using MongoDB.Driver;

namespace Examples.Aggregation.Builders;

public class ReplaceRootExample
{
    private readonly string _uri = Env.GetString("CONNECTION_STRING",
        "Set your CONNECTION_STRING in the .env file");

    public List<ImdbData?> RunReplaceRootPipeline()
    {
        // :snippet-start: replace-root
        var pipeline = new EmptyPipelineDefinition<Movie>()
            .Match(Builders<Movie>.Filter.Exists(m => m.Imdb))
            .Sort(Builders<Movie>.Sort.Ascending(m => m.Title))
            .Limit(5)
            .ReplaceRoot(m => m.Imdb);
        // :snippet-end:
        using var client = new MongoClient(_uri);
        var collection = client
            .GetDatabase("sample_mflix")
            .GetCollection<Movie>("movies");
        return collection.Aggregate(pipeline).ToList();
    }
}
