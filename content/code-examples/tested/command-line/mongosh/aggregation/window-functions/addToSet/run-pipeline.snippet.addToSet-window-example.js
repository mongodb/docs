db.movies.aggregate( [
   {
      $match: {
         year: 2002,
         genres: { $exists: true, $ne: [] }
      }
   },
   {
      $group: {
         _id: { year: "$year", title: "$title", genre: { $first: "$genres" } },
      }
   },
   {
      $setWindowFields: {
         sortBy: { "_id.title": 1 },
         output: {
            genresSeenSoFar: {
               $addToSet: "$_id.genre",
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
         year: "$_id.year",
         title: "$_id.title",
         genre: "$_id.genre",
         genresSeenSoFar: 1,
         uniqueGenreCount: { $size: "$genresSeenSoFar" }
      }
   },
   {
      $limit: 8
   }
] )
