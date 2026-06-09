using MongoDB.Bson;
using MongoDB.Driver;
// Replace the connection string with your MongoDB deployment's connection string
var uri = "<connection-string>";
var client = new MongoClient(uri);
var db = client.GetDatabase("sample_analytics");
var collection = db.GetCollection<BsonDocument>("customers");
// Create the MongoDB Search index definition for the boolean field
var index =  new CreateSearchIndexModel(
  "default", new BsonDocument
  {
    { "mappings", new BsonDocument
      {
        { "dynamic", false },
        { "fields", new BsonDocument
          {
            { "active", new BsonDocument
              {
                { "type", "boolean" },
              }
            }
          }
        }
      }
    }
  });
var result = collection.SearchIndexes.CreateOne(index);
Console.WriteLine($"New index name: {result}");