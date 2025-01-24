namespace MyCompany.Embeddings;

using MongoDB.Driver;
using MongoDB.Bson;

public class DataService
{
    private static readonly string? ConnectionString = Environment.GetEnvironmentVariable("ATLAS_CONNECTION_STRING");
    private static readonly MongoClient Client = new MongoClient(ConnectionString);
    private static readonly IMongoDatabase Database = Client.GetDatabase("sample_db");
    private static readonly IMongoCollection<BsonDocument> Collection = Database.GetCollection<BsonDocument>("embeddings");
    
    public async Task AddDocumentsAsync(Dictionary<string, float[]> embeddings)
    {
        var documents = new List<BsonDocument>();
        foreach( KeyValuePair<string, float[]> var in embeddings )
        {
            var document = new BsonDocument
            {
                {
                    "text", var.Key
                },
                {
                    "embedding", new BsonArray(var.Value)
                }
            };
            documents.Add(document);
        }
        await Collection.InsertManyAsync(documents);
        Console.WriteLine($"Successfully inserted {embeddings.Count} documents into Atlas");
        documents.Clear();
    }
}