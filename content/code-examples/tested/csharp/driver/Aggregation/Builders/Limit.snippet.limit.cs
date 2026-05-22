var pipeline = new EmptyPipelineDefinition<Movie>()
    .Sort(Builders<Movie>.Sort.Ascending(m => m.Title))
    .Limit(5);
