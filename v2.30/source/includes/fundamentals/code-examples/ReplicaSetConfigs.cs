using MongoDB.Bson;
using MongoDB.Driver;

public class ReplicaSetConfigs
{
    public static void Main(string[] args)
    {   
        var client = new MongoClient("mongodb://localhost:27017");
        {
            // start-write-concern-client
            var mongoClientSettings = MongoClientSettings.FromConnectionString("<connection string URI>");
            mongoClientSettings.WriteConcern = WriteConcern.WMajority;
            var mongoClient = new MongoClient(mongoClientSettings);
            // end-write-concern-client
        }

        {
            var database = client.GetDatabase("test");
            // start-write-concern-collection
            var collection = database.GetCollection<BsonDocument>("<collection name>")
                                     .WithWriteConcern(WriteConcern.WMajority);
            // end-write-concern-collection
        }
        
        {
            // start-read-concern-client
            var mongoClientSettings = MongoClientSettings.FromConnectionString("<connection string URI>");
            mongoClientSettings.ReadConcern = ReadConcern.Majority;
            var mongoClient = new MongoClient(mongoClientSettings);
            // end-read-concern-client
        }

        {
            var database = client.GetDatabase("test");
            // start-read-concern-collection
            var collection = database.GetCollection<BsonDocument>("<collection name>")
                                     .WithReadConcern(ReadConcern.Majority);
            // end-read-concern-collection
        }

        {
            // start-read-preference-client
            var mongoClientSettings = MongoClientSettings.FromConnectionString("<connection string URI>");
            mongoClientSettings.ReadPreference = ReadPreference.Secondary;
            var mongoClient = new MongoClient(mongoClientSettings);
            // end-read-preference-client
        }

        {
            var database = client.GetDatabase("test");
            // start-read-preference-collection
            var collection = database.GetCollection<BsonDocument>("<collection name>")
                                     .WithReadPreference(ReadPreference.Secondary);
            // end-read-preference-collection
        }
    }
}