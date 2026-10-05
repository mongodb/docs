// :snippet-start: expression-example
db.movies.aggregate( [
   { $match: { title: "The Godfather" } },
   { $project: {
        _id: 0,
        title: 1,
        combinedMovieInfo: { $concatArrays: [ "$genres", "$writers" ] }
   } }
] )
// :snippet-end:
