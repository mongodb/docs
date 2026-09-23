using MongoDB.Bson;
using MongoDB.Driver;

// Connect to your Atlas deployment
var uri = "<connectionString>";
var client = new MongoClient(uri);
var database = client.GetDatabase("sample_airbnb");
var collection = database.GetCollection<BsonDocument>(
    "listingsAndReviews_totalPrice");

// Define your MongoDB Search index
var index = new CreateSearchIndexModel(
  "totalPriceIndex", new BsonDocument
  {
    { "mappings", new BsonDocument
      {
        { "dynamic", true }
      }
    },
    { "storedSource", new BsonDocument
      {
        { "include", new BsonArray { "totalPrice" } }
      }
    }
  });

// Create the index
var result = collection.SearchIndexes.CreateOne(index);
Console.WriteLine($"New index name: {result}");
