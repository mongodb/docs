using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Driver;
using MongoDB.Driver.Search;

public class SortByNumbers
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

        // define search options
        var searchOptions = new SearchOptions<MovieDocument>() 
            { 
                Sort = Builders<MovieDocument>.Sort.Descending(movies => movies.Awards.Wins),
                IndexName = "sort-tutorial"
            };

        // define and run pipeline
        var results = moviesCollection.Aggregate()
            .Search(
                Builders<MovieDocument>.Search.Range(movie => movie.Awards.Wins, SearchRangeBuilder.Gte(10)), searchOptions)
            .Project<MovieDocument>(Builders<MovieDocument>.Projection
                .Exclude(movie => movie.Id)
                .Include(movie => movie.Title)
                .Include(movie => movie.Awards.Wins))
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
    public string Title { get; set; }
    public Award Awards { get; set; }
}

public class Award
{
    [BsonIgnoreIfDefault]
    public int Wins { get; set; }
}
