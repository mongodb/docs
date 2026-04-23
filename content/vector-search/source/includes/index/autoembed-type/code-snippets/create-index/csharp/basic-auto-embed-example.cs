using MongoDB.Bson;  
using MongoDB.Bson.Serialization.Conventions;  
using MongoDB.Driver;  
  
namespace VectorSearch;  
  
class Program  
{  
    static void Main(string[] args)  
    {  
        // Map title-case class properties to camel-case MongoDB fields  
        var camelCaseConvention = new ConventionPack { new CamelCaseElementNameConvention() };  
        ConventionRegistry.Register("CamelCase", camelCaseConvention, type => true);  
          
        // Connect to your deployment  
        const string mongoConnectionString = "<connectionString>";  
        var client = new MongoClient(mongoConnectionString);  
  
        // Access your database and collection  
        var database = client.GetDatabase("sample_mflix");  
        var collection = database.GetCollection<BsonDocument>("movies");  
          
        CreateVectorIndex(client, collection, "vector_index");  
    }  
  
    private static void CreateVectorIndex(MongoClient client, IMongoCollection<BsonDocument> collection, string indexName)  
    {  
        // Create your index model, then create the search index  
        var model = new CreateAutoEmbeddingVectorSearchIndexModel<BsonDocument>(  
            "fullplot",            // Field to index  
            indexName,             // Index name  
            "voyage-4"             // Supported Embedding model   
            // Optional: add filter fields as additional parameters if needed  
        );  
  
        var searchIndexView = collection.SearchIndexes;  
        searchIndexView.CreateOne(model);  
        Console.WriteLine($"New search index named {indexName} is building.");  
  
        // Wait for initial sync to complete  
        Console.WriteLine("Polling to check if the index is ready. This may take up to a minute.");  
  
        bool isReady = false;  
        while (!isReady)  
        {  
            var indexes = searchIndexView.List();  
            foreach (var index in indexes.ToEnumerable())  
            {  
                if (index["name"] == indexName)  
                {  
                    isReady = index.Contains("latestDefinition");  
                }  
            }  
  
            if (!isReady)  
            {  
                Thread.Sleep(5000);  
            }  
        }  
          
        Console.WriteLine($"{indexName} is ready for querying.");  
    }  
}  
