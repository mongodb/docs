db.movies.aggregate( [
   {
      $match: {
         title: {
            $in: [
               "The Godfather",
               "Inception",
               "The Dark Knight"
            ]
         }
      }
   },
   {
      $project: {
         _id: 0,
         title: 1,
         firstAlphabeticalGenre: { $min: "$genres" },
         lowestRating: {
            $min: [ { $multiply: [ "$imdb.rating", 10 ] }, "$metacritic" ]
         }
      }
   },
   {
      $sort: { title: 1 }
   }
] )
