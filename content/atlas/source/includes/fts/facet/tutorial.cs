using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Driver;
using MongoDB.Driver.Search;

public class FacetExample
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

        // declare data for date and number fields
        var originDate = new DateTime(1921, 11, 01, 0, 0, 0, DateTimeKind.Utc);

        // define and run pipeline
        var results = moviesCollection.Aggregate()
            .SearchMeta(Builders<MovieDocument>.Search.Facet(
                    Builders<MovieDocument>.Search.Near(movie => movie.Released, originDate, 7776000000),
                    Builders<MovieDocument>.SearchFacet.String("genresFacet", movie => movie.Genres, 10),
                    Builders<MovieDocument>.SearchFacet.Number("yearFacet", movie => movie.Year, 1910, 1920, 1930, 1940)),
                    indexName: "facet-tutorial")
            .Single();

        // print results
        Console.WriteLine(results.ToJson());
    }
}

[BsonIgnoreExtraElements]
public class MovieDocument
{
    [BsonIgnoreIfDefault]
    public ObjectId Id { get; set; }
    public string [] Genres { get; set; }
    public DateTime Released { get; set; }
    public int Year { get; set; }
}
