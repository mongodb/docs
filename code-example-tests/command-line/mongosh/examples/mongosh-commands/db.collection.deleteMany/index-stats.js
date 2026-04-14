// :snippet-start: index-stats
db.movies.aggregate( [ { $indexStats: { } }, { $sort: { name: 1 } } ] )
// :snippet-end:
