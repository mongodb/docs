// :snippet-start: cond-array-syntax
db.movies.aggregate( [
   { $match: { runtime: { $gt: 1000 } } },
   {
      $project:
        {
          title: 1,
          rentalPrice:
            {
              $cond: [
                 { $gte: [ "$imdb.rating", 9 ] },
                 5.99,
                 3.99
              ]
            }
        }
   }
] )
// :snippet-end:
