using MongoDB.Bson;
using MongoDB.Driver;

// connect to your Atlas deployment
var uri = "<connection-string>";

var client = new MongoClient(uri);

var db = client.GetDatabase("<databaseName>");
var collection = db.GetCollection<BsonDocument>("<collectionName>");

// define your Atlas Search index
var index = new BsonDocument
{
  { "mappings", new BsonDocument
    {
      { "dynamic", true }
    }
  }
};

var result = collection.SearchIndexes.CreateOne(index, "<indexName>");
Console.WriteLine(result);
