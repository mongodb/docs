using MongoDB.Driver;

// Connection URI
const string connectionUri = "mongodb+srv://user1:password1@cluster0.sample.mongodb.net/?retryWrites=true&w=majority";

// Create a new client and connect to the server
var client = new MongoClient(connectionUri);
Console.ReadKey();