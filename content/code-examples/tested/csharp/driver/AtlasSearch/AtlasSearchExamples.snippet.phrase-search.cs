var result = moviesCollection.Aggregate()
    .Search(Builders<Movie>.Search.Phrase(m => m.Plot, "time travel"))
    .ToList();
