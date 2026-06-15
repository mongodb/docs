var pipeline = new EmptyPipelineDefinition<Movie>()
    .Project(
        Builders<Movie>
            .Projection
            .Expression(m => new ProjectedMovie
            {
                Id = m.Id,
                Title = m.Title,
                LeadActor = m.Cast![0],
            })
    );
