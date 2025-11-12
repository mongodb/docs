using MongoDB.Bson;
using MongoDB.Driver;

namespace Examples.TimeSeries;

public abstract class CreateAndPopulateTimeSeriesCollection
{
    private static readonly string uri = DotNetEnv.Env.GetString("CONNECTION_STRING",
        "Env variable not found. Verify you have a .env file with a valid connection string.");

    public static void CreateTimeSeriesCollection()
    {
        // :snippet-start: create-timeseries-collection-options
        var timeSeriesOptions = new TimeSeriesOptions(
            timeField: "timestamp", // Required: The field containing the date/time
            metaField: "sensorId", // Optional: The field containing metadata
            granularity: TimeSeriesGranularity.Hours // or 'seconds' | 'minutes' | 'hours'
        );
        // :snippet-end:

        // :snippet-start: set-createCollectionOptions
        // Define CreateCollectionOptions with TimeSeriesOptions
        var createCollectionOptions = new CreateCollectionOptions
        {
            TimeSeriesOptions = timeSeriesOptions,
            ExpireAfter = TimeSpan.FromHours(24) // Optional: Expire documents after a specified time period.
        };
        // :snippet-end:

        var client = new MongoClient(uri);
        // :snippet-start: create-timeseries-collection
        var database = client.GetDatabase("timeseries");
        database.CreateCollection("weather", createCollectionOptions);
        // :snippet-end:

        Console.WriteLine("TimeSeries collection created successfully.");
        PopulateTimeSeriesCollection();

    }

    private static void PopulateTimeSeriesCollection()
    {
        // :snippet-start: timeseries-insert-many
        // :uncomment-start:
        //var uri = "<connection string>";
        // :uncomment-end:
        var client = new MongoClient(uri);
        var database = client.GetDatabase("timeseries");
        var collection = database.GetCollection<SensorReading>("weather");

        var sampleDocuments = new List<SensorReading>()
        {
            new SensorReading(
                new Sensor(5578, "temperature"),
                temp: 45.2,
                timestamp: new DateTime(2021, 11, 18, 0, 0, 0, 0)),
            new SensorReading(
                new Sensor(5578, "temperature"),
                47.3,
                new DateTime(2021, 11, 18, 6, 0, 0, 0)),
            new SensorReading(
                new Sensor(5578, "temperature"),
                48.8,
                new DateTime(2021, 11, 18, 18, 0, 0, 0)),
            new SensorReading(
                new Sensor(5578, "temperature"),
                43.3,
                new DateTime(2021, 11, 19, 0, 0, 0, 0)),
            new SensorReading(
                new Sensor(5578, "temperature"),
                47.2,
                new DateTime(2021, 11, 19, 6, 0, 0, 0)),
            new SensorReading(
                new Sensor(5578, "temperature"),
                51.5,
                new DateTime(2021, 11, 19, 12, 0, 0, 0)),
            new SensorReading(
                new Sensor(5578, "temperature"),
                48.2,
                new DateTime(2021, 11, 19, 18, 0, 0, 0)),
        };

        try
        {
            collection.InsertMany(sampleDocuments);
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
        }
        // :snippet-end:

    }
}