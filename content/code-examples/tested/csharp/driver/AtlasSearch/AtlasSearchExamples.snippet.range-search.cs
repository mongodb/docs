var result = moviesCollection.Aggregate()
    .Search(Builders<Movie>.Search
    .Range(m => m.Year, SearchRangeBuilder.Gt(2000).Lt(2010)))
    .ToList();
