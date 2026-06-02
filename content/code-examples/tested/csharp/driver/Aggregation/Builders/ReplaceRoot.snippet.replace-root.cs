var pipeline = new EmptyPipelineDefinition<Movie>()
    .Match(Builders<Movie>.Filter.Exists(m => m.Imdb))
    .Sort(Builders<Movie>.Sort.Ascending(m => m.Title))
    .Limit(5)
    .ReplaceRoot(m => m.Imdb);
