var result = moviesCollection.Aggregate()
     .Search(Builders<Movie>.Search
     .Range(m => m.Title, SearchRangeV2Builder.Gte("A").Lte("G")))
     .ToList();
