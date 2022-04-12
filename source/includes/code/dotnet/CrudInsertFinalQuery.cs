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
var db = client.GetDatabase("sample_guides");
var coll = db.GetCollection<Comet>("comets");

// insert code goes here
var comets = new []
{
    new Comet
    {
        Name = "Halley's Comet",
        OfficialName = "1P/Halley",
        OrbitalPeriod = 75,
        Radius = 3.4175,
        Mass = 2.2e14
    },
    new Comet
    {
        Name = "Wild2",
        OfficialName = "81P/Wild",
        OrbitalPeriod = 6.41,
        Radius = 1.5534,
        Mass = 2.3e13
    },
    new Comet
    {
        Name = "Comet Hyakutake",
        OfficialName = "C/1996 B2",
        OrbitalPeriod = 17000,
        Radius = 0.77671,
        Mass = 8.8e12
    }
};

coll.InsertMany(comets);

// display insert ids code goes here
foreach (var comet in comets)
{
    Console.WriteLine(comet.Id);
}

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
