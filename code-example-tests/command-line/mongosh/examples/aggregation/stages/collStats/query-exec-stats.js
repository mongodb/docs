// :snippet-start: query-exec-stats
db.movies.aggregate( [ { $collStats: { queryExecStats: { } } } ] )
// :snippet-end:
