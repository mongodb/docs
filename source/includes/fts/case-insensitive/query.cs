using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Driver;
using MongoDB.Driver.Search;

public class CaseInsensitiveSort
{
    private const string MongoConnectionString = "<connection-string>";

    public static void Main(string[] args)
    {
        // allow automapping of the camelCase database fields to our MovieDocument
        var camelCaseConvention = new ConventionPack { new camelCaseConvention() };
        ConventionRegistry.Register("CamelCase", camelCaseConvention, type => true);

        // connect to your Atlas cluster
        var mongoClient = new MongoClient(MongoConnectionString);
        var yourDatabase = mongoClient.GetDatabase("sample_mflix");
        var moviesCollection = yourDatabase.GetCollection<MovieDocument>("movies");
        
        // define options for search 
        var searchOptions = new SearchOptions<MovieDocument>() {
            Sort = Builders<MovieDocument>.Sort.Ascending(movie => movie.Title), 
            IndexName = "case-insensitive-sort"
        };
        
        // define and run pipeline
        var results = moviesCollection.Aggregate()
            .Search(Builders<MovieDocument>.Search.Text(movie => movie.Title, "train"), searchOptions)
            .Limit (5)
            .Project<MovieDocument>(Builders<MovieDocument>.Projection
                .Include(movie => movie.Id)
                .Include(movie => movie.Title)
                .Include(movie => movie.Awards)
                .MetaSearchScore(movie => movie.Score))
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
    public string Title { get; set; }
    public Award Awards { get; set; }
    public double Score { get; set; }
}

[BsonIgnoreExtraElements]
public class Award
{
    public int Wins { get; set; }
    public int Nominations { get; set; }
}
