// :snippet-start: group-by-year
db.movies.aggregate([
   { $match: { "year": { $lt: 1910 } } },
   {
      $group: {
         _id: "$year",
         totalRuntime: { $sum: "$runtime" },
         averageRuntime: { $avg: "$runtime" },
         count: { $sum: 1 }
      }
   },
   { $sort: { totalRuntime: -1 } }
])
// :snippet-end:
