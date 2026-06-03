var pipeline = new EmptyPipelineDefinition<Movie>()
    .Sort(Builders<Movie>.Sort
        .Ascending(m => m.Title)
        .Ascending(m => m.Id))
    .Skip(5)
    .Limit(5);
