db.movies.aggregate( [
   {
      $match: {
         year: { $in: [ 1999, 2000, 2001 ] },
         "imdb.rating": { $exists: true }
      }
   },
   {
      $group: {
         _id: "$year",
         topThreeRatings: {
            $maxN: {
               input: "$imdb.rating",
               n: 3
            }
         }
      }
   },
   { $sort: { _id: 1 } }
] )
