using MongoDB.Bson;
using MongoDB.Driver;

namespace MyCompany.RAG.Local;

public class MongoDBDataService
{
    private static readonly string? ConnectionString = Environment.GetEnvironmentVariable("MONGODB_URI");
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
        foreach (var kvp in embeddings)
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
        }
        catch (Exception e)
        {
            return $"Exception: {e.Message}";
        }
    }

    public string CreateVectorIndex()
    {
        try
        {
            var searchIndexView = Collection.SearchIndexes;
            var name = "vector_index";

            var definition = new BsonDocument
            {
                {
                    "fields", new BsonArray
                    {
                        new BsonDocument
                        {
                            { "type", "vector" },
                            { "path", "embeddings" },
                            { "numDimensions", 768 },
                            { "similarity", "cosine" }
                        }
                    }
                }
            };

            var model = new CreateSearchIndexModel(name, SearchIndexType.VectorSearch, definition);
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
                    { "listing_url", 1 },
                    {
                        "score",
                        new BsonDocument
                        {
                            { "$meta", "vectorSearchScore" }
                        }
                    }
                }
            }
        };
        var pipeline = new[] { vectorSearchStage, projectStage };
        return Collection.Aggregate<BsonDocument>(pipeline).ToList();
    }
}
