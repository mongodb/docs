using MongoDB.Bson;
using MongoDB.Driver;

// connect to your Atlas deployment
var uri = "<connection-string>";

var client = new MongoClient(uri);

var db = client.GetDatabase("<database>");
var collection = db.GetCollection<BsonDocument>("<collection>");

// define your MongoDB Search index
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
                { "type", "number" },
                { "representation", "int64|double" },
                { "indexIntegers", true|false },
                { "indexDoubles", true|false }
              }
            }
          }
        }
      }
    }
  });

var result = collection.SearchIndexes.CreateOne(index);
Console.WriteLine($"New index name: {result}");