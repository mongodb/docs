using MongoDB.Bson;
using MongoDB.Driver;

// connect to your Atlas deployment
var uri = "<connection-string>";

var client = new MongoClient(uri);

var db = client.GetDatabase("<databaseName>");
var collection = db.GetCollection<BsonDocument>("<collectionName>");

// drop your Atlas Search index
collection.SearchIndexes.DropOne("<index name>");
