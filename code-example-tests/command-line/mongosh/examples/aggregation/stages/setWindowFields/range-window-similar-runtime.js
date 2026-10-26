// :snippet-start: range-window-similar-runtime
db.movies.aggregate( [
   { $match: { metacritic: { $gt: 85 }, year: { $gte: 1993, $lte: 1995 } } },
   { $project: { _id: 0, title: 1, rated: 1, runtime: 1 } },
   {
      $setWindowFields: {
         partitionBy: "$rated",
         sortBy: { runtime: 1 },
         output: {
            runtimeFromSimilarMovies: {
               $sum: "$runtime",
               window: {
                  range: [ -10, 10 ]
               }
            }
         }
      }
   }
] )
// :snippet-end:
