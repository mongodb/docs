db.movies.aggregate( [
   { $match: { title: { $in: [
      "The Godfather",
      "Toy Story",
      "Metropolis"
   ] } } },
   { $sort: { title: 1 } },
   {
      $project: {
         _id: 0,
         title: 1,
         imdbId: "$imdb.id",
         hexId: { $convert: { input: "$imdb.id", to: "string", base: 16 } }
      }
   }
] )
