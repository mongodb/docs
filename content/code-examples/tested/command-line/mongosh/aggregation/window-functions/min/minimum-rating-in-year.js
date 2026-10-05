db.movies.aggregate( [
   {
      $match: {
         year: { $in: [ 1999, 2000, 2001 ] },
         "imdb.rating": { $lte: 3.5 }
      }
   },
   {
      $setWindowFields: {
         partitionBy: "$year",
         sortBy: { title: 1 },
         output: {
            minimumRatingInYear: {
               $min: "$imdb.rating",
               window: {
                  documents: [ "unbounded", "unbounded" ]
               }
            },
            rankInYear: {
               $documentNumber: {}
            }
         }
      }
   },
   {
      $project: {
         _id: 0,
         title: 1,
         year: 1,
         imdb: { rating: "$imdb.rating" },
         minimumRatingInYear: 1,
         rankInYear: 1
      }
   },
   { $sort: { year: 1, title: 1 } }
] )
