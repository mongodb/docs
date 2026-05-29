using DotNetEnv;
using MongoDB.Driver;

namespace Examples.Aggregation.Builders;

public class SampleExample
{
    private readonly string _uri = Env.GetString("CONNECTION_STRING",
        "Set your CONNECTION_STRING in the .env file");

    public List<Movie> RunSamplePipeline()
    {
        // :snippet-start: sample
        var pipeline = new EmptyPipelineDefinition<Movie>()
            .Sample(5);
        // :snippet-end:
        using var client = new MongoClient(_uri);
        var collection = client
            .GetDatabase("sample_mflix")
            .GetCollection<Movie>("movies");
        return collection.Aggregate(pipeline).ToList();
    }
}
