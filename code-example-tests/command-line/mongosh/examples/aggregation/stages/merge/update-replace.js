// :snippet-start: update-replace
db.movies.aggregate( [
   { $match: { metacritic: 100, rated: { $ne: null },
     year: { $gte: 1963 } } },
   { $group: { _id: { year: "$year", rated: "$rated" },
     count: { $sum: 1 } } },
   { $merge : { into: "movieRatingSummary", on: "_id",
     whenMatched: "replace", whenNotMatched: "insert" } }
] )
// :snippet-end:
