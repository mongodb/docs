db.movies.aggregate( [
   { $match: { metacritic: 100, rated: { $ne: null },
     year: { $gte: 1970, $lte: 1972 } } },
   { $group: { _id: "$year", movieCount: { $sum: 1 } } },
   { $merge : { into: "yearlyStats", on: "_id",
     whenMatched: "merge", whenNotMatched: "insert" } }
])
