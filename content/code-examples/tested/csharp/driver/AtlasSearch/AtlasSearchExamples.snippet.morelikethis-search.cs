var searchDocument = new MovieSearch()
{
    Plot = "time travel",
};

var result = moviesCollection.Aggregate()
    .Search(Builders<Movie>.Search.MoreLikeThis(searchDocument))
    .ToList();
