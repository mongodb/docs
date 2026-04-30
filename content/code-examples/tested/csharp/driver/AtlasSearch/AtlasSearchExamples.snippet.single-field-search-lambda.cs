var result = moviesCollection.Aggregate()
    .Search(Builders<Movie>.Search.Text(
        Builders<Movie>.SearchPath.Single(m => m.Plot), "secret agent"))
    .ToList();
