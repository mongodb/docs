// :snippet-start: group-documents-by-year
db.movies.aggregate([
   { $match: { year: { $lt: 1910 } } },
   { $group: { _id: "$year", movies: { $push: "$$ROOT" } } },
   {
      $addFields: {
         totalRuntime: { $sum: "$movies.runtime" }
      }
   },
   { $sort: { _id: 1 } }
])
// :snippet-end:
