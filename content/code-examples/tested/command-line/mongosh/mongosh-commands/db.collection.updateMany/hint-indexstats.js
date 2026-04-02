db.movies.aggregate( [ { $indexStats: { } }, { $sort: { name: 1 } }, { $match: {key: { rated: 1 } } } ] )
