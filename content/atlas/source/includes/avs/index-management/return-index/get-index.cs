namespace query_quick_start;

using MongoDB.Bson;
using MongoDB.Driver;

public class IndexService
{
    private const string MongoConnectionString = "<connectionString>";
    // Other class methods here...
    public void ViewSearchIndexes()
    {
        try
        {
            // Connect to your Atlas deployment
            var client = new MongoClient(MongoConnectionString);

            // Access your database and collection
            var database = client.GetDatabase("<databaseName>");
            var collection = database.GetCollection<BsonDocument>("<collectionName>");

            // Get a list of the collection's search indexes and print them
            var searchIndexView = collection.SearchIndexes;
            var indexes = searchIndexView.List();
            
            foreach (var index in indexes.ToEnumerable())
            {
                Console.WriteLine(index);
            }
        }
        catch (Exception e)
        {
            Console.WriteLine($"Exception: {e.Message}");
        }
    }
}