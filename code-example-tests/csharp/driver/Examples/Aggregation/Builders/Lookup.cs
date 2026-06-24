using DotNetEnv;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;

namespace Examples.Aggregation.Builders;

// :snippet-start: comment-class
[BsonIgnoreExtraElements]
public class Comment
{
    [BsonId]
    public ObjectId Id { get; set; }

    [BsonElement("movie_id")]
    public ObjectId MovieId { get; set; }

    [BsonElement("text")]
    public string Text { get; set; } = null!;
}
// :snippet-end:

// :snippet-start: lookup-result-class
[BsonIgnoreExtraElements]
public class LookupResult
{
    [BsonId]
    public ObjectId Id { get; set; }

    [BsonElement("title")]
    public string Title { get; set; } = null!;

    public List<Comment> Comments { get; set; } = [];
}
// :snippet-end:

public class LookupExample : IDisposable
{
    private readonly IMongoClient _client;
    private readonly IMongoCollection<Movie> _movies;

    public LookupExample()
    {
        var uri = Env.GetString("CONNECTION_STRING",
            "Env variable not found. Verify you have a .env file with a valid connection string.");
        _client = new MongoClient(uri);
        _movies = _client.GetDatabase("sample_mflix").GetCollection<Movie>("movies");
        // Index the foreign field so $lookup uses an index seek instead of a
        // full collection scan per movie. Idempotent if the index exists.
        _client.GetDatabase("sample_mflix")
            .GetCollection<Comment>("comments")
            .Indexes.CreateOne(new CreateIndexModel<Comment>(
                Builders<Comment>.IndexKeys.Ascending(c => c.MovieId)));
    }

    public List<LookupResult> RunLookupPipeline()
    {
        // :snippet-start: lookup
        var commentCollection = _client
            .GetDatabase("sample_mflix")
            .GetCollection<Comment>("comments");

        var pipeline = new EmptyPipelineDefinition<Movie>()
            .Lookup<Movie, Movie, Comment, LookupResult>(
                foreignCollection: commentCollection,
                localField: m => m.Id,
                foreignField: c => c.MovieId,
                @as: r => r.Comments);
        // :snippet-end:
        var sortedPipeline = pipeline
            .Match(Builders<LookupResult>.Filter.Exists("Comments.0"))
            .Sort(Builders<LookupResult>.Sort.Ascending(r => r.Id))
            .Limit(1);
        return _movies.Aggregate(sortedPipeline).ToList();
    }

    public void Dispose()
    {
        _client.Dispose();
    }
}
