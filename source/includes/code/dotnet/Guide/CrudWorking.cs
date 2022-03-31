/**
 * This is a working file, do not include this file in any code visible to the user.
*/
using MongoDB.Bson;
using MongoDB.Driver;

// Replace the uri string with your MongoDB deployment's connection string.
// var uri = "mongodb+srv://<user>:<password>@<cluster-url>?retryWrites=true&writeConcern=majority";
var uri = "mongodb+srv://foo:bar@cluster0.7stmv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

var client = new MongoClient(uri);

var coll = client.GetDatabase("sample_guides").GetCollection<BsonDocument>("planets");
// find code goes here
var cursor = from planet in coll.AsQueryable()
    where planet["surfaceTemperatureC.mean"] < 15 && 
          planet["surfaceTemperatureC.min"] > -100
    select planet;
// var cursor = from planet in coll.AsQueryable()
//     where planet["orderFromSun"] > 7 || planet["orderFromSun"] < 2
//     select planet;

foreach (var document in cursor)
{
    Console.WriteLine(document);
}


