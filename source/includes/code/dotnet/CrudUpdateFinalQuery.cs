using MongoDB.Bson;
using MongoDB.Driver;

// Replace the uri string with your MongoDB deployment's connection string.
// var uri = "mongodb+srv://<user>:<password>@<cluster-url>?retryWrites=true&writeConcern=majority";
var uri = "mongodb+srv://m220student:m220student@cluster0.jojrz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

var client = new MongoClient(uri);

// database and collection code goes here
var db = client.GetDatabase("sample_guides");
var coll = db.GetCollection<BsonDocument>("comets");

// update code goes here
var filter = Builders<Comet>.Filter.Empty;
var update = Builders<Comet>.Update.Mul("Radius", 1.60934);
var result = coll.UpdateMany(filter, update);

// amount updated code goes here
Console.WriteLine(result.ModifiedCount);

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
