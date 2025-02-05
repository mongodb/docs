namespace MyCompany.RAG;

using MongoDB.Driver;
using MongoDB.Bson;

public class MongoDBDataService
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
        // Method details...
    }

    public List<BsonDocument>? PerformVectorQuery(float[] vector)
    {
        var vectorSearchStage = new BsonDocument
        {
            {
                "$vectorSearch",
                new BsonDocument
                {
                    { "index", "vector_index" },
                    { "path", "embedding" },
                    { "queryVector", new BsonArray(vector) },
                    { "exact", true },
                    { "limit", 5 }
                }
            }
        };
        var projectStage = new BsonDocument
        {
            {
                "$project",
                new BsonDocument
                {
                    { "_id", 0 },
                    { "text", 1 },
                    { "score", 
                        new BsonDocument
                        {
                            { "$meta", "vectorSearchScore"}
                        }
                    }
                }
            }
        };
        var pipeline = new[] { vectorSearchStage, projectStage };
        return Collection.Aggregate<BsonDocument>(pipeline).ToList();
    }
}