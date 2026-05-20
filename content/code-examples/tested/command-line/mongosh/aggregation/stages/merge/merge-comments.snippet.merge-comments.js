db.comments.aggregate( [
   { $match: { date: { $gte: new Date("1970-01-01"),
     $lt: new Date("1973-01-01") } } },
   { $group: { _id: { $year: "$date" },
     commentCount: { $sum: 1 } } },
   { $merge : { into: "yearlyStats", on: "_id",
     whenMatched: "merge", whenNotMatched: "insert" } }
])
