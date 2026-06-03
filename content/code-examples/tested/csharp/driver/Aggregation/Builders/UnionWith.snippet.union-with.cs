var pipeline = new EmptyPipelineDefinition<Movie>()
    .Match(Builders<Movie>.Filter.Eq(m => m.Metacritic, 100))
    .UnionWith(
        withCollection: _movies,
        withPipeline: new EmptyPipelineDefinition<Movie>()
            .Match(Builders<Movie>.Filter.Eq(m => m.Metacritic, 100)));
