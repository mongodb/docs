using MongoDB.Bson;
using MongoDB.Driver;

namespace Examples.TimeSeries;

public class MigrateWithAggregationTimeSeriesCollection
{
    private static readonly string Uri = DotNetEnv.Env.GetString("CONNECTION_STRING",
        "Env variable not found. Verify you have a .env file with a valid connection string.");

    public async Task LoadSampleData()
    {
        var client = new MongoClient(Uri);
        var database = client.GetDatabase("mydatabase");
        var collection = database.GetCollection<BsonDocument>("weather_data");
        // :snippet-start: add-sample-data
        var sampleDocument = new BsonDocument("_id", new ObjectId("5553a998e4b02cf7151190b8"))
            .Add("st", "x+47600-047900")
            .Add("ts", new BsonDateTime(new DateTime(1984, 3, 5, 13, 0, 0, DateTimeKind.Utc)))
            .Add("position", new BsonDocument("type", "Point")
                .Add("coordinates", new BsonArray { -47.9, 47.6 }))
            .Add("elevation", 9999)
            .Add("callLetters", "VCSZ")
            .Add("qualityControlProcess", "V020")
            .Add("dataSource", "4")
            .Add("type", "FM-13")
            .Add("airTemperature", new BsonDocument("value", -3.1).Add("quality", "1"))
            .Add("dewPoint", new BsonDocument("value", 999.9).Add("quality", "9"))
            .Add("pressure", new BsonDocument("value", 1015.3).Add("quality", "1"))
            .Add("wind", new BsonDocument("direction",
                    new BsonDocument("angle", 999)
                        .Add("quality", "9"))
                .Add("type", "9")
                .Add("speed", new BsonDocument("rate", 999.9).Add("quality", "9")))
            .Add("visibility", new BsonDocument("distance", new BsonDocument("value", 999999).Add("quality", "9"))
                .Add("variability", new BsonDocument("value", "N").Add("quality", "9")))
            .Add("skyCondition", new BsonDocument("ceilingHeight", new BsonDocument("value", 99999)
                    .Add("quality", "9").Add("determination", "9"))
                .Add("cavok", "N"))
            .Add("sections", new BsonArray { "AG1" })
            .Add("precipitationEstimatedObservation", new BsonDocument("discrepancy", "2")
                .Add("estimatedWaterDepth", 999));

        await collection.InsertOneAsync(sampleDocument);
        // :snippet-end:
    }

    public List<BsonDocument> CreateMetadataField()
    {
        var newCollectionName = "weather_new";
        var client = new MongoClient(Uri);
        var database = client.GetDatabase("mydatabase");
        var collection = database.GetCollection<BsonDocument>("weather_data");

        var check = database.GetCollection<BsonDocument>(newCollectionName);
        if (check != null) database.DropCollection(newCollectionName);

        // :snippet-start: create-timeseries-simple
        // :replace-start: {
        //	  "terms": {
        //	    "newCollectionName": "weather_new"
        //	  }
        //	}
        var timeSeriesOptions = new TimeSeriesOptions(
            timeField: "ts",
            metaField: "metaData",
            granularity: TimeSeriesGranularity.Seconds
        );

        database.CreateCollection(newCollectionName,
            new CreateCollectionOptions { TimeSeriesOptions = timeSeriesOptions });
        // :replace-end:
        // :snippet-end:

        // :snippet-start: complete-agg-example
        // :replace-start: {
        //	  "terms": {
        //	    "newCollectionName": "weather_new"
        //	  }
        //	}
        // :snippet-start: add-meta-field
        var pipeline = new BsonDocument[]
        {
            new BsonDocument("$set", new BsonDocument("metaData", new BsonDocument
            {
                { "st", "$st" },
                { "position", "$position" },
                { "elevation", "$elevation" },
                { "callLetters", "$callLetters" },
                { "qualityControlProcess", "$qualityControlProcess" },
                { "type", "$type" }
            })),
            new BsonDocument("$project", new BsonDocument
            {
                { "_id", 0 },
                { "ts", 1 },
                { "metaData", 1 },
                { "dataSource", 1 },
                { "airTemperature", 1 },
                { "dewPoint", 1 },
                { "pressure", 1 },
                { "wind", 1 },
                { "visibility", 1 },
                { "skyCondition", 1 },
                { "sections", 1 },
                { "precipitationEstimatedObservation", 1 }
            })
        };
        // :snippet-end:
        // :snippet-start: add-out-stage
        var outPipeline = new BsonDocument("$out", new BsonDocument
        {
            { "db", "mydatabase" },
            { "coll", newCollectionName },
            {
                "timeseries", new BsonDocument
                {
                    { "timeField", "ts" }, // Field representing the time data  
                    { "metaField", "metaData" }, // Field containing meta information  
                    { "granularity", "seconds" } // Granularity (or "seconds", "minutes", etc.)  
                }
            }
        });
        collection.Aggregate<BsonDocument>(pipeline.Concat(new[] { outPipeline }).ToArray());
        // :snippet-end:
        // :replace-end:
        // :snippet-end:

        // :snippet-start: query-new-ts-collection
        //	:replace-start: {
        //	  "terms": {
        //	    "newCollectionName": "weather_new"
        //	  }
        //	}
        var newCollection = database.GetCollection<BsonDocument>(newCollectionName);
        var result = newCollection.Find(_ => true).ToList();
        return result;
        // :replace-end:
        // :snippet-end:
    }

    public async Task<List<BsonDocument>> TimeSeriesAggregate()
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
