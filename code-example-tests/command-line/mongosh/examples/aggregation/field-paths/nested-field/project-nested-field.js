// :snippet-start: project-nested-field
db.movies.aggregate( [
   { $match: { title: "The Godfather" } },
   {
      $project: {
         _id: 0,
         imdb_rating: "$imdb.rating"
      }
   }
] )
// :snippet-end:
