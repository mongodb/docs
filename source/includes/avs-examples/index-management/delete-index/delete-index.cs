namespace query_quick_start;

using MongoDB.Bson;
using MongoDB.Driver;

public class IndexService
{
    private const string MongoConnectionString = "<connectionString>";    
    // Other class methods here...
    public void DeleteVectorIndex()
    {
        try
        {
            // Connect to your Atlas deployment
            var client = new MongoClient(MongoConnectionString);

            // Access your database and collection
            var database = client.GetDatabase("<databaseName>");
            var collection = database.GetCollection<BsonDocument>("<collectionName>");

            // Delete your search index
            var searchIndexView = collection.SearchIndexes;
            var name = "vector_index";
            searchIndexView.DropOne(name);
            
            Console.WriteLine($"Dropping search index named {name}. This may take up to a minute.");
        }
        catch (Exception e)
        {
            Console.WriteLine($"Exception: {e.Message}");
        }
    }
}
