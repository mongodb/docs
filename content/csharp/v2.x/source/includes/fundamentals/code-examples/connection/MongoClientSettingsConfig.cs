// Defines a MongoClientSettings object to pass configuration settings to the client

// start mongo client settings config
//const string connectionUri = "mongodb+srv://sample.host:27017/?connectTimeoutMS=60000&tls=true";

// Creates a MongoClientSettings object
var settings = new MongoClientSettings()
{
    Scheme = ConnectionStringScheme.MongoDBPlusSrv,
    Server = new MongoServerAddress("sample.host", 27017),
    ConnectTimeout = new TimeSpan(0, 0, 60),
    UseTls = true
};

// Creates a new client and connects to the server
var client = new MongoClient(settings);
// end mongo client settings config