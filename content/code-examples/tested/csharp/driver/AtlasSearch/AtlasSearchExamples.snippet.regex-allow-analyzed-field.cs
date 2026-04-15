var result = moviesCollection.Aggregate()
    .Search(Builders<Movie>.Search.Regex(m => m.Title, regex,
        allowAnalyzedField: true))
    .ToList();
