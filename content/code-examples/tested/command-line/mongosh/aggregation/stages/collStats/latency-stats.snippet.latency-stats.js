db.movies.aggregate( [ { $collStats: { latencyStats: { histograms: true } } } ] )
