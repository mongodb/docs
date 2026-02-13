// Indexes on ``timeField`` descending are more performant because they 
// enable ``DISTINCT_SCAN`` optimizations.
var indexes = new List<CreateIndexModel<BsonDocument>>
{
    new CreateIndexModel<BsonDocument>(
        Builders<BsonDocument>.IndexKeys
            .Ascending("metadata.sensorId")
            .Ascending("timestamp")),
    new CreateIndexModel<BsonDocument>(
        Builders<BsonDocument>.IndexKeys
            .Ascending("metadata.sensorId")
            .Descending("timestamp")),
    new CreateIndexModel<BsonDocument>(
        Builders<BsonDocument>.IndexKeys
            .Descending("metadata.sensorId")
            .Ascending("timestamp")),
    new CreateIndexModel<BsonDocument>(
        Builders<BsonDocument>.IndexKeys
            .Descending("metadata.sensorId")
            .Descending("timestamp"))
};
