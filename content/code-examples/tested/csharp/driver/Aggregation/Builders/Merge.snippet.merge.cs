var pipeline = new EmptyPipelineDefinition<Movie>()
    .Merge(_targetCollection,
        new MergeStageOptions<Movie>()
        {
            OnFieldNames = new List<string>() { "_id" },
            WhenMatched = MergeStageWhenMatched.Replace,
            WhenNotMatched = MergeStageWhenNotMatched.Insert,
        });
