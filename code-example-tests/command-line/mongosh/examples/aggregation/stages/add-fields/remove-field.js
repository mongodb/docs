// :snippet-start: add-fields-remove-field
db.movies.aggregate( [
   { $match: { runtime: { $gt: 1000 } } },
   {
      $addFields: { plot: "$$REMOVE" }
   }
] )
// :snippet-end:
