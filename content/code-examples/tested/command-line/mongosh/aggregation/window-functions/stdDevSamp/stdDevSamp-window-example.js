db.movies.aggregate( [
   {
      $match: {
         genres: "Musical",
         year: { $in: [ 2009, 2010 ] },
         "imdb.rating": { $type: "double" }
      }
   },
   {
      $setWindowFields: {
         partitionBy: "$year",
         sortBy: { title: 1 },
         output: {
            stdDevSampRatingInYear: {
               $stdDevSamp: "$imdb.rating",
               window: {
                  documents: [ "unbounded", "current" ]
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
         "imdb.rating": 1,
         stdDevSampRatingInYear: 1,
         rankInYear: 1
      }
   },
   { $sort: { year: 1, title: 1 } }
] )
