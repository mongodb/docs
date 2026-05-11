// :snippet-start: idx-variable
db.movies.aggregate( [
   {
      $match: { runtime: { $gt: 1000 } }
   },
   {
      $project: {
         _id: 0,
         title: 1,
         rankedGenres: {
            $map: {
               input: "$genres",
               as: "genre",
               in: {
                  genre: "$$genre",
                  rank: { $add: [ "$$IDX", 1 ] },
                  isPrimary: { $eq: [ "$$IDX", 0 ] }
               }
            }
         }
      }
   },
   { $sort: { title: 1 } }
] )
// :snippet-end:
