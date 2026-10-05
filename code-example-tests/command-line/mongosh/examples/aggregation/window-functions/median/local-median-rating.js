db.movies.aggregate( [
   {
      $match: {
         genres: { $all: ["Adventure", "Comedy", "Drama"] },
         year: { $gte: 2000, $lte: 2005 }
      }
   },
   {
      $setWindowFields: {
         sortBy: { year: 1 },
         output: {
            medianRatingByYear: {
               $median: {
                  input: "$imdb.rating",
                  method: "approximate"
               },
               window: { range: [ -1, 1 ] }
            }
         }
      }
   },
   {
      $project: {
         _id: 0,
         title: 1,
         year: 1,
         genres: 1,
         "imdb.rating": 1,
         medianRatingByYear: 1
      }
   },
   { $sort: { year: 1, "imdb.rating": -1 } },
   { $limit: 10 }
] )
