var pipeline = new EmptyPipelineDefinition<Movie>()
    .Match(Builders<Movie>.Filter.Eq(m => m.Title, "The Godfather"))
    .Set(Builders<Movie>.SetFields.Set(m => m.Rated, "UNRATED"));
