using MongoDB.Bson;
using MongoDB.Driver;

// connect to your Atlas deployment
var uri = "<connection-string>";

var client = new MongoClient(uri);

var db = client.GetDatabase("<databaseName>");
var collection = db.GetCollection<BsonDocument>("<collectionName>");

// list your Atlas Search indexes
var result = collection.SearchIndexes.List().ToList();
foreach (var index in result)
{
    Console.WriteLine(index);
}
