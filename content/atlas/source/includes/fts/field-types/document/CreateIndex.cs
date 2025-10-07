using MongoDB.Bson;
using MongoDB.Driver;

// Replace the connection string with your MongoDB deployment's connection string
var uri = "<connection-string>";

var client = new MongoClient(uri);

var db = client.GetDatabase("<database>");
var collection = db.GetCollection<BsonDocument>("<collection>");

// Create the MongoDB Search index definition for the document field
var index =  new CreateSearchIndexModel(
  "default", new BsonDocument
  {
    { "mappings", new BsonDocument
      {
        { "dynamic", <true|false> | new BsonDocument { { "typeset", "<type-set-name>" } } }, // "dynamic" can be a boolean or an object with "typeset" name
        { "fields", new BsonDocument
          {
            { "<field-name>", new BsonDocument
              {
                { "type", "document" },
                { "dynamic", <true|false> | new BsonDocument { { "typeset", "<type-set-name>" } } }, // "dynamic" can be a boolean or an object with "typeset" name
                { "fields", new BsonDocument
                  {
                    { "<sub-field-name>", new BsonDocument
                      {
                        // Add field mapping definitions here
                      }
                    }
                    // ... additional sub-fields 
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
          { "name", "<type-set-name>" },
          { "types", new BsonArray
            {
              new BsonDocument
              {
                { "type", "<field-type>" }
                // ... field type configuration 
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