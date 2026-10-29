// :snippet-start: report-by-category
db.movies.aggregate( [
   { $match: { year: { $lt: 1910 } } },
   { $set: { category: "Early Cinema" } },
   { $unionWith: { coll: "movies", pipeline: [
      { $match: { runtime: { $gt: 1000 } } },
      { $set: { category: "Long Runtime" } }
   ] } },
   { $project: { title: 1, year: 1, category: 1, _id: 0 } },
   { $sort: { category: 1, year: 1, title: 1 } }
] )
// :snippet-end:
