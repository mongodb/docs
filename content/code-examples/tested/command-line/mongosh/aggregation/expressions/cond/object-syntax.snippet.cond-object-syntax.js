db.movies.aggregate( [
   { $match: { runtime: { $gt: 1000 } } },
   {
      $project:
        {
          title: 1,
          rentalPrice:
            {
              $cond: {
                 if: { $gte: [ "$imdb.rating", 9 ] },
                 then: 5.99,
                 else: 3.99
              }
            }
        }
   }
] )
