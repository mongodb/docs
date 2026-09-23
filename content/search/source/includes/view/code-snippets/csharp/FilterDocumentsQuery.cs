using MongoDB.Bson;
using MongoDB.Driver;

// Connect to your Atlas deployment
var uri = "<connectionString>";
var client = new MongoClient(uri);
var database = client.GetDatabase("sample_mflix");
var collection = database.GetCollection<BsonDocument>(
    "movies_ReleasedAfter2000");

// Run the aggregation query on the View
var pipeline = new[]
{
    new BsonDocument("$search",
        new BsonDocument("index", "releasedAfter2000Index")
            .Add("text",
                new BsonDocument("path", "title")
                    .Add("query", "foo"))
            .Add("sort",
                new BsonDocument("released", 1)))
};

var results = collection.Aggregate<BsonDocument>(pipeline);
foreach (var doc in results.ToList())
{
    Console.WriteLine(doc);
}
