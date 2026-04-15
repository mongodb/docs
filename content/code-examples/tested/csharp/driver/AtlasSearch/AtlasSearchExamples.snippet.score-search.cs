var regex = "[A-Za-z]{6}";

var result = moviesCollection.Aggregate()
    .Search(Builders<Movie>.Search.Regex(m => m.Title, regex, allowAnalyzedField: true), indexName: "moviescore")
    .Project<Movie>(Builders<Movie>.Projection
    .Include(m => m.Id)
    .Include(m => m.Title)
    .Include(m => m.Plot)
    .MetaSearchScore(m => m.Score))
    .ToList();
