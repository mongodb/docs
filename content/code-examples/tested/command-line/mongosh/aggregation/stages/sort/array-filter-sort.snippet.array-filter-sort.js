db.movies.aggregate( [
   {
      $match: {
         title: { $in: [
            "The Comancheros", "The Son of the Sheik"
         ] },
         genres: { $in: [ "Drama", "Western" ] }
      }
   },
   {
      $sort: { genres: 1 }
   }
] )
