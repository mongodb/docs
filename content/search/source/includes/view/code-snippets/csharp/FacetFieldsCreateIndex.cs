using MongoDB.Bson;
using MongoDB.Driver;

// Connect to your Atlas deployment
var uri = "<connectionString>";
var client = new MongoClient(uri);
var database = client.GetDatabase("sample_airbnb");
var collection = database.GetCollection<BsonDocument>(
    "listings_SearchableTypes");

// Define your MongoDB Search index
var index = new CreateSearchIndexModel(
  "listingsSearchableTypes", new BsonDocument
  {
    { "mappings", new BsonDocument
      {
        { "dynamic", true },
        { "fields", new BsonDocument
          {
            { "idString", new BsonDocument
              {
                { "type", "token" }
              }
            },
            { "superHostString", new BsonDocument
              {
                { "type", "token" }
              }
            }
          }
        }
      }
    }
  });

// Create the index
var result = collection.SearchIndexes.CreateOne(index);
Console.WriteLine($"New index name: {result}");
