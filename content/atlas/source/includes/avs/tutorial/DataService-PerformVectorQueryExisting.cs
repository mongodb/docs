namespace MyCompany.Embeddings;

using MongoDB.Driver;
using MongoDB.Bson;

public class DataService
{
    private static readonly string? ConnectionString = Environment.GetEnvironmentVariable("ATLAS_CONNECTION_STRING");
    private static readonly MongoClient Client = new MongoClient(ConnectionString);
    private static readonly IMongoDatabase Database = Client.GetDatabase("sample_airbnb");
    private static readonly IMongoCollection<BsonDocument> Collection = Database.GetCollection<BsonDocument>("listingsAndReviews");
    public List<BsonDocument>? GetDocuments()
    {
        // Method details...
    }
    public async Task<long> AddEmbeddings(Dictionary<string, float[]> embeddings)
    {
        // Method details...
    }

    public void CreateVectorIndex()
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
                    { "path", "embeddings" },
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
                    { "summary", 1 },
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