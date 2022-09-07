using MongoDB.Driver;

// Connection URI
const string connectionUri = "mongodb://localhost:27017";

// Create a new client and connect to the server
var client = new MongoClient(connectionUri);
Console.ReadKey();