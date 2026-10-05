db.movies.aggregate( [
   {
      $match: { directors: "Christopher Nolan" }
   },
   {
      $setWindowFields: {
         sortBy: { year: 1 },
         output: {
            genresSoFar: {
               $setUnion: "$genres",
               window: { documents: [ "unbounded", "current" ] }
            }
         }
      }
   },
   {
      $project: {
         _id: 0,
         title: 1,
         year: 1,
         genres: 1,
         genresSoFar: 1
      }
   }
] )
