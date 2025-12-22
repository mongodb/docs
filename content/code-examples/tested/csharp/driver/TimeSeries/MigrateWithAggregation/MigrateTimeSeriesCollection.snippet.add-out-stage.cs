var outPipeline = new BsonDocument("$out", new BsonDocument
{
    { "db", "mydatabase" },
    { "coll", weather_new },
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
