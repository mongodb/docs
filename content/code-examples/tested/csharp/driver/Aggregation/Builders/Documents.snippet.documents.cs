var documentArray = new[]
{
    new BsonDocument {{ "title", "The Shawshank Redemption" }},
    new BsonDocument {{ "title", "Back to the Future" }},
    new BsonDocument {{ "title", "Jurassic Park" }},
};

var pipeline = new EmptyPipelineDefinition<NoPipelineInput>()
    .Documents(documentArray);
