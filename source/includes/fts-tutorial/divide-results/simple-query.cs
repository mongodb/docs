using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Driver;
using MongoDB.Driver.Search;
public class DivideQueryResults
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

        // define and run pipeline
        var results = moviesCollection.Aggregate()
            .Search(Builders<MovieDocument>.Search.Text(movie => movie.Cast, "tom hanks"), indexName: "pagination-tutorial")
            .Project<MovieDocument>(Builders<MovieDocument>.Projection
                .Include(movie => movie.Cast)
                .Include(movie => movie.Title)
                .Exclude(movie => movie.Id)
                .MetaSearchScore(movie => movie.Score))
            .Skip(10)
            .Limit(10)
            .ToList();

        // print results
        foreach (var movie in results) {
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
    public string[] Cast { get; set; }
    [BsonElement("score")]
    public double Score { get; set; }
}