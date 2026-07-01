// :snippet-start: set-new-field
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
// :snippet-end:
