using MongoDB.Bson;
using MongoDB.Driver;

// Replace the uri string with your MongoDB deployment's connection string.
var uri = "mongodb+srv://<user>:<password>@<cluster-url>?retryWrites=true&writeConcern=majority";

var client = new MongoClient(uri);

var coll = client.GetDatabase("sample_guides").GetCollection<BsonDocument>("planets");
// find code goes here
var cursor = coll.AsQueryable();

foreach (var document in cursor)
{
    Console.WriteLine(document);
}
