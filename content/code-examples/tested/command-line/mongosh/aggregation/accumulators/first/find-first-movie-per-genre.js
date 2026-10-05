db.movies.aggregate( [
   { $sort: { year: 1, title: 1 } },
   { $unwind: "$genres" },
   {
      $group: {
         _id: "$genres",
         firstMovieTitle: { $first: "$title" },
         firstMovieYear: { $first: "$year" }
      }
   },
   { $sort: { _id: 1 } },
   { $limit: 5 }
] )
