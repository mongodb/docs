// :snippet-start: push-window-example
db.movies.aggregate( [
   {
      $match: {
         year: 2002,
         genres: { $exists: true, $ne: [] }
      }
   },
   {
      $addFields: {
         primaryGenre: { $first: "$genres" }
      }
   },
   {
      $setWindowFields: {
         sortBy: { title: 1 },
         output: {
            genresSeenSoFar: {
               $push: "$primaryGenre",
               window: {
                  documents: [ "unbounded", "current" ]
               }
            }
         }
      }
   },
   {
      $project: {
         _id: 0,
         genresSeenSoFar: "$genresSeenSoFar",
         year: "$year",
         title: "$title",
         genre: "$primaryGenre",
         totalGenreCount: { $size: "$genresSeenSoFar" }
      }
   },
   {
      $limit: 8
   }
] )
// :snippet-end:
