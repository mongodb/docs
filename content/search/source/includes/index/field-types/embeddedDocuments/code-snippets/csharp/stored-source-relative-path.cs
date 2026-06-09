using MongoDB.Bson;
using MongoDB.Driver;

// Replace the connection string with your MongoDB deployment's connection string
var uri = "<connection-string>";

var client = new MongoClient(uri);

var db = client.GetDatabase("sample_training");
var collection = db.GetCollection<BsonDocument>("companies");

// Create the Atlas Search index definition for the embeddedDocuments field
var index =  new CreateSearchIndexModel(
  "default", new BsonDocument
  {
    { "mappings", new BsonDocument
      {
        { "dynamic", false },
        { "fields", new BsonDocument
          {
            { "funding_rounds", new BsonDocument
              {
                { "type", "embeddedDocuments" },
                { "dynamic", true },
                { "storedSource", new BsonDocument
                  {
                    { "include", new BsonArray { "round_code", "raised_currency_code", "raised_amount" } }
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