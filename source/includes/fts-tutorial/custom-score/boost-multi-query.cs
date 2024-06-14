using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Driver;
using MongoDB.Driver.Search;

public class CompoundBoostMultipleExample
{
    private const string MongoConnectionString = "<connection-string>";

    public static void Main(string[] args)
    {
        // allow automapping of the camelCase database fields to our MovieDocument
        var camelCaseConvention = new ConventionPack { new CamelCaseElementNameConvention() };
        ConventionRegistry.Register("CamelCase", camelCaseConvention, type => true);

        // connect to your Atlas cluster
        var mongoClient = new MongoClient(MongoConnectionString);
        var mflixDatabase = mongoClient.GetDatabase("sample_mflix");
        var moviesCollection = mflixDatabase.GetCollection<MovieDocument>("movies");

        // define and run pipeline
        var results = moviesCollection.Aggregate()
            .Search(Builders<MovieDocument>.Search.Compound()
                .Must(Builders<MovieDocument>.Search.Text(movie => movie.Genres, "comedy", score: new SearchScoreDefinitionBuilder<MovieDocument>().Boost(9)))
                .Must(Builders<MovieDocument>.Search.Text(movie => movie.Title, "snow", score: new SearchScoreDefinitionBuilder<MovieDocument>().Boost(5)))
                .Should(Builders<MovieDocument>.Search.Range(movie => movie.Year, SearchRangeBuilder.Gte(2013).Lte(2015), score: new SearchScoreDefinitionBuilder<MovieDocument>().Boost(3))),
                indexName: "compound-query-custom-score-tutorial")
            .Project<MovieDocument>(Builders<MovieDocument>.Projection
                .Include(movie => movie.Genres)
                .Include(movie => movie.Title)
                .Include(movie => movie.Year)
                .Exclude(movie => movie.Id)
                .MetaSearchScore(movie => movie.Score))
            .Limit(10)
            .ToList();
        
        // print results
        foreach (var movie in results)
        {
            Console.WriteLine(movie.ToJson());
        }
    }
}

[BsonIgnoreExtraElements]
public class MovieDocument
{
    [BsonIgnoreIfDefault]
    public ObjectId Id { get; set; }
    public string [] Genres { get; set; }
    public string Title { get; set; }
    public int Year { get; set; }
    public double Score { get; set; }
}
