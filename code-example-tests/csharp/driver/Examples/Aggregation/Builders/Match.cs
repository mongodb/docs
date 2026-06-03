using DotNetEnv;
using MongoDB.Driver;

namespace Examples.Aggregation.Builders;

public class MatchExample
{
    private readonly string _uri = Env.GetString("CONNECTION_STRING",
        "Set your CONNECTION_STRING in the .env file");

    public List<Movie> RunMatchPipeline()
    {
        var client = new MongoClient(_uri);
        var collection = client
            .GetDatabase("sample_mflix")
            .GetCollection<Movie>("movies");

        // :snippet-start: match
        var pipeline = new EmptyPipelineDefinition<Movie>()
            .Match(m => m.Title == "The Godfather");
        // :snippet-end:
        var results = collection.Aggregate(pipeline).ToList();
        client.Dispose();
        return results;
    }
}
