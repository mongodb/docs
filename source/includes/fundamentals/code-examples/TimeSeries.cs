using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Driver;

public class TimeSeries
{
    // Replace with your connection string
    private const string MongoConnectionString = "<YOUR_CONNECTION_STRING>";

    public static void Main(string[] args)
    {   
        var mongoClient = new MongoClient(MongoConnectionString);
        
        // begin-time-series
        var database = mongoClient.GetDatabase("fall_weather");
        var tsOptions = new TimeSeriesOptions("temperature");

        // Creates a time series collection that stores "temperature" values over time
        var collOptions = new CreateCollectionOptions { TimeSeriesOptions = tsOptions };
        database.CreateCollection("september2021", collOptions);
        // end-time-series
        
        // begin-run-command
        var commandResult = database.RunCommand<BsonDocument>(new BsonDocument("listCollections", 1 ));
        Console.WriteLine(commandResult.ToJson());
        // end-run-command
    }

}