using MongoDB.Bson;
using MongoDB.Driver;

// connect to your deployment
var uri = "<connection-string>";

var client = new MongoClient(uri);

var db = client.GetDatabase("sample_mflix");
var collection = db.GetCollection<BsonDocument>("movies");

// define your Search index
var index =  new CreateSearchIndexModel(
  "default", new BsonDocument
  {
    { "mappings", new BsonDocument
      {
        { "dynamic", true }
      }
    }
  });

var result = collection.SearchIndexes.CreateOne(index);
Console.WriteLine(result);
