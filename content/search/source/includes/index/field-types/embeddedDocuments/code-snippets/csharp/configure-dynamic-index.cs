using MongoDB.Bson;
using MongoDB.Driver;

// Replace the connection string with your MongoDB deployment's connection string
var uri = "<connection-string>";

var client = new MongoClient(uri);

var db = client.GetDatabase("sample_training");
var collection = db.GetCollection<BsonDocument>("companies");

// Create the Atlas Search index definition for the embeddedDocuments field with dynamic mapping
var index =  new CreateSearchIndexModel(
  "default", new BsonDocument
  {
    { "mappings", new BsonDocument
      {
        { "dynamic", false },
        { "fields", new BsonDocument
          {
            { "relationships", new BsonDocument
              {
                { "type", "embeddedDocuments" },
                { "dynamic", new BsonDocument
                  {
                    { "typeSet", "stringBooleanIndex" }
                  }
                },
                { "fields", new BsonDocument
                  {
                    { "person", new BsonDocument
                      {
                        { "type", "document" },
                        { "dynamic", new BsonDocument
                          {
                            { "typeSet", "stringBooleanIndex" }
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
      }
    },
    { "typeSets", new BsonArray
      {
        new BsonDocument
        {
          { "name", "stringBooleanIndex" },
          { "types", new BsonArray
            {
              new BsonDocument { { "type", "boolean" } },
              new BsonDocument { { "type", "string" } }
            }
          }
        }
      }
    }
  });

var result = collection.SearchIndexes.CreateOne(index);
Console.WriteLine($"New index name: {result}");