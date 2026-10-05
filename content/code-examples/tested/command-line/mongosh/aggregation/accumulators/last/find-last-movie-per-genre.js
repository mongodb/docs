db.movies.aggregate( [
   { $match: { year: { $type: "int" } } },
   { $sort: { year: 1, title: 1 } },
   { $unwind: "$genres" },
   {
      $group: {
         _id: "$genres",
         lastMovieTitle: { $last: "$title" },
         lastMovieYear: { $last: "$year" }
      }
   },
   { $sort: { _id: 1 } },
   { $limit: 5 }
] )
