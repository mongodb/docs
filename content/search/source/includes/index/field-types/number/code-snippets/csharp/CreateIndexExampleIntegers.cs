using MongoDB.Bson;
using MongoDB.Driver;

// connect to your Atlas deployment
var uri = "<connection-string>";

var client = new MongoClient(uri);

var db = client.GetDatabase("sample_analytics");
var collection = db.GetCollection<BsonDocument>("accounts");

// define your MongoDB Search index
var index =  new CreateSearchIndexModel(
  "default", new BsonDocument
  {
    { "mappings", new BsonDocument
      {
        { "dynamic", false },
        { "fields", new BsonDocument
          {
            { "account_id", new BsonDocument
              {
                { "type", "number" },
                { "representation", "int64" },
                { "indexDoubles", false }
              }
            }
          }
        }
      }
    }
  });

var result = collection.SearchIndexes.CreateOne(index);
Console.WriteLine($"New index name: {result}");