db.movies.aggregate( [
   {
      $match: {
         genres: "Musical",
         year: { $in: [ 2009, 2010 ] },
         "imdb.rating": { $type: "double" },
         "imdb.votes": { $gt: 0 }
      }
   },
   {
      $setWindowFields: {
         partitionBy: "$year",
         sortBy: { title: 1 },
         output: {
            cumulativeVotesInYear: {
               $sum: "$imdb.votes",
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
         "imdb.votes": 1,
         cumulativeVotesInYear: 1,
         rankInYear: 1
      }
   },
   { $sort: { year: 1, title: 1 } }
] )
