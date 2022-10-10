using MongoDB.Driver;

// Connection URI
const string connectionUri = "mongodb+srv://sample.host:27017/?connectTimeoutMS=60000&tls=true";

// Create a new client and connect to the server
var client = new MongoClient(connectionUri);
Console.ReadKey();