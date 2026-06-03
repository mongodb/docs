var pipeline = new EmptyPipelineDefinition<Movie>()
    .Match(m => m.Title == "The Godfather");
