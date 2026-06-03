var stage = new BsonDocument
{
    { "title", 1 },
    { "imdb.id", 1 },
    { "imdb.rating", 1 },
    {
        "imdb.votes", new BsonDocument("$cond", new BsonDocument
        {
            { "if", new BsonDocument("$eq", new BsonArray { "", "$imdb.votes" }) },
            { "then", "$$REMOVE" },
            { "else", "$imdb.votes" }
        })
    }
};

var pipeline = new EmptyPipelineDefinition<Movie>()
    .Project(stage);
