var result = moviesCollection.Aggregate()
    .Search(Builders<Movie>.Search.Text(
        Builders<Movie>.SearchPath.Analyzer(m => m.Title, "lucene"),
        "gravity"), indexName: "moviesanalyzer")
    .ToList();
