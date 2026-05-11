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
               arrayIndexAs: "myIndex",
               in: {
                  genre: "$$genre",
                  rank: { $add: [ "$$myIndex", 1 ] },
                  isPrimary: { $eq: [ "$$myIndex", 0 ] }
               }
            }
         }
      }
   },
   { $sort: { title: 1 } }
] )
