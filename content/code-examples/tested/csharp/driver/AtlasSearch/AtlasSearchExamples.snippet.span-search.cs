var searchTerms = new[]
{
    Builders<Movie>.SearchSpan.Term(m => m.Plot, "time"),
    Builders<Movie>.SearchSpan.Term(m => m.Plot, "travel")
};

var result = moviesCollection.Aggregate()
    .Search(Builders<Movie>.Search.Span(Builders<Movie>.SearchSpan.Near(searchTerms, 1)))
    .ToList();
