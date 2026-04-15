var result = moviesCollection.Aggregate()
    .Search(Builders<Movie>.Search.Text(m => m.Plot, "secret agent"))
    .ToList();
