var stage = new BsonDocument
{
    { "crew", new BsonArray { "$directors", "$writers", "$makeupArtists" } }
};

var pipeline = new EmptyPipelineDefinition<Movie>()
    .Project(stage);
