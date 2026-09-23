using MongoDB.Bson;
using MongoDB.Driver;

// Connect to your Atlas deployment
var uri = "<connectionString>";
var client = new MongoClient(uri);
var database = client.GetDatabase("sample_mflix");
var collection = database.GetCollection<BsonDocument>(
    "movies_ReleasedAfter2000");

// Define your MongoDB Search index
var index = new CreateSearchIndexModel(
  "releasedAfter2000Index", new BsonDocument
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
