db.movies.aggregate( [ { $collStats: { queryExecStats: { } } } ] )
