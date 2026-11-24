db.movies.aggregate( [ { $collStats: { storageStats: { } } } ] )
