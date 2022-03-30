/**
 * This is a working file, do not include this file in any code visible to the user.
*/
using MongoDB.Bson;
using MongoDB.Driver;

// Replace the uri string with your MongoDB deployment's connection string.
var uri = "mongodb+srv://<user>:<password>@<cluster-url>?retryWrites=true&writeConcern=majority";

var client = new MongoClient(uri);

// database and collection code goes here
var db = client.GetDatabase("sample_guides");
var coll = db.GetCollection<BsonDocument>("planets");
// find code goes here
var cursor = from planet in coll.AsQueryable()
             where planet["hasRings"] == false
             where planet["mainAtmosphere"] == "Ar"
             select planet;
// iterate code goes here
foreach (var document in cursor)
{
    Console.WriteLine(document);
}


