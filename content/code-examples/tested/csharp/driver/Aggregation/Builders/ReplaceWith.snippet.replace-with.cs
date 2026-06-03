var pipeline = new EmptyPipelineDefinition<Movie>()
    .Sort(Builders<Movie>.Sort.Ascending(m => m.Title))
    .Limit(5)
    .ReplaceWith(m => m.Imdb);
