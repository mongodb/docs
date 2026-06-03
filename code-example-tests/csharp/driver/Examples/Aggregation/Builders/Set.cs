using DotNetEnv;
using MongoDB.Driver;

namespace Examples.Aggregation.Builders;

public class SetExample
{
    private readonly string _uri = Env.GetString("CONNECTION_STRING",
        "Set your CONNECTION_STRING in the .env file");

    public List<Movie> RunSetPipeline()
    {
        // :snippet-start: set
        var pipeline = new EmptyPipelineDefinition<Movie>()
            .Match(Builders<Movie>.Filter.Eq(m => m.Title, "The Godfather"))
            .Set(Builders<Movie>.SetFields.Set(m => m.Rated, "UNRATED"));
        // :snippet-end:
        using var client = new MongoClient(_uri);
        var collection = client
            .GetDatabase("sample_mflix")
            .GetCollection<Movie>("movies");
        return collection.Aggregate(pipeline).ToList();
    }
}
