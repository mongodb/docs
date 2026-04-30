// :snippet-start: add-fields-field-substitution
db.movies.aggregate( [
   { $match: { runtime: { $gt: 1000 } } },
   {
      $addFields: {
         _id: "$title",
         title: { $arrayElemAt: [ "$genres", 0 ] }
      }
   }
] )
// :snippet-end:
