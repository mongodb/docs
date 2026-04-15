var result = moviesCollection.Aggregate()
    .Search(Builders<Movie>.Search.Exists(m => m.Imdb.Rating))
    .ToList();
