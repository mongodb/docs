//const string connectionUri = "mongodb+srv://sample.host:27017/?connectTimeoutMS=60000&tls=true";

// Create a MongoClientSettings object
var settings = new MongoClientSettings()
{
    Scheme = ConnectionStringScheme.MongoDBPlusSrv,
    Server = new MongoServerAddress("sample.host", 27017),
    ConnectTimeout = new TimeSpan(0, 0, 60),
    UseTls = true
};

// Create a new client and connect to the server
var client = new MongoClient(settings);