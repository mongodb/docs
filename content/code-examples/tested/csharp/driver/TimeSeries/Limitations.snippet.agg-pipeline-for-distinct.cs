var indexModel = new CreateIndexModel<BsonDocument>(
    Builders<BsonDocument>.IndexKeys
        .Ascending("meta.project")
        .Ascending("meta.type"));

_collection?.Indexes.CreateOne(indexModel);

var matchStage = Builders<BsonDocument>.Filter.Eq("meta.project", 10);
var pipeline = new EmptyPipelineDefinition<BsonDocument>()
    .Match(matchStage)
    .Group(new BsonDocument("_id", "$meta.type"));

var result = _collection?.Aggregate(pipeline).ToList();
