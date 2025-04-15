using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Driver;
using MongoDB.Driver.Search;

public class CompoundQuery
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

        // declare data for the compound query
        string[] genres = { "Comedy", "Romance" };

        // define and run pipeline
        var results = moviesCollection.Aggregate()
            .Search(Builders<MovieDocument>.Search.Compound()
                .Must(Builders<MovieDocument>.Search.Text(movie => movie.Plot, "baseball"))
                .MustNot((Builders<MovieDocument>.Search.Text(movie => movie.Genres, genres))))
            .Project<MovieDocument>(Builders<MovieDocument>.Projection
                .Exclude(movie => movie.Id)
                .Include(movie => movie.Plot)
                .Include(movie => movie.Title)
                .Include(movie => movie.Genres))
            .Limit(3)
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
    public string Plot { get; set; }
    public string Title { get; set; }
    public string[] Genres { get; set; }
}
