using MongoDB.Bson;
using MongoDB.Driver;

// Connect to your Atlas deployment
var uri = "<connectionString>";
var client = new MongoClient(uri);
var database = client.GetDatabase("sample_airbnb");
var collection = database.GetCollection<BsonDocument>(
    "listingsAndReviews_totalPrice");

// Run the aggregation query on the View
var pipeline = new[]
{
    new BsonDocument("$search",
        new BsonDocument("index", "totalPriceIndex")
            .Add("range",
                new BsonDocument("path", "totalPrice")
                    .Add("lte", 300))
            .Add("returnStoredSource", true))
};

var results = collection.Aggregate<BsonDocument>(pipeline);
foreach (var doc in results.ToList())
{
    Console.WriteLine(doc);
}
