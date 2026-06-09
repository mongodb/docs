using MongoDB.Bson;
using MongoDB.Driver;

// Replace the connection string with your MongoDB deployment's connection string
var uri = "<connection-string>";

var client = new MongoClient(uri);

var db = client.GetDatabase("sample_supplies");
var collection = db.GetCollection<BsonDocument>("monthlyPhoneTransactions");

// Create the MongoDB Search index definition
var index =  new CreateSearchIndexModel(
  "monthlySalesIndex", new BsonDocument
  {
    { "mappings", new BsonDocument
      {
        { "dynamic", true}
      }
    }
  });

var result = collection.SearchIndexes.CreateOne(index);
Console.WriteLine($"New index name: {result}");
