var pipeline = new EmptyPipelineDefinition<Movie>()
    .Match(Builders<Movie>.Filter.Eq(m => m.Metacritic, 100))
    .Sort(Builders<Movie>.Sort.Combine(
        Builders<Movie>.Sort.Descending(m => m.Year),
        Builders<Movie>.Sort.Ascending(m => m.Title)));
