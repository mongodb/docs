// :snippet-start: query-narrower-range
db.movies.find( { year: { $gt: 2010 } } ).explain("executionStats")
// :snippet-end: