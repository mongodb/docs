db.movies.aggregate( [
   {
      $match: {
         rated: { $in: [ "G", "PG", "PG-13", "R" ] },
         "imdb.rating": { $gt: 0 }
      }
   },
   {
      $group:
      {
         _id: "$rated",
         highestRatedMovie:
            {
               $top:
                  {
                     output: [ "$title", "$imdb.rating" ],
                     sortBy: { "imdb.rating": -1 }
                  }
            }
      }
   },
   {
      $sort: { _id: 1 }
   }
] )
