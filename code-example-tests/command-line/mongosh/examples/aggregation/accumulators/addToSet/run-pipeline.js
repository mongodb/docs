// :snippet-start: addToSet-example
db.movies.aggregate( [
   {
      $unwind: "$directors"
   },
   {
      $unwind: "$genres"
   },
   {
      $group: {
         _id: "$directors",
         genres: { $addToSet: "$genres" }
      }
   },
   {
      $sort: { _id: 1 }
   },
   {
      $limit: 5
   }
] )
// :snippet-end:
