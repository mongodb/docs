using DotNetEnv;
using MongoDB.Driver;

namespace Examples.Aggregation.Builders;

public class SortByCountExample
{
    private readonly string _uri = Env.GetString("CONNECTION_STRING",
        "Set your CONNECTION_STRING in the .env file");

    public List<AggregateSortByCountResult<string?>> RunSortByCountPipeline()
    {
        var client = new MongoClient(_uri);
        var collection = client
            .GetDatabase("sample_mflix")
            .GetCollection<Movie>("movies");

        // :snippet-start: sort-by-count
        var pipeline = new EmptyPipelineDefinition<Movie>()
            .SortByCount(m => m.Rated);
        // :snippet-end:
        var results = collection.Aggregate(pipeline).ToList();
        client.Dispose();
        return results;
    }
}
