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
