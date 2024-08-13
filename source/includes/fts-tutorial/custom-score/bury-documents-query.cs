using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Driver;
using MongoDB.Driver.Search;

public class BuryDocumentCompoundExample
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

        string id1 = "573a13cef29313caabd873a2";
        string id2 = "573a13cdf29313caabd83c08";

        // define and run pipeline
        var results = moviesCollection.Aggregate()
            .Search(Builders<MovieDocument>.Search.Compound()
                .Should(Builders<MovieDocument>.Search.Compound()
                    .Must(Builders<MovieDocument>.Search.Text(
                        Builders<MovieDocument>.SearchPath.Multi(movie => movie.Title, movie => movie.Plot), "ghost"))
                    .MustNot(Builders<MovieDocument>.Search.In(movie => movie.Id, new[] {ObjectId.Parse(id1), ObjectId.Parse(id2)}))
                )
                .Should(Builders<MovieDocument>.Search.Compound()
                    .Must(Builders<MovieDocument>.Search.Text(
                        Builders<MovieDocument>.SearchPath.Multi(movie => movie.Title, movie => movie.Plot), "ghost"))
                    .Filter(Builders<MovieDocument>.Search.In(movie => movie.Id, new[] {ObjectId.Parse(id1), ObjectId.Parse(id2)}, score: new SearchScoreDefinitionBuilder<MovieDocument>().Boost(0.5)))
                ),
                indexName: "compound-query-custom-score-tutorial")
            .Project<MovieDocument>(Builders<MovieDocument>.Projection
                .Include(movie => movie.Plot)
                .Include(movie => movie.Title)
                .Include(movie => movie.Id)
                .MetaSearchScore("score"))
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
    public string Plot { get; set; }
    public string Title { get; set; }
    public double Score { get; set; }
}
