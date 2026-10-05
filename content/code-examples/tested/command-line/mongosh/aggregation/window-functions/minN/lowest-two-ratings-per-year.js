db.movies.aggregate( [
   {
      $match: {
         year: { $in: [ 1999, 2001 ] },
         "imdb.rating": { $lte: 3.8, $gt: 0 }
      }
   },
   {
      $setWindowFields: {
         partitionBy: "$year",
         output: {
            lowestTwoRatingsInYear: {
               $minN: { input: "$imdb.rating", n: 2 },
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
         lowestTwoRatingsInYear: 1
      }
   },
   { $sort: { year: 1, "imdb.rating": 1 } }
] )
