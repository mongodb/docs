var result = moviesCollection.Aggregate()
    .Search(Builders<Movie>.Search.Autocomplete(m => m.Title, "Gravity"), indexName: "movietitles")
    .ToList();
