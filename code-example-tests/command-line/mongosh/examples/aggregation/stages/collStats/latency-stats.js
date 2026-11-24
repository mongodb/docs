// :snippet-start: latency-stats
db.movies.aggregate( [ { $collStats: { latencyStats: { histograms: true } } } ] )
// :snippet-end:
