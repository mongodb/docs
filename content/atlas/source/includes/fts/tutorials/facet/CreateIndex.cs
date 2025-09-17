using MongoDB.Bson;
using MongoDB.Driver;

// connect to your Atlas deployment
var uri = "<connection-string>";

var client = new MongoClient(uri);

var db = client.GetDatabase("sample_mflix");
var collection = db.GetCollection<BsonDocument>("movies");

// define your MongoDB Search index
var index =  new CreateSearchIndexModel(
  "facet-tutorial", new BsonDocument
  {
    { "mappings", new BsonDocument
      {
        { "dynamic", true },
        { "fields", new BsonDocument
          {
            { "genres", new BsonDocument
              {
                { "type", "token" }
              }
            }
          }
        }
      }
    }
  });

var result = collection.SearchIndexes.CreateOne(index);
Console.WriteLine($"New index name: {result}");