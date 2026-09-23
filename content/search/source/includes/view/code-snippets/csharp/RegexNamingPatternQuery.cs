using MongoDB.Bson;
using MongoDB.Driver;

// Connect to your Atlas deployment
var uri = "<connectionString>";
var client = new MongoClient(uri);
var database = client.GetDatabase("sample_airbnb");
var collection = database.GetCollection<BsonDocument>(
    "listings_SearchableTypes");

// Run the aggregation query on the View
var pipeline = new[]
{
    new BsonDocument("$search",
        new BsonDocument("index", "listingsSearchableTypes")
            .Add("compound",
                new BsonDocument("should",
                    new BsonArray
                    {
                        new BsonDocument("equals",
                            new BsonDocument("path",
                                "searchable_types.property_type")
                                .Add("value", "House")),
                        new BsonDocument("equals",
                            new BsonDocument("path",
                                "searchable_types.room_type")
                                .Add("value", "Private room"))
                    }))),
    new BsonDocument("$limit", 10),
    new BsonDocument("$project",
        new BsonDocument("_id", 0)
            .Add("searchable_types", 1)
            .Add("name", 1))
};

var results = collection.Aggregate<BsonDocument>(pipeline);
foreach (var doc in results.ToList())
{
    Console.WriteLine(doc);
}
