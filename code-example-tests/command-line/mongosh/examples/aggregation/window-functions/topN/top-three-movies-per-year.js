db.movies.aggregate( [
   {
      $match: {
         year: { $in: [ 1999, 2001 ] },
         "imdb.rating": { $gte: 8.5 }
      }
   },
   {
      $setWindowFields: {
         partitionBy: "$year",
         output: {
            topThreeRatedInYear: {
               $topN: {
                  sortBy: { "imdb.rating": -1, title: 1 },
                  output: { rating: "$imdb.rating", title: "$title" },
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
         topThreeRatedInYear: 1
      }
   },
   {
      $sort: { year: 1, "imdb.rating": -1 }
   }
] )
