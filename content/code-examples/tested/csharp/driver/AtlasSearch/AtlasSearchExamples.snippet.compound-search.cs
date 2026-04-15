var result = moviesCollection.Aggregate()
    .Search(Builders<Movie>.Search.Compound()
        .Must(Builders<Movie>.Search.Exists(m => m.Imdb.Rating))
        .MustNot(Builders<Movie>.Search.Equals(m => m.Rated, "G"))
        .Must(Builders<Movie>.Search.Range(m => m.Year, SearchRangeBuilder.Gt(2000))))
    .ToList();
