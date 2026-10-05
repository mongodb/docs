db.movies.aggregate( [
   {
      $unwind: "$genres"
   },
   {
      $match: {
         genres: "Action",
         rated: "PG-13",
         "imdb.rating": { $lte: 5 },
         year: { $in: [ 2000, 2001, 2002 ] }
      }
   },
   {
      $setWindowFields: {
         partitionBy: "$year",
         output: {
            lowestThreeMovies: {
               $bottomN: {
                  sortBy: { "imdb.rating": -1, title: 1 },
                  output: [ "$title", "$imdb.rating" ],
                  n: 3
               },
               window: {
                  documents: [ "unbounded", "unbounded" ]
               }
            }
         }
      }
   },
   {
      $project: {
         _id: 0,
         title: 1,
         year: 1,
         "imdb.rating": 1,
         lowestThreeMovies: 1
      }
   }
] )
