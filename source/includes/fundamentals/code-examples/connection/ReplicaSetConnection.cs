using MongoDB.Driver;

// Connection URI
const string connectionUri = "mongodb://sample.host1:27017,sample.host2:27017,sample.host3:27017/?replicaSet=sampleRS";

// Create a new client and connect to the server
var client = new MongoClient(connectionUri);
Console.ReadKey();