// :snippet-start: array-sort-desc
// Descending sort
db.movies.aggregate( [
   {
      $match: {
         title: { $in: [
            "The Comancheros", "The Son of the Sheik"
         ] }
      }
   },
   {
      $sort: { genres: -1 }
   }
] )
// :snippet-end:
