/**
 * This is a working file, do not include this file in any code visible to the user.
*/

using System.Security.Cryptography;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;

// Replace the uri string with your MongoDB deployment's connection string.
// var uri = "mongodb+srv://<user>:<password>@<cluster-url>?retryWrites=true&writeConcern=majority";
var uri = "mongodb+srv://foo:bar@cluster0.7stmv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

var client = new MongoClient(uri);

var coll = client.GetDatabase("sample_guides").GetCollection<Comet>("comets");
// var documents = new Comet[]
// {
//     new Comet
//     {
//         Name = "Halley's Comet",
//         OfficialName = "1P/Halley",
//         OrbitalPeriod = 75,
//         Radius = 3.4175,
//         Mass = 2.2e14
//     },
//     new Comet
//     {
//         Name = "Wild2",
//         OfficialName = "81P/Wild",
//         OrbitalPeriod = 6.41,
//         Radius = 1.5534,
//         Mass = 2.3e13
//     },
//     new Comet
//     {
//         Name = "Comet Hyakutake",
//         OfficialName = "C/1996 B2",
//         OrbitalPeriod = 17000,
//         Radius = 0.77671,
//         Mass = 8.8e12
//     }
// };
// coll.InsertMany(documents);

var filter = Builders<Comet>.Filter.And(Builders<Comet>.Filter.Gt("OrbitalPeriod", 5), Builders<Comet>.Filter.Lt("OrbitalPeriod", 85));
var result = coll.DeleteMany(filter);

Console.WriteLine(result.DeletedCount);

class Comet
{
    public ObjectId Id { get; set;  }
    public string Name { get; set; }
    public string OfficialName { get; set; }
    public double OrbitalPeriod { get; set; }
    public double Radius { get; set; }
    public double Mass { get; set; }
}
