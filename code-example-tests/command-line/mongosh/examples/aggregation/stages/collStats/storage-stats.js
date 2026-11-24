// :snippet-start: storage-stats
db.movies.aggregate( [ { $collStats: { storageStats: { } } } ] )
// :snippet-end:
