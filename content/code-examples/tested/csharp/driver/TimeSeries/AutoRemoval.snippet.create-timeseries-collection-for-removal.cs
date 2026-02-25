var createCommand = new BsonDocument
{
    { "create", "weather24h" },
    { "timeseries", new BsonDocument
        {
            { "timeField", "timestamp" },
            { "metaField", "sensorId" },
            { "granularity", "seconds" }
        }
    },
    { "expireAfterSeconds", 86400 }
};

// Execute the command to create the collection  
await database.RunCommandAsync<BsonDocument>(createCommand);
