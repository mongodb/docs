// :replace-start: {
//   "terms": {
//     "Examples.VectorSearch.Rag": "MyCompany.RAG"
//   }
// }

// :snippet-start: mongodb-data-service-class
namespace Examples.VectorSearch.Rag;

using MongoDB.Bson;
using MongoDB.Driver;

public class MongoDBDataService
{
    private readonly IMongoCollection<BsonDocument> _collection;

    public MongoDBDataService() // :remove:
        : this( // :remove:
            new MongoClient( // :remove:
                Environment.GetEnvironmentVariable("MONGODB_URI")) // :remove:
            .GetDatabase("rag_db") // :remove:
            .GetCollection<BsonDocument>("test")) // :remove:
    { } // :remove:
    // :uncomment-start:
    // public MongoDBDataService()
    // {
    //     var client = new MongoClient(
    //         Environment.GetEnvironmentVariable("MONGODB_URI"));
    //     _collection = client.GetDatabase("rag_db")
    //         .GetCollection<BsonDocument>("test");
    // }
    // :uncomment-end:

    public MongoDBDataService(IMongoCollection<BsonDocument> collection) // :remove:
    { // :remove:
        _collection = collection; // :remove:
    } // :remove:
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
    // :uncomment-start:
    // }
    // :uncomment-end:
    // :snippet-end: mongodb-data-service-class

    // :snippet-start: create-vector-index
    public string CreateVectorIndex()
    {
        var indexName = "vector_index";
        var definition = new BsonDocument
        {
            { "fields", new BsonArray
                {
                    new BsonDocument
                    {
                        { "type", "vector" },
                        { "numDimensions", 1024 },
                        { "path", "embedding" },
                        { "similarity", "cosine" },
                    }
                }
            },
        };
        var model = new CreateSearchIndexModel(
            indexName,
            SearchIndexType.VectorSearch,
            definition);
        _collection.SearchIndexes.CreateOne(model);

        // Poll until the index is queryable
        Console.WriteLine("Polling to check if the index is ready. This may take up to a minute.");
        var deadline = DateTime.UtcNow.AddMinutes(3);
        bool queryable = false;
        while (!queryable)
        {
            if (DateTime.UtcNow > deadline)
                throw new TimeoutException(
                    $"Search index {indexName} did not become queryable within 3 minutes.");
            foreach (var index in _collection.SearchIndexes.List().ToEnumerable())
            {
                if (index["name"] == indexName)
                    queryable = index["queryable"].AsBoolean;
            }
            if (!queryable)
                Thread.Sleep(5000);
        }
        Console.WriteLine($"{indexName} is ready for querying.");
        return indexName;
    }
    // :snippet-end:

    // :snippet-start: perform-vector-query
    public List<BsonDocument> PerformVectorQuery(float[] queryVector)
    {
        var pipeline = new[]
        {
            new BsonDocument
            {
                { "$vectorSearch", new BsonDocument
                    {
                        { "index", "vector_index" },
                        { "path", "embedding" },
                        { "queryVector", new BsonArray(queryVector) },
                        { "exact", true },
                        { "limit", 5 },
                    }
                }
            },
            new BsonDocument
            {
                { "$project", new BsonDocument
                    {
                        { "_id", 0 },
                        { "text", 1 },
                        { "score", new BsonDocument { { "$meta", "vectorSearchScore" } } },
                    }
                }
            },
        };
        return _collection.Aggregate<BsonDocument>(pipeline).ToList();
    }
    // :snippet-end:
}
// :replace-end:
