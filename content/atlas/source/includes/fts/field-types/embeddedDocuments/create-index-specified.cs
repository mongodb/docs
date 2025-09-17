using MongoDB.Bson;
using MongoDB.Driver;

// Replace the connection string with your MongoDB deployment's connection string
var uri = "<connection-string>";

var client = new MongoClient(uri);

var db = client.GetDatabase("sample_supplies");
var collection = db.GetCollection<BsonDocument>("sales");

// Create the MongoDB Search index definition for the embeddedDocuments field with specified fields
var index =  new CreateSearchIndexModel(
  "default", new BsonDocument
  {
    { "mappings", new BsonDocument
      {
        { "fields", new BsonDocument
          {
            { "items", new BsonDocument
              {
                { "type", "embeddedDocuments" },
                { "dynamic", false },
                { "fields", new BsonDocument
                  {
                    { "name", new BsonDocument
                      {
                        { "type", "string" }
                      }
                    },
                    { "tags", new BsonDocument
                      {
                        { "type", "string" }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  });

var result = collection.SearchIndexes.CreateOne(index);
Console.WriteLine($"New index name: {result}");