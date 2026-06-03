var pipeline = new EmptyPipelineDefinition<Movie>()
    .Project(
        Builders<Movie>.Projection
            .Exclude(m => m.Id)
            .Include(m => m.Title)
            .Include(m => m.Plot)
    );
