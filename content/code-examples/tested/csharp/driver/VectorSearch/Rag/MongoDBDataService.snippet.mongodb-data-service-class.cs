namespace MyCompany.RAG;

using MongoDB.Bson;
using MongoDB.Driver;

public class MongoDBDataService
{
    private readonly IMongoCollection<BsonDocument> _collection;

    public MongoDBDataService()
    {
        var client = new MongoClient(
            Environment.GetEnvironmentVariable("MONGODB_URI"));
        _collection = client.GetDatabase("rag_db")
            .GetCollection<BsonDocument>("test");
    }

    public async Task<string> AddDocumentsAsync(Dictionary<string, float[]> embeddings)
    {
        var documents = embeddings.Select(kvp => new BsonDocument
        {
            { "text", kvp.Key },
            { "embedding", new BsonArray(kvp.Value) },
        }).ToList();

        await _collection.InsertManyAsync(documents);
        return $"Successfully inserted {embeddings.Count} documents.";
    }
}
