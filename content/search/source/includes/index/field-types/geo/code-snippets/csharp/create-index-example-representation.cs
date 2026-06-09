using MongoDB.Bson;
using MongoDB.Driver;

// Replace the connection string with your MongoDB deployment's connection string
var uri = "<connection-string>";

var client = new MongoClient(uri);

var db = client.GetDatabase("sample_airbnb");
var collection = db.GetCollection<BsonDocument>("listingsAndReviews");

// Create the MongoDB Search index definition for the geo field
var index =  new CreateSearchIndexModel(
  "default", new BsonDocument
  {
    { "mappings", new BsonDocument
      {
        { "dynamic", false },
        { "fields", new BsonDocument
          {
            { "address", new BsonDocument
              {
                { "type", "document" },
                { "fields", new BsonDocument
                  {
                    { "location", new BsonDocument
                      {
                        { "type", "geo" },
                        { "indexShapes", true }
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