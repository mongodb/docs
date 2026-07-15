// :snippet-start: out-different-db
db.movies.aggregate( [
    { $match : { runtime : { $gt : 1000 } } },
    { $group : { _id : "$year", movies: { $push: "$title" } } },
    { $out : { db: "reporting", coll: "movies_by_year" } }
] )
// :snippet-end:
use( "reporting" )
