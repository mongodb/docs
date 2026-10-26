db.movies.aggregate( [
   { $match: { metacritic: { $gt: 85 }, year: { $gte: 1993, $lte: 1995 } } },
   { $project: { _id: 0, title: 1, rated: 1, released: 1 } },
   {
      $setWindowFields: {
         partitionBy: "$rated",
         sortBy: { released: 1 },
         output: {
            recentReleases: {
               $push: "$released",
               window: {
                  range: [ "unbounded", -10 ],
                  unit: "month"
               }
            }
         }
      }
   }
] )
