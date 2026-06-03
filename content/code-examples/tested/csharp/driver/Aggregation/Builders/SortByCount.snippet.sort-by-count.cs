var pipeline = new EmptyPipelineDefinition<Movie>()
    .SortByCount(m => m.Rated);
