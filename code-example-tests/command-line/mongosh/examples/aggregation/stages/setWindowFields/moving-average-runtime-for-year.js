// :snippet-start: moving-average-runtime-for-year
db.movies.aggregate( [
   { $match: { metacritic: { $gt: 85 }, year: { $gte: 1993, $lte: 1995 } } },
   { $project: { _id: 0, title: 1, released: 1, runtime: 1 } },
   {
      $setWindowFields: {
         partitionBy: { $year: "$released" },
         sortBy: { released: 1 },
         output: {
            averageRuntime: {
               $avg: "$runtime",
               window: {
                  documents: [ -1, 0 ]
               }
            }
         }
      }
   }
] )
// :snippet-end:
