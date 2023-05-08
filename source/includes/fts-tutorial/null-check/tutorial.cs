using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Driver;
using MongoDB.Driver.Search;

public class IsNullQuery 
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

        // define and run pipeline
        var results = usersCollection.Aggregate()
            .Search(Builders<UserDocument>.Search.Compound()
                .Must(Builders<UserDocument>.Search.Exists(user => user.Password))
                .MustNot(Builders<UserDocument>.Search.Wildcard(user => user.Password, "*", true)),
                indexName: "null-check-tutorial")
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
    public ObjectId Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
}