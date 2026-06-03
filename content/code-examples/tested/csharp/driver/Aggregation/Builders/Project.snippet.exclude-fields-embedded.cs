var pipeline = new EmptyPipelineDefinition<Movie>()
    .Project(
        Builders<Movie>.Projection
            .Exclude("Imdb.id")
            .Exclude(m => m.Type)
    );
