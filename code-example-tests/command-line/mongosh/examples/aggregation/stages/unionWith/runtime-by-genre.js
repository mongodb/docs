// :snippet-start: runtime-by-genre
db.movies.aggregate( [
   { $match: { year: { $lt: 1910 } } },
   { $unionWith: { coll: "movies", pipeline: [
      { $match: { runtime: { $gt: 1000 } } }
   ] } },
   { $group: { _id: "$genres", totalRuntime: { $sum: "$runtime" } } },
   { $sort: { totalRuntime: -1 } }
] )
// :snippet-end:
