using DotNetEnv;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;

namespace Examples.Aggregation.Builders;

// :snippet-start: projected-movie-class
[BsonIgnoreExtraElements]
public class ProjectedMovie
{
    [BsonId]
    public ObjectId Id { get; set; }

    public string Title { get; set; } = null!;

    public string? LeadActor { get; set; }

    public List<string>? Crew { get; set; }
}
// :snippet-end:

public class ProjectExample : IDisposable
{
    private readonly IMongoClient _client;
    private readonly IMongoCollection<Movie> _movies;

    public ProjectExample()
    {
        var uri = Env.GetString("CONNECTION_STRING",
            "Env variable not found. Verify you have a .env file with a valid connection string.");
        _client = new MongoClient(uri);
        _movies = _client.GetDatabase("sample_mflix").GetCollection<Movie>("movies");
    }

    public List<BsonDocument> RunIncludePipeline()
    {
        // :snippet-start: include
        var pipeline = new EmptyPipelineDefinition<Movie>()
            .Sort(Builders<Movie>.Sort.Ascending(m => m.Title)) // :remove:
            .Project(
                Builders<Movie>.Projection
                    .Include(m => m.Title)
                    .Include(m => m.Plot)
            );
        // :snippet-end:
        var first = _movies.Aggregate(pipeline).FirstOrDefault();
        return first is null ? [] : [first];
    }

    public List<BsonDocument> RunExcludeFieldsPipeline()
    {
        // :snippet-start: exclude-fields
        var pipeline = new EmptyPipelineDefinition<Movie>()
            .Sort(Builders<Movie>.Sort.Ascending(m => m.Title)) // :remove:
            .Project(
                Builders<Movie>.Projection
                    .Exclude(m => m.Type)
            );
        // :snippet-end:
        var first = _movies.Aggregate(pipeline).FirstOrDefault();
        return first is null ? [] : [first];
    }

    public List<BsonDocument> RunExcludeIdPipeline()
    {
        // :snippet-start: exclude-id
        var pipeline = new EmptyPipelineDefinition<Movie>()
            .Sort(Builders<Movie>.Sort.Ascending(m => m.Title)) // :remove:
            .Project(
                Builders<Movie>.Projection
                    .Exclude(m => m.Id)
                    .Include(m => m.Title)
                    .Include(m => m.Plot)
            );
        // :snippet-end:
        var first = _movies.Aggregate(pipeline).FirstOrDefault();
        return first is null ? [] : [first];
    }

    public List<BsonDocument> RunExcludeFieldsEmbeddedPipeline()
    {
        // :snippet-start: exclude-fields-embedded
        var pipeline = new EmptyPipelineDefinition<Movie>()
            .Sort(Builders<Movie>.Sort.Ascending(m => m.Title)) // :remove:
            .Project(
                Builders<Movie>.Projection
                    .Exclude("Imdb.id")
                    .Exclude(m => m.Type)
            );
        // :snippet-end:
        var first = _movies.Aggregate(pipeline).FirstOrDefault();
        return first is null ? [] : [first];
    }

    public List<BsonDocument> RunExcludeFieldsConditionalPipeline()
    {
        // :snippet-start: exclude-fields-conditional
        var stage = new BsonDocument
        {
            { "title", 1 },
            { "imdb.id", 1 },
            { "imdb.rating", 1 },
            {
                "imdb.votes", new BsonDocument("$cond", new BsonDocument
                {
                    { "if", new BsonDocument("$eq", new BsonArray { "", "$imdb.votes" }) },
                    { "then", "$$REMOVE" },
                    { "else", "$imdb.votes" }
                })
            }
        };

        var pipeline = new EmptyPipelineDefinition<Movie>()
            .Sort(Builders<Movie>.Sort.Ascending(m => m.Title)) // :remove:
            .Project(stage);
        // :snippet-end:
        var first = _movies.Aggregate(pipeline).FirstOrDefault();
        return first is null ? [] : [first];
    }

    public List<BsonDocument> RunIncludeFieldsComputedPipeline()
    {
        // :snippet-start: include-fields-computed
        var pipeline = new EmptyPipelineDefinition<Movie>()
            // :remove-start:
            .Match(Builders<Movie>.Filter.SizeGt("cast", 0))
            .Sort(Builders<Movie>.Sort.Ascending(m => m.Title))
            // :remove-end:
            .Project(
                Builders<Movie>
                    .Projection
                    .Expression(m => new ProjectedMovie
                    {
                        Id = m.Id,
                        Title = m.Title,
                        LeadActor = m.Cast![0],
                    })
            );
        // :snippet-end:
        var first = _movies.Aggregate(pipeline).FirstOrDefault();
        return first is null ? [] : [first.ToBsonDocument()];
    }

    public List<BsonDocument> RunNewArrayFieldsPipeline()
    {
        // :snippet-start: new-array-fields
        var pipeline = new EmptyPipelineDefinition<Movie>()
            // :remove-start:
            .Match(Builders<Movie>.Filter.And(
                Builders<Movie>.Filter.SizeGt("cast", 0),
                Builders<Movie>.Filter.SizeGt("directors", 0),
                Builders<Movie>.Filter.SizeGt("writers", 0)))
            .Sort(Builders<Movie>.Sort.Ascending(m => m.Title))
            // :remove-end:
            .Project(
                Builders<Movie>
                    .Projection
                    .Expression(m => new ProjectedMovie
                    {
                        Id = m.Id,
                        Title = m.Title,
                        LeadActor = m.Cast![0],
                        Crew = m.Directors!.Concat(m.Writers!).ToList()
                    })
            );
        // :snippet-end:
        var first = _movies.Aggregate(pipeline).FirstOrDefault();
        return first is null ? [] : [first.ToBsonDocument()];
    }

    public List<BsonDocument> RunNonExistentNewArrayFieldsPipeline()
    {
        // :snippet-start: non-existent-new-array-fields
        var stage = new BsonDocument
        {
            { "crew", new BsonArray { "$directors", "$writers", "$makeupArtists" } }
        };

        var pipeline = new EmptyPipelineDefinition<Movie>()
            .Sort(Builders<Movie>.Sort.Ascending(m => m.Title)) // :remove:
            .Project(stage);
        // :snippet-end:
        var first = _movies.Aggregate(pipeline).FirstOrDefault();
        return first is null ? [] : [first];
    }

    public void Dispose()
    {
        _client.Dispose();
    }
}
