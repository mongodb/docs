using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Driver;
using MongoDB.Driver.Search;

public class OneLanguageExample
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

        // declare data for compound query
        var startDate = new DateTime(2000, 01, 01, 0, 0, 0, DateTimeKind.Utc);
        var endDate = new DateTime(2009, 01, 01, 0, 0, 0, DateTimeKind.Utc);

        // define and run pipeline
        var results = moviesCollection.Aggregate()
            .Search(Builders<MovieDocument>.Search.Compound()
                .Must(Builders<MovieDocument>.Search.Text(movie => movie.Fullplot, "coppia"))
                .MustNot(Builders<MovieDocument>.Search.Range(movie => movie.Released, SearchRangeBuilder.Gt(startDate).Lt(endDate)))
                .Should(Builders<MovieDocument>.Search.Text(movie => movie.Genres, "Drama")),
                indexName: "multilingual-tutorial")
            .Project<MovieDocument>(Builders<MovieDocument>.Projection
                .Include(movie => movie.Fullplot)
                .Include(movie => movie.Genres)
                .Include(movie => movie.Released)
                .Include(movie => movie.Title)
                .Exclude(movie => movie.Id)
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
    public string Fullplot { get; set; }
    [BsonIgnoreIfDefault]
    public ObjectId Id { get; set; }
    public string [] Genres { get; set; }
    public DateTime Released { get; set; }
    public string Title { get; set; }   
    public double Score { get; set; }
}
