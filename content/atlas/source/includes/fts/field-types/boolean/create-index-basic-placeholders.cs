using MongoDB.Bson;
using MongoDB.Driver;
// Replace the connection string with your MongoDB deployment's connection string
var uri = "<connection-string>";
var client = new MongoClient(uri);
var db = client.GetDatabase("<database-name>");
var collection = db.GetCollection<BsonDocument>("<collection-name>");
// Create the MongoDB Search index definition for the boolean field
var index =  new CreateSearchIndexModel(
  "default", new BsonDocument
  {
    { "mappings", new BsonDocument
      {
        { "dynamic", true | false },
        { "fields", new BsonDocument
          {
            { "<fieldName>", new BsonDocument
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