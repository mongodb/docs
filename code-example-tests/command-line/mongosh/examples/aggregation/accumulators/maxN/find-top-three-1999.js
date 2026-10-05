db.movies.aggregate( [
   {
      $match: {
         year: 1999,
         "imdb.rating": { $exists: true }
      }
   },
   {
      $group: {
         _id: 1999,
         topThreeRatings: {
            $maxN: {
               input: "$imdb.rating",
               n: 3
            }
         }
      }
   }
] )
