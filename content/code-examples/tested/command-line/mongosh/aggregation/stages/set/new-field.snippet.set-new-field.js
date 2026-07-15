db.movies.aggregate( [
   { $match: { runtime: { $gt: 1000 } } },
   {
      $set: {
         titleWithYear: {
            $concat: [
               "$title",
               " (",
               { $toString: "$year" },
               ")"
            ]
         }
      }
   }
] )
