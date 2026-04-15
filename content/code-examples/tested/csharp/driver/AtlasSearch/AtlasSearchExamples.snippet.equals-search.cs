var result = moviesCollection.Aggregate()
    .Search(Builders<Movie>.Search.Equals(m => m.Year, 2000))
    .ToList();
