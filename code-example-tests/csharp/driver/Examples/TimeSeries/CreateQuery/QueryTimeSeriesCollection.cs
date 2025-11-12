using MongoDB.Bson;
using MongoDB.Driver;

namespace Examples.TimeSeries;

public class QueryTimeSeriesCollection
{
    private static readonly string Uri = DotNetEnv.Env.GetString("CONNECTION_STRING",
        "Env variable not found. Verify you have a .env file with a valid connection string.");

    public static async Task<List<BsonDocument>> TimeSeriesFindOne()
    {
        var client = new MongoClient(Uri);
        var database = client.GetDatabase("timeseries");
        var collection = database.GetCollection<SensorReading>("weather");
        // :snippet-start: timeseries-find-one
        var query =
            Builders<SensorReading>.Filter.Where
                (s => s.Timestamp == new DateTime(2021, 11, 19, 0, 0, 0, 0));

        var projection = Builders<SensorReading>.Projection
            .Exclude(s => s.Id); // Exclude the _id field

        var result = await collection.Find(query).Project(projection).ToListAsync();
        // :snippet-end:
        return result;
    }
    public static async Task<List<BsonDocument>> TimeSeriesFindBySubfield()
    {
        // :snippet-start: timeseries-find-one-by-subfield
        var query =
            Builders<SensorReading>.Filter.Where
                (s => s.Sensor.SensorId == 5578);

        var projection = Builders<SensorReading>.Projection
            .Exclude(s => s.Id); // Exclude the _id field

        var client = new MongoClient(Uri);
        var database = client.GetDatabase("timeseries");
        var collection = database.GetCollection<SensorReading>("weather");
        var result = await
            collection.Find(query).Project(projection).ToListAsync();
        return result;
        // :snippet-end:
    }

    public static async Task<List<BsonDocument>> TimeSeriesFindByTimeRange()
    {
        // :snippet-start: timeseries-find-time-range
        var startTime = new DateTime(2021, 11, 18, 0, 0, 0, 0);
        var endTime = new DateTime(2021, 11, 19, 0, 0, 0, 0);

        var query =
            Builders<SensorReading>.Filter.Where
                (s => s.Timestamp >= startTime && s.Timestamp <= endTime);

        var projection = Builders<SensorReading>.Projection
            .Exclude(s => s.Id); // Exclude the _id field

        var client = new MongoClient(Uri);
        var database = client.GetDatabase("timeseries");
        var collection = database.GetCollection<SensorReading>("weather");

        var result = await
            collection.Find(query).Project(projection).ToListAsync();
        return result;
        // :snippet-end:
    }
    public static async Task<List<BsonDocument>> TimeSeriesAggregate()
    {
        // :snippet-start: timeseries-aggregate

        var pipeline = new BsonDocument[]
        {
            new("$match",
                new BsonDocument("sensor.sensor_id", 5578)),
            new("$group",
                new BsonDocument
                {
                    {
                        "_id",
                        new BsonDocument("date",
                            new BsonDocument("$dateTrunc",
                                new BsonDocument
                                {
                                    { "date", "$time" },
                                    { "unit", "day" }
                                }))
                    },
                    {
                        "avgTemp", new BsonDocument("$avg", "$temp")
                    }
                }),
            new("$sort", new BsonDocument("avgTemp", -1))
        };

        var pipelineDefinition = PipelineDefinition<SensorReading, BsonDocument>.Create(pipeline);

        var client = new MongoClient(Uri);
        var database = client.GetDatabase("timeseries");
        var collection = database.GetCollection<SensorReading>("weather");

        var result = await collection.Aggregate(pipelineDefinition).ToListAsync();
        // :snippet-end:
        return result;
    }
}

