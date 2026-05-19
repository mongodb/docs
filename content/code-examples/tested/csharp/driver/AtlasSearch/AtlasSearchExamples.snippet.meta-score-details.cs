var filter = Builders<Movie>.Search.Text(m => m.Plot, "future");
var projection = Builders<Movie>.Projection
    .Include(m => m.Title)
    .Include(m => m.Plot)
    .MetaScoreDetails(m => m.ScoreDetails);

var result = moviesCollection.Aggregate()
    .Search(filter, new SearchOptions<Movie> { ScoreDetails = true })
    .Project<Movie>(projection)
    .Limit(1)
    .ToList();
