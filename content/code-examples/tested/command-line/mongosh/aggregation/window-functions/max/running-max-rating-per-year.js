db.movies.aggregate( [
   {
      $match: {
         year: { $in: [ 1999, 2000 ] },
         "imdb.rating": { $gte: 8.5 }
      }
   },
   {
      $setWindowFields: {
         partitionBy: "$year",
         sortBy: { "imdb.rating": 1 },
         output: {
            highestRatingInYear: {
               $max: "$imdb.rating",
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
         highestRatingInYear: 1
      }
   },
   { $sort: { year: 1, "imdb.rating": 1 } }
] )
