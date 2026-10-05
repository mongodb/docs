db.movies.aggregate( [
   {
      $match: {
         year: { $in: [ 1999, 2000, 2001 ] },
         "imdb.rating": { $lte: 3.5, $gt: 0 }
      }
   },
   {
      $setWindowFields: {
         partitionBy: "$year",
         sortBy: { "imdb.rating": -1, "title": 1 },
         output: {
            lowestRatedMovieInYear: {
               $last: "$title",
               window: {
                  documents: [ "unbounded", "unbounded" ]
               }
            }
         }
      }
   },
   {
      $project: {
         _id: 0,
         title: 1,
         year: 1,
         "imdb.rating": 1,
         lowestRatedMovieInYear: 1
      }
   },
   { $sort: { year: 1, "imdb.rating": -1, title: 1 } }
] )
