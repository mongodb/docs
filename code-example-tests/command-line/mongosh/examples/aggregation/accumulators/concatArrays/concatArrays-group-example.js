// :snippet-start: group-example
db.movies.aggregate( [
   {
      $match: { year: { $in: [1928, 1929] } }
   },
   {
      $group: {
         _id: "$year",
         combinedGenres: { $concatArrays: "$genres" }
      }
   },
   { $sort: { _id: 1 } }
] )
// :snippet-end:
