using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Driver;
using MongoDB.Driver.Search;

public class ComplexQuery
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
        string[] terms = { "Hawaii", "Alaska" };
        string[] genres = { "Comedy", "Romance" };
        string[] titles = { "Beach", "Snow" };

        // define and run pipeline
        var results = moviesCollection.Aggregate()
            .Search(Builders<MovieDocument>.Search.Compound()
                .Must(Builders<MovieDocument>.Search.Text(movie => movie.Plot, terms))
                .Must(Builders<MovieDocument>.Search.Regex(movie => movie.Plot, "([0-9]{4})", true))
                .MustNot((Builders<MovieDocument>.Search.Text(movie => movie.Genres, genres)))
                .MustNot((Builders<MovieDocument>.Search.Text(movie => movie.Title, titles))))
            .Project<MovieDocument>(Builders<MovieDocument>.Projection
                .Include(movie => movie.Genres)
                .Include(movie => movie.Plot)
                .Include(movie => movie.Title)
                .Exclude(movie => movie.Id))
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
    public string[] Genres { get; set; }
    public string Plot { get; set; }
    public string Title { get; set; }
}
