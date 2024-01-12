// Connects directly to a server with credentials

// start standalone connection
using MongoDB.Driver;

// Connection URI
const string connectionUri = "mongodb://user1:password1@sample.host:27017";

// Create a new client and connect to the server
var client = new MongoClient(connectionUri);
//end standalone connection