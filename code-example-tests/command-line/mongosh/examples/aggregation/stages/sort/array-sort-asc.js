// :snippet-start: array-sort-asc
// Ascending sort
db.movies.aggregate( [
   {
      $match: {
         title: { $in: [
            "The Comancheros", "The Son of the Sheik"
         ] }
      }
   },
   {
      $sort: { genres: 1 }
   }
] )
// :snippet-end:
