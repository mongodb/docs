var result = moviesCollection.Aggregate()
    .Search(Builders<Movie>.Search.Text(
        Builders<Movie>.SearchPath.Wildcard("p*"), "secret agent"))
    .ToList();
