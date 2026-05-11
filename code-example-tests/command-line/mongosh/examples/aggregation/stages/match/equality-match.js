// :snippet-start: equality-match
db.movies.aggregate(
    [ { $match : { rated : "TV-PG", runtime : { $gt: 1000 } } } ]
)
// :snippet-end:
