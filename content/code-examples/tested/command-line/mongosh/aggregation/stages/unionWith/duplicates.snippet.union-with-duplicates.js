db.movies.aggregate( [
   { $match: { runtime: { $gt: 1000 } } },
   { $project: { title: 1, _id: 0 } },
   { $unionWith: { coll: "movies", pipeline: [
      { $match: { runtime: { $gt: 1000 } } },
      { $project: { title: 1, _id: 0 } }
   ] } }
] )
