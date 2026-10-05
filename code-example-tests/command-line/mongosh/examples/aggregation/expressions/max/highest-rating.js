db.movies.aggregate( [
   {
      $match: {
         title: {
            $in: [
               "The Godfather",
               "Schindler's List",
               "The Dark Knight"
            ]
         },
         "imdb.rating": { $gt: 0 },
         "tomatoes.viewer.rating": { $gt: 0 },
         "tomatoes.critic.rating": { $gt: 0 }
      }
   },
   {
      $project: {
         _id: 0,
         title: 1,
         highestRating: {
            $max: [
               "$imdb.rating",
               "$tomatoes.viewer.rating",
               "$tomatoes.critic.rating"
            ]
         }
      }
   },
   { $sort: { title: 1 } }
] )
