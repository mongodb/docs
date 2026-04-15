var result = moviesCollection.Aggregate()
    .Search(Builders<Movie>.Search.Near(m => m.Imdb.Rating, 8.5, 1))
    .ToList();
