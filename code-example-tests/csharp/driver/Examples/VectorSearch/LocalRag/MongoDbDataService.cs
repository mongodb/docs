// :replace-start: {
//   "terms": {
//     "Examples.VectorSearch.LocalRag": "MyCompany.RAG.Local",
//     "GetConnectionString()": "Environment.GetEnvironmentVariable(\"MONGODB_URI\")",
//     "EmbeddingsField": "\"embeddings\"",
//     "VectorIndexName": "\"vector_index\""
//   }
// }

// :snippet-start: mongodb-data-service
using DotNetEnv; // :remove:
using MongoDB.Bson;
using MongoDB.Driver;

namespace Examples.VectorSearch.LocalRag;

public class MongoDBDataService
{
    // :remove-start:
    private static readonly string EmbeddingsField = LocalRagNames.EmbeddingsFieldName;
    private static readonly string VectorIndexName = LocalRagNames.VectorIndexName;

    private static string? GetConnectionString() =>
        Env.GetString("CONNECTION_STRING", "Set your CONNECTION_STRING in the .env file");
    // :remove-end:
    private static readonly string? ConnectionString = GetConnectionString();
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
            Builders<BsonDocument>.Filter.Exists(EmbeddingsField, false)
        );
        return Collection.Find(filter).Limit(250).ToList();
    }

    public async Task<string> UpdateDocuments(Dictionary<string, float[]> embeddings)
    {
        var listWrites = new List<WriteModel<BsonDocument>>();
        foreach (var kvp in embeddings)
        {
            var filterForUpdate = Builders<BsonDocument>.Filter.Eq("_id", kvp.Key);
            var updateDefinition = Builders<BsonDocument>.Update.Set(EmbeddingsField, kvp.Value);
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
            var name = VectorIndexName;

            var definition = new BsonDocument
            {
                {
                    "fields", new BsonArray
                    {
                        new BsonDocument
                        {
                            { "type", "vector" },
                            { "path", EmbeddingsField },
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
                    { "index", VectorIndexName },
                    { "path", EmbeddingsField },
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
// :snippet-end:

// :replace-end:
