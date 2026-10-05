db.movies.aggregate( [
   {
      $match: {
         genres: "Action",
         year: 2010,
         "imdb.rating": { $exists: true },
         "tomatoes.critic.rating": { $exists: true }
      }
   },
   { $sort: { title: 1 } },
   { $limit: 5 },
   {
      $replaceWith: {
         title: "$title",
         year: "$year",
         ratings: { $mergeObjects: [ "$imdb", "$tomatoes.critic" ] }
      }
   }
] )
