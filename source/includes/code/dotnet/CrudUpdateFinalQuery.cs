using MongoDB.Bson;
using MongoDB.Driver;

// Replace the uri string with your MongoDB deployment's connection string.
var uri = "mongodb+srv://<user>:<password>@<cluster-url>?retryWrites=true&writeConcern=majority";

// instruct the driver to camelCase the fields in MongoDB
var pack = new ConventionPack { new CamelCaseElementNameConvention() };
ConventionRegistry.Register("elementNameConvention", pack, x => true);

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

// class that maps to the fields of a document in the sample_guides.comets collection
class Comet
{
    public ObjectId Id { get; set; }
    public string Name { get; set; }
    public string OfficialName { get; set; }
    public double OrbitalPeriod { get; set; }
    public double Radius { get; set; }
    public double Mass { get; set; }
}
