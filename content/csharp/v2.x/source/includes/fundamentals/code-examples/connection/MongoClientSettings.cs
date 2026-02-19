// Defines a MongoClientSettings object to pass settings to the client

// start mongo client settings
using MongoDB.Driver;

// Creates a MongoClientSettings object
var settings = new MongoClientSettings()
{
    Scheme = ConnectionStringScheme.MongoDB,
    Server = new MongoServerAddress("localhost", 27017)
};

// Creates a new client and connects to the server
var client = new MongoClient(settings);
// end mongo client settings