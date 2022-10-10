using MongoDB.Driver;

// Create a MongoClientSettings object
var settings = new MongoClientSettings()
{
    Scheme = ConnectionStringScheme.MongoDB,
    Server = new MongoServerAddress("localhost", 27017)
};

// Create a new client and connect to the server
var client = new MongoClient(settings);