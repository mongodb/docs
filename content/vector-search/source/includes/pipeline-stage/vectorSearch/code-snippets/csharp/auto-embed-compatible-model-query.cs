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
        const string mongoConnectionString = "<connection-string>";          
        var client = new MongoClient(mongoConnectionString);          
          
        // Access your database and collection          
        var database = client.GetDatabase("sample_mflix");          
        var collection = database.GetCollection<Movies>("movies");          
                  
        RunQuery(client, collection, "autoembed_index");          
    }          
          
    private static void RunQuery(          
        MongoClient client,          
        IMongoCollection<Movies> collection,          
        string indexName)          
    {          
        var options = new VectorSearchOptions<Movies>()
        {
            IndexName = indexName,
            NumberOfCandidates = 100,
            AutoEmbeddingModelName = "voyage-4-large"
        };
          
        // Define the field using string  
        string fieldName = "fullplot";  
                
        var results = collection.Aggregate()          
            .VectorSearch(          
                fieldName,    
                "young heroes caught in epic struggles between light and darkness",          
                10,          
                options)          
            .Project(Builders<Movies>.Projection          
                .Exclude("_id")          
                .Include("title")
                .Include("fullplot")
                .MetaVectorSearchScore("score"))          
            .ToList();          
                
        foreach (var listing in results)          
        {          
            Console.WriteLine(listing.ToJson());          
        }          
    }      
}    