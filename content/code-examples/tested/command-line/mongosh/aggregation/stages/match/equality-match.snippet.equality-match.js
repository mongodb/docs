db.movies.aggregate(
    [ { $match : { rated : "TV-PG", runtime : { $gt: 1000 } } } ]
)
