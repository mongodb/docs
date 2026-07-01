db.movies.aggregate( [
   { $match: { title: "Baseball" } },
   {
      $set: {
         genres: {
            $concatArrays: [ "$genres", [ "Classic" ] ]
         }
      }
   }
] )
