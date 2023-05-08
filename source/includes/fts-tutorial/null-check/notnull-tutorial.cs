using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Driver;
using MongoDB.Driver.Search;

public class NotNullQuery 
{
    private static IMongoCollection<UserDocument> usersCollection;
    private static string _mongoConnectionString = "<connection-string>";

    public static void Main(string[] args) 
    {
        // allow automapping of the camelCase database fields to our UserDocument
        var camelCaseConvention = new ConventionPack { new CamelCaseElementNameConvention() };
        ConventionRegistry.Register("CamelCase", camelCaseConvention, type => true);

        // connect to your Atlas cluster
        var mongoClient = new MongoClient(_mongoConnectionString);
        var mflixDatabase = mongoClient.GetDatabase("sample_mflix");
        usersCollection = mflixDatabase.GetCollection<UserDocument>("users");

        // define a builder for the search score
        var scoreBuilder = new SearchScoreDefinitionBuilder<UserDocument>();

        // define and run pipeline
        var results = usersCollection.Aggregate()
            .Search(Builders<UserDocument>.Search.Compound()
                .Should(Builders<UserDocument>.Search.Wildcard(user => user.Password, "*", true))
                .Should(Builders<UserDocument>.Search.Compound(scoreBuilder.Constant(2))
                .MustNot(Builders<UserDocument>.Search.Exists(user => user.Password))),
                indexName: "null-check-tutorial")
                .Limit(5)
                .Project<UserDocument>(Builders<UserDocument>.Projection
                    .Include(user => user.Name)
                    .Include(user => user.Password)
                    .MetaSearchScore("score")
                    .Exclude(user => user.Id))
                .ToList();

        // print results
        foreach (var user in results) 
        {
            Console.WriteLine(user.ToJson());
        }
    }
}

[BsonIgnoreExtraElements]
public class UserDocument 
{
    [BsonIgnoreIfDefault]
    public string Id { get; set; }
    public string Name { get; set; }
    [BsonIgnoreIfDefault]
    public string Password { get; set; }
    [BsonElement("score")]
    public double Score { get; set; }
}