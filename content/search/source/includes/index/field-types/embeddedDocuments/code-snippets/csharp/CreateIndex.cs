using MongoDB.Bson;
using MongoDB.Driver;

// Replace the connection string with your MongoDB deployment's connection string
var uri = "<connection-string>";

var client = new MongoClient(uri);

var db = client.GetDatabase("<database>");
var collection = db.GetCollection<BsonDocument>("<collection>");

// Create the MongoDB Search index definition for the embeddedDocuments field
var index =  new CreateSearchIndexModel(
  "default", new BsonDocument
  {
    { "mappings", new BsonDocument
      {
        // "dynamic" can be a boolean or an object with "typeSet" name
        { "dynamic", <true|false> | new BsonDocument { { "typeSet", "<typeSet-name>" } } },
        { "fields", new BsonDocument
          {
            { "<field-name>", new BsonDocument
              {
                { "type", "embeddedDocuments" },
                // "dynamic" can be a boolean or an object with "typeSet" name
                { "dynamic", <true|false> | new BsonDocument { { "typeSet", "<typeSet-name>" } } },
                { "fields", new BsonDocument
                  {
                    { "<field-name>", new BsonDocument
                      {
                        // <field-mapping-definition>
                      }
                    }
                    // ... additional fields 
                  }
                }
              }
            }
            // ... additional fields 
          }
        }
      }
    },
    { "typeSets", new BsonArray
      {
        new BsonDocument
        {
          { "name", "<typeSet-name>" },
          { "types", new BsonArray
            {
              new BsonDocument
              {
                // <field-type-configuration>
              }
              // ... additional types 
            }
          }
        }
        // ... additional typeSets 
      }
    }
  });

var result = collection.SearchIndexes.CreateOne(index);
Console.WriteLine($"New index name: {result}");