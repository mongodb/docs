// :snippet-start: out-same-db
db.movies.aggregate( [
    { $match : { runtime : { $gt : 1000 } } },
    { $group : { _id : "$year", movies: { $push: "$title" } } },
    { $out : "movies_by_year" }
] )
// :snippet-end:
