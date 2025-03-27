using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Driver;
using MongoDB.Driver.Search;

public class SortByStrings
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
        var originDate = new DateTime(2014, 04, 18, 0, 0, 0, DateTimeKind.Utc);

        // define search options
        var searchOptions = new SearchOptions<MovieDocument>() 
            { 
                Sort = Builders<MovieDocument>.Sort.Descending(movie => movie.Released),
                IndexName = "sort-tutorial"
            };
            
        // define and run pipeline
        var results = moviesCollection.Aggregate()
            .Search(Builders<MovieDocument>.Search.Compound()
                .Filter(Builders<MovieDocument>.Search.Wildcard(movie => movie.Title, "Summer*"))
                .Must(Builders<MovieDocument>.Search.Near(movie => movie.Released, originDate, 13149000000)), searchOptions)
            .Project<MovieDocument>(Builders<MovieDocument>.Projection
                .Include(movie => movie.Released)
                .Include(movie => movie.Title)
                .Exclude(movie => movie.Id)
                .MetaSearchScore(movie => movie.Score))
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
    public double Score { get; set; }
}
