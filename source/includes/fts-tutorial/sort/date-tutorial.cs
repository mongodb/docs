using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Driver;
using MongoDB.Driver.Search;

public class SortDateForSpeed
{
    private static IMongoCollection<MovieDocument> moviesCollection;
    private static string _mongoConnectionString = "<connection-string>";

    public static void Main(string[] args)
    {
        // allow automapping of the camelCase database fields to our MovieDocument
        var camelCaseConvention = new ConventionPack { new CamelCaseElementNameConvention() };
        ConventionRegistry.Register("CamelCase", camelCaseConvention, type => true);

        // connect to your Atlas cluster
        var mongoClient = new MongoClient(_mongoConnectionString);
        var mflixDatabase = mongoClient.GetDatabase("sample_mflix");
        moviesCollection = mflixDatabase.GetCollection<MovieDocument>("movies");


        // declare data for compound query
        var originDate = new DateTime(2014, 04, 18, 0, 0, 0, DateTimeKind.Utc);

        // define and run pipeline
        var results = moviesCollection.Aggregate()
            .Search(Builders<MovieDocument>.Search.Compound()
                .Filter(Builders<MovieDocument>.Search.Wildcard(movie => movie.Title, "Summer*"))
                .Must(Builders<MovieDocument>.Search.Near(movie => movie.Released, originDate, 13149000000, new SearchScoreDefinitionBuilder<MovieDocument>().Boost(100))))
            .Project<MovieDocument>(Builders<MovieDocument>.Projection
                .Include(movie => movie.Released)
                .Include(movie => movie.Title)
                .Exclude(movie => movie.Id)
                .MetaSearchScore("score"))
            .Limit(5)
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
    public DateTime Released { get; set; }
    public string Title { get; set; }
    [BsonElement("score")]
    public double Score { get; set; }
}
