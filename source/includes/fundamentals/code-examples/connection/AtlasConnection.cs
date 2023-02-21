using MongoDB.Driver;

// Connection URI
const string connectionUri = "mongodb+srv://<username>:<password>@cluster0.sample.mongodb.net/?retryWrites=true&w=majority";

var serverApi = new ServerApi(ServerApiVersion.V1);
var settings = MongoClientSettings.FromConnectionString(connectionString);
settings.ServerApi = serverApi;

// Create a new client and connect to the server
var client = new MongoClient(settings);