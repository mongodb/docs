namespace query_quick_start;

using MongoDB.Bson;
using MongoDB.Driver;

public class IndexService
{
    private const string MongoConnectionString = "<connectionString>";
    // Other class methods here...
    public void EditVectorIndex()
    {
        try
        {
            // Connect to your Atlas deployment
            var client = new MongoClient(MongoConnectionString);

            // Access your database and collection
            var database = client.GetDatabase("<databaseName>");
            var collection = database.GetCollection<BsonDocument>("<collectionName>");
            
            var definition = new BsonDocument
            {
                { "fields", new BsonArray
                    {
                        new BsonDocument
                        {
                            { "type", "vector" },
                            { "path", "<fieldToIndex>" },
                            { "numDimensions", <numberOfDimensions> },
                            { "similarity", "euclidean | cosine | dotProduct" }
                        }
                    }
                }
            };
            
            // Update your search index
            var searchIndexView = collection.SearchIndexes;
            searchIndexView.Update(name, definition);
        }
        catch (Exception e)
        {
            Console.WriteLine($"Exception: {e.Message}");
        }
    }
}
