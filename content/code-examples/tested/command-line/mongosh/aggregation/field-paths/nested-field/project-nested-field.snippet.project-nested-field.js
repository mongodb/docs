db.movies.aggregate( [
   { $match: { title: "The Godfather" } },
   {
      $project: {
         _id: 0,
         imdb_rating: "$imdb.rating"
      }
   }
] )
