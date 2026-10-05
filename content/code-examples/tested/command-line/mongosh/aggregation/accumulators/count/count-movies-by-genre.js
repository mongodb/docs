db.movies.aggregate( [
   { $unwind: "$genres" },
   { $match: { genres: { $in: [ "Drama", "Short" ] } } },
   {
      $group: {
         _id: "$genres",
         countNumberOfMoviesForGenre: {
            $count: {}
         }
      }
   },
   { $sort: { _id: 1 } }
] )
