var changeStreamOptions = new ChangeStreamStageOptions()
{
    FullDocument = ChangeStreamFullDocumentOption.Default,
    StartAtOperationTime = new BsonTimestamp(300),
};

var pipeline = new EmptyPipelineDefinition<Movie>()
    .ChangeStream(changeStreamOptions);
