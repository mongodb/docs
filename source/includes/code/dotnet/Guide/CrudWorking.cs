/**
 * This is a working file, do not include this file in any code visible to the user.
*/
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Driver;

// Replace the uri string with your MongoDB deployment's connection string.
// var uri = "mongodb+srv://<user>:<password>@<cluster-url>?retryWrites=true&writeConcern=majority";
// var uri = "mongodb+srv://foo:bar@cluster0.7stmv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
var uri = "mongodb+srv://m220student:m220student@cluster0.jojrz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

// instruct the driver to read the fields in camelCase
var pack = new ConventionPack { new CamelCaseElementNameConvention() };
ConventionRegistry.Register("elementNameConvention", pack, x => true);

var client = new MongoClient(uri);

// database and collection code goes here
var db = client.GetDatabase("sample_guides");
var coll = db.GetCollection<Comet>("comets");

// delete code goes here
var result = coll.DeleteMany(x => x.OrbitalPeriod > 5 && x.OrbitalPeriod < 85);

// amount deleted code goes here
Console.WriteLine(result.DeletedCount);

// class that represents the fields of a document in the
// sample_guides.comets collection
class Comet
{
    public ObjectId Id { get; set;  }
    public string Name { get; set; }
    public string OfficialName { get; set; }
    public double OrbitalPeriod { get; set; }
    public double Radius { get; set; }
    public double Mass { get; set; }
}
