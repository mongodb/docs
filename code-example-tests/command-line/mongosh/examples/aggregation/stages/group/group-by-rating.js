// :snippet-start: group-by-rating
db.movies.aggregate(
   [
      // First Stage
      {
         $group: {
            _id: "$rated",
            totalRuntime: { $sum: "$runtime" }
         }
      },
      // Second Stage
      {
         $match: { "totalRuntime": { $gte: 100000 } }
      }
   ]
)
// :snippet-end:
