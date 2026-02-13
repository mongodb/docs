var hintOptions = new AggregateOptions
{
    Hint = new BsonDocument
    {
        { "metadata.sensorId", 1 },
        { "timestamp", -1 }
    }
};
var hintResult = _collection?.Aggregate(pipeline, hintOptions).ToList();
