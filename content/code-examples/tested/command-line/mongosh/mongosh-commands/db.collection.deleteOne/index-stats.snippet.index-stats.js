db.movies.aggregate( [ { $indexStats: { } }, { $sort: { name: 1 } } ] )
