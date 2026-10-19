// :snippet-start: query-wider-range
db.movies.find( { year: { $gt: 1990 } } ).explain("executionStats")
// :snippet-end: