db.movies.aggregate([
   {
      $group: {
         _id: null,
         totalRuntime: { $sum: "$runtime" },
         averageRuntime: { $avg: "$runtime" },
         count: { $sum: 1 }
      }
   }
])
