using MongoDB.Bson;
using MongoDB.Driver;

// Connect to your Atlas deployment
var uri = "<connectionString>";
var client = new MongoClient(uri);
var database = client.GetDatabase("sample_airbnb");
var collection = database.GetCollection<BsonDocument>(
    "listings_SearchablePrice");

// Define your MongoDB Search index
var index = new CreateSearchIndexModel(
  "listingsSearchablePrice", new BsonDocument
  {
    { "mappings", new BsonDocument
      {
        { "dynamic", true }
      }
    }
  });

// Create the index
var result = collection.SearchIndexes.CreateOne(index);
Console.WriteLine($"New index name: {result}");
