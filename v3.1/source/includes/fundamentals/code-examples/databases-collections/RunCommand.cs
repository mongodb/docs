using MongoDB.Bson;
using MongoDB.Driver;

public class RunCommand
{
    // Replace with your connection string
    private const string MongoConnectionString = "<connection string URI>";

    public static void Main(string[] args)
    {   
        var mongoClient = new MongoClient(MongoConnectionString);
        var database = mongoClient.GetDatabase("sample_restaurants");
        var collection = database.GetCollection<BsonDocument>("restaurants");

        {
            // start-hello
            var command = new BsonDocument("hello", 1);
            var result = database.RunCommand<BsonDocument>(command);
            // end-hello
        }

        {
            // start-read-pref
            var command = new BsonDocument("hello", 1);
            var result = database.RunCommand<BsonDocument>(command, ReadPreference.Secondary);
            // end-read-pref
        }

        {
            // start-print-command
            var command = new BsonDocument("dbStats", 1);
            var result = database.RunCommand<BsonDocument>(command);
            Console.WriteLine(result.ToJson());
            // end-print-command
        }
    }
    
    private static async void RunCommandAsync(IMongoDatabase database)
    {
        // start-hello-async
        var command = new BsonDocument("hello", 1);
        var result = await database.RunCommandAsync<BsonDocument>(command);
        // end-hello-async
    }
    
    private static async void RunCommandReadPrefAsync(IMongoDatabase database)
    {
        // start-read-pref-async
        var command = new BsonDocument("hello", 1);
        var result = await database.RunCommandAsync<BsonDocument>(command, ReadPreference.Secondary);
        // end-read-pref-async
    }
    
    private static async void RunCommandPrintAsync(IMongoDatabase database)
    {
        // start-print-command-async
        var command = new BsonDocument("dbStats", 1);
        var result = await database.RunCommandAsync<BsonDocument>(command);
        Console.WriteLine(result.ToJson());
        // end-print-command-async
    }
}