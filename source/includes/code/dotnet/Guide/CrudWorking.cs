/**
 * This is a working file, do not include this file in any code visible to the user.
*/

using MongoDB.Bson;
using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Driver;

// Replace the uri string with your MongoDB deployment's connection string.
// var uri = "mongodb+srv://<user>:<password>@<cluster-url>?retryWrites=true&writeConcern=majority";
var uri = "mongodb+srv://m220student:m220student@cluster0.jojrz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

// instruct the driver to read the fields in camelCase
var pack = new ConventionPack { new CamelCaseElementNameConvention() };
ConventionRegistry.Register("elementNameConvention", pack, x => true);

var client = new MongoClient(uri);

var coll = client.GetDatabase("sample_guides").GetCollection<Comet>("comets");

var filter = Builders<Comet>.Filter.Empty;
var update = Builders<Comet>.Update.Mul(x => x.Radius, 1.60934);
var result = coll.UpdateMany(filter, update);

Console.WriteLine(result.ModifiedCount);

class Comet {
    public ObjectId Id { get; set;  }
    public string Name { get; set; }
    public string OfficialName { get; set; }
    public double OrbitalPeriod { get; set; }
    public double Radius { get; set; }
    public double Mass { get; set; }
}

