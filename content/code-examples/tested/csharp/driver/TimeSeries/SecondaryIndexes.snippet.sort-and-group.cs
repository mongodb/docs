var pipeline = new EmptyPipelineDefinition<BsonDocument>()
    .Sort(new BsonDocument
    {
        { "metadata.sensorId", 1 },
        { "timestamp", -1 }
    })
    .Group(new BsonDocument
    {
        { "_id", "$metadata.sensorId" },
        { "ts", new BsonDocument("$first", "$timestamp") },
        { "temperatureF", new BsonDocument("$first", "$currentConditions.tempF") }
    });

var result = _collection?.Aggregate(pipeline).ToList();
