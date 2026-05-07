using MongoDB.Bson;
using MongoDB.Driver;

var connectionString = "<connection string>";
var client = new MongoClient(connectionString);
var database = client.GetDatabase("sample_mflix");
var collection = database.GetCollection<BsonDocument>("movies");

var pipeline = new[]
{
    new BsonDocument("$vectorSearch", new BsonDocument
    {
        { "index", "autoembed_index" },
        { "path", "fullplot" },
        { "query", new BsonDocument("text", "journey through the country side") },
        { "numCandidates", 100 },
        { "model", "voyage-4" },
        { "limit", 10 }
    }),
    new BsonDocument("$project", new BsonDocument
    {
        { "_id", 0 },
        { "title", 1 },
        { "fullplot", 1 },
        { "score", new BsonDocument("$meta", "vectorSearchScore") }
    })
};

var results = collection.Aggregate<BsonDocument>(pipeline).ToList();

foreach (var result in results)
{
    Console.WriteLine(result.ToJson());
}
