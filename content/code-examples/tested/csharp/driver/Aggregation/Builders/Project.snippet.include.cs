var pipeline = new EmptyPipelineDefinition<Movie>()
    .Project(
        Builders<Movie>.Projection
            .Include(m => m.Title)
            .Include(m => m.Plot)
    );
