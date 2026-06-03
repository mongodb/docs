using DotNetEnv;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Serializers;
using MongoDB.Driver;

namespace Examples.Aggregation.Builders;

public class UnionWithExample : IDisposable
{
    private readonly IMongoClient _client;
    private readonly IMongoCollection<Movie> _movies;

    public UnionWithExample()
    {
        var uri = Env.GetString("CONNECTION_STRING",
            "Env variable not found. Verify you have a .env file with a valid connection string.");
        _client = new MongoClient(uri);
        _movies = _client.GetDatabase("sample_mflix").GetCollection<Movie>("movies");
    }

    public List<BsonDocument> RunUnionWithPipeline()
    {
        // :snippet-start: union-with
        var pipeline = new EmptyPipelineDefinition<Movie>()
            .Match(Builders<Movie>.Filter.Eq(m => m.Metacritic, 100))
            .UnionWith(
                withCollection: _movies,
                withPipeline: new EmptyPipelineDefinition<Movie>()
                    .Match(Builders<Movie>.Filter.Eq(m => m.Metacritic, 100)));
        // :snippet-end:
        var bsonPipeline = pipeline
            .As(BsonDocumentSerializer.Instance)
            .Project(Builders<BsonDocument>.Projection
                .Include("title")
                .Include("metacritic")
                .Exclude("_id"));
        return _movies.Aggregate(bsonPipeline).ToList();
    }

    public void Dispose()
    {
        _client.Dispose();
    }
}
