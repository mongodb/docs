namespace MyCompany.RAG.Local;

using MongoDB.Driver;
using MongoDB.Bson;

public class DataService
{
    private static readonly string? ConnectionString = Environment.GetEnvironmentVariable("MONGODB_URI");
    private static readonly MongoClient Client = new MongoClient(ConnectionString);
    private static readonly IMongoDatabase Database = Client.GetDatabase("sample_airbnb");
    private static readonly IMongoCollection<BsonDocument> Collection = Database.GetCollection<BsonDocument>("listingsAndReviews");
    
    public List<BsonDocument>? GetDocuments()
    {
        // Method details...
    }

    public async Task<string> UpdateDocuments(Dictionary<string, float[]> embeddings)
    {
        // Method details...
    }

    public string CreateVectorIndex()
    {
        try
        {
            var searchIndexView = Collection.SearchIndexes;
            var name = "vector_index";
            
            var model = new CreateVectorSearchIndexModel<Listing>(
                l => l.Embeddings,
                name,
                VectorSimilarity.Cosine,
                768);
            
            var model = new CreateSearchIndexModel(name, type, definition);
            searchIndexView.CreateOne(model);
            Console.WriteLine($"New search index named {name} is building.");
            // Polling for index status
            Console.WriteLine("Polling to check if the index is ready. This may take up to a minute.");
            bool queryable = false;
            while (!queryable)
            {
                var indexes = searchIndexView.List();
                foreach (var index in indexes.ToEnumerable())
                {
                    if (index["name"] == name)
                    {
                        queryable = index["queryable"].AsBoolean;
                    }
                }
                if (!queryable)
                {
                    Thread.Sleep(5000);
                }
            }
            return $"{name} is ready for querying.";
        }
        catch (Exception e)
        {
            return $"Exception: {e.Message}";
        }
    }
}