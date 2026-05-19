var filter = Builders<Movie>.Search.Text(m => m.Title, "future");
var projection = Builders<Movie>.Projection
    .Include(m => m.Title)
    .Include(m => m.Plot)
    .MetaScore(m => m.Score);

var result = moviesCollection.Aggregate()
    .Search(filter)
    .Project<Movie>(projection)
    .Limit(1)
    .ToList();
