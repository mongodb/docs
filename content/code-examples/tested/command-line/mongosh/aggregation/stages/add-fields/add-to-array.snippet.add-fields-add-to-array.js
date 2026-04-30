db.movies.aggregate( [
   { $match: { title: "Centennial" } },
   { $addFields: {
      genres: {
         $concatArrays: [ "$genres", [ "Epic" ] ]
      }
   } }
] )
