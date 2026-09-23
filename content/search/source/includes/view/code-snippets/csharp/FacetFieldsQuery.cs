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
    new BsonDocument("$searchMeta",
        new BsonDocument("index", "listingsSearchableTypes")
            .Add("facet",
                new BsonDocument("operator",
                    new BsonDocument("text",
                        new BsonDocument("path", "summary")
                            .Add("query", "ocean view")))
                    .Add("facets",
                        new BsonDocument("idFacet",
                            new BsonDocument("type", "string")
                                .Add("path", "idString")
                                .Add("numBuckets", 10))
                            .Add("hostFacet",
                                new BsonDocument("type", "string")
                                    .Add("path",
                                        "superHostString")))))
};

var results = collection.Aggregate<BsonDocument>(pipeline);
foreach (var doc in results.ToList())
{
    Console.WriteLine(doc);
}
