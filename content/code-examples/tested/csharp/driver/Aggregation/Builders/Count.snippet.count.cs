var pipeline = new EmptyPipelineDefinition<Movie>()
    .Match(Builders<Movie>.Filter.Eq(m => m.Metacritic, 100))
    .Count();
