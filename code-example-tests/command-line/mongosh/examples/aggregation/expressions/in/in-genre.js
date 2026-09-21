// :snippet-start: in-genre
db.movies.aggregate( [
   { $match: { runtime: { $gt: 1000 } } },
   {
      $project:
        {
          _id: 0,
          title: 1,
          hasDrama: { $in: [ "Drama", "$genres" ] }
        }
   }
] )
// :snippet-end:
