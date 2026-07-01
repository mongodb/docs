// :snippet-start: set-add-to-array
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
// :snippet-end:
