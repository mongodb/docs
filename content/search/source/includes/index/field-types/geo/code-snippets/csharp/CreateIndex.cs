using MongoDB.Bson;
using MongoDB.Driver;

// Replace the connection string with your MongoDB deployment's connection string
var uri = "<connection-string>";

var client = new MongoClient(uri);

var db = client.GetDatabase("<database>");
var collection = db.GetCollection<BsonDocument>("<collection>");

// Create the MongoDB Search index definition for the geo field
var index =  new CreateSearchIndexModel(
  "default", new BsonDocument
  {
    { "mappings", new BsonDocument
      {
        { "dynamic", true|false },
        { "fields", new BsonDocument
          {
            { "<field-name>", new BsonDocument
              {
                { "type", "geo" },
                { "indexShapes",  true|false }
              }
            }
          }
        }
      }
    }
  });

var result = collection.SearchIndexes.CreateOne(index);
Console.WriteLine($"New index name: {result}");