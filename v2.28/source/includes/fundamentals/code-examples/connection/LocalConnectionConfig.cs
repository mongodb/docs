// Connects to a server by using a URI with configuration options

// start local connection config
using MongoDB.Driver;

// Sets the connection URI
const string connectionUri = "mongodb+srv://sample.host:27017/?connectTimeoutMS=60000&tls=true";

// Creates a new client and connects to the server
var client = new MongoClient(connectionUri);
// end local connection config