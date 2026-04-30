// :snippet-start: add-fields-add-to-array
db.movies.aggregate( [
   { $match: { title: "Centennial" } },
   { $addFields: {
      genres: {
         $concatArrays: [ "$genres", [ "Epic" ] ]
      }
   } }
] )
// :snippet-end:
