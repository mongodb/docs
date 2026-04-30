// :snippet-start: add-fields-overwrite
db.movies.aggregate( [
   { $match: { runtime: { $gt: 1000 } } },
   {
      $addFields: { runtime: { $add: [ "$runtime", 15 ] } }
   }
] )
// :snippet-end:
