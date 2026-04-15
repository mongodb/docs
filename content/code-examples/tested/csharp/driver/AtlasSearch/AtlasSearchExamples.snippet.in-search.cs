var result = moviesCollection.Aggregate()
    .Search(Builders<Movie>.Search.In(m => m.Genres, new[] { "Action", "Comedy" }))
    .ToList();
