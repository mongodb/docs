// Defines a template for connecting to a server by using a URI

// start local connection
using MongoDB.Driver;

// Sets the connection URI
const string connectionUri = "mongodb://localhost:27017";

// Creates a new client and connects to the server
var client = new MongoClient(connectionUri);
// end local connection