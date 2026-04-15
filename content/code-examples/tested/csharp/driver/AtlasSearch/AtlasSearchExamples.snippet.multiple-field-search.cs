var result = moviesCollection.Aggregate().Search(
    Builders<Movie>.Search.Phrase(Builders<Movie>.SearchPath
    .Multi(m => m.Plot, m => m.Title), "time travel"), indexName: "moviesmulti")
    .ToList();
