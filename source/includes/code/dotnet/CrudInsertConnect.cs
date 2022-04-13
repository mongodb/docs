using MongoDB.Bson;
using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Driver;

// Replace the uri string with your MongoDB deployment's connection string.
var uri = "mongodb+srv://<user>:<password>@<cluster-url>?retryWrites=true&writeConcern=majority";

// instuct the driver to camelCase the fields in MongoDB
var pack = new ConventionPack { new CamelCaseElementNameConvention() };
ConventionRegistry.Register("elementNameConvention", pack, x => true);

var client = new MongoClient(uri);

// database and colletion code goes here
// insert code goes here
// display insert ids code goes here

// class that maps to the fields of a document in the
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
