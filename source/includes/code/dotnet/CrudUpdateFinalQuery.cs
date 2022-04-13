using MongoDB.Bson;
using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Driver;

// Replace the uri string with your MongoDB deployment's connection string.
var uri = "mongodb+srv://<user>:<password>@<cluster-url>?retryWrites=true&writeConcern=majority";

// instruct the driver to read the fields in camelCase
var pack = new ConventionPack { new CamelCaseElementNameConvention() };
ConventionRegistry.Register("elementNameConvention", pack, x => true);

var client = new MongoClient(uri);

// database and collection code goes here
var db = client.GetDatabase("sample_guides");
var coll = db.GetCollection<BsonDocument>("comets");

// update code goes here
var filter = Builders<Comet>.Filter.Empty;
var update = Builders<Comet>.Update.Mul(x => x.Radius, 1.60934);
var result = coll.UpdateMany(filter, update);

// display the results of your operation
Console.WriteLine(result.ModifiedCount);

class Comet {
    public ObjectId Id { get; set;  }
    public string Name { get; set; }
    public string OfficialName { get; set; }
    public double OrbitalPeriod { get; set; }
    public double Radius { get; set; }
    public double Mass { get; set; }
}

