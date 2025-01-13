namespace MyCompany.RAG.Local;

using MongoDB.Driver;
using MongoDB.Bson;

public class MongoDBDataService
{
    private static readonly string? ConnectionString = Environment.GetEnvironmentVariable("ATLAS_CONNECTION_STRING");
    private static readonly MongoClient Client = new MongoClient(ConnectionString);
    private static readonly IMongoDatabase Database = Client.GetDatabase("sample_airbnb");
    private static readonly IMongoCollection<BsonDocument> Collection = Database.GetCollection<BsonDocument>("listingsAndReviews");
    
    public List<BsonDocument>? GetDocuments()
    {
        var filter = Builders<BsonDocument>.Filter.And(
            Builders<BsonDocument>.Filter.And(
                Builders<BsonDocument>.Filter.Exists("summary", true),
                Builders<BsonDocument>.Filter.Ne("summary", "")
            ),
            Builders<BsonDocument>.Filter.Exists("embeddings", false)
        );
        return Collection.Find(filter).Limit(250).ToList(); 
    }

    public async Task<string> UpdateDocuments(Dictionary<string, float[]> embeddings)
    {
        var listWrites = new List<WriteModel<BsonDocument>>();
        foreach(var kvp in embeddings)
        {
            var filterForUpdate = Builders<BsonDocument>.Filter.Eq("_id", kvp.Key);
            var updateDefinition = Builders<BsonDocument>.Update.Set("embeddings", kvp.Value);
            listWrites.Add(new UpdateOneModel<BsonDocument>(filterForUpdate, updateDefinition));
        }

        try
        {
            var result = await Collection.BulkWriteAsync(listWrites);
            listWrites.Clear();
            return $"{result.ModifiedCount} documents updated successfully.";
        } catch (Exception e)
        {
            return $"Exception: {e.Message}";
        }
    }
}