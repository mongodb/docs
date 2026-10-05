db.movies.aggregate( [
   {
      $match: {
         genres: "Action",
         year: 2000,
         "imdb.rating": { $ne: null }
      }
   },
   {
      $setWindowFields: {
         sortBy: { "imdb.rating": 1 },
         output: {
            moviesWithSimilarRating: {
               $count: {},
               window: {
                  range: [ -0.5, 0.5 ]
               }
            }
         }
      }
   },
   {
      $project: {
         _id: 0,
         title: 1,
         "imdb.rating": 1,
         moviesWithSimilarRating: 1
      }
   },
   { $sort: { "imdb.rating": -1 } },
   { $limit: 10 }
] )
