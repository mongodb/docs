var matchStage = Builders<BsonDocument>.Filter.Gte("timestamp",
    new DateTime(2022, 1, 15, 0, 0, 0, DateTimeKind.Utc));

var pipeline = new EmptyPipelineDefinition<BsonDocument>()
    .Match(matchStage)
    .Sort(new BsonDocument("timestamp", 1));

var result = _collection?.Aggregate(pipeline).ToList();
