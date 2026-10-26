// :snippet-start: cumulative-runtime-for-rating
db.movies.aggregate( [
   { $match: { metacritic: { $gt: 85 }, year: { $gte: 1993, $lte: 1995 } } },
   { $project: { _id: 0, title: 1, rated: 1, released: 1, runtime: 1 } },
   {
      $setWindowFields: {
         partitionBy: "$rated",
         sortBy: { released: 1 },
         output: {
            cumulativeRuntimeForRating: {
               $sum: "$runtime",
               window: {
                  documents: [ "unbounded", "current" ]
               }
            }
         }
      }
   }
] )
// :snippet-end:
