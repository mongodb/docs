var projection = Builders<Movie>.Projection
    .Include(x => x.Title)
    .MetaSearchSequenceToken(x => x.PaginationToken);

var searchDefinition = Builders<Movie>.Search.Text(m => m.Plot, "time travel");
var searchOptions = new SearchOptions<Movie>
{ IndexName = "default", Sort = Builders<Movie>.Sort.Ascending(m => m.Id) };

// Runs the base search operation
var baseSearchResults = moviesCollection.Aggregate()
    .Search(searchDefinition, searchOptions)
    .Project<Movie>(projection)
    .ToList();

if (baseSearchResults.Count == 0)
    return baseSearchResults;

// Sets the starting point for the next search
searchOptions.SearchAfter = baseSearchResults[0].PaginationToken;

var result = moviesCollection.Aggregate()
    .Search(searchDefinition, searchOptions)
    .Project<Movie>(projection)
    .ToList();
