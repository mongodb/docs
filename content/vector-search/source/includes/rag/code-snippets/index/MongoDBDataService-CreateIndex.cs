namespace MyCompany.RAG;

using MongoDB.Driver;
using MongoDB.Bson;

public class DataService
{
    private static readonly string? ConnectionString = Environment.GetEnvironmentVariable("MONGODB_URI");
    private static readonly MongoClient Client = new MongoClient(ConnectionString);
    private static readonly IMongoDatabase Database = Client.GetDatabase("rag_db");
    private static readonly IMongoCollection<BsonDocument> Collection = Database.GetCollection<BsonDocument>("test");

    public async Task<string> AddDocumentsAsync(Dictionary<string, float[]> embeddings)
    {
        // Method details...
    }

    public string CreateVectorIndex()
    {
        var searchIndexView = Collection.SearchIndexes;
        var name = "vector_index";

        var model = new CreateVectorSearchIndexModel<Document>(
            d => d.Embedding,
            name,
            VectorSimilarity.Cosine,
            1024);
        
        try
        {
            searchIndexView.CreateOne(model);
            Console.WriteLine($"New search index named {name} is building.");
            // Polling for index status
            Console.WriteLine("Polling to check if the index is ready.");
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
        }
        catch (Exception e)
        {
            throw new ApplicationException("Error creating the vector index: "  + e.Message);
        }
        return $"{name} is ready for querying.";
    }
}