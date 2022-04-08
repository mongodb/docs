using System.Security.Cryptography;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;

// Replace the uri string with your MongoDB deployment's connection string.
var uri = "mongodb+srv://<user>:<password>@<cluster-url>?retryWrites=true&writeConcern=majority";

var client = new MongoClient(uri);

// database and collection code goes here
var db = client.GetDatabase("sample_guides");
var coll = db.GetCollection<BsonDocument>("comets");

// delete code goes here
var filter = Builders<Comet>.Filter.And(Builders<Comet>.Filter.Gt("OrbitalPeriod", 5), Builders<Comet>.Filter.Lt("OrbitalPeriod", 85));
var result = coll.DeleteMany(filter);

// amount deleted code goes here
Console.WriteLine(result.DeletedCount);

class Comet
{
    [BsonId]
    public ObjectId Id { get; set;  }
    public string Name { get; set; }
    public string OfficialName { get; set; }
    public double OrbitalPeriod { get; set; }
    public double Radius { get; set; }
    public double Mass { get; set; }
}
