// establish connection and set namespace  
using MongoDB.Bson;
using MongoDB.Driver;

var client = new MongoClient("<connection-string>");
var database = client.GetDatabase("sample_airbnb");
var collection = database.GetCollection<BsonDocument>("listingsAndReviews");

// define query
var agg = new BsonDocument("$searchMeta",
    new BsonDocument("facet",
        new BsonDocument
        {
            ["operator"] = new BsonDocument("geoWithin",
                new BsonDocument
                {
                    ["path"] = "address.location",
                    ["box"] = new BsonDocument
                    {
                        ["bottomLeft"] = new BsonDocument
                        {
                            ["type"] = "Point",
                            ["coordinates"] = new BsonArray { 112.467, -55.050 }
                        },
                        ["topRight"] = new BsonDocument
                        {
                            ["type"] = "Point", 
                            ["coordinates"] = new BsonArray { 168.000, -9.133 }
                        }
                    }
                }),
            ["facets"] = new BsonDocument("propertyTypeFacet",
                new BsonDocument
                {
                    ["type"] = "string",
                    ["path"] = "property_type"
                })
        }));

// run query and print results
var cursor = collection.Aggregate<BsonDocument>(
    new BsonDocument[] { agg }
);
foreach (var result in cursor.ToEnumerable())
{
    Console.WriteLine(result);
}