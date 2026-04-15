var result = moviesCollection.Aggregate()
    .Search(Builders<Movie>.Search.Wildcard(m => m.Title, "Amer*", allowAnalyzedField: true))
    .ToList();
