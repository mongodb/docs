using MongoDB.Bson;
using MongoDB.Driver;

// connect to your Atlas deployment
var uri = "<connection-string>";

var client = new MongoClient(uri);

var db = client.GetDatabase("sample_mflix");
var collection = db.GetCollection<BsonDocument>("movies");

// define your Atlas Search index
var index = new BsonDocument
{
  { "mappings", new BsonDocument
    {
      { "dynamic", true }
    }
  },
  { "numPartitions", 4 }
};

var result = collection.SearchIndexes.CreateOne(index, "partitioned_index");
Console.WriteLine(result);
