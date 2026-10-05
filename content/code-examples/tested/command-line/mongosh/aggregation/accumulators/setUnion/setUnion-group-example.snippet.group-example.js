db.movies.aggregate( [
   {
      $unwind: "$directors"
   },
   {
      $match: {
         directors: {
            $in: [ "Christopher Nolan", "Sofia Coppola", "Spike Lee" ]
         }
      }
   },
   {
      $group: {
         _id: "$directors",
         movieCount: { $sum: 1 },
         genres: { $setUnion: "$genres" }
      }
   },
   {
      $sort: { _id: 1 }
   }
] )
