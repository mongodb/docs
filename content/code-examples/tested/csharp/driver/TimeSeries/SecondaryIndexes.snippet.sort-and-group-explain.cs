var renderedPipeline = pipeline.Render(new RenderArgs<BsonDocument>(
    BsonDocumentSerializer.Instance, BsonSerializer.SerializerRegistry));

var explainCommand = new BsonDocument
{
    {
        "explain", new BsonDocument
        {
            { "aggregate", collectionName },
            { "pipeline", new BsonArray(renderedPipeline.Documents) },
            { "cursor", new BsonDocument() }
        }
    },
    { "verbosity", "executionStats" }
};

var explainResult = _database?.RunCommand<BsonDocument>(explainCommand);
