var result = moviesCollection.Aggregate()
    .Search(Builders<Movie>.Search.QueryString(m => m.Plot, "(time OR space) AND NOT comedy"))
    .ToList();
