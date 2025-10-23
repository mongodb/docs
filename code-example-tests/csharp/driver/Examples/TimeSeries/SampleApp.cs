using DotNetEnv;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Examples.TimeSeries;

public class SampleApp
{
    public static BsonDocument RunExample()
    {
        var uri = Env.GetString("CONNECTION_STRING",
            "Env variable not found. Verify you have a .env file with a valid connection string.");
        // :snippet-start: example
        // :uncomment-start:
        //using MongoDB.Driver;
        // :uncomment-end:

        // Replace the placeholder with your connection string.
        // :uncomment-start:
        //var uri = "<connection string>";
        // :uncomment-end:

        try
        {
            var client = new MongoClient(uri);
            // start example code here

            // :remove-start:
            var database = client.GetDatabase("admin");
            var command = new BsonDocument("ping", 1);
            return database.RunCommand<BsonDocument>(command);
            // :remove-end:
            // end example code here
        }
        catch (MongoException me)
        {
            Console.Error.WriteLine(me.Message);
            // :remove-start:
            return new BsonDocument { { "There was an error connecting to MongoDB", me.Message } };
            // :remove-end:
        }
        // :snippet-end:
    }
}