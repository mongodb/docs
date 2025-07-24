// Defines a template for connecting to a server through Atlas

// start atlas connection
using MongoDB.Driver;
using MongoDB.Bson;

// Replace the placeholder with your Atlas connection string
const string connectionUri = "<connection string>";

var settings = MongoClientSettings.FromConnectionString(connectionUri);

// Sets the ServerApi field of the settings object to Stable API version 1
settings.ServerApi = new ServerApi(ServerApiVersion.V1);

// Creates a new client and connects to the server
var client = new MongoClient(settings);

// Sends a ping to confirm a successful connection
try {
    var result = client.GetDatabase("admin").RunCommand<BsonDocument>(new BsonDocument("ping", 1));
    Console.WriteLine("Pinged your deployment. You successfully connected to MongoDB!");
} catch (Exception ex) { Console.WriteLine(ex);}
// end atlas connection