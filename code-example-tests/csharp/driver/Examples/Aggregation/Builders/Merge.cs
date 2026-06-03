using DotNetEnv;
using MongoDB.Driver;

namespace Examples.Aggregation.Builders;

public class MergeExample : IDisposable
{
    private readonly IMongoClient _client;
    private readonly IMongoCollection<Movie> _sourceCollection;
    private readonly IMongoCollection<Movie> _targetCollection;
    public const string DbName = "merge_builders_test";

    public MergeExample()
    {
        var uri = Env.GetString("CONNECTION_STRING",
            "Env variable not found. Verify you have a .env file with a valid connection string.");
        _client = new MongoClient(uri);
        var db = _client.GetDatabase(DbName);
        _sourceCollection = db.GetCollection<Movie>("source_movies");
        _targetCollection = db.GetCollection<Movie>("merged_movies");
    }

    public void LoadSampleData()
    {
        _sourceCollection.DeleteMany(Builders<Movie>.Filter.Empty);
        _targetCollection.DeleteMany(Builders<Movie>.Filter.Empty);

        var sourceMovies = new List<Movie>
        {
            new Movie { Title = "The Shawshank Redemption", Metacritic = 80 },
            new Movie { Title = "Back to the Future", Metacritic = 96 },
            new Movie { Title = "Jurassic Park", Metacritic = 68 },
        };
        _sourceCollection.InsertMany(sourceMovies);

        _targetCollection.InsertOne(
            new Movie
            {
                Id = sourceMovies[0].Id,
                Title = sourceMovies[0].Title,
                Metacritic = 99
            });
    }

    public List<Movie> RunMergePipeline()
    {
        // :snippet-start: merge
        var pipeline = new EmptyPipelineDefinition<Movie>()
            .Merge(_targetCollection,
                new MergeStageOptions<Movie>()
                {
                    OnFieldNames = new List<string>() { "_id" },
                    WhenMatched = MergeStageWhenMatched.Replace,
                    WhenNotMatched = MergeStageWhenNotMatched.Insert,
                });
        // :snippet-end:
        _sourceCollection.Aggregate(pipeline).ToList();
        return _targetCollection
            .Find(Builders<Movie>.Filter.Empty)
            .Sort(Builders<Movie>.Sort.Ascending(m => m.Title))
            .ToList();
    }

    public void Dispose()
    {
        _client.DropDatabase(DbName);
        _client.Dispose();
    }
}
