db.movies.aggregate( [
   {
      $match: {
         year: { $in: [ 1979, 1985, 1992 ] },
         "imdb.rating": { $lte: 4.5, $gt: 0 }
      }
   },
   {
      $setWindowFields: {
         partitionBy: "$year",
         sortBy: { "imdb.rating": -1, "title": 1 },
         output: {
            lowestRatedThreeMoviesInYear: {
               $lastN: {
                  input: "$title",
                  n: 3
               },
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
         lowestRatedThreeMoviesInYear: 1
      }
   },
   {
      $sort: { year: 1, "imdb.rating": -1, "title": 1 }
   }
] )
