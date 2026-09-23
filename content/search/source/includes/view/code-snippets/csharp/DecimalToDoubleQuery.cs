using MongoDB.Bson;
using MongoDB.Driver;

// Connect to your Atlas deployment
var uri = "<connectionString>";
var client = new MongoClient(uri);
var database = client.GetDatabase("sample_airbnb");
var collection = database.GetCollection<BsonDocument>(
    "listingsAndReviews");

// Run the aggregation query
var pipeline = new[]
{
    new BsonDocument("$search",
        new BsonDocument("index", "listingsSearchablePrice")
            .Add("range",
                new BsonDocument("path", "totalPrice")
                    .Add("gte", 100)
                    .Add("lte", 200))),
    new BsonDocument("$project",
        new BsonDocument("_id", 0)
            .Add("totalPrice", 1)
            .Add("price", 1)
            .Add("cleaning_fee", 1))
};

var results = collection.Aggregate<BsonDocument>(pipeline);
foreach (var doc in results.ToList())
{
    Console.WriteLine(doc);
}
