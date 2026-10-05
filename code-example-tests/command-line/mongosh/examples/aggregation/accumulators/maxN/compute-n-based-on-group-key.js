db.movies.aggregate( [
   {
      $match: {
         year: { $in: [ 1999, 2000, 2001 ] },
         "imdb.rating": { $exists: true }
      }
   },
   {
      $group: {
         _id: { year: "$year" },
         topRatedMovies: {
            $maxN: {
               input: "$imdb.rating",
               n: { $cond: {
                  if: { $eq: [ "$year", 2001 ] },
                  then: 3,
                  else: 1
               } }
            }
         }
      }
   },
   { $sort: { "_id.year": 1 } }
] )
