var result = moviesCollection.Aggregate()
    .Search(Builders<Movie>.Search.Phrase(m => m.Plot, new List<string>() { "time travel", "space adventure" }))
    .ToList();
