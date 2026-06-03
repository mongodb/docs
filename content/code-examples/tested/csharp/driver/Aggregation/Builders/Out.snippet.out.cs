var outCollection = _client
    .GetDatabase("sample_mflix")
    .GetCollection<Movie>("top_movies");

var pipeline = new EmptyPipelineDefinition<Movie>()
    .Match(Builders<Movie>.Filter.Eq(m => m.Metacritic, 100))
    .Sort(Builders<Movie>.Sort.Ascending(m => m.Title))
    .Out(outCollection);
