db.movies.aggregate( [ { $collStats: { count: { } } } ] )
