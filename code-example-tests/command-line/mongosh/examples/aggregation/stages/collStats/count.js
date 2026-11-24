// :snippet-start: collection-count
db.movies.aggregate( [ { $collStats: { count: { } } } ] )
// :snippet-end:
