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
