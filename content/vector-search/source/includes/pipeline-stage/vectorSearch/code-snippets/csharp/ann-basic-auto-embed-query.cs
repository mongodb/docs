using MongoDB.Bson;  
using MongoDB.Bson.Serialization.Attributes;  
using MongoDB.Bson.Serialization.Conventions;  
using MongoDB.Driver;  
  
namespace VectorSearch;  
  
// Add the Movies class definition  
public class Movies  
{  
    [BsonId]  
    [BsonRepresentation(BsonType.ObjectId)]  
    public string? Id { get; set; }  
    public string? Title { get; set; }  
    public string? Fullplot { get; set; }  
}  

class Program  
{  
    static void Main(string[] args)  
    {  
        // Map title-case class properties to camel-case MongoDB fields  
        var camelCaseConvention = new ConventionPack { new CamelCaseElementNameConvention() };  
        ConventionRegistry.Register("CamelCase", camelCaseConvention, type => true);  
          
        // Connect to your deployment  
        const string mongoConnectionString = "<connection string>";  
        var client = new MongoClient(mongoConnectionString);  
  
        // Access your database and collection  
        var database = client.GetDatabase("sample_mflix");  
        var collection = database.GetCollection<Movies>("movies");  
          
        RunQuery(client, collection, "vector_index");  
    }  
  
    private static void RunQuery(  
        MongoClient client,  
        IMongoCollection<Movies> collection,  
        string indexName)  
    {  
        var options = new VectorSearchOptions<Movies>()  
        {  
            IndexName = indexName,  
            NumberOfCandidates = 100  
        };  
          
        var results = collection.Aggregate()  
            .VectorSearch(  
                "fullplot",  
                "young heroes caught in epic struggles between light and darkness",  
                10,  
                options)  
            .Project(Builders<Movies>.Projection  
                .Exclude(m => m.Id)  
                .Include(m => m.Title)  
                .Include(m => m.Fullplot)  
                .MetaVectorSearchScore("score"))  
            .ToList();  
          
        foreach (var listing in results)  
        {  
            Console.WriteLine(listing.ToJson());  
        }  
    }  
}  
