namespace MyCompany.RAG;

using MongoDB.Driver;
using MongoDB.Bson;

public class DataService
{
    private static readonly string? ConnectionString = Environment.GetEnvironmentVariable("ATLAS_CONNECTION_STRING");
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
        var type = SearchIndexType.VectorSearch;
        var definition = new BsonDocument
        {
            { "fields", new BsonArray
                {
                    new BsonDocument
                    {
                        { "type", "vector" },
                        { "path", "embedding" },
                        { "numDimensions", 1536 },
                        { "similarity", "cosine" }
                    }
                }
            }
        };
        var model = new CreateSearchIndexModel(name, type, definition);
        try
        {
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
        }
        catch (Exception e)
        {
            throw new ApplicationException("Error creating the vector index: "  + e.Message);
        }
        return $"{name} is ready for querying.";
    }
}