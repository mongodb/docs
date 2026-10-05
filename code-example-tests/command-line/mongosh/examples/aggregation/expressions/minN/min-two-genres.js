db.movies.aggregate( [
   { $match: { $expr: { $gte: [ { $size: "$genres" }, 3 ] } } },
   {
      $addFields: {
         firstAlphabeticalGenres: { $minN: { n: 2, input: "$genres" } }
      }
   },
   {
      $project: {
         _id: 0,
         title: 1,
         genres: 1,
         firstAlphabeticalGenres: 1
      }
   },
   { $limit: 5 }
] )
